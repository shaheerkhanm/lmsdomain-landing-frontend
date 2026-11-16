import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { assessPlatformData } from "@/content/platform/assess";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getPlatformPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: assessPlatformData.metaTitle || fullTitle("Assess | Platform"),
  description: assessPlatformData.metaDescription || assessPlatformData.title,
  alternates: { canonical: "/platform/assess" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-assess", guard: "platform" });
}

export default async function AssessRoute() {
  const content = await getPlatformPage("assess");
  return <PlatformPage data={assessPlatformData} content={content} />;
}
