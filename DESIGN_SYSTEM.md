# Design system — Precision Airflow

Implemented for review, 2026-11-17. Owner approval remains pending (Gate A).

## Identity

Editable SVGs in `public/brand/`: `logo.svg`, `logo-horizontal.svg`, `logo-reversed.svg`, `logo-monochrome.svg`, `logo-compact.svg`. The wordmark spells **Ventilators.ca**, uses a bold italic face and three layered airflow strokes above the lettering. No slogan or trademark symbol. Horizontal is the standard lockup. SVG text remains editable; Arial/Helvetica must be available to reproduce its exact outlines in an editor. Final outlined production artwork can follow owner approval.

Favicon: `public/favicon.svg`, `public/favicon-32.png`, `public/favicon.ico`; Apple icon: `public/apple-touch-icon.png`. Localized OpenGraph images: `public/brand/social-en.png`, `social-fr.png`. Regenerate with `node scripts/generate-assets.mjs` (Sharp is a development dependency).

## Tokens and typography

Source: `src/app/globals.css`. Navy `#082448`; primary blue `#1267DE`; cyan `#19B8EE` for decorative accents; body ink `#102E4F`; muted text `#536477`; surface `#F3F6F8`; rules `#DCE3EA`; error `#A62323`; focus `#A94A00`. Cyan is not used for small body text on white.

System Arial/Helvetica avoids third-party font requests. Desktop H1 40–72px, H2 30–44px, H3 22–26px; body 16px; long introductions 18px; compact uppercase navigation 10–11px. Mobile H1 37–54px, body 15–16px. Maximum content width 1360px. Gutters 48/32/20/16px depending on viewport. Buttons use rounded ends; images use subtle 4px corners. Section spacing 45–90px.

## Components and interaction

- Split photography hero with separate division and RFQ links. Photos are contextual, not product offers.
- Responsive navigation, bilingual utility strip, footer, breadcrumbs and mobile call/RFQ actions.
- Category rows emphasize specifications and inquiry preparation instead of invented stock or pricing.
- Buttons, focus rings, form fields, radio groups, consent checkbox, alerts, inline errors and review confirmation.
- One H1 per page; semantic landmarks; skip link; labelled controls; keyboard menu with Escape handling.
- Motion limited to image hover and colour changes, disabled for reduced-motion preferences.
- No badges suggesting certifications, no testimonials, decorative arrows, fake statistics or brand affiliations.

## Review evidence

See `QA_REPORT.md` and `qa/evidence/` for actual desktop/mobile screenshots. Browser widths: 320, 375, 768, 1024, 1440. Automated accessibility results have narrower scope than WCAG conformance; human screen-reader and real-device testing remain required.

## Phase 1B editorial imagery

Use one owned editorial visual per equipment, service, facility or guide page. The homepage keeps its two original division photos; neither is reused on division hubs. EN/FR equivalents share the same image with translated alt text and caption. Header/footer brand marks and social metadata remain shared identity assets.

`src/content/media.ts` owns all 30 editorial assets. Eight Pexels photos show context, not owned facilities or available products. Twenty-two original SVGs explain equipment boundaries and procurement records without manufacturer identities, clinical instructions or measured product dimensions. Do not crop/recolour a photo to evade the no-reuse rule. Index cards use text links, not repeated hero thumbnails.

Diagrams preserve the full 4:3 composition. Photography uses responsive crops with a visible context caption. Page-specific sources and file hashes are recorded in the source register and QA inventory. Legal, contact and text directories do not need decorative imagery. Tests enforce unique source IDs and file bytes; the export crawler enforces the actual per-page assignment.

Detail pages use a two-column hero, anchored contents list, numbered preparation sections, related categories and a contextual inquiry action. Narrow layouts stack naturally; print styles remove navigation and preserve the preparation sections.
