import React from "react";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import FeaturesSection from "@/components/sections/HomePage/FeaturesSection/FeaturesSection";
import ManifestSection from "@/components/sections/HomePage/ManifestSection";
import AiSection from "@/components/sections/HomePage/AiSection/AiSection";
import AdvantageSection from "@/components/sections/HomePage/AdvantageSection/AdvantageSection";
import CustomerSection from "@/components/sections/HomePage/CustomerSection/CustomerSection";
import FaqSection from "@/components/sections/HomePage/FaqSection";
import { fetchCms } from "@/lib/api/content";

export async function HomePage() {
  // Fetch section data in parallel through server content client
  const [
    homeHeroData,
    homeGraphdata,
    teachSmarterData,
    customerData,
    benefitsData,
  ] = await Promise.all([
    fetchCms("home-hero"),
    fetchCms("home-graph-section"),
    fetchCms("home-teach-smarter"),
    fetchCms("customers"),
    fetchCms("results"),
  ]);

  return (
    <div className="relative font-urbanist selection:bg-[#161616] selection:text-white">
      <BannerSection data={homeHeroData || {}} graphData={homeGraphdata || {}} />
      <FeaturesSection data={teachSmarterData || {}} />
      <ManifestSection />
      <AiSection />
      <AdvantageSection data={benefitsData || {}} />
      <CustomerSection data={customerData || {}} />
      <FaqSection />
    </div>
  );
}

export default HomePage;
