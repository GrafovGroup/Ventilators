import type { MetadataRoute } from 'next';
import { siteUrl, indexingEnabled } from '@/lib/seo';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', ...(indexingEnabled ? { allow: '/' } : { disallow: '/' }) },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
