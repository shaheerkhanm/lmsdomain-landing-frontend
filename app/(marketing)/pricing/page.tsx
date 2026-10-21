import type { Metadata } from "next";
import { Suspense } from "react";
import { getPricingPage, fetchSeo } from "@/lib/api/content";
import { PricingView } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("pricing").catch(() => null),
    getPricingPage().catch(() => null),
  ]);

  const isSample = Boolean(pageData?.isSample || process.env.CMS_USE_FIXTURES === "true");

  const title =
    seo?.metatitle ||
    (pageData?.hero?.title ? `${pageData.hero.title} | LMS Domain` : "Pricing | LMS Domain");

  const description =
    seo?.metadescription ||
    pageData?.hero?.subtitle ||
    "Transparent, scalable plans for every stage. Choose the right tier to launch and scale your academy.";

  return {
    title,
    description,
    keywords: seo?.metakeyword || [
      "LMS Pricing",
      "Academy Plans",
      "Online Course Pricing",
      "Training Institute Plans",
    ],
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
  const data = await getPricingPage();

  // Generate JSON-LD Product & Offer schemas for plans with numeric prices (production only)
  const numericPlans = data.plans.filter(
    (plan) => plan.prices.monthly !== null || plan.prices.yearly !== null
  );

  const jsonLd =
    !data.isSample && numericPlans.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: "LMS Domain Academy Platform",
          description: data.hero.subtitle,
          offers: numericPlans.map((plan) => ({
            "@type": "Offer",
            name: plan.name,
            description: plan.tagline || plan.name,
            price: plan.prices.monthly || 0,
            priceCurrency: data.currency.code || "USD",
            availability: "https://schema.org/InStock",
            url: "https://lmsdomain.online/pricing",
          })),
        }
      : null;

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
