import BannerSection from "@/components/sections/Banner/BannerSection";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "LMS Domain",
    description: "LMS Domain Learning Management",
  };
}


export default function Home() {
  return (
    <div className="relative">
      <BannerSection />
    </div>
  );
}
