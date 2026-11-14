"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice, type PricingCurrency } from "@/config/pricing";
import { DemoButton } from "./DemoButton";

/**
 * Compact pricing on the homepage. Full plans and comparison live on /pricing.
 * Shows INR to visitors in India and USD to everyone else.
 */
export function PricingBand({
  fromPrice,
  trialDays = 15,
}: {
  fromPrice: { INR: number | null; USD: number | null };
  trialDays?: number;
}) {
  const [currency, setCurrency] = useState<PricingCurrency>("USD");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") setCurrency("INR");
    } catch {
      /* keep USD */
    }
  }, []);

  const amount = fromPrice[currency] ?? fromPrice.USD ?? fromPrice.INR;
  const shownCurrency: PricingCurrency = fromPrice[currency] != null ? currency : fromPrice.USD != null ? "USD" : "INR";

  const points = [
    "0% commission on every sale",
    "Your own domain on every plan",
    `${trialDays}-day free trial on every plan`,
    "Setup and migration help included",
  ];

  return (
    <section id="pricing" className="bg-white pb-[clamp(72px,9vw,120px)]">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)]">
        <div className="rv-v4 grid overflow-hidden rounded-[28px] bg-[#F4F5F8] lg:grid-cols-[1.2fr_1fr]">
          <div className="p-8 sm:p-12">
            <p className="inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A]">
              Pricing
            </p>
            <h2 className="mt-5 font-urbanist text-[clamp(30px,3.8vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0A0A0B] [text-wrap:balance]">
              Simple plans that grow with your academy
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[15px] text-[#3F3F46]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-6 border-t border-[#E4E4E7] bg-white/60 p-8 sm:p-12 lg:border-l lg:border-t-0">
            {amount != null && (
              <div>
                <p className="text-[14px] text-[#71717A]">Plans start from</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-urbanist text-[56px] font-semibold leading-none tracking-[-0.04em] text-[#0A0A0B] tabular-nums">
                    {formatPrice(amount, shownCurrency)}
                  </span>
                  <span className="text-[15px] text-[#71717A]">/ month</span>
                </p>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pricing"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#0A0A0B] px-5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#27272A]"
              >
                Compare plans
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <DemoButton
                label="Book a demo"
                variant="light"
                className="border border-[#E4E4E7] [&>svg]:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
