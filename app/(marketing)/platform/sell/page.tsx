import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { sellPlatformData } from "@/content/platform/sell";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getPlatformPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: sellPlatformData.metaTitle || fullTitle("Sell | Platform"),
  description: sellPlatformData.metaDescription || sellPlatformData.title,
  alternates: { canonical: "/platform/sell" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-sell", guard: "platform" });
}

export default async function SellRoute() {
  const content = await getPlatformPage("sell");
  return <PlatformPage data={sellPlatformData} content={content} />;
}
