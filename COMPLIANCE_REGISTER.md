# Compliance and release register

Status as of 2026-11-17. This register tracks evidence gaps; it is not a legal opinion. No licence, exemption, qualification or supplier relationship is inferred.

| Item                                        | Status                         | Current control                                                                                                     | Required evidence / responsible reviewer                                                                                          |
| ------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Medical device-specific regulatory evidence | BLOCKED                        | No product records or regulatory status claims                                                                      | Owner + qualified regulatory reviewer: applicable licence identifiers, exact models, current official evidence.                   |
| Establishment licensing and exemptions      | BLOCKED                        | No claim that the business is licensed or exempt                                                                    | Qualified advisor determines business activities, MDEL obligations/exemptions and provincial rules. Reference in source register. |
| Manufacturer/distributor authority          | BLOCKED                        | No brand partnerships or authorized servicing claims                                                                | Written authority with scope, territory, expiration and approved use of materials.                                                |
| Device/accessory compatibility              | BLOCKED                        | Inquiry-only categories; no compatibility assertions                                                                | Verified manufacturer documents for each exact model/part pair.                                                                   |
| Industrial services                         | BLOCKED                        | Scope subject to verification; no in-house installation promise                                                     | Trade qualifications, insurance, geographic coverage and partner scope.                                                           |
| Privacy, retention and consent              | BLOCKED                        | Formspree processing/storage disclosed before consent; WHC logs, no uploads; separate optional analytics consent    | Counsel reviews responsible entity/contact, providers, processing locations, retention/deletion, access requests and consent.     |
| Email / anti-spam controls                  | BLOCKED                        | Formspree inquiry notifications to info@ventilators.ca; no marketing subscriptions                                  | Verified inquiry-response delivery and approved separate marketing consent if ever added.                                         |
| Terms and privacy copy                      | BLOCKED                        | Factual notices describe Formspree processing, WHC logs and optional clipboard/email; specialist review outstanding | Legal and owner sign-off in both languages.                                                                                       |
| Patient data                                | VERIFIED (UI control only)     | Medical form explicitly prohibits patient information; attachments unavailable                                      | Operational handling remains necessary; Formspree does not establish automatic PHI detection.                                     |
| Unsupported content                         | VERIFIED (initial code review) | No SKUs, pricing, stock, addresses, reviews, certifications or partner logos                                        | Repeat review when real supplier content is added.                                                                                |
| EN/FR editorial approval                    | BLOCKED                        | Paired dictionaries, localized routes and automated parity                                                          | Canadian English and Quebec French human editorial approval.                                                                      |
| Public informational release                | VERIFIED (hosting only)        | 2026-11-17 explicit publication and subsequent Formspree integration instructions; no product offers                | Latest AirGrid release: 511 public files verified; rollback root preserved. Specialist gates above remain open.                   |

## Future verified product evidence

For each `ProductRecord`: record exact manufacturer/model, category, specifications with units and source, original supporting documents, compatibility evidence, applicable device/establishment regulatory review, supplier authority, availability/sourcing status, last verification timestamp and reviewed EN/FR slugs/copy. No current entries.

Review product evidence monthly and before quoting if its validity or availability may have changed. Schedule quarterly technical/SEO/accessibility review operationally after launch; no automation is created by this build.

## Historical Phase 1B scope

New service and industry pages describe inquiry preparation only. They do not establish service coverage, credentials, supplier relationships or device availability. Medical images are explicitly conceptual/contextual and do not illustrate device settings or clinical workflows. The product inventory is still empty. Guides link to official CCOHS/CCHST and Health Canada references for qualified review; these references are not an assertion about this business’s regulatory status.

RFQ priority expresses a procurement deadline, not an emergency response promise. The form renders after hydration and only validates in the browser; the static fallback cannot submit a native GET containing personal data. Review/edit retains values in the open page only. No submission API, analytics, persistent browser storage or attachments were introduced.

## Historical initial public release scope

The owner’s later launch instruction overrides the earlier blanket hold on full-site publication. It is not evidence of legal, medical, supplier or bilingual editorial approval. Privacy and terms now describe actual behavior, including WHC request logs and user-controlled clipboard/email handoff. The owner selected info@ventilators.ca; cPanel showed no mailboxes, existing external MX routing was preserved, and receipt has not been verified. No test email was sent and no mailbox or DNS mail change was made.

## Current Formspree scope — 2026-11-17

The owner selected Formspree `mvkaapjj` and requested connection and testing. Its enabled notification action targets info@ventilators.ca. UI consent and privacy copy now describe the provider, submitted fields, security metadata and possible processing outside Canada. No mail/DNS changes were made. Current acceptance/delivery evidence is in QA_REPORT.md. This implementation does not establish legal approval, custom server enforcement, automatic PHI detection, durable deduplication or an agreed retention schedule; see docs/RFQ_ENDPOINT.md.

## Search/operations increment — 2026-11-17

Owner authorized creating free search and GA4 properties. Google/Bing ownership metadata is public and does not collect visitor data. The analytics event contract rejects PII and arbitrary URLs, but no runtime analytics adapter or tag is installed; consent/privacy review remains required before activation. The manual health check sends GET requests only and cannot establish lead delivery or inbox response. Release checks document the exact unpatched dev-only picomatch advisory, with a 2026-12-17 exception expiry; no production dependency advisory was found. See `docs/OPERATIONS.md`.

Google HTML-tag ownership is now verified, with its sitemap successfully discovering 80 pages. Bing accepts the site and sitemap, with processing pending. GA4 property `564759274` was created with owner-confirmed business size and enhanced measurement off; the site has no tracking tag. These account actions do not supply consent, legal, editorial or supplier sign-off.

## Consent implementation — 2026-11-17

The owner explicitly authorized consent setup and activation. The bilingual basic-consent implementation blocks Google until opt-in, permits decline/withdrawal, expires choices after 180 days and excludes inquiry fields and URL parameters. Two-month GA4 user/event retention and disabled advertising/automatic measurement settings are recorded in `docs/OPERATIONS.md`. Privacy copy describes Google processing and withdrawal limits; this implementation does not supply counsel approval or alter the inquiry-only product gate. Earlier statements that analytics is unimplemented describe historical checkpoints.

## Buyer-answer increment — 2026-11-17

The five remaining category guides add original purchasing-preparation examples and scope comparisons. Invasive/non-invasive pages remain institutional inquiry categories without models, verified offers or clinical advice. FAQ repeats the actual optional-details/review/send behavior and explicitly separates provider acceptance from an order or confirmed availability. Existing specialist and bilingual editorial review items remain open; no gate or supplier evidence is promoted by this increment.
