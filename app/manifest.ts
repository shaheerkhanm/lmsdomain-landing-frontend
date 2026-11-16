import type { MetadataRoute } from "next";
import { getSiteIdentity, iconUrls, DEFAULT_THEME_LIGHT } from "@/lib/siteIdentity";

// /manifest.webmanifest (linked automatically). Icons and theme colour follow
// Settings > Cms > Site identity, else the generated files.
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const identity = await getSiteIdentity();
  const icons = iconUrls(identity);
  return {
    name: "LMS Domain",
    short_name: "LMS Domain",
    description: "Build, sell and run your online academy.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: identity.themeColor || DEFAULT_THEME_LIGHT,
    icons: [
      { src: icons.png192, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: icons.png512, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: icons.maskable512, sizes: "512x512", type: "image/png", purpose: "maskable" },
      ...(icons.svg ? [{ src: icons.svg, sizes: "any", type: "image/svg+xml", purpose: "any" as const }] : []),
    ],
  };
}
