import type { Metadata } from "next";
import { SolutionV5Page } from "@/components/sections/SolutionsV5/SolutionV5Page";
import { CoachingHero } from "@/components/sections/SolutionsV5/coaching/CoachingHero";
import { coachingInstitutesData } from "@/content/solutions/coaching-institutes";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getSolutionPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: coachingInstitutesData.metaTitle || fullTitle("Coaching Institutes | Solutions"),
  description: coachingInstitutesData.metaDescription || coachingInstitutesData.title,
  alternates: { canonical: "/solutions/coaching-institutes" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "coaching-institutes", guard: "coaching-institutes" });
}

export default async function CoachingInstitutesRoute() {
  const content = await getSolutionPage("coaching-institutes");
  return <SolutionV5Page data={coachingInstitutesData} content={content} Hero={CoachingHero} pageName="Coaching institutes" />;
}

