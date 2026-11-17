import Image from 'next/image';
import Link from 'next/link';
export default function Gateway() {
  return (
    <main className="gateway">
      <Image src="/brand/logo.svg" width={300} height={96} alt="Ventilators.ca" priority />
      <p className="eyebrow">CANADA</p>
      <h1>
        Industrial & medical.
        <br />
        <span lang="fr-CA">Industriel et médical.</span>
      </h1>
      <div className="gateway-actions">
        <Link className="button" href="/en/" lang="en-CA">
          English
        </Link>
        <Link className="button button-outline" href="/fr/" lang="fr-CA">
          Français
        </Link>
      </div>
    </main>
  );
}
