# RFQ integration contract — not implemented or active

Phase 1A form is a browser-memory-only review interface. It performs no fetch, POST, email, localStorage or upload. The UI states delivery is unavailable before entry and again after review. Static hosting has no server-side validation capability. Client validation in `src/lib/inquiry.ts` is usability validation only.

Before live delivery, select a separately hosted secure endpoint or vetted form provider with approved data processing terms. An environment URL alone must not enable submission. `.env.example` reserves `NEXT_PUBLIC_RFQ_ENDPOINT`; no secret belongs in any `NEXT_PUBLIC_*` variable.

Required implementation and acceptance criteria:

1. HTTPS POST JSON with an allowlisted schema: division, category, name, organization, email, optional phone/model/specification, quantity, province, timeline, details, locale, consent version and timestamp. Enforce bounds, valid division/category membership and payload size server-side; reject unknown fields and attachments.
2. Treat all fields as untrusted. No user-controlled recipient or mail headers. Escape templates. Configure recipient `info@ventilators.ca` and operations address through private server configuration. No lead details in operational logs or analytics.
3. Origin/CORS allowlist for approved environments. If cookies/session authentication are added, implement an appropriate CSRF token and SameSite strategy. Origin checking alone is not bot protection.
4. Durable rate limiting (per-origin/IP risk bucket with reviewed privacy handling), spam controls and appropriate bot challenge/provider verification server-side. Define 413, 422, 429 and 503 responses.
5. Idempotency keys with durable deduplication and bounded expiry. Persist accepted delivery intent before acknowledging it. Distinguish accepted/queued from confirmed delivered; never label a mere HTTP 200 as verified email delivery.
6. Retry delivery with bounded exponential backoff, failure alerts and dead-letter handling; redact private details. Confirm actual EN/FR industrial/medical test messages in the approved inbox, including division/category and reply-to behavior.
7. Accessible pending, validation, retry, duplicate and unavailable states. Preserve entered data on a delivery failure. Disable duplicate clicks but do not lose the request.
8. Review privacy disclosure, retention/deletion policy, provider locations, consent wording and handling of accidental sensitive information with counsel before activation. No patient information or marketing opt-in by implication.
9. Test abuse, timeouts, consent errors, malformed email, overlong input, injection attempts, invalid category, duplicate submissions and provider failures using synthetic data.

Attachments stay disabled until authenticated storage access, size/type limits, malware scanning, retention/deletion, access logging and a secure reviewer workflow are implemented and verified.

Planned analytics event names: `division_selected`, `category_viewed`, `rfq_started`, `rfq_submitted`, `phone_clicked`, `email_clicked`, `language_changed`. No analytics is active. Never emit `rfq_submitted` for this preview. Approved IDs, consent and an event review are required; no names, emails, phone numbers, specifications or project details in events.
