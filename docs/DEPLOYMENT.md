# WHC.ca Pro deployment

The owner instructed publication of the full bilingual website on 2026-11-17 and selected `info@ventilators.ca` for inquiries. This supersedes the earlier coming-soon-only direction. The authorized release is informational: 80 localized pages, page-owned imagery, downloads, phone/email links and a reviewed inquiry flow. The owner subsequently supplied Formspree endpoint `mvkaapjj` and explicitly authorized connecting and testing submission. No product offers or specialist approval are implied.

Current release: `2026-11-17-answers-1`, source `a58834b29ce53d4d39434bb2b96c6ada2182b051`. LIVE on WHC; all 515 public files match the artifact and all 100 health checks pass. Evidence is under `../qa/evidence/answers/`. This completes buyer guidance/search copy for all 11 categories, adds four project shortcuts and directly linkable bilingual answers, and removes the fixed mobile action from inquiry pages. The previous SEO/UX release is the immediate rollback; the earlier operations release remains a rollback with analytics off.

Initial live release (retained for rollback): `2026-11-17-public-1`, source `02fc4e85bf26317160275928c65be2dbc04b7040`. The active and rollback roots, archive checksum and final live checks are recorded in `WHC_CONNECTION.md` and `../qa/evidence/public-release/release.json`.

## Environment matrix

| Environment           | Origin                     | Inquiry handling                                            | Indexing                               |
| --------------------- | -------------------------- | ----------------------------------------------------------- | -------------------------------------- |
| Local/review build    | localhost or review host   | Real endpoint unless localhost QA mock mode is selected     | noindex, robots disallow by default    |
| Public WHC release    | https://ventilators.ca     | Review then explicit send to Formspree; copy/email fallback | Explicit public build permits indexing |
| Rollback holding page | Previous WHC document root | Phone/email only                                            | noindex, robots disallow               |

Static Next.js export requires no Node server on WHC. `NEXT_PUBLIC_SITE_URL` defaults to the canonical origin above. `VENTILATORS_PUBLIC_RELEASE=1` intentionally enables public metadata and robots; it does not control the Formspree endpoint. Public ownership tokens in `src/content/search-verification.json` persist across builds; `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` override them. `NEXT_PUBLIC_FORMSPREE_FORM_ID` defaults to the owner-approved form ID. These settings require rebuilding; no WHC runtime environment changes are needed. Private credentials must never enter this repository or export. Existing external mail routing is preserved. Formspree notifications target info@ventilators.ca; see the latest delivery evidence in QA_REPORT.md.

## Build a release

Use Node 22+ with installed dependencies:

```sh
npm run lint
npm run typecheck
npm test
VENTILATORS_PUBLIC_RELEASE=1 npm run build
VENTILATORS_PUBLIC_RELEASE=1 npm run check:export
npm run check:performance
npm run format:check
npm audit --omit=dev --audit-level=high
npm run check:audit
npm run preview
```

The preview serves the exact `out/` output with noindex response headers. Check the bilingual inquiry validation/review/copy/edit flow, email link, responsive navigation, imagery, privacy notice and 404. Use the localhost `formtest` harness for routine failure tests. Only explicitly authorized, clearly labeled synthetic tests may use the real endpoint; verify them in Formspree and distinguish acceptance from email receipt. Commit the tested source before packaging:

```sh
node scripts/package-release.mjs YYYY-MM-DD-release-name
```

The packager requires public robots.txt, copies only exported files, adds `deploy/whc-public.htaccess` and hashed-asset caching, and creates a ZIP plus SHA-256 file manifest in ignored `qa/generated/releases/`. It refuses to overwrite an existing file set. The manifest records the source commit and whether the checkout was dirty. No source, credentials or dependencies belong in the upload.

## WHC release and rollback

1. Use authenticated cPanel File Manager. Prepare a new dedicated release directory outside the active document root. Upload and extract the ZIP into the release directory, inspect the resulting files including hidden `.htaccess`, and move the ZIP outside all public roots before publication.
2. Preserve the immediate rollback root `/home/nvfglyl5/ventilators-release-2026-11-17-seo-ux-1`, the earlier consent root `/home/nvfglyl5/ventilators-release-2026-11-17-consent-1`, the analytics-off root `/home/nvfglyl5/ventilators-release-2026-11-17-operations-1`, the site-wide AirGrid root `/home/nvfglyl5/ventilators-release-2026-11-17-airgrid-site-1`, the earlier homepage root `/home/nvfglyl5/ventilators-release-2026-11-17-airgrid-1`, the earlier discovery root `/home/nvfglyl5/ventilators-release-2026-11-17-discovery-1`, the prior full-site roots `/home/nvfglyl5/ventilators-release-2026-11-17-formspree-1` and `/home/nvfglyl5/ventilators-release-2026-11-17-public-1` and `/home/nvfglyl5/ventilators.ca`, the original holding-page root. Its exact files and artifact checksum are recorded in `docs/WHC_CONNECTION.md`. Do not touch other domains, mail records or the primary document root.
3. In cPanel Domains → Manage `ventilators.ca`, update **New Document Root** to the new release directory. This publishes the prepared release without overwriting the holding files. Record the final path and source/artifact checksums.
4. Verify public HTTPS, www/HTTP redirects, root and all 80 localized routes, canonical/hreflang/robots/sitemaps, assets/downloads, query preselection, and actual 404 status. Check security/cache headers and a browser inquiry review/copy cycle on the live site. Compare served file hashes to the artifact. For the current release, `/` and `/index.html` must return 301 to `/en/`; verify query preservation and direct `/fr/` access. Root HTML is a static refresh fallback, so the public byte crawl excludes it and probes redirects instead.
5. Remove only the uploaded ZIP after extraction, or retain it outside every public root. Retain the old holding root and local release artifact for rollback. Do not publish a deployment archive.
6. To roll back the current category-answers release, restore `ventilators-release-2026-11-17-seo-ux-1` and verify its manifest. For an analytics-off rollback, use `ventilators-release-2026-11-17-operations-1`. Historical rollback instructions: to roll back the site-wide AirGrid release, restore `ventilators-release-2026-11-17-airgrid-1` and verify its manifest; this restores the earlier language-choice entry page. To roll back the AirGrid homepage release, restore `ventilators-release-2026-11-17-discovery-1` and verify its manifest. To roll back the discovery release, restore `ventilators-release-2026-11-17-formspree-1` and verify its manifest. To roll back Formspree activation, restore document root `ventilators-release-2026-11-17-public-1` and verify the prior manifest. To restore only the holding page, use `ventilators.ca` and verify its HTML hash, HTTPS, phone/email links and noindex. The original directory is unchanged; no DNS change is needed.

Hashed `_next/static/` files use one-year immutable caching. HTML revalidates; nonhashed images use one-hour caching. Public error pages remain noindex. The CSP allows the static Next.js application, adds `https://formspree.io` to `connect-src`, and blocks native form submission; personal inquiry fields never enter a URL. Files beginning with a dot are denied.

## Outstanding operations

Formspree now supplies the selected hosted endpoint. Operational monitoring, retention/consent review and provider limitations are documented in `RFQ_ENDPOINT.md`. Legal, medical, supplier and bilingual editorial checks remain recorded as open in `COMPLIANCE_REGISTER.md`.

Search ownership and GA4 settings are recorded in OPERATIONS.md. Analytics uses explicit consent in public builds; VENTILATORS_ANALYTICS=0 disables it for an emergency release. Scheduled monitoring and monitoring ownership remain unconfigured. Do not infer email receipt from analytics events. Record actual deployment verification in `QA_REPORT.md` and `WHC_CONNECTION.md` before announcing the site is live.

The packager installs `deploy/analytics.htaccess` only under `/analytics/`, where the consent-created collector needs Google network access and same-origin framing. Keep the main document CSP restrictive. Verify that `/analytics/frame.html` has noindex and SAMEORIGIN headers and that its parent iframe has a no-referrer policy. A top-level visit must not load Google. The previous operations root remains a rollback with analytics off.
