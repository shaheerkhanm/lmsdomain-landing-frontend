import { HomePage } from "@/components/modules/HomePage";
import { fetchSeo, getSiteSettings } from "@/lib/api/content";
import { Metadata } from "next";
import { SITE_NAME, getMetadataBase, applySeo, fullTitle, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { getSiteIdentity } from "@/lib/siteIdentity";

export async function generateMetadata(): Promise<Metadata> {
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("home").catch(() => null), { page: "home" });
}

async function baseMetadata(): Promise<Metadata> {
  const seo = await fetchSeo("home").catch(() => null);

  const rawTitle = seo?.metatitle || "Modern AI-Powered Learning Platform";
  const title = fullTitle(rawTitle);
  const description =
    seo?.metadescription ||
    "Scale your academy with courses, live classes, assessments, payments, and Domie AI tutor in one flexible learning platform.";

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
  const [settings, identity] = await Promise.all([
    getSiteSettings().catch(() => null),
    getSiteIdentity().catch(() => ({} as import("@/lib/siteIdentity").SiteIdentity)),
  ]);

  const siteOrigin = getSiteUrl() || PRODUCTION_ORIGIN;
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
    if (url) sameAs.push(url);
  }

  const logoUrl = identity?.iconImage
    ? (identity.iconImage.startsWith("http") ? identity.iconImage : `${siteOrigin}${identity.iconImage}`)
    : `${siteOrigin}/site-icon/apple-touch-icon.png`;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteOrigin,
    logo: logoUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePage />
    </>
  );
}
