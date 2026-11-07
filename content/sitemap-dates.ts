/**
 * Static lastModified dates for sitemap routes.
 * Keyed by route. Today's date for revamped pages, git commit date for the rest.
 * Never use new Date() at request time.
 */
export const SITEMAP_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-11-06",
  "/platform": "2026-11-06",
  "/platform/teach": "2026-11-06",
  "/platform/assess": "2026-11-06",
  "/platform/manage": "2026-11-06",
  "/platform/sell": "2026-11-06",
  "/platform/brand": "2026-11-06",
  "/platform/ai": "2026-11-06",
  "/platform/security": "2026-11-06",
  "/solutions/language-test-prep-academies": "2026-11-06",
  "/solutions/training-companies": "2026-11-06",
  "/solutions/coaching-institutes": "2026-11-07",
  "/solutions/solo-educators": "2026-11-07",
  "/customers": "2026-11-06",
  "/roadmap": "2026-11-06",
  "/pricing": "2026-11-05",
  "/custom-lms": "2026-11-05",
  "/about": "2026-11-03",
  "/contact": "2026-11-05",
  "/demo": "2026-11-06",
  "/privacy-policy": "2025-11-28",
  "/terms": "2025-11-28",
  "/refund-policy": "2025-11-28",
};
