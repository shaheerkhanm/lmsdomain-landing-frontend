// ============================================================================
// Default share image (Open Graph / Twitter) per page: /og/<page>?t=<title>&s=<sig>
// The title is signed (HMAC) so the route only draws titles this site produced.
// Secret: OG_IMAGE_SECRET, else CMS_REVALIDATE_SECRET; without one the image
// shows the page name instead of the title.
// ============================================================================

import { createHmac, timingSafeEqual } from "node:crypto";

export const OG_PAGES: Record<string, string> = {
  home: "LMS Domain",
  features: "Features",
  ai: "Domie AI",
  pricing: "Pricing",
  about: "About",
  contact: "Contact",
  login: "Log in",
  signup: "Sign up",
  "privacy-policy": "Privacy Policy",
  terms: "Terms of Service",
  "refund-policy": "Refund Policy",
  dpa: "Data Processing Agreement",
};

const secret = () => process.env.OG_IMAGE_SECRET || process.env.CMS_REVALIDATE_SECRET || "";

const sign = (page: string, title: string) => createHmac("sha256", secret()).update(`${page}\n${title}`).digest("base64url").slice(0, 22);

// "Pricing | LMS Domain" -> "Pricing"
export const ogTitle = (title: string) => title.replace(/\s*\|\s*LMS Domain\s*$/i, "").trim().slice(0, 90);

export function shareImageUrl(page: string, title?: string): string {
  const key = OG_PAGES[page] ? page : "home";
  const text = title ? ogTitle(title) : "";
  if (!text || !secret()) return `/og/${key}`;
  return `/og/${key}?t=${encodeURIComponent(text)}&s=${sign(key, text)}`;
}

/** The title to draw: the signed one, else the page name */
export function verifiedTitle(page: string, title: string | null, signature: string | null): string {
  const fallback = OG_PAGES[page] || OG_PAGES.home;
  if (!title || !signature || !secret()) return fallback;
  const expected = Buffer.from(sign(page, title));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given) ? title : fallback;
}
