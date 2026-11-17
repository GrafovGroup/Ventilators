# QA report — Phase 1A review build

Executed 2026-11-17 on macOS arm64, Node 24.22.1, npm 12.2.2, Next.js 16.4.6. Production hosting has not been tested. Results apply to the local static export, not a claim of production readiness or full WCAG conformance.

## Automated results

| Check                         | Result                               | Evidence                                                                                                                                                                                                                                           |
| ----------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm install                   | PASS                                 | Dependencies installed; reproducible `package-lock.json` committed. Temporary npm used because no system npm was on PATH.                                                                                                                          |
| ESLint                        | PASS, zero warnings                  | `qa/evidence/checks.txt`                                                                                                                                                                                                                           |
| TypeScript                    | PASS                                 | `qa/evidence/checks.txt`                                                                                                                                                                                                                           |
| Inquiry and translation tests | PASS, 11 tests                       | `qa/evidence/checks.txt`; `tests/`                                                                                                                                                                                                                 |
| Production static export      | PASS                                 | `qa/evidence/checks.txt`; `out/` (ignored build output)                                                                                                                                                                                            |
| Export crawl                  | PASS, all 50 localized content pages | Internal links/assets/anchors, document language, single H1, unique titles, descriptions, self canonicals, reciprocal hreflang, JSON-LD, main/locale sitemaps, noindex, favicon and bilingual recovery files checked by `scripts/check-export.ts`. |
| Formatting                    | PASS                                 | `qa/evidence/checks.txt`                                                                                                                                                                                                                           |
| Dependency audit              | PASS, zero vulnerabilities           | `qa/evidence/dependency-audit.json`. Initial Sharp finding resolved by updating to 0.35.5.                                                                                                                                                         |
| Automated accessibility       | PASS in sampled scope                | Eight representative pages checked with axe WCAG 2 A/AA, 2.1 AA and 2.2 AA rules. One initial sector-label contrast issue corrected. Stored final results in `qa/evidence/accessibility.json`.                                                     |
| Responsive overflow           | PASS                                 | Five widths: 320, 375, 768, 1024, 1440. `qa/evidence/responsive-en.json` and `responsive-core.json`.                                                                                                                                               |

The export checker validates JSON syntax, types and supported entity use; it is not a Google rich-result eligibility certification. No Product or rating markup is emitted. All preview routes are noindex and robots-disallowed; sitemaps exist for QA, have not been submitted, and do not authorize indexing.

## Browser verification

Surface: Codex in-app browser; synthetic test data only, no actual lead submitted.

- English/French homepage, industrial hub, French medical hub and French RFQ layouts checked at required widths; no horizontal overflow observed. Mobile and desktop screenshots inspected. Long French headings and form labels wrap correctly.
- Mobile navigation opens, exposes translated links, and closes with Escape. Keyboard focus returned to the menu button.
- Blank RFQ review shows localized inline errors and an alert; the accessibility tree confirms focus moves to the first invalid name field. The browser's read-only DOM snapshot did not expose activeElement reliably, so focus was verified through AX state.
- Medical query preselection and institutional procurement category verified; English-to-French switch retained both. Changing selection to industrial/roof, then switching French-to-English, retained the updated values.
- Valid synthetic English medical and French industrial entries show explicit **nothing sent** confirmation. This is preview behavior, not delivery testing. No submission API exists.
- Visible patient-information warning present for medical inquiries. No upload input. Consents and bounded quantities covered by unit tests.
- Bilingual 404 recovery rendered on an invalid deep link. Local server returns 404 status; WHC error routing remains untested.
- No browser console errors observed during tested interactions. Correct SVG wordmark and icon references verified; cross-browser favicon behavior remains a manual release check.

Representative screenshot evidence:

- `qa/evidence/home-en-desktop.jpg` and `home-en-1440.jpg`
- `qa/evidence/home-en-320.jpg`, `home-en-375.jpg`, `home-en-768.jpg`, `home-en-1024.jpg`
- `qa/evidence/fr-375.jpg`, `fr-1440.jpg`
- `qa/evidence/en-industrial-375.jpg`, `en-industrial-1440.jpg`
- `qa/evidence/fr-medical-375.jpg`, `fr-medical-1440.jpg`
- `qa/evidence/fr-demande-de-soumission-375.jpg`, `fr-demande-de-soumission-1440.jpg`
- `qa/evidence/rfq-medical-review.jpg`, `rfq-industrial-fr-review.jpg`, `404.jpg`

Full-page captures of fixed mobile actions show that bar at the initial viewport position; it remains fixed at the bottom while scrolling. Page/footer spacing and scroll padding accommodate it. Automated colour checks mark some photo-overlay contrast cases for manual review; readable text over dark overlays was visually inspected, not certified across all image pixels.

## Verification limits and release blockers

- Gate A owner review of identity/layout and architecture is pending; implementation does not equal approval.
- Gate B has no external staging URL or live verified form workflow. Server-side validation, rate limiting, spam protection, idempotency, storage and delivery are **not implemented**. Their contract is in `docs/RFQ_ENDPOINT.md`.
- Gate C requires medical regulatory/supplier and industrial service qualification evidence, legal review and human English/French copy approval.
- Gate D requires actual WHC account validation, domain/DNS/SSL, deployed deep-link/404/header/cache tests, verified both-division email delivery, rollback rehearsal and owner sign-off.
- No VoiceOver/NVDA session, physical mobile-device test or Safari/Chrome cross-browser matrix completed. Automated axe scans are not full WCAG 2.2 AA conformance.
- LCP <=2.5s, CLS <=0.1 and INP <=200ms are targets, **not measured results**. Local unthrottled rendering is not representative mobile lab or field measurement. Lighthouse/real-user verification remains open before launch.
- Error boundary and static 500 page exist; simulated runtime crashes and real hosting 500 handling remain untested.
- Analytics, Search Console/Bing verification, external monitoring and scheduled maintenance are inactive pending owner configuration.

Reproduce commands in README. The local audit harness (`scripts/qa-server.mjs`) is excluded from the static output. Production deployment instructions and a reviewed-before-use Apache template are supplied, with no claim of actual WHC compatibility.
