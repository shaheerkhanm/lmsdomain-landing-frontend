import type { Metadata } from "next";
import { getSection, getFeaturesPage, fetchSeo } from "@/lib/api/content";
import { AudienceSwitcher } from "@/components/marketing/AudienceSwitcher";
import { HeroAssembly } from "@/components/marketing/features/HeroAssembly";
import { FeatureMarquee } from "@/components/marketing/features/FeatureMarquee";
import { BentoOverview } from "@/components/marketing/features/BentoOverview";
import { AiDarkChapter } from "@/components/marketing/features/AiDarkChapter";
import { HorizontalJourney } from "@/components/marketing/features/HorizontalJourney";
import { StickyCategoryChapters } from "@/components/marketing/features/StickyCategoryChapters";
import { BrandingPlayground } from "@/components/marketing/features/BrandingPlayground";
import { CommandPalette } from "@/components/marketing/features/CommandPalette";
import { FinalCtaCard } from "@/components/marketing/features/FinalCtaCard";
import { fullTitle, getMetadataBase, applySeo } from "@/lib/site";
import { IntegrationsHub } from "@/components/marketing/IntegrationsHub";
import { ContentSource, type ContentSourceKind } from "@/components/content/ContentSource";
import { guardPage, guardMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("features");
  if (hiddenMeta) return hiddenMeta;
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("features").catch(() => null), { page: "features" });
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function FeaturesPage() {
  await guardPage("features");
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
      {/* 1. Hero Assembly (LCP protected, interactive fragments) */}
      <ContentSource id="features-hero" source={sources.hero}>
        <HeroAssembly
          eyebrow={hero.eyebrow}
          title={hero.title}
          subtitle={hero.subtitle}
          ctaText={hero.ctaText}
          secondaryCtaText={hero.secondaryCtaText}
        />
      </ContentSource>

      {/* 1b. Feature Marquee (all 38 features sliding) */}
      <FeatureMarquee />

      {/* 2. Bento Overview Grid (12-column live bento with looping moments) */}
      <ContentSource id="features-overview" source={worst(overview.source, sources.catalog)}>
        <BentoOverview categories={categories} labels={overview.content} />
      </ContentSource>

      {/* 3. Built for How You Teach: Audience Switcher */}
      <ContentSource id="features-audiences" source={worst(audiencesHeading.source, sources.audiences)}>
        <AudienceSwitcher media={data.media} tabs={data.audiences} heading={audiencesHeading.content} />
      </ContentSource>

      {/* 4. AI Dark Chapter (Full-bleed #161616, Domie Bot & Pinned 4-step Scrollytelling) */}
      <ContentSource id="features-ai-spotlight" source={worst(spotlight.source, sources.catalog)}>
        <AiDarkChapter heading={spotlight.content} />
      </ContentSource>

      {/* 6. Horizontal Journey (Pinned horizontal scroll track on desktop, vertical timeline on mobile) */}
      <ContentSource id="features-journey" source={journey.source}>
        <HorizontalJourney content={journey.content} />
      </ContentSource>

      {/* 7. Sticky Category Chapters (40/60 sticky split with active scene reaction) */}
      <ContentSource id="features-categories" source={worst(sources.catalog, sources.media)}>
        <StickyCategoryChapters categories={categories} media={data.media} />
      </ContentSource>

      {/* 7b. "Make It Yours" Branding Playground */}
      <BrandingPlayground />

      {/* 7c. Feature Finder Command Palette (⌘K) */}
      <CommandPalette />

      {/* 8. Seamless Integrations */}
      <ContentSource id="features-integrations" source={worst(integrationsHeading.source, sources.integrations)}>
        <IntegrationsHub
          eyebrow={integrationsHeading.content.eyebrow}
          heading={integrationsHeading.content.title}
          subtitle={integrationsHeading.content.subtitle}
          integrations={data.integrations}
        />
      </ContentSource>

      {/* 9. Final CTA on Dark Card (Sweeping accent beam & magnetic button) */}
      <ContentSource id="features-cta" source={band.source}>
        <FinalCtaCard content={band.content} />
      </ContentSource>
    </div>
  );
}
