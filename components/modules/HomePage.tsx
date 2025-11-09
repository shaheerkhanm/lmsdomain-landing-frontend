import AdvantageSection from "@/components/sections/HomePage/AdvantageSection/AdvantageSection";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import CtaSection from "@/components/sections/HomePage/CtaSection/CtaSection";
import CustomerSection from "@/components/sections/HomePage/CustomerSection/CustomerSection";
import FeaturesSection from "@/components/sections/HomePage/FeaturesSection/FeaturesSection";
import ResultSection from "@/components/sections/HomePage/ResultSection/ResultSection";
import TestimonialSection from "@/components/sections/HomePage/TestimonialSection/TestimonialSection";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";
import AiSection from "../sections/HomePage/AiSection/AiSection";


export async function HomePage() {

  const getData = async (slug: string) => {
    try {
      const location = process.env.BACKEND_URL + apiRoutes?.getAllCms
      const response = await fetchData({
        url: location,
        body: { slug },

      })



      return response
    } catch (error) {
      return {}
    }
  }


  // Fetch all section data
  const homeHeroData = await getData("home-hero");
  const homeGraphdata = await getData("home-graph-section");
  const teachSmarterData = await getData("home-teach-smarter");
  const customerData = await getData("customers");
  const featuresData = await getData("features");
  const resultsData = await getData("results");
  const testimonialsData = await getData("testimonials");
  const ctaData = await getData("cta");

  return (
    <div className="font-manrope relative [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]">

      {/* BANNER SECTION */}
      <BannerSection graphData={homeGraphdata} data={homeHeroData} />

      {/* FEATURES SECTION */}
      <FeaturesSection data={teachSmarterData} />

      {/* CUSOMTER SECTION */}
      <CustomerSection data={customerData} />

      {/* SCROLL SECTION */}
      <AdvantageSection data={featuresData} />

      {/* AI SECITON */}
      <AiSection />

      {/* RESULT SECTION */}
      <ResultSection data={resultsData} />

      {/* TESTIMONIAL SECTION */}
      <TestimonialSection data={testimonialsData} />

      {/* CTA SECTION */}
      <CtaSection data={ctaData} />

    </div>
  );
}
