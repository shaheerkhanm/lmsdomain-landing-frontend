import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { managePlatformData } from "@/content/platform/manage";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: managePlatformData.metaTitle || fullTitle("Manage | Platform"),
  description: managePlatformData.metaDescription || managePlatformData.title,
  alternates: { canonical: "/platform/manage" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform-manage", guard: "platform" });
}

export default function ManageRoute() {
  return <PlatformPage data={managePlatformData} />;
}
