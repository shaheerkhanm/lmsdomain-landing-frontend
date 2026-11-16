import type { Metadata } from "next";
import { SolutionV5Page } from "@/components/sections/SolutionsV5/SolutionV5Page";
import { TrainingHero } from "@/components/sections/SolutionsV5/training/TrainingHero";
import { trainingCompaniesData } from "@/content/solutions/training-companies";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: trainingCompaniesData.metaTitle || fullTitle("Training Companies | Solutions"),
  description: trainingCompaniesData.metaDescription || trainingCompaniesData.title,
  alternates: { canonical: "/solutions/training-companies" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "training-companies", guard: "training-companies" });
}

export default function TrainingCompaniesRoute() {
  return <SolutionV5Page data={trainingCompaniesData} Hero={TrainingHero} pageName="Training companies" />;
}
