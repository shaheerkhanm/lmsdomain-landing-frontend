import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  PlayCircle,
  FileText,
  ListChecks,
  Lock,
  Award,
  TrendingUp,
  ArrowDownLeft,
  Search,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "./primitives";

/*
 * Feature cards modelled on the reference designs (Wiza / finerrr):
 * soft grey card, a layered illustration made of real UI pieces (some bleeding off the edge),
 * then a clear title and one supporting sentence.
 * All names, numbers and prices inside illustrations are sample data.
 */

const PHOTO = {
  instructor: "/assets/img/home/participant_alex.jpg",
  learnerA: "/assets/img/home/testimonials/author-1.jpg",
  learnerB: "/assets/img/home/participant_mia.jpg",
};

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_12px_32px_-14px_rgba(16,16,24,0.18)]";

function Panel({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-[14px] border border-[#EDEDF1] bg-white", shadow, className)} style={style}>
      {children}
    </div>
  );
}

/** Label + value chip, like the form-field chips in the Wiza reference. */
function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <Panel className={cn("shrink-0 px-3 py-2", className)}>
      <p className="text-[10.5px] leading-none text-[#9A9AA6]">{label}</p>
      <p className="mt-1 text-[13px] font-medium leading-none text-[#18181B]">{value}</p>
    </Panel>
  );
}

function IconTile({ tone, children }: { tone: "violet" | "green" | "amber" | "sky"; children: React.ReactNode }) {
  const tones = {
    violet: "bg-[#F1EDFF] text-[#6C4BFF]",
    green: "bg-[#E8F7EF] text-[#15803D]",
    amber: "bg-[#FEF4E2] text-[#B45309]",
    sky: "bg-[#E7F3FD] text-[#0369A1]",
  };
  return <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-[9px]", tones[tone])}>{children}</span>;
}

function Avatar({ src, size = 36, className }: { src: string; size?: number; className?: string }) {
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

function BentoCard({
  title,
  description,
  href,
  className,
  delay = 0,
  children,
}: {
  title: string;
  description: string;
  href: string;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{ "--rv-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(
        "rv-v4 group relative flex flex-col overflow-hidden rounded-[28px] bg-[#F4F5F8] transition-colors duration-300 hover:bg-[#EFF0F4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4BFF]",
        className
      )}
    >
      <div aria-hidden="true" className="relative h-[270px] overflow-hidden">
        {children}
      </div>
      <div className="mt-auto flex items-end justify-between gap-4 px-7 pb-7 pt-2">
        <div>
          <h3 className="font-urbanist text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0A0A0B]">{title}</h3>
          <p className="mt-2 max-w-[44ch] text-[14.5px] leading-[1.55] text-[#6B6B76]">{description}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#71717A] transition group-hover:bg-[#0A0A0B] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/* ---------------- 1. Courses: tree of course → details → lessons ---------------- */
function CoursesArt() {
  const lessons = [
    { icon: <PlayCircle className="h-4 w-4" />, tone: "violet" as const, t: "Welcome and setup", m: "Video · 6 min" },
    { icon: <FileText className="h-4 w-4" />, tone: "amber" as const, t: "Variables workbook", m: "PDF · 12 pages" },
    { icon: <ListChecks className="h-4 w-4" />, tone: "green" as const, t: "Checkpoint quiz", m: "Quiz · 10 questions" },
  ];
  return (
    <div className="absolute inset-0 pl-8 pt-8">
      <div className="absolute left-[47px] top-[60px] h-[158px] w-px bg-[#DCDCE3]" />
      <Panel className="v5-pop relative inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
        <IconTile tone="violet">
          <BookOpen className="h-4 w-4" />
        </IconTile>
        <span className="text-[13.5px] font-semibold text-[#18181B]">Python for Beginners</span>
      </Panel>

      <div style={{ "--d": "100ms" } as React.CSSProperties} className="v5-pop relative ml-[38px] mt-4 flex gap-2">
        <span className="absolute -left-[23px] top-1/2 h-px w-[23px] bg-[#DCDCE3]" />
        <Field label="Modules" value="6" />
        <Field label="Lessons" value="48" />
        <Field label="Release" value="Weekly drip" />
        <Field label="Access" value="12 months" className="opacity-60" />
      </div>

      <div style={{ "--d": "200ms" } as React.CSSProperties} className="v5-pop v5-lift relative ml-[38px] mt-3 flex gap-2">
        <span className="absolute -left-[23px] top-1/2 h-px w-[23px] bg-[#DCDCE3]" />
        {lessons.map((l, i) => (
          <Panel key={l.t} className={cn("flex w-[196px] shrink-0 items-center gap-2.5 p-2.5", i === 2 && "opacity-70")}>
            <IconTile tone={l.tone}>{l.icon}</IconTile>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-[#18181B]">{l.t}</p>
              <p className="text-[11px] text-[#9A9AA6]">{l.m}</p>
            </div>
          </Panel>
        ))}
      </div>

      <div style={{ "--d": "300ms" } as React.CSSProperties} className="v5-pop relative ml-[38px] mt-3">
        <span className="absolute -left-[23px] top-1/2 h-px w-[23px] bg-[#DCDCE3]" />
        <Panel className="inline-flex items-center gap-1.5 px-3 py-2 text-[12.5px] font-medium text-[#6C4BFF]">
          <Lock className="h-3.5 w-3.5" /> Module 2 unlocks Monday
        </Panel>
      </div>
    </div>
  );
}

/* ---------------- 2. Live classes: instructor card with a stacked card behind ---------------- */
function LiveArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-9">
      <div className="absolute top-[52px] h-[200px] w-[296px] scale-[0.94] rounded-[18px] border border-[#EDEDF1] bg-white/60" />
      <Panel className="v5-pop v5-lift relative w-[284px] rounded-[18px] p-4">
        <div className="flex items-start justify-between">
          <Avatar src={PHOTO.instructor} size={44} />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E9E3FF] bg-[#F7F5FF] px-2.5 py-1 text-[11px] font-semibold text-[#6C4BFF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C4BFF]" />
            Live in 35 min
          </span>
        </div>
        <p className="mt-3 text-[15px] font-semibold text-[#18181B]">Algebra: quadratic equations</p>
        <p className="text-[12.5px] text-[#71717A]">Daniel Reyes · Grade 10, Batch B</p>
        <div className="mt-3.5 flex items-center justify-between border-t border-[#F1F1F4] pt-3">
          <div className="flex items-center">
            <Avatar src={PHOTO.learnerA} size={24} className="ring-2 ring-white" />
            <Avatar src={PHOTO.learnerB} size={24} className="-ml-2 ring-2 ring-white" />
            <span className="-ml-2 grid h-6 w-6 place-items-center rounded-full bg-[#F4F4F5] text-[9px] font-semibold text-[#52525B] ring-2 ring-white">
              +22
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#0A0A0B] px-3 py-1.5 text-[11.5px] font-semibold text-white">
            <Video className="h-3.5 w-3.5" /> Join on Zoom
          </span>
        </div>
      </Panel>
      <Panel style={{ "--d": "350ms" } as React.CSSProperties} className="v5-pop absolute bottom-3 right-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] text-[#3F3F46]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> Recording saved to course
      </Panel>
    </div>
  );
}

/* ---------------- 3. Integrations: brand chips joined by bracket lines (Wiza style) ---------------- */
const BRANDS: Record<string, { color: string; mark: React.ReactNode }> = {
  "LMS Domain": { color: "#0A0A0B", mark: "L" },
  Zoom: { color: "#2D8CFF", mark: <Video className="h-3 w-3" /> },
  Stripe: { color: "#635BFF", mark: "S" },
  Razorpay: { color: "#0C2451", mark: "R" },
  Zapier: { color: "#FF4F00", mark: "Z" },
};

function BrandChip({ name, className }: { name: string; className?: string }) {
  const b = BRANDS[name];
  return (
    <Panel className={cn("flex h-10 w-fit items-center gap-2 rounded-full pl-2 pr-4", className)}>
      <span
        className="grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-white"
        style={{ background: b.color }}
      >
        {b.mark}
      </span>
      <span className="text-[13.5px] font-semibold text-[#18181B]">{name}</span>
    </Panel>
  );
}

function IntegrationsArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <div className="relative w-[236px]">
        <div className="absolute inset-x-[18px] top-[20px] h-[168px] rounded-[18px] border border-[#DCDCE3]" />
        <div className="v5-pop relative flex justify-center">
          <BrandChip name="LMS Domain" />
        </div>
        <div style={{ "--d": "90ms" } as React.CSSProperties} className="v5-pop relative mt-2.5 flex justify-end">
          <BrandChip name="Zoom" />
        </div>
        <div style={{ "--d": "180ms" } as React.CSSProperties} className="v5-pop relative mt-2.5 flex justify-start">
          <BrandChip name="Stripe" />
        </div>
        <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-pop relative mt-2.5 flex justify-end">
          <BrandChip name="Razorpay" />
        </div>
        <div style={{ "--d": "360ms" } as React.CSSProperties} className="v5-pop relative mt-2.5 flex justify-center">
          <BrandChip name="Zapier" className="opacity-70" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- 4. Tests: tilted floating cards (finerrr style) ---------------- */
function TestsArt() {
  const score = 82;
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="absolute inset-0">
      <Panel className="v5-pop v5-lift absolute left-5 top-8 w-[168px] -rotate-[6deg] rounded-[16px] p-3.5">
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
            <p className="mt-1 text-[11px] text-[#9A9AA6]">Mock test 4</p>
          </div>
        </div>
      </Panel>
      <Panel style={{ "--d": "150ms" } as React.CSSProperties} className="v5-pop absolute right-4 top-[104px] w-[128px] rotate-[5deg] rounded-[16px] p-3">
        <IconTile tone="green">
          <TrendingUp className="h-4 w-4" />
        </IconTile>
        <p className="mt-2.5 font-urbanist text-[20px] font-semibold leading-none text-[#18181B]">Rank 6</p>
        <p className="mt-1 text-[11px] text-[#9A9AA6]">of 48 · up 3 places</p>
      </Panel>
      <Panel style={{ "--d": "300ms" } as React.CSSProperties} className="v5-pop absolute bottom-5 left-5 flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] py-2 pl-2 pr-3.5">
        <IconTile tone="amber">
          <Award className="h-4 w-4" />
        </IconTile>
        <div>
          <p className="text-[12.5px] font-semibold text-[#18181B]">Certificate issued</p>
          <p className="text-[10.5px] text-[#9A9AA6]">Sent to learner by email</p>
        </div>
      </Panel>
    </div>
  );
}

/* ---------------- 5. Payments: staggered transaction rows (finerrr style) ---------------- */
function PaymentsArt() {
  const rows = [
    { title: "Course sale · Stripe", date: "Today, 10:42", amount: "+$59.00", tone: "green" as const },
    { title: "Live batch seat · Razorpay", date: "Today, 09:15", amount: "+₹4,999", tone: "violet" as const },
    { title: "Course bundle · Stripe", date: "Yesterday", amount: "+€120.00", tone: "sky" as const },
  ];
  return (
    <div className="absolute inset-0 pt-10">
      {rows.map((r, i) => (
        <Panel
          key={r.title}
          className={cn("v5-pop relative mb-3 flex w-[300px] items-center gap-3 rounded-[16px] p-3", i === 0 && "v5-lift", i === 2 && "opacity-75")}
          style={{ marginLeft: 24 + i * 22, "--d": `${i * 130}ms` } as React.CSSProperties}
        >
          <IconTile tone={r.tone}>
            <ArrowDownLeft className="h-4 w-4" />
          </IconTile>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{r.title}</p>
            <p className="text-[11px] text-[#9A9AA6]">{r.date}</p>
          </div>
          <p className="text-[13px] font-semibold tabular-nums text-[#18181B]">{r.amount}</p>
        </Panel>
      ))}
    </div>
  );
}

/* ---------------- 6. Brand: academy website + magnifier on the domain (Wiza style) ---------------- */
function BrandArt() {
  return (
    <div className="absolute inset-0">
      <Panel className="v5-pop v5-lift absolute left-[44%] right-[-56px] top-9 overflow-hidden rounded-[18px] sm:left-[30%]">
        <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#E4E4E7]" />
          <span className="h-2 w-2 rounded-full bg-[#E4E4E7]" />
          <span className="h-2 w-2 rounded-full bg-[#E4E4E7]" />
          <span className="ml-3 rounded-[6px] bg-[#F4F4F5] px-2.5 py-0.5 text-[11px] text-[#9A9AA6]">academy.northwind.com</span>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-[#0F766E] text-[11px] font-bold text-white">N</span>
            <p className="whitespace-nowrap text-[13px] font-semibold text-[#18181B]">Northwind Academy</p>
          </div>
        </div>
        <div className="mx-5 mb-5 rounded-[12px] bg-[#0F766E] p-4 pr-16">
          <p className="text-[14px] font-semibold text-white">New batches start 3 March</p>
          <p className="mt-0.5 text-[11.5px] text-white/70">Book your seat today</p>
          <span className="mt-3 inline-block rounded-[8px] bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#0F766E]">
            Enrol now
          </span>
        </div>
      </Panel>

      <div style={{ "--d": "300ms" } as React.CSSProperties} className="v5-pop absolute bottom-7 left-6 grid h-[128px] w-[128px] place-items-center rounded-full border border-[#EDEDF1] bg-white shadow-[0_20px_40px_-16px_rgba(16,16,24,0.3)]">
        <div className="text-center">
          <Lock className="mx-auto h-4 w-4 text-[#16A34A]" />
          <p className="mt-1.5 text-[13px] font-semibold leading-tight text-[#18181B]">
            northwind
            <br />
            .com
          </p>
          <p className="mt-1 text-[10px] text-[#9A9AA6]">SSL secured</p>
        </div>
      </div>
      <Search className="absolute bottom-2 left-[124px] h-7 w-7 text-[#C4C4CC]" strokeWidth={2.25} />
    </div>
  );
}

export function FeatureBento() {
  return (
    <section id="features" className="bg-white py-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading eyebrow="Features" title="Everything you need to run your academy" />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          <BentoCard
            className="md:col-span-2 lg:col-span-5"
            href="/platform/teach"
            title="Build courses your way"
            description="Video, PDF and quiz lessons in modules. Release them weekly or all at once."
          >
            <CoursesArt />
          </BentoCard>
          <BentoCard
            className="lg:col-span-4"
            delay={90}
            href="/platform/teach"
            title="Teach live on Zoom"
            description="Schedule classes by batch. Reminders go out and recordings are saved to the course."
          >
            <LiveArt />
          </BentoCard>
          <BentoCard
            className="lg:col-span-3"
            delay={180}
            href="/features"
            title="Connects with your tools"
            description="Zoom, Stripe, Razorpay, Zapier and more."
          >
            <IntegrationsArt />
          </BentoCard>

          <BentoCard
            className="lg:col-span-3"
            href="/platform/assess"
            title="Tests and certificates"
            description="Timed mock tests, instant grading, rankings and certificates."
          >
            <TestsArt />
          </BentoCard>
          <BentoCard
            className="lg:col-span-4"
            delay={90}
            href="/platform/sell"
            title="Get paid in any currency"
            description="Sell worldwide with Stripe or Razorpay. You keep 100% of every sale."
          >
            <PaymentsArt />
          </BentoCard>
          <BentoCard
            className="md:col-span-2 lg:col-span-5"
            delay={180}
            href="/platform/brand"
            title="Your brand, your domain"
            description="Your logo, colours and web address. Learners never see our name."
          >
            <BrandArt />
          </BentoCard>
        </div>
      </Container>
    </section>
  );
}
