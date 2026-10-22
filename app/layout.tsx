import type { Metadata } from "next";
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


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lmsdomain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LMS Domain | Modern AI-Powered Learning Platform",
    template: "%s | LMS Domain",
  },
  description: "Scale your academy with courses, live classes, assessments, payments, and Domie AI tutor in one flexible learning platform.",
  openGraph: {
    title: "LMS Domain | Modern AI-Powered Learning Platform",
    description: "Scale your academy with courses, live classes, assessments, payments, and Domie AI tutor in one flexible learning platform.",
    url: siteUrl,
    siteName: "LMS Domain",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LMS Domain | Modern AI-Powered Learning Platform",
    description: "Scale your academy with courses, live classes, assessments, payments, and Domie AI tutor in one flexible learning platform.",
  },
};

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
