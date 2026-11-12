import React from "react";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import BuiltForBatchesSection from "@/components/sections/HomePage/BuiltForBatchesSection";
import HomeStatsSection from "@/components/sections/HomePage/HomeStatsSection";
import HowAcademyRunsSection from "@/components/sections/HomePage/HowAcademyRunsSection";
import SellAnywhereSection from "@/components/sections/HomePage/SellAnywhereSection";
import YourBrandSection from "@/components/sections/HomePage/YourBrandSection";
import DomieAiBand from "@/components/sections/HomePage/DomieAiBand";
import WhyChooseUsSection from "@/components/sections/HomePage/WhyChooseUsSection";
import HomeSolutionsSection from "@/components/sections/HomePage/HomeSolutionsSection";
import PricingTeaserSection from "@/components/sections/HomePage/PricingTeaserSection";
import dynamic from "next/dynamic";
import { ProofStrip, FAQ, CTABand } from "@/components/marketing/ui";
import { BatchFlowScreen } from "@/components/marketing/mockups/screens";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";

const DomieLauncher = dynamic(
  () => import("@/components/ai/DomieLauncher").then((mod) => mod.DomieLauncher),
  { ssr: false }
);
import { homeFaqItems } from "@/content/faq";
import { getSection, getHomeClients, getPricingPage } from "@/lib/api/content";
import { keepLive } from "@/lib/claims";
import { ContentSource } from "@/components/content/ContentSource";
import { PageContentProvider } from "@/components/content/PageContent";

export async function HomePage() {
  const [hero, clients, pricingPage] = await Promise.all([
    getSection("home-hero"),
    getHomeClients().catch(() => null),
    getPricingPage().catch(() => null),
  ]);

  const content = {
    "home-hero": hero.content,
  };

  // Find lowest monthly plan price from pricing source
  const paidPlans = (pricingPage?.plans || [])
    .filter(
      (p) =>
        !p.isCustom &&
        typeof p.prices?.monthly === "number" &&
        p.prices.monthly > 0
    )
    .sort((a, b) => (a.prices.monthly ?? 0) - (b.prices.monthly ?? 0));

  const lowestPlan = paidPlans[0];
  const lowestMonthlyPrice = lowestPlan?.prices?.monthly ?? 3999;
  const lowestMonthlyPriceUsd = pricingPage?.pricingV2?.plans?.[0]?.priceMonthly?.USD ?? 49;
  const planCurrency = lowestPlan?.currency || pricingPage?.plans?.[0]?.currency;

  return (
    <PageContentProvider value={content}>
      <div className="relative font-urbanist selection:bg-[#161616] selection:text-white bg-[#FAF9F6]">
        {/* 1. HERO (Single H1 on the page + Logo Marquee) */}
        <ContentSource id="home-hero" source={hero.source}>
          <BannerSection clientLogos={clients?.logos || []} />
        </ContentSource>

        {/* 2. GIANT PRODUCT SCREEN */}
        <section className="mt-[clamp(56px,7vw,88px)] max-w-[1160px] mx-auto px-5" aria-label="Course batch flow demo">
          <BatchFlowScreen />
        </section>

        {/* 3. BUILT FOR BATCHES DARK PANEL & ADMIN DASHBOARD */}
        <BuiltForBatchesSection />

        {/* 4. STATS (Proof Strip Proof Numbers) */}
        <HomeStatsSection />

        {/* 5. DOMIE AI */}
        <DomieAiBand />

        {/* 6. HOW AN ACADEMY RUNS ON LMS DOMAIN */}
        <HowAcademyRunsSection />

        {/* 7. SELL ANYWHERE */}
        <SellAnywhereSection />

        {/* 8. YOUR BRAND, YOUR DOMAIN */}
        <YourBrandSection />

        {/* 9. WHY ACADEMIES CHOOSE LMS DOMAIN */}
        <WhyChooseUsSection />

        {/* 10. SOLUTIONS PHOTO CARDS */}
        <HomeSolutionsSection />

        {/* 11. PRICING TEASER */}
        <PricingTeaserSection
          pricingV2={pricingPage?.pricingV2}
          heroTitle={pricingPage?.hero?.title}
          heroSubtitle={pricingPage?.hero?.subtitle}
        />

        {/* 12. FAQ (Sendr Dark Panel Style) */}
        <FAQ
          items={keepLive(homeFaqItems, (item) => [item.question, item.answer])}
          title="Frequently asked questions"
          eyebrow="FAQs"
          variant="dark-panel"
          contactHref="/contact"
        />

        {/* 13. FINAL CTA */}
        <CTABand
          title="See your academy running on LMS Domain."
          subtitle="Book a 20-minute demo. We'll show it with your own course structure."
          buttonText="Book a demo"
          tone="light"
        />

        {/* 14. FLOATING DOMIE LAUNCHER */}
        <DomieLauncher />

        {/* 15. SCROLL REVEAL OBSERVER */}
        <ScrollReveal />
      </div>
    </PageContentProvider>
  );
}

export default HomePage;
