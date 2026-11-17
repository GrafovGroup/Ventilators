import Image from 'next/image';
import { AnalyticsConsent } from './analytics-consent';
import { dictionaries, navKeys, pathFor, type Locale } from '@/content/site';

export function Footer({ locale }: { locale: Locale }) {
  const d = dictionaries[locale];
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a href={pathFor(locale, 'home')}>
              <Image src="/brand/logo-reversed.svg" alt="Ventilators.ca" width={238} height={76} />
            </a>
            <p>{d.common.footer}</p>
          </div>
          <nav aria-label={locale === 'en' ? 'Footer navigation' : 'Navigation de pied de page'}>
            {navKeys.map((key) => (
              <a key={key} href={pathFor(locale, key)}>
                {d.nav[key]}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <span className="eyebrow">{d.nav.contact}</span>
            <a href="tel:+18336969996">(833) 696-9996</a>
            <a href="mailto:info@ventilators.ca">info@ventilators.ca</a>
            <p>{d.common.country}</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} {d.common.copyright}
          </span>
          <div>
            {(['privacy', 'terms', 'accessibility', 'faq'] as const).map((key) => (
              <a key={key} href={pathFor(locale, key)}>
                {d.nav[key]}
              </a>
            ))}
            <AnalyticsConsent
              locale={locale}
              enabled={
                process.env.VENTILATORS_PUBLIC_RELEASE === '1' &&
                process.env.VENTILATORS_ANALYTICS !== '0'
              }
            />
          </div>
        </div>
      </footer>
      <div className="mobile-actions">
        <a href="tel:+18336969996">{d.common.call}</a>
        <a href={pathFor(locale, 'quote')}>{d.common.quote}</a>
      </div>
    </>
  );
}
