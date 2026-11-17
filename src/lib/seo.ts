import type { Metadata } from 'next';
import { pageSearchCopy, prioritySearchCopy } from '@/content/search-copy';
import { dictionaries, pathFor } from '@/content/site';
import { alternatePath, type Route } from './routes';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ventilators.ca').replace(
  /\/$/,
  '',
);
// Explicit, documented build flag for the owner-authorized public release.
// Local/review builds remain noindex by default. This never enables RFQ delivery.
export const indexingEnabled = process.env.VENTILATORS_PUBLIC_RELEASE === '1';

export function routeMetadata(route: Route): Metadata {
  const search = route.category ? prioritySearchCopy[route.category.id]?.[route.locale] : undefined;
  const title =
    route.detail?.title[route.locale] ??
    search?.title ??
    route.category?.name[route.locale] ??
    pageSearchCopy[route.page][route.locale].title;
  const description =
    route.detail?.summary[route.locale] ??
    search?.description ??
    route.category?.summary[route.locale] ??
    pageSearchCopy[route.page][route.locale].description;
  const en = route.locale === 'en' ? route.path : alternatePath(route);
  const fr = route.locale === 'fr' ? route.path : alternatePath(route);
  return {
    title: `${title} | Ventilators.ca`,
    description,
    alternates: {
      canonical: `${siteUrl}${route.path}`,
      languages: {
        'en-CA': `${siteUrl}${en}`,
        'fr-CA': `${siteUrl}${fr}`,
        'x-default': `${siteUrl}${en}`,
      },
    },
    robots: { index: indexingEnabled, follow: indexingEnabled },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Ventilators.ca',
      locale: route.locale === 'fr' ? 'fr_CA' : 'en_CA',
      alternateLocale: route.locale === 'fr' ? 'en_CA' : 'fr_CA',
      url: `${siteUrl}${route.path}`,
      images: [
        {
          url: `${siteUrl}/brand/social-${route.locale}.png`,
          width: 1200,
          height: 630,
          alt: 'Ventilators.ca',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/brand/social-${route.locale}.png`],
    },
  };
}

export function structuredData(route: Route) {
  const d = dictionaries[route.locale];
  const items = [
    { '@type': 'ListItem', position: 1, name: d.nav.home, item: `${siteUrl}/${route.locale}/` },
  ];
  if (route.category || route.detail)
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: d.nav[route.page],
      item: `${siteUrl}${pathFor(route.locale, route.page)}`,
    });
  if (route.page !== 'home')
    items.push({
      '@type': 'ListItem',
      position: route.category || route.detail ? 3 : 2,
      name:
        route.detail?.title[route.locale] ??
        route.category?.name[route.locale] ??
        d.nav[route.page],
      item: `${siteUrl}${route.path}`,
    });
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Ventilators.ca',
        url: siteUrl,
        logo: `${siteUrl}/brand/logo.svg`,
        email: 'info@ventilators.ca',
        telephone: '+18336969996',
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Ventilators.ca',
        url: `${siteUrl}/${route.locale}/`,
        inLanguage: route.locale === 'fr' ? 'fr-CA' : 'en-CA',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      { '@type': 'BreadcrumbList', itemListElement: items },
    ],
  };
}
