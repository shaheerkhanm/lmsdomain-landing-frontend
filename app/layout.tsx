import type { Metadata, Viewport } from "next";
import { getSiteIdentity, iconUrls, DEFAULT_THEME_LIGHT, DEFAULT_THEME_DARK } from "@/lib/siteIdentity";
import { Urbanist, Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll"
import Canonical from "@/components/layout/Canonical";
import { Toaster } from "@/components/ui/sonner";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Optional for CSS variables
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], // Add weights you need
  variable: '--font-manrope', // Optional: to use as CSS variable
  display: 'swap',
})


// Icons: generated files (scripts/generate-icons.mjs), or the admin's icon from
// Settings > Cms > Site identity. The manifest link comes from app/manifest.ts.
export async function generateMetadata(): Promise<Metadata> {
  const icons = iconUrls(await getSiteIdentity());
  return {
    title: "LMS Domain",
    description: "LMS Domain Learning Management",
    applicationName: "LMS Domain",
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
  const { themeColor } = await getSiteIdentity();
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: themeColor || DEFAULT_THEME_LIGHT },
      { media: "(prefers-color-scheme: dark)", color: DEFAULT_THEME_DARK },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${inter.variable} ${manrope.variable} font-urbanist bg-[#F3F4F6] lg:bg-white text-[#161616] antialiased !mr-0`}>
        <Canonical />
        <Header />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster position="bottom-right" />
        <Footer />
      </body>
    </html>
  );
}
