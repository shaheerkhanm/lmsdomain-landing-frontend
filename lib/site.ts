// ============================================================================
// Site URL and page titles (server-side only)
// SITE_URL is read from server env: https://lmsdomain.com in production,
// https://staging.lmsdomain.online on staging. Unset locally.
// ============================================================================

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
