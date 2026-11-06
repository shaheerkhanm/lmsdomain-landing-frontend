import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/platform";
import { securityPlatformData } from "@/content/platform/security";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Security | Platform"),
  description: securityPlatformData.title,
  alternates: { canonical: "/platform/security" },
};

export default function SecurityRoute() {
  return <PlatformPage data={securityPlatformData} />;
}
