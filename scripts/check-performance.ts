// Deterministic transfer-size budgets, not a claim about real-world Core Web Vitals.
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';
import { routes } from '../src/lib/routes';
import photos from '../src/content/photo-variants.json';

const report = [];
for (const route of routes) {
  const html = await readFile(`out${route.path}index.html`, 'utf8');
  const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]))];
  const styles = [
    ...new Set([...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map((m) => m[1])),
  ];
  const bytes = async (paths: string[]) =>
    (
      await Promise.all(paths.map(async (path) => gzipSync(await readFile(`out${path}`)).length))
    ).reduce((sum, size) => sum + size, 0);
  const jsGzipBytes = await bytes(scripts);
  const cssGzipBytes = await bytes(styles);
  assert.ok(jsGzipBytes <= 200_000, `${route.path}: initial JavaScript ${jsGzipBytes} > 200 KB`);
  assert.ok(cssGzipBytes <= 15_000, `${route.path}: CSS ${cssGzipBytes} > 15 KB`);
  report.push({
    route: route.path,
    htmlBytes: Buffer.byteLength(html),
    initialJavaScriptGzipBytes: jsGzipBytes,
    cssGzipBytes,
    scripts,
  });
}
const images = [];
for (const [source, photo] of Object.entries(photos)) {
  const originalBytes = (await readFile(`public${source}`)).length;
  for (const variant of photo.variants) {
    const bytes = (await readFile(`public${variant.src}`)).length;
    assert.ok(bytes < originalBytes, `Variant must be smaller: ${variant.src}`);
    assert.ok(
      bytes < (variant.width <= 480 ? 70_000 : variant.width <= 800 ? 160_000 : 300_000),
      `Photo exceeds size budget: ${variant.src}`,
    );
    images.push({ source, src: variant.src, width: variant.width, bytes, originalBytes });
  }
}
if (process.argv[2])
  await writeFile(
    process.argv[2],
    JSON.stringify(
      {
        method:
          'Sum of gzip-compressed initial external scripts/styles in static HTML; image file bytes. Excludes deferred inquiry SDK. Not field performance timing.',
        routes: report,
        images,
      },
      null,
      2,
    ) + '\n',
  );
console.log(
  `PASS: ${report.length} routes within initial JS/CSS budgets; ${images.length} responsive photos within size budgets. Maximum initial JS: ${Math.max(...report.map((r) => r.initialJavaScriptGzipBytes))} gzip bytes.`,
);
