import { readFile, writeFile } from 'node:fs/promises';
const root = 'designs/2026-11-17';
const options = JSON.parse(await readFile(`${root}/options.json`));
const descriptions = [
  'A rotor symbol, forest green palette and a technical airflow study. Confident and distinctly industrial.',
  'An open V channel, warm paper and editorial serif typography. Calm, architectural and premium.',
  'A ventilation grille, strong black wordmark and rust accents. Bold, practical and visually assertive.',
  'Converging airflow lines and a blue palette. Switchable industrial and medical journeys give both divisions equal weight.',
  'A directional V and a restrained red accent. A project selector gets visitors to the relevant next step quickly.',
];
const shell = (title, body, cls = '') =>
  `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,nofollow"/><title>${title} · Ventilators.ca</title><link rel="stylesheet" href="gallery.css"/></head><body class="${cls}">${body}</body></html>`;
const logos = options
  .map(
    (o) =>
      `<article class="logo-row"><div><span class="number">0${o.id}</span><h2>${o.name}</h2><p>${o.theme}</p></div><img class="wordmark" src="assets/logo-${o.id}.svg" alt="${o.name} logo — Ventilators.ca" width="560" height="100"/><div class="logo-samples"><img src="assets/mark-${o.id}.svg" alt="${o.name} symbol" width="96" height="96"/><span style="background:${o.ink}"></span><span style="background:${o.accent}"></span></div><div class="downloads"><a href="assets/logo-${o.id}.svg" download>SVG</a><a href="assets/logo-${o.id}.png" download>PNG</a><a href="assets/logo-${o.id}-mono.svg" download>Mono</a><a href="assets/logo-${o.id}-reversed.svg" download>White</a></div></article>`,
  )
  .join('');
const cards = options
  .map(
    (o, i) =>
      `<article class="home-card"><a href="home-${o.id}.html"><img src="previews/home-${o.id}-desktop.png" alt="Homepage option ${o.id}: ${o.name}" width="1440" height="1000"/></a><div class="card-body"><span class="number">0${o.id}</span><h3>${o.name}</h3><p>${descriptions[i]}</p><div class="card-links"><a href="home-${o.id}.html">Explore EN ↗</a><a href="home-${o.id}.html?lang=fr">Voir FR ↗</a><a href="previews/home-${o.id}-mobile.png">Mobile preview ↗</a></div></div></article>`,
  )
  .join('');
await writeFile(
  `${root}/index.html`,
  shell(
    'Five design directions',
    `<header class="gallery-header"><p class="eyebrow">VENTILATORS.CA / DESIGN EXPLORATIONS / 17 NOV 2026</p><h1>Five directions.<br>One starting point.</h1><p>Five original logo options and five complete, responsive homepage concepts. Explore in English or French. All product and procurement content remains inquiry-only.</p><nav><a href="#logos">Compare logos ↓</a><a href="#homepages">Explore homepages ↓</a><a href="https://ventilators.ca/">Current live website ↗</a></nav></header><main><section id="logos"><div class="section-heading"><p class="eyebrow">01 / IDENTITY</p><h2>Five ways to make your mark.</h2><p>Editable SVG, transparent PNG, monochrome and reversed versions are included. Brand names and palette choices can be mixed with any homepage layout.</p></div>${logos}</section><section id="homepages"><div class="section-heading"><p class="eyebrow">02 / HOMEPAGES</p><h2>Choose the experience.</h2><p>These are separate review concepts. Navigation links lead to the current website; only the published catalogue update is live.</p></div><div class="home-grid">${cards}</div></section></main><footer>Suggested starting point: <strong>DualStream</strong> for balanced industrial and medical journeys; <strong>Rotor</strong> for a stronger industrial identity. No concept has replaced the live brand.</footer>`,
  ),
);
await writeFile(
  `${root}/logos.html`,
  shell(
    'Five logo options',
    `<header class="board-header"><p class="eyebrow">VENTILATORS.CA / IDENTITY STUDY</p><h1>Five logo directions.</h1><p>Original vector concepts · 17 November 2026</p></header><main>${logos}</main><footer>Colour · Monochrome · Reversed · Symbol · Transparent PNG</footer>`,
    'logo-board',
  ),
);
await writeFile(
  `${root}/homepages.html`,
  shell(
    'Five homepage options',
    `<header class="board-header"><p class="eyebrow">VENTILATORS.CA / HOMEPAGE STUDY</p><h1>Five homepage directions.</h1></header><main class="home-grid">${cards}</main><footer>Responsive EN / FR review concepts. The live website remains unchanged by these alternatives.</footer>`,
    'home-board',
  ),
);
console.log('Created comparison gallery and review boards.');
