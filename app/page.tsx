import AdvantageSection from "@/components/sections/AdvantageSection/AdvantageSection";
import BannerSection from "@/components/sections/Banner/BannerSection";
import CtaSection from "@/components/sections/CtaSection/CtaSection";
import CustomerSection from "@/components/sections/CustomerSection/CustomerSection";
import FeaturesSection from "@/components/sections/FeaturesSection/FeaturesSection";
import ResultSection from "@/components/sections/ResultSection/ResultSection";
import TestimonialSection from "@/components/sections/TestimonialSection/TestimonialSection";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "LMS Domain",
    description: "LMS Domain Learning Management",
  };
}


export default function Home() {
  return (
    <div className="font-manrope relative [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]">

      {/* BANNER SECTION */}
      <BannerSection />

      {/* FEATURES SECTION */}
      <FeaturesSection />

      {/* CUSOMTER SECTION */}
      <CustomerSection />

      {/* SCROLL SECTION */}
      <AdvantageSection />

      {/* RESULT SECTION */}
      <ResultSection />

      {/* TESTIMONIAL SECTION */}
      <TestimonialSection />

      {/* CTA SECTION */}
      <CtaSection />

    </div>
  );
}
