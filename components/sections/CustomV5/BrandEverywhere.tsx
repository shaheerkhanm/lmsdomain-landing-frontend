"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Award, Check, Lock, Mail, PlayCircle } from "lucide-react";
import { useBrandPreview } from "@/components/marketing/custom-plan";
import { cn } from "@/lib/utils";

const DEFAULT_COLOURS = ["#6C4BFF", "#2563EB", "#059669", "#D97706", "#DC2626", "#0D9488"];
const NAMES = ["Apex Academy", "Northwind Institute", "Bright Minds"];

function initials(n: string) {
  const p = (n || "YA").trim().split(/\s+/);
  return (p.length === 1 ? p[0].slice(0, 2) : p[0][0] + (p[1]?.[0] || "")).toUpperCase();
}
function slug(n: string) {
  return (n || "youracademy").toLowerCase().replace(/[^a-z0-9]+/g, "") || "youracademy";
}

/**
 * Interactive "your brand everywhere": type a name, pick a colour, and the website, phone view,
 * certificate and email all update. Auto-plays (types names, cycles colours) until the visitor interacts.
 */
export function BrandEverywhere({ colours = DEFAULT_COLOURS, nameLabel, colourLabel }: { colours?: string[]; nameLabel?: string; colourLabel?: string }) {
  const { brandName, brandColor, setBrandName, setBrandColor } = useBrandPreview();
  const [touched, setTouched] = useState(false);
  const touchedRef = useRef(false);
  const list = colours.length ? colours : DEFAULT_COLOURS;
  const name = brandName || "Your Academy";
  const ini = useMemo(() => initials(name), [name]);
  const domain = `learn.${slug(name)}.com`;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBrandName(NAMES[0]);
      return;
    }
    let alive = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const run = async () => {
      await sleep(700);
      let k = 0;
      while (alive && !touchedRef.current) {
        const n = NAMES[k % NAMES.length];
        setBrandName("");
        for (let i = 1; i <= n.length && alive && !touchedRef.current; i++) {
          setBrandName(n.slice(0, i));
          await sleep(65);
        }
        for (let c = 0; c < 2 && alive && !touchedRef.current; c++) {
          await sleep(1300);
          setBrandColor(list[(k * 2 + c + 1) % list.length]);
        }
        await sleep(1600);
        k++;
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [list, setBrandColor, setBrandName]);

  const touch = () => {
    touchedRef.current = true;
    setTouched(true);
  };

  return (
    <div className="relative">
      {/* Controls */}
      <div className="mx-auto flex max-w-[640px] flex-col gap-3 rounded-[20px] border border-white/10 bg-white/[0.06] p-3 backdrop-blur sm:flex-row sm:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5">
          <span className="sr-only">{nameLabel || "Your academy name"}</span>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-[#9A9AA6]">Name</span>
          <input
            value={brandName}
            onChange={(e) => {
              touch();
              setBrandName(e.target.value.slice(0, 28));
            }}
            onFocus={touch}
            placeholder="Your Academy"
            className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-[#0A0A0B] outline-none placeholder:text-[#B4B4BE]"
          />
          {!touched && <span className="mo-caret h-[1.1em] w-[1.5px] bg-[#0A0A0B]" aria-hidden="true" />}
        </label>
        <div className="flex items-center gap-2 px-1" role="radiogroup" aria-label={colourLabel || "Pick your colour"}>
          {list.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={brandColor === c}
              aria-label={`Colour ${c}`}
              onClick={() => {
                touch();
                setBrandColor(c);
              }}
              className={cn("grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-transform hover:scale-110", brandColor === c && "ring-2 ring-white ring-offset-2 ring-offset-[#0B0A12]")}
              style={{ background: c }}
            >
              {brandColor === c && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      {/* Surfaces */}
      <div aria-hidden="true" className="relative mx-auto mt-10 max-w-[1040px] pb-10 sm:pb-16">
        {/* Website */}
        <div className="relative mx-auto w-full max-w-[760px] overflow-hidden rounded-[18px] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 inline-flex min-w-0 items-center gap-1.5 truncate rounded-[7px] bg-[#F4F4F5] px-2.5 py-0.5 text-[11.5px] text-[#52525B]">
              <Lock className="h-3 w-3 shrink-0 text-[#16A34A]" /> {domain}
            </span>
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] text-[11px] font-bold text-white transition-colors duration-500" style={{ background: brandColor }}>
                {ini}
              </span>
              <p className="truncate text-[14px] font-semibold text-[#18181B]">{name}</p>
            </div>
            <div className="hidden gap-4 text-[12px] text-[#71717A] sm:flex">
              <span>Courses</span>
              <span>Batches</span>
              <span>Blog</span>
            </div>
          </div>
          <div className="mx-5 grid gap-4 rounded-[14px] p-5 transition-colors duration-500 sm:grid-cols-[1.4fr_1fr] sm:p-7" style={{ background: brandColor }}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">New batches open</p>
              <p className="mt-1 font-urbanist text-[22px] font-semibold leading-tight text-white sm:text-[28px]">Learn with {name}</p>
              <span className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-[12px] font-semibold transition-colors duration-500" style={{ color: brandColor }}>
                Enrol now
              </span>
            </div>
            <div className="hidden space-y-2 sm:block">
              {["Live classes every week", "Certificates on completion", "Learn on any device"].map((t) => (
                <p key={t} className="flex items-center gap-2 rounded-[10px] bg-white/15 px-3 py-2 text-[12px] font-medium text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} /> {t}
                </p>
              ))}
            </div>
          </div>
          <div className="mx-5 my-4 grid grid-cols-3 gap-2.5">
            {["Python basics", "Spoken English", "Data skills"].map((t) => (
              <div key={t} className="overflow-hidden rounded-[10px] border border-[#F1F1F4]">
                <span className="block h-12 opacity-20 transition-colors duration-500" style={{ background: brandColor }} />
                <p className="px-2 py-1.5 text-[11px] font-medium text-[#27272A]">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div className="mo-float absolute -left-2 bottom-0 hidden w-[170px] md:block lg:left-0" style={{ "--fd": "0s" } as React.CSSProperties}>
          <div className="-rotate-[5deg] overflow-hidden rounded-[28px] border-[6px] border-[#1C1A26] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-1.5 px-3 pb-2 pt-3">
              <span className="grid h-5 w-5 place-items-center rounded-[6px] text-[8px] font-bold text-white transition-colors duration-500" style={{ background: brandColor }}>
                {ini}
              </span>
              <p className="truncate text-[10px] font-semibold text-[#18181B]">{name}</p>
            </div>
            <div className="mx-2.5 rounded-[10px] p-2.5 transition-colors duration-500" style={{ background: brandColor }}>
              <p className="text-[9px] text-white/75">Continue learning</p>
              <p className="text-[11px] font-semibold text-white">Lesson 3 · Loops</p>
              <div className="mt-1.5 h-1 rounded-full bg-white/30">
                <div className="h-full w-[60%] rounded-full bg-white" />
              </div>
            </div>
            <div className="space-y-1.5 p-2.5">
              {["Variables", "Loops", "Functions"].map((t, i) => (
                <p key={t} className="flex items-center gap-1.5 rounded-[7px] bg-[#F8F8FA] px-2 py-1.5 text-[9.5px] text-[#27272A]">
                  <PlayCircle className="h-3 w-3 transition-colors duration-500" style={{ color: i < 2 ? brandColor : "#B4B4BE" }} /> {t}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate */}
        <div className="mo-float absolute -right-2 top-10 hidden w-[230px] md:block lg:right-0" style={{ "--fd": "-2s" } as React.CSSProperties}>
          <div className="rotate-[4deg] rounded-[14px] bg-white p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="rounded-[10px] border-2 px-4 py-4 text-center transition-colors duration-500" style={{ borderColor: brandColor }}>
              <Award className="mx-auto h-5 w-5 transition-colors duration-500" style={{ color: brandColor }} />
              <p className="mt-1.5 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#9A9AA6]">Certificate of completion</p>
              <p className="mt-1 font-urbanist text-[15px] font-semibold text-[#18181B]">Priya Sharma</p>
              <p className="truncate text-[10px] text-[#71717A]">{name}</p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mo-float absolute -bottom-2 right-6 hidden w-[250px] md:block lg:right-16" style={{ "--fd": "-4s" } as React.CSSProperties}>
          <div className="-rotate-[2deg] overflow-hidden rounded-[14px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2 border-b border-[#F1F1F4] px-3 py-2">
              <Mail className="h-3.5 w-3.5 text-[#71717A]" />
              <p className="truncate text-[10.5px] text-[#52525B]">Welcome email · your branding</p>
            </div>
            <div className="h-1.5 transition-colors duration-500" style={{ background: brandColor }} />
            <div className="p-3">
              <p className="text-[12px] font-semibold text-[#18181B]">Welcome to {name}!</p>
              <p className="mt-0.5 text-[10.5px] text-[#71717A]">Your first class starts on Monday.</p>
              <span className="mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold text-white transition-colors duration-500" style={{ background: brandColor }}>
                Open my course
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
