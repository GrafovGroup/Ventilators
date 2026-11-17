// Deterministic local derivatives of the eight already licensed editorial photos.
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';

await mkdir('public/images/responsive', { recursive: true });
const photos = {};
for (const name of (await readdir('public/images'))
  .filter((name) => name.endsWith('.webp'))
  .sort()) {
  const source = `public/images/${name}`;
  const { width, height } = await sharp(source).metadata();
  const variants = [];
  for (const size of [480, 800, 1200].filter((size) => size <= width)) {
    const src = `/images/responsive/${name.replace('.webp', '')}-${size}.webp`;
    await sharp(source)
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 76, effort: 6 })
      .toFile(`public${src}`);
    variants.push({ src, width: size });
  }
  photos[`/images/${name}`] = { width, height, variants };
}
await writeFile('src/content/photo-variants.json', `${JSON.stringify(photos, null, 2)}\n`);
console.log(
  `Generated responsive variants for ${Object.keys(photos).length} existing photographs.`,
);
