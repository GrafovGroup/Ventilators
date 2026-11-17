import Image from 'next/image';
import { dictionaries, pathFor, quotePath, type Locale, type Division } from '@/content/site';
import { categories, categoryPath, type Category } from '@/content/catalog';
import { articles, type ArticleKey } from '@/content/pages';

export function ProjectCTA({ locale, division }: { locale: Locale; division?: Division }) {
  const d = dictionaries[locale];
  return (
    <section className="project-cta">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">{d.common.country}</p>
          <h2>{d.home.ctaTitle}</h2>
          <p>{d.home.ctaText}</p>
        </div>
        <a className="button button-white" href={quotePath(locale, division)}>
          {d.common.quote}
        </a>
      </div>
    </section>
  );
}

export function Home({ locale }: { locale: Locale }) {
  const d = dictionaries[locale];
  return (
    <>
      <section className="container home-intro">
        <div>
          <p className="eyebrow">
            <span className="status-dot" />
            {d.home.eyebrow}
          </p>
          <h1>
            {d.home.title}
            <br />
            <span>{d.home.accent}</span>
          </h1>
        </div>
        <p className="intro-copy">{d.home.intro}</p>
      </section>
      <section
        className="container division-grid"
        aria-label={locale === 'en' ? 'Choose your division' : 'Choisissez votre division'}
      >
        {(['industrial', 'medical'] as const).map((division, index) => (
          <article className={`division-panel ${division}`} key={division}>
            <Image
              src={`/images/${division}.webp`}
              alt={
                locale === 'en'
                  ? division === 'industrial'
                    ? 'Large axial ventilation fans on an industrial building'
                    : 'Medical equipment in a clinical environment'
                  : division === 'industrial'
                    ? 'Grands ventilateurs axiaux sur un bâtiment industriel'
                    : 'Équipement médical en milieu clinique'
              }
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              priority
            />
            <div className="panel-top">
              <span className="eyebrow">
                {division === 'industrial' ? d.home.industrialTag : d.home.medicalTag}
              </span>
              <span className="panel-number">0{index + 1}</span>
            </div>
            <div className="panel-content">
              <h2>{division === 'industrial' ? d.home.industrial : d.home.medical}</h2>
              <p>{division === 'industrial' ? d.home.industrialText : d.home.medicalText}</p>
              <div className="panel-actions">
                <a className="button button-white" href={pathFor(locale, division)}>
                  {division === 'industrial' ? d.home.industrialCta : d.home.medicalCta}
                </a>
                <a className="text-link light" href={quotePath(locale, division)}>
                  {d.common.quote}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
      <div className="container">
        <div className="trust-strip">
          <span>{d.home.strip1}</span>
          <span>{d.home.strip2}</span>
          <span>{d.home.strip3}</span>
        </div>
        <p className="image-notice">{d.common.notice}</p>
      </div>
      <section className="container process-section">
        <div className="section-intro">
          <div>
            <p className="eyebrow">{d.home.processLabel}</p>
            <h2>{d.home.processTitle}</h2>
          </div>
          <p>{d.home.processText}</p>
        </div>
        <ol className="process-steps">
          {d.home.steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="sector-section">
        <div className="container">
          <p className="eyebrow">{d.home.sectorsLabel}</p>
          <h2>{d.home.sectorsTitle}</h2>
          <div className="sector-list">
            {d.home.sectors.map((sector, index) => (
              <a
                href={`${pathFor(locale, 'industries')}#${index < 2 ? 'section-1' : index === 2 ? 'section-2' : 'section-3'}`}
                key={sector}
              >
                <span className="sector-mark" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {sector}
              </a>
            ))}
          </div>
        </div>
      </section>
      <ProjectCTA locale={locale} />
    </>
  );
}

export function CategoryList({ locale, division }: { locale: Locale; division: Division }) {
  const d = dictionaries[locale];
  return (
    <div className="category-list">
      {categories
        .filter((c) => c.division === division)
        .map((category, index) => (
          <a href={categoryPath(locale, category)} key={category.id} className="category-row">
            <span className="category-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{category.name[locale]}</h3>
              <p>{category.summary[locale]}</p>
            </div>
            <span className="category-link">{d.common.learn}</span>
          </a>
        ))}
    </div>
  );
}

export function DivisionHub({ locale, division }: { locale: Locale; division: Division }) {
  const d = dictionaries[locale];
  const c = d[division];
  return (
    <>
      <section className="container hub-hero">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className="lead">{c.intro}</p>
          <a className="button" href={quotePath(locale, division)}>
            {c.cta}
          </a>
        </div>
        <figure>
          <Image
            src={`/images/${division}.webp`}
            alt={
              locale === 'en'
                ? division === 'industrial'
                  ? 'Industrial ventilation fans'
                  : 'Clinical equipment, shown for context'
                : division === 'industrial'
                  ? 'Ventilateurs industriels'
                  : 'Équipement clinique présenté à titre illustratif'
            }
            width={1200}
            height={1000}
            priority
          />
          <figcaption>{d.common.notice}</figcaption>
        </figure>
      </section>
      <section className="container section-space">
        <div className="section-intro">
          <h2>{c.categoryTitle}</h2>
          <p>{c.categoryText}</p>
        </div>
        <CategoryList locale={locale} division={division} />
      </section>
      <section className="preparation">
        <div className="container preparation-grid">
          <div>
            <p className="eyebrow">{d.nav.resources}</p>
            <h2>{c.prepareTitle}</h2>
            <p>{c.prepareText}</p>
            <a className="text-link" href={pathFor(locale, 'resources')}>
              {d.common.read}
            </a>
          </div>
          <div className="scope-note">
            <span className="small-label">
              {division === 'medical'
                ? locale === 'en'
                  ? 'PROCUREMENT NOTE'
                  : 'NOTE D’APPROVISIONNEMENT'
                : locale === 'en'
                  ? 'SERVICE SCOPE'
                  : 'PORTÉE DES SERVICES'}
            </span>
            <h3>{c.scopeTitle}</h3>
            <p>{c.scopeText}</p>
          </div>
        </div>
      </section>
      <ProjectCTA locale={locale} division={division} />
    </>
  );
}

export function CategoryPage({ locale, category }: { locale: Locale; category: Category }) {
  const d = dictionaries[locale];
  return (
    <>
      <section className="container article-hero">
        <p className="eyebrow">{d.nav[category.division]}</p>
        <h1>{category.name[locale]}</h1>
        <p className="lead">{category.summary[locale]}</p>
        <span className="inquiry-badge">{d.form.status}</span>
      </section>
      <section className="container article-grid">
        <div>
          <h2>
            {locale === 'en' ? 'What to include in your inquiry' : 'À inclure dans votre demande'}
          </h2>
          <ol className="checklist">
            {category.considerations[locale].map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
          <a className="button" href={quotePath(locale, category.division, category.id)}>
            {d.common.inquiry}
          </a>
        </div>
        <aside className="scope-note">
          <h2>{d[category.division].scopeTitle}</h2>
          <p>{d[category.division].scopeText}</p>
          <a className="text-link" href={pathFor(locale, 'resources')}>
            {d.nav.resources}
          </a>
        </aside>
      </section>
      <section className="container section-space">
        <h2>{d.common.categories}</h2>
        <CategoryList locale={locale} division={category.division} />
      </section>
    </>
  );
}

export function ProductCategories({ locale }: { locale: Locale }) {
  const d = dictionaries[locale];
  return (
    <>
      <section className="container article-hero">
        <p className="eyebrow">{d.nav.products}</p>
        <h1>{d.common.categories}</h1>
        <p className="lead">
          {locale === 'en'
            ? 'Start with the equipment category that fits your project. These pages help prepare an inquiry; they are not a verified product catalogue.'
            : 'Commencez par la catégorie adaptée à votre projet. Ces pages aident à préparer une demande; elles ne constituent pas un catalogue de produits vérifiés.'}
        </p>
      </section>
      {(['industrial', 'medical'] as const).map((division) => (
        <section className="container section-space" key={division}>
          <h2>{d.nav[division]}</h2>
          <CategoryList locale={locale} division={division} />
        </section>
      ))}
    </>
  );
}

export function ArticlePage({ locale, page }: { locale: Locale; page: ArticleKey }) {
  const d = dictionaries[locale];
  const article = articles[locale][page];
  return (
    <>
      <section className="container article-hero">
        <p className="eyebrow">{article.eyebrow}</p>
        <h1>{article.title}</h1>
        <p className="lead">{article.intro}</p>
        {page === 'contact' && (
          <div className="contact-links">
            <a href="tel:+18336969996">(833) 696-9996</a>
            <a href="mailto:info@ventilators.ca">info@ventilators.ca</a>
          </div>
        )}
      </section>
      <div className={`container article-sections ${page === 'faq' ? 'faq-list' : ''}`}>
        {article.sections.map((section, index) =>
          page === 'faq' ? (
            <details key={section.title}>
              <summary>{section.title}</summary>
              <p>{section.body}</p>
            </details>
          ) : (
            <section key={section.title} id={`section-${index + 1}`}>
              <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {page === 'resources' && index < 2 && (
                  <a
                    className="text-link"
                    download
                    href={`/downloads/${index === 0 ? 'industrial' : 'medical'}-checklist-${locale}.txt`}
                  >
                    {d.common.download} (.txt)
                  </a>
                )}
              </div>
            </section>
          ),
        )}
      </div>
      {!['privacy', 'terms', 'accessibility'].includes(page) && <ProjectCTA locale={locale} />}
    </>
  );
}
