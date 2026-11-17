"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  PenLine,
  Sunrise,
  ShieldCheck,
  BookOpenCheck,
  UserCheck,
  PlayCircle,
  FileText,
  ListChecks,
  SendHorizontal,
  Users,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DomieOrb } from "@/components/ai/DomieOrb";
import { HOME_DEFAULTS, type HomeSections } from "@/content/home-sections";

/** The only dark section on the homepage: Domie AI, shown as a live product window. */

type TabId = "helpdesk" | "drafts" | "summary";

const TABS: { id: TabId; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "helpdesk", label: "Answers learners", desc: "Learners get answers from your own lessons, day or night.", icon: MessageCircle },
  { id: "drafts", label: "Drafts course material", desc: "First drafts of outlines, notes and quizzes, ready for your review.", icon: PenLine },
  { id: "summary", label: "Daily summary", desc: "A short morning note on what needs your attention today.", icon: Sunrise },
];

const AUTOPLAY_MS = 7000;

function Chip({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-[14px] border border-white/[0.08] bg-white/[0.035]", className)}>{children}</div>;
}

function DomieBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="v5-seq flex gap-3" style={{ "--d": "280ms" } as React.CSSProperties}>
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#15151C] ring-1 ring-white/10">
        <DomieOrb size={30} surface="dark" />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function UserBubble({ avatar, initials, children }: { avatar?: string; initials?: string; children: React.ReactNode }) {
  return (
    <div className="v5-seq flex justify-end gap-3">
      <div className="max-w-[78%] rounded-[16px] rounded-tr-[6px] bg-white px-4 py-2.5 text-[14px] leading-[1.5] text-[#0A0A0B]">
        {children}
      </div>
      {avatar ? (
        <Image src={avatar} alt="" width={64} height={64} className="h-8 w-8 shrink-0 rounded-full object-cover object-top" />
      ) : (
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[11px] font-semibold text-white">
          {initials}
        </span>
      )}
    </div>
  );
}

/* ---------------- Tab views (sample data) ---------------- */

function HelpdeskView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
      <div className="flex flex-col gap-4">
        <UserBubble avatar="/assets/img/home/testimonials/author-1.jpg">
          I missed yesterday&apos;s class. Where can I watch it?
        </UserBubble>
        <DomieBubble>
          <div className="rounded-[16px] rounded-tl-[6px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[14px] leading-[1.6] text-[#E4E4E7]">
            The recording of <span className="font-semibold text-white">Algebra: quadratic equations</span> is in Module 3,
            under Live sessions. It&apos;s 58 minutes long, and the class notes are attached below it.
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A99BFF]/15 px-2.5 py-1 text-[12px] text-[#CFC7FF]">
                <PlayCircle className="h-3.5 w-3.5" /> Module 3 · Recording
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A99BFF]/15 px-2.5 py-1 text-[12px] text-[#CFC7FF]">
                <FileText className="h-3.5 w-3.5" /> Class notes · PDF
              </span>
            </div>
          </div>
          <div className="v5-seq mt-3 flex flex-wrap gap-2" style={{ "--d": "650ms" } as React.CSSProperties}>
            {["When is the next class?", "Show me the practice questions"].map((q) => (
              <span key={q} className="rounded-full border border-white/10 px-3 py-1 text-[12.5px] text-[#A1A1AA]">
                {q}
              </span>
            ))}
          </div>
        </DomieBubble>
        <div className="mt-auto flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="flex-1 text-[13.5px] text-[#8A8A94]">Ask anything about your course…</span>
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-white text-[#0A0A0B]">
            <SendHorizontal className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="v5-seq hidden flex-col gap-3 xl:flex" style={{ "--d": "450ms" } as React.CSSProperties}>
        <Chip className="p-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Answered from</p>
          <div className="mt-3 space-y-2">
            {[
              { i: PlayCircle, t: "Module 3 · Live sessions", s: "Recording · 58 min" },
              { i: FileText, t: "Class notes: quadratics", s: "PDF · 6 pages" },
            ].map(({ i: Icon, t, s }) => (
              <div key={t} className="flex items-center gap-3 rounded-[10px] bg-white/[0.04] px-3 py-2.5">
                <Icon className="h-4 w-4 text-[#A99BFF]" />
                <div>
                  <p className="text-[13px] text-white">{t}</p>
                  <p className="text-[11.5px] text-[#71717A]">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </Chip>
        <Chip className="flex-1 p-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Today</p>
          <p className="mt-2 font-urbanist text-[34px] font-semibold leading-none tracking-[-0.02em] text-white">38</p>
          <p className="mt-1 text-[13px] text-[#A1A1AA]">learner questions answered</p>
          <div className="mt-4 flex h-12 items-end gap-1.5">
            {[30, 45, 38, 60, 52, 70, 88].map((h, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-[4px]", i === 6 ? "bg-[#A99BFF]" : "bg-white/10")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </Chip>
      </div>
    </div>
  );
}

function DraftsView() {
  const lessons = [
    { i: PlayCircle, t: "Lesson 1: Where your money goes", m: "Video script · 8 min" },
    { i: FileText, t: "Lesson 2: Building a simple budget", m: "Reading · 1,200 words" },
    { i: PlayCircle, t: "Lesson 3: Saving for a goal", m: "Video script · 10 min" },
    { i: ListChecks, t: "Check your understanding", m: "Quiz · 8 questions" },
  ];
  return (
    <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
      <div className="flex flex-col gap-4">
        <UserBubble initials="PS">Draft a beginner module on personal budgeting, with a short quiz at the end.</UserBubble>
        <DomieBubble>
          <div className="rounded-[16px] rounded-tl-[6px] border border-white/[0.08] bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-semibold text-white">Module 4: Budgeting basics</p>
              <span className="rounded-full bg-[#F59E0B]/15 px-2.5 py-0.5 text-[11.5px] font-medium text-[#FCD34D]">Draft</span>
            </div>
            <div className="mt-3 space-y-2">
              {lessons.map(({ i: Icon, t, m }, n) => (
                <div
                  key={t}
                  style={{ "--d": `${450 + n * 110}ms` } as React.CSSProperties}
                  className="v5-seq flex items-center gap-3 rounded-[10px] bg-white/[0.04] px-3 py-2.5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#A99BFF]" />
                  <p className="min-w-0 flex-1 truncate text-[13px] text-[#E4E4E7]">{t}</p>
                  <p className="hidden shrink-0 text-[11.5px] text-[#71717A] sm:block">{m}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <span className="rounded-[9px] bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[#0A0A0B]">Add to course</span>
              <span className="rounded-[9px] border border-white/15 px-3.5 py-2 text-[12.5px] text-[#E4E4E7]">Edit draft</span>
            </div>
          </div>
        </DomieBubble>
      </div>

      <div className="v5-seq hidden flex-col gap-3 xl:flex" style={{ "--d": "450ms" } as React.CSSProperties}>
        <Chip className="p-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Draft settings</p>
          <div className="mt-3 space-y-2.5 text-[13px]">
            {[
              ["Level", "Beginner"],
              ["Tone", "Friendly"],
              ["Style", "Matches your modules"],
              ["Language", "English"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/[0.06] pb-2.5 last:border-0 last:pb-0">
                <span className="text-[#71717A]">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
        </Chip>
        <Chip className="flex flex-1 items-start gap-3 p-4">
          <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#A99BFF]" />
          <p className="text-[13.5px] leading-[1.55] text-[#D4D4D8]">
            Nothing is published until you review and approve it. Edit anything before learners see it.
          </p>
        </Chip>
      </div>
    </div>
  );
}

function SummaryView() {
  const actions = [
    { t: "Batch B is almost full (28 of 30 seats).", a: "Open Batch C" },
    { t: "3 learners haven't logged in for 7 days.", a: "Send reminder" },
    { t: "5 assignments are waiting for review.", a: "Review now" },
  ];
  return (
    <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
      <DomieBubble>
        <p className="text-[15px] font-semibold text-white">Good morning, Priya.</p>
        <p className="mt-1 text-[14px] text-[#A1A1AA]">Here&apos;s what needs your attention today.</p>
        <div className="mt-4 space-y-2.5">
          {actions.map((x, i) => (
            <div
              key={x.t}
              style={{ "--d": `${420 + i * 130}ms` } as React.CSSProperties}
              className="v5-seq flex flex-col gap-3 rounded-[14px] border border-white/[0.08] bg-white/[0.04] p-3.5 sm:flex-row sm:items-center"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#A99BFF]/15 text-[12px] font-semibold text-[#CFC7FF]">
                {i + 1}
              </span>
              <p className="flex-1 text-[13.5px] text-[#E4E4E7]">{x.t}</p>
              <span className="w-fit shrink-0 rounded-[9px] border border-white/15 px-3 py-1.5 text-[12px] font-medium text-white">
                {x.a}
              </span>
            </div>
          ))}
        </div>
      </DomieBubble>

      <div className="v5-seq hidden grid-cols-2 gap-3 xl:grid" style={{ "--d": "450ms" } as React.CSSProperties}>
        {[
          { i: Users, k: "Attendance", v: "94%", d: "+2% this week" },
          { i: TrendingUp, k: "New sign-ups", v: "18", d: "since yesterday" },
          { i: BookOpenCheck, k: "Lessons completed", v: "312", d: "this week" },
          { i: Sunrise, k: "Classes today", v: "6", d: "first at 9:00 AM" },
        ].map(({ i: Icon, k, v, d }) => (
          <Chip key={k} className="p-4">
            <Icon className="h-4 w-4 text-[#A99BFF]" />
            <p className="mt-3 font-urbanist text-[28px] font-semibold leading-none tracking-[-0.02em] text-white">{v}</p>
            <p className="mt-1.5 text-[12.5px] text-[#D4D4D8]">{k}</p>
            <p className="text-[11.5px] text-[#71717A]">{d}</p>
          </Chip>
        ))}
      </div>
    </div>
  );
}

const VIEWS: Record<TabId, React.ComponentType> = {
  helpdesk: HelpdeskView,
  drafts: DraftsView,
  summary: SummaryView,
};

const POINTS = [
  { i: BookOpenCheck, t: "Grounded in your content", b: "Answers and drafts come from your own courses, not the open internet." },
  { i: UserCheck, t: "You stay in control", b: "Review everything before it goes live. Turn tools on or off any time." },
  { i: ShieldCheck, t: "Private by default", b: "Your course content is never used to train outside AI models." },
];

function scrollToY(y: number) {
  const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, o?: object) => void } }).lenis;
  if (lenis?.scrollTo) lenis.scrollTo(y, { duration: 1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Domie AI (Pro). Text from Admin > Home > Domie AI; the three tools keep their scenes by position. */
export function AiSection({ data = HOME_DEFAULTS.ai }: { data?: HomeSections["ai"] }) {
  const tabs = TABS.map((t, i) => ({ ...t, label: data.tools[i]?.label || t.label, desc: data.tools[i]?.text || t.desc }));
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<TabId>("helpdesk");
  const [pinned, setPinned] = useState(false); // desktop: scroll drives the tabs
  const [segment, setSegment] = useState(0); // 0..1 progress inside the active tab while pinned
  const [autoplay, setAutoplay] = useState(true); // phones / short screens

  // Pin only on large, tall screens without reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Scroll position → active tab
  useEffect(() => {
    if (!pinned) return;
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      const idx = Math.min(TABS.length - 1, Math.floor(p * TABS.length));
      setActive(TABS[idx].id);
      setSegment(Math.min(1, p * TABS.length - idx));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  // Autoplay when not pinned
  useEffect(() => {
    if (pinned || !autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      const idx = TABS.findIndex((x) => x.id === active);
      setActive(TABS[(idx + 1) % TABS.length].id);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, autoplay, pinned]);

  const select = useCallback(
    (id: TabId) => {
      const idx = TABS.findIndex((x) => x.id === id);
      if (pinned && trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const total = rect.height - window.innerHeight;
        scrollToY(top + ((idx + 0.15) / TABS.length) * total);
      } else {
        setActive(id);
        setAutoplay(false);
      }
    },
    [pinned]
  );

  const View = VIEWS[active];

  return (
    <section id="domie-ai" className="relative isolate bg-[#07070B] text-white">
      {/* Scroll track: tall on desktop so the sticky stage stays pinned through all three tabs */}
      <div ref={trackRef} className={cn("relative", pinned && "h-[calc(100vh+210vh)]")}>
        <div
          className={cn(
            "relative overflow-hidden",
            pinned ? "sticky top-0 flex h-screen items-center pt-16" : "pb-4 pt-[clamp(88px,11vw,140px)]"
          )}
        >
          {/* Aurora + fading grid */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-340px] h-[680px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.42),transparent)] blur-2xl" />
            <div className="absolute right-[-200px] top-[30%] h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(59,91,255,0.18),transparent)] blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_20%,transparent_70%)]" />
          </div>

          <div className="mx-auto grid w-full max-w-[1360px] items-center gap-10 px-[clamp(16px,4vw,40px)] lg:grid-cols-[360px_1fr] lg:gap-12 xl:grid-cols-[400px_1fr]">
            {/* Left: heading + tab list */}
            <div className="text-center lg:text-left">
              <div className="inline-flex rounded-full p-[1px] [background:linear-gradient(180deg,rgba(169,155,255,0.6),rgba(255,255,255,0.05))]">
                <div className="rounded-full bg-[#0D0D13] p-1.5">
                  <DomieOrb size={40} surface="dark" />
                </div>
              </div>
              <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-[13px] font-medium text-[#E4E4E7] lg:ml-3 lg:align-[14px]">
                {data.badge}
              </p>
              <h2 className="mt-5 font-urbanist text-[clamp(34px,4vw,50px)] font-semibold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
                {data.titleBefore}{" "}
                <span className="bg-gradient-to-r from-[#CFC7FF] via-[#A99BFF] to-[#7C9BFF] bg-clip-text text-transparent">
                  {data.titleHighlight}
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.6] text-[#A1A1AA] lg:mx-0">
                {data.subtitle}
              </p>

              {/* Desktop: vertical tabs with scroll progress */}
              <div role="tablist" aria-label="Domie AI tools" className="mt-8 hidden flex-col gap-2 lg:flex">
                {tabs.map(({ id, label, desc, icon: Icon }, i) => {
                  const isActive = id === active;
                  const activeIdx = TABS.findIndex((x) => x.id === active);
                  const fill = !pinned ? (isActive ? 1 : 0) : i < activeIdx ? 1 : isActive ? segment : 0;
                  return (
                    <button
                      key={id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls="domie-panel"
                      onClick={() => select(id)}
                      className={cn(
                        "relative cursor-pointer overflow-hidden rounded-[16px] border px-5 py-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-[#A99BFF]",
                        isActive ? "border-white/15 bg-white/[0.06]" : "border-transparent hover:bg-white/[0.03]"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid h-8 w-8 place-items-center rounded-[9px] transition-colors",
                            isActive ? "bg-[#6C4BFF] text-white" : "bg-white/[0.06] text-[#A1A1AA]"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className={cn("text-[15.5px] font-semibold", isActive ? "text-white" : "text-[#A1A1AA]")}>{label}</span>
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300",
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pl-11 pt-1.5 text-[14px] leading-[1.55] text-[#A1A1AA]">{desc}</span>
                        </span>
                      </span>
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]">
                        <span className="block h-full bg-[#A99BFF] transition-[width] duration-150" style={{ width: `${fill * 100}%` }} />
                      </span>
                    </button>
                  );
                })}
                {pinned && <p className="mt-2 pl-1 text-[12.5px] text-[#71717A]">Scroll to see each tool</p>}
              </div>

              {/* Phones / tablets: horizontal tabs */}
              <div className="mt-8 flex justify-center lg:hidden">
                <div role="tablist" aria-label="Domie AI tools" className="inline-flex max-w-full gap-1 overflow-x-auto rounded-[14px] border border-white/10 bg-white/[0.04] p-1">
                  {tabs.map(({ id, label, icon: Icon }) => {
                    const isActive = id === active;
                    return (
                      <button
                        key={id}
                        role="tab"
                        type="button"
                        aria-selected={isActive}
                        aria-controls="domie-panel"
                        onClick={() => select(id)}
                        className={cn(
                          "flex shrink-0 cursor-pointer items-center gap-2 rounded-[10px] px-3.5 py-2.5 text-[13px] font-medium transition-colors",
                          isActive ? "bg-white text-[#0A0A0B]" : "text-[#A1A1AA]"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: product window */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-x-10 -top-10 bottom-10 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(108,75,255,0.28),transparent)] blur-2xl"
              />
              <div className="rounded-[24px] p-px [background:linear-gradient(180deg,rgba(169,155,255,0.55),rgba(255,255,255,0.08)_35%,rgba(255,255,255,0.04))]">
                <div className="overflow-hidden rounded-[23px] bg-[#0C0C11]">
                  <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-3.5">
                    <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-[#15151C]">
                      <DomieOrb size={26} surface="dark" />
                    </span>
                    <p className="text-[14px] font-semibold">Domie</p>
                    <span className="text-[13px] text-[#8A8A94]">· Northwind Academy</span>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-[#A1A1AA]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> Online
                    </span>
                  </div>
                  <div
                    id="domie-panel"
                    role="tabpanel"
                    key={active}
                    className="min-h-[400px] p-5 lg:h-[470px] lg:overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500 sm:p-6"
                  >
                    <View />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* After the pinned stage: key points + link */}
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)] pb-[clamp(88px,11vw,140px)] pt-12">
        <div className="grid gap-8 border-t border-white/[0.08] pt-12 sm:grid-cols-3">
          {POINTS.map(({ i: Icon, t, b }) => (
            <div key={t} className="rv-v4">
              <Icon className="h-5 w-5 text-[#A99BFF]" />
              <h3 className="mt-3 text-[16px] font-semibold">{t}</h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[#A1A1AA]">{b}</p>
            </div>
          ))}
        </div>
        <div className="rv-v4 mt-12 flex justify-center">
          <Link
            href="/platform/ai"
            className="group inline-flex h-11 items-center gap-2 rounded-[10px] bg-white px-5 text-[14.5px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#E4E4E7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A99BFF]"
          >
            Explore Domie AI
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
