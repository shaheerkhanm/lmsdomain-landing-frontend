// ============================================================================
// Site icons from one source: node scripts/generate-icons.mjs
//
// Source: assets-src/brand-v2/logo-mark.svg (preferred) or logo-mark.png.
// Writes:
//   public/favicon.ico                 16, 32, 48 px (PNG entries)
//   public/icons/icon-192.png          192 px transparent (manifest "any")
//   public/icons/icon-512.png          512 px transparent (manifest "any")
//   public/icons/icon-maskable-512.png 512 px on white #FFFFFF with safe-zone padding
//   public/icons/apple-touch-icon.png  180 px on white #FFFFFF with safe-zone padding
//   public/icons/icon.svg              (only if SVG source is present)
// ============================================================================

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "public", "icons");
fs.mkdirSync(OUT, { recursive: true });

const WHITE = "#FFFFFF";

// Locate source file: SVG preferred, PNG fallback
const candidates = [
  path.join(ROOT, "assets-src", "brand-v2", "logo-mark.svg"),
  path.join(ROOT, "assets-src", "brand-v2", "logo-mark.png"),
  path.join(ROOT, "assets-src", "logo-mark.svg"),
  path.join(ROOT, "assets-src", "logo-mark.png"),
];

const sourcePath = candidates.find((p) => fs.existsSync(p));
if (!sourcePath) {
  console.error("No logo-mark source found in assets-src/brand-v2/!");
  process.exit(1);
}

const isSourceSvg = sourcePath.endsWith(".svg");
console.log(`Using source mark: ${path.relative(ROOT, sourcePath)}`);

const write = async (name, buffer) => {
  fs.writeFileSync(path.join(OUT, name), buffer);
  const meta = await sharp(buffer).metadata();
  console.log(
    `${("icons/" + name).padEnd(28)} ${meta.width}x${meta.height}  ${
      meta.hasAlpha ? "alpha" : "opaque"
    }  ${(buffer.length / 1024).toFixed(1)} KB`
  );
};

// 1. Transparent PNG icons for web manifest
const icon192 = await sharp(sourcePath)
  .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toBuffer();
await write("icon-192.png", icon192);

const icon512 = await sharp(sourcePath)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toBuffer();
await write("icon-512.png", icon512);

// 2. Maskable 512 icon: mark centered at 80% safe zone over white #FFFFFF
const maskableInnerSize = Math.round(512 * 0.8); // 410px
const maskableMark = await sharp(sourcePath)
  .resize(maskableInnerSize, maskableInnerSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

const iconMaskable512 = await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: WHITE,
  },
})
  .composite([{ input: maskableMark, gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toBuffer();
await write("icon-maskable-512.png", iconMaskable512);

// 3. Apple Touch Icon: 180px with safe padding on white #FFFFFF
const appleInnerSize = Math.round(180 * 0.9); // 162px
const appleMark = await sharp(sourcePath)
  .resize(appleInnerSize, appleInnerSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

const appleTouchIcon = await sharp({
  create: {
    width: 180,
    height: 180,
    channels: 4,
    background: WHITE,
  },
})
  .composite([{ input: appleMark, gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toBuffer();
await write("apple-touch-icon.png", appleTouchIcon);

// 4. SVG icon: copy if source is SVG, else remove old SVG if exists
const svgOut = path.join(OUT, "icon.svg");
if (isSourceSvg) {
  fs.copyFileSync(sourcePath, svgOut);
  console.log(`${"icons/icon.svg".padEnd(28)} vector  ${(fs.statSync(svgOut).size / 1024).toFixed(1)} KB`);
} else if (fs.existsSync(svgOut)) {
  fs.unlinkSync(svgOut);
}

// 5. favicon.ico: 16, 32, 48 px PNG entries
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((s) =>
    sharp(sourcePath)
      .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
  )
);

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
