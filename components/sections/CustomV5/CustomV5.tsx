import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CreditCard,
  Database,
  Globe,
  Headphones,
  RefreshCw,
  Server,
  Shield,
  ShieldCheck,
  Sliders,
  MessageSquare,
  Users,
  Zap,
  X,
  BookOpen,
  TrendingUp,
  Building2,
} from "lucide-react";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { BrandEverywhere } from "./BrandEverywhere";
import { CountUp } from "@/components/sections/HomeV5/CountUp";
import type { CustomPlanPageData } from "@/types/content";
import { cn } from "@/lib/utils";

/* v5 Custom LMS sections. All text comes from Admin (CustomPlanPageData) with code defaults. */

const ICONS: Record<string, React.ElementType> = {
  Globe,
  Shield,
  CreditCard,
  Sparkles: MessageSquare,
  Database,
  Users,
  Server,
  Sliders,
  Headphones,
  RefreshCw,
  ShieldCheck,
  Zap,
  BookOpen,
  TrendingUp,
};
const icon = (n: string) => ICONS[n] || Building2;
const clean = (s?: string) => (s || "").replace(/[✦*]/g, "").trim();

export function CustomHero({ hero }: { hero: CustomPlanPageData["hero"] }) {
  const title = hero.title.replace(/\.$/, "");
  const hw = hero.highlightedWords || "";
  const i = hw ? title.toLowerCase().indexOf(hw.toLowerCase()) : -1;
  return (
    <div className="px-2 pt-20 sm:px-3 min-[900px]:pt-3">
      <section className="relative isolate overflow-hidden rounded-[28px] bg-[#0B0A12] pb-6 pt-[56px] text-white sm:rounded-[40px] min-[900px]:pt-[150px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="ai-blob ai-blob-1 left-[-8%] top-[-10%] h-[520px] w-[640px] bg-[#5B3BF0] opacity-50" />
          <div className="ai-blob ai-blob-2 right-[-8%] top-[20%] h-[460px] w-[600px] bg-[#2F5BFF] opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_25%,transparent_80%)]" />
        </div>
        <Container className="text-center">
          <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#A1A1AA]">
            <ol className="inline-flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-white">
                {clean(hero.eyebrow) || "Custom plan"}
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[900px] font-urbanist text-[clamp(40px,6.4vw,80px)] font-semibold leading-[1] tracking-[-0.045em] [text-wrap:balance]"
          >
            {i >= 0 ? (
              <>
                {title.slice(0, i)}
                <span className="bg-gradient-to-r from-[#8B6CFF] via-[#A78BFA] to-[#6B8CFF] bg-clip-text text-transparent">{title.slice(i, i + hw.length)}</span>
                {title.slice(i + hw.length)}
              </>
            ) : (
              title
            )}
          </h1>
          {hero.subtitle && (
            <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-6 max-w-[680px] text-[17px] leading-[1.6] text-[#A1A1AA] sm:text-[18px]">
              {hero.subtitle}
            </p>
          )}
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={hero.primaryCta?.href || "#plan"}
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#F1EDFF] sm:w-auto"
            >
              {hero.primaryCta?.label || "Plan my custom LMS"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <DemoButton
              label={hero.secondaryCta?.label || "Book a 20-minute call"}
              variant="dark"
              className="h-12 w-full border border-white/20 bg-transparent px-6 hover:bg-white/10 sm:w-auto [&>svg]:hidden"
            />
          </div>
          {hero.proofChips && hero.proofChips.length > 0 && (
            <ul style={{ "--d": "340ms" } as React.CSSProperties} className="v5-rise mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-[#D4D4D8]">
              {hero.proofChips.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#A99BFF]" strokeWidth={2.5} /> {c}
                </li>
              ))}
            </ul>
          )}
        </Container>
        <Container className="v5-shot relative mt-14">
          <p className="mb-4 text-center text-[13px] font-medium text-[#A1A1AA]">Try it: your brand, everywhere your learners see it</p>
          <BrandEverywhere colours={hero.brandPreview?.colours} nameLabel={hero.brandPreview?.nameLabel} colourLabel={hero.brandPreview?.colourLabel} />
        </Container>
      </section>
    </div>
  );
}

const PROOF = [
  ["2,000+", "Learners on LMS Domain"],
  ["100+", "Courses published"],
  ["100+", "Live classes taught"],
  ["0%", "Commission on your sales"],
];

export function CustomProof() {
  return (
    <section className="bg-white pt-10">
      <Container>
        <dl className="rv-v4 grid grid-cols-2 gap-y-8 rounded-[28px] border border-[#ECECF1] px-6 py-8 lg:grid-cols-4">
          {PROOF.map(([v, l], i) => (
            <div key={l} className={cn("px-2 text-center", i > 0 && "lg:border-l lg:border-[#ECECF1]")}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-urbanist text-[clamp(32px,3.6vw,44px)] font-semibold leading-none tracking-[-0.04em]">
                <CountUp value={v} />
              </dd>
              <dd className="mt-2 text-[13.5px] text-[#71717A]">{l}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function CustomAudiences({ audiences }: { audiences: NonNullable<CustomPlanPageData["audiences"]> }) {
  const photos = ["/images/solutions/coaching-institutes-1.webp", "/images/solutions/training-companies-1.webp"];
  return (
    <section className="bg-white pt-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading eyebrow="Who it's for" title={audiences.title && audiences.title !== "Who it's for" ? audiences.title : "Built for established academies and teams"} />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
          {audiences.items.map((a, i) => {
            const Icon = icon(a.icon);
            return (
              <article
                key={a.title}
                style={{ "--rv-delay": `${i * 120}ms` } as React.CSSProperties}
                className="rv-v4 group relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#0A0A0B] text-white"
              >
                <Image src={photos[i % photos.length]} alt="" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />
                <div className="relative flex h-full min-h-[360px] flex-col justify-end p-7 sm:p-9">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0A0A0B]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-urbanist text-[26px] font-semibold tracking-[-0.02em]">{a.title}</h3>
                  <p className="mt-2 max-w-[440px] text-[15.5px] leading-[1.6] text-white/75">{a.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function CustomDeliverables({ d }: { d: NonNullable<CustomPlanPageData["deliverables"]> }) {
  return (
    <section className="px-2 pt-[clamp(80px,10vw,136px)] sm:px-3">
      <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
        <Container>
          <SectionHeading eyebrow="What you get" title={d.title || "Everything you need to launch"} subtitle={d.subtitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {d.items.map((it, i) => {
              const Icon = icon(it.icon);
              return (
                <div
                  key={it.title}
                  style={{ "--rv-delay": `${(i % 4) * 90}ms` } as React.CSSProperties}
                  className={cn(
                    "rv-v4 group flex flex-col rounded-[24px] p-6 transition-[translate] duration-500 hover:-translate-y-1",
                    i === 0 || i === 7 ? "bg-[#0A0A0B] text-white" : "bg-white"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("grid h-10 w-10 place-items-center rounded-full", i === 0 || i === 7 ? "bg-white text-[#0A0A0B]" : "bg-[#0A0A0B] text-white")}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", i === 0 || i === 7 ? "bg-white/10 text-white/80" : "bg-[#F4F5F8] text-[#52525B]")}>
                      {it.tag}
                    </span>
                  </div>
                  <p className="mt-8 font-urbanist text-[19px] font-semibold leading-[1.25] tracking-[-0.01em]">{it.title}</p>
                  <p className={cn("mt-2 text-[14px] leading-[1.55]", i === 0 || i === 7 ? "text-white/65" : "text-[#6B6B76]")}>{it.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </section>
  );
}

export function CustomTimeline({ t }: { t: NonNullable<CustomPlanPageData["timeline"]> }) {
  return (
    <section className="bg-white pt-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading eyebrow="How it works" title={t.title || "From first call to launch"} subtitle={t.subtitle} />
        <ol className="relative mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          <span aria-hidden="true" className="rv-v4 v5-draw absolute left-[28px] right-[calc(25%-26px)] top-[28px] hidden border-t-2 border-dashed border-[#D4D4D8] lg:block" />
          {t.steps.map((s, i) => (
            <li key={s.title} style={{ "--rv-delay": `${i * 130}ms` } as React.CSSProperties} className="rv-v4 relative">
              <span className="v5-badge relative z-10 grid h-14 w-14 place-items-center rounded-full bg-[#0A0A0B] font-urbanist text-[18px] font-semibold text-white ring-8 ring-white">
                {i + 1}
              </span>
              <div className="mt-5 rounded-[22px] bg-[#F4F5F8] p-5">
                <p className="text-[12px] font-semibold text-[#6C4BFF]">{s.when}</p>
                <p className="mt-1 font-urbanist text-[19px] font-semibold tracking-[-0.01em]">{s.title}</p>
                <p className="mt-1.5 text-[14px] leading-[1.55] text-[#6B6B76]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {t.footnote && <p className="rv-v4 mt-6 text-center text-[13.5px] text-[#71717A]">{t.footnote}</p>}
      </Container>
    </section>
  );
}

export function CustomComparison({ c }: { c: NonNullable<CustomPlanPageData["comparison"]> }) {
  return (
    <section className="bg-white pt-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading eyebrow="Compare" title={c.title || "Why teams choose a Custom Plan"} />
        <div className="rv-v4 mt-12 overflow-hidden rounded-[28px] border border-[#ECECF1] lg:mt-16">
          <div className="grid grid-cols-[1fr_1fr] text-[13px] font-semibold sm:grid-cols-[200px_1fr_1fr]">
            <span className="hidden bg-white px-6 py-5 text-[#9A9AA6] sm:block">&nbsp;</span>
            <span className="bg-[#F4F5F8] px-5 py-5 text-[#71717A] sm:px-6">{c.leftLabel || "Building it yourself"}</span>
            <span className="bg-[#0A0A0B] px-5 py-5 text-white sm:px-6">{c.rightLabel || "LMS Domain Custom Plan"}</span>
          </div>
          {c.rows.map((r) => (
            <div key={r.topic} className="grid grid-cols-[1fr_1fr] border-t border-[#ECECF1] sm:grid-cols-[200px_1fr_1fr]">
              <span className="col-span-2 bg-white px-5 pt-4 font-urbanist text-[16px] font-semibold sm:col-span-1 sm:px-6 sm:py-5">{r.topic}</span>
              <span className="flex items-start gap-2 bg-[#F8F8FA] px-5 py-4 text-[14px] text-[#71717A] sm:px-6 sm:py-5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[#B4B4BE]" strokeWidth={2.5} /> {r.left}
              </span>
              <span className="flex items-start gap-2 bg-[#121214] px-5 py-4 text-[14px] text-white sm:px-6 sm:py-5">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#6C4BFF]">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                {r.right}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CustomServicesAndPrice({
  s,
  p,
}: {
  s?: CustomPlanPageData["services"];
  p?: CustomPlanPageData["pricingNote"];
}) {
  return (
    <section className="px-2 pt-[clamp(80px,10vw,136px)] sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A0A0B] py-[clamp(64px,8vw,104px)] text-white sm:rounded-[40px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000,transparent_75%)]" />
        <Container>
          {s && (
            <>
              <SectionHeading tone="dark" eyebrow="After launch" title={s.title || "We don't disappear after launch"} />
              <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                {s.items.map((it, i) => {
                  const Icon = icon(it.icon);
                  return (
                    <div key={it.title} style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties} className="rv-v4 group bg-[#0A0A0B] p-7 transition-colors duration-500 hover:bg-[#121214]">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors group-hover:border-[#8B6CFF] group-hover:text-[#C9BFFF]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="mt-6 font-urbanist text-[19px] font-semibold">{it.title}</p>
                      <p className="mt-1.5 text-[14px] leading-[1.55] text-[#A1A1AA]">{it.text}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {p && (
            <div className="rv-v4 mt-6 flex flex-col items-start justify-between gap-6 rounded-[24px] bg-white p-7 text-[#0A0A0B] sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className="font-urbanist text-[24px] font-semibold tracking-[-0.02em]">{p.title || "A plan that fits what you need"}</p>
                {p.text && <p className="mt-2 max-w-[620px] text-[15px] leading-[1.6] text-[#52525B]">{p.text}</p>}
              </div>
              <a href="#plan" className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#0A0A0B] px-5 text-[14.5px] font-semibold text-white hover:bg-[#27272A]">
                {p.ctaLabel || "Get my quote"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          )}
        </Container>
      </div>
    </section>
  );
}

export function CustomCta({ cta }: { cta: NonNullable<CustomPlanPageData["cta"]> }) {
  return (
    <section className="bg-white pb-[clamp(72px,9vw,120px)]">
      <Container>
        <div className="rv-v4 relative overflow-hidden rounded-[28px] bg-[#F4F5F8] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(#E4E4E7_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,transparent_30%,#000_90%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-[680px] font-urbanist text-[clamp(30px,4.2vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em] [text-wrap:balance]">
              {cta.title || "Ready for your own LMS?"}
            </h2>
            {cta.text && <p className="mx-auto mt-4 max-w-[520px] text-[16.5px] leading-[1.6] text-[#52525B]">{cta.text}</p>}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={cta.primaryHref || "#plan"} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0B] px-5 text-[14.5px] font-semibold text-white hover:bg-[#27272A] sm:w-auto">
                {cta.primaryLabel || "Plan my custom LMS"} <ArrowRight className="h-4 w-4" />
              </a>
              {cta.secondaryLabel && (
                <Link href={cta.secondaryHref || "/contact"} className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
                  {cta.secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
