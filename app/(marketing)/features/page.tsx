import type { Metadata } from "next";
import { getFeaturesPage, fetchSeo } from "@/lib/api/content";
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
import { fullTitle, getMetadataBase } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
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
    pageData?.hero?.subTitle ||
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
  const data = await getFeaturesPage();
  const { hero, categories } = data;
  const aiCategory = categories.find((c) => c.slug === "ai-powered-tools");

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero (unchanged, LCP protected) */}
      <FeaturesHero
        title={hero?.title}
        subtitle={hero?.subTitle}
        ctaText={hero?.buttonText || "Request a Demo"}
      />

      {/* 2. Category Overview Grid + Feature Finder + Desktop Sticky Pill Bar */}
      <CategoryOverviewNav categories={categories} />

      {/* 3. Built for How You Teach: Audience Switcher (Institutes, Coaches, Corporate) */}
      <AudienceSwitcher media={data.media} />

      {/* 4. AI Spotlight Section (Domie AI tools with real student study photo) */}
      <AiSpotlightSection features={aiCategory?.features || []} media={data.media} />

      {/* 5. Mid-page CTA: See Domie AI in action */}
      <AiMidPageCta />

      {/* 6. Your Academy Start to Finish: Interactive Journey Strip */}
      <JourneyStrip />

      {/* 7. Category Sections (8 alternating sections with real photos, video loop & interactive simulations) */}
      <CategorySections categories={categories} media={data.media} />

      {/* 8. Closing CTA Band (landing final CTA with testimonials hidden pending real customer signoff) */}
      <CtaSection showTestimonials={false} />
    </div>
  );
}
