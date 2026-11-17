import { categories, categoryPath, type Category } from '@/content/catalog';
import { locales, slugs, pathFor, type Locale, type PageKey } from '@/content/site';
import { detailPages, detailPath, type DetailPage } from '@/content/details';

export type Route = {
  locale: Locale;
  page: PageKey;
  category?: Category;
  detail?: DetailPage;
  path: string;
};
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
  ...detailPages.map((detail) => ({
    locale,
    page: detail.group,
    detail,
    path: detailPath(locale, detail),
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
  return route.detail
    ? detailPath(locale, route.detail)
    : route.category
      ? categoryPath(locale, route.category)
      : pathFor(locale, route.page);
}
