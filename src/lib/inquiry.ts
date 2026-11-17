import { categories } from '@/content/catalog';
import { serviceOptions } from '@/content/details';
export const inquiryOptions = [
  ...categories,
  ...serviceOptions,
  ...(['industrial', 'medical'] as const).map((division) => ({
    id: `${division}-general`,
    division,
    name: {
      en: 'Not sure yet — help route this inquiry',
      fr: 'Je ne sais pas encore — aidez-moi à orienter cette demande',
    },
  })),
];

export const provinceCodes = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
] as const;
export const fields = [
  'division',
  'name',
  'organization',
  'email',
  'phone',
  'province',
  'category',
  'model',
  'specification',
  'quantity',
  'timeline',
  'urgency',
  'details',
  'consent',
] as const;
export type InquiryField = (typeof fields)[number];
export type InquiryInput = Record<InquiryField, string>;
export type ErrorCode =
  'requiredError' | 'emailError' | 'quantityError' | 'lengthError' | 'consentError';
export type InquiryErrors = Partial<Record<InquiryField, ErrorCode>>;

// Browser validation for usability. Formspree's server controls are independent.
export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const field of [
    'division',
    'name',
    'organization',
    'email',
    'province',
    'category',
    'details',
  ] as const) {
    if (!input[field]?.trim()) errors[field] = 'requiredError';
  }
  for (const field of fields) {
    if (
      input[field]?.length >
      (field === 'details' ? 4000 : field === 'specification' ? 1000 : field === 'phone' ? 60 : 200)
    )
      errors[field] = 'lengthError';
  }
  if (!['industrial', 'medical'].includes(input.division)) errors.division = 'requiredError';
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()))
    errors.email = 'emailError';
  if (!provinceCodes.includes(input.province as (typeof provinceCodes)[number]))
    errors.province = 'requiredError';
  if (!inquiryOptions.some((c) => c.division === input.division && c.id === input.category))
    errors.category = 'requiredError';
  if (
    input.quantity &&
    (!/^\d+$/.test(input.quantity) || Number(input.quantity) < 1 || Number(input.quantity) > 10000)
  )
    errors.quantity = 'quantityError';
  if (input.timeline && !['0', '1', '2', '3'].includes(input.timeline))
    errors.timeline = 'requiredError';
  if (input.urgency && !['standard', 'time-sensitive'].includes(input.urgency))
    errors.urgency = 'requiredError';
  if (input.consent !== 'yes') errors.consent = 'consentError';
  return errors;
}

export function readInquiry(data: FormData): InquiryInput {
  return Object.fromEntries(
    fields.map((field) => [
      field,
      typeof data.get(field) === 'string' ? (data.get(field) as string).trim() : '',
    ]),
  ) as InquiryInput;
}
