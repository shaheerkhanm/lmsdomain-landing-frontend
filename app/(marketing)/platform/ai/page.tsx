import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { aiPlatformData } from "@/content/platform/ai";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: aiPlatformData.metaTitle || fullTitle("Domie AI | Platform"),
  description: aiPlatformData.metaDescription || aiPlatformData.title,
  alternates: { canonical: "/platform/ai" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-ai", guard: "platform" });
}

export default function DomieAiRoute() {
  return <PlatformPage data={aiPlatformData} />;
}
