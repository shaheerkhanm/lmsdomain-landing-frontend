"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-[#161616] antialiased">
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="size-16 rounded-2xl bg-[#161616] flex items-center justify-center mb-6 shadow-md">
              <span className="text-white text-2xl font-bold">✦</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1F2] text-[#E11D48] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#FFE4E6]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Application Error</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[#161616] mb-3">
              Something went wrong
            </h1>

            <p className="text-base text-[#6B6F76] max-w-sm mx-auto mb-8 leading-relaxed">
              An unexpected error occurred. Please try reloading the page.
            </p>

            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

