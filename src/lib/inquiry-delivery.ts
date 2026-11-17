import { dictionaries, pathFor, type Locale } from '@/content/site';
import { fields, inquiryOptions, validateInquiry, type InquiryInput } from './inquiry';
import { publicFormId } from './integrations';

// Public form identifier supplied by the owner. Never put a private API key here.
export const formspreeId = publicFormId(process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID);
export const consentVersion = '2026-11-17-formspree-v1';

export function inquiryPayload(
  input: InquiryInput,
  locale: Locale,
  reference: string,
  acceptedAt: string,
  honeypot = '',
) {
  if (Object.keys(validateInquiry(input)).length) throw new Error('Invalid inquiry');
  if (!/^VCA-[a-f0-9-]{36}$/.test(reference)) throw new Error('Invalid reference');
  if (!Number.isFinite(Date.parse(acceptedAt))) throw new Error('Invalid consent timestamp');
  const d = dictionaries[locale];
  const t = d.form;
  const category = inquiryOptions.find((item) => item.id === input.category)!;
  // Build an explicit allowlist: never spread arbitrary form fields or URL parameters.
  return {
    ...(Object.fromEntries(fields.map((field) => [field, input[field]])) as InquiryInput),
    category: category.name[locale],
    category_id: input.category,
    timeline: t.timelines[Number(input.timeline)],
    urgency: t.urgencies[input.urgency === 'standard' ? 0 : 1],
    locale: `${locale}-CA`,
    request_id: reference,
    consent_version: consentVersion,
    consent_text: t.consent,
    consent_timestamp: acceptedAt,
    page: `https://ventilators.ca${pathFor(locale, 'quote')}`,
    _subject: `Ventilators.ca — ${d.nav[input.division as 'industrial' | 'medical']} (${locale.toUpperCase()})`,
    _gotcha: honeypot.slice(0, 200),
    message: input.details,
  };
}
