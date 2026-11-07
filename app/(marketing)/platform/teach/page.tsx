import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { teachPlatformData } from "@/content/platform/teach";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: teachPlatformData.metaTitle || fullTitle("Teach | Platform"),
  description: teachPlatformData.metaDescription || teachPlatformData.title,
  alternates: { canonical: "/platform/teach" },
};

export default function TeachRoute() {
  return <PlatformPage data={teachPlatformData} />;
}
