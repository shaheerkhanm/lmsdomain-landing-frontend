import type { Metadata } from "next";
import { SolutionV5Page } from "@/components/sections/SolutionsV5/SolutionV5Page";
import { LanguageHero } from "@/components/sections/SolutionsV5/language/LanguageHero";
import { languageTestPrepData } from "@/content/solutions/language-test-prep";
import { getHomeClients } from "@/lib/api/content";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: languageTestPrepData.metaTitle || fullTitle("Language & Test-Prep Academies | Solutions"),
  description: languageTestPrepData.metaDescription || languageTestPrepData.title,
  alternates: { canonical: "/solutions/language-test-prep-academies" },
};

export default async function LanguageAcademiesRoute() {
  const clientsData = await getHomeClients().catch(() => null);
  // Find IELTS Master or leading language partner logo
  const ieltsLogo =
    clientsData?.logos?.find((l) => /ielts/i.test(l.name || "")) ||
    clientsData?.logos?.[0];

  return (
    <SolutionV5Page
      data={languageTestPrepData}
      Hero={LanguageHero}
      pageName="Language & test-prep academies"
      clientLogo={ieltsLogo ? { name: ieltsLogo.name, logo: ieltsLogo.logo, url: ieltsLogo.url } : undefined}
    />
  );
}
