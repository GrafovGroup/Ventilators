# Build status

Source of truth: `CODEX_MASTER_PROMPT.md` v2.0, fetched from GrafovGroup/Ventilators on 2026-11-17.

## Current increment: Phase 1A

| Work | Status | Evidence / completion requirement |
| --- | --- | --- |
| Inspect and preserve repository | VERIFIED | Remote contains master prompt and README only; implementation on `codex/phase-1a`. |
| Architecture and page inventory | IN PROGRESS | `PAGE_MATRIX.md`; static Next.js export for WHC.ca Pro. |
| Precision Airflow logo and design tokens | IN PROGRESS | Vector variants, favicon set and `DESIGN_SYSTEM.md`. |
| Bilingual homepage and division hubs | IN PROGRESS | Localized, pre-rendered EN/FR routes. |
| Category navigation and inquiry UI | IN PROGRESS | Generic categories only; submission explicitly unavailable until verified delivery. |
| SEO/localization foundation | IN PROGRESS | Canonical, reciprocal hreflang, metadata, sitemap; staging noindex. |
| Automated and visual verification | NOT STARTED | Record commands and screenshot evidence in `QA_REPORT.md`. |
| Gate A owner design/architecture approval | BLOCKED | Implementation can be reviewed; owner approval not yet recorded. |
| Gate B staging workflows | BLOCKED | Public staging and verified RFQ endpoint absent. |
| Gate C content and compliance | BLOCKED | Editorial French/English, legal, medical and supplier reviews absent. |
| Gate D production launch | BLOCKED | Verified delivery, WHC account configuration, DNS/SSL and deployment sign-off absent. |

## Decisions and assumptions

- Start with Phase 1A and useful core navigation, as directed by the immediate instruction. Later-phase work remains explicitly tracked.
- Use Next.js App Router, TypeScript, `output: 'export'`, trailing-slash directory routes, and no runtime API/server dependency.
- Canadian English and Quebec-appropriate French are draft copy pending human editorial review. Preview is excluded from indexing.
- No product inventory, supplier affiliation, clinical claims, stock, pricing, addresses or certifications are inferred.
- No lead submission will be sent or stored until a separate secure delivery endpoint is configured and verified. Phone and email links remain available.
- Production publication is gated by the master prompt. Build locally; do not deploy an unapproved site to WHC or alternate hosting.

Status vocabulary: NOT STARTED / IN PROGRESS / VERIFIED / BLOCKED. VERIFIED applies only to a recorded check, not owner approval or launch readiness.
