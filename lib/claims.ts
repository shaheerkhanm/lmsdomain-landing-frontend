/**
 * lib/claims.ts
 *
 * Server-side claims guard that runs after CMS merge to filter out features
 * and promises that are not live today (e.g. mobile apps, DRM, WebRTC, PayPal,
 * WhatsApp, memberships, affiliates program, funnels, AI quizzes).
 *
 * NOTE: The /roadmap page is permitted to describe upcoming features ONLY
 * for its own roadmap items (labelled "Coming soon"). All other content on
 * that page (hero, FAQ, band) still passes through this claims guard.
 */

export const NOT_LIVE_REGEX =
  /android|\bios\b|iphone|ipad|app store|google play|play store|store listings?|mobile apps?|\bapps\b|\bDRM\b|fairplay|widevine|whatsapp|webrtc|memberships?|affiliates? program|\bfunnels?\b|paypal|ai quiz|quiz generat|assessment generat|verifi(?:ed|able).*certif|certif.*verifi|verifiable credential|verifiable digital certificat/i;

/**
 * Whitelisted item IDs allowed to reference roadmap features (e.g. mobile-app FAQ linking to /roadmap)
 */
export const WHITELISTED_CLAIM_IDS = new Set([
  "mobile-app",
  "faq-mobile-app",
  "contact-whatsapp",
  "site-contact",
]);

export function isWhitelistedClaim(id?: string | null): boolean {
  return Boolean(id && WHITELISTED_CLAIM_IDS.has(id));
}

/**
 * Field-level exception for contact details: "WhatsApp" as a communication
 * channel is permitted on contact cards and footer without whitelisting it globally.
 */
export function liveContactOr<T extends string | null | undefined>(
  field: string,
  value: T,
  fallback: T
): T {
  if (
    field === "whatsappNumber" ||
    field === "whatsapp" ||
    field === "whatsappLabel" ||
    field === "wa"
  ) {
    return value ?? fallback;
  }
  return liveOr(value, fallback);
}

/**
 * Explicit exception for roadmap items only: passes items through without
 * filtering prohibited not-live claims.
 */
export function keepRoadmapItems<T>(items: T[] | undefined | null): T[] {
  return Array.isArray(items) ? items : [];
}

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
 * Filters a list, dropping items whose picked field(s) mention any not-live claim,
 * unless the item is whitelisted by id.
 */
export function keepLive<T>(
  items: T[] | undefined | null,
  pick: (item: T) => (string | null | undefined)[] | string | null | undefined
): T[] {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    const raw = item as unknown as { id?: string; _id?: string } | null | undefined;
    if (raw && isWhitelistedClaim(raw.id || raw._id)) {
      return true;
    }
    const picked = pick(item);
    const strings = Array.isArray(picked) ? picked : [picked];
    return !mentionsNotLive(...strings);
  });
}
