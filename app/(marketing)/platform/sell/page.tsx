import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { sellPlatformData } from "@/content/platform/sell";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: sellPlatformData.metaTitle || fullTitle("Sell | Platform"),
  description: sellPlatformData.metaDescription || sellPlatformData.title,
  alternates: { canonical: "/platform/sell" },
};

export default function SellRoute() {
  return <PlatformPage data={sellPlatformData} />;
}
