import type { Metadata } from "next";
import { getCustomPlanPage, fetchSeo } from "@/lib/api/content";
import { fullTitle, getMetadataBase, applySeo, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { BrandPreviewProvider, CustomPlanEnquiryForm } from "@/components/marketing/custom-plan";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { CustomCta } from "@/components/sections/CustomV5/CustomV5";
import {
  BoldHero,
  BoldNumbers,
  BoldAudiences,
  BoldDeliverables,
  BoldMigration,
  BoldSteps,
  BoldCompare,
  BoldSupport,
} from "@/components/sections/CustomV5/CustomBold";
import { BrandCanvas } from "@/components/sections/CustomV5/BrandCanvas";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("custom-lms");
  if (hiddenMeta) return hiddenMeta;
  return applySeo(await baseMetadata(), await fetchSeo("custom-lms").catch(() => null), {
    page: "custom-lms",
  });
}

const DEFAULT_TITLE = "Custom LMS Development & White-Label Setup | LMS Domain";
const DEFAULT_DESCRIPTION =
  "A custom LMS set up for you: your branded academy on your own domain, migration from your old platform, staff training, custom features and ongoing support.";

async function baseMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("custom-lms").catch(() => null),
    getCustomPlanPage().catch(() => null),
  ]);

  const rawTitle = (seo?.metatitle && seo.metatitle.length >= 45)
    ? seo.metatitle
    : DEFAULT_TITLE;
  const title = fullTitle(rawTitle);

  const description = (seo?.metadescription && seo.metadescription.length >= 140)
    ? seo.metadescription
    : DEFAULT_DESCRIPTION;

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: [
      "Custom LMS",
      "White label LMS",
      "Branded LMS",
      "Enterprise LMS",
    ],
    alternates: {
      canonical: "/custom-lms",
    },
    openGraph: {
      title,
      description,
      url: "/custom-lms",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CustomPlanPage() {
  await guardPage("custom-lms");
  const pageData = await getCustomPlanPage();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "LMS Domain Custom Plan",
    description: pageData.seo?.description || DEFAULT_DESCRIPTION,
    provider: {
      "@type": "Organization",
      name: "LMS Domain",
      url: getSiteUrl() || PRODUCTION_ORIGIN,
    },
    serviceType: "Custom Learning Management System",
    areaServed: "Worldwide",
  };

  const defaultColor = pageData.hero.brandPreview?.colours?.[0] || "#7B5CF5";

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Custom LMS", path: "/custom-lms" },
  ];

  return (
    <BrandPreviewProvider defaultColor={defaultColor}>
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
        <BoldHero hero={pageData.hero} />
        <BoldNumbers />
        <BrandCanvas />
        {pageData.audiences && <BoldAudiences audiences={pageData.audiences} />}
        {pageData.deliverables && <BoldDeliverables d={pageData.deliverables} />}
        <BoldMigration />
        {pageData.timeline && <BoldSteps t={pageData.timeline} />}
        {pageData.comparison && <BoldCompare c={pageData.comparison} />}
        {(pageData.services || pageData.pricingNote) && <BoldSupport s={pageData.services} p={pageData.pricingNote} />}
        <CustomPlanEnquiryForm formConfig={pageData.form} />
        {pageData.faq && pageData.faq.items?.length > 0 && (
          <FAQ id="custom-faq" minimal eyebrow="FAQs" title={pageData.faq.title || "Frequently asked questions"} subtitle="About the Custom Plan, setup and support." items={pageData.faq.items} />
        )}
        <div className="pt-[clamp(72px,9vw,120px)]" />
        {pageData.cta && <CustomCta cta={pageData.cta} />}
        <ScrollReveal />
      </div>
    </BrandPreviewProvider>
  );
}
