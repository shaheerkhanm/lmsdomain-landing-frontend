import { MetadataRoute } from "next";
import { getLegalPages, getLegalPage } from "@/lib/api/content";
import { getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { getPageVisibility, isPathVisibleWithMap } from "@/lib/pages";
import { SITEMAP_LAST_MODIFIED } from "@/content/sitemap-dates";

// Read SITE_URL per request so one image serves staging and production correctly.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl() || PRODUCTION_ORIGIN;

  let legalSlugs = ["privacy-policy", "terms", "refund-policy"];
  try {
    const fetched = await getLegalPages();
    if (fetched && fetched.length > 0) {
      legalSlugs = fetched.filter((s) => s !== "dpa");
    }
  } catch {
    // Fallback to static legal slugs
  }

  const staticMarketingRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/platform`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/platform/teach`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform/teach"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform/assess`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform/assess"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform/manage`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform/manage"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform/sell`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform/sell"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform/brand`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform/brand"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform/ai`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform/ai"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/platform/security`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/platform/security"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/language-test-prep-academies`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/solutions/language-test-prep-academies"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/training-companies`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/solutions/training-companies"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/coaching-institutes`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/solutions/coaching-institutes"] || "2026-11-07"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/solo-educators`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/solutions/solo-educators"] || "2026-11-07"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/customers`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/customers"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/roadmap"] || "2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.7,
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
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date(SITEMAP_LAST_MODIFIED["/demo"] || "2026-11-06"),
      changeFrequency: "weekly",
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

  // Excludes /login, /signup, /forgot-password, and /resources/blog (until posts exist)
  const visibility = await getPageVisibility();
  return [...staticMarketingRoutes, ...legalRoutes].filter((route) =>
    isPathVisibleWithMap(route.url, visibility)
  );
}
