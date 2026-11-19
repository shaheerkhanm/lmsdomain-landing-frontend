import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { mobileAppPlatformData } from "@/content/platform/mobile-app";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getPlatformPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: mobileAppPlatformData.metaTitle || fullTitle("Mobile apps | Platform"),
  description: mobileAppPlatformData.metaDescription || mobileAppPlatformData.title,
  alternates: { canonical: "/platform/mobile-app" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-mobile-app", guard: "platform" });
}

export default async function MobileAppRoute() {
  const content = await getPlatformPage("mobile-app");
  return <PlatformPage data={mobileAppPlatformData} content={content} />;
}
