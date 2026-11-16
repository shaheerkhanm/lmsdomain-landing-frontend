"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Check, Lock, PlayCircle, Video } from "lucide-react";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";

const BRAND = "#6C4BFF";

/** Academy home page shown on the laptop. Sample data. */
function LaptopScreen() {
  return (
    <div className="h-full w-full overflow-hidden bg-white sm:[zoom:1.25] lg:[zoom:1.55]">
      <div className="flex items-center gap-1.5 border-b border-[#F1F1F4] px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex items-center gap-1 rounded-[5px] bg-[#F4F4F5] px-2 py-0.5 text-[8px] text-[#52525B]">
          <Lock className="h-2 w-2 text-[#16A34A]" /> learn.apexacademy.com
        </span>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1.5">
          <LmsDomainMark size={20} />
          <span className="text-[10px] font-semibold text-[#18181B]">Apex Academy</span>
        </div>
        <div className="flex gap-3 text-[8px] text-[#71717A]">
          <span>Courses</span>
          <span>Batches</span>
          <span>Blog</span>
        </div>
      </div>
      <div className="mx-4 grid grid-cols-[1.3fr_1fr] gap-3 rounded-[10px] p-4" style={{ background: BRAND }}>
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-wide text-white/70">New batches open</p>
          <p className="mt-0.5 font-urbanist text-[16px] font-semibold leading-tight text-white">Learn data skills with live mentors</p>
          <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-1 text-[8px] font-semibold" style={{ color: BRAND }}>
            Enrol now
          </span>
        </div>
        <div className="relative overflow-hidden rounded-[8px]">
          <Image src="/images/features/cohort-workshop.webp" alt="" fill sizes="200px" className="object-cover" />
        </div>
      </div>
      <div className="mx-4 my-3 grid grid-cols-3 gap-2">
        {[
          ["/images/solutions/language-test-prep-1.webp", "Python basics"],
          ["/images/features/live-class-screen.webp", "Spoken English"],
          ["/images/solutions/coaching-institutes-1.webp", "Maths, Grade 10"],
        ].map(([src, t]) => (
          <div key={t} className="overflow-hidden rounded-[7px] border border-[#F1F1F4]">
            <div className="relative h-10">
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </div>
            <p className="px-1.5 py-1 text-[7.5px] font-medium text-[#27272A]">{t}</p>
          </div>
        ))}
      </div>
      <div className="mx-4 flex items-center gap-2 rounded-[8px] bg-[#F8F8FA] px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
        <span className="flex-1 text-[7.5px] font-medium text-[#27272A]">Live today · Loops in practice · 18:00</span>
        <span className="rounded-full px-2 py-0.5 text-[7px] font-semibold text-white" style={{ background: BRAND }}>
          Join
        </span>
      </div>
    </div>
  );
}

function TabletScreen() {
  return (
    <div className="h-full w-full overflow-hidden bg-[#16141F] p-2">
      <div className="grid h-[70%] grid-cols-2 gap-1">
        {["/assets/img/home/participant_mia.jpg", "/assets/img/home/participant_alex.jpg", "/assets/img/home/testimonials/author-1.jpg", "/assets/img/home/testimonials/author-2.jpg"].map((f, i) => (
          <div key={f} className="relative overflow-hidden rounded-[5px]">
            <Image src={f} alt="" fill sizes="100px" className="object-cover object-top" />
            {i === 0 && <span className="absolute inset-0 rounded-[5px] ring-2 ring-inset ring-[#4ADE80]" />}
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between px-0.5">
        <span className="flex items-center gap-1 rounded-full bg-[#DC2626] px-1.5 py-0.5 text-[7px] font-semibold text-white">
          <span className="h-1 w-1 rounded-full bg-white" /> Live
        </span>
        <span className="flex items-center gap-1 text-[7px] text-white/80">
          <Video className="h-2 w-2" /> 23 joined
        </span>
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="h-full w-full overflow-hidden bg-white">
      <div className="flex items-center gap-1 px-2 pb-1.5 pt-3">
        <LmsDomainMark size={16} />
        <span className="text-[7.5px] font-semibold text-[#18181B]">Apex Academy</span>
      </div>
      <div className="mx-2 rounded-[7px] p-2" style={{ background: BRAND }}>
        <p className="text-[6.5px] text-white/75">Continue learning</p>
        <p className="text-[8px] font-semibold text-white">Lesson 3 · Loops</p>
        <div className="mt-1 h-0.5 rounded-full bg-white/30">
          <div className="h-full w-[60%] rounded-full bg-white" />
        </div>
      </div>
      <div className="space-y-1 p-2">
        {["Variables", "Loops", "Functions", "Quiz"].map((t, i) => (
          <p key={t} className="flex items-center gap-1 rounded-[5px] bg-[#F8F8FA] px-1.5 py-1 text-[7px] text-[#27272A]">
            {i < 2 ? <Check className="h-2 w-2 text-[#16A34A]" strokeWidth={3} /> : <PlayCircle className="h-2 w-2 text-[#B4B4BE]" />} {t}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * Tilted 3D stack (laptop, tablet, phone) that straightens and turns as the visitor scrolls.
 * Static tilt for reduced motion.
 */
export function Devices3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const st = stage.current;
    if (!el || !st) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the stage enters the screen, 1 when it is well past the top
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height * 0.6)));
      const rx = 26 - p * 22; // tilt back → nearly flat
      const ry = -16 + p * 24; // turn left → slightly right
      const s = 0.9 + p * 0.12;
      st.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" className="relative mx-auto w-full max-w-[1100px] [perspective:2200px]">
      <div
        ref={stage}
        className="relative mx-auto aspect-[16/10] w-[78%] transition-transform duration-150 ease-out [transform-style:preserve-3d]"
        style={{ transform: "rotateX(18deg) rotateY(-8deg) scale(0.95)" }}
      >
        {/* Laptop */}
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          <div className="absolute inset-x-0 top-0 h-[92%] rounded-[16px] border-[10px] border-[#1C1A26] bg-[#1C1A26] shadow-[0_60px_120px_-40px_rgba(16,16,24,0.55)] sm:border-[14px] sm:rounded-[22px]">
            <div className="h-full w-full overflow-hidden rounded-[6px]">
              <LaptopScreen />
            </div>
          </div>
          <div className="absolute -inset-x-[6%] bottom-0 h-[8%] rounded-b-[18px] rounded-t-[4px] bg-gradient-to-b from-[#D4D4D8] to-[#A1A1AA] shadow-[0_30px_40px_-20px_rgba(16,16,24,0.5)] [transform:rotateX(70deg)] [transform-origin:top]" />
        </div>

        {/* Tablet, behind on the left */}
        <div className="absolute -left-[16%] top-[18%] w-[34%] [transform:translateZ(-80px)_rotateY(14deg)]">
          <div className="aspect-[4/3] rounded-[14px] border-[7px] border-[#1C1A26] bg-[#1C1A26] shadow-[0_40px_80px_-30px_rgba(16,16,24,0.6)]">
            <div className="h-full w-full overflow-hidden rounded-[6px]">
              <TabletScreen />
            </div>
          </div>
        </div>

        {/* Phone, in front on the right */}
        <div className="absolute -right-[10%] top-[34%] w-[17%] [transform:translateZ(120px)_rotateY(-10deg)]">
          <div className="aspect-[9/19] rounded-[18px] border-[5px] border-[#1C1A26] bg-[#1C1A26] shadow-[0_40px_80px_-24px_rgba(16,16,24,0.65)]">
            <div className="h-full w-full overflow-hidden rounded-[12px]">
              <PhoneScreen />
            </div>
          </div>
        </div>
      </div>
      {/* floor shadow */}
      <div className="mx-auto -mt-6 h-10 w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(16,16,24,0.25),transparent)] blur-md" />
    </div>
  );
}
