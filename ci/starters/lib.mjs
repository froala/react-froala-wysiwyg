// Shared helpers for the starter check scripts.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export const isWin = process.platform === 'win32';

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

// Runs a command, streaming its output. Throws with the tail of the output on failure,
// so the error that lands in the report says what actually went wrong.
export function run(cmd, args, opts = {}) {
  console.log(`\n$ ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, {
    shell: isWin,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts
  });
  const out = `${r.stdout || ''}${r.stderr || ''}`;
  process.stdout.write(out);
  if (r.status !== 0) {
    const tail = out.trim().split('\n').slice(-25).join('\n');
    const err = new Error(`${cmd} ${args.join(' ')} exited with ${r.status ?? r.signal}`);
    err.detail = tail;
    throw err;
  }
  return out;
}

export function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function writeJson(file, data) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

// The result file both scripts add to. One per matrix entry.
export function loadResult(file, seed) {
  if (existsSync(file)) {
    return readJson(file);
  }
  return { ...seed, steps: [], versions: {} };
}

// Runs one named step and records how it went. Returns false when the step failed,
// so the caller stops: a later step means nothing once an earlier one broke.
export async function step(result, file, name, fn) {
  const started = Date.now();
  const entry = { name, ok: false, ms: 0 };
  result.steps.push(entry);
  try {
    await fn();
    entry.ok = true;
  } catch (e) {
    entry.error = e.message;
    if (e.detail) {
      entry.detail = e.detail;
    }
    console.error(`\nStep "${name}" failed: ${e.message}`);
  } finally {
    entry.ms = Date.now() - started;
    writeJson(file, result);
  }
  return entry.ok;
}

export function installedVersion(projectDir, pkg) {
  const file = path.join(projectDir, 'node_modules', ...pkg.split('/'), 'package.json');
  return existsSync(file) ? readJson(file).version : null;
}
