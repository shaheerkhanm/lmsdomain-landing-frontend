// ============================================================================
// Site icons from one source: node scripts/generate-icons.mjs
//
// Source: assets-src/brand-mark.svg (the "D" of the LMS Domain logo, as in the nav).
// Writes:
//   public/favicon.ico                 16, 32, 48 px (PNG entries)
//   public/icons/icon.svg              dark tile, white D; light tile in dark mode
//   public/icons/icon-192.png          rounded tile (manifest "any")
//   public/icons/icon-512.png          rounded tile (manifest "any")
//   public/icons/icon-maskable-512.png full-bleed tile, D inside the safe zone
//   public/icons/apple-touch-icon.png  180 px, solid background (iOS rounds it)
// The site links to these through app/layout.tsx (metadata) and app/manifest.ts.
// ============================================================================

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "public", "icons");
fs.mkdirSync(OUT, { recursive: true });

const INK = "#161616"; // tile colour of the nav mark
const PAPER = "#FFFFFF";

const source = fs.readFileSync(path.join(ROOT, "assets-src", "brand-mark.svg"), "utf8");
const markGroup = source.match(/<g[\s\S]*<\/g>/)[0]; // the D, 48 x 48 grid

// tile: "rounded" (rx 14 on 48, like the nav), or "full" (square, for iOS / maskable)
// scale: size of the D relative to the nav mark (1 = same proportions)
const tileSvg = ({ tile = "rounded", scale = 1, bg = INK, fg = PAPER, size = 512 }) => {
  const rect = tile === "rounded" ? `<rect width="48" height="48" rx="14" fill="${bg}"/>` : `<rect width="48" height="48" fill="${bg}"/>`;
  const t = (1 - scale) * 24; // keep the D centred when scaling
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">${rect}<g transform="translate(${t} ${t}) scale(${scale})" color="${fg}" fill="${fg}">${markGroup.replace(/currentColor/g, fg)}</g></svg>`;
};

const png = (svg, size) => sharp(Buffer.from(svg), { density: 72 * (size / 48) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

const write = async (name, buffer) => {
  fs.writeFileSync(path.join(OUT, name), buffer);
  const meta = await sharp(buffer).metadata();
  console.log(`${("icons/" + name).padEnd(28)} ${meta.width}x${meta.height}  ${meta.hasAlpha ? "alpha" : "opaque"}  ${(buffer.length / 1024).toFixed(1)} KB`);
};

// SVG icon with a dark-mode variant (a dark tile disappears on dark tab bars)
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
<style>.tile{fill:${INK}}.mark{fill:${PAPER}}@media (prefers-color-scheme: dark){.tile{fill:${PAPER}}.mark{fill:${INK}}}</style>
<rect class="tile" width="48" height="48" rx="14"/>
${markGroup.replace(/fill="currentColor"/g, 'class="mark"')}
</svg>
`;
fs.writeFileSync(path.join(OUT, "icon.svg"), svgIcon);
console.log(`${"icons/icon.svg".padEnd(28)} vector  ${(svgIcon.length / 1024).toFixed(1)} KB`);

await write("icon-192.png", await png(tileSvg({ size: 192 }), 192));
await write("icon-512.png", await png(tileSvg({ size: 512 }), 512));
// Maskable: launchers crop to a circle/squircle covering the middle 80 %, so the D is drawn smaller
await write("icon-maskable-512.png", await sharp(await png(tileSvg({ tile: "full", scale: 0.8, size: 512 }), 512)).flatten({ background: INK }).png().toBuffer());
await write("apple-touch-icon.png", await sharp(await png(tileSvg({ tile: "full", scale: 0.95, size: 180 }), 180)).flatten({ background: INK }).png().toBuffer());

// favicon.ico: 16, 32, 48 as PNG entries (supported by every current browser)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(tileSvg({ size: s }), s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
const ico = Buffer.concat([header, ...entries, ...images]);
fs.writeFileSync(path.join(ROOT, "public", "favicon.ico"), ico);
console.log(`${"favicon.ico".padEnd(28)} ${sizes.join(", ")} px  ${(ico.length / 1024).toFixed(1)} KB`);
