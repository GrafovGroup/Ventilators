import { writeFile } from 'node:fs/promises';
import { detailPages, referenceSources } from '../src/content/details';
for (const page of detailPages.filter((p) => p.group === 'resources')) {
  for (const locale of ['en', 'fr'] as const) {
    const text =
      [
        'Ventilators.ca',
        page.title[locale],
        page.summary[locale],
        ...page.sections.flatMap((s) => [
          s.title[locale],
          s.body[locale],
          ...s.items[locale].map((item) => `[ ] ${item}`),
        ]),
        ...page.sources.map(
          (id) => `${referenceSources[id].title[locale]}\n${referenceSources[id].url[locale]}`,
        ),
        locale === 'en'
          ? 'Preparation checklist only. No product, service or delivery commitment. Do not include patient information.'
          : 'Liste de préparation seulement. Aucun engagement de produit, de service ou de livraison. N’incluez aucun renseignement sur les patients.',
        '(833) 696-9996 | info@ventilators.ca',
      ].join('\n\n') + '\n';
    await writeFile(`public/downloads/${page.id}-${locale}.txt`, text);
  }
}
console.log('Generated 8 localized procurement and specification checklists.');
