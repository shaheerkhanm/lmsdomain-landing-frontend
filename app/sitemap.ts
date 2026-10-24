import { MetadataRoute } from "next";
import { getLegalPages } from "@/lib/api/content";
import { getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";

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
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const legalRoutes: MetadataRoute.Sitemap = legalSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date("2025-11-28"),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Marketing routes only: explicitly excludes /login and /signup per spec
  return [...staticMarketingRoutes, ...legalRoutes];
}

