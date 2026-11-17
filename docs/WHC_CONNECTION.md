# WHC connection — 2026-11-17

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
