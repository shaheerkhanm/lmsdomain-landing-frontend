import type { Metadata } from "next";
import { SolutionV5Page } from "@/components/sections/SolutionsV5/SolutionV5Page";
import { TrainingHero } from "@/components/sections/SolutionsV5/training/TrainingHero";
import { trainingCompaniesData } from "@/content/solutions/training-companies";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getSolutionPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: trainingCompaniesData.metaTitle || fullTitle("Training Companies | Solutions"),
  description: trainingCompaniesData.metaDescription || trainingCompaniesData.title,
  alternates: { canonical: "/solutions/training-companies" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "training-companies", guard: "training-companies" });
}

export default async function TrainingCompaniesRoute() {
  const content = await getSolutionPage("training-companies");
  return <SolutionV5Page data={trainingCompaniesData} content={content} Hero={TrainingHero} pageName="Training companies" />;
}
