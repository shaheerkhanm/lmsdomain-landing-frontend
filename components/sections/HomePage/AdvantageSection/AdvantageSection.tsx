import React from "react";
import AdvantageScrollMain from "./AdvantageScrollMain";

export function AdvantageSection({ data }: { data?: any }) {
  return (
    <section id="benefits" className="py-24 sm:py-36 bg-white font-inter relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header (Mota 00:24 Exact Style) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C4BFF] mb-3">
            <span>✦</span>
            <span className="uppercase tracking-widest text-[11px]">BENEFITS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight">
            Always sync yourself
          </h2>
        </div>

        {/* Angled Rotating Benefits Card Deck (Mota 00:24 - 00:27) */}
        <AdvantageScrollMain />
      </div>
    </section>
  );
}

export default AdvantageSection;