import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

await mkdir('public/brand', { recursive: true });
const strokes = (reverse = false, mono = false) =>
  `<path d="M27 28C79 1 154 0 217 14C142 8 80 16 27 28Z" fill="${reverse ? '#fff' : '#082448'}"/><path d="M53 31C105 10 171 11 225 22C156 18 103 22 53 31Z" fill="${mono ? '#082448' : '#1267DE'}"/><path d="M82 34C130 22 181 23 230 30C170 28 126 30 82 34Z" fill="${mono ? '#082448' : '#19B8EE'}"/>`;
for (const variant of ['logo', 'logo-reversed', 'logo-monochrome', 'logo-horizontal']) {
  const reversed = variant === 'logo-reversed';
  const mono = variant === 'logo-monochrome';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 83" role="img" aria-labelledby="title"><title id="title">Ventilators.ca</title>${strokes(reversed, mono)}<text x="7" y="68" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-style="italic" font-size="39" letter-spacing="-1.6" fill="${reversed ? '#FFFFFF' : '#082448'}" textLength="197" lengthAdjust="spacingAndGlyphs">Ventilators</text><text x="204" y="68" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-style="italic" font-size="33" letter-spacing="-1.5" fill="${mono ? '#082448' : reversed ? '#6acfff' : '#1267DE'}">.ca</text></svg>`;
  await writeFile(`public/brand/${variant}.svg`, svg);
}
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Ventilators.ca"><rect width="64" height="64" rx="14" fill="#082448"/><path d="M12 21Q29 9 51 15M18 25Q35 16 54 21M24 29Q40 23 55 27" stroke-width="3.5" stroke-linecap="round" fill="none" stroke="#19B8EE"/><path d="M17 32h9l3 16 12-16h10L32 56H22Z" fill="white"/></svg>`;
await writeFile('public/favicon.svg', icon);
await writeFile('public/brand/logo-compact.svg', icon);
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(icon)).resize(32, 32).png().toFile('public/favicon-32.png');
const png = await readFile('public/favicon-32.png');
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, png]));
for (const locale of ['en', 'fr']) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#082448"/><path d="M100 120Q460 0 1050 100M240 145Q650 60 1100 150M450 172Q800 130 1120 196" stroke="#19b8ee" stroke-width="12" fill="none"/><text x="90" y="335" font-family="Arial" font-size="112" font-weight="bold" font-style="italic" fill="white">Ventilators<tspan fill="#6acfff">.ca</tspan></text><text x="95" y="440" font-family="Arial" font-size="36" fill="#d4e2f0">${locale === 'en' ? 'Industrial ventilation. Medical procurement.' : 'Ventilation industrielle. Approvisionnement médical.'}</text><text x="95" y="535" font-family="Arial" font-size="22" letter-spacing="5" fill="#6acfff">CANADA</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`public/brand/social-${locale}.png`);
}
console.log('Logo variants, favicon assets and EN/FR social previews generated.');
