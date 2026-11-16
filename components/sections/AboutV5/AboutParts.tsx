import React from "react";
import Image from "next/image";
import { CalendarDays, Check, HeartHandshake, Lock, MapPin, PlayCircle, Store, Users, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* Building blocks for the v5 About page. Product visuals use sample data. */

const panel = "rounded-[14px] border border-[#EDEDF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_16px_36px_-18px_rgba(16,16,24,0.25)]";
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Hero photo collage with floating facts. */
export function AboutCollage({ country, year }: { country: string; year: number }) {
  return (
    <div aria-hidden="true" className="relative mx-auto grid max-w-[1100px] grid-cols-12 gap-3 sm:gap-4">
      <div className="relative col-span-12 h-[220px] overflow-hidden rounded-[28px] sm:col-span-7 sm:h-[380px]">
        <Image src="/assets/img/about-img.jpg" alt="" fill sizes="(min-width: 640px) 640px, 100vw" className="v5-zoom object-cover" />
      </div>
      <div className="col-span-12 grid grid-cols-2 gap-3 sm:col-span-5 sm:grid-cols-1 sm:gap-4">
        <div className="relative h-[160px] overflow-hidden rounded-[28px] sm:h-[182px]">
          <Image src="/images/solutions/coaching-institutes-1.webp" alt="" fill sizes="460px" className="object-cover" />
        </div>
        <div className="relative h-[160px] overflow-hidden rounded-[28px] sm:h-[182px]">
          <Image src="/assets/img/our-story-img.jpg" alt="" fill sizes="460px" className="object-cover" />
        </div>
      </div>

      {/* floating facts */}
      <div className="mo-float absolute -bottom-6 left-4 hidden sm:block lg:-left-6" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div style={d(800)} className={cn("v5-rise flex -rotate-[2deg] items-center gap-2.5 py-2.5 pl-2.5 pr-4", panel)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0A0A0B] text-white">
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">Built in {country}</p>
            <p className="text-[11px] text-[#9A9AA6]">Used by academies worldwide</p>
          </div>
        </div>
      </div>
      <div className="mo-float absolute -top-5 right-4 hidden sm:block lg:-right-6" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div style={d(950)} className={cn("v5-rise flex rotate-[2deg] items-center gap-2.5 py-2.5 pl-2.5 pr-4", panel)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F4F5F8] text-[#0A0A0B]">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">Since {year}</p>
            <p className="text-[11px] text-[#9A9AA6]">Building for educators</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** "Why we built it": a video marketplace vs an academy that teaches on a schedule. */
export function WhyWeBuilt() {
  return (
    <div aria-hidden="true" className="relative grid gap-4 sm:grid-cols-2">
      {/* Typical course platform */}
      <div className="rv-v4 rounded-[28px] bg-[#F4F5F8] p-5">
        <p className="text-[12.5px] font-semibold text-[#71717A]">A typical course platform</p>
        <div className={cn("mt-4 p-3", panel)}>
          <div className="flex items-center gap-2 text-[11.5px] text-[#9A9AA6]">
            <Store className="h-3.5 w-3.5" /> Course marketplace
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {["#E4E4E7", "#E4E4E7", "#E4E4E7", "#E4E4E7"].map((c, i) => (
              <div key={i} className="rounded-[8px] bg-[#F8F8FA] p-1.5">
                <span className="relative block h-10 rounded-[6px]" style={{ background: c }}>
                  <PlayCircle className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                </span>
                <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-[#E4E4E7]" />
              </div>
            ))}
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-[13.5px] text-[#71717A]">
          {["Built to sell recorded videos", "Their brand, their marketplace", "A cut of every sale"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <X className="h-3.5 w-3.5 text-[#B91C1C]" strokeWidth={3} /> {t}
            </li>
          ))}
        </ul>
      </div>

      {/* LMS Domain */}
      <div style={{ "--rv-delay": "140ms" } as React.CSSProperties} className="rv-v4 rounded-[28px] bg-[#0A0A0B] p-5 text-white">
        <p className="text-[12.5px] font-semibold text-[#C9BFFF]">An academy on LMS Domain</p>
        <div className={cn("mt-4 p-3 text-[#18181B]", panel)}>
          <div className="flex items-center gap-2 text-[11.5px] text-[#71717A]">
            <Lock className="h-3 w-3 text-[#16A34A]" /> learn.youracademy.com
          </div>
          <div className="mt-2.5 space-y-1.5">
            {[
              { d: "Mon", t: "Live class · Batch B", i: Video, live: true },
              { d: "Wed", t: "Mock test 4", i: Check, live: false },
              { d: "Fri", t: "1:1 sessions", i: Users, live: false },
            ].map((r) => (
              <p key={r.d} className={cn("flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-[11.5px]", r.live ? "mo-glow bg-[#F4F5F8] font-semibold" : "bg-[#F8F8FA]")}>
                <span className="w-7 font-semibold text-[#9A9AA6]">{r.d}</span>
                <r.i className="h-3.5 w-3.5" />
                {r.t}
                {r.live && <span className="mo-ping ml-auto h-1.5 w-1.5 rounded-full bg-[#DC2626] text-[#DC2626]" />}
              </p>
            ))}
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-[13.5px] text-[#D4D4D8]">
          {["Built for teaching on a schedule", "Your own domain and brand", "0% commission"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#6C4BFF]">
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const PRINCIPLES = [
  {
    n: "01",
    t: "Teaching comes first",
    b: "We design for batches, live classes and tests, the way academies actually teach, not just for selling videos.",
  },
  {
    n: "02",
    t: "Your academy, your brand",
    b: "Every academy runs on its own domain, with its own name and colours. Your learners know you, not us.",
  },
  {
    n: "03",
    t: "Fair, simple pricing",
    b: "A flat monthly plan and 0% commission. When your academy grows, your earnings grow with it.",
  },
  {
    n: "04",
    t: "We set it up with you",
    b: "Real people help you move courses, connect your domain and payments, and train your team.",
    icon: HeartHandshake,
  },
];
