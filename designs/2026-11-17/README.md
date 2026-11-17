# Ventilators.ca design review — five alternatives

Open `index.html` to compare all five original logo identities and complete homepage concepts. Each homepage supports English/French switching, responsive navigation and links into the current live website. These files are review artifacts outside `public/`; none replaces the live website or enters its static export.

| Option        | Identity and homepage                                                 | Focus                                           |
| ------------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| 01 Rotor      | Four-blade symbol, forest green and lime, technical illustration      | Industrial engineering presence                 |
| 02 Channel    | Open V channel, serif wordmark, warm paper and architectural imagery  | Calm architectural presentation                 |
| 03 AirGrid    | Ventilation grille, bold wordmark, oversized type and fan photography | Strong industrial editorial direction           |
| 04 DualStream | Converging airflow, blue palette, switchable division stage           | Balanced industrial and medical journeys        |
| 05 Northline  | Directional V, red accent and a project route selector                | Fast access to categories, guides and inquiries |

Suggested starting point: DualStream for equal industrial/medical emphasis. Rotor is the strongest industrial direction. Logos and layouts can be mixed. No trademark availability or specialist editorial review is implied by these concepts.

## Included

- Five original editable SVG logos, each with monochrome, reversed and symbol-only versions.
- Five transparent 1120 × 200 PNG wordmarks.
- Five full responsive homepage HTML files, shared CSS/JavaScript, English/French copy, working navigation, division selector and project-routing controls.
- Desktop, mobile and narrow French preview screenshots; visual comparison boards.
- `qa.json` records browser/axe/layout checks and interaction results. Automated checks are not a complete accessibility certification.

The identities use web-safe Arial/Georgia typography. SVG text remains editable; the PNG files provide fixed rendered previews. SVGs can be converted to outlined lettering in a vector editor after a direction is selected.

## Imagery and content

Rotor and DualStream's airflow drawings are original conceptual SVG artwork. Three already licensed contextual photographs are copied from the site's existing local assets solely for these separate review concepts: `commercial.webp` → `architecture.webp` (Channel), `industrial.webp` → `industry.webp` (AirGrid), and `medical.webp` → `clinical.webp` (DualStream medical panel). Source credits and licensing are retained in `IMAGE_CREDITS.json`, copied from `src/content/media.ts`. Each photo appears in only one homepage option. None represents an offered product, supplied installation or owned facility. Brand symbols are identity elements, not product diagrams.

Catalogue copy remains inquiry-only. No inventory, manufacturer authorization, device licence, stock claim, partner claim, office location or guaranteed service coverage is invented. The review designs contain no inquiry submission handler or analytics. Calls to action lead to the existing website; the Northline selector only constructs a destination URL from fixed division and intent options.

## Reproduce and preview

From the repository root, run `node scripts/generate-design-options.mjs`, `node scripts/generate-homepage-options.mjs`, then `node scripts/generate-design-gallery.mjs`. These regenerate identities, assets and HTML; styles and interaction code live in this directory. Run `node scripts/preview-designs.mjs` and open `http://localhost:3002/`. The `?audit=1` option injects axe only through this local server. It is not part of the saved HTML or production website.
