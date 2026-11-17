# Ventilators.ca

Bilingual industrial ventilation and institutional medical procurement website for Grafov Group. Source of truth: [CODEX_MASTER_PROMPT.md](CODEX_MASTER_PROMPT.md), including the approved WHC.ca Pro static-hosting decision.

Phase 1B content and imagery expansion is available locally on `codex/phase-1a`. This is a review build, not a production launch. Medical categories are inquiry-only; no verified product inventory exists. RFQ forms validate and review locally but **do not send or store submissions**.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm install
npm run dev
```

Open `http://localhost:3000/en/` or `http://localhost:3000/fr/`. The root page offers a language choice. If Node/npm are not on PATH, install the current supported Node LTS from its official distribution; no global system installation was performed during this build.

To build and serve the exact static output:

```sh
npm run build
npm run preview
```

Next.js App Router exports to `out/` with trailing-slash directory routes. `npm run preview` serves a local-only HTTP server, including real 404 status. Production requires no persistent Node.js server.

## Included

- Editable Precision Airflow SVG wordmarks and icon variants, SVG/PNG/ICO favicon, Apple touch icon and localized social images.
- Responsive homepage, industrial/medical hubs, 11 useful equipment category pages per language, products, services, industries, resources, FAQ, about, contact and draft legal/accessibility pages: 80 localized content routes, including five services, six facility types and four preparation guides per language.
- English/French navigation and equivalent-page language switching, including division/category RFQ routing.
- Separate division inquiry UI, optional model/capacity fields, province, quantity, timeline, priority, consent, linked validation errors and a complete editable bilingual inquiry summary. No patient information or attachments.
- Twelve downloadable bilingual inquiry checklists, 8 locally hosted licensed photos and 22 original technical/editorial illustrations; no third-party font requests. Images are unique across distinct pages, with shared EN/FR counterparts.
- Localized metadata, canonicals, reciprocal hreflang, main and per-language XML sitemaps, Organization/WebSite/BreadcrumbList JSON-LD and bilingual 404. No fake Product/Review schema.
- Preview indexing deliberately disabled in code and robots.txt. Analytics and live integrations are off.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
npm run format:check
npm audit
```

`npm test` covers inquiry validation, localized route/content parity, resource generation and unique image sources/file hashes. `check:export` checks every exported content route, metadata, languages, JSON-LD, internal links, assets, per-page image assignments, anchors, sitemaps, the no-JavaScript inquiry fallback and 404/favicon files. `QA_REPORT.md` distinguishes automated checks from manual browser checks and unfinished release gates.

For a local accessibility report, run `node scripts/qa-server.mjs` and open `http://localhost:3001/en/?audit=1`. Add `audit=1` to other local routes. This harness serves axe only on port 3001; audit code is not included in `out/`.

## Project map

- `src/content/site.ts`: UI dictionaries, locale slugs and RFQ links.
- `src/content/catalog.ts`: category content and typed, currently empty product inventory.
- `src/content/pages.ts`: core editorial pages.
- `src/content/details.ts` and `category-guides.ts`: bilingual detail pages and category guidance.
- `src/content/media.ts`: page-owned images, localized alt/caption text and source credits.
- `scripts/generate-page-visuals.mjs` and `generate-editorial-assets.ts`: reproducible original illustrations and resource downloads.
- `src/components/`: responsive site and inquiry UI.
- `src/app/`: static App Router routes, error recovery, metadata endpoints and CSS tokens.
- `src/lib/`: route resolution, metadata, sitemaps and preview validation.
- `public/`: local brand assets, photos and checklists.
- `qa/evidence/`: actual screenshots and check results.

## Outstanding dependencies

1. Owner approval of logo/layout, architecture and content; Canadian English/Quebec French editorial review.
2. Verified manufacturers, device data, supplier authority, medical regulatory review and industrial service qualifications.
3. Counsel-reviewed privacy/terms, retention, consent and handling processes.
4. Separately hosted secure RFQ endpoint, server-side controls and verified email delivery. See [RFQ_ENDPOINT.md](docs/RFQ_ENDPOINT.md).
5. Full-site staging/deployment checks, deep-link routing and rollback. The separate WHC coming-soon page, domain and HTTPS are already configured; see [WHC_CONNECTION.md](docs/WHC_CONNECTION.md). Do not replace it without a launch instruction.
6. Real-device/screen-reader QA, representative mobile performance measurements, approved analytics/consent design, Search Console/Bing access and operational monitoring ownership.

See [BUILD_STATUS.md](BUILD_STATUS.md), [PAGE_MATRIX.md](PAGE_MATRIX.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [CONTENT_SOURCE_REGISTER.md](CONTENT_SOURCE_REGISTER.md), [COMPLIANCE_REGISTER.md](COMPLIANCE_REGISTER.md) and [QA_REPORT.md](QA_REPORT.md).

Contact supplied by owner: **(833) 696-9996** · **info@ventilators.ca**.

## Regenerate editorial assets

```sh
node scripts/generate-page-visuals.mjs
node --import tsx scripts/generate-editorial-assets.ts
```

The illustration generator produces original concept art, not manufacturer drawings. Real photos are used only as facility context. Legal, contact and directory pages remain focused on their content rather than decorative stock photography.
