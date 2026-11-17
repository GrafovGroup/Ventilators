# Build status

Source of truth: `CODEX_MASTER_PROMPT.md` v2.0, fetched from GrafovGroup/Ventilators on 2026-11-17.

## Current increment: Phase 1A

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

- Start with Phase 1A and useful core navigation, as directed by the immediate instruction. Later-phase work remains explicitly tracked.
- Use Next.js App Router, TypeScript, `output: 'export'`, trailing-slash directory routes, and no runtime API/server dependency.
- Canadian English and Quebec-appropriate French are draft copy pending human editorial review. Preview is excluded from indexing.
- No product inventory, supplier affiliation, clinical claims, stock, pricing, addresses or certifications are inferred.
- No lead submission will be sent or stored until a separate secure delivery endpoint is configured and verified. Phone and email links remain available.
- Full-site publication is gated by the master prompt. The owner separately authorized WHC connection and selected a “Coming soon” holding page on 2026-11-17.

Status vocabulary: NOT STARTED / IN PROGRESS / VERIFIED / BLOCKED. VERIFIED applies only to a recorded check, not owner approval or launch readiness.

## Implemented increment

50 EN/FR content routes, language gateway, 11 category pages per locale, bilingual local RFQ review, 4 downloadable checklists, SVG/icon/social assets, static error recovery, metadata and three sitemaps. Automated verification passes. A separate bilingual holding page is online on WHC; the full site and live lead delivery are not launched. Gate A review and Gates B–D remain blocked by the evidence above.
