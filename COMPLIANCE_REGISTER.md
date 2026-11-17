# Compliance and release register

Status as of 2026-11-17. This register tracks evidence gaps; it is not a legal opinion. No licence, exemption, qualification or supplier relationship is inferred.

| Item                                        | Status                         | Current control                                                                  | Required evidence / responsible reviewer                                                                                          |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Medical device-specific regulatory evidence | BLOCKED                        | No product records or regulatory status claims                                   | Owner + qualified regulatory reviewer: applicable licence identifiers, exact models, current official evidence.                   |
| Establishment licensing and exemptions      | BLOCKED                        | No claim that the business is licensed or exempt                                 | Qualified advisor determines business activities, MDEL obligations/exemptions and provincial rules. Reference in source register. |
| Manufacturer/distributor authority          | BLOCKED                        | No brand partnerships or authorized servicing claims                             | Written authority with scope, territory, expiration and approved use of materials.                                                |
| Device/accessory compatibility              | BLOCKED                        | Inquiry-only categories; no compatibility assertions                             | Verified manufacturer documents for each exact model/part pair.                                                                   |
| Industrial services                         | BLOCKED                        | Scope subject to verification; no in-house installation promise                  | Trade qualifications, insurance, geographic coverage and partner scope.                                                           |
| Privacy, retention and consent              | BLOCKED                        | No online delivery, storage, uploads, cookies or analytics                       | Counsel reviews responsible entity/contact, providers, processing locations, retention/deletion, access requests and consent.     |
| Email / anti-spam controls                  | BLOCKED                        | No automated messaging or marketing subscriptions                                | Verified inquiry-response delivery and approved separate marketing consent if ever added.                                         |
| Terms and privacy copy                      | BLOCKED                        | Explicit draft labels; preview noindex                                           | Legal and owner sign-off in both languages.                                                                                       |
| Patient data                                | VERIFIED (UI control only)     | Medical form explicitly prohibits patient information; no transmission           | Independent server validation and operational handling before activation; do not claim automatic PHI detection.                   |
| Unsupported content                         | VERIFIED (initial code review) | No SKUs, pricing, stock, addresses, reviews, certifications or partner logos     | Repeat review when real supplier content is added.                                                                                |
| EN/FR editorial approval                    | BLOCKED                        | Paired dictionaries, localized routes and automated parity                       | Canadian English and Quebec French human editorial approval.                                                                      |
| Public production launch                    | BLOCKED                        | Full review build noindex; only the separately approved WHC holding page is live | Gates A–D, delivery, hosting, DNS/SSL, backups/rollback, owner sign-off.                                                          |

## Future verified product evidence

For each `ProductRecord`: record exact manufacturer/model, category, specifications with units and source, original supporting documents, compatibility evidence, applicable device/establishment regulatory review, supplier authority, availability/sourcing status, last verification timestamp and reviewed EN/FR slugs/copy. No current entries.

Review product evidence monthly and before quoting if its validity or availability may have changed. Schedule quarterly technical/SEO/accessibility review operationally after launch; no automation is created by this build.

## Phase 1B scope

New service and industry pages describe inquiry preparation only. They do not establish service coverage, credentials, supplier relationships or device availability. Medical images are explicitly conceptual/contextual and do not illustrate device settings or clinical workflows. The product inventory is still empty. Guides link to official CCOHS/CCHST and Health Canada references for qualified review; these references are not an assertion about this business’s regulatory status.

RFQ priority expresses a procurement deadline, not an emergency response promise. The form renders after hydration and only validates in the browser; the static fallback cannot submit a native GET containing personal data. Review/edit retains values in the open page only. No submission API, analytics, persistent browser storage or attachments were introduced.
