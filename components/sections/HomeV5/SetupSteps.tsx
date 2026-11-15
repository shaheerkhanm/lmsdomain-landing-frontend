import React from "react";
import Image from "next/image";
import { CalendarDays, Check, Loader2, Lock, ArrowDownLeft, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./primitives";

// Sample data only, same visual language as the feature cards.
const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_12px_32px_-14px_rgba(16,16,24,0.18)]";

function Panel({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-[14px] border border-[#EDEDF1] bg-white", shadow, className)} style={style}>
      {children}
    </div>
  );
}

/* Step 1: book the onboarding call */
function CallArt() {
  const slots = ["10:00", "11:30", "15:00"];
  return (
    <div className="absolute inset-0 flex justify-center pt-8">
      <Panel className="w-[272px] rounded-[18px] p-4">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/img/home/participant_mia.jpg"
            alt=""
            width={80}
            height={80}
            className="h-10 w-10 rounded-full object-cover object-top"
          />
          <div>
            <p className="text-[13.5px] font-semibold text-[#18181B]">Demo call with Mia</p>
            <p className="text-[11.5px] text-[#9A9AA6]">Onboarding team · 20 min</p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center gap-2 rounded-[10px] bg-[#F7F7F9] px-3 py-2 text-[12px] text-[#3F3F46]">
          <CalendarDays className="h-3.5 w-3.5 text-[#6C4BFF]" /> Tuesday, 3 March
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {slots.map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-[9px] border py-1.5 text-center text-[12px] font-medium",
                t === "11:30" ? "border-[#0A0A0B] bg-[#0A0A0B] text-white" : "border-[#EDEDF1] text-[#3F3F46]"
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#71717A]">
            <Video className="h-3.5 w-3.5" /> Video call
          </span>
          <span className="rounded-[8px] bg-[#6C4BFF] px-3 py-1.5 text-[11.5px] font-semibold text-white">Confirm</span>
        </div>
      </Panel>
    </div>
  );
}

/* Step 2: setup and migration checklist */
export function SetupArt() {
  const rows = [
    { t: "Courses imported", m: "48 of 48", done: true },
    { t: "Learners moved", m: "1,240", done: true },
    { t: "Domain connected", m: "academy.northwind.com", done: true },
    { t: "Payment gateway", m: "Connecting Stripe…", done: false },
  ];
  return (
    <div className="absolute inset-0 flex justify-center pt-8">
      <Panel className="w-[300px] rounded-[18px] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-[#18181B]">Setting up your academy</p>
          <p className="text-[12px] font-semibold tabular-nums text-[#6C4BFF]">85%</p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1EDFF]">
          <div className="v5-fill h-full w-[85%] rounded-full bg-[#6C4BFF]" style={{ "--w": "85%" } as React.CSSProperties} />
        </div>
        <div className="mt-3.5 space-y-2.5">
          {rows.map((r) => (
            <div key={r.t} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                  r.done ? "bg-[#E8F7EF] text-[#15803D]" : "bg-[#F4F4F5] text-[#71717A]"
                )}
              >
                {r.done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Loader2 className="h-3 w-3 animate-spin" />}
              </span>
              <p className="flex-1 whitespace-nowrap text-[12.5px] text-[#27272A]">{r.t}</p>
              <p className="max-w-[110px] truncate text-[11.5px] text-[#9A9AA6]">{r.m}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* Step 3: live site with first enrolments */
function LaunchArt() {
  return (
    <div className="absolute inset-0">
      <Panel className="absolute left-7 right-[-40px] top-8 overflow-hidden rounded-[18px]">
        <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-2.5">
          <Lock className="h-3 w-3 text-[#16A34A]" />
          <span className="text-[11.5px] text-[#71717A]">academy.northwind.com</span>
        </div>
        <div className="p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F7EF] px-2.5 py-0.5 text-[11px] font-semibold text-[#15803D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> Live
          </span>
          <p className="mt-2 font-urbanist text-[18px] font-semibold text-[#18181B]">Enrolments are open</p>
          <div className="mt-2.5 flex gap-2">
            <span className="h-14 w-24 rounded-[10px] bg-[#F1EDFF]" />
            <span className="h-14 w-24 rounded-[10px] bg-[#E7F3FD]" />
            <span className="h-14 w-24 rounded-[10px] bg-[#FEF4E2]" />
          </div>
        </div>
      </Panel>
      <Panel style={{ "--d": "450ms" } as React.CSSProperties} className="v5-pop absolute bottom-6 left-4 flex w-[236px] rotate-[-3deg] items-center gap-2.5 rounded-[14px] p-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#E8F7EF] text-[#15803D]">
          <ArrowDownLeft className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold text-[#18181B]">New enrolment</p>
          <p className="truncate text-[10.5px] text-[#9A9AA6]">Python for Beginners</p>
        </div>
        <p className="text-[12.5px] font-semibold text-[#18181B]">+$59</p>
      </Panel>
    </div>
  );
}

const STEPS = [
  {
    n: "1",
    title: "Tell us how you teach",
    body: "A 20-minute call about your courses, batches and payments. We show you LMS Domain with your own structure.",
    Art: CallArt,
  },
  {
    n: "2",
    title: "We set it up with you",
    body: "Our team moves your courses and learners, connects your domain and payment gateway, and trains your staff.",
    Art: SetupArt,
  },
  {
    n: "3",
    title: "Launch and start selling",
    body: "Open enrolments on your own website. Teach live, run tests and get paid from day one.",
    Art: LaunchArt,
  },
];

export function SetupSteps() {
  return (
    <section id="how-it-works" className="bg-white pb-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Live in days, not months"
          subtitle="No developers or IT team needed. We do the setup with you."
        />
        <ol className="relative mt-12 grid gap-4 lg:mt-24 lg:grid-cols-3">
          {/* dashed connector behind the step badges */}
          <span
            aria-hidden="true"
            className="rv-v4 v5-draw absolute left-[16%] right-[16%] top-[-22px] hidden border-t border-dashed border-[#D4D4D8] lg:block"
          />
          {STEPS.map(({ n, title, body, Art }, i) => (
            <li
              key={n}
              style={{ "--rv-delay": `${i * 160}ms` } as React.CSSProperties}
              className="rv-v4 relative flex flex-col"
            >
              <span className="v5-badge absolute left-1/2 top-[-36px] z-10 hidden h-7 w-7 -translate-x-1/2 place-items-center rounded-full bg-[#0A0A0B] text-[12.5px] font-semibold text-white ring-4 ring-white lg:grid">
                {n}
              </span>
              <div className="flex flex-1 flex-col overflow-hidden rounded-[28px] bg-[#F4F5F8]">
                <div aria-hidden="true" className="relative h-[250px] overflow-hidden">
                  <Art />
                </div>
                <div className="px-7 pb-7 pt-2">
                  <p className="text-[13px] font-semibold text-[#6C4BFF] lg:hidden">Step {n}</p>
                  <h3 className="mt-1 font-urbanist text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0A0A0B] lg:mt-0">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-[#6B6B76]">{body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
