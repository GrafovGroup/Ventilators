import type { Division } from '../content/site';

export type CategoryEntry = {
  id: string;
  division: Division;
  name: string;
  summary: string;
  href: string;
  searchText: string;
};

export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('en-CA');
}

export function filterCategories(
  entries: CategoryEntry[],
  query: string,
  division: Division | 'all',
) {
  const words = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  return entries.filter(
    (entry) =>
      (division === 'all' || entry.division === division) &&
      words.every((word) => normalizeSearch(entry.searchText).includes(word)),
  );
}
