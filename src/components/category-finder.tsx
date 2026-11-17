'use client';

import { useRef, useState } from 'react';
import type { Division } from '@/content/site';
import type { FinderCopy } from '@/content/finder';
import { filterCategories, type CategoryEntry } from '@/lib/category-search';

export function CategoryFinder({
  entries,
  copy,
  inquiryHref,
}: {
  entries: CategoryEntry[];
  copy: FinderCopy;
  inquiryHref: string;
}) {
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState<Division | 'all'>('all');
  const input = useRef<HTMLInputElement>(null);
  const results = filterCategories(entries, query, division);
  function reset() {
    setQuery('');
    setDivision('all');
    input.current?.focus();
  }
  return (
    <section className="container category-finder" aria-labelledby="finder-title">
      <h2 id="finder-title">{copy.title}</h2>
      <div className="finder-controls">
        <div className="finder-search">
          <label htmlFor="category-search">{copy.search}</label>
          <input
            ref={input}
            id="category-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-describedby="finder-hint"
            aria-controls="category-results"
            autoComplete="off"
            maxLength={120}
          />
          <p id="finder-hint">{copy.hint}</p>
        </div>
        <fieldset className="finder-divisions">
          <legend>{copy.division}</legend>
          <div>
            {(['all', 'industrial', 'medical'] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={division === value}
                aria-controls="category-results"
                onClick={() => setDivision(value)}
              >
                {copy[value]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="finder-summary">
        <p role="status" aria-atomic="true">
          {results.length} {results.length === 1 ? copy.singular : copy.count}
        </p>
        <button className="text-link" type="button" onClick={reset}>
          {copy.reset}
        </button>
      </div>
      <div id="category-results">
        {(['industrial', 'medical'] as const).map((group) => {
          const matches = results.filter((entry) => entry.division === group);
          return matches.length ? (
            <section className="finder-group" aria-labelledby={`finder-${group}`} key={group}>
              <h2 id={`finder-${group}`}>{copy[group]}</h2>
              <div className="category-list">
                {matches.map((entry) => (
                  <a className="category-row" href={entry.href} key={entry.id}>
                    <span className="category-index" aria-hidden="true">
                      {String(entries.indexOf(entry) + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{entry.name}</h3>
                      <p>{entry.summary}</p>
                    </div>
                    <span className="category-link">{copy.learn}</span>
                  </a>
                ))}
              </div>
            </section>
          ) : null;
        })}
        {!results.length && (
          <div className="finder-empty">
            <h3>{copy.empty}</h3>
            <p>{copy.help}</p>
            <a className="button" href={inquiryHref}>
              {copy.inquiry}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
