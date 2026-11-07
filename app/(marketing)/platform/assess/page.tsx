import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { assessPlatformData } from "@/content/platform/assess";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: assessPlatformData.metaTitle || fullTitle("Assess | Platform"),
  description: assessPlatformData.metaDescription || assessPlatformData.title,
  alternates: { canonical: "/platform/assess" },
};

export default function AssessRoute() {
  return <PlatformPage data={assessPlatformData} />;
}
