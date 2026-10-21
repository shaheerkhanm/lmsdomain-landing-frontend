import React from "react";
import { PlusCircle } from "lucide-react";
import type { PricingAddOn } from "@/types/content";

interface PricingAddOnsProps {
  title?: string;
  items?: PricingAddOn[];
}

export function PricingAddOns({
  title = "Flexible Add-Ons",
  items = [],
}: PricingAddOnsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#F3F4F6] py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-left max-w-2xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-3.5">
            <span>✦</span>
            <span>MODULAR CAPACITY</span>
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-semibold leading-[1.15] tracking-tight text-[#161616] mb-3">
            {title}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#6B6F76] leading-relaxed">
            Attach dedicated capabilities to your base plan whenever your cohort size or security needs expand.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((addOn, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#ECEDEF] p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow text-left"
            >
              <div>
                <div className="size-10 rounded-2xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-5">
                  <PlusCircle className="w-5 h-5" />
                </div>

                <h3 className="text-[19px] sm:text-[21px] font-bold text-[#161616] tracking-tight mb-2">
                  {addOn.name}
                </h3>

                <p className="text-[14px] text-[#6B6F76] leading-relaxed mb-6">
                  {addOn.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F8FAFC] flex items-baseline justify-between">
                <span className="text-[20px] font-bold text-[#161616]">
                  {addOn.price}
                </span>
                {addOn.unit && (
                  <span className="text-xs text-[#8F94A0] font-medium">
                    {addOn.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingAddOns;

