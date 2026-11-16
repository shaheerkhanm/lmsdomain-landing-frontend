import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { sellPlatformData } from "@/content/platform/sell";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: sellPlatformData.metaTitle || fullTitle("Sell | Platform"),
  description: sellPlatformData.metaDescription || sellPlatformData.title,
  alternates: { canonical: "/platform/sell" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-sell", guard: "platform" });
}

export default function SellRoute() {
  return <PlatformPage data={sellPlatformData} />;
}
