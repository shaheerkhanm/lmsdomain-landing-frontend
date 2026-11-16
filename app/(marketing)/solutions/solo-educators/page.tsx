import type { Metadata } from "next";
import { SolutionV5Page } from "@/components/sections/SolutionsV5/SolutionV5Page";
import { SoloHero } from "@/components/sections/SolutionsV5/solo/SoloHero";
import { soloEducatorsData } from "@/content/solutions/solo-educators";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: soloEducatorsData.metaTitle || fullTitle("Solo Educators & Tutors | Solutions"),
  description: soloEducatorsData.metaDescription || soloEducatorsData.title,
  alternates: { canonical: "/solutions/solo-educators" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "solo-educators", guard: "solo-educators" });
}

export default function SoloEducatorsRoute() {
  return <SolutionV5Page data={soloEducatorsData} Hero={SoloHero} pageName="Solo educators" />;
}

