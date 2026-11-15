import React from "react";
import Image from "next/image";
import { Check, MessageCircle, RefreshCw, Users } from "lucide-react";
import { Container } from "@/components/sections/HomeV5/primitives";
import { cn } from "@/lib/utils";

const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";
const card = "rounded-[14px] border border-[#EDEDF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.05),0_14px_30px_-16px_rgba(16,16,24,0.25)]";

const SHIPPED = ["Zoom live classes", "Tests and question banks", "Video watermarking", "Your own domain", "Domie AI on Pro"];

/** Tilted roadmap board: real features available today vs planned items. */
export function RoadmapBoard({ planned }: { planned: { title: string; category: string }[] }) {
  const cols = [
    { name: "Available today", dot: "bg-[#16A34A]", items: SHIPPED.map((t) => ({ title: t, category: "Live" })), done: true },
    { name: "Planned", dot: "bg-[#F59E0B]", items: planned.slice(0, 5), done: false },
    { name: "Planned", dot: "bg-[#F59E0B]", items: planned.slice(5, 9), done: false },
  ];
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[1100px] [perspective:2200px]">
      <div className="rounded-[28px] bg-[#F4F5F8] p-4 shadow-[0_60px_120px_-50px_rgba(16,16,24,0.45)] md:[transform:rotateX(22deg)_scale(0.96)] [transform-origin:50%_100%] sm:p-6">
        <div className="mb-4 flex items-center gap-2 px-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[12px] font-medium text-[#71717A]">LMS Domain · Product roadmap</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {cols.map((c, ci) => (
            <div key={ci} className={cn(ci === 2 && "hidden md:block")}>
              <p className="mb-2.5 flex items-center gap-2 px-1 text-[12.5px] font-semibold text-[#3F3F46]">
                <span className={cn("h-2 w-2 rounded-full", c.dot)} />
                {c.name}
                <span className="ml-auto text-[11px] font-medium text-[#9A9AA6]">{c.items.length}</span>
              </p>
              <div className="space-y-2">
                {c.items.map((it, i) => (
                  <div key={it.title} style={{ "--d": `${300 + ci * 150 + i * 70}ms` } as React.CSSProperties} className={cn("v5-rise p-3", card, i >= 3 && "hidden md:block")}>
                    <p className="text-[10.5px] text-[#9A9AA6]">{it.category}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-[#18181B]">
                      {c.done && <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={3} />}
                      <span className="truncate">{it.title}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { i: MessageCircle, t: "You tell us", b: "Academies share what they need on calls, in demos and through support." },
  { i: Users, t: "We prioritise", b: "We build first what the most academies ask for and what helps them teach and sell." },
  { i: RefreshCw, t: "Every academy gets it", b: "New features reach academies through regular updates. Nothing to install." },
];

export function RoadmapProcess() {
  return (
    <section className="bg-white py-[clamp(80px,10vw,136px)]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
          <div className="rv-v4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#6C4BFF]">How we decide</p>
            <h2 className={cn("mt-5 text-[clamp(44px,6.5vw,92px)]", BIG)}>
              Built with
              <br />
              <span className="text-[#C4C4CC]">academies.</span>
            </h2>
            <p className="mt-6 max-w-[440px] text-[18px] leading-[1.55] text-[#52525B]">
              Our roadmap comes from the academies that use LMS Domain every day.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex">
                {["participant_mia.jpg", "participant_alex.jpg", "testimonials/author-1.jpg", "testimonials/author-3.jpg"].map((f, i) => (
                  <Image key={f} src={`/assets/img/home/${f}`} alt="" width={80} height={80} className={cn("h-10 w-10 rounded-full object-cover object-top ring-4 ring-white", i > 0 && "-ml-3")} />
                ))}
              </div>
              <p className="text-[14px] text-[#52525B]">Requests from academies, every week</p>
            </div>
          </div>
          <ol className="relative space-y-4">
            <span aria-hidden="true" className="rv-v4 v5-draw absolute bottom-10 left-[31px] top-10 hidden w-0 border-l-2 border-dashed border-[#D4D4D8] sm:block" />
            {STEPS.map(({ i: Icon, t, b }, k) => (
              <li
                key={t}
                style={{ "--rv-delay": `${k * 140}ms` } as React.CSSProperties}
                className={cn("rv-v4 relative flex gap-5 rounded-[24px] p-5 sm:p-6", k === 2 ? "bg-[#0A0A0B] text-white" : "bg-[#F4F5F8]")}
              >
                <span className={cn("v5-badge grid h-12 w-12 shrink-0 place-items-center rounded-full", k === 2 ? "bg-[#6C4BFF] text-white" : "bg-[#0A0A0B] text-white")}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className={cn("text-[12px] font-semibold", k === 2 ? "text-white/50" : "text-[#9A9AA6]")}>Step {k + 1}</p>
                  <p className="font-urbanist text-[22px] font-semibold tracking-[-0.02em]">{t}</p>
                  <p className={cn("mt-1 text-[15px] leading-[1.55]", k === 2 ? "text-white/65" : "text-[#6B6B76]")}>{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export const ROADMAP_FAQS = [
  {
    question: "When will these features be released?",
    answer: "Dates aren't fixed yet. If you need one of these features, tell us. Requests from academies help us decide what comes first.",
  },
  {
    question: "Can I request a feature that isn't on the roadmap?",
    answer: 'Yes. <a href="/contact" class="text-[#6C4BFF] underline underline-offset-2">Send us a message</a> or mention it in your demo. We read every request.',
  },
  {
    question: "Do new features reach my academy automatically?",
    answer: "Yes. LMS Domain is updated regularly, and new features reach academies without anything to install.",
  },
  {
    question: "Can you build a feature just for my academy?",
    answer: 'Yes, on a <a href="/custom-lms" class="text-[#6C4BFF] underline underline-offset-2">Custom Plan</a>. We scope it with you and include it in your written plan.',
  },
  {
    question: "Is there a mobile app today?",
    answer: "Learners can use your academy on any phone through the mobile browser today. Branded Android and iOS apps are on the roadmap.",
  },
];

