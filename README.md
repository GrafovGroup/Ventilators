# Ventilators.ca

Bilingual industrial ventilation and institutional medical procurement website for Grafov Group. Source of truth: [CODEX_MASTER_PROMPT.md](CODEX_MASTER_PROMPT.md), including the approved WHC.ca Pro static-hosting decision.

The owner authorized publication of the full bilingual informational website on 2026-11-17, superseding the earlier coming-soon-only instruction. The full site is live at [ventilators.ca](https://ventilators.ca/) on WHC Pro; tested source is on `codex/phase-1a`. All equipment categories remain inquiry-only; no verified product inventory exists. The inquiry form validates and reviews details locally, then sends through the owner-supplied Formspree endpoint when the visitor selects Send inquiry. Formspree notifications are configured for **info@ventilators.ca**. See the current verification record in `QA_REPORT.md`; provider acceptance and inbox receipt are distinct checks.

## Site-wide AirGrid design

The owner selected AirGrid for the entire English/French site while retaining the original production logo. All 80 localized routes use the warm paper, charcoal and rust design. Containers are fluid with 16–64 px responsive edge spacing; readable paragraph measures remain inside the wide layouts. The root redirects directly to `/en/`, and the header keeps equivalent-page French/English switching.

## Design alternatives

The five requested logo/homepage directions are in [the design review gallery](designs/2026-11-17/index.html). Each is a separate EN/FR responsive concept with downloadable vector and PNG identities. They are excluded from the public export. See [the design review README](designs/2026-11-17/README.md) for local preview and asset credits.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm install
npm run dev
```

Open `http://localhost:3000/en/` or `http://localhost:3000/fr/`. The root opens the English homepage directly; use the header to switch to French. If Node/npm are not on PATH, install the current supported Node LTS from its official distribution; no global system installation was performed during this build.

To build and serve the exact static output:

```sh
npm run build
npm run preview
```

Next.js App Router exports to `out/` with trailing-slash directory routes. `npm run preview` serves a local-only HTTP server, including real 404 status. Production requires no persistent Node.js server.

## Included

- Editable Precision Airflow SVG wordmarks and icon variants, SVG/PNG/ICO favicon, Apple touch icon and localized social images.
- Responsive homepage, industrial/medical hubs, 11 useful equipment category pages per language, products, services, industries, resources, FAQ, about, contact and website privacy, terms and accessibility pages: 80 localized content routes, including five services, six facility types and four preparation guides per language.
- Bilingual equipment finder with division filters, accent-insensitive search, live result counts and a no-results inquiry path. All 11 category links remain available in the static HTML.
- English/French navigation and equivalent-page language switching, including division/category RFQ routing.
- Separate division inquiry UI, optional model/capacity fields, province, quantity, timeline, priority, consent, linked validation errors and a complete editable bilingual inquiry summary, explicit send, pending/success/error states and retry/copy fallbacks. No patient information or attachments.
- Twelve downloadable bilingual inquiry checklists, 8 locally hosted licensed photos and 22 original technical/editorial illustrations; no third-party font requests. Images are unique across distinct pages, with shared EN/FR counterparts. Twenty-four local WebP size variants serve the same eight photographs responsively; they do not introduce reused editorial images.
- Localized metadata, canonicals, reciprocal hreflang, main and per-language XML sitemaps, Organization/WebSite/BreadcrumbList JSON-LD and bilingual 404. No fake Product/Review schema.
- Preview indexing is disabled by default. The documented `VENTILATORS_PUBLIC_RELEASE=1` build flag enables public indexing independently of form delivery. Analytics remain off.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
npm run check:performance
npm run format:check
npm run check:audit
npm run check:live
```

`npm test` covers inquiry validation, localized route/content parity, resource generation and unique image sources/file hashes. `check:export` checks every exported content route, metadata, languages, JSON-LD, internal links, assets, per-page image assignments, anchors, sitemaps, the no-JavaScript inquiry fallback and 404/favicon files. `check:performance` enforces initial JavaScript (200 KB gzip), CSS (15 KB gzip) and responsive photo size budgets; these are transfer-size checks, not field Core Web Vitals. Recreate photo variants with `npm run images:build` after changing licensed originals. The inquiry SDK loads only when an inquiry form mounts. `QA_REPORT.md` distinguishes automated checks from manual browser checks and unfinished release gates.

For a local accessibility report, run `node scripts/qa-server.mjs` and open `http://localhost:3001/en/?audit=1`. Add `audit=1` to other local routes. This harness serves axe only on port 3001; audit code is not included in `out/`. For isolated form tests, add `formtest=retry`, `validation`, `network`, `rate`, `slow` or `success` to an inquiry URL on port 3001. These modes intercept only the Formspree request and never send it. Normal local pages use the real endpoint: do not select Send inquiry except for an explicitly authorized synthetic delivery test.

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

## Search and operating controls

[OPERATIONS.md](docs/OPERATIONS.md) documents public verification tokens, the configurable Formspree ID, the seven privacy-safe analytics event definitions, release CI, manual production health checks and operating responsibilities. Analytics are off. `npm run check:live` performs 100 read-only checks without sending an inquiry. `npm run check:audit` enforces a dated, exact exception for the unpatched development-only picomatch advisory; production dependencies audit clean at this checkpoint.

## Outstanding dependencies

1. Canadian English/Quebec French human editorial and content review. The owner has selected the existing logo and site-wide AirGrid layout.
2. Verified manufacturers, device data, supplier authority, medical regulatory review and industrial service qualifications.
3. Counsel-reviewed privacy/terms, retention, consent and handling processes.
4. Formspree quota/spam monitoring, retention and delivery operations. The owner-approved provider replaces the earlier proposed custom endpoint; provider capabilities and limits are recorded in [RFQ_ENDPOINT.md](docs/RFQ_ENDPOINT.md).
5. Release checks and rollback are recorded in [DEPLOYMENT.md](docs/DEPLOYMENT.md) and [WHC_CONNECTION.md](docs/WHC_CONNECTION.md). The owner has authorized replacing the coming-soon page.
6. Real-device/screen-reader QA, representative mobile performance measurements, approved analytics/consent design and operational monitoring ownership. Google ownership and sitemap processing are verified; Bing sitemap processing is pending. GA4 exists with tracking off.

See [BUILD_STATUS.md](BUILD_STATUS.md), [PAGE_MATRIX.md](PAGE_MATRIX.md), [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [CONTENT_SOURCE_REGISTER.md](CONTENT_SOURCE_REGISTER.md), [COMPLIANCE_REGISTER.md](COMPLIANCE_REGISTER.md) and [QA_REPORT.md](QA_REPORT.md).

Contact supplied by owner: **(833) 696-9996** · **info@ventilators.ca**.

## Regenerate editorial assets

```sh
node scripts/generate-page-visuals.mjs
node --import tsx scripts/generate-editorial-assets.ts
```

The illustration generator produces original concept art, not manufacturer drawings. Real photos are used only as facility context. Legal, contact and directory pages remain focused on their content rather than decorative stock photography.
