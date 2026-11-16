// ============================================================================
// Site identity: favicon / app icons, brand logos, theme colour.
// Admin > Settings > Cms > "Site identity" (CMS entry "site-identity", data:
// iconImage, shareImage, themeColor, themeColorDark, logoLight, logoDark,
// logoMark, logoAlt, logoHeight).
// Falls back to built-in files in public/brand/ and public/icons/.
// Refresh tags: cms, site-identity, settings.
// ============================================================================

import { fetchCms } from "@/lib/api/content";
import { getBackendBaseUrl } from "@/lib/api/client";
import { type Brand, DEFAULT_BRAND } from "@/lib/brand-context";

export const DEFAULT_THEME_LIGHT = "#FFFFFF";
export const DEFAULT_THEME_DARK = "#161616";
export const DEFAULT_LOGO_LIGHT = "/brand/logo-wordmark.png";
export const DEFAULT_LOGO_DARK = "/brand/logo-wordmark-dark.png";
export const DEFAULT_LOGO_MARK = "/brand/logo-mark.png";
export const DEFAULT_LOGO_ALT = "LMS Domain";
export const DEFAULT_LOGO_HEIGHT = 26;
export const DEFAULT_WORDMARK_RATIO = 1534 / 250; // 6.136
export const DEFAULT_MARK_RATIO = 1; // 512 / 512 = 1.0

// Generated / static files in public/ (used when the admin has no icon)
export const STATIC_ICONS = {
  svg: "", // Old D icon.svg removed; empty until an SVG is provided
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
  themeColorDark?: string; // #RRGGBB
  logoLight?: string; // /uploads/... or https://...
  logoDark?: string; // /uploads/... or https://...
  logoMark?: string; // /uploads/... or https://...
  logoAlt?: string; // text alternative
  logoHeight?: number; // 18-40
}

const HEX = /^#[0-9a-f]{6}$/i;
const IMAGE = /^(\/uploads\/[\w.\-/]+|https:\/\/\S+)$/i;

export async function getSiteIdentity(): Promise<SiteIdentity> {
  const doc = await fetchCms("site-identity", ["cms", "settings", "site-identity"]);
  const data = ((doc as any)?.data || {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const num = (v: unknown) => {
    const n = typeof v === "number" ? v : typeof v === "string" ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) ? Math.min(40, Math.max(18, Math.round(n))) : undefined;
  };

  return {
    iconImage: IMAGE.test(str(data.iconImage)) ? str(data.iconImage) : undefined,
    shareImage: IMAGE.test(str(data.shareImage)) ? str(data.shareImage) : undefined,
    themeColor: HEX.test(str(data.themeColor)) ? str(data.themeColor) : undefined,
    themeColorDark: HEX.test(str(data.themeColorDark)) ? str(data.themeColorDark) : undefined,
    logoLight: IMAGE.test(str(data.logoLight)) ? str(data.logoLight) : undefined,
    logoDark: IMAGE.test(str(data.logoDark)) ? str(data.logoDark) : undefined,
    logoMark: IMAGE.test(str(data.logoMark)) ? str(data.logoMark) : undefined,
    logoAlt: str(data.logoAlt) || undefined,
    logoHeight: num(data.logoHeight),
  };
}

const isSvg = (url?: string) => !!url && /\.svg(\?|$)/i.test(url);

// Short cache key so browsers fetch a new file after the admin updates it
const version = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
};

const withVersion = (url: string) => {
  const v = version(url);
  return `${url}${url.includes("?") ? "&" : "?"}v=${v}`;
};

/** Icon URLs: generated files, or /site-icon/* (resized from the admin image) when one is set */
export function iconUrls(identity: SiteIdentity) {
  if (!identity.iconImage) {
    return {
      ...STATIC_ICONS,
      svg: "",
      hasSvg: false,
    };
  }
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

const ratioCache = new Map<string, number>();

async function readImageRatio(url: string, fallbackRatio: number): Promise<number> {
  if (!url || url.startsWith("/brand/")) return fallbackRatio;
  if (ratioCache.has(url)) return ratioCache.get(url)!;

  try {
    const sharp = (await import("sharp")).default;
    let buffer: Buffer | null = null;
    if (url.startsWith("/uploads/")) {
      const baseUrl = getBackendBaseUrl();
      const res = await fetch(`${baseUrl}${url}`, {
        next: { revalidate: 300, tags: ["site-identity"] },
      });
      if (res.ok) buffer = Buffer.from(await res.arrayBuffer());
    } else if (url.startsWith("https://")) {
      const res = await fetch(url, {
        next: { revalidate: 300, tags: ["site-identity"] },
      });
      if (res.ok) buffer = Buffer.from(await res.arrayBuffer());
    }

    if (buffer) {
      const meta = await sharp(buffer).metadata();
      if (meta.width && meta.height && meta.height > 0) {
        const r = meta.width / meta.height;
        ratioCache.set(url, r);
        return r;
      }
    }
  } catch {
    // Fail open: fallback to default ratio
  }

  ratioCache.set(url, fallbackRatio);
  return fallbackRatio;
}

/** Resolved Brand config: admin overrides or built-in defaults with ?v= cache key */
export async function getBrand(): Promise<Brand> {
  try {
    const identity = await getSiteIdentity();

    const logoLightUrl = identity.logoLight
      ? withVersion(identity.logoLight)
      : DEFAULT_LOGO_LIGHT;
    const logoDarkUrl = identity.logoDark
      ? withVersion(identity.logoDark)
      : DEFAULT_LOGO_DARK;
    const logoMarkUrl = identity.logoMark
      ? withVersion(identity.logoMark)
      : DEFAULT_LOGO_MARK;

    const wordmarkRatio = identity.logoLight
      ? await readImageRatio(identity.logoLight, DEFAULT_WORDMARK_RATIO)
      : identity.logoDark
      ? await readImageRatio(identity.logoDark, DEFAULT_WORDMARK_RATIO)
      : DEFAULT_WORDMARK_RATIO;

    const markRatio = identity.logoMark
      ? await readImageRatio(identity.logoMark, DEFAULT_MARK_RATIO)
      : DEFAULT_MARK_RATIO;

    return {
      logoLight: logoLightUrl,
      logoDark: logoDarkUrl,
      logoMark: logoMarkUrl,
      logoAlt: identity.logoAlt || DEFAULT_LOGO_ALT,
      logoHeight: identity.logoHeight ?? DEFAULT_LOGO_HEIGHT,
      wordmarkRatio,
      markRatio,
      themeColor: identity.themeColor || DEFAULT_THEME_LIGHT,
      themeColorDark: identity.themeColorDark || DEFAULT_THEME_DARK,
    };
  } catch {
    return DEFAULT_BRAND;
  }
}
