import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { Container } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { CountUp } from "@/components/sections/HomeV5/CountUp";
import { Devices3D } from "./Devices3D";
import type { CustomPlanPageData } from "@/types/content";
import { cn } from "@/lib/utils";

/*
 * "Big type + 3D devices" Custom LMS page: very large headlines, few words,
 * bold full-width colour bands and large photos. Text from Admin where it exists.
 */

const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";
const BRAND = "#6C4BFF";

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("text-[13px] font-semibold uppercase tracking-[0.16em]", dark ? "text-white/55" : "text-[#6C4BFF]")}>{children}</p>
  );
}

/* 1. Hero */
export function BoldHero({ hero }: { hero: CustomPlanPageData["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-white pt-[120px] min-[900px]:pt-[150px]">
      <Container className="text-center">
        <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
          <ol className="inline-flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#0A0A0B]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[#0A0A0B]">
              Custom LMS
            </li>
          </ol>
        </nav>
        <h1 style={{ "--d": "80ms" } as React.CSSProperties} className={cn("v5-rise mx-auto mt-6 text-[clamp(52px,10vw,150px)]", BIG)}>
          Your own LMS.
          <br />
          <span className="text-[#C4C4CC]">Built for you.</span>
        </h1>
        <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-8 max-w-[560px] text-[18px] leading-[1.55] text-[#52525B] sm:text-[20px]">
          Your academy, on your domain, set up by our team. You teach, we handle the rest.
        </p>
        <div style={{ "--d": "260ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={hero.primaryCta?.href || "#plan"}
            className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#0A0A0B] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-[#27272A] sm:w-auto"
          >
            {hero.primaryCta?.label || "Plan my custom LMS"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <DemoButton label={hero.secondaryCta?.label || "Book a 20-minute call"} variant="light" className="h-14 w-full border border-[#E4E4E7] px-7 text-[16px] sm:w-auto [&>svg]:hidden" />
        </div>
      </Container>
      <div style={{ "--d": "380ms" } as React.CSSProperties} className="v5-rise mt-16 px-4 pb-10 sm:mt-20">
        <Devices3D />
      </div>
    </section>
  );
}

/* 2. Numbers line */
export function BoldNumbers() {
  const items = [
    ["2,000+", "learners"],
    ["100+", "courses"],
    ["100+", "live classes"],
    ["0%", "commission"],
  ];
  return (
    <section className="border-y border-[#ECECF1] bg-white">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {items.map(([v, l], i) => (
            <div key={l} className={cn("py-10 text-center", i % 2 === 1 && "border-l border-[#ECECF1]", i >= 2 && "border-t border-[#ECECF1] lg:border-t-0", i === 2 && "lg:border-l")}>
              <dt className="sr-only">{l}</dt>
              <dd className={cn("text-[clamp(44px,5vw,72px)]", BIG)}>
                <CountUp value={v} />
              </dd>
              <dd className="mt-2 text-[15px] text-[#71717A]">{l}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* 4. Big photos: who it's for */
export function BoldAudiences({ audiences }: { audiences: NonNullable<CustomPlanPageData["audiences"]> }) {
  const photos = ["/images/solutions/coaching-institutes-2.webp", "/images/solutions/training-companies-2.webp"];
  return (
    <section className="grid gap-2 px-2 pt-3 sm:gap-3 sm:px-3 lg:grid-cols-2">
      {audiences.items.slice(0, 2).map((a, i) => (
        <article key={a.title} className="rv-v4 group relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#0A0A0B] text-white sm:min-h-[620px] sm:rounded-[40px]">
          <Image src={photos[i]} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-70 transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
            <Kicker dark>{i === 0 ? "For academies" : "For companies"}</Kicker>
            <h3 className={cn("mt-4 max-w-[520px] text-[clamp(34px,4vw,56px)]", BIG)}>{a.title}</h3>
            <p className="mt-4 max-w-[460px] text-[16px] leading-[1.55] text-white/75">{a.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

/* 5. Black band: what you get, as a big numbered list */
export function BoldDeliverables({ d }: { d: NonNullable<CustomPlanPageData["deliverables"]> }) {
  return (
    <section className="px-2 pt-3 sm:px-3">
      <div className="rounded-[28px] bg-[#0A0A0B] py-[clamp(72px,10vw,140px)] text-white sm:rounded-[40px]">
        <Container>
          <div className="rv-v4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Kicker dark>What you get</Kicker>
              <h2 className={cn("mt-5 text-[clamp(44px,7.5vw,112px)]", BIG)}>
                Done for you.
                <br />
                <span className="text-white/35">All of it.</span>
              </h2>
            </div>
            <a href="#plan" className="group inline-flex h-12 w-fit items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-[#0A0A0B] hover:bg-[#F1EDFF]">
              Get my quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <ol className="mt-14 border-t border-white/15">
            {d.items.map((it, i) => (
              <li
                key={it.title}
                style={{ "--rv-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
                className="rv-v4 group grid grid-cols-[56px_1fr] items-baseline gap-4 border-b border-white/15 py-6 transition-colors duration-500 hover:bg-white/[0.03] sm:grid-cols-[80px_1.1fr_1.4fr_auto] sm:py-8"
              >
                <span className="font-urbanist text-[16px] font-semibold tabular-nums text-white/35 transition-colors group-hover:text-[#A99BFF]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-urbanist text-[clamp(22px,2.4vw,32px)] font-semibold tracking-[-0.025em]">{it.title}</p>
                <p className="col-start-2 text-[15px] leading-[1.6] text-white/60 sm:col-start-auto">{it.text}</p>
                <span className="hidden rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/60 sm:inline">{it.tag}</span>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}

/* 6. Light band: migration in big numbers */
export function BoldMigration() {
  const nums = [
    ["48", "courses"],
    ["1,240", "video lessons"],
    ["3,180", "learners"],
    ["2,600", "test questions"],
  ];
  return (
    <section className="px-2 pt-3 sm:px-3">
      <div className="rounded-[28px] bg-[#F1EDFF] py-[clamp(72px,10vw,140px)] sm:rounded-[40px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div className="rv-v4">
              <Kicker>Migration</Kicker>
              <h2 className={cn("mt-5 text-[clamp(44px,7.5vw,112px)]", BIG)}>
                We move
                <br />
                <span style={{ color: BRAND }}>everything.</span>
              </h2>
              <p className="mt-6 max-w-[460px] text-[18px] leading-[1.55] text-[#52525B]">
                From your old LMS, spreadsheets and folders. Courses, videos, tests, learners and their progress.
              </p>
            </div>
            <dl aria-label="Example migration" className="grid grid-cols-2 gap-3">
              {nums.map(([v, l], i) => (
                <div key={l} style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties} className="rv-v4 rounded-[24px] bg-white p-6">
                  <dt className="sr-only">{l}</dt>
                  <dd className={cn("text-[clamp(36px,4vw,56px)]", BIG)}>
                    <CountUp value={v} />
                  </dd>
                  <dd className="mt-2 text-[14px] text-[#71717A]">{l} moved</dd>
                </div>
              ))}
              <p className="col-span-2 text-[12.5px] text-[#71717A]">Example from a sample academy.</p>
            </dl>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* 7. Steps in huge numerals */
export function BoldSteps({ t }: { t: NonNullable<CustomPlanPageData["timeline"]> }) {
  return (
    <section className="bg-white py-[clamp(80px,11vw,150px)]">
      <Container>
        <div className="rv-v4">
          <Kicker>How it works</Kicker>
          <h2 className={cn("mt-5 text-[clamp(44px,7.5vw,112px)]", BIG)}>Four steps.</h2>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-[#ECECF1] sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <li key={s.title} style={{ "--rv-delay": `${i * 110}ms` } as React.CSSProperties} className="rv-v4 group bg-white p-8 transition-colors duration-500 hover:bg-[#0A0A0B]">
              <span className={cn("block text-[96px] text-[#ECECF1] transition-colors duration-500 group-hover:text-[#6C4BFF]", BIG)}>{i + 1}</span>
              <p className="mt-6 font-urbanist text-[22px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-white">{s.title}</p>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-[#6B6B76] transition-colors group-hover:text-white/60">{s.text}</p>
            </li>
          ))}
        </ol>
        {t.footnote && <p className="rv-v4 mt-6 text-[14px] text-[#71717A]">{t.footnote}</p>}
      </Container>
    </section>
  );
}

/* 8. Compare, side by side */
export function BoldCompare({ c }: { c: NonNullable<CustomPlanPageData["comparison"]> }) {
  return (
    <section className="grid gap-2 px-2 sm:gap-3 sm:px-3 lg:grid-cols-2">
      <div className="rv-v4 rounded-[28px] bg-[#F4F5F8] p-8 sm:rounded-[40px] sm:p-14">
        <p className="text-[14px] font-semibold text-[#71717A]">{c.leftLabel || "Building it yourself"}</p>
        <ul className="mt-8 space-y-6">
          {c.rows.map((r) => (
            <li key={r.topic} className="flex gap-4">
              <X className="mt-1 h-5 w-5 shrink-0 text-[#B4B4BE]" strokeWidth={2.5} />
              <div>
                <p className="text-[13px] text-[#9A9AA6]">{r.topic}</p>
                <p className="text-[18px] text-[#71717A] line-through decoration-[#D4D4D8]">{r.left}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ "--rv-delay": "120ms" } as React.CSSProperties} className="rv-v4 rounded-[28px] bg-[#0A0A0B] p-8 text-white sm:rounded-[40px] sm:p-14">
        <p className="text-[14px] font-semibold text-[#A99BFF]">{c.rightLabel || "LMS Domain Custom Plan"}</p>
        <ul className="mt-8 space-y-6">
          {c.rows.map((r) => (
            <li key={r.topic} className="flex gap-4">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: BRAND }}>
                <Check className="h-3 w-3" strokeWidth={3.5} />
              </span>
              <div>
                <p className="text-[13px] text-white/45">{r.topic}</p>
                <p className="text-[18px] font-medium">{r.right}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 9. Support, big type over a photo */
export function BoldSupport({ s, p }: { s?: CustomPlanPageData["services"]; p?: CustomPlanPageData["pricingNote"] }) {
  return (
    <section className="px-2 pt-3 sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A0A0B] text-white sm:rounded-[40px]">
        <Image src="/assets/img/about-img.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <Container className="py-[clamp(72px,10vw,140px)]">
          <div className="rv-v4 max-w-[760px]">
            <Kicker dark>After launch</Kicker>
            <h2 className={cn("mt-5 text-[clamp(44px,7.5vw,112px)]", BIG)}>
              We stay.
              <br />
              <span className="text-white/40">Always.</span>
            </h2>
          </div>
          {s && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {s.items.map((it, i) => (
                <div key={it.title} style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties} className="rv-v4 border-t border-white/25 pt-5">
                  <p className="font-urbanist text-[20px] font-semibold">{it.title}</p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-white/60">{it.text}</p>
                </div>
              ))}
            </div>
          )}
          {p && (
            <div className="rv-v4 mt-14 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-white p-7 text-[#0A0A0B] sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className="font-urbanist text-[26px] font-semibold tracking-[-0.02em]">{p.title || "A plan that fits what you need"}</p>
                {p.text && <p className="mt-2 max-w-[620px] text-[15px] leading-[1.6] text-[#52525B]">{p.text}</p>}
              </div>
              <a href="#plan" className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#0A0A0B] px-6 text-[15px] font-semibold text-white hover:bg-[#27272A]">
                {p.ctaLabel || "Get my quote"} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </div>
          )}
        </Container>
      </div>
    </section>
  );
}
