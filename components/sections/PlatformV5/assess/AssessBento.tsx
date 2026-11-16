import React from "react";
import { Check, FileText, Layers, Pause, Shuffle, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Panel, Face, d } from "../bento";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";

/* Sample data only. Claims match content/platform/assess.ts. */

/* 1. Question banks: fanned question cards with topic and shuffle */
function BanksArt() {
  const qs = [
    { t: "Solve 3x − 5 = 10", tag: "Linear equations", lvl: "Easy" },
    { t: "Factorise x² + 5x + 6", tag: "Quadratics", lvl: "Medium" },
    { t: "Find the slope of y = 2x + 1", tag: "Graphs", lvl: "Easy" },
  ];
  return (
    <div className="absolute inset-0">
      <Panel className="v5-pop absolute left-7 top-7 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0A0A0B] text-white">
          <Layers className="h-4 w-4" />
        </span>
        <span className="text-[13.5px] font-semibold text-[#18181B]">Algebra bank · 240 questions</span>
      </Panel>
      <div className="absolute left-7 right-7 top-[86px] h-[150px] sm:left-12">
        {qs.map((q, i) => (
          <Panel
            key={q.t}
            style={{ "--d": `${120 + i * 120}ms`, "--fd": `${i * -2}s`, left: `${i * 14}%`, top: `${i * 18}px`, zIndex: 3 - i } as React.CSSProperties}
            className={cn(
              "v5-pop mo-float absolute w-[min(260px,70%)] p-3.5",
              i === 0 && "-rotate-[3deg]",
              i === 1 && "rotate-[2deg]",
              i === 2 && "rotate-[5deg] opacity-80"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10.5px] font-medium text-[#52525B]">{q.tag}</span>
              <span className="text-[10.5px] text-[#9A9AA6]">{q.lvl}</span>
            </div>
            <p className="mt-2 text-[13px] font-semibold text-[#18181B]">{q.t}</p>
            <div className="mt-2 grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((k) => (
                <span key={k} className={cn("h-1.5 rounded-full", k === 1 && i === 0 ? "bg-[#0A0A0B]" : "bg-[#ECECF1]")} />
              ))}
            </div>
          </Panel>
        ))}
      </div>
      <Panel style={d(450)} className="v5-pop absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold text-[#18181B]">
        <Shuffle className="h-3.5 w-3.5" /> Random order for every learner
      </Panel>
    </div>
  );
}

/* 2. Test rules: time limit, pass mark, attempts, shuffle */
function RulesArt() {
  const rows = [
    { k: "Time limit", v: "60 min" },
    { k: "Pass mark", v: "40%" },
    { k: "Attempts", v: "2" },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[290px] rounded-[18px] p-4">
        <p className="text-[13.5px] font-semibold text-[#18181B]">Test settings</p>
        <div className="mt-3 divide-y divide-[#F1F1F4]">
          {rows.map((r) => (
            <div key={r.k} className="flex items-center justify-between py-2.5">
              <span className="text-[12.5px] text-[#52525B]">{r.k}</span>
              <span className="rounded-[8px] border border-[#EDEDF1] px-2.5 py-1 text-[12px] font-semibold tabular-nums text-[#18181B]">{r.v}</span>
            </div>
          ))}
          {[
            { k: "Shuffle questions", on: true },
            { k: "Allow retake", on: false },
          ].map((t) => (
            <div key={t.k} className="flex items-center justify-between py-2.5">
              <span className="text-[12.5px] text-[#52525B]">{t.k}</span>
              <span className={cn("relative h-5 w-9 rounded-full transition-colors", t.on ? "bg-[#0A0A0B]" : "bg-[#E4E4E7]")}>
                <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow", t.on ? "left-[18px]" : "left-0.5")} />
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 3. Automatic scoring and rank */
function ResultsArt() {
  const r = 26;
  const c = 2 * Math.PI * r;
  const score = 82;
  const rank = [
    { n: "Sofia R.", p: "/assets/img/home/testimonials/author-5.jpg", s: 94 },
    { n: "Lucas M.", p: "/assets/img/home/testimonials/author-2.jpg", s: 88 },
    { n: "Priya S.", p: "/assets/img/home/testimonials/author-1.jpg", s: 82, me: true },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[300px] rounded-[18px] p-4">
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
            <circle cx="32" cy="32" r={r} fill="none" stroke="#F1F1F4" strokeWidth="7" />
            <circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              stroke="#0A0A0B"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - score / 100)}
              className="v5-ring"
              style={{ "--c": c, "--o": c * (1 - score / 100) } as React.CSSProperties}
            />
          </svg>
          <div>
            <p className="font-urbanist text-[26px] font-semibold leading-none text-[#18181B]">82%</p>
            <p className="mt-1 text-[11.5px] text-[#9A9AA6]">Scored instantly · Passed</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 border-t border-[#F1F1F4] pt-3">
          {rank.map((x, i) => (
            <div
              key={x.n}
              style={x.me ? ({ "--gd": "0.5s" } as React.CSSProperties) : undefined}
              className={cn("flex items-center gap-2.5 rounded-[10px] px-2 py-1.5", x.me && "mo-glow bg-[#F4F5F8]")}
            >
              <span className="w-4 text-[11px] font-semibold tabular-nums text-[#9A9AA6]">{i + 4}</span>
              <Face src={x.p} size={22} />
              <span className="flex-1 truncate text-[12px] font-medium text-[#27272A]">{x.n}</span>
              <span className="text-[12px] font-semibold tabular-nums text-[#18181B]">{x.s}%</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* 4. Assignments with private review */
function ReviewArt() {
  return (
    <div className="absolute inset-0 px-6 pt-7 sm:px-8">
      <Panel className="v5-pop flex max-w-[360px] items-center gap-3 rounded-[16px] p-3">
        <Face src="/assets/img/home/testimonials/author-3.jpg" size={34} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-semibold text-[#18181B]">Amara submitted Essay 2</p>
          <p className="flex items-center gap-1 text-[11px] text-[#9A9AA6]">
            <FileText className="h-3 w-3" /> essay-draft.pdf · 2 pages
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#FEF4E2] px-2 py-0.5 text-[10.5px] font-semibold text-[#B45309]">To review</span>
      </Panel>

      <Panel style={d(200)} className="v5-pop v5-lift ml-6 mt-3 max-w-[380px] rounded-[16px] p-3.5 sm:ml-14">
        <div className="flex items-center gap-2">
          <Face src="/assets/img/home/participant_mia.jpg" size={22} />
          <p className="text-[12px] font-semibold text-[#18181B]">Private feedback</p>
          <span className="ml-auto rounded-full bg-[#0A0A0B] px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-white">8 / 10</span>
        </div>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-[#3F3F46]">
          Strong argument. Add one example in paragraph 2 and check your conclusion.
          <span className="mo-caret ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-[#18181B]" />
        </p>
      </Panel>

      <div style={d(350)} className="v5-pop ml-6 mt-3 flex gap-2 sm:ml-14">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#3F3F46]">
          <RotateCcw className="h-3 w-3" /> Ask for revision
        </span>
        <span className="mo-glow inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-3 py-1.5 text-[11.5px] font-semibold text-white">
          <Check className="h-3 w-3" strokeWidth={3} /> Return to learner
        </span>
      </div>
    </div>
  );
}

/* 5. In-video checkpoints: video pauses for a question */
function CheckpointArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-7">
      <Panel className="v5-pop v5-lift w-[min(400px,calc(100%-40px))] overflow-hidden rounded-[18px]">
        <div className="relative h-[178px] bg-[#16141F]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,#3A3550,transparent_65%)]" />
          <div className="absolute inset-x-5 top-5 rounded-[12px] bg-white p-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-wide text-[#6C4BFF]">Quick check · 06:40</p>
            <p className="mt-1 text-[12.5px] font-semibold text-[#18181B]">Which line prints the learner&apos;s name?</p>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {["print(age)", "print(name)"].map((o, i) => (
                <span
                  key={o}
                  className={cn(
                    "rounded-[8px] border px-2 py-1.5 font-mono text-[11px]",
                    i === 1 ? "mo-glow border-[#6C4BFF] bg-[#F7F5FF] text-[#18181B]" : "border-[#EDEDF1] text-[#52525B]"
                  )}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-3 flex items-center gap-2.5 text-white/85">
            <Pause className="h-3.5 w-3.5 fill-current" />
            <div className="relative h-1 flex-1 rounded-full bg-white/25">
              <div className="h-full w-[48%] rounded-full bg-white" />
              <span className="mo-ping absolute left-[48%] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A99BFF] text-[#A99BFF]" />
            </div>
            <span className="text-[10.5px] tabular-nums">06:40</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5">
          <p className="text-[12px] font-medium text-[#18181B]">Paused until the learner answers</p>
          <span className="text-[11px] text-[#9A9AA6]">Lesson 2.1</span>
        </div>
      </Panel>
    </div>
  );
}

/* 6. Branded certificates */
function CertificateArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-9">
      <div className="relative w-[min(380px,calc(100%-40px))]">
        <Panel className="v5-pop v5-lift relative rounded-[16px] p-1.5">
          <div className="rounded-[12px] border border-[#ECECF1] px-5 py-4 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <LmsDomainMark size={20} />
              <span className="text-[11.5px] font-semibold text-[#18181B]">Northwind Academy</span>
            </div>
            <p className="mt-2.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#9A9AA6]">Certificate of completion</p>
            <p className="mt-1.5 font-urbanist text-[22px] font-semibold text-[#18181B]">Priya Sharma</p>
            <p className="text-[11.5px] text-[#71717A]">Python for Beginners</p>
            <div className="mt-3 flex items-end justify-between text-left">
              <div>
                <p className="font-urbanist text-[13px] italic text-[#18181B]">M. Collins</p>
                <p className="border-t border-[#E4E4E7] pt-0.5 text-[9.5px] text-[#9A9AA6]">Instructor</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-[#18181B]">14 Mar 2026</p>
                <p className="border-t border-[#E4E4E7] pt-0.5 text-[9.5px] text-[#9A9AA6]">Issued</p>
              </div>
            </div>
          </div>
        </Panel>
        <Panel style={d(350)} className="v5-pop absolute -top-3 right-3 z-10 flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E8F7EF] text-[#15803D]">
            <Download className="h-3 w-3" />
          </span>
          <span className="text-[11.5px] font-semibold text-[#18181B]">PDF issued automatically</span>
        </Panel>
      </div>
    </div>
  );
}

export function AssessBento() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      <Card
        className="md:col-span-2 lg:col-span-7"
        title="Question banks"
        body="Build banks by topic and level, then pull questions into any test in a random order."
      >
        <BanksArt />
      </Card>
      <Card
        className="lg:col-span-5"
        delay={90}
        title="Timed tests with your rules"
        body="Set a time limit, pass mark and number of attempts for every quiz or mock exam."
      >
        <RulesArt />
      </Card>
      <Card
        className="lg:col-span-5"
        title="Instant scores and rank"
        body="Multiple-choice tests are marked automatically, so learners see their score and rank right away."
      >
        <ResultsArt />
      </Card>
      <Card
        className="md:col-span-2 lg:col-span-7"
        delay={90}
        title="Assignments with private review"
        body="Learners upload their work. Teachers give private feedback and a score, or ask for a revision."
      >
        <ReviewArt />
      </Card>
      <Card
        className="lg:col-span-6"
        title="Quiz checkpoints inside videos"
        body="Add a question at any point in a recorded lesson. The video waits until the learner answers."
      >
        <CheckpointArt />
      </Card>
      <Card
        className="lg:col-span-6"
        delay={90}
        title="Branded certificates"
        body="When a learner finishes, they get a PDF certificate with your logo, their name and the course."
      >
        <CertificateArt />
      </Card>
    </div>
  );
}
