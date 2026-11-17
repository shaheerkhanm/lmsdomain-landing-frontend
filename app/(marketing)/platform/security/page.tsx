import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { securityPlatformData } from "@/content/platform/security";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getPlatformPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: securityPlatformData.metaTitle || fullTitle("Security | Platform"),
  description: securityPlatformData.metaDescription || securityPlatformData.title,
  alternates: { canonical: "/platform/security" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-security", guard: "platform" });
}

export default async function SecurityRoute() {
  const content = await getPlatformPage("security");
  return <PlatformPage data={securityPlatformData} content={content} />;
}
