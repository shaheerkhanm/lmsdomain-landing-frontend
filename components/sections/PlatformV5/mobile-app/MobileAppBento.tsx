import React from "react";
import Image from "next/image";
import { BadgeCheck, CalendarDays, Camera, Check, ChevronLeft, ClipboardCheck, Clock3, Heart, Languages, Lock, Mail, MapPin, MessageCircle, Music2, Phone as PhoneIcon, Settings, ShieldCheck, Smartphone, StickyNote, Trophy, Users, Video, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark, LmsDomainMark, type BrandName } from "@/components/brand/PartnerMarks";
import { BrightpathMark, EmberMark, GreenleafMark, LingoLoftMark, NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { PLATFORM_CARDS, type PlatformCard } from "@/content/platform/cards";
import { AppleIcon, GooglePlayIcon } from "@/components/sections/mobile/StoreIcons";
import {
  CommunityScreen,
  LessonPlayerScreen,
  LiveCallScreen,
  PHOTO,
  Phone,
  StatusBar,
  TestsScreen,
  WhatsAppBanner,
} from "@/components/sections/mobile/AppScreens";

/*
 * /platform/mobile-app feature cards, modelled on a real app's marketing cards:
 * big white cards on a soft sky backdrop, a dotted grid, an icon and a bold title,
 * and a realistic phone cropped by the card edge, with floating app bubbles and sheets.
 * Every card has one small looping animation (CSS, off for reduced motion; see globals "mp-").
 * Sample data only; claims and plans match content/platform/mobile-app.ts.
 */

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_18px_40px_-18px_rgba(16,16,24,0.25)]";

/* ---------- shells ---------- */
function MCard({
  icon,
  title,
  body,
  plan,
  wide = false,
  visualClass,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  plan?: string;
  wide?: boolean;
  visualClass?: string;
  children: React.ReactNode;
}) {
  const head = (
    <>
      <div className="flex items-center gap-2.5 text-[#0B1B3F]">
        {icon}
        {plan && <span className="text-[12.5px] font-medium text-[#71717A]">{plan}</span>}
      </div>
      <h3 className={cn("mt-4 font-urbanist font-semibold tracking-[-0.025em] text-[#0B1B3F] [text-wrap:balance]", wide ? "text-[clamp(26px,2.6vw,34px)] leading-[1.08]" : "text-[24px] leading-[1.12]")}>{title}</h3>
    </>
  );
  return (
    <div className={cn("rv-v4 relative overflow-hidden rounded-[32px] bg-white ring-1 ring-black/[0.04]", wide && "lg:col-span-2")}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(#DADDE6_1px,transparent_1.3px)] bg-[size:15px_15px] opacity-60" />
      {wide ? (
        <div className="relative grid md:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col p-7 sm:p-9">
            {head}
            <p className="mt-4 max-w-[400px] text-[15.5px] leading-[1.6] text-[#52525B] md:mt-auto md:pt-16">{body}</p>
          </div>
          <div aria-hidden="true" className={cn("relative h-[380px] sm:h-[420px]", visualClass)}>{children}</div>
        </div>
      ) : (
        <div className="relative">
          <div className="p-7 pb-0 sm:p-9 sm:pb-0">
            {head}
            <p className="mt-2.5 max-w-[440px] text-[15px] leading-[1.6] text-[#52525B]">{body}</p>
          </div>
          <div aria-hidden="true" className={cn("relative mt-6 h-[330px]", visualClass)}>{children}</div>
        </div>
      )}
    </div>
  );
}

/** A phone pinned to the top of the visual and cut off by the card's bottom edge */
function CroppedPhone({ top = 0, dark = false, children, over }: { top?: number; dark?: boolean; children: React.ReactNode; over?: React.ReactNode }) {
  return (
    <div className="absolute left-1/2 w-[248px] -translate-x-1/2" style={{ top }}>
      <Phone dark={dark}>{children}</Phone>
      {over}
    </div>
  );
}

/** Round app bubble with a small tail, like a map pin */
function Bubble({ className, delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return (
    <div className={cn("mp-bob absolute z-20", className)} style={{ animationDelay: `${delay}s` }}>
      <div className={cn("relative grid h-[58px] w-[58px] place-items-center rounded-full bg-white ring-1 ring-black/[0.05]", shadow)}>
        {children}
        <span className="absolute -bottom-[5px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-white" />
      </div>
    </div>
  );
}

/* ---------- 1. The LMS Domain app ---------- */
function LmsAppScreen() {
  return (
    <>
      <StatusBar />
      <div className="flex items-center gap-1.5 px-4 pt-1 text-[11px] font-semibold text-[#18181B]">
        <LmsDomainMark size={18} /> LMS Domain
      </div>
      <p className="px-4 pt-3 text-[17px] font-bold tracking-[-0.01em] text-[#18181B]">My academies</p>
      <div className="px-3 pt-2">
        {[
          { n: "Northwind Academy", s: "Python for Beginners · 46%", m: <NorthwindMark size={34} /> },
          { n: "Lingo Loft", s: "Business English · live today", m: <LingoLoftMark size={34} /> },
          { n: "Brightpath Coaching", s: "JEE Main · test 5 today", m: <BrightpathMark size={34} /> },
        ].map((a, i) => (
          <div key={a.n} className={cn("flex items-center gap-2.5 rounded-[12px] px-2 py-2", i === 0 && "bg-[#F4F5F8]")}>
            <span className="overflow-hidden rounded-[10px]">{a.m}</span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[11px] font-semibold text-[#18181B]">{a.n}</span>
              <span className="block truncate text-[9px] text-[#71717A]">{a.s}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function LmsAppArt() {
  return (
    <>
      <CroppedPhone
        top={36}
        over={
          <div className={cn("mp-sheet absolute left-1/2 top-[210px] z-30 w-[300px] -translate-x-1/2 rounded-[18px] bg-white p-3.5 ring-1 ring-black/[0.06]", shadow)}>
            <div className="flex items-center gap-2.5 border-b border-[#F1F1F4] pb-2.5">
              <span className="overflow-hidden rounded-[9px]"><NorthwindMark size={30} /></span>
              <span className="leading-tight">
                <span className="block text-[12.5px] font-semibold text-[#18181B]">Join Northwind Academy</span>
                <span className="block text-[10.5px] text-[#71717A]">Invite code <span className="rounded-[5px] bg-[#F4F5F8] px-1.5 py-0.5 font-mono text-[#18181B]">NW-2041</span></span>
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2 text-[12px] font-semibold">
              <span className="rounded-[10px] border border-[#ECECEF] py-2 text-center text-[#52525B]">Not now</span>
              <span className="flex items-center justify-center gap-1 rounded-[10px] bg-[#EEF2FF] py-2 text-[#3B5BDB]"><Check className="h-3.5 w-3.5" strokeWidth={3} /> Join</span>
            </div>
          </div>
        }
      >
        <LmsAppScreen />
      </CroppedPhone>
      <Bubble className="left-[calc(50%-196px)] top-[150px]"><GooglePlayIcon /></Bubble>
      <Bubble className="left-[calc(50%+140px)] top-[118px]" delay={1.2}><AppleIcon /></Bubble>
    </>
  );
}

/* ---------- 2. Your own branded app: home screen install ---------- */
function HomeScreenArt() {
  const icons: ({ g: LucideIcon; bg: string; t: string } | { brand: true } | { m: typeof BrightpathMark; t: string })[] = [
    { g: CalendarDays, bg: "linear-gradient(160deg,#FFFFFF,#F1F1F4)", t: "Calendar" },
    { g: Camera, bg: "linear-gradient(160deg,#6B7280,#374151)", t: "Camera" },
    { g: Mail, bg: "linear-gradient(160deg,#60A5FA,#2563EB)", t: "Mail" },
    { g: Music2, bg: "linear-gradient(160deg,#FB7185,#E11D48)", t: "Music" },
    { g: MapPin, bg: "linear-gradient(160deg,#4ADE80,#16A34A)", t: "Maps" },
    { brand: true },
    { g: StickyNote, bg: "linear-gradient(160deg,#FDE68A,#F59E0B)", t: "Notes" },
    { g: Settings, bg: "linear-gradient(160deg,#9CA3AF,#4B5563)", t: "Settings" },
    { m: BrightpathMark, t: "Brightpath" },
    { g: Clock3, bg: "linear-gradient(160deg,#27272A,#09090B)", t: "Clock" },
    { m: GreenleafMark, t: "Greenleaf" },
    { m: EmberMark, t: "Ember" },
  ];
  return (
    <>
      <CroppedPhone
        top={40}
        dark
        over={
          <>
            <div className={cn("mp-bob absolute -left-[118px] top-[96px] z-20 rounded-[14px] bg-white px-3 py-2 ring-1 ring-black/[0.05]", shadow)}>
              <p className="text-[10px] text-[#9A9AA6]">Your logo</p>
              <span className="mt-1 block overflow-hidden rounded-[8px]"><NorthwindMark size={30} /></span>
            </div>
            <div className={cn("mp-bob absolute -right-[112px] top-[60px] z-20 rounded-[14px] bg-white px-3 py-2 ring-1 ring-black/[0.05]", shadow)} style={{ animationDelay: "1.1s" }}>
              <p className="text-[10px] text-[#9A9AA6]">Your colours</p>
              <span className="mt-1.5 flex gap-1">
                {["#0F766E", "#14B8A6", "#F59E0B", "#0B3B37"].map((c) => (
                  <span key={c} className="h-4 w-4 rounded-full ring-1 ring-black/5" style={{ background: c }} />
                ))}
              </span>
            </div>
            <div className={cn("mp-bob absolute -right-[96px] top-[196px] z-20 rounded-[14px] bg-white px-3 py-2 ring-1 ring-black/[0.05]", shadow)} style={{ animationDelay: "2.2s" }}>
              <p className="text-[10px] text-[#9A9AA6]">Your name</p>
              <p className="text-[12px] font-semibold text-[#18181B]">Northwind Academy</p>
            </div>
          </>
        }
      >
        <div className="absolute inset-0 bg-[linear-gradient(170deg,#134E4A,#0B2F2C_55%,#081F1D)]" />
        <StatusBar light />
        <div className="relative grid grid-cols-4 gap-x-3 gap-y-4 px-5 pt-6">
          {icons.map((ic, i) => (
            <span key={i} className="flex flex-col items-center gap-1">
              {"brand" in ic ? (
                <span className="relative">
                  <span className="mp-pop block overflow-hidden rounded-[12px] shadow-[0_8px_18px_-8px_rgba(0,0,0,0.7)]"><NorthwindMark size={44} /></span>
                  <svg viewBox="0 0 36 36" className="mp-installwrap absolute inset-0 m-auto h-7 w-7 -rotate-90" aria-hidden="true">
                    <circle cx="18" cy="18" r="15" fill="rgba(0,0,0,0.45)" />
                    <circle cx="18" cy="18" r="12" fill="none" stroke="#fff" strokeWidth="3" pathLength={100} strokeDasharray="100" className="mp-install" />
                  </svg>
                </span>
              ) : "m" in ic ? (
                <span className="overflow-hidden rounded-[12px]"><ic.m size={44} /></span>
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-[12px]" style={{ background: ic.bg }}>
                  <ic.g className={cn("h-5 w-5", ic.t === "Calendar" ? "text-[#EF4444]" : "text-white")} strokeWidth={2} />
                </span>
              )}
              <span className={cn("text-[7.5px]", "brand" in ic ? "font-semibold text-white" : "text-white/75")}>{"brand" in ic ? "Northwind" : ic.t}</span>
            </span>
          ))}
        </div>
      </CroppedPhone>
    </>
  );
}

/* ---------- 3. Protected video ---------- */
function ProtectArt() {
  return (
    <>
      <CroppedPhone
        over={
          <>
            <div className="mp-blackout pointer-events-none absolute inset-[7px] z-20 rounded-[37px] bg-black" />
            <div className={cn("mp-toast absolute left-1/2 top-[150px] z-30 flex w-[230px] -translate-x-1/2 items-center gap-2 rounded-[14px] bg-white p-2.5 ring-1 ring-black/[0.06]", shadow)}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#DCFCE7] text-[#15803D]"><ShieldCheck className="h-4 w-4" /></span>
              <span className="leading-tight">
                <span className="block text-[12px] font-semibold text-[#18181B]">Screen recording blocked</span>
                <span className="block text-[10px] text-[#71717A]">This video is protected</span>
              </span>
            </div>
          </>
        }
      >
        <LessonPlayerScreen />
      </CroppedPhone>
      <Bubble className="left-[calc(50%-196px)] top-[28px]"><Lock className="h-6 w-6 text-[#0B1B3F]" /></Bubble>
    </>
  );
}

/* ---------- 4. Live classes ---------- */
function LiveArt() {
  const apps: { n: BrandName; cls: string; d: number }[] = [
    { n: "Zoom", cls: "left-[calc(50%-200px)] top-[176px]", d: 0 },
    { n: "Google Meet", cls: "left-[calc(50%+138px)] top-[30px]", d: 1 },
    { n: "Microsoft Teams", cls: "left-[calc(50%+148px)] top-[170px]", d: 2 },
  ];
  return (
    <>
      <CroppedPhone dark over={<WhatsAppBanner className="mp-drop absolute left-1/2 top-[40px] z-30 w-[262px] -translate-x-1/2" title="Class starts in 10 minutes" body="Business English · Tap to join" />}>
        <LiveCallScreen />
      </CroppedPhone>
      {apps.map((a) => (
        <Bubble key={a.n} className={a.cls} delay={a.d}><BrandMark name={a.n} size={30} /></Bubble>
      ))}
    </>
  );
}

/* ---------- 5. Tests ---------- */
function TestArt() {
  return (
    <>
      <CroppedPhone
        over={
          <div className={cn("mp-pop2 absolute -right-[70px] top-[150px] z-30 w-[190px] rounded-[16px] bg-white p-3 ring-1 ring-black/[0.06]", shadow)}>
            <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#71717A]"><Trophy className="h-3.5 w-3.5 text-[#D97706]" /> Result is out</p>
            <p className="mt-1 font-urbanist text-[28px] font-bold leading-none text-[#0B1B3F]">86%</p>
            <p className="mt-1 text-[11px] text-[#52525B]">Rank 4 of 120 · top 4%</p>
          </div>
        }
      >
        <TestsScreen />
      </CroppedPhone>
    </>
  );
}

/* ---------- 6. WhatsApp ---------- */
function WhatsAppArt() {
  const msgs = ["New test is live: Mock test 5. It closes Sunday, 9 PM.", "The recording of today's class is ready in your course.", "Reminder: homework is due tomorrow at 9 PM."];
  return (
    <CroppedPhone>
      <div className="absolute inset-0 bg-[#EFEAE2]" />
      <div className="relative bg-[#075E54] pb-2 text-white">
        <StatusBar light />
        <div className="flex items-center gap-2 px-3 pt-1">
          <ChevronLeft className="h-4 w-4" />
          <span className="overflow-hidden rounded-full"><NorthwindMark size={26} /></span>
          <span className="flex-1 leading-tight">
            <span className="block text-[11px] font-semibold">Northwind Academy</span>
            <span className="block text-[8.5px] text-white/70">Business account</span>
          </span>
          <PhoneIcon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="relative space-y-2 px-3 pt-3">
        <p className="mx-auto w-fit rounded-[6px] bg-white/80 px-2 py-0.5 text-[8.5px] text-[#52525B]">Today</p>
        {msgs.map((m, i) => (
          <div key={m} className="mp-msg max-w-[85%] rounded-[10px] rounded-tl-[3px] bg-white px-2.5 py-1.5 text-[10px] leading-[1.4] text-[#18181B] shadow-sm" style={{ animationDelay: `${i * 1.1}s` }}>
            {m}
            <span className="mt-0.5 block text-right text-[8px] text-[#9A9AA6]">7:0{i} PM</span>
          </div>
        ))}
        <div className="mp-typing flex w-fit gap-1 rounded-[10px] bg-white px-3 py-2 shadow-sm">
          {[0, 1, 2].map((d) => (
            <span key={d} className="mp-dot h-1.5 w-1.5 rounded-full bg-[#9A9AA6]" style={{ animationDelay: `${d * 0.15}s` }} />
          ))}
        </div>
      </div>
    </CroppedPhone>
  );
}

/* ---------- 7. Community ---------- */
function CommunityArt() {
  return (
    <CroppedPhone
      over={
        <>
          <span className="mp-heart absolute left-[52px] top-[236px] z-30 text-[#EA580C]"><Heart className="h-7 w-7" fill="currentColor" /></span>
          <div className={cn("mp-reply absolute -left-[58px] top-[268px] z-30 flex w-[210px] items-start gap-2 rounded-[14px] bg-white p-2.5 ring-1 ring-black/[0.06]", shadow)}>
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full"><Image src={PHOTO.face(2)} alt="" fill sizes="28px" className="object-cover" /></span>
            <span className="leading-tight">
              <span className="block text-[11px] font-semibold text-[#18181B]">Arjun replied</span>
              <span className="block text-[10.5px] text-[#52525B]">Well done! See you tomorrow.</span>
            </span>
          </div>
        </>
      }
    >
      <CommunityScreen />
    </CroppedPhone>
  );
}

/* ---------- 8. Any language ---------- */
const LANGS: { name: string; hello: string; sub: string; dir: "ltr" | "rtl" }[] = [
  { name: "English", hello: "Welcome back, Mia", sub: "Continue: Loops in Python", dir: "ltr" },
  { name: "हिन्दी", hello: "फिर से स्वागत है, मिया", sub: "जारी रखें: Python में लूप", dir: "ltr" },
  { name: "العربية", hello: "مرحبًا بعودتك، ميا", sub: "تابع: الحلقات في بايثون", dir: "rtl" },
  { name: "Español", hello: "Hola de nuevo, Mia", sub: "Continúa: Bucles en Python", dir: "ltr" },
];

function LanguageArt() {
  return (
    <CroppedPhone>
      <StatusBar />
      <div className="flex items-center gap-1.5 px-4 pt-1 text-[10.5px] font-semibold text-[#18181B]"><NorthwindMark size={18} /> Northwind Academy</div>
      <div className="relative mx-4 mt-3 h-[58px] overflow-hidden rounded-[12px] bg-[#F0FDFA] px-3 py-2.5">
        {LANGS.map((l, i) => (
          <div key={l.name} dir={l.dir} className={cn("mp-lang absolute inset-x-3 top-2.5", i === 0 && "mp-lang-first")} style={{ animationDelay: `${i * 2 - 8}s` }}>
            <p className="text-[13px] font-bold text-[#0B3B37]">{l.hello}</p>
            <p className="text-[9.5px] text-[#0F766E]">{l.sub}</p>
          </div>
        ))}
      </div>
      <p className="px-4 pb-1 pt-3.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#A1A1AA]">App language</p>
      <div className="mx-4 rounded-[12px] border border-[#ECECEF]">
        {LANGS.map((l, i) => (
          <div key={l.name} className="relative flex items-center border-b border-[#F1F1F4] px-3 py-2.5 last:border-0">
            <span className="flex-1 text-[11px] text-[#18181B]">{l.name}</span>
            <span className={cn("mp-lang grid h-4 w-4 place-items-center rounded-full bg-[#0F766E] text-white", i === 0 && "mp-lang-first")} style={{ animationDelay: `${i * 2 - 8}s` }}>
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
          </div>
        ))}
      </div>
    </CroppedPhone>
  );
}

/** Eight cards (pictures by position); text from Admin > Website > Platform. */
export function MobileAppBento({ cards = PLATFORM_CARDS["mobile-app"] }: { cards?: PlatformCard[] } = {}) {
  const card = (i: number) => cards[i] || PLATFORM_CARDS["mobile-app"][i];
  const ic = "h-7 w-7";
  return (
    <>
    <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(180deg,#EDF1FC,#F5F7FD_45%,#EEF2FB)] p-3 sm:rounded-[44px] sm:p-4">
      {/* soft clouds */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -left-20 top-10 h-64 w-[420px] rounded-full bg-white opacity-80 blur-3xl" />
        <span className="absolute right-[-80px] top-[38%] h-72 w-[460px] rounded-full bg-white opacity-70 blur-3xl" />
        <span className="absolute bottom-0 left-[20%] h-56 w-[520px] rounded-full bg-white opacity-70 blur-3xl" />
      </div>
      <div className="relative grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <MCard wide icon={<Smartphone className={ic} strokeWidth={1.7} />} plan="Every plan" title={card(0).title} body={card(0).text}>
          <LmsAppArt />
        </MCard>
        <MCard icon={<ShieldCheck className={ic} strokeWidth={1.7} />} plan="Every plan" title={card(2).title} body={card(2).text}>
          <ProtectArt />
        </MCard>
        <MCard icon={<Video className={ic} strokeWidth={1.7} />} title={card(3).title} body={card(3).text}>
          <LiveArt />
        </MCard>
        <MCard wide icon={<BadgeCheck className={ic} strokeWidth={1.7} />} plan="Pro and up" title={card(1).title} body={card(1).text}>
          <HomeScreenArt />
        </MCard>
        <MCard icon={<ClipboardCheck className={ic} strokeWidth={1.7} />} title={card(4).title} body={card(4).text}>
          <TestArt />
        </MCard>
        <MCard icon={<MessageCircle className={ic} strokeWidth={1.7} />} title={card(5).title} body={card(5).text}>
          <WhatsAppArt />
        </MCard>
        <MCard icon={<Users className={ic} strokeWidth={1.7} />} plan="Growth and up" title={card(6).title} body={card(6).text}>
          <CommunityArt />
        </MCard>
        <MCard icon={<Languages className={ic} strokeWidth={1.7} />} title={card(7).title} body={card(7).text}>
          <LanguageArt />
        </MCard>
      </div>
    </div>
    </>
  );
}
