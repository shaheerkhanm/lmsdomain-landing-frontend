"use client";

import React, { useState } from "react";
import { Check, Minus, Info, ChevronDown } from "lucide-react";
import type { Plan, PricingComparison, BillingPeriodId } from "@/types/content";
import { usePageVisibility } from "@/lib/pages-context";
import { SectionHeading } from "@/components/sections/HomeV5/primitives";

interface PricingComparisonTableProps {
  plans: Plan[];
  comparison: PricingComparison;
  period: BillingPeriodId;
  onRequestDemo: (planName: string, planSlug?: string) => void;
  heading?: { eyebrow: string; title: string; subtitle: string; cornerLabel: string };
  /** Slug of the highlighted plan (from the pricing plans), used to tint its column. */
  popularSlug?: string;
}

const DEFAULT_HEADING = {
  eyebrow: "Compare plans",
  title: "Compare every feature",
  subtitle: "See exactly what each plan includes, from learner limits to features and support.",
  cornerLabel: "Features",
};

export function PricingComparisonTable({
  plans,
  comparison,
  period,
  onRequestDemo,
  heading = DEFAULT_HEADING,
  popularSlug,
}: PricingComparisonTableProps) {
  const { isPathVisible } = usePageVisibility();
  const isSignupVisible = isPathVisible("/signup");
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_GROUPS = 3;
  const [selectedMobilePlan, setSelectedMobilePlan] = useState<string>(
    plans[0]?.id || "starter"
  );

  if (!comparison || comparison.groups.length === 0 || plans.length === 0) {
    return null;
  }

  const activeMobilePlan = plans.find((p) => p.id === selectedMobilePlan) || plans[0];

  // "LIMITS & QUOTAS" -> "Limits & quotas", keeping acronyms like AI, SMS, GST
  const ACRONYMS = new Set(["AI", "SMS", "GST", "SSL", "API", "B2B", "B2C", "SEO", "UPI", "SLA"]);
  const sentenceCase = (t: string) => {
    if (t !== t.toUpperCase()) return t;
    return t
      .split(" ")
      .map((w, i) => (ACRONYMS.has(w) ? w : i === 0 ? w.charAt(0) + w.slice(1).toLowerCase() : w.toLowerCase()))
      .join(" ");
  };

  const isPopular = (plan: Plan) =>
    Boolean(popularSlug) && (plan.slug || plan.id || "").toLowerCase() === popularSlug!.toLowerCase();
  const cleanEyebrow = heading.eyebrow.replace(/[✦*]/g, "").trim();
  const eyebrow = cleanEyebrow === cleanEyebrow.toUpperCase()
    ? cleanEyebrow.charAt(0) + cleanEyebrow.slice(1).toLowerCase()
    : cleanEyebrow;

  const valueOf = (row: PricingComparison["groups"][number]["rows"][number], plan: Plan) => {
    const planKey = (plan.slug || plan.id || plan.name || "").toLowerCase();
    return row.values[planKey] ?? row.values[plan.id] ?? row.values[plan.slug || ""];
  };

  const renderCellValue = (val: boolean | string | undefined) => {
    if (val === true) {
      return (
        <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-[#6C4BFF]" role="img" aria-label="Included">
          <Check className="h-3 w-3 text-white" strokeWidth={3.5} aria-hidden="true" />
        </span>
      );
    }
    if (val === false || val === undefined) {
      return <Minus className="inline-block h-4 w-4 text-[#D4D4D8]" aria-label="Not included" />;
    }
    return <span className="text-[14px] font-medium text-[#0A0A0B]">{val}</span>;
  };

  return (
    <section className="bg-white py-[clamp(80px,10vw,136px)] font-sans">
      <div className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)]">
        <SectionHeading eyebrow={eyebrow} title={heading.title} subtitle={heading.subtitle} />

        {/* DESKTOP TABLE (>= 768px). No overflow wrapper, so the header can stick to the page. */}
        <div className="rv-v4 mt-12 hidden md:block lg:mt-16">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">Detailed feature comparison by plan</caption>
            <thead className="sticky top-0 z-30 min-[900px]:top-[84px]">
              <tr>
                <th
                  scope="col"
                  className="w-[34%] border-b border-[#E4E4E7] bg-white px-4 pb-4 pt-5 align-bottom text-[13px] font-medium text-[#71717A]"
                >
                  {heading.cornerLabel}
                </th>
                {plans.map((plan) => {
                  const pop = isPopular(plan);
                  return (
                    <th
                      key={plan.id}
                      scope="col"
                      className={`border-b border-[#E4E4E7] px-3 pb-4 pt-5 text-center align-bottom ${
                        pop ? "rounded-t-[16px] bg-[#F4F5F8]" : "bg-white"
                      }`}
                    >
                      {pop && <span className="mb-1 block text-[11.5px] font-semibold text-[#6C4BFF]">Most popular</span>}
                      <span className="mb-2.5 block font-urbanist text-[17px] font-semibold text-[#0A0A0B]">{plan.name}</span>
                      <button
                        type="button"
                        onClick={() => onRequestDemo(plan.name, plan.slug || plan.id)}
                        className={`inline-flex h-8 cursor-pointer items-center whitespace-nowrap rounded-full px-3.5 text-[12px] font-semibold transition-colors ${
                          pop
                            ? "bg-[#0A0A0B] text-white hover:bg-[#27272A]"
                            : "border border-[#E4E4E7] bg-white text-[#0A0A0B] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        {plan.cta.label || "Choose plan"}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {comparison.groups.map((group, gIdx) => (
              <tbody key={gIdx} className={!expanded && gIdx >= VISIBLE_GROUPS ? "hidden" : undefined}>
                <tr>
                  <th
                    colSpan={plans.length + 1}
                    scope="colgroup"
                    className="px-4 pb-3 pt-9 text-[15px] font-semibold text-[#0A0A0B]"
                  >
                    {sentenceCase(group.title)}
                  </th>
                </tr>
                {group.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="group">
                    <th
                      scope="row"
                      className="border-t border-[#F1F1F4] px-4 py-3.5 text-[14.5px] font-normal text-[#3F3F46] transition-colors group-hover:bg-[#FAFAFB]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{row.label}</span>
                        {row.tooltip && (
                          <span title={row.tooltip} className="cursor-help text-[#A1A1AA] transition-colors hover:text-[#0A0A0B]">
                            <Info className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={`border-t border-[#F1F1F4] px-3 py-3.5 text-center transition-colors ${
                          isPopular(plan) ? "bg-[#F4F5F8]" : "group-hover:bg-[#FAFAFB]"
                        }`}
                      >
                        {renderCellValue(valueOf(row, plan))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        {comparison.groups.length > VISIBLE_GROUPS && (
          <div className="mt-8 hidden justify-center md:flex">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-5 text-[14px] font-semibold text-[#0A0A0B] transition-colors hover:border-[#D4D4D8]"
            >
              {expanded
                ? "Show fewer features"
                : `Show all features (${comparison.groups.slice(VISIBLE_GROUPS).reduce((n, g) => n + g.rows.length, 0)} more)`}
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        {/* MOBILE (< 768px): plan picker + list for the chosen plan */}
        <div className="mt-10 space-y-5 md:hidden">
          <div className="flex rounded-full bg-[#F1F1F4] p-1">
            {plans.map((plan) => {
              const isSelected = plan.id === selectedMobilePlan;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedMobilePlan(plan.id)}
                  className={`flex-1 rounded-full py-2 text-[13px] font-semibold transition-all ${
                    isSelected ? "bg-white text-[#0A0A0B] shadow-[0_1px_2px_rgba(10,10,11,0.08)]" : "text-[#65656E]"
                  }`}
                >
                  {plan.name}
                </button>
              );
            })}
          </div>

          <div className="space-y-6 rounded-[24px] bg-[#F4F5F8] p-5">
            {comparison.groups.map((group, gIdx) => (
              <div key={gIdx} className={!expanded && gIdx >= VISIBLE_GROUPS ? "hidden" : undefined}>
                <p className="pb-2 text-[14px] font-semibold text-[#0A0A0B]">
                  {sentenceCase(group.title)}
                </p>
                <div className="divide-y divide-[#E9E9EE] rounded-[14px] bg-white px-4">
                  {group.rows.map((row, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-between gap-3 py-3 text-[13.5px]">
                      <span className="text-[#3F3F46]">{row.label}</span>
                      <div className="shrink-0">{renderCellValue(valueOf(row, activeMobilePlan))}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {comparison.groups.length > VISIBLE_GROUPS && (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#E4E4E7] bg-white text-[14px] font-semibold text-[#0A0A0B]"
              >
                {expanded ? "Show fewer features" : "Show all features"}
                <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            )}
            <button
              type="button"
              onClick={() => onRequestDemo(activeMobilePlan.name, activeMobilePlan.slug || activeMobilePlan.id)}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0A0A0B] text-[14px] font-semibold text-white"
            >
              {activeMobilePlan.cta.label || "Choose plan"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingComparisonTable;
