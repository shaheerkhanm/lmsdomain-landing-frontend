import type { Metadata } from "next";
import { SolutionV5Page } from "@/components/sections/SolutionsV5/SolutionV5Page";
import { SoloHero } from "@/components/sections/SolutionsV5/solo/SoloHero";
import { soloEducatorsData } from "@/content/solutions/solo-educators";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getSolutionPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: soloEducatorsData.metaTitle || fullTitle("Solo Educators & Tutors | Solutions"),
  description: soloEducatorsData.metaDescription || soloEducatorsData.title,
  alternates: { canonical: "/solutions/solo-educators" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "solo-educators", guard: "solo-educators" });
}

export default async function SoloEducatorsRoute() {
  const content = await getSolutionPage("solo-educators");
  return <SolutionV5Page data={soloEducatorsData} content={content} Hero={SoloHero} pageName="Solo educators" />;
}

