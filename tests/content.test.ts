import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { media } from '../src/content/media';
import { detailPages, detailPath } from '../src/content/details';
import { categories } from '../src/content/catalog';
import { categoryGuides } from '../src/content/category-guides';
import { inquiryOptions } from '../src/lib/inquiry';
import { routes } from '../src/lib/routes';

test('editorial visuals have unique source identities and unique file contents', async () => {
  assert.equal(media.length, 30);
  const sources = new Set<string>(),
    hashes = new Set<string>();
  for (const visual of media) {
    const identity =
      visual.kind === 'photo' ? visual.source.match(/-(\d+)\/$/)?.[1] : visual.source;
    assert.ok(identity, visual.id);
    assert.ok(!sources.has(identity), `Reused source: ${visual.id}`);
    sources.add(identity);
    const bytes = await readFile(`public${visual.src}`);
    const hash = createHash('sha256').update(bytes).digest('hex');
    assert.ok(!hashes.has(hash), `Identical image file: ${visual.id}`);
    hashes.add(hash);
    assert.ok(bytes.length < 500_000, `Image exceeds 500 KB: ${visual.id}`);
    for (const locale of ['en', 'fr'] as const) {
      assert.ok(visual.alt[locale].trim());
      assert.ok(visual.caption[locale].trim());
    }
  }
});

test('every detail page has a unique visual, translated sections and a valid inquiry path', () => {
  for (const page of detailPages) {
    assert.equal(media.filter((m) => m.page === page.id).length, 1, page.id);
    assert.ok(
      inquiryOptions.some((c) => c.id === page.inquiryCategory && c.division === page.division),
      page.id,
    );
    assert.equal(new Set(page.sections.map((s) => s.id)).size, page.sections.length);
    for (const locale of ['en', 'fr'] as const) {
      assert.ok(routes.some((r) => r.path === detailPath(locale, page)));
      assert.ok(page.title[locale] && page.summary[locale] && page.keyword[locale]);
      for (const section of page.sections) {
        assert.ok(
          section.title[locale] && section.body[locale] && section.items[locale].every(Boolean),
        );
        assert.equal(section.items.en.length, section.items.fr.length);
      }
    }
    for (const id of page.relatedCategories)
      assert.ok(categories.some((c) => c.id === id && c.division === page.division));
  }
  for (const category of categories) {
    assert.ok(categoryGuides[category.id]);
    assert.ok(detailPages.some((p) => p.id === categoryGuides[category.id].resource));
    assert.equal(media.filter((m) => m.page === category.id).length, 1);
  }
});

test('resource checklists are generated in both languages', async () => {
  for (const page of detailPages.filter((p) => p.group === 'resources')) {
    for (const locale of ['en', 'fr'] as const) {
      const file = `public/downloads/${page.id}-${locale}.txt`;
      assert.ok((await stat(file)).size > 500);
      const text = await readFile(file, 'utf8');
      assert.ok(text.includes(page.title[locale]));
      for (const section of page.sections)
        for (const item of section.items[locale]) assert.ok(text.includes(item));
    }
  }
});
