'use client';
import { useParams } from 'next/navigation';
export default function ErrorPage({ reset }: { reset: () => void }) {
  const locale = useParams().locale === 'fr' ? 'fr' : 'en';
  return (
    <main id="main" className="container recovery">
      <p className="eyebrow">Ventilators.ca</p>
      <h1>
        {locale === 'fr' ? 'Cette page n’a pas pu être chargée.' : 'This page could not be loaded.'}
      </h1>
      <p>
        {locale === 'fr'
          ? 'Réessayez ou revenez à l’accueil.'
          : 'Try again or return to the homepage.'}
      </p>
      <button className="button" onClick={reset}>
        {locale === 'fr' ? 'Réessayer' : 'Try again'}
      </button>
      <a className="text-link" href={`/${locale}/`}>
        {locale === 'fr' ? 'Accueil' : 'Home'}
      </a>
    </main>
  );
}
