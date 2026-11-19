import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import type { SolutionPageData } from "@/content/solutions/types";
import type { SolutionContent } from "@/content/solutions/editable";
import { linkedAnswerHtml } from "@/content/merge";
import { Mini } from "./MiniCard";
import { AppBand } from "./AppBand";
import { cn } from "@/lib/utils";

/*
 * v5 solution page: built around one type of academy and its week, not around features.
 * Hero (custom demo) → before/with pairs → "a week at your academy" timeline → platform parts → mobile app band → FAQ → CTA.
 */

export { Mini };

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


export function SolutionV5Page({
  data,
  content: c,
  Hero,
  pageName,
  clientLogo,
}: {
  /** Built-in data: slug and the product cards of "A week at…" (by position). */
  data: SolutionPageData;
  /** Text from Admin > Website > Solutions over the built-in text. */
  content: SolutionContent;
  Hero: React.ComponentType;
  pageName: string;
  clientLogo?: { name?: string; logo?: string; url?: string };
}) {
  const cards = data.v5!.week.map((w) => w.card);
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
            <HeroTitle title={c.title} accent={c.titleHighlight} />
          </h1>
          <p
            style={{ "--d": "180ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[680px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
          >
            {c.subtitle}
          </p>
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton label={c.primaryButton} className="w-full sm:w-auto" />
            <Link href="/pricing" className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
              {c.secondaryButton}
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
          <SectionHeading eyebrow={c.changesEyebrow} title={c.changesTitle} />
          <div className="mt-12 space-y-3 lg:mt-16">
            {c.changes.map((p, i) => (
              <div
                key={`${p.before}-${i}`}
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
            <SectionHeading eyebrow={c.weekEyebrow} title={c.weekTitle} subtitle={c.weekSubtitle || undefined} />
            <ol className="relative mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {/* connector from the first day badge to the last (badges are 40px, columns gap 16px) */}
              <span
                aria-hidden="true"
                className="rv-v4 v5-draw absolute left-[20px] right-[calc(25%-32px)] top-[19px] hidden border-t-2 border-dashed border-[#C9C9D1] lg:block"
              />
              {c.week.map((w, i) => (
                <li key={`${w.day}-${i}`} style={{ "--rv-delay": `${i * 140}ms` } as React.CSSProperties} className="rv-v4 relative flex flex-col">
                  <span className="v5-badge relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#0A0A0B] text-[12px] font-semibold text-white ring-4 ring-[#F4F5F8] lg:mx-0">
                    {w.day}
                  </span>
                  <div className="mt-4 flex flex-1 flex-col">
                    <div className="lg:h-[196px]">
                      <Mini card={cards[i % cards.length]} />
                    </div>
                    <p className="mt-5 font-urbanist text-[19px] font-semibold tracking-[-0.01em]">{w.title}</p>
                    <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[#6B6B76]">{w.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      </section>

      {/* 4. Built from these parts of the platform */}
      {c.parts.length > 0 && (
        <section className="bg-white pt-[clamp(80px,10vw,136px)]">
          <Container>
            <SectionHeading eyebrow={c.partsEyebrow} title={c.partsTitle} />
            <div className={cn("mt-12 grid gap-4 lg:mt-16", c.parts.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
              {c.parts.map((l, i) => (
                <Link
                  key={`${l.link}-${i}`}
                  href={l.link}
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
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#52525B] transition-colors group-hover:text-[#A1A1AA]">{l.text}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4b. Mobile app band (audience-specific) */}
      <AppBand slug={data.slug} />

      {/* 5. FAQ */}
      {c.faqs.length > 0 && (
        <div className="pt-[clamp(48px,6vw,80px)]">
          <FAQ
            id={`${data.slug}-faq`}
            minimal
            eyebrow="FAQs"
            title={c.faqTitle}
            subtitle={c.faqSubtitle}
            items={c.faqs.map((q) => ({ question: q.question, answer: linkedAnswerHtml(q.answer) }))}
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
