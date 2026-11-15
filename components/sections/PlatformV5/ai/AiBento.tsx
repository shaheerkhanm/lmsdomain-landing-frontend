import React from "react";
import { CalendarDays, Check, CornerDownLeft, PenLine, Search, ShieldCheck, TrendingDown, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, Face, d } from "../bento";

/* Domie AI for your team. Plain product UI only. Claims match content/platform/ai.ts. */

/* 1. Course drafts: titles, descriptions, learning outcomes */
function DraftsArt() {
  return (
    <div className="absolute inset-0 flex justify-center px-6 pt-5">
      <Panel className="v5-pop v5-lift w-full max-w-[460px] rounded-[18px] p-3.5">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#18181B]">New course · Data Analysis Bootcamp</p>
          <span className="rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10.5px] font-medium text-[#52525B]">Draft</span>
        </div>
        <div className="mt-2.5 space-y-2">
          <div style={d(150)} className="v5-pop">
            <p className="text-[10.5px] text-[#9A9AA6]">Description</p>
            <p className="mt-1 rounded-[10px] border border-[#EDEDF1] px-3 py-2 text-[12px] leading-[1.5] text-[#27272A]">
              Learn to clean, analyse and present data in eight weeks, with live sessions and real projects.
              <span className="mo-caret ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-[#18181B]" />
            </p>
          </div>
          <div style={d(300)} className="v5-pop hidden sm:block">
            <p className="text-[10.5px] text-[#9A9AA6]">Learning outcomes</p>
            <ul className="mt-1 space-y-1">
              {["Clean messy spreadsheets", "Build clear charts"].map((o) => (
                <li key={o} className="flex items-center gap-2 text-[12px] text-[#27272A]">
                  <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} /> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between border-t border-[#F1F1F4] pt-3">
          <span className="text-[10.5px] text-[#9A9AA6]">Your team reviews before publishing</span>
          <div className="flex gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#E4E4E7] px-2.5 py-1 text-[11px] font-semibold text-[#3F3F46]">
              <PenLine className="h-3 w-3" /> Edit
            </span>
            <span className="mo-glow rounded-full bg-[#0A0A0B] px-3 py-1 text-[11px] font-semibold text-white">Use draft</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* 2. Learners who need attention */
function AttentionArt() {
  const rows = [
    { n: "Kenji Tanaka", p: "/assets/img/home/testimonials/author-4.jpg", why: "Missed 3 classes", tone: "bg-[#FDECEC] text-[#B91C1C]" },
    { n: "Amara Okafor", p: "/assets/img/home/testimonials/author-3.jpg", why: "Progress down 20%", tone: "bg-[#FEF4E2] text-[#B45309]" },
    { n: "Lucas Martin", p: "/assets/img/home/testimonials/author-2.jpg", why: "Progress down 15%", tone: "bg-[#FEF4E2] text-[#B45309]" },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <Panel className="v5-pop v5-lift w-[300px] rounded-[18px] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-[#18181B]">Needs attention</p>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#71717A]">
            <TrendingDown className="h-3.5 w-3.5" /> Batch B
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {rows.map((r, i) => (
            <div key={r.n} style={d(150 + i * 120)} className="v5-pop flex items-center gap-2.5 rounded-[11px] bg-[#F8F8FA] px-2.5 py-2">
              <Face src={r.p} size={26} />
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-[#27272A]">{r.n}</span>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", r.tone)}>{r.why}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 3. Ask Domie: daily morning summary */
function MorningArt() {
  const stats = [
    { k: "New enrolments", v: "14" },
    { k: "Classes today", v: "6" },
    { k: "Active batches", v: "9" },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <Panel className="v5-pop v5-lift w-[300px] rounded-[18px] p-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-[#18181B]">Good morning, Sarah</p>
            <p className="text-[11px] text-[#9A9AA6]">Your academy today · 8:00 am</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div key={s.k} style={d(150 + i * 100)} className="v5-pop rounded-[10px] bg-[#F8F8FA] px-2 py-2">
              <p className="font-urbanist text-[20px] font-semibold leading-none text-[#18181B]">{s.v}</p>
              <p className="mt-1 text-[10px] leading-tight text-[#71717A]">{s.k}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-[10px] border border-[#ECECF1] px-3 py-2 text-[11.5px] leading-[1.5] text-[#3F3F46]">
          Batch C starts tomorrow with 22 learners. The first class is at 18:00.
        </p>
      </Panel>
    </div>
  );
}

/* 4. Quick navigation (command bar) */
function CommandArt() {
  const results = [
    { t: "Batch B · Attendance", m: "Manage" },
    { t: "Data Analysis Bootcamp", m: "Course" },
    { t: "Payment settings", m: "Settings" },
  ];
  return (
    <div className="absolute inset-0 flex justify-center px-6 pt-6">
      <Panel className="v5-pop v5-lift w-full max-w-[440px] overflow-hidden rounded-[18px]">
        <div className="flex items-center gap-2.5 border-b border-[#F1F1F4] px-4 py-3">
          <Search className="h-4 w-4 text-[#71717A]" />
          <span className="flex-1 text-[13px] text-[#18181B]">
            batch b
            <span className="mo-caret ml-0.5 inline-block h-[1.05em] w-[1.5px] translate-y-[2px] bg-[#18181B]" />
          </span>
          <span className="rounded-[6px] border border-[#E4E4E7] px-1.5 py-0.5 font-mono text-[10.5px] text-[#71717A]">⌘K</span>
        </div>
        <div className="p-2">
          {results.map((r, i) => (
            <div
              key={r.t}
              style={d(150 + i * 100)}
              className={cn("v5-pop flex items-center gap-3 rounded-[10px] px-3 py-2", i === 0 && "mo-glow bg-[#F4F5F8]")}
            >
              <span className="flex-1 truncate text-[12.5px] font-medium text-[#18181B]">{r.t}</span>
              <span className="text-[11px] text-[#9A9AA6]">{r.m}</span>
              {i === 0 && <CornerDownLeft className="h-3.5 w-3.5 text-[#71717A]" />}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 5. Your content stays yours */
function PrivacyArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[300px]">
        <Panel className="v5-pop v5-lift rounded-[18px] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-[#0A0A0B] text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-[#18181B]">Your academy only</p>
              <p className="text-[11px] text-[#9A9AA6]">Questions stay inside your academy</p>
            </div>
          </div>
          <div className="mt-3.5 space-y-2">
            <p className="flex items-center gap-2 text-[12px] text-[#27272A]">
              <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} /> Uses your published course content
            </p>
            <p className="flex items-center gap-2 text-[12px] text-[#27272A]">
              <X className="h-3.5 w-3.5 text-[#B91C1C]" strokeWidth={3} /> Never used to train outside AI models
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* 6. Teachers stay in charge (what Domie doesn't do) */
function BoundariesArt() {
  const rows = [
    { t: "Answer course questions", ok: true },
    { t: "Draft titles and descriptions", ok: true },
    { t: "Write full lessons", ok: false },
    { t: "Create quizzes or grade work", ok: false },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <Panel className="v5-pop v5-lift w-[300px] rounded-[18px] p-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#52525B]" />
          <p className="text-[13px] font-semibold text-[#18181B]">What Domie does</p>
        </div>
        <div className="mt-3 space-y-2">
          {rows.map((r, i) => (
            <div key={r.t} style={d(150 + i * 100)} className="v5-pop flex items-center gap-2.5 rounded-[10px] bg-[#F8F8FA] px-2.5 py-2">
              <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full", r.ok ? "bg-[#0A0A0B] text-white" : "bg-[#E4E4E7] text-[#71717A]")}>
                {r.ok ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
              </span>
              <span className={cn("text-[12px]", r.ok ? "text-[#18181B]" : "text-[#71717A] line-through decoration-[#D4D4D8]")}>{r.t}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function AiBento() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        dark
        className="md:col-span-2 lg:col-span-7"
        title="Course drafts in seconds"
        body="Domie drafts course titles, descriptions and learning outcomes. Your team edits and approves them."
      >
        <DraftsArt />
      </Card>
      <Card
        dark
        className="lg:col-span-5"
        delay={90}
        title="Learners who need attention"
        body="See whose progress or attendance has dropped, so teachers can step in before they fall behind."
      >
        <AttentionArt />
      </Card>
      <Card
        dark
        className="lg:col-span-5"
        title="A morning summary"
        body="Ask Domie gives admins a daily summary of enrolments, batches and upcoming classes."
      >
        <MorningArt />
      </Card>
      <Card
        dark
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        title="Find anything fast"
        body="Jump to any course, batch or setting from one search bar with a keyboard shortcut."
      >
        <CommandArt />
      </Card>
      <Card
        dark
        className="lg:col-span-6"
        title="Your content stays yours"
        body="Domie works inside your academy. Your course content is never used to train outside AI models."
      >
        <PrivacyArt />
      </Card>
      <Card
        dark
        className="lg:col-span-6"
        delay={90}
        title="Teachers stay in charge"
        body="Domie helps with questions and drafts. It doesn't write full lessons, create quizzes or grade work."
      >
        <BoundariesArt />
      </Card>
    </div>
  );
}
