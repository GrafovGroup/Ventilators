# Search and operating checks

Latest search handover check: the owner requested sitemap resubmission on 2026-11-17 after release `2026-11-17-answers-1`. Google confirmed successful submission and shows Success with 80 discovered pages; Bing had Success with 80 URLs and zero errors/warnings before the accepted resubmission moved it to Processing. Google indexing data and Bing's new-property reports remain pending. Google Manual actions and Security issues report no issues detected. See `CLOSEOUT.md` and `../qa/evidence/search-wrapup/` for current evidence and remaining operating decisions.

The website remains an inquiry-only informational catalogue. This increment prepares ownership verification and measurement, adds automated source checks and provides a manually invoked production health check. Google ownership is verified; its sitemap processed successfully with 80 discovered pages. Bing accepts the property and sitemap, with crawl processing pending. The consent increment below enables optional analytics after opt-in. No monitoring schedule or operational response promise is created.

## Public build configuration

Copy `.env.example` to an untracked `.env.local` for local builds. The static WHC site cannot read environment changes at runtime: rebuild, check and deploy after a change.

| Setting                         | Purpose                                                 | Default                                                |
| ------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`          | Canonical origin                                        | `https://ventilators.ca`                               |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Public Formspree form identifier, not an API key or URL | Owner-approved `mvkaapjj`                              |
| `VENTILATORS_PUBLIC_RELEASE`    | Explicit indexing enablement                            | No indexing unless `1`                                 |
| `GOOGLE_SITE_VERIFICATION`      | Google HTML-tag verification token                      | Public token in `src/content/search-verification.json` |
| `BING_SITE_VERIFICATION`        | Bing 32-character HTML-tag verification token           | Public token in `src/content/search-verification.json` |

The owner authorized creating these properties. Their public ownership tokens are tracked in `src/content/search-verification.json` to preserve verification on future builds; environment values override those defaults (an empty value omits that provider). Verification values are validated and included in the static head of public localized pages and the root fallback. Preview builds omit them. No private provider credentials belong in these settings. Changing a form ID requires a separate delivery check for the new endpoint; the existing one stays in use.

## Search ownership handoff

1. An authorized owner opens Google Search Console and adds the HTTPS URL-prefix property `https://ventilators.ca/`. For this route use the HTML-tag token, not the whole tag. Domain-property verification instead requires its own DNS workflow.
2. Supply the public token as `GOOGLE_SITE_VERIFICATION`, rebuild with `VENTILATORS_PUBLIC_RELEASE=1`, run `check:export`, deploy and inspect `/en/`. The root redirects there; Google checks the destination homepage. Keep the token deployed after verification.
3. The account owner selects **Verify** in Search Console. Record the confirmation and date; deployed metadata alone is not proof of verified ownership.
4. Add the site in Bing Webmaster Tools and use its HTML meta-tag token as `BING_SITE_VERIFICATION`. Deploy, verify in Bing and record confirmation.
5. Submit `https://ventilators.ca/sitemap.xml` in each verified account. Inspect both homepages and representative categories, resources and inquiry pages. Review indexing reports for excluded pages or unexpected canonicals; submission does not guarantee indexing.

On 2026-11-17 Google confirmed HTML-tag ownership and processed `/sitemap.xml` successfully with 80 discovered pages. Bing opened the verified Ventilators.ca property and accepted the sitemap; its initial status is Processing. Search indexing/rankings are not guaranteed by these confirmations. Existing canonicals, reciprocal language alternates, indexable public pages and three sitemaps remain active.

Sources: [Next.js verification metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#verification), [Google site ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en), [Bing HTML-tag verification](https://learn.microsoft.com/en-us/bingwebmaster/verifying-wordpress).

## Release and live checks

`Website quality` runs on repository pushes, pull requests and manual dispatch. It uses the lockfile with Node 22, lint, tests, a public static build, type checks, export validation, performance budgets, formatting and production dependency auditing. `check:audit` also checks the full dependency tree and fails on any high/critical issue except the narrowly documented development exception below. Actions are pinned to inspected upstream commits, have read-only repository permission and do not deploy or access WHC credentials. A passing run verifies only that commit. Branch protection is not configured by this change.

```sh
npm ci
npm run check:live
# Optional destination for a retained, non-sensitive evidence report:
npm run check:live -- qa/evidence/operations/live-health.json
```

The live check uses four concurrent GET requests, a 15-second timeout and a fixed HTTPS origin. It checks all 80 localized pages, three entry redirects, actual 404 behavior, robots, all three sitemaps and the 12 text downloads. Page checks cover status, language, title/H1, canonical, counterpart language URL, indexing headers/meta, security headers and the inquiry fallback. Redirects are inspected without following arbitrary locations. It reports paths, status, elapsed time and fixed diagnostic messages; it does not save response bodies, credentials or inquiry data. A failure returns a nonzero exit code. Timing is an availability diagnostic, not a Core Web Vitals measurement.

The `Live site health (manual)` workflow provides the same check with a 14-day report artifact. GitHub exposes manual dispatch in its Actions UI once the workflow is on the default branch; until then run the CLI from the review checkout. No scheduled job or external alert service is installed. For exact release-integrity verification, also use `scripts/verify-live.mjs` with the release manifest as described in `DEPLOYMENT.md`.

On failure: inspect the failed route and current deployment; check WHC status/SSL and compare the active root with the release record. For a release regression, use the preserved root rollback in `WHC_CONNECTION.md`, then rerun live checks. Do not change DNS/mail or spam controls merely because an HTTP or form-delivery check failed.

## Optional analytics — owner-authorized activation

The owner explicitly authorized consent setup and analytics activation on 2026-11-17. Grafov Group account `213675022`, property **Ventilators.ca** (`564759274`), web stream `16362112451`, measurement ID **G-59FBT5T5V1**. Reporting uses Canada/Toronto time and CAD. [Open GA4](https://analytics.google.com/analytics/web/#/a213675022p564759274/reports/intelligenthome). No private API key, Measurement Protocol secret or paid service is required. Google automatically upgraded this new web stream’s tag to container `GTM-54NXJDVG` (account `6405949064`, container `287450411`). The website loads the G-ID directly; it does not add a second GTM snippet.

The bilingual footer preferences offer equally prominent allow/decline controls. Unknown, invalid, old-version and expired choices default to off. Both choices are stored under `ventilators.analytics-consent.v1` for 180 days without renewing on reads. Blocked storage permits a page-only choice; the next document starts off. An expiry timer and cross-tab storage listener revoke collection. Analytics consent is independent of inquiry consent. Browsing, review, delivery and retries work with analytics off or blocked. No actions before opt-in are replayed.

Basic consent: no collector frame, Google script, analytics cookie or Google request before opt-in or after decline. After consent, a lazy adapter validates each event and creates a hidden same-origin document at the constant `/analytics/frame.html` URL, with no referrer. The Google script runs there rather than alongside form inputs. Its configuration disables automatic page views, Google signals and ad personalization; all three advertising consent types stay denied. Manual events override page location with the known public route, page title with a static route label, and referrer with an empty string. The main-document CSP still blocks Google; only the collector has narrowly scoped Google permissions. The collector is noindex, refuses top-level/nonproduction execution and accepts messages only from its same-origin parent.

Google tag container version **3**, published 2026-11-17, is part of the deployment configuration. Its only destination-tag trigger is **Consent collector - gtag config initialization**, with **Support gtag('config') initialization events** enabled and `G-59FBT5T5V1` explicitly allowed. This makes initialization wait for the collector's typed configuration and sanitized page context. There are no destination configuration overrides. Keep this trigger: standard initialization can run before the site's configuration and produce an extra automatic collector page view. All six automatic detection options remain off. The container cookie override is configured for a **five-month, first-visit limit (13,140,000 seconds)**, below the public notice's 180-day maximum. Keep these remote settings aligned with the collector. [Google's initialization migration guidance](https://support.google.com/analytics/answer/18411054?hl=en) describes the behavior.

Initial live tests exposed automatic collector page views with standard initialization, including after version 2 added destination parameter overrides. Version 3 restores configuration-command initialization. Those earlier test events remain in reports and are not customer inquiries. Final receipt evidence is recorded in the QA report.

Withdrawal sets GA's disable flag, empties its pending queue, removes the collector runtime/listeners, and clears only this site's `_ga` and `_ga_59FBT5T5V1` cookies. It does not reload the form, erase other storage or delete previously collected data. Cookies expire after at most 180 days (`cookie_update: false`). The browser and blocking extensions can reduce collection; this is expected and must never break inquiries.

Verified GA4 settings: user/event retention **2 months**, reset on new activity **off** (Google notes up to 24 hours for changes); enhanced measurement **off**; Google signals and user-provided data collection **off**; granular location/device collection **off**; ad personalization **disallowed in all 307 regions**; email redaction **on**; zero connected site tags. Standard aggregated reports are outside the user/event retention setting. No user IDs, advertising links or form-data collection are configured.

| Event                             | Trigger after consent                             | Allowed context                               |
| --------------------------------- | ------------------------------------------------- | --------------------------------------------- |
| `page_view`                       | Once when collection starts on a supported page   | Public path and locale                        |
| `division_selected`               | Industrial/Medical hub link activation            | Public path, locale and known division        |
| `category_viewed`                 | Category page initialization                      | Public path, locale, division and category ID |
| `rfq_started`                     | First form edit while consented, once per inquiry | Public inquiry path and locale                |
| `rfq_submitted`                   | Formspree acceptance, once per inquiry            | Public inquiry path and locale                |
| `phone_clicked` / `email_clicked` | Link activation                                   | Public path and locale, never the destination |
| `language_changed`                | Equivalent-page language link activation          | Public source path/locale and target locale   |

The contract rejects unknown fields, arbitrary paths, query strings, fragments, personal data fields and mismatched categories. It never receives form entries, search text, organization, email, phone, reference IDs or request payloads. `rfq_submitted` means provider acceptance, not inbox receipt, qualification or revenue. Google can still process standard technical information and pseudonymous cookie identifiers after consent. Referral/campaign attribution is intentionally unavailable because query strings and referring URLs are excluded. A hidden collector can also limit automatic engagement-time metrics; use the explicit page/action counts. Counts represent consenting visitors only, not total inquiry volume; Formspree remains the operational record.

Public builds offer consent by default; previews do not. Emergency disable: rebuild with `VENTILATORS_PUBLIC_RELEASE=1 VENTILATORS_ANALYTICS=0`, run the checks and deploy a fresh release, or restore the preserved operations release. Never bypass consent to resolve missing reports. Do not add automatic measurement, new parameters, ad features or providers without updating the privacy notice and tests.

Local tests use `scripts/qa-server.mjs`, which replaces the collector's Google loader with a local mock and publishes observable QA reports. These scripts never enter `out/`. Evidence distinguishes mocked commands from actual GA4 receipt; see `qa/evidence/consent/` and `QA_REPORT.md` for deployment results. No real inquiry is required for analytics testing.

Sources: [basic consent](https://developers.google.com/tag-platform/security/concepts/consent-mode), [consent implementation](https://developers.google.com/tag-platform/security/guides/consent), [GA4 configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config), [privacy/disable controls](https://developers.google.com/tag-platform/security/guides/privacy), [retention limits](https://support.google.com/analytics/answer/7667196?hl=en). This describes implementation; specialist legal/editorial review remains separately recorded.

## Owner operating checklist

This is a proposed responsibility plan, not an automated schedule or service-level agreement. The owner still needs to assign a named operator, response target and retention period.

| When                                | Operator action                                                                                                                        | Evidence                                                      |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Each business day                   | Compare Formspree submissions/spam archive with `info@ventilators.ca`; review legitimate inquiries and provider quota                  | Private operational log; never commit inquiry content         |
| After an inquiry delivery complaint | Check provider acceptance, spam archive and mailbox routing; recover false positives individually while preserving Formshield/honeypot | Private case outcome; existing procedure in `RFQ_ENDPOINT.md` |
| After each release                  | Run source checks, manifest verification and live health; review EN/FR inquiry hydration without submitting                            | Sanitized release evidence                                    |
| Monthly                             | Review public contact details, source links and inquiry-only wording; verify any future supplier evidence before quoting               | Updated source/compliance register                            |
| Quarterly                           | Review accessibility with assistive technology, mobile performance, dependencies, search reports and rollback readiness                | Dated review and assigned fixes                               |

The GET health check cannot prove hydration, successful inquiry submission, email delivery, spam classification or human follow-up. Existing owner-confirmed EN/FR delivery remains the last delivery evidence. An additional real submission should only be sent when explicitly authorized and clearly labeled.

## Development dependency exception — review by 2026-12-17

The 2026-11-17 audit reports 14 affected development dependency paths rooted in [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf), an unpatched picomatch regular-expression denial-of-service issue. The advisory lists no patched release. `npm audit --omit=dev` reports zero production vulnerabilities. WHC serves static files, not the Node lint/build toolchain; visitor form input is not supplied to glob matching. Build jobs have a 15-minute timeout. No package downgrade or broad audit suppression was applied.

`scripts/check-audit.mjs` accepts only that exact advisory and its transitive paths when every implicated lockfile node is development-only. Other high/critical advisories, unknown response formats, network failures, production occurrences or expiry on 2026-12-17 fail the check. Reassess upstream fixes and remove the exception when a compatible patched release is available. The exception is an engineering risk record, not a claim that the full audit is clean. Raw evidence: `qa/evidence/operations/dependency-audit.json`.
