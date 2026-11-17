# QA report

## Search titles, category guidance and inquiry UX — 2026-11-17

- All 30 unit tests, lint, TypeScript, public build and 80 exported-route checks pass. Maximum initial JavaScript is 193,709 gzip bytes, below the 200,000-byte budget; CSS and responsive-image budgets pass.
- All 12 enriched category routes pass automated accessibility/layout checks at 320px with no violations or horizontal overflow. Contrast items marked incomplete still require human review; this is not full accessibility certification.
- Local EN minimal review transmits nothing; simulated failure/retry preserves the reference and values. FR unknown-category review, edits, invalid optional quantity, auto-opening error disclosure, division changes and accepted mocked submission pass. Unknown timing never becomes a planning commitment and unknown priority never becomes time-sensitive.
- Declined analytics has zero collector/tag loads; opted-in local mock records one page view, start and accepted-submit event with no form contents. No real inquiry was sent and no Formspree/Google account settings changed.
- Responsive EN/FR form checks, screenshots and payload evidence are under `qa/evidence/seo-ux/`. Publication evidence follows after release verification.

## Optional analytics and bilingual consent — 2026-11-17

- 28 unit tests pass, including expired/invalid consent, collector origin/parent guards, consent ordering, advertising defaults, sanitized context and stop behavior. Lint, TypeScript, the public build, all 80 route checks and performance budgets pass (maximum initial JS 193,245 gzip bytes, below 200,000).
- Local browser tests cover default-off, decline, grant, remembered consent, withdrawal, cross-tab revocation, expired consent and blocked storage. The no-consent states have zero collector frames, tag loads and analytics cookies. Withdrawal removes the collector and its cookies without losing inquiry entries. The footer preference control receives focus after saving.
- Mocked inquiry review makes no request; a simulated 503 preserves data/reference, and retry acceptance emits exactly one `rfq_submitted`. The analytics command log contains neither synthetic form contents nor test email/query/fragment/reference. QA uses a local Google substitute, not actual Google transmission, and a local Formspree mock; no real inquiry was sent.
- EN/FR consent controls were visually checked with equal button treatment. Automated accessibility checks have no violations in recorded desktop/mobile samples; contrast items listed incomplete still need human review. This is not full accessibility certification.
- GA4 settings are recorded in `qa/evidence/consent/ga-*.txt`: two-month user/event retention, renewal off, enhanced measurement off, Google signals and user-provided data off, granular location/device collection off, ad personalization disabled in all 307 regions, email redaction on, no connected tags.
- Release `2026-11-17-consent-1` is live from clean source `c2710c10af9956c523d9728bd78c880bd81c2148`; all 515 public files match and all 100 health checks pass. Root redirects, archive exclusion and collector-specific CSP/noindex/SAMEORIGIN headers pass. GitHub quality run `44166666061` passed.
- Initial live GA4 receipt exposed extra automatic collector page views with standard container initialization. Version 2 parameter overrides did not eliminate them. Published version 3 uses only the configuration-command initialization trigger, with legacy config support enabled and the exact G-ID allowed; destination overrides are removed so the typed collector configuration applies. All six automatic detections remain off, with a five-month nonrenewing container cookie cap below 180 days. Earlier synthetic events remain in reports. After version 3, actual GA4 Realtime records exactly one view each for `/en/industrial/`, `/fr/industriel/` and `/fr/industriel/ventilateurs-axiaux/`; the earlier `/analytics/frame.html` count stays at five throughout all three visits. Live decline/withdrawal has zero frames and Google scripts in the page DOM. Evidence: `ga-version3-first.txt`, `ga-version3-pages.txt`, `ga-live-pages.png`, `tag-version-3.txt` and `live-browser.json`. The final overview also shows `category_viewed` and `language_changed` receipt (`ga-version3-events.txt`). Earlier synthetic collector events are retained, not erased. Prior sections are historical checkpoints.

## Search setup and operating checks — 2026-11-17

- 25 tests pass, including public configuration validation, rejection of PII/arbitrary URLs in future analytics payloads and health-check failure detection. Lint, type checks, public static build, all 80 exported routes and performance budgets pass.
- 100 read-only checks against the existing live site pass (80 pages, entry redirects, 404, robots, sitemaps and 12 downloads). No real inquiry submitted.
- Google/Bing public HTML ownership tokens obtained from the owner-authorized signed-in setup. Google ownership verified and sitemap Success with 80 discovered pages. Bing property/sitemap accepted, with processing pending. GA4 property `564759274` / measurement ID `G-59FBT5T5V1` created under Grafov Group; enhanced measurement disabled at creation. No tag installed, and the property reports no data. Analytics remains disabled.
- Production dependency audit: zero findings. Full audit: 14 development-only dependency paths rooted in the unpatched picomatch advisory GHSA-fc5q-39xc-vjpf. Narrow dependency policy passes with an explicit expiry of 2026-12-17; this is not a clean full audit.
- Release `2026-11-17-operations-1` is LIVE from clean source `be7500c2a9bd952f6617eeb77efa7e925b701ada`; all 511 public files match and all 100 health probes pass. The release ZIP returns 404 publicly. All seven brand files and 54 image files are unchanged. GitHub quality run `44159455240` passed. Local EN mock failure/retry preserves the same request reference and reaches acceptance; FR medical/procurement form hydration passes. No real inquiries sent.
- Evidence in `qa/evidence/operations/`; operating procedures and limitations in `docs/OPERATIONS.md`.

## Site-wide AirGrid and direct homepage entry — 2026-11-17

The owner requested AirGrid across the rest of the site, maximum responsive container width and removal of the language-choice gateway, keeping the current logo. All 80 localized routes share the style. Containers have no fixed maximum: at 2560px they span 2432px with 64px edge spacing; mobile edges remain at least 16px. Paragraphs keep readable measures within the widened layouts. `/` and `/index.html` redirect directly to `/en/` with query preservation; static root HTML provides a no-JavaScript refresh/link fallback.

- ESLint, TypeScript, 21 tests, public build and 80-route export pass. Export checks include the removed gateway and shared theme. Initial JS/CSS and 24 responsive photo transfer budgets pass; no dependencies changed.
- 106 automated accessibility/layout checks: all 80 localized routes plus 404/500 at 320px, and eight representative routes at 768, 1440 and 2560px. Zero violations or horizontal overflow; incomplete contrast items remain listed separately. This is not full accessibility certification or field Core Web Vitals measurement.
- Twelve interaction records cover category search, menu/Escape, equivalent-language switching, direct root entry, FAQ expansion, form validation/focus, review without submission, simulated failure/retry/success and division/category preselection across languages. The retry uses only the localhost provider mock. No real inquiries were sent.
- All seven brand files are byte-for-byte unchanged. All 30 editorial image identities retain their unique page assignments; responsive image sizing now follows the fluid layout.
- Evidence: `qa/evidence/airgrid-site/`, including logs, browser observations, screenshots, brand hashes, performance budget report and local redirect probes. Release `2026-11-17-airgrid-site-1` is live from clean source `045209015a0e1c526f9f3e5b632321ecb19437f3`. All 511 directly served public files match the manifest. The root fallback HTML is checked locally and excluded from the byte crawl because `/` and `/index.html` now return 301. Root/query/HTTP/www redirects, 80 content routes, branded 404, indexing, headers and archive exclusion pass. Live 1920px English and 375px French interior layouts use the original logo, have no horizontal overflow and preserve inquiry-language context. No site console errors or real submissions occurred. Deployment evidence: `release.json`, `live-http.json`, `live-browser.json`, `archive-checks.json` and `live-industrial-*.png`. The preceding AirGrid homepage release remains available for rollback.

## AirGrid homepage with original logo — 2026-11-17

Owner-selected option 03 styling applied to `/en/` and `/fr/`, retaining the existing production logo. New styles are scoped to the homepage wrapper; all other routes retain their original styling. Both existing homepage photographs remain uniquely assigned to that logical page. No new product claim, provider configuration, form handler or spam rule is introduced.

- ESLint, TypeScript, 21 existing tests, public build, all 80 exported pages and asset/metadata checks pass. Initial script payload stays within the 200 KB gzip budget (191,293 bytes); CSS and all responsive photo budgets pass.
- English/French homepages at 320, 375, 768, 1024 and 1440 px: ten automated accessibility/layout checks with zero violations or horizontal overflow. Contrast items left incomplete by axe still require human review; full accessibility certification is not claimed.
- All seven files in `public/brand/` match their pre-change SHA-256 values and Git HEAD contents. The existing header and reversed footer logos are rendered. No AirGrid concept logo enters the public export.
- Industrial and medical homepage inquiry links preselect the correct division; the form language switch preserves that context. French mobile menu/Escape behavior passes. Directory and inquiry-page regression audits at 375 px also pass (12 page/width audits total). No real inquiry was sent.
- Evidence in `qa/evidence/airgrid/`: build/lint/typecheck/test/export logs, responsive screenshots, `brand-hashes.json`, `performance.json` and browser observations. Local LCP/CLS observations are unthrottled lab samples and do not establish field Core Web Vitals.

Release `2026-11-17-airgrid-1` is live on WHC from clean source `333be83e9a720c6e34e4afdf4f41af5e08fd1836`. All 513 public files match the manifest; redirects, genuine branded 404, hidden-file protection, indexing and headers pass. Live English desktop (1440 px) and French mobile (375 px) show the original logo and no horizontal overflow. Homepage language switching, mobile menu/Escape, industrial and medical inquiry preselection, inquiry language continuity and category search pass, with no site console errors. No real form submission was sent. Evidence: `release.json`, `live-http.json`, `live-browser.json` and `live-home-*.png` in `qa/evidence/airgrid/`. The uploaded ZIP is outside the public root; the discovery release remains available for immediate rollback.

## Five logo and homepage alternatives — 2026-11-17

Requested after completion of the discovery release. `designs/2026-11-17/` contains five original vector identities and five complete, bilingual, responsive homepage concepts, plus comparison boards, PNG/SVG downloads and the self-contained gallery. They are review artifacts and are not in the live document root or Next.js export.

- All five layouts checked at 1440 px English, 375 px English and 320 px French. Two French overflow issues were corrected and rechecked. Fifteen page audits plus logo board, homepage board and mobile gallery audits: 18 checks, zero automated WCAG violations or horizontal overflow. `qa.json` records incomplete contrast checks separately; this is not a full accessibility certification.
- Language switching and mobile menu/Escape behavior checked on all five. DualStream's division switch and Northline's medical inquiry destination also pass: seven interaction records.
- All eight HTML documents carry noindex. All 149 local asset/document references resolve; 22 SVG files parse. Desktop/mobile screenshots and both comparison boards were visually inspected.
- ESLint and repository formatting pass after the added scripts. No production code changed during this design exploration, so the discovery release's 21 tests, build and export evidence remain applicable.
- Three licensed contextual photos are used once each across the separate review concepts, with source credits in `IMAGE_CREDITS.json`; other illustrations are original SVG. No product inventory or supplier/clinical claims are added.
- Download package: `qa/generated/design-options/Ventilators-design-options-2026-11-17.zip`. It contains the gallery, complete HTML/CSS/JS, assets, screenshots, credits and QA record. Unzip and open `index.html` in a regular desktop browser. The in-app browser supports HTTP/HTTPS previewing but blocks direct file-URL navigation; no workaround or production publication was used.

## Equipment discovery and performance — 2026-11-17

Catalogue remains inquiry-only at the owner's direction. Tested increment: bilingual category search/filtering, responsive existing-photo variants and deferred inquiry SDK loading. No new real Formspree submissions were sent during these regression checks.

- ESLint, TypeScript, 21 unit tests, public build and the 80-route export check pass. Evidence: `qa/evidence/discovery/{lint,typecheck,tests,build,export}.txt`.
- Initial script budget: 215,201 → 191,046 gzip bytes (11.2% reduction), summed from HTML script references and including the legacy `nomodule` script. Modern-browser resource observations show the provider chunks load on the inquiry route and are absent on the directory/home samples. Deferred code is still downloaded when needed.
- All 80 routes meet 200 KB initial JS and 15 KB CSS gzip budgets. All 24 responsive photos meet size budgets; 800-pixel derivatives are 61–76% smaller than their originals. `baseline.json` and `performance.json` document the method. Existing original photos/credits remain unchanged.
- Nine representative axe page/width checks (320, 375, 768 and 1440 px) found no automated violations or horizontal overflow. Contrast items marked incomplete require human review. EN/FR finder tests cover division counts, accent-free French, multiple words, no results, reset focus and keyboard activation. Category → inquiry preselection passed.
- Local EN mocked 503 → retry succeeds with one stable reference and no request during review. FR medical mock accepts one localized request after explicit send. Provider settings and payload logic are unchanged.
- Local unthrottled browser LCP/CLS/event observations are recorded in `browser.json`. These are limited lab samples, not throttled-mobile or field Core Web Vitals certification; INP remains unverified. Screenshots cover English/French narrow finders, desktop finder and mobile/desktop home. No site console error was observed; unrelated Grammarly extension diagnostics were excluded.
- Responsive image ownership, every srcset asset, static no-JavaScript category links and the inquiry email fallback are checked in the export. Informational routes and 30 unique editorial identities are unchanged.

Release `2026-11-17-discovery-1` is LIVE from clean source `61b2818255cbe359a75b167f05b53227d3209ae5`. WHC confirmed the new root; all 513 public files match their SHA-256 manifest values, with no failures in routes, redirects, 404, indexing, headers or asset checks. Live English search, French equivalent-page switching/search and inquiry hydration pass. See `release.json`, `live-http.json`, `live-browser.json` and `live-finder.png`. The ZIP is retained outside all public roots; immediate rollback is the previous Formspree release.

## Spam-protection review — 2026-11-17

Reviewed on owner request after the initial bilingual delivery tests. Formshield and the hidden honeypot remain active. Advanced sensitivity and classifier controls require Formspree Professional or higher and are locked on the current plan; no purchase or provider setting change was made. No custom blocking rules or project domain restriction was present. Live referrer policy and the empty, hidden honeypot were checked; no website filtering defect was found.

Two new realistic, explicitly synthetic business inquiries reached the regular Formspree inbox without manual spam review, with Spam (0): English industrial repair `VCA-7cb846a0-ae78-40b5-905c-11aa74584024` / submission `171866931`, and French medical technical support `VCA-1e15ca5f-78e9-464e-adae-616522497aa4` / submission `171867031`. Formspree marked both notifications delivered to info@ventilators.ca. Evidence: `qa/evidence/spam-review/`. These are bounded examples, not a guarantee of zero future false positives. The earlier flagged test's cause is not exposed by the dashboard.

The recovery process and paid-control limitation are documented in `docs/RFQ_ENDPOINT.md`. No runtime code changed or new release was needed; existing source/build checks still apply. No persistent monitoring, broad safe-sender rule or account upgrade was created.

## Formspree integration — 2026-11-17

The owner requested connection and testing of form `mvkaapjj`. The current React implementation and WHC CSP support explicit submission after review. Formspree's enabled Email workflow was inspected and targets info@ventilators.ca; existing archive and Formshield controls remain enabled, with no account changes. Release `2026-11-17-formspree-1` is live from clean source `8ae4beb1e98996ada2013452a8044c66b61dded9`. All 487 public files match the artifact, and both authorized live tests reached Formspree. See the delivery details below.

| Check                            | Result                        | Evidence                                                                                                                               |
| -------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ESLint / TypeScript / formatting | PASS                          | `qa/evidence/formspree/lint.txt`, `typecheck.txt`, `format.txt`                                                                        |
| Unit tests                       | PASS, 19 tests                | `tests.txt`; four new payload tests cover EN/FR labels, metadata, validation and field/header allowlisting                             |
| Public build and export          | PASS, 80 localized pages      | `build.txt`, `export.txt`; unique imagery and routes preserved                                                                         |
| Dependency audit                 | Zero reported vulnerabilities | `dependency-audit.json`; official @formspree/react 3.0.0 pinned                                                                        |
| EN local review/retry            | PASS                          | No request on review; synthetic 503 retains data; copy includes reference; retry succeeds with identical reference; `local-retry.json` |
| FR provider validation           | PASS                          | Local 422 identifies Courriel professionnel; edit retains fields and focuses name; `local-validation-fr.json`                          |
| FR network/rate errors           | PASS                          | Both preserve details and show localized retry; `local-failures.json`                                                                  |
| FR slow/pending/success          | PASS                          | One request; pending send/edit disabled; delayed acceptance focuses success; `local-slow.json`                                         |
| FR mobile accessibility          | Zero axe violations at 375 px | `local-validation-fr.json`; one contrast review item; no horizontal overflow in form/review/success                                    |

### Live delivery verification

- English industrial repair: public success reference `VCA-4d8dbbfe-46fb-4e7c-a111-678ccbdc5b35`; Formspree submission `171863589`. Correct category, locale, consent metadata, email and complete business details verified. Notification to info@ventilators.ca still showed `processed` at the final refreshed check; the owner later confirmed an English notification arrived but did not identify its reference.
- French medical technical support: public success reference `VCA-b07c84cd-2041-4b7d-afc3-8679f97a5258`; Formspree submission `171863891`. Correct localized category, QC, consent, email and details verified. Formspree initially classified this synthetic test as spam; the known test was marked Not Spam individually. Its notification subsequently showed `delivered` to info@ventilators.ca. No filter was disabled. This confirms provider-reported delivery after manual spam review, not unassisted French email delivery.
- Both public pages show accurate accepted-for-processing wording, focus the success status and retain the reference. Desktop 1440 px and mobile 375 px screenshots reviewed; no overflow or site console errors. Unrelated Grammarly extension warnings/errors were excluded from application results. New inquiry clears name/email/details/consent and focuses name.
- Public HTTP crawl at 17:22:20 UTC: 487 files matched; zero failures. All localized routes, assets, redirects, robots, 404 and hidden-file protection passed. The CSP includes `connect-src 'self' https://formspree.io`; native form submission remains blocked. Source and archive hashes are in `release.json`.
- Owner confirmed actual French inbox receipt, then English receipt. After the first English notification remained pending, one labeled English follow-up was sent: `VCA-828bba0a-a1b5-4348-a370-dea781083a93`, Formspree `171865057`, marker `VCA-FORMSPREE-20261117-EN2-LIVE`. It entered the regular provider inbox without spam review, then showed `delivered` to info@ventilators.ca. The owner did not specify which English test arrived; language-level delivery is confirmed, not independent receipt of every test. No further submissions were sent.

Evidence: `qa/evidence/formspree/live-http.json`, `live-browser.json`, `live-success-en.png`, `live-success-fr-375.png`, `provider-en.txt`, `provider-fr-initial-spam.txt`, `provider-fr-reviewed.txt`, `provider-en-followup.txt`, `provider-verification.json` and `release.json`. Prior WHC public root and holding root remain available for rollback.

Mock failure tests run only through the localhost QA harness; they do not contact Formspree. The 15-second slow-message threshold is implemented but its brief display was not separately captured. Provider acceptance is not proof of inbox receipt. Historical reports below describe earlier releases and do not represent the current form behavior.

## Public release — 2026-11-17

The full informational website is LIVE on WHC at https://ventilators.ca/. Source commit `02fc4e85bf26317160275928c65be2dbc04b7040`; release `2026-11-17-public-1`. The owner explicitly authorized publication and selected info@ventilators.ca. Automatic submission and inbox receipt remain unverified.

| Release check          | Result / evidence in `qa/evidence/public-release/`                                                                                                                                                                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code and build         | ESLint, TypeScript, 15 tests, public static build, 80-route export and formatting PASS; `checks.txt`                                                                                                                                                                                                     |
| Dependency audit       | Zero vulnerabilities; `dependency-audit.json`                                                                                                                                                                                                                                                            |
| Artifact integrity     | Clean source commit, ZIP integrity passed, 489 manifest files; `manifest.json`, `release.json`                                                                                                                                                                                                           |
| Live HTTP integrity    | 487 publicly served files match their source SHA-256 hashes; two `.htaccess` files intentionally excluded; `live-http.json`                                                                                                                                                                              |
| Routing and hosting    | HTTPS/www 301 redirects, all 80 content routes, actual branded 404, dotfile denial, robots allow, canonical/hreflang/sitemaps, Brotli and cache/security headers verified                                                                                                                                |
| Upload/archive cleanup | ZIP moved outside public roots; public ZIP URL returns 404; `error-and-archive-checks.json`                                                                                                                                                                                                              |
| Local inquiry changes  | EN/FR review/copy/edit, localized summary and no personal details in mailto URL; `local-inquiry-*.json`. French console warnings were from the Grammarly extension, not site code.                                                                                                                       |
| Live browser           | English desktop at 1440 px; French mobile at 375 px, no horizontal overflow, images loaded, language switch and mobile navigation passed. Empty-form errors, review, clipboard copy and edit retention passed with synthetic data; `live-browser.json` and screenshots. No site console errors/warnings. |
| Page-owned imagery     | 30 unique editorial assets retain the tested assignment and file hashes; all assets were also fetched successfully from WHC                                                                                                                                                                              |
| Rollback               | Original holding root `/home/nvfglyl5/ventilators.ca` preserved; pre-switch hash matches tracked holding HTML; `prelaunch-holding.json`                                                                                                                                                                  |

WHC initially served the prior root for roughly a minute after cPanel accepted the change. Checks were repeated once the new root became active; the final report above has zero failures. The initial propagation report is retained locally with the release artifact. No DNS/mail change, test email, automatic lead transmission, analytics or scheduled monitoring was performed.

Legal, medical, supplier and human bilingual editorial review remain open. Browser checks are not full accessibility conformance, real-device validation or measured Core Web Vitals. The following Phase 1B entries document historical local checks before this public release.

## Phase 1B review build

Executed 2026-11-17 on macOS arm64, Node 24.22.1 and Next.js 16.4.6. These results cover the local static export. The full website has not been deployed. The separate WHC coming-soon page remains live and unchanged.

## Automated results

| Check                                            | Result                           | Evidence                                                                                                                                                                             |
| ------------------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ESLint                                           | PASS, zero warnings              | `qa/evidence/phase-1b/checks.txt`                                                                                                                                                    |
| TypeScript                                       | PASS                             | Same check log                                                                                                                                                                       |
| Inquiry, content, imagery and localization tests | PASS, 15 tests                   | Same check log; `tests/`                                                                                                                                                             |
| Production static export                         | PASS, 80 localized content pages | `out/`, ignored generated output                                                                                                                                                     |
| Export crawl                                     | PASS, all 80 pages               | Language, one H1, unique metadata, canonical/hreflang, JSON-LD, internal links/assets/anchors, exact page image assignments, no-JavaScript RFQ fallback, sitemaps and recovery files |
| Image uniqueness                                 | PASS, 30 editorial assets        | Unique source identities and SHA-256 hashes; `image-inventory.json`. EN/FR equivalents intentionally share their visual. Shared brand marks are excluded.                            |
| Image budget                                     | PASS, each asset below 500 KB    | Inventory records file sizes. Photos use local WebP; diagrams use SVG.                                                                                                               |
| Resource downloads                               | PASS, 8 new localized checklists | Content parity with four guide pages; 12 downloads total including the foundation checklists                                                                                         |
| Automated accessibility                          | PASS, all 80 pages at 320 px     | `accessibility-80-pages.json`; axe WCAG 2 A/AA, 2.1 AA and 2.2 AA rules                                                                                                              |
| Responsive overflow and image loading            | PASS, 40 checks                  | Eight representative pages at actual widths 320, 375, 768, 1024 and 1440; `responsive.json` records requested and observed widths                                                    |
| Formatting                                       | PASS                             | Check log                                                                                                                                                                            |
| WHC holding page preservation                    | PASS                             | `live-holding-check.json`; HTTPS response bytes match `deploy/coming-soon/index.html`                                                                                                |

Dependency versions and lockfile are unchanged from Phase 1A. The earlier same-day dependency audit found zero vulnerabilities (`qa/evidence/dependency-audit.json`); it was not rerun for this content-only dependency state.

## Browser verification

Codex in-app browser, synthetic data only:

- Service directory → industrial repair → RFQ correctly preselects the repair service. Each new detail page has a valid division/category inquiry target, also checked automatically.
- Empty English and French reviews show linked errors and focus the error summary. Error links lead to their fields.
- Valid English repair and French medical technical-support requests show every field with human-readable province, service, timeline and priority values. Both explicitly state that nothing was sent.
- Edit restores the form with entered values retained; the English repair name, category and details were inspected after editing. Focus returns to the name field.
- Changing division to medical clears the incompatible equipment selection; selecting technical support and switching to French preserves the nonpersonal routing choices. Personal inputs are not passed in the URL.
- Medical patient-information guidance remains visible. No upload control, network submission API or persistent browser storage was added.
- Facility photography, technical diagrams, category guidance, detail-page contents links, directories and French resource layouts were inspected. Long French text wraps without overflow.
- All 30 images were visually inspected as photo/diagram contact sheets. The clinic image was replaced with a clearer examination-room photograph during QA.
- No application console errors were observed. The preview tab reported unrelated Grammarly extension warnings; the audit tab reported none.

Screenshot and JSON evidence is under `qa/evidence/phase-1b/`. Representative captures include `warehouse-preview.jpg`, `en-industrial-roof-ventilators-1440.jpg`, `en-services-industrial-fan-repair-1440.jpg`, `fr-ressources-guide-approvisionnement-medical-375.jpg`, `rfq-review-en.jpg` and `rfq-review-fr-375.jpg`.

Full-page mobile screenshots capture the fixed action bar at its viewport position. Footer logos can remain lazy-loaded outside the initial viewport during full-page capture. Neither is a claim of a scrolling defect.

## Limits and release dependencies

- Automated axe results are not full WCAG conformance. Image-overlay contrast produces manual-review items; the existing homepage overlays were visually reviewed. Physical-device, VoiceOver/NVDA and Safari/Chrome cross-browser validation remain open.
- Responsive tests are local layout checks, not measured Core Web Vitals. Representative mobile performance and production caching remain to be measured.
- English/French copy, legal terms, medical regulatory/supplier evidence and industrial service qualifications still require the designated reviews.
- The RFQ remains a local review tool. Server validation, rate limiting, spam protection, idempotency, storage and verified delivery are not implemented or deployed; their contract remains in `docs/RFQ_ENDPOINT.md`.
- No verified product or provincial coverage pages were fabricated. Inventory remains empty and no Product/Review schema is emitted.
- Full-site WHC staging, deep-link/error routing, headers, rollback and launch approval remain outstanding. Domain, HTTPS and the separately approved holding page are already configured; see `docs/WHC_CONNECTION.md`.
- Analytics, search-console submissions and operational monitoring remain inactive.

Phase 1A screenshots/check logs remain in `qa/evidence/` for historical reference. The current Phase 1B evidence is in its own subdirectory. No full-site production upload or DNS change occurred during this increment.
