import type { Metadata } from 'next';
import '../globals.css';
import { indexingEnabled, siteUrl } from '@/lib/seo';
export const metadata: Metadata = {
  title: 'Ventilators.ca | English · Français',
  description:
    'Industrial ventilation and medical procurement inquiries in Canada. English and French. / Demandes de ventilation industrielle et d’approvisionnement médical au Canada.',
  alternates: {
    canonical: siteUrl + '/',
    languages: { 'en-CA': siteUrl + '/en/', 'fr-CA': siteUrl + '/fr/', 'x-default': siteUrl + '/' },
  },
  robots: { index: indexingEnabled, follow: indexingEnabled },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};
export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
