# QA report

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
