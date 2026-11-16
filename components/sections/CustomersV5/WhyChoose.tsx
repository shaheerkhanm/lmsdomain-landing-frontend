import React from "react";
import { Check, Lock, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "@/components/sections/HomeV5/primitives";
import { BrandMark, LmsDomainMark } from "@/components/brand/PartnerMarks";

/*
 * "Why academies choose LMS Domain": four reasons, each with a small animated product visual.
 * Claims match pricing (0% commission, own domain on every plan, setup help) and the platform.
 */

const panel = "rounded-[14px] border border-[#EDEDF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_12px_32px_-14px_rgba(16,16,24,0.18)]";
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function CommissionArt() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-5">
      <div style={d(100)} className={cn("v5-pop flex w-full max-w-[250px] items-center gap-2.5 p-2.5", panel)}>
        <BrandMark name="Stripe" size={32} round />
        <span className="flex-1 text-[12px] font-semibold text-[#18181B]">Course sale · Stripe</span>
        <span className="text-[13px] font-semibold tabular-nums">$249.00</span>
      </div>
      <div style={d(250)} className={cn("v5-pop flex w-full max-w-[250px] items-center justify-between px-3 py-2 text-[12px]", panel)}>
        <span className="text-[#71717A]">LMS Domain commission</span>
        <span className="font-semibold text-[#15803D]">$0.00</span>
      </div>
      <div style={d(400)} className="v5-pop flex w-full max-w-[250px] items-center justify-between rounded-[14px] bg-[#0A0A0B] px-3 py-2.5 text-white">
        <span className="text-[12px] text-white/70">You receive</span>
        <span className="font-urbanist text-[18px] font-semibold tabular-nums">$249.00</span>
      </div>
    </div>
  );
}

function DomainArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5">
      <div className={cn("v5-pop v5-lift w-full max-w-[270px] overflow-hidden", panel)}>
        <div className="flex items-center gap-1.5 border-b border-[#F1F1F4] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-2 inline-flex min-w-0 items-center gap-1 truncate rounded-[6px] bg-[#F4F4F5] px-2 py-0.5 text-[10.5px] text-[#52525B]">
            <Lock className="h-2.5 w-2.5 shrink-0 text-[#16A34A]" /> learn.youracademy.com
          </span>
        </div>
        <div className="p-3">
          <div className="rounded-[10px] bg-[#0F766E] p-3">
            <p className="text-[12.5px] font-semibold text-white">Your academy, your brand</p>
            <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#0F766E]">Enrol now</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["#E6F4F1", "#FEF4E2", "#E7F3FD"].map((c) => (
              <span key={c} className="h-8 rounded-[7px]" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SetupArt() {
  const rows = [
    { t: "Courses imported", done: true },
    { t: "Domain connected", done: true },
    { t: "Payment gateway", done: false },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5">
      <div className={cn("v5-pop w-full max-w-[250px] p-3.5", panel)}>
        <div className="flex items-center justify-between">
          <p className="text-[12.5px] font-semibold text-[#18181B]">Setting up with our team</p>
          <span className="text-[11.5px] font-semibold text-[#6C4BFF]">85%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1EDFF]">
          <div className="v5-fill h-full w-[85%] rounded-full bg-[#6C4BFF]" style={{ "--w": "85%" } as React.CSSProperties} />
        </div>
        <div className="mt-3 space-y-2">
          {rows.map((r, i) => (
            <p key={r.t} style={d(200 + i * 120)} className="v5-pop flex items-center gap-2 text-[12px] text-[#27272A]">
              <span className={cn("grid h-5 w-5 place-items-center rounded-full", r.done ? "bg-[#E8F7EF] text-[#15803D]" : "bg-[#F4F4F5] text-[#71717A]")}>
                {r.done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Loader2 className="h-3 w-3 animate-spin" />}
              </span>
              {r.t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function OnePlatformArt() {
  const tools = ["Video host", "Test forms", "Spreadsheet", "Pay links"];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 px-4">
      <div className="space-y-1.5">
        {tools.map((t, i) => (
          <span
            key={t}
            style={d(i * 90)}
            className="v5-pop flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#E4E4E7] bg-white px-2.5 py-1 text-[11px] text-[#9A9AA6] line-through decoration-[#D4D4D8]"
          >
            <X className="h-3 w-3 text-[#B91C1C]" strokeWidth={3} /> {t}
          </span>
        ))}
      </div>
      <span className="mo-flow h-[2px] w-6 shrink-0 rounded-full" />
      <div style={d(450)} className="v5-pop grid h-[92px] w-[92px] place-items-center rounded-[22px] bg-[#0A0A0B] text-center text-white shadow-[0_20px_40px_-18px_rgba(10,10,11,0.6)]">
        <div>
          <LmsDomainMark size={28} className="mx-auto block" />
          <p className="mt-1.5 text-[10.5px] font-semibold leading-tight">One login</p>
        </div>
      </div>
    </div>
  );
}

const REASONS = [
  { t: "0% commission", b: "Payments go straight to your account. We never take a cut of your sales.", Art: CommissionArt },
  { t: "Your own domain", b: "Every plan runs on your own web address, with your logo and colours.", Art: DomainArt },
  { t: "Setup help from our team", b: "We help you get courses, domain and payments ready, so you launch fast.", Art: SetupArt },
  { t: "One platform, not five", b: "Teaching, tests, payments and your website in one place, with one login.", Art: OnePlatformArt },
];

export function WhyChoose() {
  return (
    <section className="bg-white pt-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading eyebrow="Why academies switch" title="Why academies choose LMS Domain" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {REASONS.map(({ t, b, Art }, i) => (
            <div
              key={t}
              style={{ "--rv-delay": `${i * 110}ms` } as React.CSSProperties}
              className="rv-v4 group flex flex-col overflow-hidden rounded-[28px] bg-[#F4F5F8] transition-[translate] duration-500 hover:-translate-y-1"
            >
              <div aria-hidden="true" className="relative h-[220px]">
                <Art />
              </div>
              <div className="px-6 pb-6 pt-1">
                <p className="font-urbanist text-[19px] font-semibold tracking-[-0.01em]">{t}</p>
                <p className="mt-1.5 text-[14px] leading-[1.55] text-[#6B6B76]">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
