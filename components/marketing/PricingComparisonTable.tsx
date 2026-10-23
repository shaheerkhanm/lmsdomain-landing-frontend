"use client";

import React, { useState } from "react";
import { Check, Minus, Info } from "lucide-react";
import type { Plan, PricingComparison, BillingPeriodId } from "@/types/content";

interface PricingComparisonTableProps {
  plans: Plan[];
  comparison: PricingComparison;
  period: BillingPeriodId;
  onRequestDemo: (planName: string) => void;
}

export function PricingComparisonTable({
  plans,
  comparison,
  period,
  onRequestDemo,
}: PricingComparisonTableProps) {
  const [selectedMobilePlan, setSelectedMobilePlan] = useState<string>(
    plans[0]?.id || "starter"
  );

  if (!comparison || comparison.groups.length === 0 || plans.length === 0) {
    return null;
  }

  const activeMobilePlan = plans.find((p) => p.id === selectedMobilePlan) || plans[0];

  const headerCellClass = "py-4 px-4 bg-white shadow-[inset_0_-1px_0_#ECEDEF]";

  const renderCellValue = (val: boolean | string | undefined) => {
    if (val === true) {
      return (
        <div className="inline-flex items-center justify-center size-6 rounded-full bg-[#EEE9FF] text-[#7B5CF5]">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      );
    }
    if (val === false || val === undefined) {
      return <Minus className="w-4 h-4 text-[#C9CCD1] inline-block" />;
    }
    return <span className="text-xs sm:text-sm font-semibold text-[#161616]">{val}</span>;
  };

  return (
    <section className="bg-white py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-left max-w-2xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-3.5">
            <span>✦</span>
            <span>DETAILED COMPARISON</span>
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-semibold leading-[1.15] tracking-tight text-[#161616] mb-3">
            Compare Plans & Capabilities
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#6B6F76] leading-relaxed">
            See exactly what features, quotas, and premium add-ons are included in each academy tier.
          </p>
        </div>

        {/* ==================================================================== */}
        {/* DESKTOP TABLE (>= 768px): Real <table>, sticky header */}
        {/* ==================================================================== */}
        {/* No overflow wrapper: a scrolling ancestor would stop the header from sticking to the page */}
        <div className="hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Detailed feature comparison by plan</caption>

            {/* Sticky Header Row: solid white across the full width, bottom rule drawn
                as an inset shadow (collapsed borders do not stick), above the rows */}
            <thead className="sticky top-0 lg:top-20 z-30 bg-white">
              <tr className="bg-white">
                <th scope="col" className={`${headerCellClass} text-xs font-bold uppercase tracking-wider text-[#8F94A0] w-1/3`}>
                  Compare plans
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} scope="col" className={`${headerCellClass} text-center`}>
                    <span className="text-sm sm:text-base font-bold text-[#161616] block mb-1">
                      {plan.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        plan.cta.action === "demo"
                          ? onRequestDemo(plan.name)
                          : (window.location.href = `/signup?plan=${plan.slug || plan.id}&billing=${period}`)
                      }
                      className="px-3.5 py-1.5 rounded-full bg-[#161616] text-white text-[11px] font-semibold hover:bg-black transition-all cursor-pointer shadow-2xs"
                    >
                      {plan.cta.label}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Comparison Groups */}
            <tbody className="divide-y divide-[#ECEDEF]">
              {comparison.groups.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  {/* Group Header Row */}
                  <tr className="bg-[#F8FAFC]">
                    <th
                      colSpan={plans.length + 1}
                      scope="colgroup"
                      className="py-3 px-4 text-[13px] font-bold uppercase tracking-wider text-[#6B6F76]"
                    >
                      {group.title}
                    </th>
                  </tr>

                  {/* Feature Rows */}
                  {group.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                      <th scope="row" className="py-3.5 px-4 font-normal text-[15px] text-[#161616]">
                        <div className="flex items-center gap-1.5">
                          <span>{row.label}</span>
                          {row.tooltip && (
                            <span title={row.tooltip} className="cursor-help text-[#8F94A0] hover:text-[#161616] transition-colors">
                              <Info className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </th>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-3.5 px-4 text-center">
                          {renderCellValue(row.values[plan.id] ?? row.values[plan.slug || ""])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==================================================================== */}
        {/* MOBILE VIEW (< 768px): Plan Picker segmented control + rows list */}
        {/* ==================================================================== */}
        <div className="md:hidden space-y-6">
          {/* Segmented Control Picker */}
          <div className="flex bg-[#F3F4F6] p-1 rounded-xl">
            {plans.map((plan) => {
              const isSelected = plan.id === selectedMobilePlan;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedMobilePlan(plan.id)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isSelected ? "bg-white text-[#161616] shadow-xs" : "text-[#6B6F76]"
                  }`}
                >
                  {plan.name}
                </button>
              );
            })}
          </div>

          {/* Plan Selected Details */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#ECEDEF] p-5 space-y-6">
            {comparison.groups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F94A0] block pb-1 border-b border-[#ECEDEF]">
                  {group.title}
                </span>

                <div className="space-y-2.5">
                  {group.rows.map((row, rIdx) => {
                    const val = row.values[activeMobilePlan.id] ?? row.values[activeMobilePlan.slug || ""];
                    return (
                      <div key={rIdx} className="flex items-center justify-between text-xs py-1">
                        <span className="text-[#161616] font-medium pr-2">{row.label}</span>
                        <div>{renderCellValue(val)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingComparisonTable;
