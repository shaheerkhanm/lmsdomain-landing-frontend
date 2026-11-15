import React from "react";
import { HeroV5 } from "@/components/sections/HomeV5/HeroV5";
import { FeatureBento } from "@/components/sections/HomeV5/FeatureBento";
import { SetupSteps } from "@/components/sections/HomeV5/SetupSteps";
import { AiSection } from "@/components/sections/HomeV5/AiSection";
import { AudienceCards } from "@/components/sections/HomeV5/AudienceCards";
import { Testimonials, DEMO_TESTIMONIALS } from "@/components/sections/HomeV5/Testimonials";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { PricingBand } from "@/components/sections/HomeV5/PricingBand";
import { DEFAULT_PRICING_V2 } from "@/config/pricing";
import { FAQ } from "@/components/marketing/ui";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { DomieLauncher } from "@/components/ai/DomieLauncher";
import { homeFaqItems } from "@/content/faq";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { getSection, getHomeClients, getPricingPage, getHomeTestimonials } from "@/lib/api/content";
import { keepLive, liveOr } from "@/lib/claims";
import { isProductionSite } from "@/lib/site";
import { ContentSource } from "@/components/content/ContentSource";
import { PageContentProvider } from "@/components/content/PageContent";

export async function HomePage() {
  const [hero, clients, pricingPage, testimonials] = await Promise.all([
    getSection("home-hero"),
    getHomeClients().catch(() => null),
    getPricingPage().catch(() => null),
    getHomeTestimonials().catch(() => []),
  ]);

  const content = {
    "home-hero": hero.content,
  };

  const heroTitle =
    liveOr(hero.content?.title, defaultHeroContent.title) ||
    defaultHeroContent.title ||
    "Run your academy's batches, live classes and tests in one place.";

  // Lowest paid plan price for the compact pricing block (full plans live on /pricing)
  const pricingV2 = pricingPage?.pricingV2 || DEFAULT_PRICING_V2;
  const paidPlans = (pricingV2.plans || [])
    .filter((p) => p.active !== false && !p.isCustom)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const minOf = (cur: "INR" | "USD") => {
    const vals = paidPlans.map((p) => p.priceMonthly?.[cur]).filter((v): v is number => typeof v === "number" && v > 0);
    return vals.length ? Math.min(...vals) : null;
  };
  const fromPrice = { INR: minOf("INR"), USD: minOf("USD") };

  // Real testimonials from admin win. Demo ones only outside production, never on the live site.
  const useDemoTestimonials = testimonials.length === 0 && !isProductionSite();
  const testimonialItems = useDemoTestimonials ? DEMO_TESTIMONIALS : testimonials;

  return (
    <PageContentProvider value={content}>
      <div
        id="home-page-root"
        className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white"
      >
        {/* 1. Hero: headline, product view, customer logos, real numbers */}
        <ContentSource id="home-hero" source={hero.source}>
          <HeroV5 title={heroTitle} logos={clients?.logos || []} />
        </ContentSource>

        {/* 2. Feature bento grid */}
        <FeatureBento />

        {/* 3. Setup in three steps */}
        <SetupSteps />

        {/* 4. Domie AI: the only dark section */}
        <AiSection />

        {/* 5. Who it's for */}
        <AudienceCards />

        {/* 6. Testimonials (admin data, or demo outside production) */}
        <Testimonials items={testimonialItems} isDemo={useDemoTestimonials} />

        {/* 7. Pricing: compact block, full plans on /pricing */}
        <PricingBand fromPrice={fromPrice} trialDays={pricingV2.trialDays ?? 15} />

        {/* 8. FAQ */}
        <FAQ
          items={keepLive(homeFaqItems, (item) => [item.question, item.answer])}
          title="Frequently asked questions"
          eyebrow="FAQs"
          contactHref="/contact"
          minimal
        />

        {/* 9. Final CTA */}
        <FinalCta />

        <DomieLauncher />
        <ScrollReveal />
      </div>
    </PageContentProvider>
  );
}

export default HomePage;
