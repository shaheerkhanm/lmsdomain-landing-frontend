import { MetadataRoute } from "next";
import { getSiteUrl, isIndexableSite } from "@/lib/site";

// Read SITE_URL per request so one image serves staging and production correctly.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  // Staging, local, or SITE_URL unset / not production: never indexed.
  if (!siteUrl || !isIndexableSite() || siteUrl.includes("staging")) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/signup", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
