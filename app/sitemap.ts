import { MetadataRoute } from "next";
import { getLegalPages, getLegalPage } from "@/lib/api/content";
import { getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { getPageVisibility, isPathVisibleWithMap } from "@/lib/pages";
import { SITEMAP_LAST_MODIFIED } from "@/content/sitemap-dates";

// Read SITE_URL per request so one image serves staging and production correctly.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl() || PRODUCTION_ORIGIN;

  let legalSlugs = ["privacy-policy", "terms", "refund-policy", "dpa"];
  try {
    const fetched = await getLegalPages();
    if (fetched && fetched.length > 0) {
      legalSlugs = fetched;
    }
  } catch {
    // Fallback to static legal slugs
  }

  const staticMarketingRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/"] || "2026-11-05"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/features"] || "2026-11-04"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/ai"] || "2026-11-03"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/pricing"] || "2026-11-05"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/custom-lms`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/custom-lms"] || "2026-11-05"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/about"] || "2026-11-03"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/contact"] || "2026-11-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const legalRoutes: MetadataRoute.Sitemap = await Promise.all(
    legalSlugs.map(async (slug) => {
      const page = await getLegalPage(slug).catch(() => null);
      const dateStr =
        page?.lastUpdated ||
        SITEMAP_LAST_MODIFIED[`/${slug}`] ||
        "2025-11-28";
      return {
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(dateStr),
        changeFrequency: "monthly",
        priority: 0.5,
      };
    })
  );

  // Marketing routes only: explicitly excludes /login, /signup and /forgot-password per spec
  const visibility = await getPageVisibility();
  return [...staticMarketingRoutes, ...legalRoutes].filter((route) =>
    isPathVisibleWithMap(route.url, visibility)
  );
}

