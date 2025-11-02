import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll"
import Canonical from "@/components/layout/Canonical";
import { Toaster } from "@/components/ui/sonner";

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


export const metadata: Metadata = {
  title: "LMS Domain",
  description: "LMS Domain Learning Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} antialiased !mr-0`}>
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
