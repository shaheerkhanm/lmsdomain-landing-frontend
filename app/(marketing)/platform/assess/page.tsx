import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { assessPlatformData } from "@/content/platform/assess";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: assessPlatformData.metaTitle || fullTitle("Assess | Platform"),
  description: assessPlatformData.metaDescription || assessPlatformData.title,
  alternates: { canonical: "/platform/assess" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-assess", guard: "platform" });
}

export default function AssessRoute() {
  return <PlatformPage data={assessPlatformData} />;
}
