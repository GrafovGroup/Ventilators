# WHC connection — 2026-11-17

## Current release: category answers and project navigation — 2026-11-17

- Live document root: `/home/nvfglyl5/ventilators-release-2026-11-17-answers-1`.
- Clean runtime source: `a58834b29ce53d4d39434bb2b96c6ada2182b051`; ZIP 5,456,862 bytes; SHA-256 `8516af1341390912895d09bce085996273e2130299cb82341dd729f18f02398b`.
- All 515 public files match the artifact and all 100 live health checks pass after WHC propagation. Archive retained privately at `/home/nvfglyl5/2026-11-17-answers-1.zip`; its public URL returns 404.
- Immediate rollback: `/home/nvfglyl5/ventilators-release-2026-11-17-seo-ux-1`. All previous roots, including the analytics-off operations release, are preserved.
- All 11 categories now have bilingual buyer guidance and distinct search copy. Four project shortcuts, grouped shareable FAQ answers and a quieter mobile inquiry page preserve the original logo, AirGrid and inquiry-only catalogue. No DNS/mail/provider settings changed; no real inquiries sent.
- Live EN project/guide/inquiry routing and FR answer continuity/mobile review verified. Evidence: `../qa/evidence/answers/`. GitHub quality run `44179534139` passed.

## Previous release: SEO, buyer guidance and inquiry UX — 2026-11-17

- Live document root: `/home/nvfglyl5/ventilators-release-2026-11-17-seo-ux-1`.
- Clean runtime source: `92bc7b3a394834b9e8b2ca135ab332ee97b8df82`; ZIP 5,377,848 bytes; SHA-256 `aac27546a8720ce3d2cbe7d2d9bd63c9f7aa3c5e115adb3969235087c369e3bd`.
- All 515 public files match the artifact and all 100 live health checks pass. The release ZIP is retained privately at `/home/nvfglyl5/2026-11-17-seo-ux-1.zip`; its public URL returns 404.
- Immediate rollback: `/home/nvfglyl5/ventilators-release-2026-11-17-consent-1`. The earlier operations root remains available for an analytics-off rollback. All previous roots are preserved.
- Descriptive bilingual search metadata, six enriched category guides and a shorter optional-details inquiry flow. Original logo, AirGrid, image assignments, consent collector and Formspree/spam configuration are preserved. No DNS/mail/provider settings changed; no real inquiries sent.
- Live EN desktop and FR mobile review verified. Evidence: `../qa/evidence/seo-ux/`. GitHub quality run `44175262584` passed.

## Previous release: consent and analytics — 2026-11-17

- Live document root: `/home/nvfglyl5/ventilators-release-2026-11-17-consent-1`.
- Clean runtime source: `c2710c10af9956c523d9728bd78c880bd81c2148`; ZIP 5,298,309 bytes; SHA-256 `54585bfe8de5cc4a4106967c8fa2d6b1294b75fc50d36f0e35c4bddbfe2940d8`.
- 515 public files match the manifest; all 100 live health checks pass. Archive retained privately at `/home/nvfglyl5/2026-11-17-consent-1.zip` (public URL 404).
- Rollback root: `/home/nvfglyl5/ventilators-release-2026-11-17-operations-1`, which keeps analytics off. Earlier roots remain intact.
- Google tag container `GTM-54NXJDVG` version 3 supplies the configuration-command initialization trigger and privacy settings; the site loads it via measurement ID `G-59FBT5T5V1` only after opt-in. See `OPERATIONS.md` for the remote configuration dependency.
- Domain/DNS/email and Formspree spam controls unchanged; catalogue remains inquiry-only. All seven brand files and 54 image files are unchanged. No real inquiry submitted.

The following release records are historical.

## Current search/operations release

WHC accepted the document-root change for release `2026-11-17-operations-1`, built from clean source `be7500c2a9bd952f6617eeb77efa7e925b701ada`. All 511 public files match the artifact, and all 100 health checks pass.

- Document root: `/home/nvfglyl5/ventilators-release-2026-11-17-operations-1`.
- Immediate rollback: `/home/nvfglyl5/ventilators-release-2026-11-17-airgrid-site-1`.
- Archive: `2026-11-17-operations-1.zip`, 5,242,854 bytes; SHA-256 `d6a834dd41c0ecbed0fa98eadb04ecc6affbbece09eaae2d1ecfc08ee8a37a33`.
- 514 manifest files. Archive moved to `/home/nvfglyl5/2026-11-17-operations-1.zip` outside the public root before activation.
- Adds Google/Bing ownership tags. Google ownership is verified with sitemap Success (80 discovered pages); Bing accepts the property/sitemap and is processing it. Original logo, all image bytes, AirGrid layout, inquiry endpoint and spam controls remain unchanged.
- GitHub quality run `44159455240` passed all checks. No analytics tag is installed and no real inquiries were submitted.

## Previous site-wide AirGrid release

Release `2026-11-17-airgrid-site-1` is live at https://ventilators.ca/ from clean source `045209015a0e1c526f9f3e5b632321ecb19437f3` on `codex/phase-1a`. AirGrid now covers all 80 localized routes with fluid containers and the original production logo. The language-choice gateway is removed: the root and `/index.html` return 301 directly to `/en/`, preserving queries. French remains available through equivalent-page header links.

- Active document root: `/home/nvfglyl5/ventilators-release-2026-11-17-airgrid-site-1`.
- Immediate rollback: `/home/nvfglyl5/ventilators-release-2026-11-17-airgrid-1`; earlier roots remain intact.
- ZIP: `2026-11-17-airgrid-site-1.zip`, 5,203,992 bytes, SHA-256 `7f53e00716e82005a604d25470b40d242951a186f294b311c444dc0dec8db9a7`.
- Uploaded/extracted into a new root; hidden `.htaccess`, index and both locale directories inspected. ZIP moved to `/home/nvfglyl5/2026-11-17-airgrid-site-1.zip` before activation.
- cPanel confirmed the new root. All 511 directly served public files match the manifest. Two `.htaccess` files are private; root fallback HTML is covered by build checks and public redirect probes. HTTP/www/root/query redirects, headers, robots and 404 pass. Public archive and review gallery return 404.
- Live English at 1920px and French at 375px: original logo, fluid container sizing, mobile navigation, form hydration and inquiry language continuity pass with no console errors. No real inquiries were sent. Evidence: `qa/evidence/airgrid-site/`.
- Rollback: restore `ventilators-release-2026-11-17-airgrid-1` in cPanel Domains → Manage ventilators.ca → New Document Root → Update, then verify its prior manifest and gateway behavior. This also restores the earlier language-choice entry page. No DNS, mail, hosting-plan or spam-control changes occurred.

## Historical AirGrid homepage release

Release `2026-11-17-airgrid-1` was published at https://ventilators.ca/ from clean source `333be83e9a720c6e34e4afdf4f41af5e08fd1836` on `codex/phase-1a`. The owner selected the AirGrid homepage style and retained the original production logo. English and French homepages use the new layout; the catalogue remains inquiry-only.

- Active document root: `/home/nvfglyl5/ventilators-release-2026-11-17-airgrid-1`.
- Immediate rollback: `/home/nvfglyl5/ventilators-release-2026-11-17-discovery-1`; older Formspree, initial public and holding roots remain intact.
- ZIP: `2026-11-17-airgrid-1.zip`, 5,211,074 bytes, SHA-256 `f8847684d5ab1f2beee8db0e912708e5b01e80e99dae8bb7e754e760ef6cfc95`.
- Uploaded and extracted into a fresh root; hidden `.htaccess`, index and localized directories inspected. ZIP moved to `/home/nvfglyl5/2026-11-17-airgrid-1.zip` before publication.
- cPanel confirmed the root change. After WHC applied the configuration, all 513 public files matched the manifest. Redirects, headers, robots and 404 pass. Live desktop/mobile homepages, navigation, category search and localized inquiry preselection pass without new real submissions. Evidence: `qa/evidence/airgrid/`.
- Restore the immediate rollback root in cPanel Domains → Manage ventilators.ca → New Document Root → Update if needed, then verify against the discovery manifest. No DNS, mail, hosting-plan or spam-protection changes were made.

## Historical discovery release

Release `2026-11-17-discovery-1` was published at https://ventilators.ca/ from clean source `61b2818255cbe359a75b167f05b53227d3209ae5` on `codex/phase-1a`. It adds the bilingual category finder, responsive photos and deferred inquiry SDK while preserving inquiry-only catalogue status and the existing form provider/spam settings.

- Active document root: `/home/nvfglyl5/ventilators-release-2026-11-17-discovery-1`.
- Immediate rollback: `/home/nvfglyl5/ventilators-release-2026-11-17-formspree-1`; original holding and initial public roots also remain intact.
- ZIP: `2026-11-17-discovery-1.zip`, 5,210,438 bytes, SHA-256 `78e761363e36ef2da7dca9455e8ab1a268c4fe17c431fa091e1fe816bb3ece8c`.
- Uploaded and extracted into a fresh root; hidden `.htaccess`, index and localized directories inspected. ZIP moved to `/home/nvfglyl5/2026-11-17-discovery-1.zip` before publication.
- cPanel confirmed the root change. All 513 public files match the manifest; redirects, headers, robots and 404 pass. Live EN/FR finder and form loading checked without sending additional real inquiries. Evidence: `qa/evidence/discovery/`.
- Restore the immediate rollback root in cPanel Domains → Manage ventilators.ca → New Document Root → Update if needed; verify against the Formspree release manifest. No DNS, mail or hosting-plan changes were made.

## Historical Formspree release

The owner supplied form `mvkaapjj` and authorized integration/testing after the initial launch. Release `2026-11-17-formspree-1` is live at https://ventilators.ca/.

- Clean source: `8ae4beb1e98996ada2013452a8044c66b61dded9` on `codex/phase-1a`.
- Active root: `/home/nvfglyl5/ventilators-release-2026-11-17-formspree-1`.
- Immediate rollback: `/home/nvfglyl5/ventilators-release-2026-11-17-public-1` (full informational site with local review/copy only).
- Original holding root remains `/home/nvfglyl5/ventilators.ca`.
- ZIP: `2026-11-17-formspree-1.zip`, 3,641,502 bytes, SHA-256 `238298fc4f8425957547bf462d64b29ffcac7b67317096abe772d1f47941c8e4`.
- Uploaded/extracted in a fresh directory through cPanel. Archive moved to `/home/nvfglyl5/2026-11-17-formspree-1.zip`, outside public roots, before activation. HTML, EN/FR directories and hidden `.htaccess` inspected.
- cPanel confirmed the new document root. After the short WHC configuration delay, all 487 public files matched the artifact SHA-256 values at 17:22:20 UTC; 80 routes, redirects, real 404s, robots, assets and headers passed. The live CSP permits Formspree fetch and still blocks native form navigation.
- Live English industrial and French medical tests returned accepted states and matching provider records. The French synthetic test was initially classified as spam and reviewed individually; a labeled English follow-up was sent after an initial delay. The owner confirmed receiving French and English notifications. See `QA_REPORT.md` for individual test statuses. Formshield remains enabled. No DNS, mailbox, hosting-plan or provider security-control changes were made.

Rollback uses cPanel Domains → Manage ventilators.ca → New Document Root `ventilators-release-2026-11-17-public-1` → Update. Allow WHC to apply the change, then compare to the prior public-release manifest and confirm the local review-only form. No DNS change is needed. Current evidence: `qa/evidence/formspree/release.json`, `live-http.json`, `live-browser.json` and provider records.

## Historical initial public release

The owner’s later instruction to make the site live superseded the earlier holding-page-only direction. The full bilingual informational website is now live at https://ventilators.ca/ on the existing WHC Pro plan. No new hosting purchase or DNS/mail changes were needed.

- Release: `2026-11-17-public-1`; clean source commit `02fc4e85bf26317160275928c65be2dbc04b7040`.
- Active document root: `/home/nvfglyl5/ventilators-release-2026-11-17-public-1`.
- Original holding root, unchanged: `/home/nvfglyl5/ventilators.ca`.
- ZIP SHA-256: `f49d6d09bbb69aa52e0a53545edd11e25fd6627b492f24b41c00ecf75651674e`, 3,628,839 bytes.
- Uploaded and extracted through authenticated cPanel File Manager. Moved the upload ZIP to `/home/nvfglyl5/2026-11-17-public-1.zip`, outside public roots. No source or credentials were uploaded.
- cPanel Domains confirmed the root update. WHC began serving the new files after a short configuration delay. Final HTTP crawl at 16:59:50 UTC verified 487 public files byte-for-byte, including all 80 localized pages.
- Public indexing enabled deliberately; error pages remain noindex. HTTPS redirects, 404 routing, image/download files, caching/security headers and live mobile inquiry review/copy passed. See `qa/evidence/public-release/` and `QA_REPORT.md`.
- Owner selected `info@ventilators.ca`. Existing external MX records remain unchanged; cPanel showed no mailboxes. Receipt is unverified. Visitors copy their prepared summary and send email themselves; no automatic form endpoint is active.

To roll back this release, use cPanel Domains → Manage `ventilators.ca` → New Document Root `ventilators.ca` → Update. Allow the hosting configuration to apply, then verify the holding-page SHA-256 `16ebd3a9aae1ee2048b4b26f02b67b0d31925de77e57f3fda6f3f2b6436d6564`, HTTPS and noindex. No DNS rollback is needed. The historical web-DNS rollback below is only for reverting to the older Webmojo hosting.

## Historical holding-page connection

The owner requested domain and hosting through WHC and selected a simple “Coming soon” page while the full site is reviewed. The holding page is maintained in `deploy/coming-soon/`; it contains no forms, scripts, analytics or third-party assets. Search indexing remains disabled.

## Configuration

- Existing WHC Web Hosting Pro plan; no purchase or plan change.
- Added `ventilators.ca` with a separate directory named `ventilators.ca` under the hosting account home. The existing primary site's document root was not shared or changed.
- Confirmed website IP: `51.161.57.68`. The hosting dashboard's SFTP address is different and must not be used for web DNS.
- Kept WHC nameservers `parking1.whc.ca` and `parking2.whc.ca`.
- Updated apex A record to `51.161.57.68`, TTL 300.
- Updated `www` CNAME to `ventilators.ca.`, TTL 300.
- Removed the apex HTTPS/SVCB alias to the old Webmojo package so supported browsers follow the new hosting.
- Preserved both MX records, SPF and email-forwarding verification TXT. WHC showed zero configured forwarding aliases; this task did not create or test email delivery.
- Requested the included Let's Encrypt certificate through cPanel. AutoSSL covers the apex and www; cPanel reports automatic renewal and expiry on 2027-02-15.
- Uploaded only the holding page through cPanel File Manager. Temporary ZIP files were removed from the web root. The full preview was not extracted or published.

## Rollback

The previous DNS web targets were:

| Record | Name | TTL | Previous value                                                                      |
| ------ | ---- | --- | ----------------------------------------------------------------------------------- |
| A      | @    | 300 | `109.204.86.3`                                                                      |
| CNAME  | www  | 300 | `eec60de5-2998-41bf-8c26-5848146139d4.package.webmojo.whc.ca.`                      |
| HTTPS  | @    | 300 | priority `0`, target `eec60de5-2998-41bf-8c26-5848146139d4.package.webmojo.whc.ca.` |

Restore those three web records together if reverting to the former WHC Webmojo target. Leave mail and nameserver records intact. The old endpoint had an untrusted certificate at inspection; reverting DNS does not fix that certificate.

The new hosting directory was empty apart from cPanel-created `cgi-bin` and `.well-known` directories. No existing website files were overwritten. Local DNS backup, release ZIP and hashes are in ignored `qa/generated/whc-2026-11-17/`; no account credentials are stored in the repository.

## Verification

The authoritative WHC server and public resolvers returned the new web records. Both website hostnames passed TLS verification. HTTP requests for apex and www, and HTTPS requests for www, return a 301 redirect to `https://ventilators.ca/`. The canonical page, logo, favicon and robots file return 200; unknown paths and removed deployment ZIP files return genuine 404 responses.

The four public files exactly match the repository source. The host applies the noindex, no-cache and security headers from `.htaccess`. Desktop (1440 px) and mobile (375 px) screenshots were reviewed; mobile has no horizontal overflow and the logo loads. Evidence is in `qa/evidence/whc-http-checks.json` and `qa/evidence/whc-coming-soon-*.jpg`. The final release ZIP SHA-256 is `95968ce978d7345ae70cc28d95938be193f584f9530ca50ca3c5bac1d284a0e0`.

The full site's editorial, legal, supplier and RFQ delivery gates remain open. Connecting the domain and publishing this holding page does not approve the full-site launch.
