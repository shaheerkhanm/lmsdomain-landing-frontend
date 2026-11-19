import React from "react";
import Image from "next/image";
import { Bell, BookOpen, ChevronDown, ChevronRight, ClipboardCheck, Heart, Home, Search, User, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";
import { NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { Phone, StatusBar } from "@/components/sections/mobile/AppScreens";
import { AppleIcon, GooglePlayIcon } from "@/components/sections/mobile/StoreIcons";

/*
 * Mobile apps hero, after a classic app case-study layout:
 * soft lavender stage, a huge faint word behind, one tilted phone with a full home screen,
 * glassy teacher cards floating on each side, small tool tiles top left, two plan pills at the bottom.
 * Sample academy "Northwind Academy" and its people are made up.
 */

const IMG = {
  python: "/assets/img/home/features/course_preview.jpg",
  data: "/assets/img/home/features/learner_laptop.jpg",
  web: "/images/solutions/solo-educators-2.webp",
  english: "/images/solutions/solo-educators-3.webp",
  batch: "/images/solutions/coaching-institutes-3.webp",
  sara: "/assets/img/home/features/participant_mia.jpg",
  daniel: "/assets/img/home/testimonials/author-4.jpg",
  ravi: "/assets/img/home/testimonials/author-1.jpg",
};

const TEAL = "#0F766E";

function Pic({ src, className, sizes = "120px" }: { src: string; className?: string; sizes?: string }) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </span>
  );
}

function HomeScreen() {
  return (
    <div className="absolute inset-0 bg-[#F7F8FB]">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1">
        <span className="flex items-center gap-1.5">
          <span className="overflow-hidden rounded-[7px]"><NorthwindMark size={22} /></span>
          <span className="leading-none">
            <span className="block text-[11px] font-bold text-[#0B1B3F]">Northwind</span>
            <span className="block text-[7px] font-medium uppercase tracking-[0.12em] text-[#0F766E]">Academy</span>
          </span>
        </span>
        <span className="flex items-center gap-2 text-[8.5px] font-semibold text-[#0B1B3F]">
          English <ChevronDown className="-ml-1.5 h-2.5 w-2.5" />
          <Bell className="h-3.5 w-3.5 text-[#52525B]" />
        </span>
      </div>
      <div className="mx-3.5 mt-2.5 flex items-center gap-1.5 rounded-[10px] bg-white px-2.5 py-1.5 text-[8.5px] text-[#9A9AA6] ring-1 ring-[#ECECF1]">
        <Search className="h-3 w-3" /> Search courses and lessons
      </div>

      <div className="mt-2.5 flex gap-1.5 overflow-hidden pl-3.5">
        {[
          ["Python", IMG.python],
          ["Data", IMG.data],
          ["Web", IMG.web],
          ["English", IMG.english],
        ].map(([t, src]) => (
          <span key={t} className="relative h-[58px] w-[60px] shrink-0 overflow-hidden rounded-[10px] bg-white ring-1 ring-[#ECECF1]">
            <Pic src={src} className="absolute inset-0" sizes="70px" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-white">{t}</span>
          </span>
        ))}
      </div>

      <div className="mx-3.5 mt-2 grid grid-cols-2 gap-1.5">
        {[
          { t: "Join live class", s: "Today, 7:00 PM", I: Video },
          { t: "Practice test", s: "Functions · 10 Qs", I: ClipboardCheck },
        ].map(({ t, s, I }) => (
          <div key={t} className="rounded-[10px] bg-white p-2 ring-1 ring-[#ECECF1]">
            <p className="text-[9px] font-semibold leading-tight text-[#0B1B3F]">{t}</p>
            <p className="text-[7.5px] text-[#9A9AA6]">{s}</p>
            <div className="mt-1.5 flex items-center justify-between">
              <I className="h-3.5 w-3.5 text-[#52525B]" strokeWidth={1.8} />
              <span className="grid h-4 w-4 place-items-center rounded-full text-white" style={{ background: TEAL }}><ChevronRight className="h-2.5 w-2.5" /></span>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-3.5 mt-2.5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#0B1B3F]">New batches</span>
        <span className="text-[7.5px] text-[#9A9AA6]">See all</span>
      </div>
      <div className="relative mx-3.5 mt-1.5 h-[62px] overflow-hidden rounded-[11px] bg-[#E6F4F1]">
        <Pic src={IMG.batch} className="absolute inset-y-0 right-0 w-[52%] [mask-image:linear-gradient(90deg,transparent,#000_30%)]" sizes="140px" />
        <div className="relative p-2">
          <p className="max-w-[56%] text-[9px] font-bold leading-tight text-[#0B3B37]">Data Analysis bootcamp</p>
          <span className="mt-1.5 inline-block rounded-full bg-white px-1.5 py-0.5 text-[7px] font-semibold text-[#0F766E]">Starts 1 Dec</span>
        </div>
      </div>

      <div className="mx-3.5 mt-2.5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#0B1B3F]">Your classes</span>
        <span className="text-[7.5px] text-[#9A9AA6]">See all</span>
      </div>
      <div className="mx-3.5 mt-1.5 flex items-center gap-2 rounded-[11px] bg-white p-2 ring-1 ring-[#ECECF1]">
        <Pic src={IMG.sara} className="h-9 w-9 rounded-[8px] [&_img]:object-top" sizes="40px" />
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[9px] font-semibold text-[#0B1B3F]">Sara Iyer</span>
          <span className="block text-[7.5px] text-[#9A9AA6]">Python mentor</span>
          <span className="mt-1 flex gap-1">
            <span className="rounded-[4px] bg-[#FEF3C7] px-1 text-[7px] font-semibold text-[#92400E]">Today</span>
            <span className="rounded-[4px] bg-[#F1F1F4] px-1 text-[7px] font-semibold text-[#52525B]">7:00 PM</span>
          </span>
        </span>
        <ChevronRight className="h-3 w-3 text-[#0B1B3F]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#ECECF1] bg-white px-2 pb-4 pt-1.5">
        {[
          { I: Home, t: "Home" },
          { I: BookOpen, t: "Courses" },
          { I: Video, t: "Live" },
          { I: ClipboardCheck, t: "Tests" },
          { I: User, t: "Profile" },
        ].map(({ I, t }, i) => (
          <span key={t} className="flex flex-col items-center gap-0.5" style={{ color: i === 0 ? TEAL : "#A1A1AA" }}>
            <I className="h-[14px] w-[14px]" strokeWidth={i === 0 ? 2.4 : 1.8} />
            <span className="text-[7px] font-semibold">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TeacherCard({ photo, name, role, chip, chipTone, note, className }: { photo: string; name: string; role: string; chip: string; chipTone: "green" | "amber"; note: string; className?: string }) {
  return (
    <div className={cn("w-[250px] rounded-[16px] bg-white/80 p-3 shadow-[0_24px_50px_-24px_rgba(60,50,160,0.45)] ring-1 ring-white backdrop-blur-md", className)}>
      <div className="flex gap-2.5">
        <Pic src={photo} className="h-12 w-12 shrink-0 rounded-[10px] [&_img]:object-top" sizes="52px" />
        <span className="min-w-0 flex-1 leading-tight">
          <span className="flex items-start justify-between">
            <span className="text-[12.5px] font-semibold text-[#0B1B3F]">{name}</span>
            <Heart className="h-3.5 w-3.5 text-[#F43F5E]" fill="currentColor" />
          </span>
          <span className="block text-[11px] text-[#71717A]">{role}</span>
          <span className="mt-1.5 flex items-center justify-between">
            <span className={cn("rounded-[5px] px-1.5 py-0.5 text-[10px] font-semibold", chipTone === "green" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEF3C7] text-[#92400E]")}>{chip}</span>
            <span className="text-[10.5px] font-semibold text-[#0B1B3F]">{note}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

export function HeroShowcase() {
  return (
    <div className="rv-v4 relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#EFEEFF_0%,#D9DBFF_55%,#A9B1FF_100%)] sm:rounded-[40px]">
      {/* huge faint word */}
      <p aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-2 select-none text-center font-urbanist text-[clamp(72px,15vw,210px)] font-semibold leading-none tracking-[-0.05em] text-white/55">
        Northwind
      </p>

      {/* tool tiles */}
      <div aria-hidden="true" className="absolute left-6 top-24 hidden gap-2.5 sm:flex lg:left-12 lg:top-[150px]">
        {[<GooglePlayIcon key="g" size={24} />, <AppleIcon key="a" size={22} />, <LmsDomainMark key="l" size={26} />].map((el, i) => (
          <span key={i} className="mo-float grid h-12 w-12 place-items-center rounded-[13px] bg-white/85 shadow-[0_10px_24px_-14px_rgba(60,50,160,0.5)] ring-1 ring-white backdrop-blur" style={{ "--fd": `${i * -1.4}s` } as React.CSSProperties}>
            {el}
          </span>
        ))}
      </div>

      {/* phone + floating cards */}
      <div aria-hidden="true" className="relative mx-auto h-[490px] max-w-[980px] sm:h-[620px]">
        <div className="absolute left-1/2 top-[54px] -translate-x-1/2 sm:top-[70px]">
          <div className="mo-float" style={{ "--fd": "-2s" } as React.CSSProperties}>
            <div className="origin-top scale-[0.82] sm:scale-100">
              <div style={{ transform: "perspective(1800px) rotateX(10deg) rotateY(-12deg) rotateZ(9deg)" }} className="drop-shadow-[0_50px_60px_rgba(40,30,120,0.35)]">
                <Phone>
                  <HomeScreen />
                </Phone>
              </div>
            </div>
          </div>
        </div>

        <TeacherCard
          className="mp-bob absolute left-2 top-[300px] z-10 hidden md:block lg:left-[40px]"
          photo={IMG.daniel}
          name="Daniel Reyes"
          role="Data mentor · 8 years"
          chip="Live today"
          chipTone="green"
          note="Batch B"
        />

        <div className="absolute right-2 top-[150px] z-10 hidden md:block lg:right-[30px]">
          <div className="relative">
            <span className="absolute inset-x-3 -bottom-4 h-full rounded-[16px] bg-white/45 ring-1 ring-white/70" />
            <span className="absolute inset-x-1.5 -bottom-2 h-full rounded-[16px] bg-white/60 ring-1 ring-white/80" />
            <TeacherCard className="mp-bob relative" photo={IMG.ravi} name="Ravi Menon" role="English coach · 11 years" chip="Free tomorrow" chipTone="amber" note="1:1 session" />
          </div>
        </div>
      </div>

      {/* plan pills */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 pb-5 sm:absolute sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-end sm:justify-between sm:px-0 sm:pb-0">
        {[
          { t: "LMS Domain app", s: "Every plan" },
          { t: "Your own branded app", s: "Pro and up" },
        ].map((p) => (
          <span key={p.t} className="rounded-full bg-white/55 px-4 py-2 text-[13.5px] text-[#0B1B3F] ring-1 ring-white/80 backdrop-blur-md sm:px-5 sm:py-2.5 sm:text-[15px]">
            <span className="font-semibold">{p.t}</span> <span className="text-[#4B4F7A]">· {p.s}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
