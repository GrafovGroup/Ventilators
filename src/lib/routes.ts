import { categories, categoryPath, type Category } from '@/content/catalog';
import { locales, slugs, pathFor, type Locale, type PageKey } from '@/content/site';

export type Route = { locale: Locale; page: PageKey; category?: Category; path: string };
export const routes: Route[] = locales.flatMap((locale) => [
  ...(Object.keys(slugs) as PageKey[]).map((page) => ({
    locale,
    page,
    path: pathFor(locale, page),
  })),
  ...categories.map((category) => ({
    locale,
    page: category.division,
    category,
    path: categoryPath(locale, category),
  })),
]);
export function findRoute(locale: string, slug: string[] = []) {
  return routes.find(
    (route) =>
      route.locale === locale &&
      route.path === `/${locale}/${slug.length ? `${slug.join('/')}/` : ''}`,
  );
}
export function alternatePath(route: Route) {
  const locale = route.locale === 'en' ? 'fr' : 'en';
  return route.category ? categoryPath(locale, route.category) : pathFor(locale, route.page);
}
