import test from 'node:test';
import assert from 'node:assert/strict';
import { dictionaries, locales, pathFor } from '../src/content/site';
import { articles } from '../src/content/pages';
import { categories, categoryPath, products } from '../src/content/catalog';
import { routes, alternatePath, findRoute } from '../src/lib/routes';

function shape(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') {
    assert.ok(value.trim(), `Empty translation: ${prefix}`);
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, entry]) =>
    shape(entry, `${prefix}.${key}`),
  );
}
test('EN/FR UI and editorial dictionaries have identical nonempty keys', () => {
  assert.deepEqual(shape(dictionaries.en), shape(dictionaries.fr));
  assert.deepEqual(shape(articles.en), shape(articles.fr));
});
test('all translated routes are unique and reciprocal', () => {
  assert.equal(new Set(routes.map((r) => r.path)).size, routes.length);
  for (const route of routes) {
    const alternate = routes.find((r) => r.path === alternatePath(route));
    assert.ok(alternate, route.path);
    assert.equal(alternatePath(alternate), route.path);
    assert.equal(findRoute(route.locale, route.path.split('/').filter(Boolean).slice(1)), route);
  }
});
test('category links retain their translated division and slug', () => {
  for (const category of categories) {
    assert.deepEqual(shape(category.name.en), shape(category.name.fr));
    assert.equal(category.considerations.en.length, category.considerations.fr.length);
    for (const locale of locales)
      assert.ok(categoryPath(locale, category).startsWith(pathFor(locale, category.division)));
  }
});
test('unsupported routes resolve to no page and no products are invented', () => {
  assert.equal(findRoute('es'), undefined);
  assert.equal(findRoute('fr', ['industrial']), undefined);
  assert.deepEqual(products, []);
});
