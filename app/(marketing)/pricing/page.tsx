import type { Metadata } from "next";
import { Suspense } from "react";
import { getPricingPage, fetchSeo } from "@/lib/api/content";
import { PricingView } from "@/components/marketing";
import { fullTitle, getMetadataBase, getSiteUrl, applySeo } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";

import { DEFAULT_PRICING_HERO } from "@/content/pricing/page";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("pricing");
  if (hiddenMeta) return hiddenMeta;
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("pricing").catch(() => null), { page: "pricing" });
}

async function baseMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("pricing").catch(() => null),
    getPricingPage().catch(() => null),
  ]);

  const isSample = Boolean(pageData?.isSample || process.env.CMS_USE_FIXTURES === "true");

  const title = seo?.metatitle ? fullTitle(seo.metatitle) : DEFAULT_PRICING_HERO.metaTitle;

  const description =
    seo?.metadescription ||
    DEFAULT_PRICING_HERO.metaDescription;

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: seo?.metakeyword || [
      "LMS Pricing",
      "Academy Plans",
      "Online Course Pricing",
      "Training Institute Plans",
    ],
    alternates: {
      canonical: "/pricing",
    },
    openGraph: {
      title,
      description,
      url: "/pricing",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(isSample
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export default async function PricingPage() {
  await guardPage("pricing");
  const data = await getPricingPage();
  const siteUrl = getSiteUrl();

  // Generate JSON-LD Product & Offer schemas for plans with numeric prices (production only)
  const numericPlans = data.plans.filter(
    (plan) => !plan.isCustom && (plan.prices.monthly !== null || plan.prices.yearly !== null)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LMS Domain",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl || "https://lmsdomain.com"}/pricing`,
    description: data.hero.subtitle,
    ...(numericPlans.length > 0
      ? {
          offers: numericPlans.map((plan) => ({
            "@type": "Offer",
            name: plan.name,
            description: plan.tagline || plan.name,
            price: plan.prices.monthly ?? plan.prices.yearly,
            priceCurrency: plan.currency.code,
            availability: "https://schema.org/InStock",
            url: `${siteUrl || "https://lmsdomain.com"}/pricing`,
          })),
        }
      : {}),
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <PricingView data={data} />
      </Suspense>
    </>
  );
}
