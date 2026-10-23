import type { Metadata } from "next";
import { getSection, getFeaturesPage, fetchSeo } from "@/lib/api/content";
import {
  FeaturesHero,
  CategoryOverviewNav,
  AudienceSwitcher,
  AiSpotlightSection,
  AiMidPageCta,
  JourneyStrip,
  CategorySections,
} from "@/components/marketing";
import { CtaSection } from "@/components/sections/HomePage/CtaSection/CtaSection";
import { fullTitle, getMetadataBase, applySeo } from "@/lib/site";
import { IntegrationsHub } from "@/components/marketing/IntegrationsHub";
import { ContentSource, type ContentSourceKind } from "@/components/content/ContentSource";

export async function generateMetadata(): Promise<Metadata> {
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("features").catch(() => null));
}

async function baseMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("features").catch(() => null),
    getFeaturesPage().catch(() => null),
  ]);

  const rawTitle =
    seo?.metatitle ||
    pageData?.hero?.title ||
    "Features & LMS Core";
  const title = fullTitle(rawTitle);

  const description =
    seo?.metadescription ||
    pageData?.hero?.subtitle ||
    "Bring courses, assessments, live learning, AI-powered tools, payments, and academy management together in one flexible learning platform.";

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: seo?.metakeyword || [
      "LMS",
      "Online Academy",
      "Course Builder",
      "AI LMS",
      "Education Platform",
    ],
    alternates: {
      canonical: "/features",
    },
    openGraph: {
      title,
      description,
      url: "/features",
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function FeaturesPage() {
  const [data, overview, audiencesHeading, spotlight, midCta, journey, integrationsHeading, band] = await Promise.all([
    getFeaturesPage(),
    getSection("features-overview"),
    getSection("features-audiences"),
    getSection("features-ai-spotlight"),
    getSection("features-mid-cta"),
    getSection("features-journey"),
    getSection("features-integrations"),
    getSection("features-cta"),
  ]);
  const { hero, categories, sources } = data;
  const aiCategory = categories.find((c) => c.slug === "ai-powered-tools");
  // A section is only as "api" as its least admin-driven part
  const worst = (...kinds: ContentSourceKind[]): ContentSourceKind =>
    kinds.includes("code") ? "code" : kinds.includes("partial") ? "partial" : "api";

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero (LCP protected) */}
      <ContentSource id="features-hero" source={sources.hero}>
        <FeaturesHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          subtitle={hero.subtitle}
          ctaText={hero.ctaText}
          secondaryCtaText={hero.secondaryCtaText}
        />
      </ContentSource>

      {/* 2. Category Overview Grid + Feature Finder + Desktop Sticky Pill Bar */}
      <ContentSource id="features-overview" source={worst(overview.source, sources.catalog)}>
        <CategoryOverviewNav categories={categories} labels={overview.content} />
      </ContentSource>

      {/* 3. Built for How You Teach: Audience Switcher */}
      <ContentSource id="features-audiences" source={worst(audiencesHeading.source, sources.audiences)}>
        <AudienceSwitcher media={data.media} tabs={data.audiences} heading={audiencesHeading.content} />
      </ContentSource>

      {/* 4. AI Spotlight Section */}
      <ContentSource id="features-ai-spotlight" source={worst(spotlight.source, sources.catalog)}>
        <AiSpotlightSection features={aiCategory?.features || []} media={data.media} heading={spotlight.content} />
      </ContentSource>

      {/* 5. Mid-page CTA: See Domie AI in action */}
      <ContentSource id="features-mid-cta" source={midCta.source}>
        <AiMidPageCta content={midCta.content} />
      </ContentSource>

      {/* 6. Your Academy Start to Finish: Interactive Journey Strip */}
      <ContentSource id="features-journey" source={journey.source}>
        <JourneyStrip content={journey.content} />
      </ContentSource>

      {/* 7. Category Sections (catalog + photos/videos; simulations are illustrations in code) */}
      <ContentSource id="features-categories" source={worst(sources.catalog, sources.media)}>
        <CategorySections categories={categories} media={data.media} />
      </ContentSource>

      {/* 8. Seamless Integrations */}
      <ContentSource id="features-integrations" source={worst(integrationsHeading.source, sources.integrations)}>
        <IntegrationsHub
          eyebrow={integrationsHeading.content.eyebrow}
          heading={integrationsHeading.content.title}
          subtitle={integrationsHeading.content.subtitle}
          integrations={data.integrations}
        />
      </ContentSource>

      {/* 9. Closing CTA band */}
      <ContentSource id="features-cta" source={band.source}>
        <CtaSection showTestimonials={false} content={band.content} />
      </ContentSource>
    </div>
  );
}
