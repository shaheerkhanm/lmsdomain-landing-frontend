// ============================================================================
// lib/currency.ts
// Currency & Country GeoIP / Timezone Detection Helper
// ============================================================================

export type PricingCurrency = "INR" | "USD";

export const INDIA_TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Calcutta",
] as const;

/**
 * Checks whether a given IANA time zone identifier represents India.
 * Handles modern "Asia/Kolkata" and legacy/Android "Asia/Calcutta".
 */
export function isIndiaTimeZone(timeZone?: string | null): boolean {
  if (!timeZone || typeof timeZone !== "string") return false;
  const tz = timeZone.trim();
  return tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
}

export interface HeaderGetter {
  get(name: string): string | null | undefined;
}

/**
 * Extracts country code hint from standard CDN / reverse proxy headers:
 * - cf-ipcountry (Cloudflare)
 * - x-vercel-ip-country (Vercel)
 * - x-country-code (Nginx / HAProxy GeoIP)
 *
 * Returns "INR" if country is India ("IN"), "USD" for any other country code,
 * or null if no country header was found in the request.
 */
export function getCountryHeaderCurrency(
  headers: HeaderGetter
): PricingCurrency | null {
  const country =
    headers.get("cf-ipcountry") ||
    headers.get("x-vercel-ip-country") ||
    headers.get("x-country-code");

  if (!country) return null;
  const normalized = country.trim().toUpperCase();
  if (normalized === "IN") return "INR";
  if (/^[A-Z]{2}$/.test(normalized)) return "USD";
  return null;
}

export interface CurrencyResolutionOptions {
  urlCurrency?: string | null;
  serverCountryCurrency?: PricingCurrency | null;
  clientTimeZone?: string | null;
}

/**
 * Resolves currency with the strict priority:
 * 1. ?currency= URL param
 * 2. country header (cf-ipcountry, x-vercel-ip-country, x-country-code)
 * 3. client timezone (Asia/Kolkata or Asia/Calcutta -> INR)
 * 4. fallback: USD
 */
export function resolveCurrency({
  urlCurrency,
  serverCountryCurrency,
  clientTimeZone,
}: CurrencyResolutionOptions): PricingCurrency {
  // 1. ?currency= URL parameter
  if (urlCurrency) {
    const norm = urlCurrency.trim().toUpperCase();
    if (norm === "INR" || norm === "USD") return norm;
  }

  // 2. Country header from proxy / CDN
  if (serverCountryCurrency === "INR" || serverCountryCurrency === "USD") {
    return serverCountryCurrency;
  }

  // 3. Client timezone
  if (clientTimeZone && isIndiaTimeZone(clientTimeZone)) {
    return "INR";
  }

  // 4. Default fallback for visitors outside India
  return "USD";
}
