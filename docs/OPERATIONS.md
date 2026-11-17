# Search and operating checks

The website remains an inquiry-only informational catalogue. This increment prepares ownership verification and measurement, adds automated source checks and provides a manually invoked production health check. Google ownership is verified; its sitemap processed successfully with 80 discovered pages. Bing accepts the property and sitemap, with crawl processing pending. These controls do not enable analytics, schedule monitoring, submit inquiries or establish an operational response promise.

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

## Created GA4 property — tracking disabled

Created on 2026-11-17 under Grafov Group account `213675022`: property **Ventilators.ca** (`564759274`), web stream **Ventilators.ca website** (`16362112451`), measurement ID **G-59FBT5T5V1**. Reporting uses Canada/Toronto time and CAD. The owner supplied 1–10 employees; industry is Business & Industrial, with lead generation and traffic understanding objectives. Enhanced measurement was explicitly turned off and confirmed before creating the stream. Google offered tag installation; no tag was installed. The property reports no received data, as expected.

[Open the GA4 property](https://analytics.google.com/analytics/web/#/a213675022p564759274/reports/intelligenthome). IDs are public configuration references, not credentials. Retention, consent controls and automatic page/referrer handling still need review before activation.

## Analytics measurement plan — disabled

`src/lib/analytics-contract.ts` defines and validates the seven master-prompt events. It is not imported into the browser UI and has no collector, cookies, persistent storage or network behavior. A GA4 property and web stream now exist under the signed-in Grafov Group account, but no measurement ID, Google tag, event listener or consent banner is installed on the website.

| Event               | Future trigger after analytics consent                         | Allowed context                                          |
| ------------------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| `division_selected` | Explicit selection of Industrial or Medical                    | Public route, locale, selected division                  |
| `category_viewed`   | A category page becomes visible; deduplicate client navigation | Public category route, locale, division, category ID     |
| `rfq_started`       | First user edit on an inquiry form, once per form session      | Public inquiry route, locale, optional division/category |
| `rfq_submitted`     | Formspree confirms acceptance, once per accepted request       | Public inquiry route, locale, optional division/category |
| `phone_clicked`     | Visitor activates a telephone link                             | Public route and locale; never the number                |
| `email_clicked`     | Visitor activates an email link                                | Public route and locale; never the address               |
| `language_changed`  | Visitor activates the equivalent-page language switch          | Public source route, source locale and target locale     |

The contract rejects unknown fields, unsupported event names, noncatalogue category IDs, arbitrary URLs, query strings, fragments, personal data fields and mismatched category/division context. Do not send form values, organization, email, phone, search terms, reference IDs, full URLs, referrers or request payloads. `rfq_submitted` would mean provider acceptance, not inbox receipt, qualification or revenue.

Activation requires an approved bilingual consent/retention design for the newly created GA4 property. Implement basic consent behavior that blocks loading and events until affirmative analytics consent, supports decline and withdrawal, and separates inquiry consent from analytics consent. Review automatic page views, enhanced measurement, URL/referrer collection and ad settings; sanitize them or disable them before enabling an adapter. Update privacy notices and CSP only for the approved implementation, then verify no pre-consent/declined requests and no PII in browser network payloads. Supplying an ID alone must not activate tracking. These are future acceptance criteria, not implemented guarantees. See [Google consent-mode concepts](https://developers.google.com/tag-platform/security/concepts/consent-mode).

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
