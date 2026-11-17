import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import assert from 'node:assert/strict';
import { routes, alternatePath } from '../src/lib/routes';
import { siteUrl } from '../src/lib/seo';

const root = resolve('out');
const failures: string[] = [];
const titles = new Set<string>();
const htmlFiles = await Promise.all(
  routes.map(async (route) => ({
    route,
    html: await readFile(resolve(root, `.${route.path}`, 'index.html'), 'utf8'),
  })),
);
const urlToFile = (path: string) =>
  resolve(root, `.${path}`, ...(path.endsWith('/') || !extname(path) ? ['index.html'] : []));
for (const { route, html } of htmlFiles) {
  try {
    assert.ok(html.includes(`lang="${route.locale}-CA"`), 'correct document language');
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'one H1');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), 'unique nonempty title');
    titles.add(title!);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.ok(
      html.includes(`<link rel="canonical" href="${siteUrl}${route.path}"`),
      'self canonical',
    );
    assert.ok(html.includes(`href="${siteUrl}${alternatePath(route)}"`), 'alternate language URL');
    assert.ok(
      html.includes('hrefLang="en-CA"') || html.includes('hreflang="en-CA"'),
      'English hreflang',
    );
    assert.ok(
      html.includes('hrefLang="fr-CA"') || html.includes('hreflang="fr-CA"'),
      'French hreflang',
    );
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.ok(html.includes('/favicon.svg'), 'favicon');
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
    assert.ok(json, 'JSON-LD present');
    const data = JSON.parse(json!);
    assert.equal(data['@context'], 'https://schema.org');
    assert.equal(data['@graph'][2]['@type'], 'BreadcrumbList');
    assert.ok(
      !json!.includes('AggregateRating') && !json!.includes('"@type":"Product"'),
      'no unsupported claims',
    );
    for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
      const href = match[1].replace(/&amp;/g, '&');
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const url = new URL(href, `${siteUrl}${route.path}`);
      const file = urlToFile(url.pathname);
      await access(file);
      if (url.hash && extname(file) === '.html') {
        const target = await readFile(file, 'utf8');
        assert.ok(
          target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `anchor exists: ${href}`,
        );
      }
    }
  } catch (error) {
    failures.push(`${route.path}: ${String(error)}`);
  }
}
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
for (const locale of ['en', 'fr']) {
  const localized = await readFile(resolve(root, `sitemap-${locale}.xml`), 'utf8');
  assert.equal(
    (localized.match(/<url>/g) || []).length,
    routes.filter((route) => route.locale === locale).length,
  );
  for (const route of routes.filter((route) => route.locale === locale))
    assert.ok(localized.includes(`<loc>${siteUrl}${route.path}</loc>`));
}
assert.equal((sitemap.match(/<url>/g) || []).length, routes.length);
for (const route of routes) assert.ok(sitemap.includes(`<loc>${siteUrl}${route.path}</loc>`));
assert.match(await readFile(resolve(root, 'robots.txt'), 'utf8'), /Disallow: \//);
assert.match(await readFile(resolve(root, '404.html'), 'utf8'), /Page not found/);
assert.match(await readFile(resolve(root, '404.html'), 'utf8'), /introuvable/);
assert.match(await readFile(resolve(root, '500.html'), 'utf8'), /indisponible/);
const favicon = await readFile(resolve(root, 'favicon.ico'));
assert.equal(favicon.readUInt16LE(2), 1);
const files = await readdir(resolve(root, '_next/static'), { recursive: true });
assert.ok(files.some((file) => file.endsWith('.js')));
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `PASS: ${routes.length} localized pages; document languages, headings, unique metadata, canonical/hreflang, JSON-LD, internal links/assets/anchors, sitemap, preview robots, bilingual 404 and favicon.`,
  );
