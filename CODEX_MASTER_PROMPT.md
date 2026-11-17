# VENTILATORS.CA — CODEX MASTER PROMPT v2.0
Owner: Grafov Group | Repository: GrafovGroup/Ventilators
Status: Phase 1A approved branding; implementation kickoff

## Objective
Build a premium bilingual Canada-wide B2B supplier website for two separate divisions: Industrial Ventilation and Medical Ventilators. Lead generation and request-for-quote first, not checkout. Direct customer-facing provider with qualified supply/service partners; never misrepresent in-house capabilities.

## Approved identity
Use logo concept 01 Precision Airflow: bold slightly italic navy Ventilators wordmark, bright blue .ca, three layered sweeping navy-to-blue-to-cyan airflow strokes ABOVE the lettering. No slogan under the logo. Treat generated concept as visual reference, not an exact vector asset. Recreate a crisp accessible SVG wordmark and compact favicon; avoid fake trademark symbols. White and reversed variants. Palette navy #082448, blue #1267DE, cyan #19B8EE, white #FFFFFF; adjust for contrast.

## Navigation and architecture
Top bar: FR language switch, phone (833) 696-9996, email info@ventilators.ca.
Main navigation uppercase: INDUSTRIAL, MEDICAL, PRODUCTS, SERVICES, INDUSTRIES, RESOURCES, ABOUT, CONTACT. Persistent REQUEST A QUOTE CTA.
Home: strong split division hero with relevant authentic imagery and separate industrial/medical RFQ entry points; credibility without invented certifications, partners, testimonials or inventory.
Industrial: /en/industrial and /fr/industriel. Categories: roof ventilators, axial fans, centrifugal fans, exhaust fans, supply fans, blowers, parts, repairs, maintenance, installation coordination, replacements.
Medical: /en/medical and /fr/medical. Categories: ventilators, respiratory accessories, institutional procurement, sourcing and qualified technical support. Product details, compatibility, regulatory status, and availability must be verified before publication.
Resources: buying guides, specifications checklists, FAQs and procurement guides. Industries: warehouses, manufacturing, commercial facilities, hospitals, clinics, institutions.
Contact/RFQ: separate industrial and medical forms; fields name, organization, email, phone, province, category, equipment/specification, quantity, timeline, details, consent. Clearly identify submitted division. Secure server-side validation, spam mitigation, accessible success/error states, configurable delivery endpoint; never claim a working integration until tested.

## EN/FR
Complete Canadian English and natural Quebec-appropriate French from launch. All pages, forms, errors, nav, metadata, CTAs and structured data localized. Language switch in top bar; en-CA/fr-CA hreflang, self canonicals, translated slugs where sensible, sitemap per locale.

## Design
Distinctive premium technical corporate look; wide containers, large editorial equipment photography, accessible typography, uppercase menus/buttons, rounded CTA buttons, tasteful motion with reduced-motion support. Avoid generic AI aesthetics, decorative arrows, repeated imagery, placeholder claims, public AI credits, boilerplate statistics and stock testimonials. Responsive at 320px and up. Correct logo and favicon across browsers.

## Technical implementation
Next.js App Router + TypeScript, accessible semantic components, lean dependencies, server rendering/static generation, metadata API, robots.txt, XML sitemap, OpenGraph, JSON-LD only when eligible. WCAG 2.2 AA target, keyboard navigation, visible focus, contrast checks, optimized images and Core Web Vitals. No secrets committed; .env.example and README. No invented office address or physical local offices.

## SEO/AEO
Original useful national and provincial pages with distinct service details. Do not mass-create thousands of thin city pages or imply physical offices. Index only useful production pages; breadcrumbs, clean URLs, meaningful alt text, FAQ answers, internal linking, canonical and hreflang consistency. Provide structured content suitable for answer engines without exaggerated promises. Google/Bing verification and indexing only after deployment and owner access.

## Compliance
Industrial claims must reflect actual supply/service capabilities and any applicable licensing requirements. Medical: do not claim company or device is Health Canada approved/licensed unless verified; review applicable medical device licences, Medical Device Establishment Licence requirements, manufacturer authorization and provincial rules with qualified advisors before regulated sales. No patient-facing medical advice, clinical performance claims or unverified compatibility. Label unconfirmed catalogue entries as inquiry-only or omit them.

## Phase sequence
Phase 1A: implement approved logo SVG and favicon, design tokens, bilingual home, navigation, industrial/medical landing pages, RFQ form UI, SEO foundation. Capture screenshots for desktop/mobile and verify build/lint.
Phase 1B: complete product/service categories, content, live verified form delivery, accessibility and translation QA.
Phase 2: integrate verified manufacturers/product data, supplier onboarding, procurement and analytics.
Phase 3: publish after compliance/content checks, deploy, connect Search Console/Bing, monitor leads.

## Definition of done
npm install and build pass; lint/typecheck pass; navigation and FR toggle work; responsive screenshots reviewed; all CTAs route correctly; forms do not silently discard submissions; sitemap/canonicals/hreflang valid; favicon visible; no fake claims; README documents outstanding external dependencies.

## Phase 1A+ production specification — mandatory expansion (v2.0)
### Execution contract
Inspect repository before modifying; preserve existing work. Maintain a task checklist in BUILD_STATUS.md with status NOT STARTED / IN PROGRESS / VERIFIED / BLOCKED and evidence paths. Implement in small reviewable commits; no claim of completion without verification. Record decisions and assumptions. If external credentials, supplier authorization or approvals are absent, implement a safe placeholder or disabled integration and list exact blockers. Never invent results, licenses, testimonials, addresses, reviews, supplier relationships, pricing or stock levels.

### User journeys and conversion
Primary personas: facilities manager seeking replacement industrial ventilation; mechanical contractor requesting specifications/volume quote; hospital procurement specialist sourcing a regulated device; biomedical engineering staff requesting authorized servicing. Each division needs tailored entry, product-category navigation, technical inquiry, procurement CTA and contact confirmation. Sticky mobile call/RFQ action without obstructing content. Forms capture division, category, manufacturer/model (optional), airflow/capacity or clinical model as appropriate, quantity, province, urgency, project details and consent; permit attachments only after secure storage and malware controls are implemented. No protected patient information in medical forms. Never silently accept a submission: verified delivery or explicit demo/unavailable status.

### Content architecture and inventory model
Define typed product data schema: division, category, name, manufacturer, model, summary, applications, specifications with units, supporting documents, compatibility, licensing/regulatory evidence for medical, availability status, sourcing status, last_verified_at, canonical slug and translation status. Seed only generic category pages until product-specific details are confirmed. No fabricated SKU, image, brochure, brand affiliation, stock or price. Include comparison tables only where source data is verified. Industrial category pages explain roof/exhaust/supply/axial/centrifugal systems, maintenance, replacement and project RFQs; medical pages clearly distinguish invasive/non-invasive devices, accessories and institutional procurement, subject to validated supplier offerings. Include downloadable procurement/specification checklists where genuinely useful.

### Detailed page inventory
Ship bilingual Home, Industrial hub, Medical hub, category templates, Services, Industries, About, Resources hub, FAQ, Contact, RFQ, Privacy Policy, Terms, Accessibility statement, and useful 404/500 pages. Build initial category pages with unique informative content, not empty templates. Define per-page heading hierarchy, primary keyword, search intent, audience, primary CTA, internal links, source-of-truth and English/French copy. Add province pages only where actual coverage is confirmed and content differs meaningfully; do not claim offices in those locations. Maintain PAGE_MATRIX.md to track route, locale, purpose, CTA, metadata, copy approval and QA.

### Design implementation
Produce a token-based design system with typography scale, grid/container widths, colour roles, focus states, buttons, form fields, cards, tables, alerts and responsive header/footer. Create the approved logo as editable vector, with horizontal, compact, reversed and monochrome SVGs; check exact spelling and .ca kerning. Deliver favicons SVG/PNG/ICO and Apple touch icon, test every locale and route. Hero imagery should be relevant, licensed, appropriately credited if required, with no duplicated stock image across unrelated pages. Distinct division photography. Check 320/375/768/1024/1440px widths, reduced-motion, contrast, touch targets, focus order and skip links. Avoid gratuitous arrows, exaggerated gradients and repetitive AI-looking cards.

### Localization quality gate
Locale dictionaries must have identical keys and no untranslated English fallback in French production routes. Quebec-appropriate language, localized slugs, currency/date/units and legal text. Every localized page must have reciprocal hreflang links, correct canonical and metadata. Language switch retains equivalent page where available; otherwise goes to corresponding locale hub. Add a script to detect missing keys and broken localized routes. No auto-generated French content published without editorial review.

### Search, answer engines and performance
Define keyword clusters by division and intent, and a page-level keyword map rather than multiple pages targeting the same query. Add page-specific titles, descriptions, OG/Twitter previews, canonical, XML sitemap, robots and accessible breadcrumbs. Use Organization, WebSite, BreadcrumbList and Product structured data only when content meets eligibility and is accurate; no fake ratings or FAQ rich-result promises. Validate JSON-LD. Exclude preview, staging, thin, duplicate and unapproved pages from indexing. Add helpful buyer FAQs and product selection guidance with sources, not AI keyword stuffing. Performance targets on representative mobile pages: LCP <=2.5s, CLS <=0.1, INP <=200ms where measurable; document lab versus real-user measurements. Optimize fonts, images, caching and JS budgets.

### Compliance and legal approval gates
Canadian privacy and anti-spam requirements: clear privacy disclosure, retention policy, consent and email communication controls, secure handling of RFQ data. Have legal counsel review privacy/terms and regulated medical representations before launch. For medical products maintain a verified register of device licensing, manufacturer/distributor authority and any Medical Device Establishment Licence obligations; legal review determines applicable exemptions and provincial rules. Never label the company or devices Health Canada approved without substantiation. No clinical advice, medical performance promises, patient data collection, or unsupported servicing/training claims. For industrial services verify trade qualifications, insurance and scope before claiming availability.

### Integrations and observability
Use environment-driven server-side form delivery; configurable recipient info@ventilators.ca, plus operational alerts. Add spam controls, rate limiting, CSRF strategy as appropriate, validation, idempotency, safe logging and error handling. Define events: division_selected, category_viewed, rfq_started, rfq_submitted, phone_clicked, email_clicked, language_changed. Document Google Analytics 4 and Google Search Console/Bing setup; only activate with approved IDs and consent design. Avoid exposing private lead details to analytics. Add uptime/error monitoring plan and accessible success/failure messaging. Ensure no secret values enter GitHub.

### Testing and release gates
Automated: format/lint, TypeScript, production build, route smoke tests, locale parity, internal-link crawl, sitemap/canonical/hreflang checks, metadata checks, JSON-LD validation, unit tests for forms and translations, basic accessibility tests. Manual: keyboard/screen reader checks, real mobile viewport, browser favicon, contrast, copy proofreading, form delivery from both divisions, consent and error scenarios. Security: dependency scan, environment variable audit, secure headers, basic abuse tests. Record test commands, outputs and unresolved issues in QA_REPORT.md. A production launch is BLOCKED until verified delivery, legal review, content sign-off, domain/DNS/SSL and deployment rollback plan are completed.

### Deployment and maintenance
Target deployment must be selected based on real hosting capabilities; do not assume shared WHC hosting can run a persistent Next.js server. Prefer static export if hosting demands it, with separately hosted secure forms/API; otherwise use a compatible managed Next.js runtime. Provide deploy instructions, staging URL, DNS checklist, SSL, environment matrix, backup/rollback instructions, robots/noindex safeguards, and post-launch monitoring. Establish monthly content/product verification and quarterly technical SEO/accessibility audits.

### Required artifacts and phase gates
Commit DESIGN_SYSTEM.md, PAGE_MATRIX.md, CONTENT_SOURCE_REGISTER.md, COMPLIANCE_REGISTER.md, BUILD_STATUS.md, QA_REPORT.md, .env.example and README updates as work proceeds.
Gate A: logo assets, design tokens, architecture and page matrix approved.
Gate B: bilingual core pages and RFQ workflows function in staging.
Gate C: medical compliance and supplier claims validated, copy reviewed.
Gate D: automated/manual QA, verified email delivery and deployment sign-off.
Never mark Gate B-D passed based solely on generated code. Provide links to actual evidence and enumerate blockers.

### Immediate Codex instruction
Start by inspecting the repo, producing BUILD_STATUS.md and PAGE_MATRIX.md, then implement Gate A and core bilingual homepage/industrial/medical hubs. Do not stop at planning documents. Make the website executable and commit tested incremental work. Report precisely what was implemented, tested and blocked.
