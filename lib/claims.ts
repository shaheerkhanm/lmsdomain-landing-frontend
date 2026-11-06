/**
 * lib/claims.ts
 *
 * Server-side claims guard that runs after CMS merge to filter out features
 * and promises that are not live today (e.g. mobile apps, DRM, WebRTC, PayPal,
 * WhatsApp, memberships, affiliates program, funnels, AI quizzes).
 *
 * NOTE: The future /roadmap page must NOT use this guard, as roadmap items
 * deliberately describe upcoming features.
 */

export const NOT_LIVE_REGEX =
  /android|\bios\b|iphone|ipad|app store|google play|play store|store listings?|mobile apps?|\bapps\b|\bDRM\b|fairplay|widevine|whatsapp|webrtc|memberships?|affiliates? program|\bfunnels?\b|paypal/i;

/**
 * Returns true if any of the provided values match unapproved / not-live terms.
 */
export function mentionsNotLive(...values: (string | null | undefined)[]): boolean {
  for (const v of values) {
    if (typeof v === "string" && NOT_LIVE_REGEX.test(v)) {
      return true;
    }
  }
  return false;
}

/**
 * Returns fallback if the value mentions any not-live claim.
 */
export function liveOr<T extends string | null | undefined>(value: T, fallback: T): T {
  if (typeof value === "string" && mentionsNotLive(value)) {
    return fallback;
  }
  return value ?? fallback;
}

/**
 * Filters a list, dropping items whose picked field(s) mention any not-live claim.
 */
export function keepLive<T>(
  items: T[] | undefined | null,
  pick: (item: T) => (string | null | undefined)[] | string | null | undefined
): T[] {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    const picked = pick(item);
    const strings = Array.isArray(picked) ? picked : [picked];
    return !mentionsNotLive(...strings);
  });
}
