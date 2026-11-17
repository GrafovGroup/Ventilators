import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import assert from 'node:assert/strict';
import { routes, alternatePath } from '../src/lib/routes';
import { siteUrl, indexingEnabled } from '../src/lib/seo';
import { media } from '../src/content/media';
import { buyerGuides } from '../src/content/buyer-guides';
import { faqTopics } from '../src/content/faq';
import { projectPaths } from '../src/content/project-paths';
import { detailPages, detailPath } from '../src/content/details';
import { searchVerification, publicFormId } from '../src/lib/integrations';

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
    if (route.category && buyerGuides[route.category.id]) {
      for (const id of [
        'category-brief',
        'category-scope',
        'category-questions',
        'category-example-title',
      ])
        assert.ok(html.includes(`id="${id}"`), `buyer guidance rendered: ${id}`);
      assert.ok(html.includes('<caption>'), 'comparison table has a caption');
      assert.ok(html.includes('scope="row"'), 'comparison table has row headers');
      assert.ok(
        html.includes(`category=${route.category.id}`),
        'inquiry preserves category context',
      );
    }
    assert.match(html, /<meta name="description" content="[^"]+"/);
    if (route.page === 'faq') {
      for (const topic of faqTopics) {
        assert.ok(html.includes(`id="${topic.id}"`), 'FAQ topic anchor');
        for (const answer of topic.answers)
          assert.ok(html.includes(`id="${answer.id}"`), 'FAQ answer permalink in static HTML');
      }
      assert.ok(!html.includes('<details'), 'buyer answers are directly readable');
    }
    if (['products', 'resources'].includes(route.page) && !route.detail) {
      for (const project of projectPaths) {
        const guide = detailPages.find((page) => page.id === project.guide)!;
        assert.ok(
          html.includes(`href="${detailPath(route.locale, guide)}"`),
          'project path is crawlable',
        );
      }
    }
    assert.equal(
      html.includes('class="mobile-actions"'),
      route.page !== 'quote',
      'fixed inquiry action is absent while filling the inquiry',
    );
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
    assert.ok(
      html.includes(
        `name="robots" content="${indexingEnabled ? 'index, follow' : 'noindex, nofollow'}"`,
      ),
      'robots match release mode',
    );
    assert.ok(html.includes('/favicon.svg'), 'favicon');
    if (route.page === 'quote') {
      assert.ok(
        !html.includes('<form'),
        'unhydrated preview cannot submit personal data with a native GET',
      );
      assert.ok(html.includes('mailto:info@ventilators.ca'), 'no-JavaScript contact fallback');
    }
    const pageId = route.detail?.id ?? route.category?.id ?? route.page;
    const expectedImages = media
      .filter((m) => m.page === pageId)
      .map((m) => m.src)
      .sort();
    const actualImages = [...html.matchAll(/<img\b[^>]*\bsrc="(\/images\/[^"]+)"[^>]*>/g)]
      .map((m) => m[1])
      .sort();
    assert.deepEqual(
      actualImages,
      expectedImages,
      'only the unique images assigned to this page are rendered',
    );
    for (const match of html.matchAll(/\bsrcSet="([^"]+)"/gi)) {
      for (const candidate of match[1].split(',')) {
        const [src, width] = candidate.trim().split(/\s+/);
        assert.match(width, /^\d+w$/, 'responsive width descriptor');
        assert.ok(src.startsWith('/images/responsive/'), 'local responsive image');
        await access(urlToFile(src));
        const original = src.replace('/responsive/', '/').replace(/-\d+\.webp$/, '.webp');
        assert.ok(expectedImages.includes(original), 'responsive variant belongs to this page');
      }
    }
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
const rootPage = await readFile(resolve(root, 'index.html'), 'utf8');
const verification = searchVerification(process.env);
publicFormId(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID);
for (const html of [rootPage, ...htmlFiles.map((file) => file.html)]) {
  for (const [name, value] of [
    ['google-site-verification', verification?.google],
    ['msvalidate.01', verification?.other?.['msvalidate.01']],
  ]) {
    if (value)
      assert.ok(html.includes(`<meta name="${name}" content="${value}"`), `${name} token missing`);
    else assert.ok(!html.includes(`<meta name="${name}"`), `${name} unexpectedly present`);
  }
  assert.ok(
    !/googletagmanager\.com|google-analytics\.com|\bgtag\(/.test(html),
    'Google tags must never appear in initial HTML before consent',
  );
}
for (const { html } of htmlFiles) {
  assert.equal(
    html.includes('class="analytics-preferences"'),
    process.env.VENTILATORS_PUBLIC_RELEASE === '1' && process.env.VENTILATORS_ANALYTICS !== '0',
    'Consent controls follow the public-release flag and analytics kill switch',
  );
  assert.ok(!html.includes('<iframe'), 'Collector must be created only after browser consent');
}
assert.match(rootPage, /http-equiv="refresh" content="0;url=\/en\/"/i);
assert.ok(rootPage.includes(`<link rel="canonical" href="${siteUrl}/en/"`));
assert.ok(!rootPage.includes('gateway-actions'), 'no language selection gate');
for (const { html } of htmlFiles)
  assert.ok(html.includes('class="airgrid-site"'), 'AirGrid applies to every localized page');
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
assert.match(
  await readFile(resolve(root, 'robots.txt'), 'utf8'),
  indexingEnabled ? /Allow: \// : /Disallow: \//,
);
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
    `PASS: ${routes.length} localized pages; document languages, headings, unique metadata, canonical/hreflang, JSON-LD, internal links/assets/anchors, sitemap, ${indexingEnabled ? 'public' : 'preview'} robots, bilingual 404 and favicon.`,
  );
