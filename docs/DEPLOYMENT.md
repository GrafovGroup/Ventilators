# WHC.ca Pro deployment

The owner instructed publication of the full bilingual website on 2026-11-17 and selected `info@ventilators.ca` for inquiries. This supersedes the earlier coming-soon-only direction. The authorized release is informational: 80 localized pages, page-owned imagery, downloads, phone/email links and a local inquiry builder with review/copy. No automatic inquiry transmission, product offers or specialist approval are implied.

## Environment matrix

| Environment           | Origin                     | Inquiry handling                                  | Indexing                               |
| --------------------- | -------------------------- | ------------------------------------------------- | -------------------------------------- |
| Local/review build    | localhost or review host   | Local review/copy only                            | noindex, robots disallow by default    |
| Public WHC release    | https://ventilators.ca     | Local review/copy; visitor sends email themselves | Explicit public build permits indexing |
| Rollback holding page | Previous WHC document root | Phone/email only                                  | noindex, robots disallow               |

Static Next.js export requires no Node server on WHC. `NEXT_PUBLIC_SITE_URL` defaults to the canonical origin above. `VENTILATORS_PUBLIC_RELEASE=1` intentionally enables public metadata and robots; it never enables a delivery endpoint. Private credentials must never enter this repository or export. Existing external mail routing is preserved; delivery to the selected contact is unverified.

## Build a release

Use Node 22+ with installed dependencies:

```sh
npm run lint
npm run typecheck
npm test
VENTILATORS_PUBLIC_RELEASE=1 npm run build
VENTILATORS_PUBLIC_RELEASE=1 npm run check:export
npm run format:check
npm audit
npm run preview
```

The preview serves the exact `out/` output with noindex response headers. Check the bilingual inquiry validation/review/copy/edit flow, email link, responsive navigation, imagery, privacy notice and 404. No real inquiry or email should be sent during QA. Commit the tested source before packaging:

```sh
node scripts/package-release.mjs YYYY-MM-DD-release-name
```

The packager requires public robots.txt, copies only exported files, adds `deploy/whc-public.htaccess` and hashed-asset caching, and creates a ZIP plus SHA-256 file manifest in ignored `qa/generated/releases/`. It refuses to overwrite an existing file set. The manifest records the source commit and whether the checkout was dirty. No source, credentials or dependencies belong in the upload.

## WHC release and rollback

1. Use authenticated cPanel File Manager. Prepare a new dedicated release directory outside the active document root. Upload the ZIP to its parent, extract into the release directory and inspect the resulting files, including hidden `.htaccess`.
2. Preserve `/home/nvfglyl5/ventilators.ca`, the original holding-page root. Its exact files and artifact checksum are recorded in `docs/WHC_CONNECTION.md`. Do not touch other domains, mail records or the primary document root.
3. In cPanel Domains → Manage `ventilators.ca`, update **New Document Root** to the new release directory. This publishes the prepared release without overwriting the holding files. Record the final path and source/artifact checksums.
4. Verify public HTTPS, www/HTTP redirects, root and all 80 localized routes, canonical/hreflang/robots/sitemaps, assets/downloads, query preselection, and actual 404 status. Check security/cache headers and a browser inquiry review/copy cycle on the live site. Compare served file hashes to the artifact.
5. Remove only the uploaded ZIP after extraction, or retain it outside every public root. Retain the old holding root and local release artifact for rollback. Do not publish a deployment archive.
6. To roll back, set the domain’s document root back to `ventilators.ca`. Verify the holding-page HTML hash, HTTPS, phone/email links and noindex. The original directory is unchanged; no DNS change is needed.

Hashed `_next/static/` files use one-year immutable caching. HTML revalidates; nonhashed images use one-hour caching. Public error pages remain noindex. The CSP allows the static Next.js application and blocks native form submission; personal inquiry fields never enter a URL. Files beginning with a dot are denied.

## Outstanding operations

Automatic RFQ handling still requires a separately hosted secure endpoint, server-side validation, delivery verification, retention/consent review and failure handling; see `RFQ_ENDPOINT.md`. Legal, medical, supplier and bilingual editorial checks remain recorded as open in `COMPLIANCE_REGISTER.md`.

Search Console/Bing verification, analytics, scheduled monitoring and monitoring ownership are not configured. Do not claim sitemap submission or email receipt. Record actual deployment verification in `QA_REPORT.md` and `WHC_CONNECTION.md` before announcing the site is live.
