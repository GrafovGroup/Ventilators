'use client';
import { useState } from 'react';
import Image from 'next/image';
import { dictionaries, navKeys, pathFor, type Locale, type PageKey } from '@/content/site';

export function Header({
  locale,
  page,
  alternate,
  answerAnchors = [],
}: {
  locale: Locale;
  page: PageKey;
  alternate: string;
  answerAnchors?: string[];
}) {
  const [open, setOpen] = useState(false);
  const d = dictionaries[locale];
  function switchLanguage(event: React.MouseEvent<HTMLAnchorElement>) {
    if (page === 'faq') {
      const anchor = window.location.hash.slice(1);
      event.currentTarget.href = alternate + (answerAnchors.includes(anchor) ? `#${anchor}` : '');
      return;
    }
    if (page !== 'quote' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    const params = new URLSearchParams(window.location.search);
    const safe = new URLSearchParams();
    for (const key of ['division', 'category'])
      if (params.has(key)) safe.set(key, params.get(key)!);
    event.currentTarget.href = alternate + (safe.size ? `?${safe}` : '');
  }
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        {d.common.skip}
      </a>
      <div className="utility">
        <div className="container utility-inner">
          <span>{d.common.country}</span>
          <div>
            <a href="tel:+18336969996">(833) 696-9996</a>
            <a className="utility-email" href="mailto:info@ventilators.ca">
              info@ventilators.ca
            </a>
            <a
              className="language"
              href={alternate}
              hrefLang={locale === 'en' ? 'fr-CA' : 'en-CA'}
              lang={locale === 'en' ? 'fr' : 'en'}
              aria-label={d.common.language}
              onClick={switchLanguage}
            >
              {locale === 'en' ? 'FR' : 'EN'}
            </a>
          </div>
        </div>
      </div>
      <div className="container main-nav">
        <a
          href={pathFor(locale, 'home')}
          aria-label={`Ventilators.ca — ${d.common.home}`}
          className="brand"
        >
          <Image src="/brand/logo.svg" alt="Ventilators.ca" width={238} height={76} priority />
        </a>
        <nav
          className="desktop-nav"
          aria-label={locale === 'en' ? 'Main navigation' : 'Navigation principale'}
        >
          {navKeys.map((key) => (
            <a
              key={key}
              href={pathFor(locale, key)}
              aria-current={page === key ? 'page' : undefined}
            >
              {d.nav[key]}
            </a>
          ))}
        </nav>
        <a href={pathFor(locale, 'quote')} className="button header-quote">
          {d.common.quote}
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
          {open ? d.common.close : d.common.menu}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!open}
        aria-label={locale === 'en' ? 'Mobile navigation' : 'Navigation mobile'}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false);
            document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
          }
        }}
      >
        {navKeys.map((key) => (
          <a key={key} href={pathFor(locale, key)} aria-current={page === key ? 'page' : undefined}>
            {d.nav[key]}
          </a>
        ))}
        <a href={pathFor(locale, 'quote')}>{d.common.quote}</a>
      </nav>
    </header>
  );
}
