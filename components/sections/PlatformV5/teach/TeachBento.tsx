import React from "react";
import { BookOpen, Check, FileText, Lock, PlayCircle, Type, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, Field, Face, d, fadeRight } from "../bento";
import { BrandMark } from "@/components/brand/PartnerMarks";
import { PLATFORM_CARDS, type PlatformCard } from "@/content/platform/cards";

/*
 * Teach feature cards in the Wiza / finerrr style: grey card, a small product UI on top
 * (contained, no clipped text), then a short title and one line. Sample data only.
 */

/* 1. Course builder: course → details → lessons, joined by connector lines */
function CoursesArt() {
  const lessons = [
    { i: PlayCircle, t: "Welcome and setup", m: "Video · 6 min" },
    { i: FileText, t: "Python cheat sheet", m: "PDF · 4 pages" },
    { i: Type, t: "How variables work", m: "Text · 5 min read" },
  ];
  return (
    <div className="absolute inset-0 pl-7 pt-8">
      <div className="absolute left-[46px] top-[58px] h-[164px] w-px bg-[#DCDCE3]" />
      <Panel className="v5-pop relative inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0A0A0B] text-white">
          <BookOpen className="h-4 w-4" />
        </span>
        <span className="text-[13.5px] font-semibold text-[#18181B]">Python for Beginners</span>
      </Panel>

      <div style={d(100)} className={cn("v5-pop relative ml-[38px] mt-4 flex gap-2", fadeRight)}>
        <span className="absolute -left-[19px] top-1/2 h-px w-[19px] bg-[#DCDCE3]" />
        <Field label="Modules" value="6" />
        <Field label="Lessons" value="48" />
        <Field label="Release" value="Weekly" />
        <Field label="Access" value="12 months" />
      </div>

      <div style={d(200)} className={cn("v5-pop v5-lift relative ml-[38px] mt-3 flex gap-2", fadeRight)}>
        <span className="absolute -left-[19px] top-1/2 h-px w-[19px] bg-[#DCDCE3]" />
        {lessons.map(({ i: Icon, t, m }, li) => (
          <Panel
            key={t}
            style={{ "--fd": `${li * -2}s` } as React.CSSProperties}
            className="mo-float flex w-[188px] shrink-0 items-center gap-2.5 p-2.5"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-[#18181B]">{t}</p>
              <p className="truncate text-[11px] text-[#9A9AA6]">{m}</p>
            </div>
          </Panel>
        ))}
      </div>

      <div style={d(300)} className="v5-pop relative ml-[38px] mt-3">
        <span className="absolute -left-[19px] top-1/2 h-px w-[19px] bg-[#DCDCE3]" />
        <Panel className="mo-glow inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-semibold text-[#18181B]">
          <Upload className="h-3.5 w-3.5" /> Publish course
        </Panel>
      </div>
    </div>
  );
}

/* 2. Drip release: weekly timeline */
function DripArt() {
  const weeks = [
    { w: "Week 1", t: "Getting started", s: "open" },
    { w: "Week 2", t: "Variables and data", s: "open" },
    { w: "Week 3", t: "Loops and conditions", s: "next" },
    { w: "Week 4", t: "Functions", s: "locked" },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[290px] rounded-[18px] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-[#18181B]">Release schedule</p>
          <span className="rounded-full bg-[#F4F5F8] px-2.5 py-0.5 text-[11px] font-semibold text-[#3F3F46]">Weekly</span>
        </div>
        <ul className="relative mt-3.5 space-y-2.5">
          <span className="absolute bottom-3 left-[9px] top-3 w-px bg-[#E4E4E7]" />
          {weeks.map((x) => (
            <li key={x.w} className={cn("relative flex items-center gap-3", x.s === "locked" && "opacity-50")}>
              <span
                className={cn(
                  "relative grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full",
                  x.s === "open" && "bg-[#0A0A0B] text-white",
                  x.s === "next" && "mo-ping border-2 border-[#6C4BFF] bg-white text-[#6C4BFF]",
                  x.s === "locked" && "bg-[#F4F4F5] text-[#71717A]"
                )}
              >
                {x.s === "open" && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                {x.s === "locked" && <Lock className="h-2.5 w-2.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-[#9A9AA6]">{x.w}</p>
                <p className="truncate text-[12.5px] font-medium text-[#18181B]">{x.t}</p>
              </div>
              {x.s === "next" && (
                <span className="shrink-0 rounded-full bg-[#F1EDFF] px-2 py-0.5 text-[10.5px] font-semibold text-[#6C4BFF]">Mon 10 Mar</span>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/* 3. Live classes: this week's schedule */
function LiveArt() {
  const rows = [
    { day: "Mon", time: "18:00", t: "Loops in practice", live: true },
    { day: "Wed", time: "18:00", t: "Functions, part 1", live: false },
    { day: "Fri", time: "18:00", t: "Weekly doubt clearing", live: false },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <Panel className="v5-pop v5-lift w-[300px] rounded-[18px] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-[#18181B]">This week · Batch B</p>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#71717A]">
            <BrandMark name="Zoom" size={12} className="rounded-[3px]" /> Zoom
          </span>
        </div>
        <div className="mt-2.5 space-y-1">
          {rows.map((r) => (
            <div
              key={r.day}
              className={cn("flex items-center gap-3 rounded-[11px] px-2.5 py-1.5", r.live ? "mo-glow bg-[#F4F5F8]" : "")}
            >
              <div className="w-9 shrink-0 text-center">
                <p className="text-[10.5px] font-semibold uppercase text-[#9A9AA6]">{r.day}</p>
                <p className="text-[12px] font-semibold tabular-nums text-[#18181B]">{r.time}</p>
              </div>
              <p className="min-w-0 flex-1 truncate text-[12.5px] text-[#27272A]">{r.t}</p>
              {r.live && (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0A0A0B] px-2.5 py-1 text-[10.5px] font-semibold text-white">
                  <span className="mo-ping h-1.5 w-1.5 rounded-full bg-[#F87171] text-[#F87171]" /> Join
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-2 border-t border-[#F1F1F4] pt-2.5">
          <div className="flex">
            <Face src="/assets/img/home/testimonials/author-1.jpg" size={22} className="ring-2 ring-white" />
            <Face src="/assets/img/home/testimonials/author-2.jpg" size={22} className="-ml-1.5 ring-2 ring-white" />
            <Face src="/assets/img/home/testimonials/author-3.jpg" size={22} className="-ml-1.5 ring-2 ring-white" />
          </div>
          <p className="text-[11px] text-[#71717A]">24 learners · reminders sent</p>
        </div>
      </Panel>
    </div>
  );
}

/* 4. Recordings saved to the course (finerrr-style staggered rows) */
function RecordingsArt() {
  const rows = [
    { t: "Loops in practice", m: "Saved to Module 3 · 52 min" },
    { t: "Variables and data", m: "Saved to Module 2 · 48 min" },
    { t: "Getting started", m: "Saved to Module 1 · 45 min" },
  ];
  return (
    <div className="absolute inset-0 pt-9">
      {rows.map((r, i) => (
        <Panel
          key={r.t}
          className={cn("v5-pop relative mb-3 flex items-center gap-3 rounded-[16px] p-2.5", i === 0 && "v5-lift", i === 2 && "opacity-70")}
          style={{ marginLeft: 24 + i * 26, width: `min(340px, calc(100% - ${48 + i * 26}px))`, "--d": `${i * 130}ms` } as React.CSSProperties}
        >
          <span className="relative grid h-11 w-16 shrink-0 place-items-center overflow-hidden rounded-[9px] bg-[#1C1A26] text-white">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#3A3550,transparent_70%)]" />
            <PlayCircle className="relative h-4 w-4" />
            <span className="absolute inset-x-1.5 bottom-1 h-0.5 rounded-full bg-white/25">
              <span className="block h-full rounded-full bg-white" style={{ width: `${[100, 64, 30][i]}%` }} />
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{r.t}</p>
            <p className="truncate text-[11px] text-[#9A9AA6]">{r.m}</p>
          </div>
          {i === 0 && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#E8F7EF] px-2 py-0.5 text-[10.5px] font-semibold text-[#15803D]">
              <span className="mo-ping h-1.5 w-1.5 rounded-full bg-[#16A34A] text-[#16A34A]" /> New
            </span>
          )}
        </Panel>
      ))}
    </div>
  );
}

/* 5. Bootcamps: cohort with milestones */
function BootcampArt() {
  const steps = [
    { w: "Week 1", t: "Kick-off", s: "done" },
    { w: "Week 3", t: "Project 1", s: "done" },
    { w: "Week 6", t: "Review", s: "now" },
    { w: "Week 8", t: "Demo day", s: "next" },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-8">
      <Panel className="v5-pop v5-lift w-[min(400px,calc(100%-40px))] rounded-[18px] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-[#18181B]">Data Analysis Bootcamp</p>
            <p className="text-[11.5px] text-[#9A9AA6]">Cohort 4 · Starts 3 March</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#F4F5F8] px-2.5 py-0.5 text-[11px] font-semibold text-[#3F3F46]">8 weeks</span>
        </div>
        <div className="relative mt-5 grid grid-cols-4">
          <span className="absolute left-[12.5%] right-[12.5%] top-[9px] h-px bg-[#E4E4E7]" />
          <span className="v5-fill absolute left-[12.5%] top-[9px] h-px w-[50%] bg-[#0A0A0B]" style={{ "--w": "50%" } as React.CSSProperties} />
          {steps.map((s) => (
            <div key={s.w} className="relative flex flex-col items-center text-center">
              <span
                className={cn(
                  "grid h-[19px] w-[19px] place-items-center rounded-full",
                  s.s === "done" && "bg-[#0A0A0B] text-white",
                  s.s === "now" && "mo-ping border-2 border-[#6C4BFF] bg-white text-[#6C4BFF]",
                  s.s === "next" && "border border-[#D4D4D8] bg-white"
                )}
              >
                {s.s === "done" && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
              </span>
              <p className="mt-2 text-[10.5px] text-[#9A9AA6]">{s.w}</p>
              <p className="text-[12px] font-medium text-[#18181B]">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-[#F1F1F4] pt-3">
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="text-[#71717A]">Project 1 reviewed</span>
            <span className="font-semibold tabular-nums text-[#18181B]">22 of 24</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
            <div className="v5-fill h-full w-[92%] rounded-full bg-[#0A0A0B]" style={{ "--w": "92%" } as React.CSSProperties} />
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* 6. 1:1 tutor booking: pick a day and time */
function TutorArt() {
  const days = [
    { d: "Mon", n: "10" },
    { d: "Tue", n: "11" },
    { d: "Wed", n: "12" },
    { d: "Thu", n: "13" },
  ];
  const slots = ["09:00", "11:30", "15:00", "17:30"];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(330px,calc(100%-40px))] rounded-[18px] p-4">
        <div className="flex items-center gap-3">
          <Face src="/assets/img/home/participant_mia.jpg" size={38} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-semibold text-[#18181B]">1:1 with Mia Collins</p>
            <p className="text-[11.5px] text-[#9A9AA6]">Maths tutor · 45 min</p>
          </div>
          <span className="text-[13px] font-semibold tabular-nums text-[#18181B]">$40</span>
        </div>
        <div className="mt-3.5 grid grid-cols-4 gap-1.5">
          {days.map((x) => (
            <span
              key={x.n}
              className={cn(
                "rounded-[10px] border py-1.5 text-center",
                x.n === "11" ? "border-[#0A0A0B] bg-[#0A0A0B] text-white" : "border-[#EDEDF1] text-[#3F3F46]"
              )}
            >
              <span className="block text-[10px] opacity-70">{x.d}</span>
              <span className="block text-[13px] font-semibold">{x.n}</span>
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {slots.map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-[9px] border py-1.5 text-center text-[11.5px] font-medium tabular-nums",
                t === "11:30" ? "mo-glow border-[#6C4BFF] bg-[#F7F5FF] text-[#6C4BFF]" : "border-[#EDEDF1] text-[#3F3F46]",
                t === "17:30" && "opacity-40 line-through"
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-3.5 block rounded-full bg-[#0A0A0B] py-2 text-center text-[12px] font-semibold text-white">
          Book Tue 11, 11:30
        </span>
      </Panel>
    </div>
  );
}

/** Six cards (layout and pictures by position); text from Admin > Website > Platform. */
export function TeachBento({ cards = PLATFORM_CARDS.teach }: { cards?: PlatformCard[] } = {}) {
  const card = (i: number) => cards[i] || PLATFORM_CARDS.teach[i];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        className="md:col-span-2 lg:col-span-7"
        title={card(0).title}
        body={card(0).text}
      >
        <CoursesArt />
      </Card>
      <Card
        className="lg:col-span-5"
        delay={90}
        title={card(1).title}
        body={card(1).text}
      >
        <DripArt />
      </Card>
      <Card
        className="lg:col-span-5"
        title={card(2).title}
        body={card(2).text}
      >
        <LiveArt />
      </Card>
      <Card
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        title={card(3).title}
        body={card(3).text}
      >
        <RecordingsArt />
      </Card>
      <Card
        className="lg:col-span-6"
        plan="Growth"
        title={card(4).title}
        body={card(4).text}
      >
        <BootcampArt />
      </Card>
      <Card
        className="lg:col-span-6"
        delay={90}
        plan="Growth"
        title={card(5).title}
        body={card(5).text}
      >
        <TutorArt />
      </Card>
    </div>
  );
}
