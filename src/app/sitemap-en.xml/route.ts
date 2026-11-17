import { localeSitemap } from '@/lib/sitemap';
export const dynamic = 'force-static';
export function GET() {
  return new Response(localeSitemap('en'), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
