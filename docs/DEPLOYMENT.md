# WHC.ca Pro deployment — account verification pending

Production target is WHC.ca Pro, per the master prompt. The local output is static; no Next.js server, server actions, middleware or runtime APIs are required. Actual WHC compatibility has NOT been verified. No remote files or DNS settings have been changed.

## Environment matrix

| Environment   | Origin                                             | RFQ                                         | Indexing                                                             |
| ------------- | -------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| Local preview | http://localhost:3000                              | Review only                                 | noindex; robots disallow                                             |
| WHC staging   | Owner to provision                                 | Remains unavailable until endpoint verified | noindex, robots disallow; password/access restriction if appropriate |
| Production    | https://ventilators.ca (proposed canonical origin) | Verified separate provider required         | Enable only after Gates A–D                                          |

Build-time public canonical origin is `NEXT_PUBLIC_SITE_URL`. Private delivery credentials belong only on the separately hosted endpoint. No deployment credentials are stored in this repository.

## Pre-deployment

Confirm the actual WHC account/server stack, domain mapping and document root, static file support, directory index behavior, custom 404 handling, headers, SSL provisioning and supported secure upload/CI mechanism. Do not assume the document root is `public_html` or that SFTP/Apache directives are available. `deploy/whc.htaccess.example` is a review template only.

Build and check using Node 22+:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
npm run format:check
npm audit
```

`out/` is the deployable folder. Upload **its contents**, not source, `.env`, dependencies or `.git`. `npm run preview` serves this exact directory locally. Trailing-slash routes map to physical `index.html` files.

## Secure release procedure

1. Complete owner/editorial, legal, regulatory, supplier and verified-delivery gates. Record approval and evidence. Choose a staging subdomain and obtain least-privilege deployment credentials through secure account access.
2. Record current DNS (including MX, SPF, DKIM and DMARC), web-root contents and active release checksum. Do not change mail records as part of website deployment.
3. Build a versioned artifact from a tested Git commit with the correct environment origin. Store the artifact and file checksums with the release record, without secrets.
4. Back up the active web root. Upload to a separate release directory via supported SFTP/FTPS or secure CI. Switch the document root/rename only if the host supports an atomic approach; otherwise plan a controlled replacement and rollback. Do not upload over a live site without a backup.
5. Verify SSL chain, HTTPS and host redirects, `/`, `/en/`, `/fr/`, localized category deep links, query-string RFQ preselection, assets, downloads, icons, genuine 404 HTTP status and 404 content directly on WHC. Confirm no redirect loops or SPA fallback hiding 404s.
6. Validate canonical origin, reciprocal hreflang, sitemaps, headers, image caching and all form delivery/failure cases on staging. Check browser mobile rendering and keyboard behavior on the deployed artifact.
7. After sign-off, intentionally enable indexing in `src/lib/seo.ts` and reviewed hosting headers, remove draft legal text, rebuild and repeat checks. Do not flip indexing via an undocumented environment variable.
8. Deploy production; verify actual URL and rollback readiness before announcing success. Add Search Console/Bing verification only with owner account access, then submit the approved sitemap. GA4 remains off until consent design/IDs are approved.

## Caching, rollback and maintenance

Hashed `_next/static/` assets may be cached for one year with `immutable`. HTML should revalidate. Nonhashed brand/images/downloads need short caching or explicit versioning; do not mark them immutable. Confirm compression and cache behavior on WHC.

Rollback: keep prior artifact and web-root backup; switch back or restore the complete prior set, purge relevant host/CDN caches, then verify home, localized deep links, assets and RFQ provider configuration. Static assets should be retained through the rollback window to avoid breaking open tabs.

Monitoring plan: HTTPS availability and representative EN/FR deep-link checks, 404/error trends, endpoint health and delivery-failure alerts without lead data. Establish owners and retention before enabling any external monitor. Review content/product evidence monthly and technical SEO/accessibility quarterly. No monitoring or scheduled job is active yet.
