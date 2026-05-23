/**
 * scripts/gen-icons.mjs
 *
 * Generates PWA icons from /public/logo-transparent.png using sharp.
 * Run with: node scripts/gen-icons.mjs
 *
 * Output:
 *   /public/icon-192.png          — 192×192 standard icon
 *   /public/icon-512.png          — 512×512 standard icon
 *   /public/icon-maskable-512.png — 512×512 maskable (extra padding for circular masks)
 *   /public/apple-touch-icon.png  — 180×180 for iOS home screen
 */

import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const srcLogo = path.join(rootDir, 'public', 'logo-transparent.png');

// Teal brand colour — must match --primary in globals.css
const TEAL = { r: 13, g: 148, b: 136, alpha: 1 };

/**
 * Creates a solid-colour square with the logo composited centred,
 * sized so the logo occupies (1 - 2*safePadding) of the canvas width/height.
 *
 * @param {number} size           Canvas size in pixels (square)
 * @param {string} outputPath     Absolute path for the PNG output
 * @param {number} safePadding    Fraction of canvas to reserve as padding on each side (0–0.5)
 */
async function generateIcon(size, outputPath, safePadding = 0.18) {
  const logoAreaSize = Math.round(size * (1 - 2 * safePadding));

  // Resize logo to fit within the safe area while preserving aspect ratio,
  // output as PNG buffer so sharp can handle it as a composite input
  const resizedLogoBuf = await sharp(srcLogo)
    .resize(logoAreaSize, logoAreaSize, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer();

  // Get the actual dimensions of the resized logo
  const { width: logoW, height: logoH } = await sharp(resizedLogoBuf).metadata();

  // Center the logo on the canvas
  const left = Math.round((size - logoW) / 2);
  const top = Math.round((size - logoH) / 2);

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: TEAL,
    },
  })
    .composite([
      {
        input: resizedLogoBuf,
        left,
        top,
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`Created ${path.relative(rootDir, outputPath)} (${size}×${size}, padding ${Math.round(safePadding * 100)}%)`);
}

const icons = [
  // Standard icons — 18% safe padding
  { size: 192, file: 'icon-192.png',          padding: 0.18 },
  { size: 512, file: 'icon-512.png',          padding: 0.18 },
  // Maskable — extra padding so the logo survives circular/squircle masks
  { size: 512, file: 'icon-maskable-512.png', padding: 0.25 },
  // Apple touch icon
  { size: 180, file: 'apple-touch-icon.png',  padding: 0.18 },
];

for (const { size, file, padding } of icons) {
  await generateIcon(size, path.join(rootDir, 'public', file), padding);
}

console.log('\nAll icons generated successfully.');
