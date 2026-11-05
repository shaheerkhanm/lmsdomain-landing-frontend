import React from "react";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import FeaturesSection from "@/components/sections/HomePage/FeaturesSection/FeaturesSection";
import ManifestSection from "@/components/sections/HomePage/ManifestSection";
import AiSection from "@/components/sections/HomePage/AiSection/AiSection";
import AdvantageSection from "@/components/sections/HomePage/AdvantageSection/AdvantageSection";
import FaqSection from "@/components/sections/HomePage/FaqSection";
import ClientLogosSection from "@/components/sections/HomePage/ClientLogosSection";
import { getSection, getHomeClients } from "@/lib/api/content";
import { ContentSource } from "@/components/content/ContentSource";
import { PageContentProvider } from "@/components/content/PageContent";

export async function HomePage() {
  const [hero, teachSmarter, manifesto, ai, benefits, faq, clients] = await Promise.all([
    getSection("home-hero"),
    getSection("home-teach-smarter"),
    getSection("home-manifesto"),
    getSection("home-ai"),
    getSection("home-benefits"),
    getSection("home-faq"),
    getHomeClients(),
  ]);

  const content = {
    "home-hero": hero.content,
    "home-teach-smarter": teachSmarter.content,
    "home-manifesto": manifesto.content,
    "home-ai": ai.content,
    "home-benefits": benefits.content,
    "home-faq": faq.content,
  };

  return (
    <PageContentProvider value={content}>
      <div className="relative font-urbanist selection:bg-[#161616] selection:text-white">
        <ContentSource id="home-hero" source={hero.source}>
          <BannerSection data={{}} graphData={{}} />
        </ContentSource>
        <ContentSource id="home-teach-smarter" source={teachSmarter.source}>
          <FeaturesSection />
        </ContentSource>
        <ContentSource id="home-manifesto" source={manifesto.source}>
          <ManifestSection />
        </ContentSource>
        <ContentSource id="home-ai" source={ai.source}>
          <AiSection />
        </ContentSource>
        <ContentSource id="home-benefits" source={benefits.source}>
          <AdvantageSection />
        </ContentSource>
        {/* Social proof */}
        {clients && (
          <ContentSource id="site-home-clients" source="api">
            <ClientLogosSection data={clients} />
          </ContentSource>
        )}
        <ContentSource id="home-faq" source={faq.source}>
          <FaqSection />
        </ContentSource>
      </div>
    </PageContentProvider>
  );
}

export default HomePage;
