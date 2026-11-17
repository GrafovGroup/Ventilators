import { categories, categoryPath } from '@/content/catalog';
import {
  detailPages,
  detailPath,
  referenceSources,
  type DetailGroup,
  type DetailPage,
} from '@/content/details';
import { dictionaries, quotePath, type Division, type Locale } from '@/content/site';
import { PageVisual } from './page-visual';

export function DetailIndex({
  locale,
  group,
  division,
  exclude,
}: {
  locale: Locale;
  group: DetailGroup;
  division?: Division;
  exclude?: string;
}) {
  const pages = detailPages.filter(
    (p) => p.group === group && (!division || p.division === division) && p.id !== exclude,
  );
  return (
    <div className="detail-index">
      {pages.map((page, index) => (
        <a className="detail-card" href={detailPath(locale, page)} key={page.id}>
          <div className="detail-card-meta">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span>{dictionaries[locale].nav[page.division]}</span>
          </div>
          <h3>{page.title[locale]}</h3>
          <p>{page.summary[locale]}</p>
          <span className="text-link">
            {locale === 'en' ? 'Explore this topic' : 'Explorer ce sujet'}{' '}
            <span aria-hidden="true">↗</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function DetailArticle({ locale, detail }: { locale: Locale; detail: DetailPage }) {
  const d = dictionaries[locale];
  const related = categories.filter((c) => detail.relatedCategories.includes(c.id));
  return (
    <>
      <section className="container hub-hero detail-hero">
        <div>
          <p className="eyebrow">
            {d.nav[detail.group]} / {d.nav[detail.division]}
          </p>
          <h1>{detail.title[locale]}</h1>
          <p className="lead">{detail.summary[locale]}</p>
          <a className="button" href={quotePath(locale, detail.division, detail.inquiryCategory)}>
            {d.common.inquiry}
          </a>
          {detail.group === 'resources' && (
            <a
              className="text-link guide-download"
              download
              href={`/downloads/${detail.id}-${locale}.txt`}
            >
              {d.common.download} (.txt)
            </a>
          )}
        </div>
        <PageVisual id={detail.id} locale={locale} priority />
      </section>
      <div className="container detail-layout">
        <nav
          className="contents-nav"
          aria-label={locale === 'en' ? 'On this page' : 'Dans cette page'}
        >
          <p className="eyebrow">{locale === 'en' ? 'On this page' : 'Dans cette page'}</p>
          {detail.sections.map((s, i) => (
            <a href={`#${s.id}`} key={s.id}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {s.title[locale]}
            </a>
          ))}
        </nav>
        <div className="detail-body">
          {detail.sections.map((s, i) => (
            <section key={s.id} id={s.id}>
              <span className="step-index">0{i + 1}</span>
              <h2>{s.title[locale]}</h2>
              <p>{s.body[locale]}</p>
              <ul className="detail-checklist">
                {s.items[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          {detail.sources.length > 0 && (
            <section className="reference-links">
              <h2>{locale === 'en' ? 'Reference reading' : 'Lectures de référence'}</h2>
              {detail.sources.map((id) => (
                <div key={id}>
                  <a className="text-link" href={referenceSources[id].url[locale]}>
                    {referenceSources[id].title[locale]}
                  </a>
                  <p>{referenceSources[id].note[locale]}</p>
                </div>
              ))}
            </section>
          )}
          <aside className="scope-note">
            <h2>{d[detail.division].scopeTitle}</h2>
            <p>{d[detail.division].scopeText}</p>
          </aside>
        </div>
      </div>
      <section className="container section-space">
        <div className="section-intro">
          <h2>
            {locale === 'en' ? 'Related equipment categories' : 'Catégories d’équipement connexes'}
          </h2>
          <p>
            {locale === 'en'
              ? 'Use the category brief to identify the information needed for your request.'
              : 'Consultez la catégorie pour connaître les renseignements à préparer.'}
          </p>
        </div>
        <div className="related-links">
          {related.map((c) => (
            <a href={categoryPath(locale, c)} key={c.id}>
              {c.name[locale]} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="preparation">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow">{d.nav.quote}</p>
            <h2>
              {locale === 'en'
                ? 'Turn your brief into an inquiry.'
                : 'Passez du dossier à la demande.'}
            </h2>
            <p className="lead">
              {locale === 'en'
                ? 'Your division and request type will be selected for you.'
                : 'La division et le type de demande seront présélectionnés.'}
            </p>
          </div>
          <a className="button" href={quotePath(locale, detail.division, detail.inquiryCategory)}>
            {d.common.inquiry}
          </a>
        </div>
      </section>
    </>
  );
}
