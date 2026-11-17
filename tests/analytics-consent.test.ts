import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { consentLifetime, consentRecord, readConsent } from '../src/lib/analytics-consent';

test('consent expires, malformed/future/old records fail closed, and neither choice renews on read', () => {
  const now = 1800000000000;
  for (const choice of ['granted', 'denied'] as const) {
    const record = consentRecord(choice, now);
    const raw = JSON.stringify(record);
    assert.deepEqual(readConsent(raw, now), record);
    assert.deepEqual(readConsent(raw, now + consentLifetime - 1), record);
    assert.equal(readConsent(raw, now + consentLifetime), null);
    assert.equal(readConsent(raw, now - 1), null);
    for (const change of [
      { version: 0 },
      { choice: 'yes' },
      { expiresAt: now + consentLifetime + 1 },
      { updatedAt: null },
    ])
      assert.equal(readConsent(JSON.stringify({ ...record, ...change }), now), null);
  }
  for (const raw of [null, '', 'true', '[]', 'null', '{broken'])
    assert.equal(readConsent(raw, now), null);
});

const source = readFileSync('public/analytics/collector.js', 'utf8');
function collector(origin = 'https://ventilators.ca', topLevel = false) {
  const scripts: Record<string, unknown>[] = [];
  const messages: unknown[] = [];
  let receive: (message: unknown) => void = () => {};
  const parent = { postMessage: (...args: unknown[]) => messages.push(args) };
  const window = {
    addEventListener: (_: string, handler: typeof receive) => {
      receive = handler;
    },
  };
  const mockWindow = window as typeof window & {
    dataLayer: IArguments[];
    stopAnalytics: () => void;
    'ga-disable-G-59FBT5T5V1': boolean;
  };
  const context = {
    parent: topLevel ? window : parent,
    window,
    location: { origin },
    document: {
      createElement: () => ({
        remove() {
          this.removed = true;
        },
        removed: false,
      }),
      head: { append: (tag: Record<string, unknown>) => scripts.push(tag) },
    },
  };
  runInNewContext(source, context);
  const send = (payload: unknown, overrides = {}) =>
    receive({
      source: parent,
      origin,
      data: { type: 'ventilators:measure', payload },
      ...overrides,
    });
  return { window: mockWindow, scripts, messages, send };
}

test('collector is inert on previews/top-level visits and before a valid consent-created handshake', () => {
  assert.equal(collector('http://localhost:3000').messages.length, 0);
  assert.equal(collector('https://ventilators.ca', true).messages.length, 0);
  const c = collector();
  assert.equal(c.scripts.length, 0);
  for (const payload of [
    null,
    { event: 'page_view', path: '/en/?email=test@example.com', locale: 'en' },
    { event: 'page_view', path: '/en/', locale: 'en', email: 'test@example.com' },
    { event: 'rfq_started', path: '/en/', locale: 'en' },
  ])
    c.send(payload);
  c.send(
    { event: 'page_view', path: '/en/', locale: 'en' },
    { origin: 'https://elsewhere.example' },
  );
  c.send({ event: 'page_view', path: '/en/', locale: 'en' }, { source: {} });
  assert.equal(c.scripts.length, 0);
});

test('collector config suppresses automatic/ad/referrer tracking; stop prevents queued and future events', () => {
  const c = collector();
  c.send({ event: 'page_view', path: '/fr/', locale: 'fr' });
  assert.equal(c.scripts.length, 1);
  assert.equal(c.scripts[0].referrerPolicy, 'no-referrer');
  const commands = c.window.dataLayer.map(
    (args: IArguments) =>
      Array.from(args) as [string, string, Record<string, string | number | boolean>],
  );
  assert.equal(commands[0][2].analytics_storage, 'denied');
  assert.equal(commands[0][2].ad_storage, 'denied');
  assert.equal(commands[0][2].ad_user_data, 'denied');
  assert.equal(commands[0][2].ad_personalization, 'denied');
  assert.equal(commands[1][2].analytics_storage, 'granted');
  const config = commands.find((c) => c[0] === 'config')![2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(config.cookie_expires, consentLifetime / 1000);
  assert.equal(config.cookie_update, false);
  assert.equal(config.page_referrer, '');
  assert.equal(config.page_location, 'https://ventilators.ca/fr/');
  c.window.stopAnalytics();
  c.send({ event: 'phone_clicked', path: '/fr/', locale: 'fr' });
  assert.equal(c.window['ga-disable-G-59FBT5T5V1'], true);
  assert.equal(c.window.dataLayer.length, 0);
  assert.equal(c.scripts[0].removed, true);
});
