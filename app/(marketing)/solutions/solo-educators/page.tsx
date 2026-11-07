import type { Metadata } from "next";
import { SolutionPage } from "@/components/marketing/solutions/SolutionPage";
import { soloEducatorsData } from "@/content/solutions/solo-educators";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: soloEducatorsData.metaTitle || fullTitle("Solo Educators & Tutors | Solutions"),
  description: soloEducatorsData.metaDescription || soloEducatorsData.title,
  alternates: { canonical: "/solutions/solo-educators" },
};

export default function SoloEducatorsRoute() {
  return <SolutionPage data={soloEducatorsData} />;
}
