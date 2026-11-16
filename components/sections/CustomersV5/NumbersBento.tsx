import React from "react";
import Image from "next/image";
import { Check, PlayCircle, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/sections/HomeV5/CountUp";

/*
 * Real platform numbers, each with a small graphic that shows what the number means.
 * Numbers from lmsdomain.com; graphics are sample UI.
 */

const FACES = [
  "/assets/img/home/testimonials/author-1.jpg",
  "/assets/img/home/testimonials/author-2.jpg",
  "/assets/img/home/testimonials/author-3.jpg",
  "/assets/img/home/testimonials/author-4.jpg",
  "/assets/img/home/testimonials/author-5.jpg",
  "/assets/img/home/participant_mia.jpg",
];
const panel = "rounded-[12px] border border-[#EDEDF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_12px_28px_-14px_rgba(16,16,24,0.2)]";

function LearnersArt() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex">
        {FACES.map((f, i) => (
          <Image
            key={f}
            src={f}
            alt=""
            width={88}
            height={88}
            style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            className={cn("v5-pop h-11 w-11 rounded-full object-cover object-top ring-[3px] ring-[#F4F5F8]", i > 0 && "-ml-3")}
          />
        ))}
      </div>
      <span style={{ "--d": "550ms" } as React.CSSProperties} className={cn("v5-pop mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#18181B]", panel, "rounded-full")}>
        <span className="mo-ping h-1.5 w-1.5 rounded-full bg-[#16A34A] text-[#16A34A]" /> 14 new learners today
      </span>
    </div>
  );
}

function CoursesArt() {
  const c = [
    { t: "Python basics", img: "/images/solutions/language-test-prep-1.webp", r: "-rotate-[8deg] -translate-x-12" },
    { t: "Spoken English", img: "/images/features/live-class-screen.webp", r: "rotate-[6deg] translate-x-12" },
    { t: "Data skills", img: "/images/features/cohort-workshop.webp", r: "" },
  ];
  return (
    <div className="relative flex h-full items-center justify-center">
      {c.map((x, i) => (
        <div
          key={x.t}
          style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
          className={cn("v5-pop absolute w-[120px] p-1.5 transition-transform duration-500", panel, x.r, i === 2 && "z-10 group-hover:-translate-y-2")}
        >
          <div className="relative h-[56px] overflow-hidden rounded-[8px] bg-[#E4E4E7]">
            <Image src={x.img} alt="" fill sizes="120px" className="object-cover" />
          </div>
          <p className="mt-1.5 truncate px-0.5 text-[11px] font-semibold text-[#18181B]">{x.t}</p>
          <p className="px-0.5 text-[9.5px] text-[#9A9AA6]">12 lessons</p>
        </div>
      ))}
    </div>
  );
}

function LessonsArt() {
  const rows = [
    { t: "Welcome and setup", p: 100 },
    { t: "Variables and data", p: 100 },
    { t: "Loops in practice", p: 60 },
  ];
  return (
    <div className="flex h-full items-center justify-center px-5">
      <div className={cn("w-full max-w-[230px] space-y-1.5 p-2.5", panel)}>
        {rows.map((r, i) => (
          <div key={r.t} style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className="v5-pop rounded-[8px] bg-[#F8F8FA] px-2 py-1.5">
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#27272A]">
              {r.p === 100 ? (
                <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#0A0A0B] text-white">
                  <Check className="h-2 w-2" strokeWidth={4} />
                </span>
              ) : (
                <PlayCircle className="h-3.5 w-3.5 text-[#0A0A0B]" />
              )}
              <span className="truncate">{r.t}</span>
            </p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#E4E4E7]">
              <div className="v5-fill h-full rounded-full bg-[#0A0A0B]" style={{ width: `${r.p}%`, "--w": `${r.p}%`, "--rv-delay": `${i * 120}ms` } as React.CSSProperties} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveArt() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className={cn("relative w-[200px] p-1.5", panel)}>
        <div className="grid grid-cols-2 gap-1">
          {FACES.slice(0, 4).map((f, i) => (
            <div key={f} className="relative h-[52px] overflow-hidden rounded-[7px] bg-[#16141F]">
              <Image src={f} alt="" fill sizes="100px" className="object-cover object-top opacity-90" />
              {i === 0 && <span className="absolute inset-0 rounded-[7px] ring-2 ring-inset ring-[#4ADE80]" />}
            </div>
          ))}
        </div>
        <span className="absolute -top-2.5 left-3 inline-flex items-center gap-1 rounded-full bg-[#DC2626] px-2 py-0.5 text-[10px] font-semibold text-white">
          <span className="mo-ping h-1.5 w-1.5 rounded-full bg-white text-white" /> Live
        </span>
        <span className="absolute -bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#0A0A0B] px-2.5 py-1 text-[10px] font-semibold text-white">
          <Video className="h-3 w-3" /> 23 joined
        </span>
      </div>
    </div>
  );
}

// Pictures by position (Learners, Courses, Lessons, Live classes); text from Admin > Customers
const ARTS = [LearnersArt, CoursesArt, LessonsArt, LiveArt];

export function NumbersBento({ items }: { items: { value: string; label: string; text: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ value: v, label: l, text: s }, i) => {
        const Art = ARTS[i % ARTS.length];
        return (
        <div
          key={`${l}-${i}`}
          style={{ "--rv-delay": `${i * 100}ms` } as React.CSSProperties}
          className="rv-v4 group flex flex-col overflow-hidden rounded-[28px] bg-[#F4F5F8] transition-[translate] duration-500 hover:-translate-y-1"
        >
          <div aria-hidden="true" className="relative h-[170px]">
            <Art />
          </div>
          <div className="px-6 pb-6">
            <p className="font-urbanist text-[clamp(38px,4vw,52px)] font-semibold leading-none tracking-[-0.045em] text-[#0A0A0B]">
              <CountUp value={v} />
            </p>
            <p className="mt-2 text-[15px] font-semibold text-[#18181B]">{l}</p>
            <p className="mt-0.5 text-[13px] leading-[1.5] text-[#71717A]">{s}</p>
          </div>
        </div>
        );
      })}
    </div>
  );
}
