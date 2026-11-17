import test from 'node:test';
import assert from 'node:assert/strict';
import { inquiryPayload, consentVersion } from '../src/lib/inquiry-delivery';
import type { InquiryInput } from '../src/lib/inquiry';

const reference = 'VCA-11111111-1111-4111-8111-111111111111';
const acceptedAt = '2026-11-17T18:00:00.000Z';
const valid: InquiryInput = {
  division: 'industrial',
  name: 'Synthetic Buyer',
  organization: 'QA only',
  email: 'test@example.invalid',
  phone: '',
  province: 'ON',
  category: 'repair',
  model: 'Synthetic model',
  specification: 'Synthetic requirements',
  quantity: '2',
  timeline: '1',
  urgency: 'time-sensitive',
  details: 'Synthetic inquiry. No order.',
  consent: 'yes',
};

test('delivery includes full inquiry, localized choices, reply email and versioned consent', () => {
  const payload = inquiryPayload(valid, 'en', reference, acceptedAt);
  assert.equal(payload.email, valid.email);
  assert.equal(payload.organization, valid.organization);
  assert.equal(payload.model, valid.model);
  assert.equal(payload.specification, valid.specification);
  assert.equal(payload.category, 'Fan repair inquiry');
  assert.equal(payload.category_id, 'repair');
  assert.equal(payload.timeline, 'Within 1 month');
  assert.equal(payload.urgency, 'Time-sensitive project');
  assert.equal(payload.message, valid.details);
  assert.equal(payload.consent_version, consentVersion);
  assert.equal(payload.consent_timestamp, acceptedAt);
  assert.equal(payload.request_id, reference);
  assert.equal(payload.locale, 'en-CA');
  assert.match(payload.consent_text, /Formspree/);
});

test('French medical requests retain division routing and French context', () => {
  const payload = inquiryPayload(
    { ...valid, division: 'medical', category: 'technical-support' },
    'fr',
    reference,
    acceptedAt,
  );
  assert.equal(payload.category, 'Demande de soutien technique');
  assert.equal(payload.division, 'medical');
  assert.equal(payload.locale, 'fr-CA');
  assert.equal(payload.page, 'https://ventilators.ca/fr/demande-de-soumission/');
  assert.match(payload._subject, /Médical \(FR\)/);
});

test('payload strips unrecognized fields and never accepts arbitrary routing or mail headers', () => {
  const forged = {
    ...valid,
    recipient: 'attacker@example.invalid',
    _subject: 'injected',
    _next: 'https://example.invalid',
    attachment: 'not allowed',
  };
  const payload = inquiryPayload(forged, 'en', reference, acceptedAt);
  for (const key of ['recipient', '_next', 'attachment']) assert.ok(!(key in payload));
  assert.equal(payload._subject, 'Ventilators.ca — Industrial (EN)');
  assert.ok(!payload._subject.includes(valid.name));
  assert.ok(!payload.page.includes(valid.email));
  assert.equal(payload._gotcha, '');
});

test('delivery refuses invalid inquiries and preserves the same reference on retry', () => {
  for (const patch of [
    { consent: '' },
    { email: 'invalid' },
    { category: 'technical-support' },
    { details: 'x'.repeat(4001) },
  ]) {
    assert.throws(() => inquiryPayload({ ...valid, ...patch }, 'en', reference, acceptedAt));
  }
  assert.throws(() => inquiryPayload(valid, 'en', 'unsafe reference', acceptedAt));
  assert.deepEqual(
    inquiryPayload(valid, 'en', reference, acceptedAt),
    inquiryPayload(valid, 'en', reference, acceptedAt),
  );
});
