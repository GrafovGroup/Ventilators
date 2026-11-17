import './globals.css';
import Link from 'next/link';
export const metadata = {
  title: 'Page not found / Page introuvable | Ventilators.ca',
  robots: { index: false, follow: false },
};
export default function GlobalNotFound() {
  return (
    <html lang="en-CA">
      <body>
        <main className="container recovery">
          <p className="eyebrow">VENTILATORS.CA / 404</p>
          <h1>Page not found.</h1>
          <p lang="fr-CA">Cette page est introuvable.</p>
          <div className="gateway-actions">
            <Link className="button" href="/en/">
              English homepage
            </Link>
            <Link className="button button-outline" href="/fr/" lang="fr-CA">
              Accueil en français
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
