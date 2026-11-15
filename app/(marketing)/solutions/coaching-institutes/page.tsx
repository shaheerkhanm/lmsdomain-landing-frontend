import type { Metadata } from "next";
import { SolutionV5Page } from "@/components/sections/SolutionsV5/SolutionV5Page";
import { CoachingHero } from "@/components/sections/SolutionsV5/coaching/CoachingHero";
import { coachingInstitutesData } from "@/content/solutions/coaching-institutes";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: coachingInstitutesData.metaTitle || fullTitle("Coaching Institutes | Solutions"),
  description: coachingInstitutesData.metaDescription || coachingInstitutesData.title,
  alternates: { canonical: "/solutions/coaching-institutes" },
};

export default function CoachingInstitutesRoute() {
  return <SolutionV5Page data={coachingInstitutesData} Hero={CoachingHero} pageName="Coaching institutes" />;
}

