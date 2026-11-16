import React from "react";
import { Feature } from "@/types/content";
import { FeatureIcon } from "./FeatureIcon";

interface CompactFeatureCardProps {
  feature: Feature;
  className?: string;
}

export function CompactFeatureCard({
  feature,
  className = "",
}: CompactFeatureCardProps) {
  const isPremium = feature.isPremium;

  return (
    <div
      data-feature-slug={feature.slug}
      className={`group relative bg-white rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] hover:border-[#DFE1E6] p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 ease-out hover:-translate-y-1 cursor-default ${className}`}
    >
      {/* Deepening shadow via pseudo-element (avoids animating box-shadow directly for 60fps performance) */}
      <div className="absolute inset-0 rounded-[24px] sm:rounded-[28px] shadow-[0_12px_32px_rgba(0,0,0,0.07)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-11 h-11 rounded-[14px] flex items-center justify-center transition-colors duration-200 ${
              isPremium
                ? "bg-[#EEE9FF] text-[#7B5CF5] group-hover:bg-[#E2D9FF]"
                : "bg-[#F3F4F6] text-[#161616] group-hover:bg-[#EEE9FF] group-hover:text-[#7B5CF5]"
            }`}
          >
            <FeatureIcon
              name={feature.icon}
              size={20}
              className="transition-colors duration-200"
            />
          </div>

          {isPremium && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5] tracking-wide">
              Premium
            </span>
          )}
        </div>

        <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight mb-2 leading-snug">
          {feature.title}
        </h4>

        <p className="text-[15px] text-[#6B6F76] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default CompactFeatureCard;
