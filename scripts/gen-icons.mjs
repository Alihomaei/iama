/**
 * scripts/gen-icons.mjs
 *
 * Brand-icon pipeline for the site favicon + Meeting App PWA icons.
 * Run with: node scripts/gen-icons.mjs
 *
 * 1. Extracts the circular IAMA seal from /public/logo.png (the left emblem of
 *    the horizontal lockup, before the "IAMA" wordmark) and trims it to a tight,
 *    transparent-cornered square:
 *      /public/seal.png                — reusable transparent circular seal
 * 2. Composites the seal centred on brand teal for the installable PWA icons:
 *      /public/icon-192.png            — 192×192 standard
 *      /public/icon-512.png            — 512×512 standard
 *      /public/icon-maskable-512.png   — 512×512 maskable (extra safe-zone padding)
 *      /public/apple-touch-icon.png    — 180×180 iOS home screen (opaque)
 * 3. Builds the browser favicon from the *transparent* seal (needs ImageMagick):
 *      /src/app/favicon.ico            — multi-size 48/32/16, transparent corners
 */

import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const pub = (f) => path.join(rootDir, 'public', f);

// Teal brand colour — must match --primary in globals.css
const TEAL = { r: 13, g: 148, b: 136, alpha: 1 };

// 1. Extract the circular seal from the full logo lockup.
// logo.png is 1636×696; the seal fills the left ~full-height square. Crop a
// generous left region (stopping before the wordmark), then trim the
// transparent border so we're left with just the round seal.
// NB: extract→trim is done in two passes; chaining them trips sharp.
const sealPath = pub('seal.png');
const cropBuf = await sharp(pub('logo.png'))
  .extract({ left: 0, top: 0, width: 720, height: 695 })
  .png()
  .toBuffer();
await sharp(cropBuf).trim().png().toFile(sealPath);
const seal = await sharp(sealPath).metadata();
console.log(`Created public/seal.png (${seal.width}×${seal.height}, transparent seal)`);

// 2. Composite the seal centred on a teal square, sized to (1 − 2·padding).
async function generateIcon(size, file, safePadding) {
  const inner = Math.round(size * (1 - 2 * safePadding));
  const sealBuf = await sharp(sealPath)
    .resize(inner, inner, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer();
  const { width: w, height: h } = await sharp(sealBuf).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: TEAL } })
    .composite([{ input: sealBuf, left: Math.round((size - w) / 2), top: Math.round((size - h) / 2) }])
    .png()
    .toFile(pub(file));
  console.log(`Created public/${file} (${size}×${size}, padding ${Math.round(safePadding * 100)}%)`);
}

const icons = [
  { size: 192, file: 'icon-192.png', padding: 0.14 },
  { size: 512, file: 'icon-512.png', padding: 0.14 },
  // Maskable needs the seal inside the central safe zone (~80%) for circle/squircle masks.
  { size: 512, file: 'icon-maskable-512.png', padding: 0.18 },
  { size: 180, file: 'apple-touch-icon.png', padding: 0.12 },
];
for (const { size, file, padding } of icons) {
  await generateIcon(size, file, padding);
}

// 3. Favicon (.ico) from the transparent seal. sharp can't write .ico, so use
// ImageMagick. Optional — skipped with a hint if `magick` isn't installed.
try {
  execFileSync('magick', [
    sealPath,
    '-background', 'none',
    '-define', 'icon:auto-resize=48,32,16',
    path.join(rootDir, 'src', 'app', 'favicon.ico'),
  ]);
  console.log('Created src/app/favicon.ico (48/32/16, transparent)');
} catch {
  console.warn(
    'Skipped favicon.ico — ImageMagick `magick` not found. Install it, then run:\n' +
      '  magick public/seal.png -background none -define icon:auto-resize=48,32,16 src/app/favicon.ico'
  );
}

console.log('\nAll icons generated successfully.');
