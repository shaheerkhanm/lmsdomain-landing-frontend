// ============================================================================
// Site identity: favicon / app icons, default share image, theme colour.
// Admin > Settings > Cms > "Site identity" (CMS entry "site-identity", data:
// iconImage, shareImage, themeColor). Each falls back to the generated files
// (scripts/generate-icons.mjs) and defaults below. Refresh tag: cms.
// ============================================================================

import { fetchCms } from "@/lib/api/content";

export const DEFAULT_THEME_LIGHT = "#FFFFFF";
export const DEFAULT_THEME_DARK = "#161616";

// Generated files in public/ (used when the admin has no icon)
export const STATIC_ICONS = {
  svg: "/icons/icon.svg",
  png192: "/icons/icon-192.png",
  png512: "/icons/icon-512.png",
  maskable512: "/icons/icon-maskable-512.png",
  apple: "/icons/apple-touch-icon.png",
};

export const ICON_VARIANTS = {
  "icon.svg": { size: 0, kind: "svg" },
  "icon-192.png": { size: 192, kind: "any" },
  "icon-512.png": { size: 512, kind: "any" },
  "icon-maskable-512.png": { size: 512, kind: "maskable" },
  "apple-touch-icon.png": { size: 180, kind: "apple" },
} as const;
export type IconVariant = keyof typeof ICON_VARIANTS;

export interface SiteIdentity {
  iconImage?: string; // /uploads/... or https://...
  shareImage?: string;
  themeColor?: string; // #RRGGBB
}

const HEX = /^#[0-9a-f]{6}$/i;
const IMAGE = /^(\/uploads\/[\w.\-/]+|https:\/\/\S+)$/i;

export async function getSiteIdentity(): Promise<SiteIdentity> {
  const doc = await fetchCms("site-identity", ["cms", "settings", "site-identity"]);
  const data = ((doc as any)?.data || {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    iconImage: IMAGE.test(str(data.iconImage)) ? str(data.iconImage) : undefined,
    shareImage: IMAGE.test(str(data.shareImage)) ? str(data.shareImage) : undefined,
    themeColor: HEX.test(str(data.themeColor)) ? str(data.themeColor) : undefined,
  };
}

const isSvg = (url?: string) => !!url && /\.svg(\?|$)/i.test(url);
// Short cache key so browsers fetch a new icon after the admin changes it
const version = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
};

/** Icon URLs: generated files, or /site-icon/* (resized from the admin image) when one is set */
export function iconUrls(identity: SiteIdentity) {
  if (!identity.iconImage) return { ...STATIC_ICONS, hasSvg: true };
  const v = `?v=${version(identity.iconImage)}`;
  return {
    svg: isSvg(identity.iconImage) ? `/site-icon/icon.svg${v}` : "",
    png192: `/site-icon/icon-192.png${v}`,
    png512: `/site-icon/icon-512.png${v}`,
    maskable512: `/site-icon/icon-maskable-512.png${v}`,
    apple: `/site-icon/apple-touch-icon.png${v}`,
    hasSvg: isSvg(identity.iconImage),
  };
}
