import test from 'node:test';
import assert from 'node:assert/strict';
import { categories, categoryPath, products } from '../src/content/catalog';
import { categoryAliases, finderCopy } from '../src/content/finder';
import { filterCategories, type CategoryEntry } from '../src/lib/category-search';

const entries = (locale: 'en' | 'fr'): CategoryEntry[] =>
  categories.map((category) => ({
    id: category.id,
    division: category.division,
    name: category.name[locale],
    summary: category.summary[locale],
    href: categoryPath(locale, category),
    searchText: [
      category.name[locale],
      category.summary[locale],
      category.considerations[locale].join(' '),
      categoryAliases[category.id]?.[locale] ?? '',
    ].join(' '),
  }));

test('category search combines division and every word without requiring French accents', () => {
  assert.deepEqual(
    filterCategories(entries('fr'), '  REANIMATION  ', 'medical').map((c) => c.id),
    ['invasive'],
  );
  assert.deepEqual(
    filterCategories(entries('en'), 'roof curb', 'all').map((c) => c.id),
    ['roof'],
  );
  assert.equal(filterCategories(entries('en'), 'roof', 'medical').length, 0);
  assert.deepEqual(
    filterCategories(entries('fr'), 'VNI', 'medical').map((c) => c.id),
    ['noninvasive'],
  );
  assert.equal(filterCategories(entries('en'), '[.* no-match', 'all').length, 0);
});

test('clearing filters restores every inquiry-only category in both languages', () => {
  assert.equal(products.length, 0);
  assert.deepEqual(Object.keys(finderCopy.en), Object.keys(finderCopy.fr));
  for (const locale of ['en', 'fr'] as const) {
    const all = entries(locale);
    assert.deepEqual(filterCategories(all, '  ', 'all'), all);
    for (const division of ['industrial', 'medical'] as const) {
      assert.equal(
        filterCategories(all, '', division).length,
        all.filter((c) => c.division === division).length,
      );
    }
    assert.ok(
      all.every((entry) => entry.href.startsWith(`/${locale}/`) && categoryAliases[entry.id]),
    );
  }
});
