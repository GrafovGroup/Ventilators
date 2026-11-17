# Design system — Precision Airflow

## Owner-selected AirGrid system — 2026-11-17

AirGrid applies to every English and French page, retaining all existing production logo assets. Warm paper, charcoal and rust, bold uppercase hero headings, square calls to action and thin editorial rules provide the shared design. The homepage keeps its filled/outlined heading. Interior pages use responsive split headings, numbered editorial sections and the existing unique photography/illustrations. The original blue wordmark remains intact. See `src/app/airgrid.css`, `src/app/airgrid-interior.css` and `src/app/globals.css`.

The root opens `/en/` directly via the WHC 301 rule, with a static refresh/link fallback. The language-choice gateway is removed; French remains one header link away. The owner explicitly requested the site-wide style and original-logo retention.

## Identity

Editable SVGs in `public/brand/`: `logo.svg`, `logo-horizontal.svg`, `logo-reversed.svg`, `logo-monochrome.svg`, `logo-compact.svg`. The wordmark spells **Ventilators.ca**, uses a bold italic face and three layered airflow strokes above the lettering. No slogan or trademark symbol. Horizontal is the standard lockup. SVG text remains editable; Arial/Helvetica must be available to reproduce its exact outlines in an editor. Final outlined production artwork can follow owner approval.

Favicon: `public/favicon.svg`, `public/favicon-32.png`, `public/favicon.ico`; Apple icon: `public/apple-touch-icon.png`. Localized OpenGraph images: `public/brand/social-en.png`, `social-fr.png`. Regenerate with `node scripts/generate-assets.mjs` (Sharp is a development dependency).

## Tokens and typography

Source: `src/app/globals.css`. Paper `#F4F3EE`; charcoal/ink `#20211F`; primary rust `#B33F29`; muted text `#565B55`; secondary surface `#EEEEE7`; rules `#C9CCC5`; error `#A62323`; focus `#A94A00`. Brand and original illustration assets retain their colours.

System Arial/Helvetica avoids third-party font requests. Interior desktop H1 scales up to 96px with balanced line wrapping and language-aware hyphenation. Body text is 16px and introductions 18px. Containers have no maximum width: `calc(100% - 2 * var(--gutter))`, with `--gutter: clamp(16px, 2.5vw, 64px)`. A 2560px screen has a 2432px container. Paragraphs retain readable measures within full-width multi-column layouts. Controls and images use square corners; section spacing remains responsive. Large directories use three columns above 1800px, and mobile layouts stack naturally.

## Components and interaction

- Split photography hero with separate division and RFQ links. Photos are contextual, not product offers.
- Responsive navigation, bilingual utility strip, footer, breadcrumbs and mobile call/RFQ actions.
- Category rows emphasize specifications and inquiry preparation instead of invented stock or pricing.
- Buttons, focus rings, form fields, radio groups, consent checkbox, alerts, inline errors and review confirmation.
- One H1 per page; semantic landmarks; skip link; labelled controls; keyboard menu with Escape handling.
- Motion limited to image hover and colour changes, disabled for reduced-motion preferences.
- No badges suggesting certifications, no testimonials, decorative arrows, fake statistics or brand affiliations.

## Review evidence

See `QA_REPORT.md` and `qa/evidence/` for actual desktop/mobile screenshots. Current site-wide browser checks: all 80 localized pages at 320px; representative layouts at 768, 1440 and 2560px; mobile interactions at 375px. Automated accessibility results have narrower scope than WCAG conformance; human screen-reader and real-device testing remain required.

## Phase 1B editorial imagery

Use one owned editorial visual per equipment, service, facility or guide page. The homepage keeps its two original division photos; neither is reused on division hubs. EN/FR equivalents share the same image with translated alt text and caption. Header/footer brand marks and social metadata remain shared identity assets.

`src/content/media.ts` owns all 30 editorial assets. Eight Pexels photos show context, not owned facilities or available products. Twenty-two original SVGs explain equipment boundaries and procurement records without manufacturer identities, clinical instructions or measured product dimensions. Do not crop/recolour a photo to evade the no-reuse rule. Index cards use text links, not repeated hero thumbnails.

Diagrams preserve the full 4:3 composition. Photography uses responsive crops with a visible context caption. Page-specific sources and file hashes are recorded in the source register and QA inventory. Legal, contact and text directories do not need decorative imagery. Tests enforce unique source IDs and file bytes; the export crawler enforces the actual per-page assignment.

Detail pages use a two-column hero, anchored contents list, numbered preparation sections, related categories and a contextual inquiry action. Narrow layouts stack naturally; print styles remove navigation and preserve the preparation sections.
