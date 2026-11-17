import test from 'node:test';
import assert from 'node:assert/strict';
import { publicFormId, searchVerification } from '../src/lib/integrations';
import { analyticsPayload, analyticsEvents } from '../src/lib/analytics-contract';
import { pageHealth, redirectHealth, productionOrigin } from '../src/lib/site-health';
import { routes, alternatePath } from '../src/lib/routes';

test('public integration configuration keeps the approved endpoint and rejects pasted credentials/markup', () => {
  assert.equal(publicFormId(undefined), 'mvkaapjj');
  assert.equal(publicFormId(' abcdefgh '), 'abcdefgh');
  for (const input of ['https://formspree.io/f/mvkaapjj', '<script>', 'private_key_example'])
    assert.throws(() => publicFormId(input));
  assert.equal(
    searchVerification({
      VENTILATORS_PUBLIC_RELEASE: '1',
      GOOGLE_SITE_VERIFICATION: '',
      BING_SITE_VERIFICATION: '',
    }),
    undefined,
  );
  const env = {
    GOOGLE_SITE_VERIFICATION: 'example_Google-token_123',
    BING_SITE_VERIFICATION: '0123456789abcdef0123456789ABCDEF',
  };
  assert.equal(searchVerification(env), undefined);
  assert.deepEqual(searchVerification({ ...env, VENTILATORS_PUBLIC_RELEASE: '1' }), {
    google: env.GOOGLE_SITE_VERIFICATION,
    other: { 'msvalidate.01': env.BING_SITE_VERIFICATION },
  });
  assert.throws(() =>
    searchVerification({ GOOGLE_SITE_VERIFICATION: '<meta name="google-site-verification">' }),
  );
  assert.throws(() => searchVerification({ BING_SITE_VERIFICATION: 'wrong' }));
});

test('analytics contract accepts all planned events only in valid public context', () => {
  for (const event of analyticsEvents) {
    const route = routes.find(
      (r) =>
        r.locale === 'en' &&
        (event.startsWith('rfq_')
          ? r.page === 'quote'
          : event === 'category_viewed'
            ? !!r.category
            : r.page === 'home'),
    )!;
    const payload = {
      path: route.path,
      locale: route.locale,
      ...(event === 'division_selected' || route.category
        ? { division: route.category?.division || 'industrial' }
        : {}),
      ...(route.category ? { category: route.category.id } : {}),
      ...(event === 'language_changed' ? { target_locale: 'fr' } : {}),
    };
    assert.ok(analyticsPayload(event, payload), event);
  }
});

test('analytics contract rejects personal data, arbitrary URLs, invalid contexts and extra properties', () => {
  const base = { path: '/en/', locale: 'en' };
  for (const key of [
    'email',
    'phone',
    'name',
    'message',
    'request_id',
    'search',
    'referrer',
    'page_location',
  ])
    assert.equal(analyticsPayload('email_clicked', { ...base, [key]: 'sensitive input' }), null);
  for (const path of [
    '/en/?email=visitor@example.com',
    '/en/#visitor',
    'https://ventilators.ca/en/',
    '/unlisted/',
  ])
    assert.equal(analyticsPayload('email_clicked', { ...base, path }), null);
  assert.equal(analyticsPayload('rfq_submitted', base), null);
  assert.equal(analyticsPayload('language_changed', { ...base, target_locale: 'en' }), null);
  assert.equal(
    analyticsPayload('category_viewed', { ...base, category: 'roof', division: 'medical' }),
    null,
  );
  assert.equal(
    analyticsPayload('division_selected', {
      ...base,
      division: { toString: () => 'industrial', email: 'private' },
    }),
    null,
  );
  assert.equal(analyticsPayload('unknown_event', base), null);
});

test('health checks detect soft failures, indexing blocks, missing headers and incorrect language/redirects', () => {
  const route = routes.find((r) => r.locale === 'en' && r.page === 'home')!;
  const body = `<html lang="en-CA"><head><title>Home</title><link rel="canonical" href="${productionOrigin}${route.path}"><link href="${productionOrigin}${alternatePath(route)}" hrefLang="fr-CA"><meta name="robots" content="index, follow"></head><body><h1>Home</h1></body></html>`;
  const headers = new Headers({
    'content-type': 'text/html',
    'x-content-type-options': 'nosniff',
    'content-security-policy': "connect-src 'self' https://formspree.io; frame-ancestors 'none'",
  });
  const response = { status: 200, headers, body };
  assert.deepEqual(pageHealth(route, response), []);
  assert.ok(pageHealth(route, { ...response, status: 500 }).length);
  assert.ok(pageHealth(route, { ...response, body: '<html><h1>Coming soon</h1></html>' }).length);
  assert.ok(
    pageHealth(route, { ...response, body: body.replace('index, follow', 'noindex, nofollow') })
      .length,
  );
  assert.ok(
    pageHealth(route, { ...response, body: body.replace('lang="en-CA"', 'lang="fr-CA"') }).length,
  );
  assert.ok(
    pageHealth(route, {
      ...response,
      headers: new Headers({ ...Object.fromEntries(headers), 'x-robots-tag': 'noindex' }),
    }).length,
  );
  assert.ok(pageHealth(route, { ...response, headers: new Headers() }).length);
  assert.deepEqual(
    redirectHealth(
      { ...response, status: 301, headers: new Headers({ location: `${productionOrigin}/en/` }) },
      `${productionOrigin}/en/`,
    ),
    [],
  );
  assert.ok(redirectHealth(response, `${productionOrigin}/en/`).length);
  assert.ok(
    redirectHealth(
      { ...response, status: 301, headers: new Headers({ location: 'https://example.com/' }) },
      `${productionOrigin}/en/`,
    ).length,
  );
});
