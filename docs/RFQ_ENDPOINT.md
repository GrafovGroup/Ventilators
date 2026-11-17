# Formspree inquiry delivery

The owner supplied and authorized endpoint `https://formspree.io/f/mvkaapjj` on 2026-11-17. The official React integration (`@formspree/react` 3.0.0) matches the Next.js static export hosted on WHC. No WHC application server, API secret or native form redirect is required. This supersedes the earlier proposed custom-endpoint contract.

## Visitor flow

1. Enter division-specific business requirements and acknowledge the bilingual privacy notice. Browser validation checks required fields, email, bounds, quantity and category/division membership.
2. Review all values locally. This step transmits nothing. The request receives a `VCA-<UUID>` reference and consent timestamp.
3. Select **Send inquiry / Envoyer la demande**. The SDK sends HTTPS JSON to the fixed Formspree endpoint. The send/edit buttons are disabled while pending, with a synchronous duplicate-click guard. After 15 seconds, a localized message explains that confirmation is still pending.
4. A provider-accepted response shows a focused, localized success state and reference. This means accepted for processing, not proof of inbox delivery or a commercial order.
5. A network/provider failure retains the reviewed values. Retry uses the same reference; edit, copy, email and phone remain available. Provider field errors are described using localized field names. No automatic retry runs.

The inquiry lives in React/browser memory until transmission or an explicit clipboard copy. No persistent browser draft, analytics or upload is used. The no-JavaScript fallback offers phone/email. CSP blocks native form navigation and permits fetch only to the same origin and Formspree, so personal fields do not enter a URL.

## Payload and recipient

`src/lib/inquiry-delivery.ts` emits an allowlist: division, name, organization, email, optional phone/model/specification, province, category label and ID, quantity, translated timeline/priority, details/message, locale, request ID, consent value/version/text/timestamp and canonical inquiry page. `_subject` is built only from trusted division/locale choices; `_gotcha` is the honeypot. Unknown fields, recipients, redirects and attachments are not forwarded by this UI. `email` supplies Formspree's notification Reply-To.

The Formspree Workflow UI was inspected: its enabled Email action targets **info@ventilators.ca**. Form Enabled, Submission Archive and Formshield were enabled. CAPTCHA was already Disabled; this integration did not alter those controls or email/DNS configuration. The public form ID is not a credential. No Stripe/payment provider is configured, even though the official SDK includes optional Stripe dependencies.

## Processing and limits

Formspree processes and stores submitted business details and request/security metadata. Its privacy policy allows processing in the US and other countries. The bilingual notice links that policy and identifies the selected provider before consent. WHC still serves only static files and request logs; submissions are not stored in a WHC application database.

Client validation and allowlisting are usability controls, not an independent server security boundary: callers can send directly to the public endpoint. Formspree supplies hosted validation/spam handling. The application does not claim custom server schema enforcement, a configured rate limit, durable idempotency, automatic delivery retries, a dead-letter queue, Canadian-only storage or automatic patient-information detection. The reference helps staff identify repeated inquiries but cannot prevent all duplicates after an ambiguous network failure. Patient information and attachments remain prohibited.

Operational follow-up: monitor Formspree submissions/spam/quota and notification failures; define access, retention/deletion and inquiry handling with the owner. Legal and bilingual editorial review remain open. Keep marketing consent separate if marketing is ever introduced. No analytics is currently active.

## Verification

`tests/inquiry-delivery.test.ts` checks complete EN/FR payloads, stable retry metadata, invalid inputs and attempted recipient/header/redirect injection through extra fields. The local-only `scripts/qa-form-delivery.js` harness simulates success, 503 then retry, 422 field validation, 429, network failure and slow response without contacting Formspree. It never enters `out/`.

Use explicitly labeled synthetic EN industrial and FR medical submissions for authorized live testing. Confirm both the public success state and matching records in Formspree; record notification delivery evidence separately from actual inbox receipt. The owner confirmed receipt of English and French notifications during this release. The French synthetic test required individual spam review, and one English follow-up was sent after the first notification remained pending. Individual test statuses and limitations are in `../QA_REPORT.md` and `../qa/evidence/formspree/`.

Official references: [React library](https://help.formspree.io/articles/working-with-react/the-formspree-react-library/), [special fields](https://help.formspree.io/articles/building-your-form/special-fields), [honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering), [privacy policy](https://formspree.io/legal/privacy-policy/).

## False-positive review — 2026-11-17

The owner asked to protect legitimate inquiries while retaining spam protection. The current Formspree account exposes the advanced controls read-only: smart filter enabled, sensitivity slider at 50 (the midpoint, consistent with Neutral), with crypto/drugs/fraud/porn/spam-phrase/spam-URL classifiers enabled. Profanity and spam-email classifiers are off. Formshield and Submission Archive remain enabled. No provider settings, paid plan, CAPTCHA, DNS or mailbox rule was changed during this review.

No custom Rules/blocklist is configured in the available UI. Project domain restriction is empty. The live site returns `Referrer-Policy: strict-origin-when-cross-origin`; Formspree permits this policy. Adding a strict domain restriction would introduce a documented rejection risk for browsers that suppress referrers, so it was not added to address false positives. The honeypot is hidden, has autocomplete disabled, and was empty during the visible business-form test. Standard fields are trimmed, validated and allowlisted; there is no client keyword filter or rejection of French characters. The earlier synthetic French classification has no provider-exposed reason: its cause must not be guessed.

Two new, clearly labeled, realistic business examples were submitted through the unchanged live site: English industrial fan repair and French medical technical support. Both appeared in the regular Formspree inbox, with Spam (0), without manual reclassification. Both notifications were marked delivered to info@ventilators.ca. Individual statuses and references are in `../qa/evidence/spam-review/`. This verifies these examples, not a guarantee that every future inquiry will pass.

### Recovering a legitimate inquiry

1. If an expected notification is missing, check this form's Submissions → Inbox and Spam in Formspree, and the recipient mailbox's junk folder. Match the request reference; avoid creating a duplicate commercial request merely because email is delayed.
2. Inspect the message before changing its classification. For a verified legitimate entry, select only that entry and choose Not Spam. Verify it appears in Inbox and inspect the notification status. Preserve suspicious entries as spam; do not allow every message or every sender on a public form.
3. Record repeated false positives with submission ID, locale and business context. The current plan does not permit sensitivity/classifier changes. Formspree Professional or higher unlocks these controls; any paid upgrade requires owner authorization. If authorized, test a less aggressive smart-filter setting while retaining Formshield, the honeypot and relevant malicious-content classifiers. Do not infer that moving one message trains a sender allowlist.
4. Keep the submission archive available and include a manual Spam-folder check in normal inquiry handling. No scheduled monitoring or guarantee of automatic recovery was established by this review.

Sources: [Formshield sensitivity and classifiers](https://help.formspree.io/articles/advanced-features/advanced-spam-filtering), [domain restrictions and referrer caveat](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain), [honeypot behavior](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering). Changes to mailbox filtering would require access to the actual recipient mail service; no broad sender exemption was created.
