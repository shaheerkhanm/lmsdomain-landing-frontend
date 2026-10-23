// ============================================================================
// Site URL and page titles (server-side only)
// SITE_URL is read from server env: https://lmsdomain.com in production,
// https://staging.lmsdomain.online on staging. Unset locally.
// ============================================================================

import { getSiteIdentity } from "@/lib/siteIdentity";
import { shareImageUrl } from "@/lib/og";

export const SITE_NAME = "LMS Domain";

// Only this origin may be indexed; every other SITE_URL (or none) is blocked.
const INDEXABLE_ORIGIN = "https://lmsdomain.com";

export function getSiteUrl(): string | undefined {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw).origin;
  } catch {
    return undefined;
  }
}

export function isIndexableSite(): boolean {
  return getSiteUrl() === INDEXABLE_ORIGIN;
}

export function getMetadataBase(): URL | undefined {
  const siteUrl = getSiteUrl();
  return siteUrl ? new URL(siteUrl) : undefined;
}

// "Privacy Policy" → "Privacy Policy | LMS Domain" (never doubled)
export function fullTitle(title: string): string {
  const base = title.replace(/\s*\|\s*LMS Domain$/i, "").trim();
  return `${base} | ${SITE_NAME}`;
}

// Apply a page's SEO entry (Admin > SEO): share image and noindex. Title and
// description are handled by each page (they already read the entry).
// Share image: the SEO entry's own, else the default from Site identity, else the
// generated /og/<page> image with the page title (lib/og.ts).
export async function applySeo<T extends Record<string, any>>(
  metadata: T,
  seo?: { ogImage?: string; noindex?: boolean; metatitle?: string; metadescription?: string } | null,
  options: { overrideText?: boolean; page?: string } = {}
): Promise<T> {
  const out: Record<string, any> = { ...metadata };
  if (options.overrideText && seo?.metatitle) out.title = fullTitle(seo.metatitle);
  if (options.overrideText && seo?.metadescription) out.description = seo.metadescription;
  const title = typeof out.title === "string" ? out.title : SITE_NAME;
  const image = seo?.ogImage || (await getSiteIdentity()).shareImage || shareImageUrl(options.page || "home", title);
  out.openGraph = { ...(out.openGraph || {}), images: [image] };
  out.twitter = { ...(out.twitter || {}), card: "summary_large_image", images: [image] };
  if (seo?.noindex) out.robots = { index: false, follow: false };
  return out as T;
}
