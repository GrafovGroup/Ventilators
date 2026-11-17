# VENTILATORS.CA — CODEX MASTER PROMPT v1.0
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
