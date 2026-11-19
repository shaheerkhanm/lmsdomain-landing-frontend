import React from "react";
import Image from "next/image";
import {
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Flame,
  Hand,
  Heart,
  Home,
  Lock,
  MessageCircle,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Pause,
  PhoneOff,
  Search,
  User,
  Users,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrightpathMark, EmberMark, GreenleafMark, LingoLoftMark, NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { BrandMark, LmsDomainMark } from "@/components/brand/PartnerMarks";

/*
 * Realistic app screens for the mobile app showcases (homepage, /platform/mobile-app).
 * Each is a different made-up academy's own app, drawn like a real product screen:
 * white surfaces, the academy colour only as an accent, real photos, tab bars.
 * Screens are 234px wide (inside a 248px phone).
 */

export const PHOTO = {
  instructor: "/assets/img/home/features/instructor_lesson.jpg",
  teacher: "/assets/img/home/features/participant_alex.jpg",
  learner: "/assets/img/home/features/participant_mia.jpg",
  guitar: "/images/solutions/solo-educators-1.webp",
  classroom: "/images/solutions/coaching-institutes-1.webp",
  workshop: "/images/solutions/training-companies-2.webp",
  face: (n: number) => `/assets/img/home/testimonials/author-${n}.jpg`,
};

export function Phone({ dark = false, className, children }: { dark?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative w-[248px] rounded-[44px] bg-[#0A0A0B] p-[7px] shadow-[0_50px_80px_-40px_rgba(20,20,60,0.55),0_0_0_1px_rgba(10,10,11,0.08),inset_0_0_0_1.5px_rgba(255,255,255,0.14)]", className)}>
      <span className="absolute -left-[2px] top-[104px] h-8 w-[3px] rounded-l bg-[#2A2A30]" />
      <span className="absolute -right-[2px] top-[130px] h-12 w-[3px] rounded-r bg-[#2A2A30]" />
      <div className={cn("relative h-[506px] overflow-hidden rounded-[37px]", dark ? "bg-[#0B0B10]" : "bg-white")}>
        <div className="absolute left-1/2 top-2 z-40 h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-[#0A0A0B]" />
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "bg-white" : "bg-[#18181B]";
  return (
    <div className={cn("relative z-30 flex items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-semibold", light ? "text-white" : "text-[#18181B]")}>
      <span>9:41</span>
      <span className="flex items-center gap-0.5">
        <span className={cn("h-[7px] w-[3px] rounded-[1px]", c)} />
        <span className={cn("h-[8px] w-[3px] rounded-[1px]", c)} />
        <span className={cn("h-[9px] w-[3px] rounded-[1px]", c)} />
        <span className={cn("ml-1 h-[9px] w-[17px] rounded-[3px] border p-[1px]", light ? "border-white" : "border-[#18181B]")}>
          <span className={cn("block h-full w-[70%] rounded-[1px]", c)} />
        </span>
      </span>
    </div>
  );
}

function TabBar({ active, color, community = false }: { active: number; color: string; community?: boolean }) {
  const items = [
    { i: Home, t: "Home" },
    { i: BookOpen, t: "Courses" },
    { i: Video, t: "Live" },
    community ? { i: Users, t: "Community" } : { i: ClipboardCheck, t: "Tests" },
    { i: User, t: "Profile" },
  ];
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#F1F1F4] bg-white/95 px-2 pb-4 pt-1.5 backdrop-blur">
      {items.map(({ i: I, t }, k) => (
        <span key={t} className="flex flex-col items-center gap-0.5" style={{ color: k === active ? color : "#A1A1AA" }}>
          <I className="h-[15px] w-[15px]" strokeWidth={k === active ? 2.4 : 1.8} />
          <span className="text-[7.5px] font-semibold">{t}</span>
        </span>
      ))}
    </div>
  );
}

function Img({ src, className, sizes = "240px", alt = "" }: { src: string; className?: string; sizes?: string; alt?: string }) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </span>
  );
}

/* 1. Coaching institute: mock tests */
export function TestsScreen() {
  const blue = "#1D4ED8";
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1">
        <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#18181B]">
          <BrightpathMark size={18} /> Brightpath
        </span>
        <Bell className="h-3.5 w-3.5 text-[#52525B]" />
      </div>
      <p className="px-4 pt-3 text-[17px] font-bold tracking-[-0.01em] text-[#18181B]">Mock tests</p>
      <div className="mx-4 mt-2 grid grid-cols-2 rounded-[9px] bg-[#F4F4F5] p-0.5 text-center text-[9.5px] font-semibold">
        <span className="rounded-[7px] bg-white py-1 text-[#18181B] shadow-sm">Upcoming</span>
        <span className="py-1 text-[#71717A]">Completed</span>
      </div>
      <div className="mx-4 mt-3 rounded-[12px] border border-[#ECECEF] p-2.5">
        <div className="flex items-start justify-between">
          <span className="leading-tight">
            <span className="block text-[10.5px] font-semibold text-[#18181B]">JEE Main · Full test 5</span>
            <span className="block text-[9px] text-[#71717A]">90 questions · 3 hours</span>
          </span>
          <span className="rounded-[5px] bg-[#EFF6FF] px-1.5 py-0.5 text-[8px] font-semibold" style={{ color: blue }}>Today</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[9px] text-[#52525B]"><Clock className="h-3 w-3" /> 6:00 PM</span>
          <span className="rounded-[7px] px-3 py-1 text-[9.5px] font-semibold text-white" style={{ background: blue }}>Start</span>
        </div>
      </div>
      <p className="px-4 pb-1.5 pt-3.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Last result</p>
      <div className="mx-4 rounded-[12px] bg-[#F8FAFC] p-2.5">
        <div className="flex items-end justify-between">
          <span className="leading-none">
            <span className="block text-[9px] text-[#71717A]">Full test 4</span>
            <span className="mt-1 block text-[22px] font-bold tracking-[-0.02em] text-[#18181B]">86%</span>
          </span>
          <span className="text-right text-[9px] leading-tight text-[#52525B]">Rank <b className="text-[#18181B]">4</b> of 120<br />Top 4%</span>
        </div>
        {[
          ["Physics", 92],
          ["Chemistry", 84],
          ["Maths", 81],
        ].map(([s, v]) => (
          <div key={s} className="mt-1.5">
            <div className="flex justify-between text-[8.5px] text-[#52525B]"><span>{s}</span><span>{v}%</span></div>
            <div className="mt-0.5 h-1 rounded-full bg-[#E2E8F0]"><div className="h-full rounded-full" style={{ width: `${v}%`, background: blue }} /></div>
          </div>
        ))}
      </div>
      <TabBar active={3} color={blue} />
    </>
  );
}

/* 2. Language school: in a live class */
export function LiveCallScreen() {
  return (
    <div className="absolute inset-0 bg-[#0B0B10]">
      <Img src={PHOTO.instructor} className="absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 to-transparent" />
      <StatusBar light />
      <div className="relative flex items-center justify-between px-4 pt-1.5 text-white">
        <span className="flex items-center gap-1.5">
          <LingoLoftMark size={18} />
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold">Business English</span>
            <span className="block text-[8.5px] text-white/70">Batch B · Google Meet</span>
          </span>
        </span>
        <span className="flex items-center gap-1 rounded-full bg-[#EF4444] px-1.5 py-0.5 text-[8px] font-bold">
          <span className="mo-ping h-1 w-1 rounded-full bg-white" /> 24:15
        </span>
      </div>
      <div className="absolute right-3 top-[86px] w-[62px] overflow-hidden rounded-[10px] ring-2 ring-white/70">
        <Img src={PHOTO.face(2)} className="h-[84px] w-full" sizes="70px" />
      </div>
      <div className="absolute inset-x-3 bottom-[96px] rounded-[9px] bg-black/55 px-2.5 py-1.5 text-[9.5px] leading-snug text-white backdrop-blur">
        <span className="font-semibold text-white/70">Ms. Clara:</span> Now try it with &ldquo;had already&rdquo;.
      </div>
      <div className="absolute inset-x-3 bottom-[62px] flex items-center gap-1.5">
        {[1, 3, 4].map((n, i) => (
          <span key={n} className={cn("relative h-7 w-7 overflow-hidden rounded-full ring-2", i === 1 ? "ma-speak ring-[#22C55E]" : "ring-white/40")}>
            <Image src={PHOTO.face(n)} alt="" fill sizes="28px" className="object-cover" />
          </span>
        ))}
        <span className="text-[9px] font-medium text-white/80">+18 learners</span>
      </div>
      <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2.5">
        {[Mic, Video, Hand, MessageSquare].map((I, i) => (
          <span key={i} className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur"><I className="h-3.5 w-3.5" /></span>
        ))}
        <span className="grid h-8 w-10 place-items-center rounded-full bg-[#EF4444] text-white"><PhoneOff className="h-3.5 w-3.5" /></span>
      </div>
    </div>
  );
}

/* 3. Coding academy: protected lesson player */
export function LessonPlayerScreen() {
  const teal = "#0F766E";
  return (
    <>
      <StatusBar />
      <div className="flex items-center gap-1.5 px-4 pb-2 pt-1 text-[10.5px] font-semibold text-[#18181B]">
        <NorthwindMark size={18} /> Northwind Academy
      </div>
      <div className="relative mx-0 h-[132px] bg-black">
        <Img src={PHOTO.teacher} className="absolute inset-0 opacity-90" />
        <span className="ma-drift absolute left-4 top-[48px] -rotate-12 text-[9px] font-semibold text-white/40">mia.c@mail.com · ID 2041</span>
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-[5px] bg-black/50 px-1.5 py-0.5 text-[8px] font-semibold text-white backdrop-blur"><Lock className="h-2.5 w-2.5" /> DRM</span>
        <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur"><Pause className="h-3.5 w-3.5" fill="currentColor" /></span>
        <div className="absolute inset-x-2 bottom-1.5">
          <div className="h-[3px] rounded-full bg-white/30"><div className="ma-progress h-full w-[34%] rounded-full" style={{ background: "#5EEAD4" }} /></div>
          <div className="mt-1 flex justify-between text-[8px] font-medium text-white/85"><span>04:12</span><span>12:30</span></div>
        </div>
      </div>
      <div className="px-4 pt-2.5">
        <p className="text-[12.5px] font-bold leading-tight text-[#18181B]">Loops in Python</p>
        <p className="text-[9px] text-[#71717A]">Lesson 3 of 24 · Python for Beginners</p>
      </div>
      <div className="mt-2 flex gap-4 border-b border-[#F1F1F4] px-4 text-[9.5px] font-semibold">
        <span className="border-b-2 pb-1.5" style={{ borderColor: teal, color: teal }}>Lessons</span>
        <span className="pb-1.5 text-[#A1A1AA]">Notes</span>
        <span className="pb-1.5 text-[#A1A1AA]">Q&amp;A</span>
      </div>
      <div className="px-3 pt-1">
        {[
          ["Variables", "8:40", "done"],
          ["Loops", "12:30", "now"],
          ["Functions", "14:05", ""],
          ["Lists and dictionaries", "16:20", ""],
          ["Practice test 1", "10 Qs", ""],
        ].map(([t, m, st], i) => (
          <div key={t} className={cn("flex items-center gap-2 rounded-[8px] px-1.5 py-[7px]", st === "now" && "bg-[#F0FDFA]")}>
            <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full text-[8.5px] font-bold", st === "done" ? "bg-[#DCFCE7] text-[#15803D]" : st === "now" ? "text-white" : "bg-[#F4F4F5] text-[#71717A]")} style={st === "now" ? { background: teal } : undefined}>
              {st === "done" ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
            </span>
            <span className={cn("flex-1 truncate text-[10px]", st === "now" ? "font-semibold text-[#18181B]" : "text-[#3F3F46]")}>{t}</span>
            {st === "now" ? (
              <span className="flex h-[9px] items-end gap-[2px]">
                {[0, 1, 2].map((b) => (
                  <span key={b} className="mo-eq w-[2px] rounded-full" style={{ height: 8, background: teal, animationDelay: `${b * 0.15}s` }} />
                ))}
              </span>
            ) : (
              <span className="text-[8.5px] text-[#A1A1AA]">{m}</span>
            )}
          </div>
        ))}
      </div>
      <TabBar active={1} color={teal} />
    </>
  );
}

/* 4. Music school: home */
export function MusicHomeScreen() {
  const green = "#15803D";
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1">
        <span className="flex items-center gap-2">
          <span className="relative h-7 w-7 overflow-hidden rounded-full"><Image src={PHOTO.learner} alt="" fill sizes="28px" className="object-cover object-top" /></span>
          <span className="leading-tight">
            <span className="block text-[8.5px] text-[#71717A]">Good evening</span>
            <span className="block text-[11px] font-bold text-[#18181B]">Riya</span>
          </span>
        </span>
        <span className="flex items-center gap-2 text-[#52525B]"><Search className="h-3.5 w-3.5" /><Bell className="h-3.5 w-3.5" /></span>
      </div>
      <div className="mx-4 mt-3 flex items-center gap-2 rounded-[10px] bg-[#FFF7ED] px-2.5 py-1.5">
        <Flame className="h-3.5 w-3.5 text-[#EA580C]" fill="#FDBA74" />
        <span className="text-[9.5px] font-semibold text-[#9A3412]">5-day practice streak</span>
        <span className="ml-auto flex gap-[3px]">
          {[1, 1, 1, 1, 1, 0, 0].map((on, i) => (
            <span key={i} className={cn("h-1.5 w-1.5 rounded-full", on ? "bg-[#F97316]" : "bg-[#FED7AA]")} />
          ))}
        </span>
      </div>
      <p className="px-4 pb-1.5 pt-3 text-[11px] font-bold text-[#18181B]">Continue learning</p>
      <div className="mx-4 overflow-hidden rounded-[12px] border border-[#ECECEF]">
        <Img src={PHOTO.guitar} className="h-[78px]" />
        <div className="p-2">
          <p className="flex items-center justify-between text-[10px] font-semibold text-[#18181B]">Guitar basics <span className="flex items-center gap-1 text-[8.5px] font-medium text-[#71717A]"><GreenleafMark size={12} /> Greenleaf</span></p>
          <p className="text-[8.5px] text-[#71717A]">Lesson 5 · Strumming patterns</p>
          <div className="mt-1.5 h-1 rounded-full bg-[#F1F1F4]"><div className="h-full w-[60%] rounded-full" style={{ background: green }} /></div>
        </div>
      </div>
      <p className="px-4 pb-1.5 pt-3 text-[11px] font-bold text-[#18181B]">Today</p>
      <div className="mx-4 flex items-center gap-2 rounded-[10px] border border-[#ECECEF] px-2.5 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#F0FDF4] text-[8px] font-bold leading-none" style={{ color: green }}>7:00<br />PM</span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[10px] font-semibold text-[#18181B]">Live: chords and rhythm</span>
          <span className="block text-[8.5px] text-[#71717A]">Google Meet · 12 joined</span>
        </span>
        <span className="rounded-[6px] px-2 py-1 text-[8.5px] font-semibold text-white" style={{ background: green }}>Join</span>
      </div>
      <TabBar active={0} color={green} />
    </>
  );
}

/* 5. Yoga school: community feed */
export function CommunityScreen() {
  const orange = "#EA580C";
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1">
        <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#18181B]"><EmberMark size={18} /> Ember Yoga</span>
        <MoreHorizontal className="h-3.5 w-3.5 text-[#52525B]" />
      </div>
      <p className="px-4 pt-3 text-[17px] font-bold tracking-[-0.01em] text-[#18181B]">Community</p>
      <div className="flex gap-1.5 px-4 pt-2 text-[9px] font-semibold">
        <span className="rounded-full bg-[#18181B] px-2.5 py-1 text-white">All posts</span>
        <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[#52525B]">Questions</span>
        <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[#52525B]">Wins</span>
      </div>
      <div className="mx-4 mt-3 rounded-[12px] border border-[#ECECEF] p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="relative h-6 w-6 overflow-hidden rounded-full"><Image src={PHOTO.face(5)} alt="" fill sizes="24px" className="object-cover" /></span>
          <span className="leading-tight">
            <span className="block text-[9.5px] font-semibold text-[#18181B]">Meera K.</span>
            <span className="block text-[8px] text-[#A1A1AA]">Teacher training · 2h</span>
          </span>
        </div>
        <p className="pt-1.5 text-[9.5px] leading-[1.4] text-[#3F3F46]">Day 21 done. Our morning group session today was the best one yet.</p>
        <Img src={PHOTO.workshop} className="mt-1.5 h-[72px] rounded-[8px]" />
        <div className="mt-1.5 flex items-center gap-3 text-[8.5px] text-[#71717A]">
          <span className="flex items-center gap-1" style={{ color: orange }}><Heart className="h-3 w-3" fill="currentColor" /> 24</span>
          <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> 6 replies</span>
        </div>
      </div>
      <div className="mx-4 mt-2 rounded-[12px] border border-[#ECECEF] p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="relative h-6 w-6 overflow-hidden rounded-full"><Image src={PHOTO.face(3)} alt="" fill sizes="24px" className="object-cover" /></span>
          <span className="text-[9.5px] font-semibold text-[#18181B]">Ravi P. <span className="font-normal text-[#A1A1AA]">· 4h</span></span>
        </div>
        <p className="pt-1 text-[9.5px] leading-[1.4] text-[#3F3F46]">Notes from today&apos;s breathing class are in the course.</p>
      </div>
      <TabBar active={3} color={orange} community />
    </>
  );
}

/* Small helper used by cards: a WhatsApp-style notification */
export function WhatsAppBanner({ title, body, className }: { title: string; body: string; className?: string }) {
  return (
    <div className={cn("flex items-start gap-2 rounded-[14px] bg-white/95 p-2.5 shadow-[0_14px_30px_-12px_rgba(10,10,40,0.35)] ring-1 ring-black/5 backdrop-blur", className)}>
      <BrandMark name="WhatsApp" size={22} />
      <span className="min-w-0 flex-1 leading-tight">
        <span className="flex justify-between text-[9px] font-semibold text-[#18181B]">WhatsApp <span className="font-normal text-[#A1A1AA]">now</span></span>
        <span className="block text-[10.5px] font-semibold text-[#18181B]">{title}</span>
        <span className="block text-[9px] text-[#71717A]">{body}</span>
      </span>
    </div>
  );
}

/* ---------- Hero-only screens (the feature cards use the ones above, so nothing repeats) ---------- */

/* Coaching institute: this week's timetable */
export function ScheduleScreen() {
  const blue = "#1D4ED8";
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const rows: [string, string, string, string, boolean?][] = [
    ["7:00", "Physics · Rotational motion", "Live · Zoom", "#EFF6FF", true],
    ["9:30", "Chemistry doubt session", "Live · Google Meet", "#F0FDF4"],
    ["6:00", "Full test 5", "3 hours · 90 questions", "#FFF7ED"],
    ["8:00", "Maths · Recorded lesson 14", "Video · 42 min", "#F5F3FF"],
  ];
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1">
        <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#18181B]"><BrightpathMark size={18} /> Brightpath</span>
        <Bell className="h-3.5 w-3.5 text-[#52525B]" />
      </div>
      <p className="px-4 pt-3 text-[17px] font-bold tracking-[-0.01em] text-[#18181B]">This week</p>
      <p className="px-4 text-[9px] text-[#71717A]">JEE Main 2027 · Batch A</p>
      <div className="mx-4 mt-2.5 grid grid-cols-7 gap-1 text-center">
        {days.map((d, i) => (
          <span key={i} className={cn("rounded-[8px] py-1 leading-tight", i === 2 ? "text-white" : "text-[#52525B]")} style={i === 2 ? { background: blue } : undefined}>
            <span className="block text-[7.5px] opacity-70">{d}</span>
            <span className="block text-[10px] font-semibold">{17 + i}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-1.5 px-4">
        {rows.map(([t, title, sub, bg, live]) => (
          <div key={title} className="flex items-stretch gap-2">
            <span className="w-7 pt-1 text-[8.5px] font-semibold text-[#71717A]">{t}</span>
            <span className="flex-1 rounded-[10px] px-2.5 py-1.5" style={{ background: bg }}>
              <span className="flex items-center justify-between text-[10px] font-semibold text-[#18181B]">
                {title}
                {live && <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />}
              </span>
              <span className="block text-[8.5px] text-[#71717A]">{sub}</span>
            </span>
          </div>
        ))}
      </div>
      <TabBar active={0} color={blue} />
    </>
  );
}

/* Language school: a certificate earned in the app */
export function CertificateScreen() {
  const purple = "#6D28D9";
  return (
    <>
      <StatusBar />
      <div className="flex items-center gap-1.5 px-4 pt-1 text-[10.5px] font-semibold text-[#18181B]"><LingoLoftMark size={18} /> Lingo Loft</div>
      <p className="px-4 pt-3 text-[17px] font-bold tracking-[-0.01em] text-[#18181B]">Well done, Aisha!</p>
      <p className="px-4 text-[9px] text-[#71717A]">You finished Business English · Level 2</p>
      <div className="mx-4 mt-3 rounded-[12px] border border-[#E9E3FF] bg-[linear-gradient(160deg,#FFFFFF,#F7F5FF)] p-3 text-center shadow-[0_10px_24px_-16px_rgba(109,40,217,0.5)]">
        <span className="mx-auto block w-fit"><LingoLoftMark size={26} /></span>
        <p className="mt-1.5 text-[7.5px] font-semibold uppercase tracking-[0.18em] text-[#A78BFA]">Certificate of completion</p>
        <p className="mt-1.5 font-serif text-[15px] font-bold text-[#18181B]">Aisha Rahman</p>
        <p className="text-[8.5px] text-[#71717A]">Business English · Level 2</p>
        <div className="mx-auto mt-2 h-px w-24 bg-[#E9E3FF]" />
        <p className="mt-1.5 text-[7.5px] text-[#A1A1AA]">Issued 18 Nov 2026 · Lingo Loft</p>
      </div>
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2 text-[9.5px] font-semibold">
        <span className="rounded-[9px] py-2 text-center text-white" style={{ background: purple }}>Download PDF</span>
        <span className="rounded-[9px] border border-[#E4E4E7] py-2 text-center text-[#18181B]">Share</span>
      </div>
      <p className="px-4 pb-1.5 pt-3.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Next course</p>
      <div className="mx-4 flex items-center gap-2 rounded-[10px] border border-[#ECECEF] p-1.5">
        <Img src="/images/solutions/language-test-prep-2.webp" className="h-9 w-12 rounded-[7px]" sizes="60px" />
        <span className="leading-tight">
          <span className="block text-[10px] font-semibold text-[#18181B]">Business English · Level 3</span>
          <span className="block text-[8.5px] text-[#71717A]">12 lessons · live on Fridays</span>
        </span>
      </div>
      <TabBar active={1} color={purple} />
    </>
  );
}

/* Coding academy: course overview with progress.
 * variant "branded" = the academy's own app (Northwind colours and name);
 * variant "lmsdomain" = the same course opened inside the LMS Domain app. */
export function CourseScreen({ variant = "branded" }: { variant?: "branded" | "lmsdomain" }) {
  const branded = variant === "branded";
  const accent = branded ? "#0F766E" : "#0A0A0B";
  return (
    <>
      {branded ? (
        <div className="relative h-[178px]">
          <Img src="/assets/img/home/features/course_preview.jpg" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
          <StatusBar light />
          <div className="relative flex items-center gap-1.5 px-4 pt-1 text-[10.5px] font-semibold text-white"><NorthwindMark size={18} /> Northwind Academy</div>
          <div className="absolute inset-x-4 bottom-3 text-white">
            <p className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-[#5EEAD4]">Course</p>
            <p className="text-[16px] font-bold leading-tight">Python for Beginners</p>
            <p className="text-[8.5px] text-white/75">24 lessons · 6 tests · certificate</p>
          </div>
        </div>
      ) : (
        <>
          <StatusBar />
          <div className="flex items-center justify-between px-4 pt-1">
            <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#18181B]"><LmsDomainMark size={18} /> LMS Domain</span>
            <span className="flex items-center gap-1 rounded-full bg-[#F4F4F5] py-0.5 pl-0.5 pr-2 text-[8.5px] font-semibold text-[#18181B]">
              <span className="overflow-hidden rounded-full"><NorthwindMark size={14} /></span> Northwind <ChevronDown className="h-2.5 w-2.5 text-[#71717A]" />
            </span>
          </div>
          <div className="mx-4 mt-2.5 overflow-hidden rounded-[12px]">
            <Img src="/assets/img/home/features/course_preview.jpg" className="h-[104px]" />
          </div>
          <div className="px-4 pt-2">
            <p className="text-[14px] font-bold leading-tight text-[#18181B]">Python for Beginners</p>
            <p className="text-[8.5px] text-[#71717A]">Northwind Academy · 24 lessons · 6 tests</p>
          </div>
        </>
      )}
      <div className="flex items-center gap-3 px-4 pt-3">
        <span className="relative grid h-11 w-11 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F1F1F4" strokeWidth="3.4" />
            <circle cx="18" cy="18" r="15.5" fill="none" stroke={accent} strokeWidth="3.4" strokeLinecap="round" pathLength={100} strokeDasharray="46 100" />
          </svg>
          <span className="text-[10px] font-bold text-[#18181B]">46%</span>
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-semibold text-[#18181B]">11 of 24 lessons done</span>
          <span className="block text-[9px] text-[#71717A]">Next: Functions · 14 min</span>
        </span>
      </div>
      <div className="mx-4 mt-3 rounded-[10px] py-2 text-center text-[10.5px] font-semibold text-white" style={{ background: accent }}>Continue learning</div>
      <p className="px-4 pb-1 pt-3.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">Modules</p>
      <div className="px-4">
        {[
          ["1", "Getting started", "6 lessons", "done"],
          ["2", "Control flow", "8 lessons", "now"],
          ["3", "Functions and data", "10 lessons", ""],
        ].map(([n, t, m, st]) => (
          <div key={t} className="flex items-center gap-2 border-b border-[#F4F4F5] py-1.5 last:border-0">
            <span
              className={cn("grid h-5 w-5 place-items-center rounded-[6px] text-[8.5px] font-bold", st === "done" ? "bg-[#DCFCE7] text-[#15803D]" : st === "now" ? (branded ? "bg-[#CCFBF1] text-[#0F766E]" : "bg-[#E4E4E7] text-[#18181B]") : "bg-[#F4F4F5] text-[#A1A1AA]")}
            >
              {st === "done" ? <Check className="h-3 w-3" strokeWidth={3} /> : n}
            </span>
            <span className="flex-1 text-[10px] font-medium text-[#18181B]">{t}</span>
            <span className="text-[8.5px] text-[#A1A1AA]">{m}</span>
          </div>
        ))}
      </div>
      <TabBar active={1} color={accent} />
    </>
  );
}

/* Yoga school: browse courses */
export function CatalogueScreen() {
  const orange = "#EA580C";
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-1">
        <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#18181B]"><EmberMark size={18} /> Ember Yoga</span>
        <Search className="h-3.5 w-3.5 text-[#52525B]" />
      </div>
      <p className="px-4 pt-3 text-[17px] font-bold tracking-[-0.01em] text-[#18181B]">Explore courses</p>
      <div className="flex gap-1.5 px-4 pt-2 text-[9px] font-semibold">
        <span className="rounded-full px-2.5 py-1 text-white" style={{ background: orange }}>All</span>
        <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[#52525B]">Beginner</span>
        <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[#52525B]">Teacher training</span>
      </div>
      <div className="mx-4 mt-3 overflow-hidden rounded-[12px] border border-[#ECECEF]">
        <Img src="/assets/img/home/features/learner_laptop.jpg" className="h-[84px]" />
        <div className="p-2">
          <p className="text-[10.5px] font-semibold text-[#18181B]">200-hour teacher training</p>
          <p className="text-[8.5px] text-[#71717A]">Live cohort · starts 1 Dec · 32 lessons</p>
        </div>
      </div>
      <div className="mx-4 mt-2 flex items-center gap-2 rounded-[12px] border border-[#ECECEF] p-1.5">
        <Img src="/images/solutions/coaching-institutes-2.webp" className="h-11 w-14 rounded-[8px]" sizes="70px" />
        <span className="leading-tight">
          <span className="block text-[10px] font-semibold text-[#18181B]">Morning flow for beginners</span>
          <span className="block text-[8.5px] text-[#71717A]">Self-paced · 14 lessons</span>
        </span>
      </div>
      <TabBar active={1} color={orange} community />
    </>
  );
}
