import AdvantageSection from "@/components/sections/HomePage/AdvantageSection/AdvantageSection";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import CtaSection from "@/components/sections/HomePage/CtaSection/CtaSection";
import CustomerSection from "@/components/sections/HomePage/CustomerSection/CustomerSection";
import FeaturesSection from "@/components/sections/HomePage/FeaturesSection/FeaturesSection";
import ResultSection from "@/components/sections/HomePage/ResultSection/ResultSection";
import TestimonialSection from "@/components/sections/HomePage/TestimonialSection/TestimonialSection";


export default function HomePage() {
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
