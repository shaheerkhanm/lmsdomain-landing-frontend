import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import { getPricingPage, fetchSeo } from "@/lib/api/content";
import { PricingView } from "@/components/marketing";
import { fullTitle, getMetadataBase, getSiteUrl, applySeo } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";
import { getSoftwareApplicationJsonLd } from "@/components/seo/JsonLd";
import { getCountryHeaderCurrency, type PricingCurrency } from "@/lib/currency";

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

  const title = (seo?.metatitle && !seo.metatitle.toLowerCase().includes("pricing plans") && seo.metatitle.length >= 40)
    ? fullTitle(seo.metatitle)
    : DEFAULT_PRICING_HERO.metaTitle;

  const description =
    (seo?.metadescription && seo.metadescription.length >= 100)
      ? seo.metadescription
      : DEFAULT_PRICING_HERO.metaDescription;

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

export default async function PricingPage({
  searchParams,
}: {
  searchParams?: Promise<{ mode?: string; currency?: string; [key: string]: string | undefined }>;
}) {
  await guardPage("pricing");
  const data = await getPricingPage();
  const sp = searchParams ? await searchParams : {};
  if (sp?.mode === "percent" && data.pricingV2) {
    data.pricingV2 = { ...data.pricingV2, annualMode: "percent" };
  } else if (sp?.mode === "monthsFree" && data.pricingV2) {
    data.pricingV2 = { ...data.pricingV2, annualMode: "monthsFree" };
  }

  // Inspect proxy/CDN country headers (cf-ipcountry, x-vercel-ip-country, x-country-code)
  const headerList = await headers();
  const serverCountryCurrency = getCountryHeaderCurrency(headerList);

  let initialCurrency: PricingCurrency | null = null;
  if (sp?.currency) {
    const norm = sp.currency.trim().toUpperCase();
    if (norm === "INR" || norm === "USD") {
      initialCurrency = norm as PricingCurrency;
    }
  } else if (serverCountryCurrency) {
    initialCurrency = serverCountryCurrency;
  }

  const siteUrl = getSiteUrl();

  const jsonLd = getSoftwareApplicationJsonLd(data.pricingV2, "/pricing");

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <PricingView
          data={data}
          initialCurrency={initialCurrency}
          serverCountryCurrency={serverCountryCurrency}
        />
      </Suspense>
    </>
  );
}
