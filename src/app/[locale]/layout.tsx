import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/content/site';
import { searchVerification } from '@/lib/integrations';
import '../globals.css';

export const metadata: Metadata = {
  verification: searchVerification(process.env),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: { index: false, follow: false },
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale === 'fr' ? 'fr-CA' : 'en-CA'}>
      <body className="airgrid-site">{children}</body>
    </html>
  );
}
