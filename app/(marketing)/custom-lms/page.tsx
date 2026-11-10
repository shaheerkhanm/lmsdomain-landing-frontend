import type { Metadata } from "next";
import { getCustomPlanPage, fetchSeo } from "@/lib/api/content";
import { fullTitle, getMetadataBase, applySeo, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { liveOr } from "@/lib/claims";
import {
  BrandPreviewProvider,
  CustomPlanHero,
  CustomPlanAudiences,
  CustomPlanDeliverables,
  CustomPlanTimeline,
  CustomPlanComparison,
  CustomPlanServices,
  CustomPlanPricingNote,
  CustomPlanEnquiryForm,
  CustomPlanFaq,
  CustomPlanCta,
} from "@/components/marketing/custom-plan";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("custom-lms");
  if (hiddenMeta) return hiddenMeta;
  return applySeo(await baseMetadata(), await fetchSeo("custom-lms").catch(() => null), {
    page: "custom-lms",
  });
}

const DEFAULT_TITLE = "Custom LMS Development & White-Label Setup | LMS Domain";
const DEFAULT_DESCRIPTION =
  "Get your custom branded learning platform built and set up for you. Setup, content migration, staff training, and dedicated ongoing support included.";

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

      <div className="min-h-screen bg-white font-urbanist">
        {/* 1. Hero with Brand Preview Signature Element */}
        <CustomPlanHero hero={pageData.hero} />

        {/* 2. Audiences (Two cards) */}
        {pageData.audiences && <CustomPlanAudiences audiences={pageData.audiences} />}

        {/* 3. Deliverables Bento Grid */}
        {pageData.deliverables && (
          <CustomPlanDeliverables deliverables={pageData.deliverables} />
        )}

        {/* 4. Launch Timeline (Signature GSAP Motion on Desktop, Vertical on Mobile) */}
        {pageData.timeline && <CustomPlanTimeline timeline={pageData.timeline} />}

        {/* 5. Comparison: Building it yourself vs LMS Domain Custom Plan */}
        {pageData.comparison && <CustomPlanComparison comparison={pageData.comparison} />}

        {/* 6. Services After Launch */}
        {pageData.services && <CustomPlanServices services={pageData.services} />}

        {/* 7. Pricing Note */}
        {pageData.pricingNote && (
          <CustomPlanPricingNote pricingNote={pageData.pricingNote} />
        )}

        {/* 8. Enquiry Form (Anchor #plan, 3-step animated flow) */}
        <CustomPlanEnquiryForm formConfig={pageData.form} />

        {/* 9. FAQ (Landing FAQ card style + FAQPage JSON-LD) */}
        {pageData.faq && <CustomPlanFaq faq={pageData.faq} />}

        {/* 10. Final CTA */}
        {pageData.cta && <CustomPlanCta cta={pageData.cta} />}
      </div>
    </BrandPreviewProvider>
  );
}
