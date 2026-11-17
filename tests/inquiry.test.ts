import test from 'node:test';
import assert from 'node:assert/strict';
import { readInquiry, validateInquiry, type InquiryInput } from '../src/lib/inquiry';

const valid: InquiryInput = {
  division: 'industrial',
  name: 'Test Buyer',
  organization: 'Example procurement team',
  email: 'buyer@example.test',
  phone: '',
  province: 'ON',
  category: 'roof',
  model: '',
  specification: '',
  quantity: '2',
  timeline: '1',
  details: 'Replacement inquiry for an existing rooftop unit.',
  consent: 'yes',
};
test('a valid industrial inquiry passes local review', () =>
  assert.deepEqual(validateInquiry(valid), {}));
test('medical inquiry uses only medical categories', () => {
  assert.equal(validateInquiry({ ...valid, division: 'medical' }).category, 'requiredError');
  assert.deepEqual(validateInquiry({ ...valid, division: 'medical', category: 'procurement' }), {});
});
test('requires consent and meaningful required fields', () => {
  const errors = validateInquiry({
    ...valid,
    name: ' ',
    organization: '',
    details: '\n',
    consent: '',
  });
  assert.deepEqual(Object.keys(errors).sort(), ['consent', 'details', 'name', 'organization']);
});
test('rejects bad emails, unknown province, forged category and timeline', () => {
  const errors = validateInquiry({
    ...valid,
    email: 'name@',
    province: 'XX',
    category: 'invented',
    timeline: '99',
  });
  assert.deepEqual(Object.keys(errors).sort(), ['category', 'email', 'province', 'timeline']);
});
test('quantities must be bounded positive integers', () => {
  for (const quantity of ['0', '-1', '1.5', '10001', '1e3', 'NaN', ''])
    assert.equal(validateInquiry({ ...valid, quantity }).quantity, 'quantityError');
  for (const quantity of ['1', '10000'])
    assert.equal(validateInquiry({ ...valid, quantity }).quantity, undefined);
});
test('enforces text limits and known division', () => {
  assert.equal(validateInquiry({ ...valid, details: 'x'.repeat(4001) }).details, 'lengthError');
  assert.equal(validateInquiry({ ...valid, division: 'unknown' }).division, 'requiredError');
});
test('FormData normalization trims text and ignores unrelated fields', () => {
  const data = new FormData();
  for (const [key, value] of Object.entries(valid)) data.set(key, ` ${value} `);
  data.set('unexpected', 'not read');
  assert.deepEqual(readInquiry(data), valid);
});
