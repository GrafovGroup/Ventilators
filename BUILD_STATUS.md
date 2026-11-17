# Build status

Source of truth: `CODEX_MASTER_PROMPT.md` v2.0, fetched from GrafovGroup/Ventilators on 2026-11-17.

## Current increment: complete category answers and project navigation

| Work                                                     | Status      | Evidence / completion requirement                                                                                          |
| -------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Five remaining bilingual category guides and search copy | VERIFIED    | Supply fans, blowers, parts, invasive and non-invasive ventilator procurement; sourced preparation guidance only           |
| Project-based catalogue/resource entry points            | VERIFIED    | Four existing guides, crawlable links, no extra routes or product recommendations                                          |
| Grouped, directly linkable buyer answers                 | VERIFIED    | EN/FR FAQ topics with relevant guide/inquiry links; no FAQ rich-result claim                                               |
| Mobile inquiry focus                                     | VERIFIED    | Remove the redundant fixed RFQ action on the inquiry page; preserve contact options                                        |
| Automated, responsive and live release verification      | IN PROGRESS | Local checks pass (32 tests, 80 routes, 44 responsive audits); clean commit, WHC release and live comparison still pending |

Decisions: keep the 80-route inventory, current logo, AirGrid, all image assignments, hosted inquiry/spam controls and consent setup. Provincial coverage pages and product inventory still require verified business data. Original preparation copy does not constitute technical, clinical or supplier approval.

## Previous increment: search titles, category guidance and simpler inquiries

Release `2026-11-17-seo-ux-1` is LIVE on WHC from clean source `92bc7b3a394834b9e8b2ca135ab332ee97b8df82`. All 515 public files match the tested artifact and all 100 live health checks pass. GitHub quality run `44175262584` passed. Descriptive EN/FR metadata covers the 14 main page types and six priority categories. Roof, axial, centrifugal, exhaust, respiratory accessories and institutional procurement now have original bilingual buyer guidance, scope tables, questions, source links and inquiry examples. The form keeps technical details optional, supports an unknown category per division and retains review before explicit send. Original logo, AirGrid, page-owned imagery, 80 routes, provider/spam controls, consent-gated analytics and inquiry-only inventory are preserved. See `qa/evidence/seo-ux/`.

## Previous increment: optional analytics and bilingual consent

Release `2026-11-17-consent-1` is LIVE on WHC from clean runtime source `c2710c10af9956c523d9728bd78c880bd81c2148`. All 515 public files match the artifact and all 100 live health checks pass. Public pages offer equal allow/decline choices in EN/FR, with footer preferences, 180-day expiry and cross-tab withdrawal. No Google collector loads before opt-in. A separate constant-URL collector accepts sanitized public-route events; inquiry contents and URL parameters are excluded. GA4 user/event retention is two months, renewal and advertising features are off. Google tag container version 3 waits for the site's explicit configuration; live GA4 receipt confirms the corrected manual page view without another automatic collector view. The catalogue remains inquiry-only with no product inventory. All 28 tests, the 80-route build/export and transfer budgets pass. See `docs/OPERATIONS.md`, `QA_REPORT.md` and `qa/evidence/consent/`.

## Previous increment: search setup and operating checks

The owner reconfirmed the inquiry-only catalogue and authorized creating search/analytics properties. The next increment adds configurable public verification metadata and Formspree ID, a privacy-safe seven-event analytics contract (no runtime tracking), source-quality CI and a manual 100-probe live health command. Release `2026-11-17-operations-1` is LIVE from clean source `be7500c2a9bd952f6617eeb77efa7e925b701ada`: all 511 public files match, and all 100 health probes pass. Google HTML-tag ownership is verified and its sitemap shows Success with 80 discovered pages. Bing accepts the site and sitemap, processing pending. GA4 property `564759274` and stream `G-59FBT5T5V1` are created; enhanced measurement is off and no tracking tag is installed. All 25 tests, the public 80-route export and transfer budgets pass; 100 pre-release live checks pass. Production dependency audit is clean; the unpatched development-only picomatch advisory has a narrow exception expiring 2026-12-17. See `docs/OPERATIONS.md`.

## Previous increment: site-wide AirGrid, fluid layouts and direct entry

The owner requested AirGrid across the entire website, retained the current logo, widened the containers and removed the language-choice front page. All 80 localized routes now share the design; containers expand to the viewport with responsive edge spacing. `/` and `/index.html` open `/en/` directly, and French remains available in the header. All seven brand files and unique editorial image assignments remain unchanged. Catalogue entries remain inquiry-only; form/provider/spam settings are preserved. Local code/build checks, 106 accessibility/layout audits and 12 interaction records pass. Release `2026-11-17-airgrid-site-1` is LIVE from clean source `045209015a0e1c526f9f3e5b632321ecb19437f3`. All 511 directly served public files match the artifact. The root 301 redirects, live wide/mobile interiors and inquiry language context pass. The previous AirGrid homepage release is retained for immediate rollback.

## Previous increment: AirGrid homepage with existing logo

The owner selected the AirGrid homepage style and explicitly retained the existing logo. Both localized homepages now use the bold filled/outlined headline, wide industrial photograph, warm neutral background, rust calls to action and editorial section layout. The original header/footer wordmarks, icons and social assets are byte-for-byte unchanged. Existing industrial/medical inquiry paths, category finder, resources and sector links remain connected; unique image ownership and inquiry-only catalogue status are preserved. At that checkpoint, styling was limited to the homepage; the current increment extends it site-wide. Release `2026-11-17-airgrid-1` is LIVE on WHC from clean source `333be83e9a720c6e34e4afdf4f41af5e08fd1836`. All 513 public files match the tested artifact; live English desktop and French mobile navigation/inquiry checks pass. The discovery release is retained for immediate rollback.

## Verified foundation: equipment discovery and delivery performance

The owner confirmed that all catalogue entries should remain inquiry-only. This increment adds EN/FR category search and division filters, retains all category links in static HTML, loads the inquiry SDK only on inquiry pages, and supplies 24 responsive variants of the eight existing photos. No product inventory, supplier authorization, compatibility claim or geographic service promise is added. The preceding release `2026-11-17-discovery-1` was verified on WHC from clean source `61b2818255cbe359a75b167f05b53227d3209ae5`. All 513 public files match the tested artifact; English/French live search and form hydration pass. The previous Formspree release is retained for rollback.

| Master-prompt area                                        | Current status                                           | Evidence / next requirement                                                                                                                          |
| --------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bilingual content and navigation                          | VERIFIED                                                 | 80 localized informational routes; equivalent-page switching and inquiry context retained.                                                           |
| Equipment discovery                                       | VERIFIED                                                 | Search, division filters, French accent normalization, empty results and keyboard focus; `qa/evidence/discovery/`.                                   |
| Unique relevant imagery                                   | VERIFIED                                                 | 30 editorial identities, no cross-page reuse; 24 derivatives belong to their original page.                                                          |
| Mobile delivery performance                               | VERIFIED for transfer budgets; PARTIAL for field targets | Initial JS 215,201 → 191,046 gzip bytes including legacy script; responsive photo budgets pass. Lab samples are unthrottled and not field CWV.       |
| Inquiry delivery and spam protection                      | VERIFIED for recorded tests                              | Formspree EN/FR delivery previously confirmed by owner; Formshield/honeypot remain active. New loader passed local EN retry and FR success mocks.    |
| Accessibility                                             | PARTIAL                                                  | Automated and keyboard/responsive checks pass for this increment; specialist/manual assistive-technology review remains open.                        |
| Verified product inventory                                | DEFERRED by owner                                        | Keep inquiry-only until approved manufacturer data and supplier authority exist.                                                                     |
| Supplier, medical, legal and bilingual editorial sign-off | BLOCKED on external review                               | See `COMPLIANCE_REGISTER.md`; implementation does not supply specialist approval.                                                                    |
| Search Console, Bing and analytics                        | IN PROGRESS                                              | Google verified, sitemap success (80 pages); Bing property/sitemap accepted, processing pending. Analytics activation uses explicit visitor consent. |
| Operations                                                | PARTIAL                                                  | Versioned deployment and rollback exist; retention/response operations still need owner decisions.                                                   |

The sections below are historical checkpoints; their earlier delivery and launch blockers are superseded by the current evidence above.

## Design alternatives requested after the release

Five original logo identities and five complete bilingual homepage concepts are ready for owner comparison in `designs/2026-11-17/index.html`: Rotor, Channel, AirGrid, DualStream and Northline. Each identity includes SVG, transparent PNG, monochrome, reversed and symbol variants. All concepts have responsive navigation; DualStream switches divisions and Northline routes by division/intent. These are standalone review artifacts, excluded from `public/` and the production export. The owner subsequently selected the AirGrid homepage layout while retaining the original production logo; none of the five proposed logo identities was adopted. Eighteen browser/axe checks and seven interaction checks pass; no horizontal overflow remains in the tested widths.

## Historical increment: Formspree inquiry delivery

The owner supplied `https://formspree.io/f/mvkaapjj` and requested integration and testing on 2026-11-17. The Next.js/React form uses the official `@formspree/react` library, preserving local review before explicit transmission. Bilingual pending, success, provider-error and retry states retain the inquiry on failure. The existing Formspree workflow sends notifications to `info@ventilators.ca`. Privacy/FAQ/consent copy and the WHC connection policy now describe this processing. Release `2026-11-17-formspree-1` is live from clean source `8ae4beb1e98996ada2013452a8044c66b61dded9`; all 487 public files match. Live EN/FR submissions were accepted by Formspree and the owner confirmed receiving both language notifications. The French synthetic test required spam review, and a labeled English follow-up was sent after an initial delay. Current test and deployment evidence is recorded in `QA_REPORT.md` and `docs/WHC_CONNECTION.md`.

The provider integration supersedes historical statements below that no endpoint exists. It does not establish specialist editorial/regulatory approval or custom server-side validation, durable deduplication or an agreed retention schedule.

## Historical increment: initial public release

On 2026-11-17 the owner instructed “lets proceed with building and also lets make the site live” and selected `info@ventilators.ca` for inquiries. This supersedes the earlier holding-page-only direction. The release includes the 80 localized informational pages, unique imagery, downloads and a local copy-and-email inquiry builder. It does not activate automatic RFQ submission, publish unverified products, or establish legal/regulatory/editorial approval.

The full website is LIVE at https://ventilators.ca/ on WHC Pro. Release `2026-11-17-public-1` uses source commit `02fc4e85bf26317160275928c65be2dbc04b7040`. All 487 public artifact files match their deployed SHA-256 hashes, including 80 localized pages. HTTPS redirects, actual 404s, indexing, caching, images, downloads and live mobile inquiry review/copy were verified. The old holding root is intact for rollback. See `docs/DEPLOYMENT.md`, `docs/WHC_CONNECTION.md` and `qa/evidence/public-release/`. The following Phase 1A/1B entries are historical checkpoints, not a prohibition on this later owner-authorized release.

## Historical increment: Phase 1B — full-site development

The owner requested continued full-site development on 2026-11-17 while keeping the WHC holding page live. That increment was local/review-branch only; the later public launch instruction supersedes that restriction.

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

Verified checks do not imply approval of editorial content, medical regulatory status or operational delivery. Specialist review and operational delivery requirements remain open. The owner-authorized informational release is separate from completing those requirements.
