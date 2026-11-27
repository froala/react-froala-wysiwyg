// Creates one fresh starter project the way a customer would, puts the editor on its
// page, and installs the packed wrapper into it.
//
//   node create-starter.mjs --starter vite|next-app|next-pages --mode stable|latest
//     --react 19|18|latest --node 22 --tarball <wrapper .tgz> --dir <project dir>
//     --result <result .json>
//
// Optional overrides (manual runs): OVERRIDE_REACT, OVERRIDE_NEXT, OVERRIDE_FROALA_EDITOR.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installedVersion, loadResult, parseArgs, readJson, run, step, writeJson } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = parseArgs(process.argv.slice(2));

for (const key of ['starter', 'mode', 'tarball', 'dir', 'result']) {
  if (!args[key]) {
    console.error(`Missing --${key}`);
    process.exit(2);
  }
}

const versions = readJson(path.join(here, 'versions.json'));
const profile = versions[args.mode];
if (!profile) {
  console.error(`Unknown mode "${args.mode}"`);
  process.exit(2);
}

const projectDir = path.resolve(args.dir);
const resultFile = path.resolve(args.result);
const tarball = path.resolve(args.tarball);
const wrapperPkg = readJson(path.join(here, '..', '..', 'package.json'));

const result = loadResult(resultFile, {
  id: args.id || `${args.mode}-${args.starter}-react${args.react}-node${args.node}`,
  starter: args.starter,
  mode: args.mode,
  react: String(args.react || ''),
  node: String(args.node || process.versions.node),
  blocking: args.mode === 'stable',
  wrapper: wrapperPkg.version
});

function scaffold() {
  const parent = path.dirname(projectDir);
  const name = path.basename(projectDir);
  mkdirSync(parent, { recursive: true });
  rmSync(projectDir, { recursive: true, force: true });

  if (args.starter === 'vite') {
    run('npm', ['create', '-y', `vite@${profile['create-vite']}`, name, '--',
      '--template', 'react-ts', '--no-interactive'], { cwd: parent });
  } else if (args.starter === 'next-app' || args.starter === 'next-pages') {
    run('npx', ['-y', `create-next-app@${profile['create-next-app']}`, name,
      '--ts', args.starter === 'next-app' ? '--app' : '--no-app',
      '--no-src-dir', '--no-tailwind', '--eslint', '--import-alias', '@/*',
      '--use-npm', '--skip-install', '--disable-git', '--yes'], { cwd: parent });
  } else {
    throw new Error(`Unknown starter "${args.starter}"`);
  }

  if (!existsSync(path.join(projectDir, 'package.json'))) {
    throw new Error('The starter did not create a package.json');
  }
}

function pinVersions() {
  const file = path.join(projectDir, 'package.json');
  const pkg = readJson(file);
  const wanted = { ...profile.packages };

  if (args.react === '18') {
    Object.assign(wanted, versions.react18);
  }
  if (process.env.OVERRIDE_REACT) {
    wanted.react = process.env.OVERRIDE_REACT;
    wanted['react-dom'] = process.env.OVERRIDE_REACT;
  }
  if (process.env.OVERRIDE_NEXT) {
    wanted.next = process.env.OVERRIDE_NEXT;
  }

  // Pin only what the starter already uses, so Vite never gets next and the other way round.
  for (const section of ['dependencies', 'devDependencies']) {
    for (const name of Object.keys(pkg[section] || {})) {
      if (wanted[name]) {
        pkg[section][name] = wanted[name];
      }
    }
  }

  // Installed the way the Readme says: the wrapper plus the exact froala-editor it pins.
  const froala = process.env.OVERRIDE_FROALA_EDITOR || wrapperPkg.dependencies['froala-editor'];
  pkg.dependencies = pkg.dependencies || {};
  pkg.dependencies['react-froala-wysiwyg'] = `file:${tarball.replace(/\\/g, '/')}`;
  pkg.dependencies['froala-editor'] = froala;
  if (process.env.OVERRIDE_FROALA_EDITOR) {
    // One copy only, or plugins register on a different editor than the wrapper creates.
    pkg.overrides = { ...(pkg.overrides || {}), 'froala-editor': froala };
  }

  writeJson(file, pkg);
}

function addEditorPage() {
  cpSync(path.join(here, 'templates', args.starter), projectDir, { recursive: true });
}

function install() {
  run('npm', ['install', '--no-audit', '--no-fund'], { cwd: projectDir });
  for (const name of ['react', 'react-dom', 'next', 'vite', 'typescript', 'froala-editor', 'react-froala-wysiwyg']) {
    const v = installedVersion(projectDir, name);
    if (v) {
      result.versions[name] = v;
    }
  }
}

const ok =
  (await step(result, resultFile, 'scaffold', scaffold)) &&
  (await step(result, resultFile, 'pin versions', pinVersions)) &&
  (await step(result, resultFile, 'add editor page', addEditorPage)) &&
  (await step(result, resultFile, 'install', install));

process.exit(ok ? 0 : 1);
