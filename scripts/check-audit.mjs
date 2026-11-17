import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

// A narrow, dated exception for an upstream advisory without a patched release.
// All other high/critical findings fail, including this issue outside dev-only nodes.
const exception = 'https://github.com/advisories/GHSA-fc5q-39xc-vjpf';
const expiry = Date.parse('2026-12-17T00:00:00Z');
const args = process.env.npm_execpath ? [process.env.npm_execpath, 'audit', '--json'] : [];
const audit = spawnSync(
  args.length ? process.execPath : 'npm',
  args.length ? args : ['audit', '--json'],
  { encoding: 'utf8', timeout: 90_000, maxBuffer: 10_000_000 },
);
assert.ok(
  !audit.error && audit.status !== null && audit.status <= 1,
  'npm audit could not complete',
);
const report = JSON.parse(audit.stdout);
assert.ok(
  !report.error && report.auditReportVersion === 2 && report.vulnerabilities,
  'Invalid audit response',
);
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
function excepted(name, seen = new Set()) {
  if (seen.has(name) || Date.now() >= expiry) return false;
  const issue = report.vulnerabilities[name];
  if (!issue?.nodes?.length || !issue.nodes.every((node) => lock.packages[node]?.dev === true))
    return false;
  const next = new Set([...seen, name]);
  return (
    issue.via.length > 0 &&
    issue.via.every((via) =>
      typeof via === 'string' ? excepted(via, next) : via.url === exception,
    )
  );
}
const high = Object.values(report.vulnerabilities).filter((issue) =>
  ['high', 'critical'].includes(issue.severity),
);
const failures = high.filter((issue) => !excepted(issue.name));
for (const issue of failures)
  console.error(`Unaccepted ${issue.severity} dependency advisory: ${issue.name}`);
const accepted = high.length - failures.length;
if (accepted)
  console.warn(
    `KNOWN EXCEPTION: ${accepted} dev-only affected dependency paths, ${exception}; expires 2026-12-17. See docs/OPERATIONS.md.`,
  );
console.log(
  `${failures.length ? 'FAIL' : 'PASS'}: dependency policy; ${failures.length} unaccepted high/critical findings. This does not mean a clean full audit.`,
);
process.exitCode = failures.length ? 1 : 0;
