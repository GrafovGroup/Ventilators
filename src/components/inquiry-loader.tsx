'use client';

import dynamic from 'next/dynamic';
import { dictionaries, type Locale } from '@/content/site';

function InquiryFallback({ locale }: { locale: Locale }) {
  const copy = dictionaries[locale].form;
  return (
    <div className="container notice inquiry-loading">
      <strong>{copy.unavailableTitle}</strong>
      <p>{copy.unavailable}</p>
      <a href="mailto:info@ventilators.ca">info@ventilators.ca</a>
    </div>
  );
}

// Keep the provider SDK out of the shared catch-all route's initial bundle.
// Separate localized fallbacks also work before JavaScript is available.
const EnglishInquiry = dynamic(() => import('./inquiry-form').then((m) => m.InquiryForm), {
  ssr: false,
  loading: () => <InquiryFallback locale="en" />,
});
const FrenchInquiry = dynamic(() => import('./inquiry-form').then((m) => m.InquiryForm), {
  ssr: false,
  loading: () => <InquiryFallback locale="fr" />,
});

export function InquiryLoader({ locale }: { locale: Locale }) {
  return locale === 'en' ? <EnglishInquiry locale={locale} /> : <FrenchInquiry locale={locale} />;
}
