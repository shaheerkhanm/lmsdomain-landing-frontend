import React from "react";
import StackedAcademyDeck from "./StackedAcademyDeck";

export function CustomerSection({ data }: { data?: any }) {
  return (
    <section className="py-24 sm:py-36 bg-white font-inter relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative flex flex-col items-center justify-center">
        {/* Giant Watermark Typography "Wall of love" (Mota 00:28 - 00:31 Exact Backdrop) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none text-center z-0">
          <span className="text-6xl sm:text-8xl lg:text-[130px] font-extrabold tracking-tight text-slate-900 leading-none whitespace-nowrap block">
            Wall of love
          </span>
        </div>

        {/* Foreground Stacked Social Proof Cards */}
        <div className="relative z-10 w-full pt-8 sm:pt-12">
          <StackedAcademyDeck />
        </div>
      </div>
    </section>
  );
}

export default CustomerSection;