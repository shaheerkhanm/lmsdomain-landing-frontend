import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { teachPlatformData } from "@/content/platform/teach";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: teachPlatformData.metaTitle || fullTitle("Teach | Platform"),
  description: teachPlatformData.metaDescription || teachPlatformData.title,
  alternates: { canonical: "/platform/teach" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-teach", guard: "platform" });
}

export default function TeachRoute() {
  return <PlatformPage data={teachPlatformData} />;
}
