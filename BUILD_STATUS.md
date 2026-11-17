# Build status

Source of truth: `CODEX_MASTER_PROMPT.md` v2.0, fetched from GrafovGroup/Ventilators on 2026-11-17.

## Current increment: Phase 1B — full-site development

The owner requested continued full-site development on 2026-11-17 while keeping the WHC holding page live. This increment is local/review-branch only; do not deploy the full build or change WHC/DNS.

| Phase 1B work                                     | Status   | Evidence / completion requirement                                                                                                                                                                                        |
| ------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Service and industry detail journeys              | VERIFIED | Five services and six facility types per locale, with unique content and contextual inquiry links.                                                                                                                       |
| Procurement guides and resources                  | VERIFIED | Four bilingual guides, eight new text checklists, source links and print styling. Human editorial review remains open.                                                                                                   |
| Detailed category guidance                        | VERIFIED | All 11 categories expanded with distinct context, preparation checks and related guides/services.                                                                                                                        |
| Unique page imagery                               | VERIFIED | 30 editorial assets: 8 licensed contextual photos and 22 original SVG illustrations. No reuse across distinct pages; EN/FR counterparts share one asset. Source identity, file hash and rendered assignment checks pass. |
| RFQ service selection and review summary          | VERIFIED | Division-specific equipment/services, priority, linked error summary, complete review and edit flow; no online delivery.                                                                                                 |
| Product publication guardrails                    | VERIFIED | Inventory remains empty; tests reject invented records and export checks reject unsupported Product/Review schema. No product pages generated.                                                                           |
| Expanded export, accessibility and interaction QA | VERIFIED | 80-route export crawl; 15 tests; axe checks on all 80 pages at 320 px; 40 responsive checks at five actual widths; EN/FR inquiry flows. See QA_REPORT.md.                                                                |
| Verified RFQ delivery and supplier data           | BLOCKED  | Approved endpoint/inbox, privacy terms and verified supplier documentation absent.                                                                                                                                       |

## Phase 1A foundation

| Work                                      | Status   | Evidence / completion requirement                                                                                           |
| ----------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Inspect and preserve repository           | VERIFIED | Remote contains master prompt and README only; implementation on `codex/phase-1a`.                                          |
| Architecture and page inventory           | VERIFIED | `PAGE_MATRIX.md`; static Next.js export for WHC.ca Pro.                                                                     |
| Precision Airflow logo and design tokens  | VERIFIED | Vector variants, favicon set and `DESIGN_SYSTEM.md`.                                                                        |
| Bilingual homepage and division hubs      | VERIFIED | Localized, pre-rendered EN/FR routes.                                                                                       |
| Category navigation and inquiry UI        | VERIFIED | Generic categories only; submission explicitly unavailable until verified delivery.                                         |
| SEO/localization foundation               | VERIFIED | Canonical, reciprocal hreflang, metadata, sitemap; staging noindex.                                                         |
| Automated and visual verification         | VERIFIED | `QA_REPORT.md`, `qa/evidence/checks.txt`, screenshots and accessibility/viewport JSON; limitations explicitly recorded.     |
| Gate A owner design/architecture approval | BLOCKED  | Implementation can be reviewed; owner approval not yet recorded.                                                            |
| Gate B staging workflows                  | BLOCKED  | Public staging and verified RFQ endpoint absent.                                                                            |
| Gate C content and compliance             | BLOCKED  | Editorial French/English, legal, medical and supplier reviews absent.                                                       |
| WHC domain and holding page               | VERIFIED | Owner selected bilingual “Coming soon”; dedicated WHC Pro domain, web DNS and AutoSSL configured. `docs/WHC_CONNECTION.md`. |
| Gate D full-site production launch        | BLOCKED  | Verified delivery, full-site deployment checks and launch sign-off remain outstanding.                                      |

## Decisions and assumptions

- Phase 1A foundation is followed by the owner-authorized Phase 1B content and imagery expansion. The full site remains a review build.
- Use Next.js App Router, TypeScript, `output: 'export'`, trailing-slash directory routes, and no runtime API/server dependency.
- Canadian English and Quebec-appropriate French are draft copy pending human editorial review. Preview is excluded from indexing.
- No product inventory, supplier affiliation, clinical claims, stock, pricing, addresses or certifications are inferred.
- No lead submission will be sent or stored until a separate secure delivery endpoint is configured and verified. Phone and email links remain available.
- Full-site publication is gated by the master prompt. The owner separately authorized WHC connection and selected a “Coming soon” holding page on 2026-11-17.

Status vocabulary: NOT STARTED / IN PROGRESS / VERIFIED / BLOCKED. VERIFIED applies only to a recorded check, not owner approval or launch readiness.

## Implemented increment

80 EN/FR content routes (40 equivalent page pairs), language gateway, 11 category pages per locale, five service pages, six industry pages and four procurement guides per locale, local RFQ review/edit, 12 downloadable checklists, 30 distinct editorial images, brand assets, static error recovery, metadata and three sitemaps. No full-site deployment was performed. The live WHC coming-soon HTML matches the tracked holding page byte for byte; evidence is in `qa/evidence/phase-1b/live-holding-check.json`.

Verified checks do not imply approval of editorial content, medical regulatory status or operational delivery. The remaining gates are unchanged.
