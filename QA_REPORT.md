# QA report — Phase 1B review build

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
