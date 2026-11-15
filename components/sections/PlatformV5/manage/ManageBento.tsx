import React from "react";
import { BookOpen, Check, Download, FileSpreadsheet, Mail, MessageSquare, Minus, Send, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, Face, d, fadeRight } from "../bento";

/* Sample data only. Claims match content/platform/manage.ts. */

/* 1. Batches: one course, several batches with their own schedule */
function BatchesArt() {
  const batches = [
    { n: "Morning batch", s: "Mon–Fri · 07:00", who: "/assets/img/home/participant_alex.jpg", c: 28, start: "Starts 3 Mar" },
    { n: "Evening batch", s: "Mon, Wed, Fri · 18:00", who: "/assets/img/home/participant_mia.jpg", c: 24, start: "Starts 5 Mar" },
    { n: "Weekend batch", s: "Sat, Sun · 10:00", who: "/assets/img/home/testimonials/author-2.jpg", c: 16, start: "Starts 8 Mar" },
  ];
  return (
    <div className="absolute inset-0 pl-7 pt-7">
      <div className="absolute left-[46px] top-[56px] h-[170px] w-px bg-[#DCDCE3]" />
      <Panel className="v5-pop relative inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0A0A0B] text-white">
          <BookOpen className="h-4 w-4" />
        </span>
        <span className="text-[13.5px] font-semibold text-[#18181B]">Spoken English · Level 2</span>
      </Panel>
      <div className="relative ml-[38px] mt-3 space-y-2.5">
        {batches.map((b, i) => (
          <div key={b.n} style={d(120 + i * 120)} className={cn("v5-pop relative flex", fadeRight)}>
            <span className="absolute -left-[19px] top-1/2 h-px w-[19px] bg-[#DCDCE3]" />
            <Panel
              style={{ "--fd": `${i * -2}s` } as React.CSSProperties}
              className={cn("mo-float flex w-[420px] shrink-0 items-center gap-3 p-2.5", i === 2 && "opacity-75")}
            >
              <Face src={b.who} size={30} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{b.n}</p>
                <p className="truncate text-[11px] text-[#9A9AA6]">{b.s}</p>
              </div>
              <span className="shrink-0 rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10.5px] font-medium text-[#52525B]">{b.c} learners</span>
              <span className="shrink-0 text-[10.5px] text-[#9A9AA6]">{b.start}</span>
            </Panel>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Learner profile */
function LearnerArt() {
  const courses = [
    { t: "Algebra, Batch B", p: 86 },
    { t: "Python for Beginners", p: 42 },
    { t: "Business English", p: 100 },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[290px] rounded-[18px] p-4">
        <div className="flex items-center gap-3">
          <Face src="/assets/img/home/testimonials/author-1.jpg" size={40} />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-[#18181B]">Priya Sharma</p>
            <p className="text-[11.5px] text-[#9A9AA6]">Joined Jan 2026 · 3 courses</p>
          </div>
        </div>
        <div className="mt-3.5 space-y-2.5">
          {courses.map((c, i) => (
            <div key={c.t}>
              <div className="flex items-center justify-between text-[11.5px]">
                <span className="truncate text-[#3F3F46]">{c.t}</span>
                <span className="font-semibold tabular-nums text-[#18181B]">{c.p === 100 ? "Done" : `${c.p}%`}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
                <div
                  className="v5-fill h-full rounded-full bg-[#0A0A0B]"
                  style={{ width: `${c.p}%`, "--w": `${c.p}%`, "--rv-delay": `${i * 120}ms` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-[#F1F1F4] pt-3">
          <div>
            <p className="text-[10.5px] text-[#9A9AA6]">Last test</p>
            <p className="text-[13px] font-semibold text-[#18181B]">82%</p>
          </div>
          <div>
            <p className="text-[10.5px] text-[#9A9AA6]">Attendance</p>
            <p className="text-[13px] font-semibold text-[#18181B]">94%</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* 3. Attendance logged automatically from Zoom */
function AttendanceArt() {
  const log = [
    { t: "17:58", who: "Priya joined", p: "/assets/img/home/testimonials/author-1.jpg", ok: true },
    { t: "18:00", who: "Class started", p: null, ok: true },
    { t: "18:01", who: "Lucas joined", p: "/assets/img/home/testimonials/author-2.jpg", ok: true },
    { t: "—", who: "Kenji did not join", p: "/assets/img/home/testimonials/author-4.jpg", ok: false },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[300px] rounded-[18px] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-[#18181B]">Today · Batch B</p>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#71717A]">
            <Video className="h-3 w-3" /> Zoom
          </span>
        </div>
        <div className="relative mt-3 space-y-2.5">
          <span className="absolute bottom-2 left-[13px] top-2 w-px bg-[#ECECF1]" />
          {log.map((l, i) => (
            <div key={l.who} style={d(150 + i * 140)} className={cn("v5-pop relative flex items-center gap-3", !l.ok && "opacity-70")}>
              {l.p ? (
                <Face src={l.p} size={26} className="ring-2 ring-white" />
              ) : (
                <span className="relative grid h-[26px] w-[26px] place-items-center rounded-full bg-[#0A0A0B] text-white">
                  <Video className="h-3 w-3" />
                </span>
              )}
              <span className="flex-1 truncate text-[12.5px] text-[#27272A]">{l.who}</span>
              <span className="text-[11px] tabular-nums text-[#9A9AA6]">{l.t}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#F1F1F4] pt-3">
          <span className="text-[11.5px] text-[#52525B]">23 of 24 present</span>
          <span className="mo-glow inline-flex items-center gap-1 rounded-full border border-[#E4E4E7] px-2.5 py-1 text-[10.5px] font-semibold text-[#18181B]">
            <Download className="h-3 w-3" /> Export
          </span>
        </div>
      </Panel>
    </div>
  );
}

/* 4. Roles and permissions */
function RolesArt() {
  const perms = [
    { p: "Manage all courses", v: [true, false, true] },
    { p: "Edit own batches", v: [true, true, true] },
    { p: "Review assignments", v: [true, true, false] },
    { p: "View payments", v: [true, false, true] },
  ];
  const roles = ["Admin", "Instructor", "Custom"];
  return (
    <div className="absolute inset-0 flex justify-center px-6 pt-7">
      <Panel className="v5-pop v5-lift w-full max-w-[460px] overflow-hidden rounded-[18px]">
        <div className="grid grid-cols-[1.3fr_repeat(3,1fr)] gap-1 border-b border-[#F1F1F4] bg-[#FAFAFB] px-3 py-2.5 text-[10.5px] font-semibold text-[#18181B] sm:grid-cols-[1.6fr_repeat(3,1fr)] sm:px-4 sm:text-[11.5px]">
          <span className="text-[#9A9AA6]">Permission</span>
          {roles.map((r) => (
            <span key={r} className="text-center">
              {r}
              {r === "Custom" && <span className="ml-1 hidden rounded-full bg-[#F1EDFF] px-1.5 py-px text-[9.5px] text-[#6C4BFF] sm:inline">Pro</span>}
            </span>
          ))}
        </div>
        {perms.map((row, i) => (
          <div
            key={row.p}
            style={d(120 + i * 100)}
            className="v5-pop grid grid-cols-[1.3fr_repeat(3,1fr)] items-center gap-1 border-b border-[#F7F7F9] px-3 py-2.5 last:border-0 sm:grid-cols-[1.6fr_repeat(3,1fr)] sm:px-4"
          >
            <span className="truncate text-[12px] text-[#3F3F46]">{row.p}</span>
            {row.v.map((on, j) => (
              <span key={j} className="flex justify-center">
                {on ? (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0A0A0B] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                ) : (
                  <Minus className="h-4 w-4 text-[#D4D4D8]" />
                )}
              </span>
            ))}
          </div>
        ))}
      </Panel>
    </div>
  );
}

/* 5. Email and SMS notices */
function NoticesArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(380px,calc(100%-40px))] rounded-[18px] p-4">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-[#9A9AA6]">To</span>
          <span className="rounded-full bg-[#F4F5F8] px-2.5 py-0.5 font-medium text-[#18181B]">Batch B · 24 learners</span>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0A0A0B] px-3 py-1 text-[11.5px] font-semibold text-[#18181B]">
            <Mail className="h-3 w-3" /> Email
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EDEDF1] px-3 py-1 text-[11.5px] font-semibold text-[#52525B]">
            <MessageSquare className="h-3 w-3" /> SMS
            <span className="rounded-full bg-[#F4F5F8] px-1.5 py-px text-[9.5px] text-[#71717A]">Growth</span>
          </span>
        </div>
        <div className="mt-3 rounded-[12px] bg-[#F8F8FA] p-3">
          <p className="text-[12.5px] font-semibold text-[#18181B]">Today&apos;s class moves to 19:00</p>
          <p className="mt-1 text-[11.5px] leading-[1.5] text-[#71717A]">
            Same Zoom link as always. See you there!
            <span className="mo-caret ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-[#18181B]" />
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-[#9A9AA6]">Delivered to 24 of 24</span>
          <span className="mo-glow inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-3.5 py-1.5 text-[11.5px] font-semibold text-white">
            <Send className="h-3 w-3" /> Send
          </span>
        </div>
      </Panel>
    </div>
  );
}

/* 6. Export to CSV (finerrr-style staggered rows) */
function ExportArt() {
  const files = [
    { f: "learner-roster.csv", m: "248 rows" },
    { f: "course-progress.csv", m: "248 rows" },
    { f: "test-scores.csv", m: "1,120 rows" },
    { f: "payments.csv", m: "386 rows" },
  ];
  return (
    <div className="absolute inset-0 pt-7">
      {files.map((x, i) => (
        <Panel
          key={x.f}
          className={cn("v5-pop relative mb-2.5 flex items-center gap-3 rounded-[14px] p-2.5", i === 0 && "v5-lift", i === 3 && "opacity-70")}
          style={{ marginLeft: 24 + i * 22, width: `min(330px, calc(100% - ${48 + i * 22}px))`, "--d": `${i * 120}ms` } as React.CSSProperties}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <FileSpreadsheet className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[12px] font-medium text-[#18181B]">{x.f}</p>
            <p className="text-[10.5px] text-[#9A9AA6]">{x.m}</p>
          </div>
          <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", i === 0 ? "mo-ping bg-[#0A0A0B] text-white" : "border border-[#E4E4E7] text-[#52525B]")}>
            <Download className="h-3.5 w-3.5" />
          </span>
        </Panel>
      ))}
    </div>
  );
}

export function ManageBento() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        className="md:col-span-2 lg:col-span-7"
        title="Batches with their own schedule"
        body="Run the same course in several batches, each with its own timings, roster, instructor and drip dates."
      >
        <BatchesArt />
      </Card>
      <Card
        className="lg:col-span-5"
        delay={90}
        title="Every learner in one profile"
        body="See each learner's courses, progress, test scores and attendance in one place."
      >
        <LearnerArt />
      </Card>
      <Card
        className="lg:col-span-5"
        title="Attendance, logged for you"
        body="When learners join a live class through your academy, attendance is recorded automatically."
      >
        <AttendanceArt />
      </Card>
      <Card
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        plan="Custom roles on Pro"
        title="Roles and permissions"
        body="Admins see everything. Instructors only see their own courses, batches and reviews."
      >
        <RolesArt />
      </Card>
      <Card
        className="lg:col-span-6"
        title="Email and SMS notices"
        body="Send class reminders and batch updates by email automatically. SMS is available on Growth and up."
      >
        <NoticesArt />
      </Card>
      <Card
        className="lg:col-span-6"
        delay={90}
        title="Export anything to CSV"
        body="Download rosters, progress, test scores and payment reports as spreadsheets at any time."
      >
        <ExportArt />
      </Card>
    </div>
  );
}
