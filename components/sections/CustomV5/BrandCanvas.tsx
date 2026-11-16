"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Award, Check, Lock, Mail, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";

const BRANDS = [
  { c: "#6C4BFF", soft: "#F1EDFF", n: "Violet" },
  { c: "#0F766E", soft: "#E6F4F1", n: "Teal" },
  { c: "#C2410C", soft: "#FFF1E8", n: "Orange" },
  { c: "#1D4ED8", soft: "#E8EEFF", n: "Blue" },
  { c: "#0A0A0B", soft: "#F4F4F5", n: "Black" },
];
const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";
const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.06),0_40px_80px_-30px_rgba(16,16,24,0.35)]";

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("absolute z-20 hidden items-center gap-1.5 rounded-full bg-[#0A0A0B] px-3 py-1.5 text-[12px] font-semibold text-white lg:inline-flex", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
      {children}
    </span>
  );
}

/**
 * "Your brand. Everywhere." Light section with a large collage of branded surfaces.
 * Picking a colour (or the auto cycle) restyles every surface at once.
 */
export function BrandCanvas() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const b = BRANDS[i];

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % BRANDS.length), 2800);
    return () => window.clearInterval(t);
  }, [auto]);

  const tx = "transition-colors duration-700";

  return (
    <section className="bg-white py-[clamp(80px,11vw,150px)]">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)]">
        <div className="rv-v4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#6C4BFF]">Branding</p>
            <h2 className={cn("mt-5 text-[clamp(48px,8vw,120px)]", BIG)}>
              Your brand.
              <br />
              <span className="text-[#C4C4CC]">Everywhere.</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-[18px] leading-[1.55] text-[#52525B]">
              One brand across your website, learner app, login, certificates and emails. Pick a colour and watch it change.
            </p>
          </div>
          {/* colour picker */}
          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-[13px] font-medium text-[#71717A]">Try a brand colour</p>
            <div role="radiogroup" aria-label="Brand colour" className="flex gap-2 rounded-full border border-[#ECECF1] bg-white p-1.5 shadow-[0_8px_24px_-14px_rgba(16,16,24,0.25)]">
              {BRANDS.map((x, k) => (
                <button
                  key={x.c}
                  type="button"
                  role="radio"
                  aria-checked={k === i}
                  aria-label={x.n}
                  onClick={() => {
                    setI(k);
                    setAuto(false);
                  }}
                  className={cn("grid h-10 w-10 cursor-pointer place-items-center rounded-full transition-transform hover:scale-110", k === i && "ring-2 ring-offset-2")}
                  style={{ background: x.c, ["--tw-ring-color" as string]: x.c }}
                >
                  {k === i && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div aria-hidden="true" className={cn("rv-v4 relative mt-12 overflow-hidden rounded-[40px] px-4 pb-10 pt-10 sm:px-10 lg:mt-16 lg:h-[680px] lg:p-0", tx)} style={{ background: b.soft }}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(10,10,11,0.07)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent_85%)]" />

          {/* Website (centre) */}
          <div className={cn("relative z-10 mx-auto w-full max-w-[640px] overflow-hidden rounded-[18px] bg-white lg:absolute lg:left-1/2 lg:top-[90px] lg:w-[600px] lg:-translate-x-1/2", shadow)}>
            <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 flex items-center gap-1 rounded-[6px] bg-[#F4F4F5] px-2.5 py-0.5 text-[11px] text-[#52525B]">
                <Lock className="h-3 w-3 text-[#16A34A]" /> learn.apexacademy.com
              </span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-2">
                <LmsDomainMark size={28} />
                <span className="text-[14px] font-semibold text-[#18181B]">Apex Academy</span>
              </div>
              <div className="hidden gap-4 text-[12px] text-[#71717A] sm:flex">
                <span>Courses</span>
                <span>Batches</span>
                <span>Blog</span>
              </div>
            </div>
            <div className={cn("mx-5 grid gap-4 rounded-[14px] p-5 sm:grid-cols-[1.3fr_1fr]", tx)} style={{ background: b.c }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">New batches open</p>
                <p className="mt-1 font-urbanist text-[24px] font-semibold leading-tight text-white">Learn data skills with live mentors</p>
                <span className={cn("mt-4 inline-block rounded-full bg-white px-4 py-2 text-[12px] font-semibold", tx)} style={{ color: b.c }}>
                  Enrol now
                </span>
              </div>
              <div className="relative hidden h-[120px] overflow-hidden rounded-[10px] sm:block">
                <Image src="/images/features/cohort-workshop.webp" alt="" fill sizes="220px" className="object-cover" />
              </div>
            </div>
            <div className="mx-5 my-4 grid grid-cols-3 gap-2.5">
              {[
                ["/images/solutions/language-test-prep-1.webp", "Python basics"],
                ["/images/features/live-class-screen.webp", "Spoken English"],
                ["/images/solutions/coaching-institutes-1.webp", "Maths"],
              ].map(([src, t]) => (
                <div key={t} className="overflow-hidden rounded-[10px] border border-[#F1F1F4]">
                  <div className="relative h-14">
                    <Image src={src} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                  <p className="flex items-center justify-between px-2 py-1.5 text-[11px] font-medium text-[#27272A]">
                    {t}
                    <span className={cn("h-1.5 w-1.5 rounded-full", tx)} style={{ background: b.c }} />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Tag className="left-1/2 top-[52px] -translate-x-1/2">Website</Tag>

          {/* Phone (left front) */}
          <div className="relative z-20 mx-auto mt-8 w-[200px] lg:absolute lg:bottom-[48px] lg:left-[70px] lg:mt-0 lg:w-[210px]">
            <div className={cn("-rotate-[4deg] overflow-hidden rounded-[32px] border-[7px] border-[#1C1A26] bg-white", shadow)}>
              <div className="flex items-center gap-1.5 px-3.5 pb-2 pt-4">
                <LmsDomainMark size={24} />
                <span className="text-[11px] font-semibold text-[#18181B]">Apex Academy</span>
              </div>
              <div className={cn("mx-3 rounded-[12px] p-3", tx)} style={{ background: b.c }}>
                <p className="text-[9.5px] text-white/75">Continue learning</p>
                <p className="text-[12.5px] font-semibold text-white">Lesson 3 · Loops</p>
                <div className="mt-2 h-1 rounded-full bg-white/30">
                  <div className="h-full w-[60%] rounded-full bg-white" />
                </div>
              </div>
              <div className="space-y-1.5 p-3">
                {["Variables", "Loops", "Functions", "Checkpoint quiz"].map((t, k) => (
                  <p key={t} className="flex items-center gap-2 rounded-[8px] bg-[#F8F8FA] px-2 py-1.5 text-[10.5px] text-[#27272A]">
                    <PlayCircle className={cn("h-3.5 w-3.5", tx)} style={{ color: k < 2 ? b.c : "#B4B4BE" }} /> {t}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <Tag className="bottom-[360px] left-[70px]">Learner app</Tag>

          {/* Login (left top) */}
          <div className={cn("absolute left-[60px] top-[80px] z-0 hidden w-[230px] rotate-[-3deg] rounded-[18px] bg-white p-4 xl:block", shadow)}>
            <div className="flex items-center gap-2">
              <LmsDomainMark size={28} />
              <p className="text-[13px] font-semibold">Sign in to Apex</p>
            </div>
            <span className="mt-3 block h-8 rounded-[8px] border border-[#ECECF1]" />
            <span className="mt-2 block h-8 rounded-[8px] border border-[#ECECF1]" />
            <span className={cn("mt-3 block rounded-full py-2 text-center text-[11px] font-semibold text-white", tx)} style={{ background: b.c }}>
              Sign in
            </span>
          </div>
          <Tag className="left-[60px] top-[44px] hidden xl:inline-flex">Login</Tag>

          {/* Certificate (right top) */}
          <div className="relative z-20 mx-auto mt-8 w-[280px] lg:absolute lg:right-[60px] lg:top-[80px] lg:mt-0">
            <div className={cn("rotate-[3deg] rounded-[16px] bg-white p-2", shadow)}>
              <div className={cn("rounded-[12px] border-2 px-5 py-5 text-center", tx)} style={{ borderColor: b.c }}>
                <Award className={cn("mx-auto h-6 w-6", tx)} style={{ color: b.c }} />
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A9AA6]">Certificate of completion</p>
                <p className="mt-1.5 font-urbanist text-[22px] font-semibold text-[#18181B]">Priya Sharma</p>
                <p className="text-[11.5px] text-[#71717A]">Data Analysis Bootcamp</p>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <LmsDomainMark size={20} />
                  <span className="text-[11px] font-semibold text-[#18181B]">Apex Academy</span>
                </div>
              </div>
            </div>
          </div>
          <Tag className="right-[60px] top-[44px]">Certificate</Tag>

          {/* Email (right bottom) */}
          <div className="relative z-20 mx-auto mt-8 w-[300px] lg:absolute lg:bottom-[56px] lg:right-[80px] lg:mt-0">
            <div className={cn("-rotate-[2deg] overflow-hidden rounded-[16px] bg-white", shadow)}>
              <p className="flex items-center gap-1.5 border-b border-[#F1F1F4] px-4 py-2.5 text-[11px] text-[#71717A]">
                <Mail className="h-3.5 w-3.5" /> Welcome email
              </p>
              <div className={cn("h-1.5", tx)} style={{ background: b.c }} />
              <div className="p-4">
                <p className="text-[14px] font-semibold text-[#18181B]">Welcome to Apex Academy!</p>
                <p className="mt-1 text-[12px] leading-[1.5] text-[#71717A]">Your first live class is on Monday at 18:00.</p>
                <span className={cn("mt-3 inline-block rounded-full px-3 py-1.5 text-[11px] font-semibold text-white", tx)} style={{ background: b.c }}>
                  Open my course
                </span>
              </div>
            </div>
          </div>
          <Tag className="bottom-[250px] right-[80px]">Email</Tag>
        </div>
      </div>
    </section>
  );
}
