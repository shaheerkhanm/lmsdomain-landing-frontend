import React from "react";

export function FeaturesCards({ item }: { item: any }) {
  return (
    <div className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200/70 bg-white shadow-2xs hover:border-slate-300 transition-colors font-inter">
      <div className="size-10 rounded-lg bg-purple-50 border border-purple-100/80 flex items-center justify-center shrink-0">
        <img
          src={item?.image || "/assets/img/features/feature-icon-1.svg"}
          alt=""
          className="size-5 object-contain"
        />
      </div>
      <div className="space-y-1 min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-manrope leading-snug">
          {item?.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {item?.subTitle}
        </p>
      </div>
    </div>
  );
}

export default FeaturesCards;
