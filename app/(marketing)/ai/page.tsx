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
import { fullTitle, getMetadataBase, applySeo } from "@/lib/site";
import { ContentSource } from "@/components/content/ContentSource";

export async function generateMetadata(): Promise<Metadata> {
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("ai").catch(() => null), { page: "ai" });
}

async function baseMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("ai").catch(() => null),
    getAiPage().catch(() => null),
  ]);

  const rawTitle =
    seo?.metatitle ||
    (pageData?.hero?.title ? pageData.hero.title : "Domie AI");
  const title = fullTitle(rawTitle);

  const description =
    seo?.metadescription ||
    pageData?.hero?.subtitle ||
    "Assist learners with course-grounded answers, help creators draft content faster, and surface key operational alerts for administrators.";

  return {
    metadataBase: getMetadataBase(),
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
    alternates: {
      canonical: "/ai",
    },
    openGraph: {
      title,
      description,
      url: "/ai",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AiPage() {
  const pageData = await getAiPage();
  const sources = pageData.sources!;

  return (
    <div className="min-h-screen bg-white font-urbanist">
      {/* 1. Hero (Eyebrow, H1, Subtitle, CTAs + AI Command Bar visual) */}
      <ContentSource id="ai-hero" source={sources.hero}>
        <AiHero
          eyebrow={pageData.hero.eyebrow}
          title={pageData.hero.title}
          subtitle={pageData.hero.subtitle}
          primaryCta={pageData.hero.primaryCta}
          secondaryCta={pageData.hero.secondaryCta}
          commandBarExamples={pageData.hero.commandBarExamples}
          badge={pageData.hero.badge}
          suggestionsLabel={pageData.hero.suggestionsLabel}
          keyboardLabel={pageData.hero.keyboardLabel}
        />
      </ContentSource>

      {/* 2. Four AI Tools Pinned Showcase (tool demos are illustrations in code) */}
      <ContentSource id="ai-tools" source={sources.tools}>
        <AiShowcase tools={pageData.tools} />
      </ContentSource>

      {/* 3. How It Works (only when the CMS entry exists) */}
      {pageData.howItWorks && (
        <ContentSource id="ai-how-it-works" source="api">
          <AiHowItWorks
            title={pageData.howItWorks.title}
            steps={pageData.howItWorks.steps}
          />
        </ContentSource>
      )}

      {/* 4. Availability Card */}
      <ContentSource id="ai-availability" source={sources.availability}>
        <AiAvailability
          eyebrow={pageData.availability.eyebrow}
          title={pageData.availability.title}
          description={pageData.availability.description}
          cta={pageData.availability.cta}
          secondaryCta={pageData.availability.secondaryCta}
        />
      </ContentSource>

      {/* 5. Related Premium Tools */}
      {pageData.relatedTools && (
        <ContentSource id="ai-related-tools" source={sources.relatedTools}>
          <AiRelatedTools
            eyebrow={pageData.relatedTools.eyebrow}
            linkText={pageData.relatedTools.linkText}
            title={pageData.relatedTools.title}
            subtitle={pageData.relatedTools.subtitle}
            items={pageData.relatedTools.items}
          />
        </ContentSource>
      )}

      {/* 6. FAQ (hidden until real FAQ items exist) */}
      {pageData.faq && (
        <MarketingFaq
          title={pageData.faq.title}
          subtitle={pageData.faq.subtitle}
          items={pageData.faq.items}
        />
      )}

      {/* 7. Closing CTA band */}
      <ContentSource id="ai-cta" source={sources.band}>
        <CtaSection showTestimonials={false} content={pageData.band} />
      </ContentSource>
    </div>
  );
}
