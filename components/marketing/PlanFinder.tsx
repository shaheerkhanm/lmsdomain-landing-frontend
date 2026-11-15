"use client";

import React, { useId, useMemo, useState } from "react";
import { ArrowRight, Users, UserCog } from "lucide-react";
import type { BillingPeriodId } from "@/types/content";
import { formatPrice, computePlanPricing, type PricingPlanV2, type PricingCurrency } from "@/config/pricing";

const STEPS = [100, 250, 500, 1000, 2000, 3500, 5000, 7500, 10000];

/**
 * "How many learners do you have?" slider that points to the right plan.
 * Uses each plan's active-learner limit from Admin > Pricing, so it stays in sync.
 */
export function PlanFinder({
  plans,
  currency,
  period,
  annualMode,
  monthsFree,
  taxLabel,
  isResolved,
  onChoose,
}: {
  plans: PricingPlanV2[];
  currency: PricingCurrency;
  period: BillingPeriodId;
  annualMode: "monthsFree" | "percent";
  monthsFree: number;
  taxLabel: string;
  isResolved: boolean;
  onChoose: (plan: PricingPlanV2) => void;
}) {
  const id = useId();
  const sized = useMemo(
    () =>
      plans
        .filter((p) => typeof p.limits?.activeLearners === "number" && !p.isCustom)
        .sort((a, b) => (a.limits.activeLearners as number) - (b.limits.activeLearners as number)),
    [plans]
  );
  const custom = plans.find((p) => p.isCustom || p.limits?.activeLearners === "Custom");
  const [step, setStep] = useState(2);

  if (sized.length < 2) return null;

  const learners = STEPS[step];
  const isMax = step === STEPS.length - 1;
  const match = (!isMax && sized.find((p) => (p.limits.activeLearners as number) >= learners)) || custom || sized[sized.length - 1];
  const pricing = computePlanPricing(match, currency, annualMode, monthsFree, taxLabel);
  const price = match.isCustom ? null : period === "yearly" ? pricing.perMonthEquivalent : pricing.monthly;
  const pct = (step / (STEPS.length - 1)) * 100;
  const fmt = (n: number) => n.toLocaleString("en-US");
  const limit = (v: number | "Custom" | undefined, unit: string) =>
    typeof v === "number" ? `Up to ${fmt(v)} ${unit}` : `Custom ${unit}`;

  return (
    <section aria-labelledby={`${id}-title`} className="bg-white pt-[clamp(56px,7vw,96px)]">
      <div className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)]">
        <div className="rv-v4 relative isolate overflow-hidden rounded-[32px] bg-[#0B0A12] p-6 text-white sm:p-10 lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 -top-40 h-[480px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.45),transparent)] blur-2xl" />
            <div className="absolute -bottom-48 right-[-120px] h-[420px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(59,91,255,0.28),transparent)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_70%_80%_at_30%_40%,#000,transparent_75%)]" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            {/* Question + slider */}
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[13px] font-medium text-[#E4E4E7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A99BFF]" aria-hidden="true" />
                Plan finder
              </p>
              <h2
                id={`${id}-title`}
                className="mt-5 font-urbanist text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]"
              >
                Find the right plan in{" "}
                <span className="text-[#A99BFF]">five seconds</span>
              </h2>
              <p className="mt-3 max-w-[460px] text-[15.5px] leading-[1.6] text-[#A1A1AA]">
                Move the slider to how many learners use your academy in a month. We&apos;ll show the plan that fits.
              </p>

              <div className="mt-10">
                <div className="flex items-end justify-between">
                  <label htmlFor={`${id}-range`} className="text-[14px] font-medium text-[#D4D4D8]">
                    Active learners per month
                  </label>
                  <output
                    htmlFor={`${id}-range`}
                    className="font-urbanist text-[32px] font-semibold leading-none tracking-[-0.03em] tabular-nums"
                  >
                    {fmt(learners)}
                    {isMax ? "+" : ""}
                  </output>
                </div>
                <input
                  id={`${id}-range`}
                  type="range"
                  min={0}
                  max={STEPS.length - 1}
                  step={1}
                  value={step}
                  onChange={(e) => setStep(Number(e.target.value))}
                  aria-valuetext={`${fmt(learners)}${isMax ? " or more" : ""} learners`}
                  style={{ "--p": `${pct}%` } as React.CSSProperties}
                  className="plan-range mt-5 w-full cursor-pointer"
                />
                <div className="mt-3 flex justify-between text-[12px] text-[#71717A]" aria-hidden="true">
                  <span>100</span>
                  <span>1,000</span>
                  <span>5,000</span>
                  <span>10,000+</span>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ "--d": "150ms" } as React.CSSProperties} className="v5-pop rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
              <p className="text-[13px] font-medium text-[#A99BFF]">Recommended for you</p>
              <div className="mt-2 flex items-center gap-2.5">
                <p className="font-urbanist text-[28px] font-semibold tracking-[-0.02em]">{match.name}</p>
                {match.isPopular && (
                  <span className="rounded-full bg-[#6C4BFF] px-2.5 py-0.5 text-[11px] font-semibold">Most popular</span>
                )}
              </div>
              <div key={match.slug} className={`pf-swap mt-4 min-h-[60px] ${!isResolved ? "invisible" : ""}`} aria-live="polite">
                {price !== null ? (
                  <>
                    <p className="flex items-baseline gap-1.5">
                      <span className="font-urbanist text-[44px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                        {formatPrice(price, currency)}
                      </span>
                      <span className="text-[14px] text-[#A1A1AA]">/ month</span>
                    </p>
                    <p className="mt-1.5 text-[12.5px] text-[#A1A1AA]">
                      {period === "yearly" ? "Billed yearly" : "Billed monthly"} {taxLabel}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-urbanist text-[44px] font-semibold leading-none tracking-[-0.04em]">Custom</p>
                    <p className="mt-1.5 text-[12.5px] text-[#A1A1AA]">Priced for your academy</p>
                  </>
                )}
              </div>
              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-[14px] text-[#D4D4D8]">
                <li className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 text-[#A99BFF]" aria-hidden="true" />
                  {limit(match.limits?.activeLearners, "active learners")}
                </li>
                <li className="flex items-center gap-2.5">
                  <UserCog className="h-4 w-4 text-[#A99BFF]" aria-hidden="true" />
                  {limit(match.limits?.teamSeats, "team seats")}
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onChoose(match)}
                className="group mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white text-[14.5px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F1EDFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {match.isCustom ? "Talk to sales" : `Choose ${match.name}`}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanFinder;
