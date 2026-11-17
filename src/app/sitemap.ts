import type { MetadataRoute } from 'next';
import { routes, alternatePath } from '@/lib/routes';
import { siteUrl } from '@/lib/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    alternates: {
      languages: {
        'en-CA': `${siteUrl}${route.locale === 'en' ? route.path : alternatePath(route)}`,
        'fr-CA': `${siteUrl}${route.locale === 'fr' ? route.path : alternatePath(route)}`,
      },
    },
  }));
}
