import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Home,
  DivisionHub,
  ProductCategories,
  CategoryPage,
  ArticlePage,
} from '@/components/content';
import { InquiryForm } from '@/components/inquiry-form';
import { dictionaries, pathFor } from '@/content/site';
import type { ArticleKey } from '@/content/pages';
import { routes, findRoute, alternatePath } from '@/lib/routes';
import { routeMetadata, structuredData } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return routes
    .filter((route) => route.locale === params.locale)
    .map((route) => ({ slug: route.path.split('/').filter(Boolean).slice(1) }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const route = findRoute(locale, slug);
  if (!route) notFound();
  return routeMetadata(route);
}
export default async function Page({ params }: Props) {
  const { locale: lang, slug } = await params;
  const route = findRoute(lang, slug);
  if (!route) notFound();
  const { locale, page, category } = route;
  const d = dictionaries[locale];
  let content;
  if (category) content = <CategoryPage locale={locale} category={category} />;
  else if (page === 'home') content = <Home locale={locale} />;
  else if (page === 'industrial' || page === 'medical')
    content = <DivisionHub locale={locale} division={page} />;
  else if (page === 'products') content = <ProductCategories locale={locale} />;
  else if (page === 'quote')
    content = (
      <>
        <section className="container article-hero">
          <p className="eyebrow">{d.form.eyebrow}</p>
          <h1>{d.form.title}</h1>
          <p className="lead">{d.form.intro}</p>
        </section>
        <Suspense
          fallback={
            <div className="container notice">
              <strong>{d.form.unavailableTitle}</strong>
              <p>{d.form.unavailable}</p>
              <a href="mailto:info@ventilators.ca">info@ventilators.ca</a>
            </div>
          }
        >
          <InquiryForm locale={locale} />
        </Suspense>
      </>
    );
  else content = <ArticlePage locale={locale} page={page as ArticleKey} />;
  return (
    <>
      <Header locale={locale} page={page} alternate={alternatePath(route)} />
      <main id="main">
        {page !== 'home' && (
          <nav className="container breadcrumbs" aria-label={d.common.breadcrumb}>
            <a href={pathFor(locale, 'home')}>{d.nav.home}</a>
            <span aria-hidden="true">/</span>
            {category && (
              <>
                <a href={pathFor(locale, page)}>{d.nav[page]}</a>
                <span aria-hidden="true">/</span>
              </>
            )}
            <span aria-current="page">{category?.name[locale] ?? d.nav[page]}</span>
          </nav>
        )}
        {content}
      </main>
      <Footer locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(route)).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
