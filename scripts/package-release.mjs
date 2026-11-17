// Package an explicitly built public export, never source files or credentials.
import { readFile, writeFile, mkdir, readdir, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, relative, join } from 'node:path';
const release = process.argv[2];
if (!release || !/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(release))
  throw new Error('Provide a release ID: YYYY-MM-DD-name');
const robots = await readFile('out/robots.txt', 'utf8');
if (!robots.includes('Allow: /') || robots.includes('Disallow: /'))
  throw new Error('Build with VENTILATORS_PUBLIC_RELEASE=1 first');
const destination = resolve('qa/generated/releases', release);
const root = join(destination, 'site');
await mkdir(destination, { recursive: true });
await cp('out', root, { recursive: true, force: false, errorOnExist: true });
await cp('deploy/whc-public.htaccess', join(root, '.htaccess'));
await cp('deploy/analytics.htaccess', join(root, 'analytics/.htaccess'));
await writeFile(
  join(root, '_next/static/.htaccess'),
  '<IfModule mod_headers.c>\n  Header always set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n',
);
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else {
      const name = relative(root, path);
      if (name.includes('.env') || name.includes('.git') || name.endsWith('.zip'))
        throw new Error(`Unexpected deployment file: ${name}`);
      const bytes = await readFile(path);
      files.push({
        path: name,
        bytes: bytes.length,
        sha256: createHash('sha256').update(bytes).digest('hex'),
      });
    }
  }
}
await walk(root);
const manifest = {
  release,
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  sourceHasChanges: !!execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim(),
  files,
};
await writeFile(join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
const archive = join(destination, `${release}.zip`);
execFileSync('zip', ['-q', '-r', archive, '.'], { cwd: root });
console.log(
  JSON.stringify(
    {
      release,
      files: files.length,
      archive,
      sha256: createHash('sha256')
        .update(await readFile(archive))
        .digest('hex'),
    },
    null,
    2,
  ),
);
