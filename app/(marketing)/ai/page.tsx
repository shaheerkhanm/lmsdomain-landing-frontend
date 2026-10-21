import type { Metadata } from "next";
import { getAiPage, fetchSeo } from "@/lib/api/content";
import {
  AiHero,
  AiShowcase,
  AiHowItWorks,
  AiAvailability,
  AiRelatedTools,
  MarketingFaq,
} from "@/components/marketing";
import { CtaSection } from "@/components/sections/HomePage/CtaSection/CtaSection";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("ai").catch(() => null),
    getAiPage().catch(() => null),
  ]);

  const title =
    seo?.metatitle ||
    (pageData?.hero?.title ? `${pageData.hero.title} | LMS Domain` : "Domie AI | LMS Domain");

  const description =
    seo?.metadescription ||
    pageData?.hero?.subtitle ||
    "Assist learners with course-grounded answers, help creators draft content faster, and surface key operational alerts for administrators.";

  return {
    title,
    description,
    keywords: seo?.metakeyword || [
      "Domie AI",
      "LMS AI Tutor",
      "AI Course Generator",
      "Prescriptive Analytics",
      "AI Command Bar",
      "Education AI",
    ],
  };
}

export default async function AiPage() {
  const pageData = await getAiPage();

  return (
    <div className="min-h-screen bg-white font-urbanist">
      {/* 1. Hero (Eyebrow, H1, Subtitle, CTAs + AI Command Bar visual) */}
      <AiHero
        eyebrow={pageData.hero.eyebrow}
        title={pageData.hero.title}
        subtitle={pageData.hero.subtitle}
        primaryCta={pageData.hero.primaryCta}
        secondaryCta={pageData.hero.secondaryCta}
        commandBarExamples={pageData.hero.commandBarExamples}
      />

      {/* 2. Four AI Tools Pinned Showcase (Signature moment on gray #F3F4F6) */}
      <AiShowcase tools={pageData.tools} />

      {/* 3. How It Works (White, 3 large-number step cards) */}
      {pageData.howItWorks && (
        <AiHowItWorks
          title={pageData.howItWorks.title}
          steps={pageData.howItWorks.steps}
        />
      )}

      {/* 4. Availability Card (White, 40px radius card with CTAs) */}
      <AiAvailability
        title={pageData.availability.title}
        description={pageData.availability.description}
        cta={pageData.availability.cta}
        secondaryCta={pageData.availability.secondaryCta}
      />

      {/* 5. Related Premium Tools (Gray #F3F4F6, 3 small cards) */}
      {pageData.relatedTools && (
        <AiRelatedTools
          title={pageData.relatedTools.title}
          subtitle={pageData.relatedTools.subtitle}
          items={pageData.relatedTools.items}
        />
      )}

      {/* 6. FAQ (White, landing FAQ card enclosure) */}
      {pageData.faq && (
        <MarketingFaq
          title={pageData.faq.title}
          subtitle={pageData.faq.subtitle}
          items={pageData.faq.items}
        />
      )}

      {/* 7. CTA Band (Landing final CTA with floating sphere and enquiry) */}
      <CtaSection />
    </div>
  );
}
