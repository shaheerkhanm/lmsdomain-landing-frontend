import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import {
  TeachScene,
  AssessScene,
  ManageScene,
  SellScene,
  BrandScene,
  SecurityScene,
  AiScene,
} from "@/components/sections/PlatformV5/Scenes";
import { TeachHero } from "@/components/sections/PlatformV5/teach/TeachHero";
import { TeachBento } from "@/components/sections/PlatformV5/teach/TeachBento";
import { AssessHero } from "@/components/sections/PlatformV5/assess/AssessHero";
import { AssessBento } from "@/components/sections/PlatformV5/assess/AssessBento";
import { ManageHero } from "@/components/sections/PlatformV5/manage/ManageHero";
import { ManageBento } from "@/components/sections/PlatformV5/manage/ManageBento";
import { SellHero } from "@/components/sections/PlatformV5/sell/SellHero";
import { SellBento } from "@/components/sections/PlatformV5/sell/SellBento";
import { BrandHero } from "@/components/sections/PlatformV5/brand/BrandHero";
import { BrandBento } from "@/components/sections/PlatformV5/brand/BrandBento";
import { AiHero } from "@/components/sections/PlatformV5/ai/AiHero";
import { AiBento } from "@/components/sections/PlatformV5/ai/AiBento";
import { AiStudents } from "@/components/sections/PlatformV5/ai/AiStudents";
import { AiBackdrop } from "@/components/sections/PlatformV5/ai/AiBackdrop";
import { SecurityHero } from "@/components/sections/PlatformV5/security/SecurityHero";
import { SecurityBento } from "@/components/sections/PlatformV5/security/SecurityBento";
import { MobileAppHero } from "@/components/sections/PlatformV5/mobile-app/MobileAppHero";
import { MobileAppBento } from "@/components/sections/PlatformV5/mobile-app/MobileAppBento";
import { MobileAppPublish } from "@/components/sections/PlatformV5/mobile-app/MobileAppExtras";
import { PlatformPageData } from "@/content/platform/types";
import { cn } from "@/lib/utils";
import { linkedAnswerHtml } from "@/content/merge";
import { platformDefaults, type PlatformContent, type PlatformKey } from "@/content/platform/editable";
import type { PlatformCard } from "@/content/platform/cards";

export interface PlatformPageProps {
  data: PlatformPageData;
  /** Text from Admin > Website > Platform over the built-in text. */
  content?: PlatformContent;
}

const SCENES: Record<string, React.ComponentType> = {
  teach: TeachScene,
  assess: AssessScene,
  manage: ManageScene,
  sell: SellScene,
  brand: BrandScene,
  security: SecurityScene,
  ai: AiScene,
};

// Pages redesigned one by one get their own hero visual and feature cards.
const CUSTOM: Record<string, { Hero: React.ComponentType; Bento: React.ComponentType<{ cards?: PlatformCard[] }>; Extra?: React.ComponentType; After?: React.ComponentType<{ content: PlatformContent }> }> = {
  teach: { Hero: TeachHero, Bento: TeachBento },
  assess: { Hero: AssessHero, Bento: AssessBento },
  manage: { Hero: ManageHero, Bento: ManageBento },
  sell: { Hero: SellHero, Bento: SellBento },
  brand: { Hero: BrandHero, Bento: BrandBento },
  ai: { Hero: AiHero, Bento: AiBento, Extra: AiStudents },
  security: { Hero: SecurityHero, Bento: SecurityBento },
  "mobile-app": { Hero: MobileAppHero, Bento: MobileAppBento, After: MobileAppPublish },
};

const AREAS = [
  { slug: "teach", name: "Teach", href: "/platform/teach" },
  { slug: "assess", name: "Assess", href: "/platform/assess" },
  { slug: "manage", name: "Manage", href: "/platform/manage" },
  { slug: "sell", name: "Sell", href: "/platform/sell" },
  { slug: "brand", name: "Brand", href: "/platform/brand" },
  { slug: "ai", name: "Domie AI", href: "/platform/ai" },
  { slug: "security", name: "Security", href: "/platform/security" },
  { slug: "mobile-app", name: "Mobile apps", href: "/platform/mobile-app" },
];

/** Title with the brand gradient on one phrase. */
function HeroTitle({ title, accent, dark }: { title: string; accent?: string; dark: boolean }) {
  const clean = title.replace(/\.$/, "");
  const i = accent ? clean.toLowerCase().indexOf(accent.toLowerCase()) : -1;
  const grad = dark
    ? "bg-gradient-to-r from-[#8B6CFF] via-[#A78BFA] to-[#6B8CFF] bg-clip-text text-transparent"
    : "bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent";
  if (!accent || i < 0) return <>{clean}</>;
  return (
    <>
      {clean.slice(0, i)}
      <span className={grad}>{clean.slice(i, i + accent.length)}</span>
      {clean.slice(i + accent.length)}
    </>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  return (
    <span className="whitespace-nowrap rounded-full bg-[#F1EDFF] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#6C4BFF]">
      {/^custom/i.test(plan) ? plan : `${plan} and up`}
    </span>
  );
}

export function PlatformPage({ data, content }: PlatformPageProps) {
  const c = content || platformDefaults(data.slug as PlatformKey);
  const isAi = data.slug === "ai";
  const area = AREAS.find((a) => a.slug === data.slug);
  const pageName = area?.name || data.eyebrow;
  const custom = CUSTOM[data.slug];
  const Scene = SCENES[data.slug];
  const others = AREAS.filter((a) => a.slug !== data.slug);
  const chips = data.features.slice(0, 4).map((f) => f.title);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Platform", path: "/platform" },
    { name: pageName, path: `/platform/${data.slug}` },
  ];

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* 1. Hero: text, then the product on a stage with feature chips around it. Domie AI gets a dark hero. */}
      <div className={cn(isAi && "px-2 pt-20 sm:px-3 min-[900px]:pt-3")}>
        <section
          className={cn(
            "relative isolate overflow-hidden",
            isAi
              ? "rounded-t-[28px] bg-[#0B0A12] pb-[clamp(96px,10vw,140px)] pt-[56px] text-white sm:rounded-t-[40px] min-[900px]:pt-[150px]"
              : "bg-white pb-6 pt-[120px] min-[900px]:pt-[168px]"
          )}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            {isAi ? (
              <AiBackdrop />
            ) : (
              <>
                <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.20),transparent)] blur-2xl" />
                <div className="absolute left-[8%] top-[60px] h-[360px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(143,168,255,0.22),transparent)] blur-2xl" />
                <div className="absolute right-[6%] top-[120px] h-[340px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(196,181,253,0.28),transparent)] blur-2xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,11,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,11,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000_20%,transparent_75%)]" />
              </>
            )}
          </div>

          <Container className="text-center">
            <nav aria-label="Breadcrumb" className={cn("v5-rise text-[13px]", isAi ? "text-[#A1A1AA]" : "text-[#71717A]")}>
              <ol className="inline-flex items-center gap-1.5">
                <li>
                  <Link href="/" className={isAi ? "hover:text-white" : "hover:text-[#0A0A0B]"}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/platform" className={isAi ? "hover:text-white" : "hover:text-[#0A0A0B]"}>
                    Platform
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className={cn("font-medium", isAi ? "text-white" : "text-[#0A0A0B]")}>
                  {pageName}
                </li>
              </ol>
            </nav>
            {data.badge && (
              <p className="v5-rise mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[13px] font-medium text-[#E4E4E7]">
                <span className="rounded-full bg-[#6C4BFF] px-2 py-0.5 text-[10.5px] font-semibold text-white">{data.badge}</span>
                Available on {data.badge} and Enterprise
              </p>
            )}
            <h1
              style={{ "--d": "90ms" } as React.CSSProperties}
              className="v5-rise mx-auto mt-5 max-w-[900px] font-urbanist text-[clamp(36px,5.6vw,68px)] font-semibold leading-[1.03] tracking-[-0.04em] [text-wrap:balance]"
            >
              <HeroTitle title={c.title} accent={c.titleHighlight} dark={isAi} />
            </h1>
            <p
              style={{ "--d": "180ms" } as React.CSSProperties}
              className={cn(
                "v5-rise mx-auto mt-5 max-w-[660px] text-[16.5px] leading-[1.6] sm:text-[18px] [text-wrap:pretty]",
                isAi ? "text-[#A1A1AA]" : "text-[#52525B]"
              )}
            >
              {c.subtitle}
            </p>
            <div
              style={{ "--d": "270ms" } as React.CSSProperties}
              className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <DemoButton label={c.primaryButton} variant={isAi ? "light" : "dark"} className="w-full sm:w-auto" />
              <Link
                href="/pricing"
                className={cn(
                  secondaryButtonClass,
                  "w-full sm:w-auto",
                  isAi && "border-white/15 bg-transparent text-white hover:border-white/40 hover:bg-white/5"
                )}
              >
                {c.secondaryButton}
              </Link>
            </div>
          </Container>

          {custom && (
            <Container className="v5-shot relative mt-14 sm:mt-16">
              <custom.Hero />
            </Container>
          )}

          {/* Product stage */}
          {!custom && Scene && (
            <Container className="v5-shot relative mt-14 sm:mt-16">
              <div
                className={cn(
                  "relative rounded-[32px] px-4 py-6 sm:rounded-[40px] sm:px-10 sm:py-12",
                  isAi ? "border border-white/10 bg-white/[0.03]" : "bg-[#F4F5F8]",
                  !isAi && "[&_.scene-canvas]:bg-white [&_.scene-canvas]:shadow-[0_1px_2px_rgba(16,16,24,0.05),0_30px_60px_-30px_rgba(16,16,24,0.35)]"
                )}
              >
                <div className="mx-auto max-w-[620px]">
                  <Scene />
                </div>
                {/* Feature chips around the product (desktop only) */}
                {chips.map((c, i) => (
                  <span
                    key={c}
                    style={{ "--d": `${700 + i * 120}ms` } as React.CSSProperties}
                    className={cn(
                      "v5-rise absolute hidden items-center gap-2 rounded-full py-2 pl-2 pr-4 text-[13.5px] font-medium lg:inline-flex",
                      isAi
                        ? "border border-white/10 bg-[#15131F] text-[#E4E4E7]"
                        : "border border-[#ECECF1] bg-white text-[#27272A] shadow-[0_10px_24px_-14px_rgba(16,16,24,0.3)]",
                      ["left-8 top-[18%] -rotate-[3deg]", "left-14 top-[62%] rotate-[2deg]", "right-8 top-[24%] rotate-[3deg]", "right-14 top-[68%] -rotate-[2deg]"][i]
                    )}
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#6C4BFF] text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {c}
                  </span>
                ))}
              </div>
            </Container>
          )}
        </section>

        {/* Domie AI: the page continues in one dark panel down to "who it's for" */}
        {isAi && custom && (
          <div className="relative isolate overflow-hidden rounded-b-[28px] bg-[#0B0A12] pb-[clamp(80px,10vw,136px)] text-white sm:rounded-b-[40px]">
            <AiBackdrop repeat={5} />
            {custom.Extra && <custom.Extra />}

            <section className="pt-[clamp(80px,10vw,136px)]">
              <Container>
                <SectionHeading tone="dark" eyebrow={c.featuresEyebrow} title={c.featuresTitle} />
                <div className="mt-12 lg:mt-16">
                  <custom.Bento cards={c.cards} />
                </div>
                <p className="rv-v4 mt-8 text-center text-[14.5px] text-[#A1A1AA]">
                  Included in Pro with 5 million AI tokens a month, and in Enterprise.{" "}
                  <Link href="/pricing#compare" className="font-semibold text-white underline-offset-4 hover:underline">
                    Compare plans
                  </Link>
                </p>
              </Container>
            </section>

            {c.usedFor.length > 0 && (
              <section className="pt-[clamp(80px,10vw,136px)]">
                <Container>
                  <SectionHeading tone="dark" eyebrow={c.usedForEyebrow} title={c.usedForTitle} />
                  <div
                    className={cn(
                      "mt-12 grid gap-4",
                      c.usedFor.length >= 3 ? "md:grid-cols-3" : c.usedFor.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-[480px]"
                    )}
                  >
                    {c.usedFor.map((u, i) => (
                      <Link
                        key={`${u.link}-${i}`}
                        href={u.link}
                        style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties}
                        className="rv-v4 group relative flex min-h-[220px] flex-col rounded-[24px] bg-white/[0.04] p-7 ring-1 ring-inset ring-white/10 transition-colors duration-500 hover:bg-white"
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-urbanist text-[15px] font-semibold tabular-nums text-white/35 transition-colors group-hover:text-[#B4B4BE]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-[#0A0A0B] group-hover:bg-[#0A0A0B]">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                        <h3 className="mt-12 font-urbanist text-[22px] font-semibold leading-[1.2] tracking-[-0.015em] text-white transition-colors group-hover:text-[#0A0A0B]">
                          {u.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-[1.6] text-[#A1A1AA] transition-colors group-hover:text-[#52525B]">{u.text}</p>
                      </Link>
                    ))}
                  </div>
                </Container>
              </section>
            )}
          </div>
        )}
      </div>

      {!isAi && custom?.Extra && <custom.Extra />}

      {/* 2a. Features as reference-style cards (redesigned pages) */}
      {custom && !isAi && (
        <section className="bg-white py-[clamp(80px,10vw,136px)]">
          <Container>
            <SectionHeading eyebrow={c.featuresEyebrow} title={c.featuresTitle} />
            <div className="mt-12 lg:mt-16">
              <custom.Bento cards={c.cards} />
            </div>
            <div className="rv-v4 mt-8 flex flex-col items-center gap-3 text-center text-[14.5px] text-[#52525B]">
              {c.aiNote && (
                <p className="max-w-[820px] [text-wrap:balance]">
                  {c.aiNote}{" "}
                  <Link href="/platform/ai" className="font-semibold text-[#0A0A0B] underline-offset-4 hover:underline">
                    About Domie AI
                  </Link>
                </p>
              )}
              <p>
                Some features depend on your plan.{" "}
                <Link href="/pricing#compare" className="font-semibold text-[#0A0A0B] underline-offset-4 hover:underline">
                  Compare plans
                </Link>
              </p>
            </div>
          </Container>
        </section>
      )}

      {!isAi && custom?.After && <custom.After content={c} />}

      {/* 2. Features: sticky heading on the left, numbered list on the right */}
      {!custom && (
      <section className="bg-white py-[clamp(80px,10vw,136px)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="lg:sticky lg:top-[120px] lg:self-start">
              <div className="rv-v4">
                <p className="inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A]">
                  Features
                </p>
                <h2 className="mt-5 font-urbanist text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">
                  {data.sectionHeading || `Everything in ${pageName}`}
                </h2>
                <p className="mt-4 max-w-[420px] text-[16px] leading-[1.6] text-[#52525B]">
                  Built for teachers and admins who want it to just work. Some features depend on your plan.
                </p>
                <Link
                  href="/pricing#compare"
                  className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]"
                >
                  Compare plans
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div>
              <ol className="border-t border-[#ECECF1]">
                {data.features.map((f, i) => (
                  <li
                    key={f.title}
                    style={{ "--rv-delay": `${i * 70}ms` } as React.CSSProperties}
                    className="rv-v4 grid grid-cols-[48px_1fr] gap-4 border-b border-[#ECECF1] py-7 sm:grid-cols-[64px_1fr]"
                  >
                    <span className="pt-1 font-urbanist text-[15px] font-semibold tabular-nums text-[#B4B4BE]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <h3 className="font-urbanist text-[21px] font-semibold tracking-[-0.015em]">{f.title}</h3>
                        {f.plan && <PlanBadge plan={f.plan} />}
                      </div>
                      <p className="mt-2 max-w-[560px] text-[15.5px] leading-[1.6] text-[#52525B]">{f.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* One small Domie AI line (Pro) on Teach, Assess and Manage */}
              {data.aiNote && (
                <Link
                  href="/platform/ai"
                  className="rv-v4 group mt-6 flex items-start gap-3 rounded-[18px] bg-[#0B0A12] p-4 text-[14.5px] leading-[1.55] text-[#D4D4D8] transition-colors hover:bg-[#15131F] sm:items-center sm:p-5"
                >
                  <span className="shrink-0 rounded-full bg-[#6C4BFF] px-2.5 py-0.5 text-[11.5px] font-semibold text-white">
                    Domie AI · Pro
                  </span>
                  <span className="flex-1">{data.aiNote}</span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA] transition-colors group-hover:text-white sm:mt-0" />
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      )}

      {/* 3. Who uses it */}
      {!isAi && c.usedFor.length > 0 && (
        <section className="px-2 sm:px-3">
          <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
            <Container>
              <div className="rv-v4 mx-auto max-w-[720px] text-center">
                <p className="inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A]">
                  {c.usedForEyebrow}
                </p>
                <h2 className="mt-5 font-urbanist text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">
                  {c.usedForTitle}
                </h2>
              </div>
              <div
                className={cn(
                  "mt-12 grid gap-4",
                  c.usedFor.length >= 3 ? "md:grid-cols-3" : c.usedFor.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-[480px]"
                )}
              >
                {c.usedFor.map((u, i) => (
                  <Link
                    key={`${u.link}-${i}`}
                    href={u.link}
                    style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties}
                    className="rv-v4 group relative flex min-h-[240px] flex-col overflow-hidden rounded-[24px] bg-white p-7 shadow-[0_1px_2px_rgba(16,16,24,0.04)] transition-colors duration-500 hover:bg-[#0A0A0B]"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-urbanist text-[15px] font-semibold tabular-nums text-[#B4B4BE] transition-colors group-hover:text-white/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[#E4E4E7] text-[#0A0A0B] transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="mt-12 font-urbanist text-[22px] font-semibold leading-[1.2] tracking-[-0.015em] transition-colors group-hover:text-white">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-[#52525B] transition-colors group-hover:text-[#A1A1AA]">
                      {u.text}
                    </p>
                  </Link>
                ))}
              </div>
            </Container>
          </div>
        </section>
      )}

      {/* 4. FAQ */}
      {c.faqs.length > 0 && (
        <FAQ
          id={`${data.slug}-faq`}
          minimal
          eyebrow="FAQs"
          title={c.faqTitle}
          subtitle={c.faqSubtitle}
          items={c.faqs.map((q) => ({ question: q.question, answer: linkedAnswerHtml(q.answer) }))}
        />
      )}

      {/* 5. Explore the rest of the platform */}
      <section className="bg-white pt-[clamp(56px,7vw,88px)]">
        <Container className="text-center">
          <p className="rv-v4 text-[14px] font-medium text-[#71717A]">Explore more of the platform</p>
          <div className="rv-v4 mt-5 flex flex-wrap justify-center gap-2">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={a.href}
                className="rounded-full border border-[#E4E4E7] bg-white px-4 py-2 text-[14px] font-semibold text-[#27272A] transition-colors hover:border-[#0A0A0B] hover:text-[#0A0A0B]"
              >
                {a.name}
              </Link>
            ))}
            <Link
              href="/platform"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#27272A]"
            >
              Platform overview
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 6. Final CTA */}
      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>

      <ScrollReveal />
    </div>
  );
}

export default PlatformPage;
