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
      className={`bg-white rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${
              isPremium
                ? "bg-[#EEE9FF] text-[#7B5CF5]"
                : "bg-[#F3F4F6] text-[#161616]"
            }`}
          >
            <FeatureIcon
              name={feature.icon}
              size={20}
              className={isPremium ? "text-[#7B5CF5]" : "text-[#161616]"}
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

