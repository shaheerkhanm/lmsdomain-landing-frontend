import React from "react";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import FeaturesSection from "@/components/sections/HomePage/FeaturesSection/FeaturesSection";
import ManifestSection from "@/components/sections/HomePage/ManifestSection";
import AiSection from "@/components/sections/HomePage/AiSection/AiSection";
import AdvantageSection from "@/components/sections/HomePage/AdvantageSection/AdvantageSection";
import CustomerSection from "@/components/sections/HomePage/CustomerSection/CustomerSection";
import FaqSection from "@/components/sections/HomePage/FaqSection";
import MobileAppSection from "@/components/sections/HomePage/MobileAppSection";
import ClientLogosSection from "@/components/sections/HomePage/ClientLogosSection";
import { getSection, getHomeTestimonials, getHomeMobileApp, getHomeClients } from "@/lib/api/content";
import { ContentSource } from "@/components/content/ContentSource";
import { PageContentProvider } from "@/components/content/PageContent";

export async function HomePage() {
  // Every section's copy comes from the admin (Home > Cms), with the built-in
  // content as fallback; testimonials come from Home > Testimonials.
  // Mobile app and client logos come only from the admin and are hidden while
  // unpublished or empty (no built-in fallback).
  const [hero, teachSmarter, manifesto, ai, benefits, wallTitle, faq, testimonials, mobileApp, clients] = await Promise.all([
    getSection("home-hero"),
    getSection("home-teach-smarter"),
    getSection("home-manifesto"),
    getSection("home-ai"),
    getSection("home-benefits"),
    getSection("testimonials"),
    getSection("home-faq"),
    getHomeTestimonials(),
    getHomeMobileApp(),
    getHomeClients(),
  ]);

  const content = {
    "home-hero": hero.content,
    "home-teach-smarter": teachSmarter.content,
    "home-manifesto": manifesto.content,
    "home-ai": ai.content,
    "home-benefits": benefits.content,
    testimonials: wallTitle.content,
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
        {/* After the AI tools: where learners use the product, before the business benefits */}
        {mobileApp && (
          <ContentSource id="site-home-mobile-app" source="api">
            <MobileAppSection data={mobileApp} />
          </ContentSource>
        )}
        <ContentSource id="home-benefits" source={benefits.source}>
          <AdvantageSection />
        </ContentSource>
        {/* Social proof together: logos lead into the wall of love */}
        {clients && (
          <ContentSource id="site-home-clients" source="api">
            <ClientLogosSection data={clients} />
          </ContentSource>
        )}
        {/* Cards come from Home > Testimonials; hidden when there are none */}
        <ContentSource id="testimonials" source={testimonials.cards.length ? wallTitle.source : "api"}>
          <CustomerSection cards={testimonials.cards} />
        </ContentSource>
        <ContentSource id="home-faq" source={faq.source}>
          <FaqSection />
        </ContentSource>
      </div>
    </PageContentProvider>
  );
}

export default HomePage;
