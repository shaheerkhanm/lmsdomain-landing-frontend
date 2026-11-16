import React from "react";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { CountUp } from "@/components/sections/HomeV5/CountUp";
import { SectionNav } from "@/components/sections/PlatformV5/SectionNav";
import {
  TeachScene,
  AssessScene,
  ManageScene,
  SellScene,
  BrandScene,
  SecurityScene,
  AiScene,
} from "@/components/sections/PlatformV5/Scenes";
import { platformSectionsV5, platformAiSectionV5, type PlatformSectionV5 } from "@/content/platform/overview";
import { PLATFORM_OVERVIEW_DEFAULTS, type PlatformOverviewContent } from "@/content/platform/overview-editable";
import { CUSTOMERS_DEFAULTS } from "@/content/customers";
import { linkedAnswerHtml } from "@/content/merge";

const SCENES: Record<string, React.ComponentType> = {
  teach: TeachScene,
  assess: AssessScene,
  manage: ManageScene,
  sell: SellScene,
  brand: BrandScene,
  security: SecurityScene,
};



function Points({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((p, i) => (
        <li
          key={p}
          style={{ "--d": `${150 + i * 80}ms` } as React.CSSProperties}
          className={`v5-pop flex items-start gap-3 text-[15px] leading-[1.5] ${dark ? "text-[#D4D4D8]" : "text-[#3F3F46]"}`}
        >
          <span
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
              dark ? "bg-[#6C4BFF] text-white" : "bg-[#F1EDFF] text-[#6C4BFF]"
            }`}
          >
            <Check className="h-3 w-3" strokeWidth={3.5} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

function SectionRow({ s, index, flip }: { s: PlatformSectionV5; index: number; flip: boolean }) {
  const Scene = SCENES[s.slug];
  return (
    <section id={s.slug} aria-labelledby={`${s.slug}-title`} className="scroll-mt-40 py-[clamp(48px,6vw,80px)]">
      <Container>
        <div className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className={`rv-v4 ${flip ? "lg:order-2" : ""}`}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A]">
              <span className="tabular-nums text-[#9A9AA6]">{String(index).padStart(2, "0")}</span>
              {s.name}
            </p>
            <h2
              id={`${s.slug}-title`}
              className="mt-5 font-urbanist text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0A0A0B] [text-wrap:balance]"
            >
              {s.title}
            </h2>
            <p className="mt-4 max-w-[520px] text-[16.5px] leading-[1.6] text-[#52525B] [text-wrap:pretty]">{s.body}</p>
            <Points items={s.points} />
            <Link
              href={s.href}
              className="group/link mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]"
            >
              Explore {s.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
          <div className={flip ? "lg:order-1" : ""}>{Scene && <Scene />}</div>
        </div>
      </Container>
    </section>
  );
}

function AiRow({ c }: { c: PlatformOverviewContent }) {
  const s = { ...platformAiSectionV5, title: c.aiTitle, body: c.aiText, points: c.aiPoints, note: c.aiNote };
  return (
    <section id="ai" aria-labelledby="ai-title" className="scroll-mt-40 px-2 py-[clamp(24px,3vw,40px)] sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0B0A12] py-[clamp(56px,7vw,96px)] text-white sm:rounded-[40px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-[-160px] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.35),transparent)] blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_70%_at_20%_30%,#000,transparent_75%)]" />
        </div>
        <Container>
          <div className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="rv-v4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[13px] font-medium text-[#E4E4E7]">
                <span className="tabular-nums text-[#A1A1AA]">05</span>
                {s.name}
                <span className="rounded-full bg-[#6C4BFF] px-2 py-0.5 text-[10.5px] font-semibold text-white">Pro</span>
              </p>
              <h2
                id="ai-title"
                className="mt-5 font-urbanist text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]"
              >
                {s.title}
              </h2>
              <p className="mt-4 max-w-[520px] text-[16.5px] leading-[1.6] text-[#A1A1AA]">{s.body}</p>
              <Points items={s.points} dark />
              <p className="mt-6 text-[13.5px] text-[#71717A]">{s.note}</p>
              <Link
                href={s.href}
                className="group/link mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-[#C9BFFF]"
              >
                Explore Domie AI
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
            <AiScene />
          </div>
        </Container>
      </div>
    </section>
  );
}

/** "Before / after": the separate tools an academy usually juggles, versus one platform. */
// Tilt and offset of the "without" chips, by position
const CHIP_STYLE = [
  { r: "-rotate-[4deg]", x: "ml-2" },
  { r: "rotate-[3deg]", x: "ml-16" },
  { r: "-rotate-[2deg]", x: "ml-6" },
  { r: "rotate-[4deg]", x: "ml-20" },
  { r: "-rotate-[3deg]", x: "ml-0" },
  { r: "rotate-[2deg]", x: "ml-12" },
];

function ToolStack({ c }: { c: PlatformOverviewContent }) {
  const before = c.withoutItems.map((t, i) => ({ t, ...CHIP_STYLE[i % CHIP_STYLE.length] }));
  const after = c.withItems;
  return (
    <section className="bg-white py-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading
          eyebrow={c.whyEyebrow}
          title={c.whyTitle}
          subtitle={c.whySubtitle}
        />
        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-2">
          <div className="rv-v4 relative overflow-hidden rounded-[28px] bg-[#F4F5F8] p-7 sm:p-9">
            <p className="text-[14px] font-semibold text-[#71717A]">{c.withoutLabel}</p>
            <p className="mt-1 font-urbanist text-[22px] font-semibold text-[#0A0A0B]">{c.withoutTitle}</p>
            <div className="mt-7 space-y-3">
              {before.map((b, i) => (
                <div
                  key={`${b.t}-${i}`}
                  style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
                  className={`v5-pop flex w-fit items-center gap-2.5 rounded-full border border-[#E4E4E7] bg-white py-2 pl-2 pr-4 text-[14px] text-[#52525B] shadow-[0_6px_16px_-10px_rgba(16,16,24,0.25)] ${b.r} ${b.x}`}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FDECEC] text-[#B91C1C]">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {b.t}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ "--rv-delay": "120ms" } as React.CSSProperties}
            className="rv-v4 relative overflow-hidden rounded-[28px] bg-[#0A0A0B] p-7 text-white sm:p-9"
          >
            <p className="text-[14px] font-semibold text-[#A99BFF]">{c.withLabel}</p>
            <p className="mt-1 font-urbanist text-[22px] font-semibold">{c.withTitle}</p>
            <div className="mt-7 rounded-[20px] border border-white/10 bg-white/[0.05] p-2">
              {after.map((a, i) => (
                <div
                  key={`${a}-${i}`}
                  style={{ "--d": `${200 + i * 70}ms` } as React.CSSProperties}
                  className="v5-pop flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[14.5px] text-[#E4E4E7]"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#6C4BFF]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {a}
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13.5px] leading-[1.55] text-[#A1A1AA]">
              {c.withNote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PlatformOverviewPage({
  content: c = PLATFORM_OVERVIEW_DEFAULTS,
  stats = CUSTOMERS_DEFAULTS.numbers.items,
}: {
  /** Text from Admin > Website > Platform > Overview. */
  content?: PlatformOverviewContent;
  /** The Customers page numbers (Admin > Website > Customers > Numbers). */
  stats?: { value: string; label: string }[];
} = {}) {
  // Six areas: scenes, anchors and links by position; text from the admin
  const areas: PlatformSectionV5[] = platformSectionsV5.map((s, i) => ({ ...s, name: c.areas[i]?.name || s.name, title: c.areas[i]?.title || s.title, body: c.areas[i]?.text || s.body, points: c.areas[i]?.points || s.points }));
  const nav = [
    ...areas.slice(0, 4).map((s) => ({ id: s.slug, label: s.name })),
    { id: "ai", label: "Domie AI" },
    ...areas.slice(4).map((s) => ({ id: s.slug, label: s.name })),
  ];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Platform", path: "/platform" },
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
              <li aria-current="page" className="font-medium text-[#0A0A0B]">
                Platform
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[920px] font-urbanist text-[clamp(38px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.04em] [text-wrap:balance]"
          >
            {c.titleBefore}{" "}
            <span className="bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent">
              {c.titleHighlight}
            </span>
          </h1>
          <p
            style={{ "--d": "180ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[640px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
          >
            {c.subtitle}
          </p>
          <div
            style={{ "--d": "270ms" } as React.CSSProperties}
            className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <DemoButton label={c.primaryButton} className="w-full sm:w-auto" />
            <Link href="/pricing" className={`${secondaryButtonClass} w-full sm:w-auto`}>
              {c.secondaryButton}
            </Link>
          </div>
          <dl
            style={{ "--d": "360ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-14 grid max-w-[880px] grid-cols-2 gap-y-6 sm:grid-cols-4"
          >
            {stats.map(({ value: v, label: l }, i) => (
              <div key={`${l}-${i}`}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-urbanist text-[30px] font-semibold tracking-[-0.03em] text-[#0A0A0B]">
                  <CountUp value={v} />
                </dd>
                <dd className="text-[13.5px] text-[#71717A]">{l}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. Sections, with a sticky jump bar */}
      <div className="relative pt-8">
        <SectionNav items={nav} />
        {areas.slice(0, 4).map((s, i) => (
          <SectionRow key={s.slug} s={s} index={i + 1} flip={i % 2 === 1} />
        ))}
        <AiRow c={c} />
        {areas.slice(4).map((s, i) => (
          <SectionRow key={s.slug} s={s} index={i + 6} flip={i % 2 === 1} />
        ))}
      </div>

      <Container>
        <p className="pb-4 text-center text-[13.5px] text-[#71717A]">
          {c.planNote}{" "}
          <Link href="/pricing#compare" className="font-semibold text-[#0A0A0B] underline-offset-4 hover:underline">
            Compare plans
          </Link>
        </p>
      </Container>

      {/* 3. Why one platform */}
      <ToolStack c={c} />

      {/* 4. FAQ */}
      <FAQ
        id="platform-faq"
        minimal
        eyebrow="FAQs"
        title={c.faqTitle}
        subtitle={c.faqSubtitle}
        items={c.faqs.map((q) => ({ question: q.question, answer: linkedAnswerHtml(q.answer) }))}
      />

      {/* 5. Final CTA */}
      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>

      <ScrollReveal />
    </div>
  );
}

export default PlatformOverviewPage;
