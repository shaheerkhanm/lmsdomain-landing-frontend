import React from "react";

export interface FeatureRowProps {
  eyebrow?: string;
  title: string;
  description: string;
  tags?: string[];
  reversed?: boolean;
  visual: React.ReactNode;
  className?: string;
}

export function FeatureRow({
  eyebrow,
  title,
  description,
  tags,
  reversed = false,
  visual,
  className = "",
}: FeatureRowProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${className}`}
    >
      {/* Visual Block (stacks on top on mobile/tablet < 1024px) */}
      <div
        className={`w-full lg:col-span-6 ${
          reversed ? "lg:order-2" : "lg:order-1"
        } order-1`}
      >
        <div className="bg-[#F8FAFC] rounded-[28px] sm:rounded-[36px] border border-[#ECEDEF] p-6 sm:p-8 flex items-center justify-center overflow-hidden">
          {visual}
        </div>
      </div>

      {/* Text Block */}
      <div
        className={`w-full lg:col-span-6 ${
          reversed ? "lg:order-1" : "lg:order-2"
        } order-2 space-y-4`}
      >
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#7B5CF5]">
            <span>✦</span>
            <span>{eyebrow}</span>
          </div>
        )}

        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] leading-snug">
          {title}
        </h3>

        <p className="text-base text-[#6B6F76] leading-relaxed">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureRow;
