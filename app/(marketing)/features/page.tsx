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
  CTABand,
} from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("features").catch(() => null),
    getFeaturesPage().catch(() => null),
  ]);

  const title =
    seo?.metatitle ||
    pageData?.hero?.title ||
    "Features | LMS Domain";
  const description =
    seo?.metadescription ||
    pageData?.hero?.subTitle ||
    "Bring courses, assessments, live learning, AI-powered tools, payments, and academy management together in one flexible learning platform.";

  return {
    title,
    description,
    keywords: seo?.metakeyword || [
      "LMS",
      "Online Academy",
      "Course Builder",
      "AI LMS",
      "Education Platform",
    ],
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
      <AudienceSwitcher />

      {/* 4. AI Spotlight Section (Domie AI tools with real student study photo) */}
      <AiSpotlightSection features={aiCategory?.features || []} />

      {/* 5. Mid-page CTA: See Domie AI in action */}
      <AiMidPageCta />

      {/* 6. Your Academy Start to Finish: Interactive Journey Strip */}
      <JourneyStrip />

      {/* 7. Category Sections (8 alternating sections with real photos, video loop & interactive simulations) */}
      <CategorySections categories={categories} />

      {/* 8. Closing CTA Band */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <CTABand
            title="Ready to Build a Better Learning Experience?"
            subtitle="Discover how LMS Domain can bring your courses, learners, and academy operations together."
            buttonText="Request a Demo"
          />
        </div>
      </section>
    </div>
  );
}
