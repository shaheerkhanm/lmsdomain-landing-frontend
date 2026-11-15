import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import type { MiniCard, MiniTone, SolutionPageData } from "@/content/solutions/types";
import { cn } from "@/lib/utils";

/*
 * v5 solution page: built around one type of academy and its week, not around features.
 * Hero (custom demo) → before/with pairs → "a week at your academy" timeline → platform parts → FAQ → CTA.
 */

const TONE: Record<MiniTone, string> = {
  ok: "text-[#15803D] bg-[#E8F7EF]",
  warn: "text-[#B45309] bg-[#FEF4E2]",
  bad: "text-[#B91C1C] bg-[#FDECEC]",
  brand: "text-[#6C4BFF] bg-[#F1EDFF]",
  muted: "text-[#52525B] bg-[#F4F5F8]",
};

function HeroTitle({ title, accent }: { title: string; accent?: string }) {
  const clean = title.replace(/\.$/, "");
  const i = accent ? clean.toLowerCase().indexOf(accent.toLowerCase()) : -1;
  if (!accent || i < 0) return <>{clean}</>;
  return (
    <>
      {clean.slice(0, i)}
      <span className="bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent">{clean.slice(i, i + accent.length)}</span>
      {clean.slice(i + accent.length)}
    </>
  );
}

/** Small product card drawn from data. */
function Mini({ card }: { card: MiniCard }) {
  return (
    <div className="h-full rounded-[16px] border border-[#EDEDF1] bg-white p-4 shadow-[0_1px_2px_rgba(16,16,24,0.05),0_16px_36px_-18px_rgba(16,16,24,0.22)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_44px_-18px_rgba(16,16,24,0.3)]">
      <p className="text-[13px] font-semibold text-[#18181B]">{card.title}</p>
      {card.meta && <p className="text-[11px] text-[#9A9AA6]">{card.meta}</p>}
      {card.rows && (
        <div className="mt-3 space-y-1.5">
          {card.rows.map((r, i) => (
            <p
              key={r.label}
              style={{ "--d": `${250 + i * 110}ms` } as React.CSSProperties}
              className="v5-pop flex items-center justify-between gap-3 rounded-[9px] bg-[#F8F8FA] px-2.5 py-1.5 text-[11.5px]"
            >
              <span className="truncate text-[#3F3F46]">{r.label}</span>
              {r.value && (
                <span className={cn("shrink-0 font-semibold tabular-nums", r.tone ? cn("rounded-full px-2 py-0.5 text-[10.5px]", TONE[r.tone]) : "text-[#18181B]")}>
                  {r.value}
                </span>
              )}
            </p>
          ))}
        </div>
      )}
      {card.progress && (
        <div className="mt-3">
          <p className="text-[11.5px] font-medium text-[#3F3F46]">{card.progress.label}</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
            <div
              className="v5-fill h-full rounded-full bg-[#0A0A0B]"
              style={{ width: `${card.progress.value}%`, "--w": `${card.progress.value}%` } as React.CSSProperties}
            />
          </div>
        </div>
      )}
      {card.chip && (
        <span
          style={{ "--d": "450ms" } as React.CSSProperties}
          className={cn("v5-pop mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", TONE[card.chip.tone || "muted"])}
        >
          <Check className="h-3 w-3" strokeWidth={3} /> {card.chip.label}
        </span>
      )}
    </div>
  );
}

export function SolutionV5Page({
  data,
  Hero,
  pageName,
  clientLogo,
}: {
  data: SolutionPageData;
  Hero: React.ComponentType;
  pageName: string;
  clientLogo?: { name?: string; logo?: string; url?: string };
}) {
  const v5 = data.v5!;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: pageName, path: `/solutions/${data.slug}` },
  ];

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-white pb-6 pt-[120px] min-[900px]:pt-[168px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.20),transparent)] blur-2xl" />
          <div className="absolute left-[8%] top-[60px] h-[360px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(143,168,255,0.22),transparent)] blur-2xl" />
          <div className="absolute right-[6%] top-[120px] h-[340px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(196,181,253,0.28),transparent)] blur-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,11,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,11,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000_20%,transparent_75%)]" />
        </div>
        <Container className="text-center">
          <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
            <ol className="inline-flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[#0A0A0B]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>Solutions</li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[#0A0A0B]">
                {pageName}
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[920px] font-urbanist text-[clamp(36px,5.6vw,68px)] font-semibold leading-[1.03] tracking-[-0.04em] [text-wrap:balance]"
          >
            <HeroTitle title={data.title} accent={v5.heroAccent} />
          </h1>
          <p
            style={{ "--d": "180ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[680px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
          >
            {data.subtitle}
          </p>
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton label="Book a demo" className="w-full sm:w-auto" />
            <Link href="/pricing" className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
              See pricing
            </Link>
          </div>
          {clientLogo?.logo && clientLogo.name && (
            <div style={{ "--d": "360ms" } as React.CSSProperties} className="v5-rise mt-8 flex items-center justify-center gap-3 text-[13px] text-[#71717A]">
              <span>Used by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={clientLogo.logo} alt={clientLogo.name} className="h-7 w-auto object-contain" loading="lazy" />
            </div>
          )}
        </Container>
        <Container className="v5-shot relative mt-14 sm:mt-16">
          <Hero />
        </Container>
      </section>

      {/* 2. Before → with LMS Domain */}
      <section className="bg-white pt-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading eyebrow="What changes" title="From busy work to a simple routine" />
          <div className="mt-12 space-y-3 lg:mt-16">
            {v5.pains.map((p, i) => (
              <div
                key={p.before}
                style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties}
                className="rv-v4 group grid items-stretch gap-3 md:grid-cols-[1fr_56px_1fr]"
              >
                <div className="flex items-center gap-3 rounded-[20px] bg-[#F4F5F8] px-5 py-4 sm:px-6 sm:py-5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[#9A9AA6]">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-[15px] leading-[1.45] text-[#71717A]">{p.before}</p>
                </div>
                <div className="hidden items-center justify-center md:flex">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#E4E4E7] bg-white text-[#0A0A0B] transition-transform duration-500 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-[20px] bg-[#0A0A0B] px-5 py-4 transition-transform duration-500 group-hover:-translate-y-0.5 sm:px-6 sm:py-5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#6C4BFF] text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-[15px] font-medium leading-[1.45] text-white">{p.after}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. A week at your academy */}
      <section className="px-2 pt-[clamp(80px,10vw,136px)] sm:px-3">
        <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
          <Container>
            <SectionHeading eyebrow="How it runs" title={v5.weekTitle} subtitle={v5.weekSubtitle} />
            <ol className="relative mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {/* connector from the first day badge to the last (badges are 40px, columns gap 16px) */}
              <span
                aria-hidden="true"
                className="rv-v4 v5-draw absolute left-[20px] right-[calc(25%-32px)] top-[19px] hidden border-t-2 border-dashed border-[#C9C9D1] lg:block"
              />
              {v5.week.map((w, i) => (
                <li key={w.day} style={{ "--rv-delay": `${i * 140}ms` } as React.CSSProperties} className="rv-v4 relative flex flex-col">
                  <span className="v5-badge relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#0A0A0B] text-[12px] font-semibold text-white ring-4 ring-[#F4F5F8] lg:mx-0">
                    {w.day}
                  </span>
                  <div className="mt-4 flex flex-1 flex-col">
                    <div className="lg:h-[196px]">
                      <Mini card={w.card} />
                    </div>
                    <p className="mt-5 font-urbanist text-[19px] font-semibold tracking-[-0.01em]">{w.title}</p>
                    <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[#6B6B76]">{w.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      </section>

      {/* 4. Built from these parts of the platform */}
      {data.platformLinks && data.platformLinks.length > 0 && (
        <section className="bg-white pt-[clamp(80px,10vw,136px)]">
          <Container>
            <SectionHeading eyebrow="Under the hood" title="Built from these parts of the platform" />
            <div className={cn("mt-12 grid gap-4 lg:mt-16", data.platformLinks.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
              {data.platformLinks.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties}
                  className="rv-v4 group relative flex min-h-[200px] flex-col rounded-[24px] border border-[#ECECF1] bg-white p-7 transition-colors duration-500 hover:bg-[#0A0A0B]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-urbanist text-[15px] font-semibold tabular-nums text-[#B4B4BE] transition-colors group-hover:text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-[#E4E4E7] text-[#0A0A0B] transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-auto pt-8 font-urbanist text-[22px] font-semibold tracking-[-0.015em] transition-colors group-hover:text-white">{l.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#52525B] transition-colors group-hover:text-[#A1A1AA]">{l.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. FAQ */}
      {data.faqs && data.faqs.length > 0 && (
        <div className="pt-[clamp(48px,6vw,80px)]">
          <FAQ
            id={`${data.slug}-faq`}
            minimal
            eyebrow="FAQs"
            title={`Questions from ${pageName.toLowerCase()}`}
            subtitle="Short answers to what academies like yours ask us most."
            items={data.faqs}
          />
        </div>
      )}

      {/* 6. Final CTA */}
      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>

      <ScrollReveal />
    </div>
  );
}
