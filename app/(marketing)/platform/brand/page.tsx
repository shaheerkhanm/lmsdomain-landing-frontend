import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { brandPlatformData } from "@/content/platform/brand";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getPlatformPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: brandPlatformData.metaTitle || fullTitle("Brand | Platform"),
  description: brandPlatformData.metaDescription || brandPlatformData.title,
  alternates: { canonical: "/platform/brand" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-brand", guard: "platform" });
}

export default async function BrandRoute() {
  const content = await getPlatformPage("brand");
  return <PlatformPage data={brandPlatformData} content={content} />;
}
