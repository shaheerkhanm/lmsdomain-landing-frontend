import React from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/api/content";
import { NotFoundVisual } from "@/components/marketing/NotFoundVisual";
import { getMetadataBase } from "@/lib/site";

export const metadata = {
  metadataBase: getMetadataBase(),
  title: "Page Not Found | LMS Domain",
  description: "The requested page could not be found.",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const settings = await getSiteSettings().catch(() => null);
  const heading = settings?.footer?.heading || "Page not found";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 font-urbanist pt-36 sm:pt-44 pb-24 sm:pb-32 relative overflow-hidden bg-white">
      {/* Background Visual Cards (opacity 0.4, slow float) */}
      <NotFoundVisual />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Black 64px LogoMark */}
        <div className="size-16 rounded-2xl bg-[#161616] flex items-center justify-center mb-6 shadow-md">
          <img
            src="/assets/img/logo/mark-square.svg"
            alt="LMS Domain"
            className="size-9 object-contain"
          />
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-4">
          <span>✦</span>
          <span>404 Error</span>
        </div>

        {/* H1 Heading */}
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#161616] mb-4">
          {heading}
        </h1>

        {/* Short Line / Subtitle */}
        <p className="text-base sm:text-lg text-[#6B6F76] max-w-md mx-auto mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist, was removed, or has moved to a new URL.
        </p>

        {/* Two Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-[#161616] border border-[#ECEDEF] text-sm font-semibold hover:bg-[#F3F4F6] transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
