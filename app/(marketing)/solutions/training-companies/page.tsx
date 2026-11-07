import type { Metadata } from "next";
import { SolutionPage } from "@/components/marketing/solutions/SolutionPage";
import { trainingCompaniesData } from "@/content/solutions/training-companies";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: trainingCompaniesData.metaTitle || fullTitle("Training Companies | Solutions"),
  description: trainingCompaniesData.metaDescription || trainingCompaniesData.title,
  alternates: { canonical: "/solutions/training-companies" },
};

export default function TrainingCompaniesRoute() {
  return <SolutionPage data={trainingCompaniesData} />;
}
