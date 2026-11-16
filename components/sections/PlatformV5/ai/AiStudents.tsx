import React from "react";
import Image from "next/image";
import { BookOpen, FileText, Moon, PlayCircle, SearchX, ShieldCheck, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "../../HomeV5/primitives";
import { Card, Panel, d } from "../bento";
import { AiExplain } from "./AiExplain";
import { DomieMark } from "@/components/brand/PartnerMarks";

/*
 * Domie AI page: how it helps learners (four everyday moments) and how it works (three steps).
 * Plain product UI only, no AI-style decoration. Claims match content/platform/ai.ts.
 */

function Avatar({ src, size = 24 }: { src: string; size?: number }) {
  return (
    <Image
      src={src}
      alt=""
      width={size * 2}
      height={size * 2}
      className="shrink-0 rounded-full object-cover object-top"
      style={{ width: size, height: size }}
    />
  );
}

function Domie({ size = 24 }: { size?: number }) {
  return <DomieMark size={size} />;
}

function Me({ children, delay = 0, photo }: { children: React.ReactNode; delay?: number; photo: string }) {
  return (
    <div style={d(delay)} className="v5-pop ml-auto flex max-w-[86%] items-end gap-2">
      <p className="rounded-[14px] rounded-br-[5px] bg-[#0A0A0B] px-3 py-2 text-[12px] leading-[1.45] text-white">{children}</p>
      <Avatar src={photo} size={22} />
    </div>
  );
}

function Bot({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div style={d(delay)} className={cn("v5-pop flex max-w-[92%] items-start gap-2", className)}>
      <Domie size={22} />
      <div className="rounded-[14px] rounded-tl-[5px] border border-[#ECECF1] bg-white px-3 py-2 text-[12px] leading-[1.5] text-[#27272A]">{children}</div>
    </div>
  );
}

/* 1. Help at any hour */
function NightArt() {
  return (
    <div className="absolute inset-0 flex justify-center pt-6">
      <Panel className="v5-lift w-[min(330px,calc(100%-40px))] rounded-[18px] p-3.5">
        <div className="flex items-center justify-between border-b border-[#F1F1F4] pb-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#18181B]">
            <Moon className="h-3.5 w-3.5" /> 11:42 pm
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[#9A9AA6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4D4D8]" /> Instructor offline
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          <Me photo="/assets/img/home/testimonials/author-3.jpg" delay={100}>
            What does &ldquo;present perfect&rdquo; mean again?
          </Me>
          <Bot delay={400}>
            It links the past to now: <span className="font-semibold">&ldquo;I have finished my homework.&rdquo;</span> It&apos;s covered in Lesson 4.1.
          </Bot>
        </div>
      </Panel>
    </div>
  );
}

/* 2. Answers from your own lessons and notes */
function SourcesArt() {
  const src = [
    { i: PlayCircle, t: "Lesson 2.3 · Percentages", m: "Video lesson" },
    { i: FileText, t: "Percentages worksheet", m: "PDF · page 2" },
  ];
  return (
    <div className="absolute inset-0 px-6 pt-6 sm:px-8">
      <Bot delay={100} className="max-w-[360px]">
        15% of 200 is <span className="font-semibold">30</span>. Turn 15% into 0.15, then multiply: 0.15 × 200 = 30.
      </Bot>
      <div className="ml-8 mt-3 max-w-[330px] space-y-2">
        <p style={d(300)} className="v5-pop text-[10.5px] font-medium uppercase tracking-wide text-[#9A9AA6]">
          Based on your course
        </p>
        {src.map((s, i) => (
          <Panel key={s.t} style={d(420 + i * 120)} className="v5-pop flex items-center gap-2.5 rounded-[12px] p-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-[#F4F5F8] text-[#0A0A0B]">
              <s.i className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#18181B]">{s.t}</p>
              <p className="text-[10.5px] text-[#9A9AA6]">{s.m}</p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* 3. Honest when the answer isn't in the course */
function HonestArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[min(340px,calc(100%-40px))] space-y-2.5">
        <Me photo="/assets/img/home/testimonials/author-2.jpg" delay={100}>
          Will question 7 be on the final exam?
        </Me>
        <Bot delay={400}>
          <span className="flex items-center gap-1.5 font-semibold text-[#18181B]">
            <SearchX className="h-3.5 w-3.5" /> Not in your course materials
          </span>
          <span className="mt-1 block text-[#52525B]">I won&apos;t guess about exams. Please ask your instructor, Mia.</span>
        </Bot>
        <Me photo="/assets/img/home/testimonials/author-2.jpg" delay={700}>
          Got it, thanks!
        </Me>
      </div>
    </div>
  );
}

/* 4. Follow-up questions in plain language */
function FollowUpArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[min(340px,calc(100%-40px))] space-y-2">
        <Bot delay={100}>A function is a named block of code you can reuse.</Bot>
        <Me photo="/assets/img/home/testimonials/author-5.jpg" delay={300}>
          Can you explain that more simply?
        </Me>
        <Bot delay={550}>
          Think of it like a recipe. You write it once, then &ldquo;cook&rdquo; it whenever you need it by calling its name.
        </Bot>
      </div>
    </div>
  );
}

/* How it works: three steps */
const STEPS = [
  {
    n: "1",
    t: "You publish your course",
    b: "The lessons and PDF notes you publish become what Domie answers from.",
    art: (
      <div className="space-y-1.5">
        {[
          { i: PlayCircle, t: "12 video lessons" },
          { i: FileText, t: "6 PDF notes" },
          { i: Upload, t: "Published" },
        ].map((r, k) => (
          <p key={r.t} className={cn("flex items-center gap-2 rounded-[9px] px-2.5 py-1.5 text-[11.5px] font-medium", k === 2 ? "bg-[#E8F7EF] text-[#15803D]" : "bg-[#F8F8FA] text-[#18181B]")}>
            <r.i className="h-3.5 w-3.5" /> {r.t}
          </p>
        ))}
      </div>
    ),
  },
  {
    n: "2",
    t: "You choose who can use it",
    b: "Turn Domie on or off for each course and learner group.",
    art: (
      <div className="space-y-1.5">
        {[
          { t: "Python for Beginners", on: true },
          { t: "Business English", on: true },
          { t: "Final exam prep", on: false },
        ].map((r) => (
          <p key={r.t} className="flex items-center justify-between rounded-[9px] bg-[#F8F8FA] px-2.5 py-1.5 text-[11.5px] font-medium text-[#18181B]">
            <span className="truncate">{r.t}</span>
            <span className={cn("relative h-4 w-7 shrink-0 rounded-full", r.on ? "bg-[#0A0A0B]" : "bg-[#E4E4E7]")}>
              <span className={cn("absolute top-0.5 h-3 w-3 rounded-full bg-white", r.on ? "left-[14px]" : "left-0.5")} />
            </span>
          </p>
        ))}
      </div>
    ),
  },
  {
    n: "3",
    t: "Learners ask inside the course",
    b: "Answers come from your material, right next to the lesson they're studying.",
    art: (
      <div className="space-y-1.5">
        <p className="ml-auto w-fit rounded-[10px] rounded-br-[4px] bg-[#0A0A0B] px-2.5 py-1.5 text-[11px] text-white">How do I join a list?</p>
        <p className="flex w-fit items-start gap-1.5 rounded-[10px] rounded-tl-[4px] border border-[#ECECF1] bg-white px-2.5 py-1.5 text-[11px] text-[#27272A]">
          <BookOpen className="mt-0.5 h-3 w-3 shrink-0 text-[#71717A]" /> Use the join() method. See Lesson 5.2.
        </p>
      </div>
    ),
  },
];

const QUESTIONS_A = [
  "Why does my while loop never stop?",
  "What does “present perfect” mean?",
  "How do I find the slope of a line?",
  "What's 15% of 200?",
  "When should I use a list or a tuple?",
  "How do I write a strong conclusion?",
];
const QUESTIONS_B = [
  "Can you explain functions more simply?",
  "What's the difference between profit and revenue?",
  "How do I factorise x² + 5x + 6?",
  "Which lesson covers pivot tables?",
  "What does “Asha 21” mean in this output?",
  "How do I join items in a list?",
];

function QuestionRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="animate-marquee-v4 gap-3 py-1.5" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {loop.map((q, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] py-2 pl-2 pr-4 text-[13.5px] text-[#D4D4D8]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[10px] font-semibold text-white">?</span>
            {q}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AiStudents() {
  return (
    <>
      {/* For learners */}
      <section className="pt-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="For learners"
            title="Help for every learner, at any hour"
            subtitle="Learners get quick, clear answers from your own course, so they keep moving instead of waiting for the next class."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16">
            <Card dark title="Help when teachers are offline" body="Learners can ask a question at night or on the weekend and get an answer straight away.">
              <NightArt />
            </Card>
            <Card dark delay={90} title="Answers from your own lessons" body="Domie uses only the lessons and notes you publish, not random content from the internet.">
              <SourcesArt />
            </Card>
            <Card dark title="Honest when it doesn't know" body="If the answer isn't in your course, Domie says so and points the learner to their instructor.">
              <HonestArt />
            </Card>
            <Card dark delay={90} title="Follow-up questions, in plain words" body="Learners can ask again in their own words until the idea makes sense.">
              <FollowUpArt />
            </Card>
          </div>
        </Container>
      </section>

      <AiExplain />

      {/* What learners ask */}
      <section className="pt-[clamp(72px,9vw,120px)]">
        <Container>
          <p className="rv-v4 text-center text-[14px] font-medium text-[#A1A1AA]">The kind of questions learners ask, in every subject</p>
        </Container>
        <div className="rv-v4 mt-6 space-y-3">
          <QuestionRow items={QUESTIONS_A} />
          <QuestionRow items={QUESTIONS_B} reverse />
        </div>
      </section>

      {/* How it works */}
      <section className="pt-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading tone="dark" eyebrow="How it works" title="Set up once, then it works in every course" />
          <ol className="relative mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
            <span
              aria-hidden="true"
              className="rv-v4 v5-draw absolute left-[16%] right-[16%] top-[52px] hidden border-t border-dashed border-white/20 lg:block"
            />
            {STEPS.map((s, i) => (
              <li key={s.n} style={{ "--rv-delay": `${i * 160}ms` } as React.CSSProperties} className="rv-v4 relative">
                <div className="flex h-full flex-col rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-inset ring-white/10 transition-[background-color,translate] duration-500 hover:-translate-y-1 hover:bg-white/[0.06] sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="v5-badge relative grid h-8 w-8 place-items-center rounded-full bg-white text-[13px] font-semibold text-[#0A0A0B]">
                      {s.n}
                    </span>
                    <p className="font-urbanist text-[19px] font-semibold tracking-[-0.01em] text-white">{s.t}</p>
                  </div>
                  <Panel className="mt-5 rounded-[16px] p-3">{s.art}</Panel>
                  <p className="mt-5 text-[14.5px] leading-[1.55] text-[#A1A1AA]">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="rv-v4 mt-6 flex items-center justify-center gap-2 text-center text-[13.5px] text-[#A1A1AA]">
            <ShieldCheck className="h-4 w-4" /> Your course content is never used to train outside AI models.
          </p>
        </Container>
      </section>
    </>
  );
}
