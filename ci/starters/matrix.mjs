// Prints the job matrix for the starter check as JSON.
//   node matrix.mjs <stable|latest|both>
// Each entry says whether a failure in it blocks (stable) or only reports (latest).
import { readFileSync } from 'node:fs';

const mode = process.argv[2] || 'both';
if (!['stable', 'latest', 'both'].includes(mode)) {
  console.error(`Unknown mode "${mode}". Use stable, latest or both.`);
  process.exit(1);
}

const versions = JSON.parse(readFileSync(new URL('./versions.json', import.meta.url), 'utf8'));
const modes = mode === 'both' ? ['stable', 'latest'] : [mode];

const include = modes.flatMap((m) =>
  versions.matrix[m].map((row) => ({
    ...row,
    mode: m,
    blocking: m === 'stable',
    id: `${m}-${row.starter}-react${row.react}-node${row.node}`
  }))
);

process.stdout.write(JSON.stringify({ include }));
