import React from "react";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import HowAcademyRunsSection from "@/components/sections/HomePage/HowAcademyRunsSection";
import SellAnywhereSection from "@/components/sections/HomePage/SellAnywhereSection";
import YourBrandSection from "@/components/sections/HomePage/YourBrandSection";
import DomieAiBand from "@/components/sections/HomePage/DomieAiBand";
import WhyChooseUsSection from "@/components/sections/HomePage/WhyChooseUsSection";
import PricingTeaserSection from "@/components/sections/HomePage/PricingTeaserSection";
import { ProofStrip, FAQ, CTABand } from "@/components/marketing/ui";
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
        {/* 1. HERO (Single H1 on the page) */}
        <ContentSource id="home-hero" source={hero.source}>
          <BannerSection data={{}} graphData={{}} />
        </ContentSource>

        {/* 2. TRUST STRIP (ProofStrip) */}
        <ProofStrip
          heading="Academies teaching with LMS Domain"
          logos={clients?.logos || []}
          metricsLine="2,000+ learners · 100+ courses · 100+ live classes delivered"
        />

        {/* 3. HOW AN ACADEMY RUNS ON LMS DOMAIN */}
        <HowAcademyRunsSection />

        {/* 4. SELL ANYWHERE */}
        <SellAnywhereSection />

        {/* 5. YOUR BRAND, YOUR DOMAIN */}
        <YourBrandSection />

        {/* 6. DOMIE AI (Compact band with Premium label) */}
        <DomieAiBand />

        {/* 7. WHY ACADEMIES CHOOSE LMS DOMAIN */}
        <WhyChooseUsSection />

        {/* 8. PRICING TEASER */}
        <PricingTeaserSection
          lowestMonthlyPrice={lowestMonthlyPrice}
          lowestMonthlyPriceUsd={lowestMonthlyPriceUsd}
          currency={planCurrency}
        />

        {/* 9. FAQ */}
        <FAQ
          items={keepLive(homeFaqItems, (item) => [item.question, item.answer])}
          title="Frequently asked questions"
          subtitle="Everything you need to know about setting up and running your academy on LMS Domain."
          className="bg-white border-y border-[#EAE8E2]"
        />

        {/* 10. FINAL CTA */}
        <CTABand
          title="See your academy running on LMS Domain."
          subtitle="Book a 20-minute demo. We'll show it with your own course structure."
          buttonText="Book a demo"
          tone="dark"
        />
      </div>
    </PageContentProvider>
  );
}

export default HomePage;
