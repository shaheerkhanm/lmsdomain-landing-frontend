import React from "react";
import Image from "next/image";
import {
  Bell,
  Check,
  FileText,
  ListChecks,
  Lock,
  Monitor,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Tag,
  Timer,
  Upload,
  Video,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Product scenes for the platform overview. Same visual language as the homepage cards:
 * real UI pieces layered on a soft grey canvas, some bleeding off the edge.
 * All names, numbers and prices are sample data.
 */

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_16px_40px_-18px_rgba(16,16,24,0.22)]";
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const PEOPLE = {
  alex: "/assets/img/home/participant_alex.jpg",
  mia: "/assets/img/home/participant_mia.jpg",
  a1: "/assets/img/home/testimonials/author-1.jpg",
  a2: "/assets/img/home/testimonials/author-2.jpg",
  a3: "/assets/img/home/testimonials/author-3.jpg",
  a4: "/assets/img/home/testimonials/author-4.jpg",
  a5: "/assets/img/home/testimonials/author-5.jpg",
};

function Panel({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-[16px] border border-[#EDEDF1] bg-white", shadow, className)} style={style}>
      {children}
    </div>
  );
}

function Face({ src, size = 28, className }: { src: string; size?: number; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={size * 2}
      height={size * 2}
      className={cn("shrink-0 rounded-full object-cover object-top", className)}
      style={{ width: size, height: size }}
    />
  );
}

/** Grey canvas that holds a scene. */
export function SceneCanvas({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rv-v4 relative h-[400px] overflow-hidden rounded-[32px] sm:h-[460px]",
        dark ? "border border-white/10 bg-white/[0.04]" : "bg-[#F4F5F8]"
      )}
    >
      {children}
    </div>
  );
}

/* ---------------- Teach: course builder + live class ---------------- */
export function TeachScene() {
  const modules = [
    {
      t: "Module 1 · Getting started",
      s: "Published",
      tone: "bg-[#E8F7EF] text-[#15803D]",
      lessons: [
        { i: PlayCircle, t: "Welcome and setup", m: "Video · 6 min" },
        { i: FileText, t: "Python cheat sheet", m: "PDF · 4 pages" },
      ],
    },
    {
      t: "Module 2 · Variables and data",
      s: "Unlocks Mon",
      tone: "bg-[#F1EDFF] text-[#6C4BFF]",
      lessons: [{ i: ListChecks, t: "Checkpoint quiz", m: "Quiz · 10 questions" }],
    },
  ];
  return (
    <SceneCanvas>
      <Panel className="v5-pop v5-lift absolute left-6 right-[-48px] top-8 rounded-[20px] p-5 sm:left-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold text-[#18181B]">Python for Beginners</p>
            <p className="text-[12px] text-[#9A9AA6]">6 modules · 48 lessons · Weekly drip</p>
          </div>
          <span className="hidden rounded-full bg-[#0A0A0B] px-3 py-1 text-[11.5px] font-semibold text-white sm:inline-block">+ Add lesson</span>
        </div>
        <div className="mt-4 space-y-3">
          {modules.map((m) => (
            <div key={m.t} className="rounded-[12px] border border-[#F1F1F4] p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[13px] font-semibold text-[#27272A]">{m.t}</p>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", m.tone)}>{m.s}</span>
              </div>
              <div className="mt-2 space-y-1.5">
                {m.lessons.map(({ i: Icon, t, m: meta }) => (
                  <div key={t} className="flex items-center gap-2.5 rounded-[9px] bg-[#F8F8FA] px-2.5 py-2">
                    <Icon className="h-3.5 w-3.5 text-[#6C4BFF]" />
                    <span className="flex-1 truncate text-[12.5px] text-[#27272A]">{t}</span>
                    <span className="text-[11px] text-[#9A9AA6]">{meta}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel style={d(300)} className="v5-pop absolute bottom-6 left-4 w-[256px] -rotate-[2deg] rounded-[18px] p-3.5 sm:left-6">
        <div className="flex items-center gap-3">
          <Face src={PEOPLE.alex} size={38} />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-[#18181B]">Loops in practice</p>
            <p className="text-[11.5px] text-[#9A9AA6]">Batch B · Today, 18:00</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6C4BFF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C4BFF]" /> Live in 35 min
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-3 py-1.5 text-[11px] font-semibold text-white">
            <Video className="h-3 w-3" /> Join on Zoom
          </span>
        </div>
      </Panel>
    </SceneCanvas>
  );
}

/* ---------------- Assess: test question + score ---------------- */
export function AssessScene() {
  const options = ["4", "6", "8", "12"];
  const r = 22;
  const c = 2 * Math.PI * r;
  const score = 82;
  return (
    <SceneCanvas>
      <Panel className="v5-pop v5-lift absolute left-6 right-6 top-8 rounded-[20px] p-5 sm:left-10 sm:right-24">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-[#71717A]">Mock test 4 · Question 7 of 30</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF4E2] px-2.5 py-0.5 text-[11px] font-semibold text-[#B45309]">
            <Timer className="h-3 w-3" /> 18:42
          </span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
          <div className="v5-fill h-full w-[23%] rounded-full bg-[#6C4BFF]" style={{ "--w": "23%" } as React.CSSProperties} />
        </div>
        <p className="mt-4 text-[15px] font-semibold leading-snug text-[#18181B]">If 2x + 6 = 18, what is the value of x?</p>
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          {options.map((o, i) => (
            <span
              key={o}
              className={cn(
                "flex items-center gap-2 rounded-[10px] border px-3 py-2.5 text-[13px]",
                o === "6" ? "border-[#6C4BFF] bg-[#F7F5FF] font-semibold text-[#18181B]" : "border-[#EDEDF1] text-[#3F3F46]"
              )}
            >
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold",
                  o === "6" ? "bg-[#6C4BFF] text-white" : "bg-[#F4F4F5] text-[#71717A]"
                )}
              >
                {"ABCD"[i]}
              </span>
              {o}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-1.5 border-t border-[#F1F1F4] pt-3.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "grid h-6 w-6 place-items-center rounded-[7px] text-[10.5px] font-semibold",
                i < 6 && i !== 3 && "bg-[#F1EDFF] text-[#6C4BFF]",
                i === 3 && "bg-[#FEF4E2] text-[#B45309]",
                i === 6 && "border border-[#6C4BFF] text-[#6C4BFF]",
                i > 6 && "bg-[#F4F4F5] text-[#9A9AA6]"
              )}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </Panel>

      <Panel style={d(250)} className="v5-pop absolute bottom-6 right-4 w-[176px] rotate-[3deg] rounded-[18px] p-3.5 sm:right-8">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 56 56" className="h-12 w-12 -rotate-90">
            <circle cx="28" cy="28" r={r} fill="none" stroke="#F1EDFF" strokeWidth="7" />
            <circle
              cx="28"
              cy="28"
              r={r}
              fill="none"
              stroke="#6C4BFF"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - score / 100)}
              className="v5-ring"
              style={{ "--c": c, "--o": c * (1 - score / 100) } as React.CSSProperties}
            />
          </svg>
          <div>
            <p className="font-urbanist text-[22px] font-semibold leading-none text-[#18181B]">{score}%</p>
            <p className="mt-1 text-[11px] text-[#9A9AA6]">Rank 6 of 48</p>
          </div>
        </div>
      </Panel>

      <Panel style={d(400)} className="v5-pop absolute bottom-8 left-4 flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] py-2 pl-2 pr-3.5 sm:left-8">
        <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#E8F7EF] text-[#15803D]">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <div>
          <p className="text-[12.5px] font-semibold text-[#18181B]">Certificate sent</p>
          <p className="text-[10.5px] text-[#9A9AA6]">Priya S. · by email</p>
        </div>
      </Panel>
    </SceneCanvas>
  );
}

/* ---------------- Manage: batch attendance + reminder ---------------- */
export function ManageScene() {
  const rows = [
    { n: "Priya Sharma", p: PEOPLE.a1, prog: 86, s: "Present" },
    { n: "Lucas Martin", p: PEOPLE.a2, prog: 72, s: "Present" },
    { n: "Amara Okafor", p: PEOPLE.a3, prog: 64, s: "Late" },
    { n: "Kenji Tanaka", p: PEOPLE.a4, prog: 41, s: "Absent" },
    { n: "Sofia Rossi", p: PEOPLE.a5, prog: 93, s: "Present" },
  ];
  const tone: Record<string, string> = {
    Present: "bg-[#E8F7EF] text-[#15803D]",
    Late: "bg-[#FEF4E2] text-[#B45309]",
    Absent: "bg-[#FDECEC] text-[#B91C1C]",
  };
  return (
    <SceneCanvas>
      <Panel className="v5-pop v5-lift absolute left-6 right-[-56px] top-8 rounded-[20px] p-5 sm:left-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold text-[#18181B]">Batch B · Algebra</p>
            <p className="text-[12px] text-[#9A9AA6]">Live class today · 24 learners</p>
          </div>
          <span className="mr-14 rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[11px] font-semibold text-[#3F3F46]">Attendance</span>
        </div>
        <div className="mt-3.5 divide-y divide-[#F1F1F4]">
          {rows.map((r, i) => (
            <div key={r.n} className="flex items-center gap-3 py-2.5">
              <Face src={r.p} size={28} />
              <p className="w-[104px] truncate text-[12.5px] font-medium text-[#27272A]">{r.n}</p>
              <div className="hidden h-1.5 w-[110px] overflow-hidden rounded-full bg-[#F1F1F4] sm:block">
                <div
                  className="v5-fill h-full rounded-full bg-[#0A0A0B]"
                  style={{ width: `${r.prog}%`, "--w": `${r.prog}%`, "--rv-delay": `${i * 80}ms` } as React.CSSProperties}
                />
              </div>
              <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", tone[r.s])}>{r.s}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel style={d(300)} className="v5-pop absolute bottom-6 left-4 flex w-[270px] -rotate-[2deg] items-start gap-2.5 rounded-[16px] p-3 sm:left-6">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#F1EDFF] text-[#6C4BFF]">
          <Bell className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-[#18181B]">Reminder sent to 24 learners</p>
          <p className="text-[11px] text-[#9A9AA6]">Algebra live class starts at 18:00</p>
        </div>
      </Panel>
    </SceneCanvas>
  );
}

/* ---------------- Sell: checkout + payout ---------------- */
export function SellScene() {
  const gateways = [
    { n: "Stripe", c: "#635BFF" },
    { n: "Razorpay", c: "#0C2451" },
    { n: "Paytm", c: "#00BAF2" },
    { n: "DOKU", c: "#E1251B" },
  ];
  return (
    <SceneCanvas>
      <Panel className="v5-pop v5-lift absolute left-6 right-6 top-8 rounded-[20px] p-5 sm:left-10 sm:right-28">
        <p className="text-[12px] font-medium text-[#71717A]">Checkout</p>
        <div className="mt-2.5 flex items-center gap-3">
          <span className="h-11 w-14 shrink-0 rounded-[10px] bg-[linear-gradient(135deg,#E7F3FD,#F1EDFF)]" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-[#18181B]">Data Analysis Bootcamp</p>
            <p className="text-[11.5px] text-[#9A9AA6]">8 weeks · Live + recorded</p>
          </div>
          <p className="text-[14px] font-semibold tabular-nums text-[#18181B]">$249</p>
        </div>
        <div className="mt-3.5 flex items-center justify-between rounded-[10px] border border-dashed border-[#BBF7D0] bg-[#F0FDF4] px-3 py-2">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#15803D]">
            <Tag className="h-3.5 w-3.5" /> EARLYBIRD applied
          </span>
          <span className="text-[12px] font-semibold tabular-nums text-[#15803D]">−$50</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#F1F1F4] pt-3">
          <span className="text-[13px] text-[#52525B]">Total</span>
          <span className="font-urbanist text-[22px] font-semibold tabular-nums text-[#18181B]">$199</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {gateways.map((g, i) => (
            <span
              key={g.n}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium",
                i === 0 ? "border-[#0A0A0B] text-[#18181B]" : "border-[#EDEDF1] text-[#52525B]"
              )}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: g.c }} />
              {g.n}
            </span>
          ))}
        </div>
        <span className="mt-3.5 block rounded-full bg-[#0A0A0B] py-2.5 text-center text-[13px] font-semibold text-white">Pay $199</span>
      </Panel>

      <Panel style={d(300)} className="v5-pop absolute bottom-5 right-4 hidden w-[232px] rotate-[3deg] rounded-[16px] p-3 sm:right-6 sm:block">
        <p className="text-[11px] text-[#9A9AA6]">Paid to your Stripe account</p>
        <p className="mt-0.5 font-urbanist text-[22px] font-semibold tabular-nums text-[#15803D]">+$199.00</p>
        <p className="mt-1 inline-block rounded-full bg-[#F1EDFF] px-2 py-0.5 text-[10.5px] font-semibold text-[#6C4BFF]">0% commission</p>
      </Panel>
    </SceneCanvas>
  );
}

/* ---------------- Brand: academy website + theme panel ---------------- */
export function BrandScene() {
  const swatches = ["#0F766E", "#6C4BFF", "#EA580C", "#0A0A0B"];
  return (
    <SceneCanvas>
      <Panel className="v5-pop v5-lift absolute left-6 right-[-64px] top-8 overflow-hidden rounded-[20px] sm:left-10">
        <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#E4E4E7]" />
          <span className="h-2 w-2 rounded-full bg-[#E4E4E7]" />
          <span className="h-2 w-2 rounded-full bg-[#E4E4E7]" />
          <span className="ml-3 inline-flex items-center gap-1 rounded-[6px] bg-[#F4F4F5] px-2.5 py-0.5 text-[11px] text-[#71717A]">
            <Lock className="h-2.5 w-2.5 text-[#16A34A]" /> academy.northwind.com
          </span>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-[#0F766E] text-[11px] font-bold text-white">N</span>
            <p className="text-[13px] font-semibold text-[#18181B]">Northwind Academy</p>
          </div>
          <div className="mr-16 hidden gap-4 text-[11.5px] text-[#71717A] sm:flex">
            <span>Courses</span>
            <span>Batches</span>
            <span>Blog</span>
          </div>
        </div>
        <div className="mx-5 rounded-[14px] bg-[#0F766E] p-5 pr-20">
          <p className="font-urbanist text-[19px] font-semibold leading-tight text-white">Learn data skills with live mentors</p>
          <p className="mt-1 text-[11.5px] text-white/70">New batches start 3 March</p>
          <span className="mt-3 inline-block rounded-full bg-white px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0F766E]">Enrol now</span>
        </div>
        <div className="mx-5 my-4 grid grid-cols-3 gap-2 pr-16">
          {["#E6F4F1", "#FEF4E2", "#E7F3FD"].map((c) => (
            <span key={c} className="h-14 rounded-[10px]" style={{ background: c }} />
          ))}
        </div>
      </Panel>

      <Panel style={d(300)} className="v5-pop absolute bottom-6 left-4 w-[220px] -rotate-[2deg] rounded-[16px] p-3.5 sm:left-6">
        <p className="text-[12px] font-semibold text-[#18181B]">Theme</p>
        <div className="mt-2.5 flex gap-2">
          {swatches.map((c, i) => (
            <span
              key={c}
              className={cn("h-7 w-7 rounded-full", i === 0 && "ring-2 ring-[#0F766E] ring-offset-2")}
              style={{ background: c }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[9px] bg-[#F8F8FA] px-2.5 py-2 text-[11.5px] text-[#52525B]">
          <span className="inline-flex items-center gap-1.5">
            <Upload className="h-3 w-3" /> logo-dark.svg
          </span>
          <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} />
        </div>
      </Panel>
    </SceneCanvas>
  );
}

/* ---------------- Security: watermarked video + device limit ---------------- */
export function SecurityScene() {
  return (
    <SceneCanvas>
      <Panel className="v5-pop v5-lift absolute left-6 right-6 top-8 overflow-hidden rounded-[20px] sm:left-10 sm:right-24">
        <div className="relative h-[160px] bg-[linear-gradient(135deg,#1F1B2E,#2A2540)] sm:h-[230px]">
          <div className="absolute inset-0 grid -rotate-[18deg] scale-125 place-content-center gap-8 text-center text-[12px] font-medium text-white/[0.16]">
            {Array.from({ length: 4 }).map((_, i) => (
              <p key={i} className="whitespace-nowrap">
                priya.sharma@mail.com · 10:42 · priya.sharma@mail.com · 10:42
              </p>
            ))}
          </div>
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#18181B]">
            <PlayCircle className="h-6 w-6" />
          </span>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[10.5px] font-medium text-white">
            <ShieldCheck className="h-3 w-3" /> Watermark on
          </span>
          <div className="absolute inset-x-4 bottom-3 h-1 rounded-full bg-white/20">
            <div className="h-full w-[38%] rounded-full bg-white" />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <p className="truncate text-[13px] font-semibold text-[#18181B]">Lesson 3.2 · Loops in practice</p>
          <span className="text-[11px] text-[#9A9AA6]">14:20</span>
        </div>
      </Panel>

      <Panel style={d(300)} className="v5-pop absolute bottom-4 right-4 w-[236px] rotate-[3deg] rounded-[16px] p-3.5 sm:bottom-5 sm:right-6">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-[#18181B]">Devices</p>
          <span className="text-[11px] font-semibold text-[#6C4BFF]">2 of 2 in use</span>
        </div>
        <div className="mt-2.5 space-y-1.5 text-[11.5px]">
          <p className="flex items-center gap-2 text-[#3F3F46]">
            <Monitor className="h-3.5 w-3.5 text-[#71717A]" /> Laptop · Chrome
          </p>
          <p className="flex items-center gap-2 text-[#3F3F46]">
            <Smartphone className="h-3.5 w-3.5 text-[#71717A]" /> Phone · Safari
          </p>
          <p className="flex items-center gap-2 rounded-[8px] bg-[#FDECEC] px-2 py-1 font-medium text-[#B91C1C]">
            <X className="h-3.5 w-3.5" /> New device blocked
          </p>
        </div>
      </Panel>
    </SceneCanvas>
  );
}

/* ---------------- Domie AI (dark): answer grounded in a lesson ---------------- */
export function AiScene() {
  return (
    <SceneCanvas dark>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_20%,rgba(108,75,255,0.35),transparent_70%)]" />
      <div className="v5-pop absolute left-5 right-5 top-8 space-y-3 sm:left-10 sm:right-10">
        <div className="ml-auto flex max-w-[300px] items-end justify-end gap-2">
          <p className="rounded-[16px] rounded-br-[6px] bg-white px-3.5 py-2.5 text-[13px] text-[#18181B]">
            Why does my while loop never stop?
          </p>
          <Face src={PEOPLE.a1} size={28} />
        </div>
        <div style={d(200)} className="v5-pop flex max-w-[400px] items-start gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#6C4BFF] text-[11px] font-bold text-white">D</span>
          <div className="rounded-[16px] rounded-tl-[6px] border border-white/10 bg-white/[0.08] px-3.5 py-3 text-[13px] leading-[1.55] text-[#E4E4E7]">
            Your loop checks <span className="rounded bg-white/10 px-1 font-mono text-[12px] text-white">count &lt; 10</span>, but{" "}
            <span className="font-mono text-[12px] text-white">count</span> never goes up. Add{" "}
            <span className="rounded bg-white/10 px-1 font-mono text-[12px] text-white">count += 1</span> inside the loop.
            <span className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#A99BFF]">
              <PlayCircle className="h-3 w-3" /> From Module 3 · Lesson 2
            </span>
          </div>
        </div>
      </div>
      <div
        style={d(320)}
        className="v5-pop absolute bottom-[132px] left-5 hidden w-[240px] -rotate-[2deg] rounded-[16px] border border-white/10 bg-[#15131F] p-3.5 sm:left-10 sm:block"
      >
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#A99BFF]">
          <FileText className="h-3 w-3" /> Draft ready for review
        </p>
        <p className="mt-1 text-[13px] font-semibold text-white">Data Analysis Bootcamp</p>
        <div className="mt-2 space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-white/15" />
          <span className="block h-1.5 w-[85%] rounded-full bg-white/15" />
          <span className="block h-1.5 w-[60%] rounded-full bg-white/15" />
        </div>
      </div>
      <div
        style={d(450)}
        className="v5-pop absolute bottom-6 right-4 w-[250px] rounded-[16px] border border-white/10 bg-[#15131F] p-3.5 sm:right-8"
      >
        <p className="text-[11px] font-medium text-[#A99BFF]">Needs attention</p>
        <p className="mt-1 text-[13px] font-semibold text-white">3 learners in Batch B fell behind</p>
        <div className="mt-2.5 flex items-center">
          <Face src={PEOPLE.a3} size={24} className="ring-2 ring-[#15131F]" />
          <Face src={PEOPLE.a4} size={24} className="-ml-2 ring-2 ring-[#15131F]" />
          <Face src={PEOPLE.mia} size={24} className="-ml-2 ring-2 ring-[#15131F]" />
          <span className="ml-2 text-[11px] text-[#A1A1AA]">Missed 2 classes</span>
        </div>
      </div>
    </SceneCanvas>
  );
}
