// Review-only design options. Never included in public/ or the Next.js export.
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import sharp from 'sharp';
const root = 'designs/2026-11-17';
await mkdir(`${root}/assets`, { recursive: true });
const options = [
  {
    id: 1,
    name: 'Rotor',
    theme: 'Engineering studio',
    ink: '#13251e',
    accent: '#426c39',
    mark: `<circle cx="48" cy="48" r="43" fill="none" stroke="currentColor" stroke-width="3"/>${[0, 90, 180, 270].map((a) => `<path d="M49 42C27 11 70 3 80 29C68 27 61 38 55 47Z" transform="rotate(${a} 48 48)" fill="currentColor"/>`).join('')}<circle cx="48" cy="48" r="7" fill="currentColor"/>`,
    font: 'Arial, sans-serif',
    weight: 700,
    spacing: '-2',
    word: 'Ventilators',
  },
  {
    id: 2,
    name: 'Channel',
    theme: 'Architectural calm',
    ink: '#153f3b',
    accent: '#4b776c',
    mark: `<path d="M8 17L47 80L87 17M29 17L48 48L67 17" fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="round"/><path d="M31 81H65" fill="none" stroke="currentColor" stroke-width="4"/>`,
    font: 'Georgia, serif',
    weight: 400,
    spacing: '-1.5',
    word: 'Ventilators',
  },
  {
    id: 3,
    name: 'AirGrid',
    theme: 'Industrial editorial',
    ink: '#20211f',
    accent: '#cb3e27',
    mark: `<defs><mask id="grille"><rect width="96" height="96" fill="white"/>${[22, 39, 56, 73].map((x) => `<path d="M${x} 22V74" stroke="black" stroke-width="7"/>`).join('')}<path d="M14 48H82" stroke="white" stroke-width="8"/></mask></defs><rect x="4" y="4" width="88" height="88" rx="5" fill="currentColor" mask="url(#grille)"/>`,
    font: 'Arial, sans-serif',
    weight: 900,
    spacing: '-1.5',
    word: 'VENTILATORS',
  },
  {
    id: 4,
    name: 'DualStream',
    theme: 'Two clear pathways',
    ink: '#183553',
    accent: '#146e85',
    mark: `<path d="M4 19C34 19 32 63 61 63H91M4 38C28 38 33 80 61 80H91M4 5C55 5 37 44 63 44H91" fill="none" stroke="currentColor" stroke-width="9"/><path d="M75 29L92 44L75 59" fill="none" stroke="currentColor" stroke-width="5"/>`,
    font: 'Arial, sans-serif',
    weight: 600,
    spacing: '-1.8',
    word: 'Ventilators',
  },
  {
    id: 5,
    name: 'Northline',
    theme: 'Project-first index',
    ink: '#24293a',
    accent: '#b63531',
    mark: `<path d="M7 12H28L48 58L68 12H89L48 88Z" fill="currentColor"/><path d="M38 17L48 3L58 17L48 12Z" fill="currentColor"/>`,
    font: 'Arial, sans-serif',
    weight: 800,
    spacing: '-1.8',
    word: 'Ventilators',
  },
];
function logo(option, color = option.ink, accent = option.accent, iconOnly = false) {
  const size = iconOnly ? '96 96' : '560 100';
  const fontSize = option.id === 3 ? 39 : 48;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size}" role="img" aria-label="Ventilators.ca — ${option.name}"><title>Ventilators.ca — ${option.name}</title><g style="color:${color}">${option.mark}</g>${iconOnly ? '' : `<text x="114" y="65" fill="${color}" font-family="${option.font}" font-size="${fontSize}" font-weight="${option.weight}" letter-spacing="${option.spacing}">${option.word}<tspan fill="${accent}">.ca</tspan></text>`}</svg>`;
}
for (const o of options) {
  for (const [suffix, ink, accent] of [
    ['', o.ink, o.accent],
    ['-mono', o.ink, o.ink],
    ['-reversed', '#ffffff', '#ffffff'],
  ])
    await writeFile(`${root}/assets/logo-${o.id}${suffix}.svg`, logo(o, ink, accent));
  await writeFile(`${root}/assets/mark-${o.id}.svg`, logo(o, o.ink, o.accent, true));
  await sharp(Buffer.from(logo(o)))
    .resize(1120, 200)
    .png()
    .toFile(`${root}/assets/logo-${o.id}.png`);
}
for (const [source, dest] of [
  ['commercial', 'architecture'],
  ['industrial', 'industry'],
  ['medical', 'clinical'],
])
  await copyFile(`public/images/responsive/${source}-1200.webp`, `${root}/assets/${dest}.webp`);
const rotor = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700"><defs><pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#dbe3d7" stroke-width="1"/></pattern></defs><rect width="700" height="700" fill="url(#grid)"/><g fill="none" stroke="#244535"><circle cx="350" cy="350" r="253" stroke-width="2"/><circle cx="350" cy="350" r="236" stroke-width="1"/><circle cx="350" cy="350" r="204" stroke-width="20"/><circle cx="350" cy="350" r="64" stroke-width="2"/><path d="M350 35V665M35 350H665" stroke-dasharray="6 9" opacity=".4"/>${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M365 302C355 239 407 156 491 196C495 240 451 289 391 337Z" transform="rotate(${a} 350 350)" fill="#244535" stroke="none"/>`).join('')}<circle cx="350" cy="350" r="40" fill="#244535"/></g><g fill="#426c39">${[
  [145, 145],
  [555, 145],
  [145, 555],
  [555, 555],
]
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`)
  .join('')}</g></svg>`;
await writeFile(`${root}/assets/rotor-study.svg`, rotor);
const stream = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650"><rect width="1000" height="650" fill="#dcecf0"/><g fill="none" stroke="#28687c" stroke-width="2">${Array.from({ length: 18 }, (_, i) => `<path d="M-80 ${50 + i * 20}C320 ${-100 + i * 12} 380 ${630 - i * 9} 1100 ${290 + i * 18}"/>`).join('')}</g><circle cx="760" cy="290" r="150" fill="#fff" fill-opacity=".3"/></svg>`;
await writeFile(`${root}/assets/stream-study.svg`, stream);
await writeFile(
  `${root}/options.json`,
  JSON.stringify(
    options.map((o) => ({
      id: o.id,
      name: o.name,
      theme: o.theme,
      ink: o.ink,
      accent: o.accent,
      font: o.font,
      weight: o.weight,
      spacing: o.spacing,
      word: o.word,
    })),
    null,
    2,
  ) + '\n',
);
console.log(
  'Created 5 original vector identities, monochrome/reversed/icon variants, PNG logos and review-only artwork.',
);
