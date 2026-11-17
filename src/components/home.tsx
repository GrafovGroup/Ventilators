import { dictionaries, pathFor, quotePath, type Locale } from '@/content/site';
import { detailPages, detailPath } from '@/content/details';
import { media } from '@/content/media';
import { ResponsivePhoto } from './responsive-photo';

export function Home({ locale }: { locale: Locale }) {
  const d = dictionaries[locale];
  const h = d.home;
  const industrial = media.find((item) => item.id === 'home-industrial')!;
  const medical = media.find((item) => item.id === 'home-medical')!;
  return (
    <>
      <section className="container airgrid-hero">
        <div className="airgrid-hero-top">
          <p className="eyebrow">{h.eyebrow}</p>
          <p>{h.intro}</p>
        </div>
        <h1>
          {h.title}
          <span className="airgrid-outline">{h.accent}</span>
        </h1>
        <figure className="airgrid-industrial" aria-labelledby="industrial-home-title">
          <ResponsivePhoto
            src={industrial.src}
            alt={industrial.alt[locale]}
            sizes="(max-width: 700px) 700px, 95vw"
            fill
            priority
          />
          <div className="airgrid-industrial-copy">
            <p className="eyebrow">01 / {h.industrial}</p>
            <h2 id="industrial-home-title">
              {h.industrialHeadline}
              <br />
              {h.industrialAccent}
            </h2>
            <div className="airgrid-actions">
              <a className="button" href={pathFor(locale, 'industrial')}>
                {h.industrialCta} <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link light" href={quotePath(locale, 'industrial')}>
                {d.common.quote}
              </a>
            </div>
          </div>
          <figcaption>{h.photoContext}</figcaption>
        </figure>
      </section>

      <section className="container airgrid-medical" aria-labelledby="medical-home-title">
        <div>
          <p className="eyebrow">02 / {h.medical}</p>
          <h2 id="medical-home-title">
            {h.medicalHeadline}
            <br />
            {h.medicalAccent}
          </h2>
        </div>
        <div className="airgrid-medical-details">
          <div>
            <p>{h.medicalText}</p>
            <a className="text-link" href={pathFor(locale, 'medical')}>
              {h.medicalCta} <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href={quotePath(locale, 'medical')}>
              {d.medical.cta}
            </a>
          </div>
          <figure>
            <ResponsivePhoto
              src={medical.src}
              alt={medical.alt[locale]}
              sizes="(max-width: 700px) calc(100vw - 40px), 200px"
            />
            <figcaption>{h.photoContext}</figcaption>
          </figure>
        </div>
      </section>

      <nav className="container airgrid-quick-links" aria-label={h.quickLinksLabel}>
        <a href={pathFor(locale, 'products')}>
          {h.categoriesCta} <span aria-hidden="true">→</span>
        </a>
        <a href={pathFor(locale, 'resources')}>
          {h.guidesCta} <span aria-hidden="true">→</span>
        </a>
      </nav>

      <section className="container airgrid-preparation">
        <div>
          <p className="eyebrow">{h.processLabel}</p>
          <h2>{h.processTitle}</h2>
          <p>{h.processText}</p>
        </div>
        <ol>
          {h.steps.map((step, index) => (
            <li key={step.title}>
              <span className="airgrid-step" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container airgrid-sectors">
        <p className="eyebrow">{h.sectorsLabel}</p>
        <h2>{h.sectorsTitle}</h2>
        <div className="airgrid-sector-list">
          {detailPages
            .filter((page) => page.group === 'industries')
            .map((sector, index) => (
              <a href={detailPath(locale, sector)} key={sector.id}>
                <span aria-hidden="true">0{index + 1}</span>
                {h.sectors[index]}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
        </div>
      </section>

      <section className="container airgrid-project">
        <div>
          <p className="eyebrow">{d.common.country}</p>
          <h2>{h.ctaTitle}</h2>
          <p>{h.ctaText}</p>
        </div>
        <a className="button" href={quotePath(locale)}>
          {d.common.quote} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}
