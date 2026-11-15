import React from "react";
import Image from "next/image";
import { BookOpen, Check, Clock, FileText, Moon, PlayCircle, SearchX, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "../../HomeV5/primitives";

/*
 * Domie AI explainers on the dark panel:
 * 1) what happens when a learner asks (animated flow, two honest outcomes)
 * 2) without Domie vs with Domie (two timelines).
 * Plain product cards on dark; claims match content/platform/ai.ts. Sample data only.
 */

const card = "rounded-[18px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2),0_24px_48px_-24px_rgba(0,0,0,0.6)]";

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-2 text-[12.5px] font-semibold text-[#D4D4D8]">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-bold text-[#0A0A0B]">{n}</span>
      {children}
    </p>
  );
}

/** Horizontal (desktop) / vertical (mobile) animated connector with a travelling dot. */
function Connector({ delay = 0 }: { delay?: number }) {
  return (
    <>
      <div className="relative hidden h-[2px] w-full self-center lg:block">
        <div className="mo-flow absolute inset-0 rounded-full" />
        <span
          className="mo-travel absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.15)]"
          style={{ "--td": `${delay}s` } as React.CSSProperties}
        />
      </div>
      <div className="relative mx-auto h-10 w-[2px] lg:hidden">
        <div className="mo-flow-y absolute inset-0 rounded-full" />
        <span
          className="mo-travel-y absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ "--td": `${delay}s` } as React.CSSProperties}
        />
      </div>
    </>
  );
}

function FlowDiagram() {
  return (
    <div className="mt-12 grid items-stretch gap-0 lg:mt-16 lg:grid-cols-[1fr_72px_1.1fr_72px_1.2fr] lg:gap-0">
      {/* 1. Question */}
      <div className="rv-v4 flex flex-col">
        <Label n="1">A learner asks</Label>
        <div className={cn(card, "flex flex-1 flex-col justify-center p-4")}>
          <div className="flex items-center gap-2.5">
            <Image src="/assets/img/home/testimonials/author-5.jpg" alt="" width={64} height={64} className="h-8 w-8 rounded-full object-cover object-top" />
            <div>
              <p className="text-[12.5px] font-semibold text-[#18181B]">Sofia · Maths, Batch A</p>
              <p className="text-[10.5px] text-[#9A9AA6]">Inside Lesson 4.2</p>
            </div>
          </div>
          <p className="mt-3 rounded-[12px] rounded-tl-[4px] bg-[#0A0A0B] px-3 py-2.5 text-[13px] text-white">How do I find the slope of a line?</p>
        </div>
      </div>

      <Connector />

      {/* 2. Domie checks the course */}
      <div style={{ "--rv-delay": "150ms" } as React.CSSProperties} className="rv-v4 flex flex-col">
        <Label n="2">Domie checks your course</Label>
        <div className={cn(card, "relative flex-1 overflow-hidden p-4")}>
          <p className="text-[11px] font-medium text-[#9A9AA6]">Algebra · published material</p>
          <div className="relative mt-2.5 space-y-1.5">
            {/* scanning highlight */}
            <span className="mo-scan pointer-events-none absolute inset-x-0 top-0 h-[30px] rounded-[9px] bg-[#6C4BFF]/[0.08] ring-1 ring-[#6C4BFF]/25" />
            {[
              { i: PlayCircle, t: "Lesson 4.1 · Linear equations", hit: false },
              { i: PlayCircle, t: "Lesson 4.2 · Graphs and slope", hit: true },
              { i: FileText, t: "Slope worksheet (PDF)", hit: true },
            ].map((r) => (
              <p key={r.t} className="relative flex h-[30px] items-center gap-2 rounded-[9px] px-2 text-[12px] text-[#27272A]">
                <r.i className="h-3.5 w-3.5 shrink-0 text-[#71717A]" />
                <span className="flex-1 truncate">{r.t}</span>
                {r.hit && <Check className="h-3.5 w-3.5 shrink-0 text-[#16A34A]" strokeWidth={3} />}
              </p>
            ))}
          </div>
          <p className="mt-3 border-t border-[#F1F1F4] pt-2.5 text-[11px] text-[#71717A]">Only your published lessons and notes</p>
        </div>
      </div>

      <Connector delay={1.2} />

      {/* 3. Two honest outcomes */}
      <div style={{ "--rv-delay": "300ms" } as React.CSSProperties} className="rv-v4 flex flex-col">
        <Label n="3">The learner gets</Label>
        <div className="flex flex-1 flex-col gap-3">
          <div className={cn(card, "p-4")}>
            <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-[#15803D]">
              <Check className="h-3 w-3" strokeWidth={3} /> If it&apos;s in your course
            </p>
            <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[#27272A]">
              Slope = rise ÷ run. Pick two points and divide the change in y by the change in x.
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#FAFAFB] px-2.5 py-1 text-[10.5px] font-medium text-[#18181B]">
              <BookOpen className="h-3 w-3" /> Lesson 4.2 · Graphs and slope
            </span>
          </div>
          <div className={cn(card, "p-4")}>
            <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-[#B45309]">
              <SearchX className="h-3 w-3" /> If it isn&apos;t
            </p>
            <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[#27272A]">
              &ldquo;I couldn&apos;t find that in your course. Please ask your instructor.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Timeline({ tone, rows, result }: { tone: "slow" | "fast"; rows: { t: string; m: string; i: React.ElementType }[]; result: string }) {
  const fast = tone === "fast";
  return (
    <div
      className={cn(
        "rv-v4 rounded-[28px] p-6 ring-1 ring-inset sm:p-7",
        fast ? "bg-white/[0.07] ring-white/20" : "bg-white/[0.03] ring-white/10"
      )}
      style={fast ? ({ "--rv-delay": "140ms" } as React.CSSProperties) : undefined}
    >
      <p className={cn("text-[13px] font-semibold", fast ? "text-white" : "text-[#A1A1AA]")}>{fast ? "With Domie AI" : "Without Domie AI"}</p>
      <ol className="relative mt-5 space-y-5">
        <span className={cn("absolute bottom-3 left-[15px] top-3 w-px", fast ? "bg-white/30" : "border-l border-dashed border-white/20")} />
        {rows.map((r, i) => (
          <li key={r.t} style={{ "--d": `${200 + i * 160}ms` } as React.CSSProperties} className="v5-pop relative flex items-start gap-3">
            <span
              className={cn(
                "relative grid h-8 w-8 shrink-0 place-items-center rounded-full",
                fast ? "bg-white text-[#0A0A0B]" : "bg-white/10 text-[#D4D4D8]"
              )}
            >
              <r.i className="h-4 w-4" />
            </span>
            <div>
              <p className={cn("text-[14px] font-semibold", fast ? "text-white" : "text-[#D4D4D8]")}>{r.t}</p>
              <p className="text-[12.5px] text-[#A1A1AA]">{r.m}</p>
            </div>
          </li>
        ))}
      </ol>
      <p
        className={cn(
          "mt-6 rounded-[14px] px-4 py-3 text-[13.5px] font-medium",
          fast ? "bg-white text-[#0A0A0B]" : "bg-white/[0.06] text-[#A1A1AA]"
        )}
      >
        {result}
      </p>
    </div>
  );
}

export function AiExplain() {
  return (
    <>
      <section className="pt-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Behind every answer"
            title="What happens when a learner asks"
            subtitle="Domie looks only at the course the learner is studying. If the answer is there, they get it. If not, Domie says so."
          />
          <FlowDiagram />
        </Container>
      </section>

      <section className="pt-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading tone="dark" eyebrow="The difference" title="Stuck at night? Not anymore." />
          <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-2">
            <Timeline
              tone="slow"
              rows={[
                { t: "11:42 pm · Asha gets stuck", m: "Posts a question in the class group", i: Moon },
                { t: "Waits overnight", m: "The instructor is offline", i: Clock },
                { t: "Next day · Reply arrives", m: "After the next class has started", i: Check },
              ]}
              result="Asha stops studying for the night."
            />
            <Timeline
              tone="fast"
              rows={[
                { t: "11:42 pm · Asha gets stuck", m: "Asks Domie inside the lesson", i: Moon },
                { t: "Answered straight away", m: "Explained from Lesson 3.2", i: Zap },
                { t: "Keeps going", m: "Finishes the checkpoint quiz", i: Check },
              ]}
              result="Asha finishes the lesson the same night."
            />
          </div>
        </Container>
      </section>
    </>
  );
}
