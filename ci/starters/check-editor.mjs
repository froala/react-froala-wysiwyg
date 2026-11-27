// Checks one starter project made by create-starter.mjs: TypeScript, production build,
// then the built app in headless Chrome — the editor and toolbar render, nothing throws,
// and typing reaches the React model.
//
//   node check-editor.mjs --starter vite|next-app|next-pages --dir <project dir>
//     --result <result .json> [--port 4173]
import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { chromium } from 'playwright';
import { isWin, loadResult, parseArgs, run, step } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
for (const key of ['starter', 'dir', 'result']) {
  if (!args[key]) {
    console.error(`Missing --${key}`);
    process.exit(2);
  }
}

const projectDir = path.resolve(args.dir);
const resultFile = path.resolve(args.result);
const port = Number(args.port || 4173);
const url = `http://127.0.0.1:${port}/`;
const isNext = args.starter.startsWith('next');
const TYPED = 'typed-by-ci';

const result = loadResult(resultFile, { starter: args.starter });
if (result.steps.some((s) => !s.ok)) {
  console.error('An earlier step failed; nothing to check.');
  process.exit(1);
}

function typescript() {
  if (isNext) {
    // Next generates route types (LayoutProps, PageProps) that a fresh app's own files
    // use; without them tsc fails on the starter itself, not on the wrapper.
    run('npx', ['next', 'typegen'], { cwd: projectDir });
    run('npx', ['tsc', '--noEmit'], { cwd: projectDir });
  } else {
    run('npx', ['tsc', '-b'], { cwd: projectDir });
  }
}

function build() {
  run('npm', ['run', 'build'], { cwd: projectDir });
}

let server;

function stopServer() {
  if (!server || server.exitCode !== null) {
    return;
  }
  if (isWin) {
    spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F']);
  } else {
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      // already gone
    }
  }
}

async function serve() {
  const cmd = isNext
    ? ['next', 'start', '-p', String(port), '-H', '127.0.0.1']
    : ['vite', 'preview', '--port', String(port), '--strictPort', '--host', '127.0.0.1'];
  console.log(`\n$ npx ${cmd.join(' ')}`);
  server = spawn('npx', cmd, { cwd: projectDir, shell: isWin, detached: !isWin, stdio: 'inherit' });

  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`The server exited with ${server.exitCode} before it answered`);
    }
    try {
      const res = await fetch(url);
      if (res.ok) {
        return;
      }
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Nothing answered on ${url} within 60s`);
}

async function browser() {
  const b = await chromium.launch();
  const page = await b.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') {
      consoleErrors.push(m.text());
    }
  });

  try {
    await page.goto(url, { waitUntil: 'load' });

    const editable = page.locator('.fr-box .fr-element[contenteditable="true"]');
    try {
      await editable.first().waitFor({ state: 'visible', timeout: 30000 });
    } catch {
      throw new Error(`The editor did not render within 30s${pageErrors.length ? `. Page error: ${pageErrors[0]}` : ''}`);
    }

    if (!(await page.locator('.fr-toolbar').first().isVisible())) {
      throw new Error('The editor rendered without its toolbar');
    }

    await editable.first().click();
    await page.keyboard.press('End');
    await page.keyboard.type(` ${TYPED}`);

    const reachedModel = await page
      .waitForFunction((t) => (document.getElementById('model-out')?.textContent || '').includes(t), TYPED, { timeout: 15000 })
      .then(() => true, () => false);
    if (!reachedModel) {
      throw new Error('Typed text did not reach the React model (onModelChange) within 15s');
    }

    if (pageErrors.length) {
      throw new Error(`The page threw: ${pageErrors[0]}`);
    }
    result.consoleErrors = consoleErrors.slice(0, 10);
  } catch (e) {
    await page.screenshot({ path: resultFile.replace(/\.json$/, '.png'), fullPage: true }).catch(() => {});
    throw e;
  } finally {
    await b.close();
  }
}

let ok = false;
try {
  ok =
    (await step(result, resultFile, 'typescript', typescript)) &&
    (await step(result, resultFile, 'build', build)) &&
    (await step(result, resultFile, 'serve', serve)) &&
    (await step(result, resultFile, 'editor in browser', browser));
} finally {
  stopServer();
}

process.exit(ok ? 0 : 1);
