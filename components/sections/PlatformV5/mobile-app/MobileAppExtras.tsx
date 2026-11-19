import React from "react";
import { Container, SectionHeading } from "@/components/sections/HomeV5/primitives";
import type { PlatformContent } from "@/content/platform/editable";
import { MOBILE_APP_EXTRAS } from "@/content/platform/mobile-app";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";
import { NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { AppleIcon, GooglePlayIcon } from "@/components/sections/mobile/StoreIcons";

/*
 * /platform/mobile-app, after the feature cards:
 * "Also in the app" (plain row) and "How you get your branded app" (three steps).
 * Publishing options confirmed 2026-11-19: we help the academy publish in its own Google Play / Apple
 * developer accounts (store account fees paid by the academy), or we publish it in our accounts.
 */



export function MobileAppAlso({ title, items }: { title: string; items: { title: string; text: string }[] }) {
  return (
    <div className="rv-v4 mt-14">
      <p className="text-center text-[13px] font-medium text-[#71717A]">{title}</p>
      <div className="mt-5 grid border-t border-[#ECECEF] sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((a, i) => (
          <div
            key={a.title}
            className={cn(
              "border-b border-[#ECECEF] px-1 py-5 sm:px-6 lg:border-b-0 lg:py-6",
              i % 2 === 1 && "sm:border-l",
              i > 0 && "lg:border-l",
              i === 0 && "lg:pl-0",
              i === Math.min(items.length, 4) - 1 && "lg:pr-0"
            )}
          >
            <p className="text-[14.5px] font-semibold text-[#0A0A0B]">{a.title}</p>
            <p className="mt-1 text-[13.5px] leading-[1.5] text-[#6B6B76]">{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-[14px] border border-[#EDEDF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_12px_32px_-14px_rgba(16,16,24,0.18)]", className)}>{children}</div>;
}

/* Step visuals */
function BrandKit() {
  return (
    <Panel className="w-full max-w-[260px] p-3.5">
      <p className="text-[10.5px] font-medium text-[#9A9AA6]">Your brand kit</p>
      <div className="mt-2.5 flex items-center gap-2.5">
        <span className="overflow-hidden rounded-[11px]"><NorthwindMark size={40} /></span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold text-[#18181B]">Northwind Academy</span>
          <span className="block text-[11px] text-[#9A9AA6]">App name and logo</span>
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {["#0F766E", "#14B8A6", "#F59E0B", "#0B3B37"].map((c, i) => (
          <span key={c} className="pf-swatch h-6 w-6 rounded-full ring-2 ring-white shadow-sm" style={{ background: c, animationDelay: `${i * 0.12}s` }} />
        ))}
        <span className="ml-1 text-[11px] text-[#9A9AA6]">Colours</span>
      </div>
    </Panel>
  );
}

function Build() {
  return (
    <Panel className="w-full max-w-[260px] p-3.5">
      <p className="text-[10.5px] font-medium text-[#9A9AA6]">Building your app</p>
      <div className="mt-2.5 flex items-center gap-3">
        <span className="relative grid h-[52px] w-[52px] place-items-center">
          <svg viewBox="0 0 52 52" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="26" cy="26" r="24" fill="none" stroke="#F1F1F4" strokeWidth="3" />
            <circle cx="26" cy="26" r="24" fill="none" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" pathLength={100} strokeDasharray="100" className="pf-build" />
          </svg>
          <span className="overflow-hidden rounded-[10px]"><NorthwindMark size={36} /></span>
        </span>
        <span className="space-y-1.5">
          {["Android", "iOS"].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-[12px] font-medium text-[#18181B]">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#DCFCE7] text-[#15803D]"><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
              {t} app
            </span>
          ))}
        </span>
      </div>
    </Panel>
  );
}

function PublishFork() {
  return (
    <div className="w-full max-w-[280px] space-y-2">
      <Panel className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-semibold text-[#18181B]">Your developer accounts</span>
          <span className="flex gap-1">
            <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#F4F5F8]"><GooglePlayIcon size={14} /></span>
            <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#F4F5F8]"><AppleIcon size={13} /></span>
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-snug text-[#71717A]">We help you publish. The store account fees are yours.</p>
      </Panel>
      <div className="flex items-center gap-2 px-2 text-[11px] font-medium text-[#A1A1AA]">
        <span className="h-px flex-1 bg-[#E4E4E7]" /> or <span className="h-px flex-1 bg-[#E4E4E7]" />
      </div>
      <Panel className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-semibold text-[#18181B]">Our accounts</span>
          <LmsDomainMark size={22} />
        </div>
        <p className="mt-1 text-[11px] leading-snug text-[#71717A]">We publish it for you, with your name and logo.</p>
      </Panel>
    </div>
  );
}

/* Pictures by position; text from the page's admin entry */
const VISUALS = [BrandKit, Build, PublishFork];

export function MobileAppPublish({ content: c }: { content: PlatformContent }) {
  const e = MOBILE_APP_EXTRAS;
  const steps = (c.steps && c.steps.length ? c.steps : e.steps).slice(0, 3);
  return (
    <section className="bg-white pb-[clamp(80px,10vw,136px)]">
      <Container>
        <MobileAppAlso title={c.alsoTitle || e.alsoTitle} items={c.also && c.also.length ? c.also : e.also} />
        <div className="pt-[clamp(80px,10vw,136px)]">
          <SectionHeading eyebrow={c.stepsEyebrow || e.stepsEyebrow} title={c.stepsTitle || e.stepsTitle} subtitle={c.stepsSubtitle || e.stepsSubtitle} />
        </div>

        <ol className="relative mx-auto mt-14 grid max-w-[1120px] gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {/* track: horizontal on desktop, vertical on phones */}
          <span aria-hidden="true" className="absolute left-[19px] top-5 bottom-5 w-px border-l-2 border-dashed border-[#DCDCE3] lg:left-[16.66%] lg:right-[16.66%] lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto lg:border-l-0 lg:border-t-2">
            <span className="pf-dot pf-dot-y absolute -left-[6px] h-2.5 w-2.5 rounded-full bg-[#0F766E] shadow-[0_0_0_5px_rgba(15,118,110,0.15)] lg:hidden" />
            <span className="pf-dot pf-dot-x absolute -top-[6px] hidden h-2.5 w-2.5 rounded-full bg-[#0F766E] shadow-[0_0_0_5px_rgba(15,118,110,0.15)] lg:block" />
          </span>

          {steps.map(({ title: t, text: d }, i) => { const V = VISUALS[i]; return (
            <li key={t} style={{ "--rv-delay": `${i * 120}ms` } as React.CSSProperties} className="rv-v4 relative grid grid-cols-[40px_1fr] gap-5 lg:flex lg:flex-col lg:items-center lg:gap-0 lg:text-center">
              <span className="pf-node relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-[#DCDCE3] bg-white font-mono text-[13px] font-semibold text-[#0A0A0B]" style={{ animationDelay: `${[0, 1.6, 3.5][i]}s` }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-6 lg:flex lg:flex-col lg:items-center">
                <h3 className="font-urbanist text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0A0A0B]">{t}</h3>
                <p className="mt-1.5 max-w-[300px] text-[14.5px] leading-[1.6] text-[#6B6B76]">{d}</p>
                <div aria-hidden="true" className="mt-5 flex text-left lg:w-full lg:justify-center">
                  <V />
                </div>
              </div>
            </li>
          ); })}
        </ol>
      </Container>
    </section>
  );
}
