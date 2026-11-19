"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, Languages, Lock, MessageCircle, PlayCircle, ShieldCheck, Smartphone, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./primitives";
import { BrandMark } from "@/components/brand/PartnerMarks";
import { BrightpathMark, EmberMark, GreenleafMark, LingoLoftMark, NorthwindMark } from "@/components/brand/DemoAcademyLogo";
import { HOME_MOBILE_APP, type HomeMobileAppContent } from "@/content/home/mobile-app";
import { AppOptions } from "@/components/sections/mobile/AppOptions";
import { StoreBadges, type StoreLinks } from "@/components/sections/mobile/StoreBadges";
import { LessonPlayerScreen } from "@/components/sections/mobile/AppScreens";

/*
 * Mobile apps (homepage). One app in the middle, with tilted cards around it showing what the app
 * does: results, live classes, WhatsApp reminders, works-with, protected video and your own app.
 * The cards swing in from the sides as the section scrolls up, then float gently.
 * Small screens: the phone, then the cards in a two-column grid. Reduced motion: a still picture.
 * Sample academy "Northwind Academy" is made up. Older versions: MobileAppRail.tsx, MobileAppFan.tsx.
 */

function useMedia(query: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setOn(m.matches);
    const fn = () => setOn(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [query]);
  return on;
}

/** 0 → 1 while the element travels from the bottom of the screen to the top */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [p, setP] = useState(0.5);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      setP(Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height))));
    };
    const on = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
  return p;
}

/* ---------- phone shell ---------- */
function Phone({ dark = false, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative w-[248px] rounded-[44px] bg-[#0A0A0B] p-[7px] shadow-[0_50px_80px_-40px_rgba(20,20,60,0.55),0_0_0_1px_rgba(10,10,11,0.08),inset_0_0_0_1.5px_rgba(255,255,255,0.14)]">
      <span className="absolute -left-[2px] top-[104px] h-8 w-[3px] rounded-l bg-[#2A2A30]" />
      <span className="absolute -right-[2px] top-[130px] h-12 w-[3px] rounded-r bg-[#2A2A30]" />
      <div className={cn("relative h-[506px] overflow-hidden rounded-[37px]", dark ? "bg-[#0B1220]" : "bg-white")}>
        <div className="absolute left-1/2 top-2 z-40 h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-[#0A0A0B]" />
        {children}
      </div>
    </div>
  );
}

function StatusBar({ light = false }: { light?: boolean }) {
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

function Brand({ mark, name, light = false }: { mark: React.ReactNode; name: string; light?: boolean }) {
  return (
    <div className="relative z-10 flex items-center gap-2 px-4 pt-1.5">
      {mark}
      <span className={cn("text-[11.5px] font-semibold", light ? "text-white" : "text-[#18181B]")}>{name}</span>
    </div>
  );
}

function SectionLabel({ icon, children, light = false }: { icon: React.ReactNode; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn("flex items-center gap-1.5 px-4 pb-2 pt-3.5 text-[10.5px] font-semibold", light ? "text-white" : "text-[#18181B]")}>
      {icon}
      {children}
    </p>
  );
}

/* ---------- five academy apps ---------- */

/* Coaching institute: mock tests + rank list */

/* ---------- feature cards ---------- */
function Card({ icon, title, tag, children, className }: { icon: React.ReactNode; title: string; tag?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-full rounded-[22px] bg-white p-3.5 shadow-[0_30px_60px_-30px_rgba(20,20,60,0.35),0_0_0_1px_rgba(10,10,11,0.05)]", className)}>
      <p className="flex items-center gap-1.5 pb-3 text-[12.5px] font-semibold text-[#18181B]">
        <span className="text-[#52525B]">{icon}</span>
        {title}
        {tag && <span className="ml-auto rounded-full bg-[#F1EDFF] px-2 py-0.5 text-[10px] font-semibold text-[#5B3BE8]">{tag}</span>}
      </p>
      {children}
    </div>
  );
}

/* App-only cards (the Features grid above already covers tools, test scores and live scheduling) */

function LanguageCard() {
  const langs: [string, string, string, boolean?][] = [
    ["English", "Welcome back, Mia", "ltr"],
    ["हिन्दी", "फिर से स्वागत है, मिया", "ltr", true],
    ["العربية", "مرحبًا بعودتك، ميا", "rtl"],
  ];
  return (
    <Card icon={<Languages className="h-3.5 w-3.5" />} title="Any language">
      <div className="space-y-1.5">
        {langs.map(([name, hello, dir, on]) => (
          <div key={name} className={cn("flex items-center gap-2 rounded-[12px] px-2.5 py-2", on ? "bg-[#0A0A0B] text-white" : "bg-[#F4F5F8] text-[#18181B]")}>
            <span className="min-w-0 flex-1 leading-tight">
              <span className={cn("block text-[10px]", on ? "text-white/60" : "text-[#71717A]")}>{name}</span>
              <span dir={dir} className="block text-[11.5px] font-semibold">{hello}</span>
            </span>
            {on && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />}
          </div>
        ))}
      </div>
      <p className="pt-2.5 text-[11px] text-[#71717A]">Learners pick their language in the app.</p>
    </Card>
  );
}

function CommunityCard() {
  const posts: [string, string, string, number][] = [
    ["author-5", "Meera K.", "Finished the loops lesson. The practice test helped a lot!", 6],
    ["author-2", "Arjun P.", "Can someone share notes from today's live class?", 3],
  ];
  return (
    <Card icon={<MessageCircle className="h-3.5 w-3.5" />} title="Community" tag="Growth and up">
      <div className="space-y-2">
        {posts.map(([face, name, text, replies]) => (
          <div key={name} className="rounded-[14px] bg-[#F4F5F8] p-2.5">
            <div className="flex items-center gap-1.5">
              <span className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image src={`/assets/img/home/testimonials/${face}.jpg`} alt="" fill sizes="20px" className="object-cover" />
              </span>
              <span className="text-[11px] font-semibold text-[#18181B]">{name}</span>
              <span className="ml-auto text-[9.5px] text-[#A1A1AA]">Python batch</span>
            </div>
            <p className="pt-1.5 text-[11px] leading-[1.4] text-[#3F3F46]">{text}</p>
            <p className="flex items-center gap-1 pt-1.5 text-[10px] font-medium text-[#6C4BFF]">
              <MessageCircle className="h-3 w-3" /> {replies} replies
            </p>
          </div>
        ))}
      </div>
      <p className="pt-2.5 text-[11px] text-[#71717A]">Posts and replies inside the app.</p>
    </Card>
  );
}

/* A WhatsApp reminder on the lock screen, one tap into the live class */
function JoinLiveCard() {
  return (
    <Card icon={<Video className="h-3.5 w-3.5" />} title="Join live from the phone">
      <div className="relative overflow-hidden rounded-[16px] bg-[linear-gradient(160deg,#1E1B4B,#0F172A)] p-2.5">
        <p className="pb-2 text-center font-urbanist text-[26px] font-semibold leading-none text-white/90">6:50</p>
        <div className="relative flex items-start gap-2 rounded-[12px] bg-white/90 p-2 backdrop-blur">
          <BrandMark name="WhatsApp" size={20} />
          <span className="min-w-0 leading-tight">
            <span className="block text-[10.5px] font-semibold text-[#18181B]">Class starts in 10 minutes</span>
            <span className="block text-[9.5px] text-[#71717A]">Business English · Tap to join</span>
          </span>
          <span aria-hidden="true" className="ma-tap absolute bottom-1 right-3 h-5 w-5 rounded-full bg-[#6C4BFF]/40 ring-2 ring-[#6C4BFF]/60" />
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-[12px] bg-white/10 p-2 ring-1 ring-white/10">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EF4444] px-1.5 py-0.5 text-[8.5px] font-bold text-white">
            <span className="mo-ping h-1.5 w-1.5 rounded-full bg-white" /> LIVE
          </span>
          <span className="flex -space-x-1.5">
            {["author-1", "author-3", "author-4"].map((f) => (
              <span key={f} className="relative h-5 w-5 overflow-hidden rounded-full ring-2 ring-[#1E1B4B]">
                <Image src={`/assets/img/home/testimonials/${f}.jpg`} alt="" fill sizes="20px" className="object-cover" />
              </span>
            ))}
          </span>
          <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#0A0A0B]">Join</span>
        </div>
      </div>
      <p className="pt-2.5 text-[11px] text-[#71717A]">Zoom, Google Meet or Teams open inside the app.</p>
    </Card>
  );
}

function WhatsAppCard() {
  return (
    <Card icon={<BrandMark name="WhatsApp" size={14} />} title="WhatsApp reminders">
      <div className="space-y-2">
        {["New test is live: Mock test 5", "Recording of today's class is ready", "Homework due tomorrow, 9 PM"].map((m, i) => (
          <div key={m} className={cn("relative max-w-[92%] rounded-[12px] rounded-tl-[4px] bg-[#E7F8EE] px-2.5 py-1.5 text-[11px] leading-[1.35] text-[#14532D]", i === 1 && "ml-auto rounded-tl-[12px] rounded-tr-[4px]")}>
            {m}
            <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[9px] text-[#15803D]/70">
              7:0{i} PM <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
          </div>
        ))}
        <div className="mt-1 rounded-full bg-[#0A0A0B] py-2 text-center text-[11px] font-semibold text-white">Sent to 42 learners</div>
      </div>
    </Card>
  );
}

function ProtectCard() {
  return (
    <Card icon={<ShieldCheck className="h-3.5 w-3.5" />} title="Protected video">
      <div className="space-y-2">
        {[
          ["DRM encrypted video", "Every plan"],
          ["Learner watermark", "Every plan"],
          ["Screen recording blocked", "Every plan"],
          ["Device limits", "Pro"],
        ].map(([t, p]) => (
          <div key={t} className="flex items-center gap-2 rounded-[12px] bg-[#F4F5F8] px-2.5 py-2">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#16A34A] text-white">
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
            <span className="flex-1 text-[11.5px] font-medium text-[#18181B]">{t}</span>
            <span className="text-[9.5px] text-[#A1A1AA]">{p}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OwnAppCard() {
  return (
    <Card icon={<Smartphone className="h-3.5 w-3.5" />} title="Your own app">
      <div className="relative overflow-hidden rounded-[16px] bg-[linear-gradient(160deg,#134E4A,#0B2F2C)] p-3">
        <span aria-hidden="true" className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#14B8A6]/40 blur-2xl" />
        <div className="relative grid grid-cols-4 gap-2.5">
          {[<BrightpathMark key="a" size={34} />, <LingoLoftMark key="b" size={34} />, <GreenleafMark key="c" size={34} />, <EmberMark key="d" size={34} />].map((m, i) => (
            <span key={i} className="opacity-60">{m}</span>
          ))}
        </div>
        <div className="relative mt-3 flex items-center gap-2.5 rounded-[14px] bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur">
          <span className="ma-pop block overflow-hidden rounded-[12px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.6)]">
            <NorthwindMark size={44} />
          </span>
          <span className="leading-tight">
            <span className="block text-[12px] font-semibold text-white">Northwind Academy</span>
            <span className="block text-[10px] text-white/65">Google Play · App Store</span>
          </span>
        </div>
      </div>
      <p className="pt-2.5 text-[11px] text-[#71717A]">Your name, logo and colours in the stores. <span className="font-semibold text-[#0B5D57]">Pro and up</span></p>
    </Card>
  );
}

/* Desktop layout: three cards each side, tilted towards the phone */
/*
 * Card layout, measured from the reference: phone and cards about the same width, a ~34px gap to the phone,
 * and each side a fanned stack (cards overlap ~70px) that starts just above the phone and runs past its bottom.
 * x = card centre from the phone centre (phone 248px wide, cards 236px).
 */
const GAP_X = 124 + 34 + 118;
const LEFT = [
  { C: CommunityCard, top: 0, x: -GAP_X - 6, r: -11 },
  { C: JoinLiveCard, top: 262, x: -GAP_X + 4, r: -7 },
  { C: WhatsAppCard, top: 530, x: -GAP_X - 2, r: -12 },
];
const RIGHT = [
  { C: LanguageCard, top: 18, x: GAP_X + 4, r: 10 },
  { C: ProtectCard, top: 238, x: GAP_X - 4, r: 7 },
  { C: OwnAppCard, top: 500, x: GAP_X + 6, r: 11 },
];

export function MobileAppSection({ data = HOME_MOBILE_APP, storeLinks }: { data?: HomeMobileAppContent; storeLinks?: StoreLinks }) {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const p = useScrollProgress(stage, !reduce);
  // 0 while the stage is entering → 1 once it is well in view
  const q = reduce ? 1 : Math.max(0, Math.min(1, (p - 0.05) / 0.35));
  const ease = 1 - Math.pow(1 - q, 3);

  const place = (x: number, top: number, r: number, i: number): React.CSSProperties => {
    const dir = Math.sign(x);
    const k = Math.max(0, Math.min(1, ease * 1.15 - i * 0.08));
    return {
      top,
      transform: `translateX(calc(-50% + ${x + dir * (1 - k) * 110}px)) translateY(${(1 - k) * 50}px) perspective(1000px) rotateX(12deg) rotateY(${dir * -20}deg) rotate(${r + dir * (1 - k) * 10}deg)`,
      opacity: 0.25 + 0.75 * k,
    };
  };

  return (
    <section id="mobile-app" className="relative overflow-hidden bg-white py-[clamp(64px,8vw,112px)]">
      <Container>
        <div className="rv-v4 mx-auto max-w-[720px] text-center">
          <p className="mb-5 inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A] shadow-[0_1px_2px_rgba(10,10,11,0.04)]">
            {data.eyebrow}
          </p>
          <h2 className="font-urbanist text-[clamp(32px,4.4vw,50px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0A0A0B] [text-wrap:balance]">{data.title}</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.6] text-[#52525B] sm:text-[17px] [text-wrap:pretty]">{data.subtitle}</p>
          <AppOptions className="mt-7" items={data.plans} />
          <StoreBadges links={storeLinks} className="mt-5 justify-center" />
        </div>
      </Container>

      {/* Desktop: phone with cards around it */}
      <div ref={stage} className="relative mx-auto mt-14 hidden h-[880px] max-w-[1200px] lg:block">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[90px] z-10"
          style={{ transform: `translateX(-50%) translateY(${(1 - ease) * 70}px)`, transformOrigin: "top center" }}
        >
          <Phone>
            <LessonPlayerScreen />
          </Phone>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[590px] h-20 w-[360px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(20,20,60,0.18),transparent)] blur-md" />
        {[...LEFT, ...RIGHT].map(({ C, top, x, r }, i) => (
          <div key={i} className="absolute left-1/2 z-20 w-[236px] will-change-transform" style={place(x, top, r, i % 3)}>
            <div className="ma-bob" style={{ animationDelay: `${i * 0.7}s` }}>
              <C />
            </div>
          </div>
        ))}
      </div>

      {/* Small screens: phone, then the cards */}
      <Container className="lg:hidden">
        <div aria-hidden="true" className="relative mx-auto mt-12 flex h-[460px] max-w-[440px] justify-center">
          <div className="origin-top scale-[0.86]">
            <Phone>
              <LessonPlayerScreen />
            </Phone>
          </div>
          {/* two small cards overlapping the phone, like the desktop stacks */}
          <div className="absolute left-0 top-[318px] z-10 w-[138px] -rotate-[8deg] min-[420px]:left-2">
            <div className="ma-bob rounded-[16px] bg-white p-2.5 shadow-[0_20px_40px_-20px_rgba(20,20,60,0.45),0_0_0_1px_rgba(10,10,11,0.05)]">
              <p className="flex items-center gap-1 text-[10px] font-semibold text-[#52525B]"><Languages className="h-3 w-3" /> Any language</p>
              <p className="pt-1 text-[13px] font-semibold leading-tight text-[#0A0A0B]">फिर से स्वागत है</p>
              <p dir="rtl" className="pt-0.5 text-left text-[12px] font-semibold text-[#0A0A0B]">مرحبًا بعودتك</p>
            </div>
          </div>
          <div className="absolute right-0 top-[236px] z-10 w-[140px] rotate-[7deg] min-[420px]:right-2">
            <div className="ma-bob flex items-center gap-2 rounded-[16px] bg-white p-2.5 shadow-[0_20px_40px_-20px_rgba(20,20,60,0.45),0_0_0_1px_rgba(10,10,11,0.05)]" style={{ animationDelay: "1.4s" }}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#E8F7EF] text-[#15803D]"><ShieldCheck className="h-4 w-4" /></span>
              <span className="text-[10.5px] font-semibold leading-[1.25] text-[#18181B]">Screen recording blocked</span>
            </div>
          </div>
        </div>
        <div
          role="region"
          aria-label="What the app does, swipe to see more"
          className="-mx-[clamp(16px,4vw,40px)] mt-2 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto scroll-px-4 px-4 pb-6 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[JoinLiveCard, LanguageCard, CommunityCard, WhatsAppCard, OwnAppCard].map((C, i) => (
            <div key={i} className="w-[250px] shrink-0 snap-start" style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
              <C />
            </div>
          ))}
        </div>
        <p className="flex items-center justify-center gap-1 text-[13px] font-medium text-[#71717A]">
          Swipe to see more <ArrowRight className="ma-nudge h-3.5 w-3.5" />
        </p>
      </Container>

      <Container>
        <div className="mt-10 flex justify-center lg:mt-4">
          <Link href={data.linkHref} className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]">
            {data.linkText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
