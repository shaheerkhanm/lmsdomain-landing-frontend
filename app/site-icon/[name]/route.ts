// ============================================================================
// /site-icon/<variant>: app icons made from the admin's icon image
// (Settings > Cms > Site identity). Without one, serves the generated file.
// ============================================================================

import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getBackendBaseUrl } from "@/lib/api/client";
import { getSiteIdentity, ICON_VARIANTS, STATIC_ICONS, DEFAULT_THEME_DARK, type IconVariant } from "@/lib/siteIdentity";

export const runtime = "nodejs";
export const revalidate = 300;

const STATIC_FOR: Record<IconVariant, string> = {
  "icon.svg": STATIC_ICONS.svg,
  "icon-192.png": STATIC_ICONS.png192,
  "icon-512.png": STATIC_ICONS.png512,
  "icon-maskable-512.png": STATIC_ICONS.maskable512,
  "apple-touch-icon.png": STATIC_ICONS.apple,
};

// The generated file from public/ (next to the server in the standalone build)
const generated = async (variant: IconVariant) =>
  new NextResponse(new Uint8Array(await readFile(path.join(process.cwd(), "public", STATIC_FOR[variant]))), {
    headers: { "Content-Type": variant.endsWith(".svg") ? "image/svg+xml" : "image/png", "Cache-Control": "public, max-age=3600" },
  });

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  if (!(name in ICON_VARIANTS)) return new NextResponse("Not found", { status: 404 });
  const variant = name as IconVariant;
  const { iconImage, themeColor } = await getSiteIdentity();
  if (!iconImage) return generated(variant);

  try {
    const source = iconImage.startsWith("/") ? `${getBackendBaseUrl()}${iconImage}` : iconImage;
    const res = await fetch(source, { next: { revalidate: 300, tags: ["cms", "site-identity"] } });
    if (!res.ok) throw new Error(`source ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    const type = res.headers.get("content-type") || "";
    const headers = { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" };

    const { size, kind } = ICON_VARIANTS[variant];
    if (kind === "svg") {
      if (!type.includes("svg")) return generated(variant);
      // An SVG can carry scripts: never let it run on the site's origin
      return new NextResponse(new Uint8Array(input), {
        headers: { ...headers, "Content-Type": "image/svg+xml", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'", "X-Content-Type-Options": "nosniff" },
      });
    }

    const raster = sharp(input, { density: 384 });
    let png: Buffer;
    if (kind === "any") {
      png = await raster.resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    } else {
      // Solid background; maskable keeps the image inside the middle 80 % (safe zone)
      const inner = Math.round(size * (kind === "maskable" ? 0.7 : 0.86));
      const art = await raster.resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
      png = await sharp({ create: { width: size, height: size, channels: 3, background: themeColor || DEFAULT_THEME_DARK } })
        .composite([{ input: art, gravity: "center" }])
        .removeAlpha() // iOS and maskable icons must be opaque
        .png()
        .toBuffer();
    }
    return new NextResponse(new Uint8Array(png), { headers: { ...headers, "Content-Type": "image/png" } });
  } catch (error) {
    console.warn("[site-icon] admin icon unavailable, using the generated one:", (error as Error).message);
    return generated(variant);
  }
}
