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
