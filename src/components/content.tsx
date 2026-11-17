import { CategoryFinder } from './category-finder';
import { finderCopy, categoryAliases } from '@/content/finder';
import { dictionaries, pathFor, quotePath, type Locale, type Division } from '@/content/site';
import { categories, categoryPath, type Category } from '@/content/catalog';
import { articles, type ArticleKey } from '@/content/pages';
import { detailPages, detailPath } from '@/content/details';
import { DetailIndex } from './detail-content';
import { PageVisual } from './page-visual';
import { categoryGuides } from '@/content/category-guides';

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

export { Home } from './home';

export function CategoryList({
  locale,
  division,
  exclude,
}: {
  locale: Locale;
  division: Division;
  exclude?: string;
}) {
  const d = dictionaries[locale];
  return (
    <div className="category-list">
      {categories
        .filter((c) => c.division === division && c.id !== exclude)
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
        <PageVisual id={division} locale={locale} priority />
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
      <section className="container section-space">
        <h2>{d.nav.services}</h2>
        <DetailIndex locale={locale} group="services" division={division} />
      </section>
      <ProjectCTA locale={locale} division={division} />
    </>
  );
}

export function CategoryPage({ locale, category }: { locale: Locale; category: Category }) {
  const d = dictionaries[locale];
  const guide = categoryGuides[category.id];
  return (
    <>
      <section className="container hub-hero detail-hero">
        <div>
          <p className="eyebrow">{d.nav[category.division]}</p>
          <h1>{category.name[locale]}</h1>
          <p className="lead">{category.summary[locale]}</p>
          <span className="inquiry-badge">{d.form.status}</span>
        </div>
        <PageVisual id={category.id} locale={locale} priority />
      </section>
      <section className="container category-context">
        <h2>{guide.title[locale]}</h2>
        <p>{guide.body[locale]}</p>
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
          <h2>{guide.checkTitle[locale]}</h2>
          <p>{guide.check[locale]}</p>
          <a
            className="text-link"
            href={detailPath(
              locale,
              detailPages.find((p) => p.id === guide.resource)!,
            )}
          >
            {locale === 'en' ? 'Read the preparation guide' : 'Lire le guide de préparation'}
          </a>
        </aside>
      </section>
      <section className="preparation">
        <div className="container preparation-grid">
          <div>
            <h2>{d[category.division].scopeTitle}</h2>
            <p>{d[category.division].scopeText}</p>
          </div>
          <div>
            <p className="eyebrow">{d.nav.services}</p>
            <div className="related-links">
              {detailPages
                .filter((p) => p.group === 'services' && p.relatedCategories.includes(category.id))
                .map((p) => (
                  <a href={detailPath(locale, p)} key={p.id}>
                    {p.title[locale]} <span aria-hidden="true">↗</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container section-space">
        <h2>{d.common.categories}</h2>
        <CategoryList locale={locale} division={category.division} exclude={category.id} />
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
        <p className="lead">{finderCopy[locale].intro}</p>
      </section>
      <CategoryFinder
        copy={finderCopy[locale]}
        inquiryHref={quotePath(locale)}
        entries={categories.map((category) => ({
          id: category.id,
          division: category.division,
          name: category.name[locale],
          summary: category.summary[locale],
          href: categoryPath(locale, category),
          searchText: [
            category.name[locale],
            category.summary[locale],
            category.considerations[locale].join(' '),
            categoryAliases[category.id]?.[locale] ?? '',
          ].join(' '),
        }))}
      />
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
      {(['services', 'industries', 'resources'] as string[]).includes(page) && (
        <section className="container section-space detail-directory" aria-label={d.nav[page]}>
          <h2>
            {locale === 'en'
              ? page === 'services'
                ? 'Explore service scopes'
                : page === 'industries'
                  ? 'Find your facility type'
                  : 'Guides for your next inquiry'
              : page === 'services'
                ? 'Explorez les portées de service'
                : page === 'industries'
                  ? 'Trouvez votre type d’établissement'
                  : 'Guides pour votre prochaine demande'}
          </h2>
          <DetailIndex locale={locale} group={page as 'services' | 'industries' | 'resources'} />
        </section>
      )}
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
                {page === 'privacy' && index === 0 && (
                  <a className="text-link" href="https://formspree.io/legal/privacy-policy/">
                    {locale === 'en'
                      ? 'Formspree privacy policy'
                      : 'Politique de confidentialité de Formspree'}
                  </a>
                )}
                {page === 'privacy' && index === 1 && (
                  <a
                    className="text-link"
                    href={
                      locale === 'en'
                        ? 'https://www.whc.ca/legal/privacy-policy/'
                        : 'https://www.whc.ca/mentions-legales/politique-de-confidentialite'
                    }
                  >
                    {locale === 'en' ? 'WHC privacy policy' : 'Politique de confidentialité de WHC'}
                  </a>
                )}
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
