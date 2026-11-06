import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { brandPlatformData } from "@/content/platform/brand";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Brand | Platform"),
  description: brandPlatformData.title,
  alternates: { canonical: "/platform/brand" },
};

export default function BrandRoute() {
  return <PlatformPage data={brandPlatformData} />;
}
