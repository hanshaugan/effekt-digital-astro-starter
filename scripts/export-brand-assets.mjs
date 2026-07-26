import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const brand = join(root, 'brand');
const svgDir = join(brand, 'svg');
const pngDir = join(brand, 'png');
const fontPath = join(brand, 'fonts', 'Outfit-Variable.ttf');

mkdirSync(pngDir, { recursive: true });

const fontDataUri = `data:font/ttf;base64,${readFileSync(fontPath).toString('base64')}`;

const markCircles = `
  <circle cx="3.2" cy="23.2" r="2.35" fill="#1f5f54"/>
  <circle cx="9.2" cy="18.4" r="2.55" fill="#1f5f54"/>
  <circle cx="15.5" cy="13.4" r="2.75" fill="#1f5f54"/>
  <circle cx="22.2" cy="8.6" r="2.95" fill="#1f5f54"/>
  <circle cx="28.6" cy="3.8" r="3.1" fill="#1f5f54"/>
`;

function markSvg(size, { fill = '#1f5f54', background = null } = {}) {
  const bg = background
    ? `<rect width="${size}" height="${size}" fill="${background}"/>`
    : '';
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
  ${bg}
  ${markCircles.replaceAll('#1f5f54', fill)}
</svg>`);
}

function logoSvg({
  width = 720,
  height = 128,
  textFill = '#151515',
  background = null,
  padding = 16,
} = {}) {
  const bg = background
    ? `<rect width="${width}" height="${height}" rx="16" fill="${background}"/>`
    : '';
  const markSize = height - padding * 2;
  const markX = padding;
  const markY = padding;
  const textX = markX + markSize + 18;
  const textY = height * 0.62;

  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <defs>
    <style>
      @font-face {
        font-family: 'OutfitExport';
        src: url('${fontDataUri}') format('truetype');
        font-weight: 100 900;
        font-style: normal;
      }
    </style>
  </defs>
  ${bg}
  <svg x="${markX}" y="${markY}" width="${markSize}" height="${markSize}" viewBox="0 0 32 32">
    ${markCircles}
  </svg>
  <text
    x="${textX}"
    y="${textY}"
    fill="${textFill}"
    font-family="OutfitExport, Outfit, Arial, sans-serif"
    font-size="${Math.round(height * 0.36)}"
    font-weight="600"
    letter-spacing="-0.04em"
  >Effekt Digital</text>
</svg>`);
}

async function writePng(name, svgBuffer, width, height) {
  const out = join(pngDir, name);
  await sharp(svgBuffer, { density: 300 })
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  console.log('Wrote', name);
}

async function main() {
  // Sync public favicon + site mark with brand source
  writeFileSync(join(root, 'public', 'favicon.svg'), markSvg(32));
  writeFileSync(join(root, 'public', 'images', 'brand', 'mark.svg'), markSvg(32));

  const markSizes = [32, 64, 128, 256, 512];
  for (const size of markSizes) {
    await writePng(`mark-${size}.png`, markSvg(size), size, size);
    await writePng(
      `mark-on-dark-${size}.png`,
      markSvg(size, { background: '#151515' }),
      size,
      size,
    );
    await writePng(
      `mark-inverse-${size}.png`,
      markSvg(size, { fill: '#f7f5f0', background: '#151515' }),
      size,
      size,
    );
  }

  const logoVariants = [
    {
      name: 'logo',
      textFill: '#151515',
      background: null,
    },
    {
      name: 'logo-on-sand',
      textFill: '#151515',
      background: '#f7f5f0',
    },
    {
      name: 'logo-on-dark',
      textFill: '#f7f5f0',
      background: '#151515',
    },
  ];

  for (const variant of logoVariants) {
    for (const scale of [1, 2]) {
      const width = 720 * scale;
      const height = 128 * scale;
      const svg = logoSvg({
        width,
        height,
        textFill: variant.textFill,
        background: variant.background,
        padding: 16 * scale,
      });
      const suffix = scale === 1 ? '' : '@2x';
      await writePng(`${variant.name}${suffix}.png`, svg, width, height);
    }
  }

  console.log('Brand assets exported to brand/png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
