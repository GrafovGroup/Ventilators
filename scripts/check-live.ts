// Read-only, manually invoked availability/SEO check. Never submits inquiries.
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { routes } from '../src/lib/routes';
import {
  pageHealth,
  productionOrigin,
  redirectHealth,
  type HealthResponse,
} from '../src/lib/site-health';

type Probe = { path: string; check: (response: HealthResponse) => string[] };
const probes: Probe[] = routes.map((route) => ({
  path: route.path,
  check: (response) => pageHealth(route, response),
}));
for (const path of ['/', '/index.html', '/?healthcheck=1']) {
  probes.push({
    path,
    check: (response) =>
      redirectHealth(
        response,
        `${productionOrigin}/en/${path.includes('?') ? '?healthcheck=1' : ''}`,
      ),
  });
}
probes.push({
  path: '/__site_health_missing__/',
  check: (r) => (r.status === 404 ? [] : ['Missing page must return HTTP 404']),
});
probes.push({
  path: '/robots.txt',
  check: (r) =>
    r.status === 200 &&
    !/^Disallow:\s*\/\s*$/im.test(r.body) &&
    r.body.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)
      ? []
      : ['Public robots policy mismatch'],
});
for (const locale of ['', 'en', 'fr']) {
  const expected = routes.filter((route) => !locale || route.locale === locale);
  probes.push({
    path: `/sitemap${locale ? `-${locale}` : ''}.xml`,
    check: (r) => {
      const locations = [...r.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
      return r.status === 200 &&
        locations.length === expected.length &&
        expected.every((route) => locations.includes(`${productionOrigin}${route.path}`))
        ? []
        : ['Sitemap route inventory mismatch'];
    },
  });
}
for (const filename of (await readdir('public/downloads')).filter((name) =>
  name.endsWith('.txt'),
)) {
  probes.push({
    path: `/downloads/${filename}`,
    check: (r) =>
      r.status === 200 && r.body.trim().length > 100 && !r.body.includes('<!DOCTYPE')
        ? []
        : ['Checklist missing or empty'],
  });
}
const results: { path: string; status: number | null; elapsedMs: number; errors: string[] }[] = [];
let cursor = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < probes.length) {
      const probe = probes[cursor++];
      const started = Date.now();
      try {
        // Fixed origin and manual redirects prevent probing an untrusted redirect target.
        const response = await fetch(productionOrigin + probe.path, {
          redirect: 'manual',
          signal: AbortSignal.timeout(15_000),
          headers: { 'User-Agent': 'Ventilators-Site-Health/1.0' },
        });
        const body = await response.text();
        results.push({
          path: probe.path,
          status: response.status,
          elapsedMs: Date.now() - started,
          errors: probe.check({ status: response.status, headers: response.headers, body }),
        });
      } catch {
        // Do not persist arbitrary response bodies, request headers, or exception details.
        results.push({
          path: probe.path,
          status: null,
          elapsedMs: Date.now() - started,
          errors: ['Request failed (network, TLS or timeout)'],
        });
      }
    }
  }),
);
results.sort((a, b) => a.path.localeCompare(b.path));
const failed = results.filter((result) => result.errors.length);
const reportPath = process.argv[2] || 'qa/generated/site-health.json';
await mkdir(dirname(reportPath), { recursive: true });
await writeFile(
  reportPath,
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      origin: productionOrigin,
      mode: 'read-only; no form submission or inbox-delivery test',
      passed: results.length - failed.length,
      failed: failed.length,
      results,
    },
    null,
    2,
  ) + '\n',
);
for (const result of failed) console.error(`${result.path}: ${result.errors.join('; ')}`);
console.log(
  `${failed.length ? 'FAIL' : 'PASS'}: ${results.length} live checks; ${failed.length} failures. Report: ${reportPath}`,
);
process.exitCode = failed.length ? 1 : 0;
