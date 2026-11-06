import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { aiPlatformData } from "@/content/platform/ai";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Domie AI | Platform"),
  description: aiPlatformData.title,
  alternates: { canonical: "/platform/ai" },
};

export default function DomieAiRoute() {
  return <PlatformPage data={aiPlatformData} />;
}
