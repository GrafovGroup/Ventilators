import type { Metadata } from 'next';
import '../globals.css';
export const metadata: Metadata = {
  title: 'Ventilators.ca | English · Français',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
};
export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
