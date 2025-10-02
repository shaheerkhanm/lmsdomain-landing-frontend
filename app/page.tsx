import HomePage from "@/components/modules/HomePage";
import AdvantageSection from "@/components/sections/HomePage/AdvantageSection/AdvantageSection";
import BannerSection from "@/components/sections/HomePage/Banner/BannerSection";
import CtaSection from "@/components/sections/HomePage/CtaSection/CtaSection";
import CustomerSection from "@/components/sections/HomePage/CustomerSection/CustomerSection";
import FeaturesSection from "@/components/sections/HomePage/FeaturesSection/FeaturesSection";
import ResultSection from "@/components/sections/HomePage/ResultSection/ResultSection";
import TestimonialSection from "@/components/sections/HomePage/TestimonialSection/TestimonialSection";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "LMS Domain",
    description: "LMS Domain Learning Management",
  };
}


export default function Home() {
  return (
    <HomePage />
  );
}
