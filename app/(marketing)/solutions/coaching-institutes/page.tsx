import type { Metadata } from "next";
import { SolutionPage } from "@/components/marketing/solutions/SolutionPage";
import { coachingInstitutesData } from "@/content/solutions/coaching-institutes";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: coachingInstitutesData.metaTitle || fullTitle("Coaching Institutes | Solutions"),
  description: coachingInstitutesData.metaDescription || coachingInstitutesData.title,
  alternates: { canonical: "/solutions/coaching-institutes" },
};

export default function CoachingInstitutesRoute() {
  return <SolutionPage data={coachingInstitutesData} />;
}

