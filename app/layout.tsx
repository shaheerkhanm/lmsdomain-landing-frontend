import type { Metadata, Viewport } from "next";
import { getSiteIdentity, getBrand, iconUrls, DEFAULT_THEME_LIGHT, DEFAULT_THEME_DARK } from "@/lib/siteIdentity";
import { BrandProvider } from "@/lib/brand-context";
import { getMetadataBase, isProductionSite } from "@/lib/site";
import { Urbanist, Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll"
import Canonical from "@/components/layout/Canonical";
import { Toaster } from "@/components/ui/sonner";
import { getPageVisibility } from "@/lib/pages";
import { PageVisibilityProvider } from "@/lib/pages-context";
import { getSiteNavigation } from "@/lib/api/content";
import { MotionConfig } from "motion/react";
import DemoHashListener from "@/components/marketing/DemoHashListener";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});


// Icons: generated files (scripts/generate-icons.mjs), or the admin's icon from
// Settings > Cms > Site identity. The manifest link comes from app/manifest.ts.
export async function generateMetadata(): Promise<Metadata> {
  const icons = iconUrls(await getSiteIdentity());
  return {
    metadataBase: getMetadataBase(),
    title: "LMS Domain",
    description: "LMS Domain Learning Management",
    applicationName: "LMS Domain",
    robots: isProductionSite()
      ? undefined
      : {
          index: false,
          follow: false,
        },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        ...(icons.svg ? [{ url: icons.svg, type: "image/svg+xml" }] : []),
        { url: icons.png192, type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: icons.apple, type: "image/png", sizes: "180x180" }],
    },
    appleWebApp: { title: "LMS Domain" },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const identity = await getSiteIdentity().catch(() => ({} as import("@/lib/siteIdentity").SiteIdentity));
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: identity.themeColor || DEFAULT_THEME_LIGHT },
      { media: "(prefers-color-scheme: dark)", color: identity.themeColorDark || DEFAULT_THEME_DARK },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [visibility, siteNav, brand] = await Promise.all([
    getPageVisibility(),
    getSiteNavigation().catch(() => null),
    getBrand(),
  ]);

  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${inter.variable} ${manrope.variable} font-urbanist bg-[#F3F4F6] lg:bg-white text-[#161616] antialiased !mr-0`}>
        <BrandProvider brand={brand}>
          <PageVisibilityProvider visibility={visibility}>
            <MotionConfig reducedMotion="user">
              <Canonical />
              <Header siteNav={siteNav?.marketingNav} />
              <SmoothScroll>
                {children}
              </SmoothScroll>
              <DemoHashListener />
              <Toaster position="bottom-right" />
              <Footer />
            </MotionConfig>
          </PageVisibilityProvider>
        </BrandProvider>
      </body>
    </html>
  );
}
