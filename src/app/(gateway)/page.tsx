import Link from 'next/link';

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en/" />
      <main className="container recovery">
        <h1>Opening Ventilators.ca</h1>
        <p>
          <Link className="text-link" href="/en/">
            Continue to the homepage
          </Link>
        </p>
      </main>
    </>
  );
}
