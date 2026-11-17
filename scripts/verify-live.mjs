// Read-only verification of the public static release, never a form/email test.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const manifestPath = process.argv[2];
const reportPath = process.argv[3];
if (!manifestPath || !reportPath)
  throw new Error('Usage: node scripts/verify-live.mjs manifest.json report.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const origin = 'https://ventilators.ca';
const results = [];
const failures = [];
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const queue = manifest.files.filter(
  (f) => f.path !== 'index.html' && !f.path.split('/').some((p) => p.startsWith('.')),
);
async function checkFile(file) {
  const path = file.path.endsWith('index.html') ? '/' + file.path.slice(0, -10) : '/' + file.path;
  try {
    const response = await fetch(origin + path, {
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
    });
    const bytes = new Uint8Array(await response.arrayBuffer());
    const actualHash = sha256(bytes);
    const ok = response.status === 200 && actualHash === file.sha256;
    results.push({
      path,
      status: response.status,
      bytes: bytes.length,
      sha256: actualHash,
      matches: ok,
    });
    if (!ok) failures.push(`${path}: status/hash mismatch`);
  } catch (error) {
    failures.push(`${path}: ${String(error)}`);
  }
}
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) await checkFile(queue.shift());
  }),
);
const probes = [];
for (const [url, status, location] of [
  [origin + '/', 301, origin + '/en/'],
  [origin + '/index.html', 301, origin + '/en/'],
  [origin + '/?source=entry-check', 301, origin + '/en/?source=entry-check'],
  ['http://www.ventilators.ca/', 301, origin + '/en/'],
  ['http://ventilators.ca/en/', 301, 'https://ventilators.ca/en/'],
  ['https://www.ventilators.ca/fr/', 301, 'https://ventilators.ca/fr/'],
  [origin + '/release-check-missing/', 404, null],
  [origin + '/.htaccess', 403, null],
]) {
  const r = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  const body = await r.text();
  const ok = r.status === status && (!location || r.headers.get('location') === location);
  probes.push({
    url,
    status: r.status,
    location: r.headers.get('location'),
    expected: status,
    matches: ok,
    ...(status === 404 ? { branded404: body.includes('Page not found') } : {}),
  });
  if (!ok || (status === 404 && !body.includes('Page not found')))
    failures.push(`Probe failed: ${url}`);
}
const headers = {};
for (const path of [
  '/',
  '/en/',
  '/fr/',
  '/robots.txt',
  '/images/industrial.webp',
  '/' + manifest.files.find((f) => /_next\/static\/.*\.js$/.test(f.path)).path,
]) {
  const r = await fetch(origin + path, { signal: AbortSignal.timeout(20000) });
  headers[path] = Object.fromEntries(r.headers.entries());
  if (path === '/en/' && /noindex/.test(r.headers.get('x-robots-tag') || ''))
    failures.push('Public page has noindex header');
  if (path === '/robots.txt') {
    const txt = await r.text();
    if (!txt.includes('Allow: /') || txt.includes('Disallow: /'))
      failures.push('Public robots.txt does not permit indexing');
  }
}
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  release: manifest.release,
  sourceCommit: manifest.sourceCommit,
  filesChecked: results.length,
  rootEntry: '301 to /en/; root HTML is a static redirect fallback, not directly served',
  allFilesMatch: failures.length === 0,
  failures,
  probes,
  headers,
  files: results.sort((a, b) => a.path.localeCompare(b.path)),
};
await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(
  JSON.stringify({ release: report.release, filesChecked: report.filesChecked, failures }, null, 2),
);
if (failures.length) process.exitCode = 1;
