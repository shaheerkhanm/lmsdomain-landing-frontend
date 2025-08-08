import AdvantageSection from "@/components/sections/AdvantageSection/AdvantageSection";
import BannerSection from "@/components/sections/Banner/BannerSection";
import CustomerSection from "@/components/sections/CustomerSection/CustomerSection";
import FeaturesSection from "@/components/sections/FeaturesSection/FeaturesSection";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "LMS Domain",
    description: "LMS Domain Learning Management",
  };
}


export default function Home() {
  return (
    <div className="relative [&>*:not(:first-child)]:lg:mt-[80px]  [&>*:last-child]:lg:mb-[80px] [&>*:not(:first-child)]:md:mt-[50px] [&>*:last-child]:md:mb-[50px] [&>*:not(:first-child)]:mt-[30px]  [&>*:last-child]:mb-[30px]">

      {/* BANNER SECTION */}
      <BannerSection />

      {/* FEATURES SECTION */}
      <FeaturesSection />

      {/* CUSOMTER SECTION */}
      <CustomerSection />

      {/* SCROLL SECTION */}
      <AdvantageSection />

    </div>
  );
}
