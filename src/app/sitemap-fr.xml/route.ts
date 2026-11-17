import { localeSitemap } from '@/lib/sitemap';
export const dynamic = 'force-static';
export function GET() {
  return new Response(localeSitemap('fr'), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
