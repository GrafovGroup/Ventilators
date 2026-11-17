import type { Metadata } from 'next';
import '../globals.css';
import { siteUrl } from '@/lib/seo';
export const metadata: Metadata = {
  title: 'Ventilators.ca',
  description:
    'Industrial ventilation and medical procurement inquiries in Canada. English and French. / Demandes de ventilation industrielle et d’approvisionnement médical au Canada.',
  alternates: {
    canonical: siteUrl + '/en/',
    languages: {
      'en-CA': siteUrl + '/en/',
      'fr-CA': siteUrl + '/fr/',
      'x-default': siteUrl + '/en/',
    },
  },
  robots: { index: false, follow: true },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className="airgrid-site">{children}</body>
    </html>
  );
}
