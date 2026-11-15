"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CoachingDemo } from "../SolutionsV5/coaching/CoachingDemo";
import { LanguageDemo } from "../SolutionsV5/language/LanguageDemo";
import { TrainingDemo } from "../SolutionsV5/training/TrainingDemo";
import { SoloDemo } from "../SolutionsV5/solo/SoloDemo";

export type ShowcaseAcademy = {
  key: "coaching" | "language" | "training" | "solo";
  name: string;
  href: string;
  body: string;
  points: string[];
  stat: { v: string; l: string };
  person: { name: string; role: string; photo: string };
};

const DEMOS = { coaching: CoachingDemo, language: LanguageDemo, training: TrainingDemo, solo: SoloDemo };
const AUTO_MS = 14000;

/**
 * "Built for every kind of academy": pick a type and its real product demo plays in a large window,
 * with the academy's outcomes beside it and floating cards on the stage. Rotates until the visitor picks one.
 */
export function AcademyShowcase({ academies }: { academies: ShowcaseAcademy[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    if (!auto || reduced) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % academies.length), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, reduced, academies.length]);

  const a = academies[active];
  const Demo = DEMOS[a.key];

  return (
    <div>
      {/* Type picker */}
      <div className="flex justify-center">
        <div role="tablist" aria-label="Types of academy" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-[0_1px_2px_rgba(16,16,24,0.05),0_12px_30px_-16px_rgba(16,16,24,0.2)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {academies.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className={cn(
                  "relative shrink-0 cursor-pointer overflow-hidden whitespace-nowrap rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-300 sm:px-5",
                  on ? "bg-[#0A0A0B] text-white" : "text-[#52525B] hover:bg-[#F4F5F8] hover:text-[#0A0A0B]"
                )}
              >
                {x.name}
                {on && auto && !reduced && (
                  <span key={active} className="absolute inset-x-4 bottom-1 h-[2px] overflow-hidden rounded-full bg-white/20">
                    <span className="block h-full origin-left bg-white" style={{ animation: `sc-progress ${AUTO_MS}ms linear forwards` }} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage: live product demo, full width */}
      <div key={a.key} className="mo-swap mt-8 lg:mt-10">
        <div aria-hidden="true" className="relative rounded-[32px] bg-white p-3 sm:p-8 lg:px-14 lg:py-10">
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#E4E4E7_1px,transparent_1px)] bg-[size:16px_16px] opacity-70 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_45%,#000_100%)]" />
          <div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[18px] border border-[#ECECF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_30px_60px_-30px_rgba(16,16,24,0.35)]">
            <Demo />
          </div>
          {/* floating person + stat */}
          <div className="mo-float absolute -bottom-6 right-6 hidden lg:block xl:right-10" style={{ "--fd": "-2s" } as React.CSSProperties}>
            <div className="flex w-[270px] rotate-[2deg] items-center gap-3 rounded-[16px] border border-[#ECECF1] bg-white p-3 shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_48px_-20px_rgba(16,16,24,0.3)]">
              <Image src={a.person.photo} alt="" width={88} height={88} className="h-10 w-10 rounded-full object-cover object-top" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-[#18181B]">{a.person.name}</p>
                <p className="truncate text-[11px] text-[#71717A]">{a.person.role}</p>
              </div>
              <div className="text-right">
                <p className="font-urbanist text-[18px] font-semibold leading-none">{a.stat.v}</p>
                <p className="mt-1 text-[10px] text-[#9A9AA6]">{a.stat.l}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About this academy */}
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[1fr_1.1fr_auto] lg:items-center lg:gap-12">
          <div>
            <p className="text-[13px] font-semibold text-[#6C4BFF]">
              {String(active + 1).padStart(2, "0")} / {String(academies.length).padStart(2, "0")}
            </p>
            <h3 className="mt-1.5 font-urbanist text-[clamp(26px,2.8vw,34px)] font-semibold leading-[1.1] tracking-[-0.03em]">{a.name}</h3>
            <p className="mt-2 text-[15.5px] leading-[1.6] text-[#52525B]">{a.body}</p>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {a.points.map((p, i) => (
              <li key={p} style={{ animationDelay: `${150 + i * 90}ms` }} className="mo-swap flex items-start gap-2.5 text-[14.5px] text-[#27272A]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link
            href={a.href}
            className="group inline-flex h-11 w-fit items-center gap-2 whitespace-nowrap rounded-full bg-[#0A0A0B] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#27272A]"
          >
            Explore {a.name.toLowerCase()}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
