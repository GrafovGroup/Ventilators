import { routes, alternatePath } from './routes';
import { siteUrl } from './seo';
import type { Locale } from '@/content/site';

export function localeSitemap(locale: Locale) {
  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${routes
    .filter((route) => route.locale === locale)
    .map(
      (route) =>
        `<url><loc>${escape(siteUrl + route.path)}</loc><xhtml:link rel="alternate" hreflang="${locale}-CA" href="${escape(siteUrl + route.path)}"/><xhtml:link rel="alternate" hreflang="${locale === 'en' ? 'fr' : 'en'}-CA" href="${escape(siteUrl + alternatePath(route))}"/></url>`,
    )
    .join('')}</urlset>`;
}
