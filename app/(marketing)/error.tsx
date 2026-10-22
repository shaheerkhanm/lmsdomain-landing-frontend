"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring if needed
    console.error("Marketing route error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 font-urbanist pt-32 pb-24 relative overflow-hidden bg-white">
      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Brand Icon Container */}
        <div className="size-16 rounded-2xl bg-[#161616] flex items-center justify-center mb-6 shadow-md">
          <img
            src="/assets/img/logo/mark-square.svg"
            alt="LMS Domain"
            className="size-9 object-contain"
          />
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1F2] text-[#E11D48] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#FFE4E6]">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Temporary Connection Issue</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#161616] mb-3">
          Unable to Load Page Content
        </h1>

        {/* Subtitle Message */}
        <p className="text-base text-[#6B6F76] max-w-md mx-auto mb-8 leading-relaxed">
          We&apos;re currently unable to retrieve content from the server. This may be due to a temporary maintenance window or network disruption.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-[#161616] text-sm font-semibold border border-[#ECEDEF] hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

