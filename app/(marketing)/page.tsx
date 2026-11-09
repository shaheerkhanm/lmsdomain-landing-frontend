import { HomePage } from "@/components/modules/HomePage";
import { fetchSeo, getSiteSettings, getPricingPage } from "@/lib/api/content";
import { Metadata } from "next";
import { SITE_NAME, getMetadataBase, applySeo, fullTitle, getSiteUrl, PRODUCTION_ORIGIN, isProductionSite } from "@/lib/site";
import { getSiteIdentity } from "@/lib/siteIdentity";

import { entity } from "@/content/entity";
import { getWebSiteJsonLd, getSoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("home").catch(() => null), { page: "home" });
}

async function baseMetadata(): Promise<Metadata> {
  const seo = await fetchSeo("home").catch(() => null);

  const title = seo?.metatitle
    ? fullTitle(seo.metatitle)
    : "LMS for Academies & Coaching Institutes | LMS Domain";
  const description =
    seo?.metadescription || entity.oneLine;

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: seo?.metakeyword || [
      "LMS Domain",
      "AI LMS",
      "Online Academy Platform",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function getSafeSocialUrl(href?: string, key?: string): string | null {
  if (!href) return null;
  const trimmed = href.trim();
  if (!trimmed || trimmed === "#") return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const clean = trimmed.replace(/^@/, "");
  switch (key) {
    case "twitter":
      return `https://x.com/${clean}`;
    case "instagram":
      return `https://instagram.com/${clean}`;
    case "fb":
      return `https://facebook.com/${clean}`;
    case "youtubelink":
      return `https://youtube.com/@${clean}`;
    case "linkedin":
      return `https://linkedin.com/company/${clean}`;
    default:
      return `https://${clean}`;
  }
}

export default async function Home() {
  const [settings, identity, pricingPage] = await Promise.all([
    getSiteSettings().catch(() => null),
    getSiteIdentity().catch(() => ({} as import("@/lib/siteIdentity").SiteIdentity)),
    getPricingPage().catch(() => null),
  ]);

  const siteOrigin = isProductionSite() ? PRODUCTION_ORIGIN : (getSiteUrl() || PRODUCTION_ORIGIN);
  const address = settings?.address as Record<string, string | undefined> | undefined;

  const sameAs: string[] = [];
  const socialEntries: Array<[string | undefined, string]> = [
    [address?.twitter, "twitter"],
    [address?.linkedin, "linkedin"],
    [address?.fb, "fb"],
    [address?.instagram, "instagram"],
    [address?.youtubelink, "youtubelink"],
  ];
  for (const [val, key] of socialEntries) {
    const url = getSafeSocialUrl(val, key);
    if (url) {
      try {
        const parsed = new URL(url);
        // drop any sameAs URL whose host has no dot (e.g. https://facebook/lmsdomain)
        if (parsed.hostname && parsed.hostname.includes(".")) {
          sameAs.push(url);
        }
      } catch {
        // invalid URL
      }
    }
  }

  const logoUrl = identity?.iconImage
    ? (identity.iconImage.startsWith("http") ? identity.iconImage : `${siteOrigin}${identity.iconImage}`)
    : `${siteOrigin}/site-icon/apple-touch-icon.png`;

  const websiteJsonLd = getWebSiteJsonLd();
  const softwareAppJsonLd = getSoftwareApplicationJsonLd(pricingPage?.pricingV2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <HomePage />
    </>
  );
}
