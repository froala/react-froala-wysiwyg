// Turns the per-starter result files into one report.
//
//   node report.mjs --results <dir> --mode stable|latest|both [--comment <file>]
//
// Writes a table to the job summary, writes the PR comment body for the latest-versions
// check to --comment, and sets blocking_failed / latest_failed outputs. Exits 1 when a
// known-good (stable) entry failed or produced no result: that is what blocks a PR and a
// release. Latest-version failures never change the exit code.
import { appendFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseArgs, readJson } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = parseArgs(process.argv.slice(2));
const mode = args.mode || 'both';
const MARKER = '<!-- starter-check-latest -->';

function findJson(dir) {
  if (!existsSync(dir)) {
    return [];
  }
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      return findJson(full);
    }
    return name.endsWith('.json') ? [full] : [];
  });
}

const expected = JSON.parse(execFileSync(process.execPath, [path.join(here, 'matrix.mjs'), mode], { encoding: 'utf8' })).include;
const found = new Map();
for (const file of findJson(path.resolve(args.results || 'results'))) {
  try {
    const r = readJson(file);
    if (r.id) {
      found.set(r.id, r);
    }
  } catch {
    // not a result file
  }
}

const rows = expected.map((e) => {
  const r = found.get(e.id);
  if (!r) {
    return { ...e, status: 'no result', failedStep: 'did not finish', error: 'The job produced no result file (it was cancelled or crashed before the first step).', versions: {} };
  }
  const failed = r.steps.find((s) => !s.ok);
  const done = r.steps.some((s) => s.name === 'editor in browser' && s.ok);
  return {
    ...e,
    status: failed ? 'failed' : done ? 'passed' : 'incomplete',
    failedStep: failed ? failed.name : !done ? 'did not finish' : '',
    error: failed ? failed.error : !done ? 'The check stopped before the browser step.' : '',
    detail: failed ? failed.detail : '',
    versions: r.versions || {}
  };
});

const label = { vite: 'Vite', 'next-app': 'Next.js App Router', 'next-pages': 'Next.js Pages Router' };
const icon = (s) => (s === 'passed' ? '✅' : '❌');
const ver = (v) => [
  v.react && `react ${v.react}`,
  v.next && `next ${v.next}`,
  v.vite && `vite ${v.vite}`,
  v.typescript && `ts ${v.typescript}`
].filter(Boolean).join(', ');

function table(list) {
  const lines = ['| Starter | Node | Result | Failed at | Versions |', '| --- | --- | --- | --- | --- |'];
  for (const r of list) {
    lines.push(`| ${label[r.starter] || r.starter} (React ${r.react}) | ${r.node} | ${icon(r.status)} ${r.status} | ${r.failedStep || ''} | ${ver(r.versions)} |`);
  }
  return lines.join('\n');
}

function errors(list) {
  return list
    .filter((r) => r.status !== 'passed')
    .map((r) => {
      const detail = r.detail ? `\n\n\`\`\`\n${r.detail.slice(-3000)}\n\`\`\`` : '';
      return `<details><summary>${label[r.starter] || r.starter} (React ${r.react}, Node ${r.node}): ${r.error}</summary>${detail}\n</details>`;
    })
    .join('\n');
}

const stable = rows.filter((r) => r.mode === 'stable');
const latest = rows.filter((r) => r.mode === 'latest');
const stableFailed = stable.filter((r) => r.status !== 'passed');
const latestFailed = latest.filter((r) => r.status !== 'passed');

const parts = ['## Starter check'];
if (stable.length) {
  parts.push(
    '### Known-good versions (blocks merge and release)',
    stableFailed.length ? `❌ ${stableFailed.length} of ${stable.length} failed.` : `✅ All ${stable.length} passed.`,
    table(stable),
    errors(stable)
  );
}
if (latest.length) {
  parts.push(
    '### Latest versions (report only, never blocks)',
    latestFailed.length ? `⚠️ ${latestFailed.length} of ${latest.length} failed on the newest framework versions.` : `✅ All ${latest.length} passed on the newest framework versions.`,
    table(latest),
    errors(latest)
  );
}
const summary = parts.filter(Boolean).join('\n\n');
console.log(summary);

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
}

if (args.comment && latest.length) {
  const runUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : '';
  const body = latestFailed.length
    ? [
        MARKER,
        '⚠️ **The wrapper breaks on the newest framework versions.**',
        'This doesn\'t block the PR. It means a new React, Next.js or Vite release breaks the wrapper in a fresh project, and customers who start a new project will hit it.',
        table(latest),
        errors(latest),
        runUrl && `[Full run](${runUrl})`
      ].filter(Boolean).join('\n\n')
    : [
        MARKER,
        '✅ The wrapper works on the newest framework versions again.',
        table(latest),
        runUrl && `[Full run](${runUrl})`
      ].filter(Boolean).join('\n\n');
  writeFileSync(args.comment, `${body}\n`);
}

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `blocking_failed=${stableFailed.length}\nlatest_failed=${latestFailed.length}\n`);
}

process.exit(stableFailed.length ? 1 : 0);
