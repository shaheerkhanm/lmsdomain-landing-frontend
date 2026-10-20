import React from "react";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import FeaturesSection from "@/components/sections/HomePage/FeaturesSection/FeaturesSection";
import ManifestSection from "@/components/sections/HomePage/ManifestSection";
import AiSection from "@/components/sections/HomePage/AiSection/AiSection";
import AdvantageSection from "@/components/sections/HomePage/AdvantageSection/AdvantageSection";
import CustomerSection from "@/components/sections/HomePage/CustomerSection/CustomerSection";
import FaqSection from "@/components/sections/HomePage/FaqSection";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";
import { BACKEND_URL } from "@/utils/constants/constant";

export async function HomePage() {
  const getData = async (slug: string) => {
    try {
      const baseUrl = process.env.BACKEND_URL || BACKEND_URL;
      const location = baseUrl + apiRoutes?.getAllCms;
      const response = await fetchData({
        url: location,
        body: { slug },
      });
      return response || {};
    } catch (error) {
      return {};
    }
  };

  // Fetch section data in parallel
  const [
    homeHeroData,
    homeGraphdata,
    teachSmarterData,
    customerData,
    benefitsData,
  ] = await Promise.all([
    getData("home-hero"),
    getData("home-graph-section"),
    getData("home-teach-smarter"),
    getData("customers"),
    getData("results"),
  ]);

  return (
    <div className="relative font-urbanist bg-white text-slate-900 overflow-x-clip lg:overflow-hidden">
      {/* 1. Mota Hero Stage: Cycling Pastel Pill Badge + Converging 2x2 Dashboard Mockup */}
      <BannerSection graphData={homeGraphdata} data={homeHeroData} />

      {/* 2. Mota 00:05-00:11 Stacking Feature Cards Deck: 01, 02, 03 */}
      <FeaturesSection data={teachSmarterData} />

      {/* 3. Mota 00:11-00:14 Editorial Text Reveal Manifesto */}
      <ManifestSection />

      {/* 4. Mota 00:14-00:23 Extension 3-Step Showcase with Circular Progress Ring */}
      <AiSection />

      {/* 5. Mota 00:23-00:27 Angled Benefits Rotating Deck on Subtle Grid */}
      <AdvantageSection data={benefitsData} />

      {/* 6. Mota 00:27-00:31 "Wall of love" Background Typography + Fanned Testimonial Cards */}
      <CustomerSection data={customerData} />

      {/* 7. Mota 00:31-00:34 "You ask – we answer" Clean FAQ Accordion */}
      <FaqSection />
    </div>
  );
}

export default HomePage;
