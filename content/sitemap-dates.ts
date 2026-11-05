/**
 * Static lastModified dates for sitemap routes.
 * Keyed by route. Today's date for revamped pages, git commit date for the rest.
 * Never use new Date() at request time.
 */
export const SITEMAP_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-11-05",
  "/features": "2026-11-04",
  "/ai": "2026-11-03",
  "/pricing": "2026-11-05",
  "/custom-lms": "2026-11-05",
  "/about": "2026-11-03",
  "/contact": "2026-11-05",
  "/privacy-policy": "2025-11-28",
  "/terms": "2025-11-28",
  "/refund-policy": "2025-11-28",
  "/dpa": "2025-11-28",
};
