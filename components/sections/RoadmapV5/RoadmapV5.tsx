import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, FileText, Link2, Lock, MessageCircle, PlayCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { roadmapAnswerHtml, type RoadmapContent } from "@/content/roadmap";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { RoadmapBoard, RoadmapProcess } from "./RoadmapExtras";
import { cn } from "@/lib/utils";

/* v5 Roadmap: big type, themed groups, a small preview of each planned feature. Previews are illustrative. */

const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";
const panel = "rounded-[14px] border border-[#EDEDF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_16px_36px_-18px_rgba(16,16,24,0.25)]";

/* ---------- previews, keyed by item title keyword ---------- */
function Preview({ title }: { title: string }) {
  const t = title.toLowerCase();
  if (t.includes("android") || t.includes("ios"))
    return (
      <div className="flex items-end justify-center gap-3">
        {["#6C4BFF", "#0F766E"].map((c, i) => (
          <div key={c} className={cn("w-[96px] overflow-hidden rounded-[18px] border-[4px] border-[#1C1A26] bg-white", i === 1 && "mb-4")}>
            <div className="px-2 pb-1.5 pt-2.5 text-[7px] font-semibold text-[#18181B]">{i ? "Northwind" : "Apex Academy"}</div>
            <div className="mx-1.5 rounded-[6px] p-1.5" style={{ background: c }}>
              <p className="text-[6.5px] text-white">Continue · Lesson 3</p>
            </div>
            <div className="space-y-1 p-1.5">
              <span className="block h-1.5 rounded-full bg-[#F1F1F4]" />
              <span className="block h-1.5 w-3/4 rounded-full bg-[#F1F1F4]" />
            </div>
          </div>
        ))}
      </div>
    );
  if (t.includes("drm"))
    return (
      <div className="relative w-full max-w-[260px] overflow-hidden rounded-[14px] bg-[#16141F]">
        <div className="h-[120px] bg-[radial-gradient(ellipse_at_30%_30%,#3A3550,transparent_65%)]" />
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0A0A0B]">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-medium text-white">Screen capture blocked</span>
      </div>
    );
  if (t.includes("whatsapp"))
    return (
      <div className="w-full max-w-[250px] rounded-[16px] bg-[#E7FFDB] p-3">
        <p className="ml-auto w-fit max-w-[90%] rounded-[10px] rounded-tr-[3px] bg-white px-2.5 py-1.5 text-[10.5px] text-[#18181B] shadow-sm">
          Reminder: Algebra live class today at 18:00. Join from your academy.
        </p>
        <p className="mt-1 text-right text-[8.5px] text-[#71717A]">Apex Academy · 17:00 ✓✓</p>
      </div>
    );
  if (t.includes("webrtc"))
    return (
      <div className={cn("w-full max-w-[250px] p-1.5", panel)}>
        <div className="grid grid-cols-3 gap-1">
          {["participant_mia.jpg", "participant_alex.jpg", "testimonials/author-1.jpg", "testimonials/author-2.jpg", "testimonials/author-3.jpg", "testimonials/author-5.jpg"].map((f) => (
            <div key={f} className="relative h-12 overflow-hidden rounded-[6px]">
              <Image src={`/assets/img/home/${f}`} alt="" fill sizes="80px" className="object-cover object-top" />
            </div>
          ))}
        </div>
        <p className="mt-1.5 flex items-center gap-1 px-1 text-[9px] text-[#71717A]">
          <Lock className="h-2.5 w-2.5 text-[#16A34A]" /> learn.apexacademy.com/live · in your browser
        </p>
      </div>
    );
  if (t.includes("meet"))
    return (
      <div className={cn("flex w-full max-w-[250px] items-center gap-3 p-3", panel)}>
        <Image src="/assets/img/integration/integration-9.png" alt="" width={72} height={72} className="h-10 w-10 object-contain" />
        <div>
          <p className="text-[12px] font-semibold text-[#18181B]">Batch B · Algebra</p>
          <p className="text-[10.5px] text-[#71717A]">Meet link added to calendar invites</p>
        </div>
      </div>
    );
  if (t.includes("subscription") || t.includes("membership"))
    return (
      <div className={cn("w-full max-w-[230px] p-4 text-center", panel)}>
        <p className="text-[10.5px] font-semibold uppercase tracking-wide text-[#6C4BFF]">All-access</p>
        <p className="mt-1 font-urbanist text-[28px] font-semibold leading-none">
          $19<span className="text-[13px] text-[#9A9AA6]">/month</span>
        </p>
        <p className="mt-1.5 text-[10.5px] text-[#71717A]">Every course and live session</p>
        <span className="mt-3 block rounded-full bg-[#0A0A0B] py-1.5 text-[10.5px] font-semibold text-white">Subscribe</span>
      </div>
    );
  if (t.includes("affiliate"))
    return (
      <div className={cn("w-full max-w-[260px] p-3", panel)}>
        <p className="flex items-center gap-1.5 truncate rounded-[8px] bg-[#F8F8FA] px-2 py-1.5 font-mono text-[10px] text-[#52525B]">
          <Link2 className="h-3 w-3 shrink-0" /> apexacademy.com/?ref=priya
        </p>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
          {[
            ["42", "Clicks"],
            ["6", "Sales"],
            ["$84", "Earned"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-[8px] bg-[#F8F8FA] py-1.5">
              <p className="text-[13px] font-semibold">{v}</p>
              <p className="text-[8.5px] text-[#9A9AA6]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    );
  if (t.includes("funnel"))
    return (
      <div className="flex w-full max-w-[270px] flex-col items-center gap-1.5">
        {[
          ["Free lesson", "100%", "w-full"],
          ["Checkout", "38%", "w-[78%]"],
          ["Add workbook", "21%", "w-[56%]"],
        ].map(([l, v, w], i) => (
          <div key={l} className={cn("flex items-center justify-between rounded-[10px] px-3 py-2 text-[10.5px] font-semibold", w, i === 0 ? "bg-[#0A0A0B] text-white" : i === 1 ? "bg-[#3F3F46] text-white" : "bg-[#E4E4E7] text-[#18181B]")}>
            <span>{l}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    );
  if (t.includes("quiz"))
    return (
      <div className={cn("w-full max-w-[260px] p-3", panel)}>
        <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#6C4BFF]">
          <FileText className="h-3 w-3" /> Draft questions from Lesson 3
        </p>
        {["What stops a while loop?", "What does range(5) return?"].map((q) => (
          <p key={q} className="mt-1.5 flex items-center gap-1.5 rounded-[8px] bg-[#F8F8FA] px-2 py-1.5 text-[10.5px] text-[#27272A]">
            <Check className="h-3 w-3 text-[#16A34A]" strokeWidth={3} /> {q}
          </p>
        ))}
        <p className="mt-1.5 text-[9px] text-[#9A9AA6]">Teacher reviews before publishing</p>
      </div>
    );
  return <PlayCircle className="h-10 w-10 text-[#B4B4BE]" />;
}

export function RoadmapV5({ data }: { data: RoadmapContent }) {
  const { hero, planned, today, request, faq } = data;
  const items = planned.features;
  // Features grouped as set in the admin ("group" = a group name); the rest go under "More"
  const key = (v: string) => v.trim().toLowerCase();
  const grouped = planned.groups
    .map((g) => ({ name: g.name, sub: g.subtitle, items: items.filter((it) => key(it.group) === key(g.name)) }))
    .filter((g) => g.items.length);
  const used = new Set(grouped.flatMap((g) => g.items));
  const rest = items.filter((i) => !used.has(i));
  if (rest.length) grouped.push({ name: "More", sub: "Also planned", items: rest });

  const loop = [...items, ...items];

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      {/* Hero */}
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
                Roadmap
              </li>
            </ol>
          </nav>
          <h1 style={{ "--d": "80ms" } as React.CSSProperties} className={cn("v5-rise mx-auto mt-6 text-[clamp(52px,10vw,150px)]", BIG)}>
            {hero.title}
            <br />
            <span className="text-[#C4C4CC]">{hero.titleMuted}</span>
          </h1>
          <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-8 max-w-[560px] text-[18px] leading-[1.55] text-[#52525B] sm:text-[20px]">
            {hero.subtitle}
          </p>
          <p style={{ "--d": "240ms" } as React.CSSProperties} className="v5-rise mt-6 inline-flex items-center gap-2 rounded-full border border-[#ECECF1] px-4 py-2 text-[13.5px] text-[#52525B]">
            <Clock className="h-4 w-4" /> {hero.note}
          </p>
        </Container>
        {/* planned items gliding by */}
        <div aria-hidden="true" style={{ "--d": "320ms" } as React.CSSProperties} className="v5-rise mt-14 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="animate-marquee-v4 gap-3">
            {loop.map((it, i) => (
              <span key={i} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#F4F5F8] px-5 py-3 font-urbanist text-[17px] font-semibold tracking-[-0.01em]">
                <span className="h-2 w-2 rounded-full bg-[#6C4BFF]" />
                {it.title}
              </span>
            ))}
          </div>
        </div>
        <div style={{ "--d": "380ms" } as React.CSSProperties} className="v5-rise mt-12 px-4 pb-6 sm:mt-16">
          <RoadmapBoard planned={items.map((i) => ({ title: i.title, category: i.category }))} shipped={today.features.slice(0, 5)} />
        </div>
      </section>

      {/* Themes */}
      <section className="bg-white py-[clamp(80px,10vw,136px)]">
        <Container>
          <div className="rv-v4 mb-12 lg:mb-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#6C4BFF]">{planned.eyebrow}</p>
            <h2 className={cn("mt-5 text-[clamp(44px,6.5vw,92px)]", BIG)}>
              {planned.title}
              <br />
              <span className="text-[#C4C4CC]">{planned.titleMuted}</span>
            </h2>
          </div>
          <div className="space-y-4">
            {grouped.map((g, gi) => (
              <div key={g.name} className="rv-v4 grid gap-4 rounded-[32px] bg-[#F4F5F8] p-4 sm:p-6 lg:grid-cols-[300px_1fr] lg:gap-6 lg:p-8">
                <div className="flex flex-col justify-between p-2 lg:p-2">
                  <div>
                    <span className={cn("block text-[80px] text-[#DCDCE3]", BIG)}>{String(gi + 1).padStart(2, "0")}</span>
                    <h2 className={cn("mt-4 text-[clamp(32px,3.6vw,46px)]", BIG)}>{g.name}</h2>
                    <p className="mt-2 text-[15px] text-[#71717A]">{g.sub}</p>
                  </div>
                  <p className="mt-6 text-[13px] text-[#9A9AA6]">
                    {g.items.length} planned {g.items.length === 1 ? "feature" : "features"}
                  </p>
                </div>
                <div className={cn("grid gap-4", g.items.length >= 3 ? "md:grid-cols-3" : g.items.length === 2 ? "md:grid-cols-2" : "")}>
                  {g.items.map((it, i) => (
                    <article
                      key={`${it.title}-${i}`}
                      style={{ "--rv-delay": `${i * 100}ms` } as React.CSSProperties}
                      className="rv-v4 group flex flex-col overflow-hidden rounded-[24px] bg-white transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(16,16,24,0.3)]"
                    >
                      <div aria-hidden="true" className="grid h-[190px] place-items-center bg-[#FAFAFB] px-5 transition-colors duration-500 group-hover:bg-[#F1EDFF]/60">
                        <div className="w-full transition-transform duration-500 group-hover:-translate-y-1 [&>*]:mx-auto">
                          <Preview title={it.title} />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[12px] font-medium text-[#71717A]">{it.category}</span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F8] px-2.5 py-0.5 text-[11px] font-semibold text-[#52525B]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" /> Planned
                          </span>
                        </div>
                        <h3 className="mt-3 font-urbanist text-[21px] font-semibold leading-[1.2] tracking-[-0.015em]">{it.title}</h3>
                        <p className="mt-2 text-[14.5px] leading-[1.6] text-[#6B6B76]">{it.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {planned.footnote && <p className="rv-v4 mt-6 text-center text-[13px] text-[#9A9AA6]">{planned.footnote}</p>}
        </Container>
      </section>

      <RoadmapProcess data={data.process} />

      {/* Available today */}
      <section className="px-2 sm:px-3">
        <div className="rounded-[28px] bg-[#0A0A0B] py-[clamp(72px,10vw,130px)] text-white sm:rounded-[40px]">
          <Container>
            <div className="rv-v4 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/55">{today.eyebrow}</p>
                <h2 className={cn("mt-5 text-[clamp(44px,7vw,100px)]", BIG)}>
                  {today.title}
                  <br />
                  <span className="text-white/35">{today.titleMuted}</span>
                </h2>
              </div>
              <ul className="flex flex-wrap gap-2">
                {today.features.map((t, i) => (
                  <li
                    key={`${t}-${i}`}
                    style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
                    className="v5-pop inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[14px] text-white/85"
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-[#6C4BFF]">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/platform" className="rv-v4 group mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-white hover:text-[#C9BFFF]">
              {today.linkText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Container>
        </div>
      </section>

      {/* Request */}
      <section className="bg-white py-[clamp(80px,10vw,136px)]">
        <Container>
          <div className="rv-v4 grid items-center gap-8 rounded-[32px] bg-[#F1EDFF] p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex">
                {["participant_mia.jpg", "participant_alex.jpg", "testimonials/author-5.jpg"].map((f, i) => (
                  <Image key={f} src={`/assets/img/home/${f}`} alt="" width={80} height={80} className={cn("h-11 w-11 rounded-full object-cover object-top ring-4 ring-[#F1EDFF]", i > 0 && "-ml-3")} />
                ))}
              </div>
              <h2 className={cn("mt-6 text-[clamp(32px,4vw,52px)]", BIG)}>{request.title.replace(/\.$/, "")}</h2>
              <p className="mt-4 max-w-[520px] text-[16.5px] leading-[1.6] text-[#52525B]">{request.subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <DemoButton label={request.buttonText} className="h-14 w-full px-7 text-[16px] lg:w-auto" />
              <Link href="/contact" className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]">
                <MessageCircle className="h-4 w-4" /> {request.linkText}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <FAQ
        id="roadmap-faq"
        minimal
        eyebrow="FAQs"
        title={faq.title}
        subtitle={faq.subtitle}
        items={faq.items.map((q) => ({ question: q.question, answer: roadmapAnswerHtml(q.answer) }))}
      />
      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>
    </div>
  );
}

