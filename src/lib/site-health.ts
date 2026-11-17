import { alternatePath, type Route } from './routes';

export const productionOrigin = 'https://ventilators.ca';
export type HealthResponse = { status: number; headers: Headers; body: string };

function tag(html: string, name: string, attribute: string, value: string) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))]
    .map((match) => match[0])
    .find((candidate) =>
      candidate.toLowerCase().includes(`${attribute.toLowerCase()}="${value.toLowerCase()}"`),
    );
}

export function pageHealth(route: Route, response: HealthResponse): string[] {
  const errors: string[] = [];
  const { status, headers, body } = response;
  if (status !== 200) errors.push(`HTTP ${status}, expected 200`);
  if (!headers.get('content-type')?.includes('text/html')) errors.push('HTML content type missing');
  if (!body.includes(`<html lang="${route.locale}-CA"`)) errors.push('Document language mismatch');
  if ((body.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push('Expected one H1');
  if (!/<title>[^<]+<\/title>/.test(body)) errors.push('Title missing');
  const canonical = tag(body, 'link', 'rel', 'canonical');
  if (!canonical?.includes(`href="${productionOrigin}${route.path}"`))
    errors.push('Canonical mismatch');
  const alternate = tag(body, 'link', 'hreflang', route.locale === 'en' ? 'fr-CA' : 'en-CA');
  if (!alternate?.includes(`href="${productionOrigin}${alternatePath(route)}"`))
    errors.push('Alternate language mismatch');
  if (!tag(body, 'meta', 'name', 'robots')?.includes('content="index, follow"'))
    errors.push('Page is not explicitly indexable');
  if (/noindex|none/i.test(headers.get('x-robots-tag') || ''))
    errors.push('Indexing blocked by HTTP header');
  if (headers.get('x-content-type-options') !== 'nosniff') errors.push('nosniff header missing');
  const policy = headers.get('content-security-policy') || '';
  if (!policy.includes("frame-ancestors 'none'") || !policy.includes('https://formspree.io'))
    errors.push('Expected security policy missing');
  if (route.page === 'quote' && !body.includes('mailto:info@ventilators.ca'))
    errors.push('Inquiry fallback missing');
  return errors;
}

export function redirectHealth(response: HealthResponse, expected: string): string[] {
  const errors: string[] = [];
  if (response.status !== 301) errors.push(`HTTP ${response.status}, expected 301`);
  if (response.headers.get('location') !== expected) errors.push('Redirect destination mismatch');
  return errors;
}
