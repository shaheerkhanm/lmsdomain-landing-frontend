import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { managePlatformData } from "@/content/platform/manage";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Manage | Platform"),
  description: managePlatformData.title,
  alternates: { canonical: "/platform/manage" },
};

export default function ManageRoute() {
  return <PlatformPage data={managePlatformData} />;
}
