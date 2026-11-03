import type { Metadata } from "next";
import { getCustomPlanPage, fetchSeo } from "@/lib/api/content";
import { fullTitle, getMetadataBase, applySeo } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";
import {
  BrandPreviewProvider,
  CustomPlanHero,
  CustomPlanAudiences,
  CustomPlanDeliverables,
  CustomPlanTimeline,
  CustomPlanComparison,
  CustomPlanMobileApps,
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

async function baseMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("custom-lms").catch(() => null),
    getCustomPlanPage().catch(() => null),
  ]);

  const rawTitle =
    seo?.metatitle ||
    pageData?.seo?.title ||
    "Custom LMS with Android & iOS Apps, Live in Days | LMS Domain";
  const title = fullTitle(rawTitle);

  const description =
    seo?.metadescription ||
    pageData?.seo?.description ||
    "Get your own branded LMS, website and Android & iOS apps, set up by our team in days. Your domain, your brand, your store listings, with setup, migration and support included.";

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: seo?.metakeyword || [
      "Custom LMS",
      "White label LMS",
      "Branded LMS apps",
      "Android LMS app",
      "iOS LMS app",
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
    description:
      pageData.seo?.description ||
      "Get your own branded LMS, website and Android & iOS apps, set up by our team in days.",
    provider: {
      "@type": "Organization",
      name: "LMS Domain",
      url: "https://lmsdomain.com",
    },
    serviceType: "Custom Learning Management System and Mobile Apps",
    areaServed: "Worldwide",
  };

  const defaultColor = pageData.hero.brandPreview?.colours?.[0] || "#7B5CF5";

  return (
    <BrandPreviewProvider defaultColor={defaultColor}>
      {/* Service Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="min-h-screen bg-white font-urbanist">
        {/* 1. Hero with Brand Preview Signature Element */}
        <CustomPlanHero hero={pageData.hero} />

        {/* 2. Audiences (Three cards) */}
        {pageData.audiences && <CustomPlanAudiences audiences={pageData.audiences} />}

        {/* 3. Deliverables Bento Grid */}
        {pageData.deliverables && (
          <CustomPlanDeliverables deliverables={pageData.deliverables} />
        )}

        {/* 4. Launch Timeline (Signature GSAP Motion on Desktop, Vertical on Mobile) */}
        {pageData.timeline && <CustomPlanTimeline timeline={pageData.timeline} />}

        {/* 5. Comparison: Building it yourself vs LMS Domain Custom Plan */}
        {pageData.comparison && <CustomPlanComparison comparison={pageData.comparison} />}

        {/* 6. Mobile Apps Band (Gray background, Two phone frames + Shared app-icon) */}
        {pageData.mobileApps && <CustomPlanMobileApps mobileApps={pageData.mobileApps} />}

        {/* 7. Services After Launch */}
        {pageData.services && <CustomPlanServices services={pageData.services} />}

        {/* 8. Pricing Note */}
        {pageData.pricingNote && (
          <CustomPlanPricingNote pricingNote={pageData.pricingNote} />
        )}

        {/* 9. Enquiry Form (Anchor #plan, 3-step animated flow) */}
        <CustomPlanEnquiryForm formConfig={pageData.form} />

        {/* 10. FAQ (Landing FAQ card style + FAQPage JSON-LD) */}
        {pageData.faq && <CustomPlanFaq faq={pageData.faq} />}

        {/* 11. Final CTA */}
        {pageData.cta && <CustomPlanCta cta={pageData.cta} />}
      </div>
    </BrandPreviewProvider>
  );
}

