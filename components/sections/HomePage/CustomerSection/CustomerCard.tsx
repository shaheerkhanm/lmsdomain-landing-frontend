import React from "react";
import Link from "next/link";

export function CustomerCard({ item }: { item: any }) {
  const tags: string[] = Array.isArray(item?.tags) ? item.tags : [];

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all font-inter">
      <div className="space-y-4">
        {/* Visual Media with Subdued Tint */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
          <img
            src={item?.image || "/assets/img/customer/customer-1.jpg"}
            alt={item?.altImage || item?.title || "Customer segment"}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {item?.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[11px] font-bold text-slate-800 shadow-2xs border border-slate-200/80">
              {item.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-950 font-manrope leading-snug">
            {item?.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {item?.subTitle}
          </p>
        </div>

        {/* Feature Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200/70"
              >
                <span className="size-1 rounded-full bg-MainColor" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-slate-100 mt-4">
        <Link
          href="/pricing"
          className="text-xs font-semibold text-MainColor hover:underline inline-flex items-center gap-1"
        >
          <span>Explore Academy Configuration</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default CustomerCard;