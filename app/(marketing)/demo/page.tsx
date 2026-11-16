import React, { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Mic, MonitorPlay, Users, Video } from "lucide-react";
import DemoForm from "@/components/marketing/DemoForm";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container } from "@/components/sections/HomeV5/primitives";
import { getMetadataBase } from "@/lib/site";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";
import { getHomeClients, getHomeTestimonials } from "@/lib/api/content";
import { isProductionSite } from "@/lib/site";
import { DEMO_TESTIMONIALS } from "@/components/sections/HomeV5/Testimonials";
import { DemoProof, DemoWhatYouSee, DemoQuote, DemoAfter } from "@/components/sections/DemoV5/DemoSections";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Book a Free 20-Minute LMS Domain Demo | LMS Domain",
  description:
    "Book a free 20-minute demo of LMS Domain. See batches, live classes, tests, payments and your own branded academy, shown with your courses.",
  alternates: { canonical: "/demo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "demo", guard: "demo" });
}

const AGENDA = [
  { t: "0–5 min", h: "Your academy", b: "How you teach today and what you want to change." },
  { t: "5–15 min", h: "LMS Domain, with your courses", b: "Batches, live classes, tests, payments and your branded site." },
  { t: "15–20 min", h: "Plan and next steps", b: "The right plan for you and how setup works." },
];

const FAQS = [
  { question: "Is the demo free?", answer: "Yes. The demo is free and there is no obligation to buy." },
  { question: "How long is the demo?", answer: "About 20 minutes, with time for your questions at the end." },
  {
    question: "Do I need to prepare anything?",
    answer: "No. It helps to know roughly how many learners and courses you have, but we can cover everything on the call.",
  },
  { question: "Can my team join the demo?", answer: "Yes. Invite anyone who will help run your academy, such as teachers or admin staff." },
  {
    question: "Can I try LMS Domain without a demo?",
    answer: 'Yes. Every plan comes with a free trial. See the <a href="/pricing" class="text-[#6C4BFF] underline underline-offset-2">pricing page</a> to get started.',
  },
];

/** Video-call mockup: what the demo looks like. Sample people only. */
function CallVisual() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden rounded-[22px] bg-[#16141F] p-3 shadow-[0_30px_60px_-30px_rgba(16,16,24,0.5)]">
      <div className="grid grid-cols-[1.6fr_1fr] gap-2">
        {/* shared screen */}
        <div className="relative overflow-hidden rounded-[14px] bg-white p-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
            <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
            <span className="h-2 w-2 rounded-full bg-[#28C840]" />
            <span className="ml-1.5 truncate text-[9.5px] text-[#9A9AA6]">your-academy · Batches</span>
          </div>
          <div className="mt-2.5 space-y-1.5">
            {[
              ["Maths · Evening", "24", "bg-[#0A0A0B]"],
              ["Spoken English", "18", "bg-[#E4E4E7]"],
              ["Data skills", "32", "bg-[#E4E4E7]"],
            ].map(([t, n, c]) => (
              <div key={t} className="flex items-center gap-2 rounded-[7px] bg-[#F8F8FA] px-2 py-1.5">
                <span className={cn("h-2 w-2 rounded-full", c)} />
                <span className="flex-1 truncate text-[10px] font-medium text-[#27272A]">{t}</span>
                <span className="text-[9.5px] text-[#9A9AA6]">{n} learners</span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 rounded-full bg-[#F1F1F4]">
            <div className="mo-progress h-full w-[40%] rounded-full bg-[#6C4BFF]" />
          </div>
        </div>
        {/* faces */}
        <div className="grid grid-rows-2 gap-2">
          <div className="relative overflow-hidden rounded-[14px] ring-2 ring-[#4ADE80]">
            <Image src="/assets/img/home/participant_mia.jpg" alt="" fill sizes="160px" className="object-cover object-top" />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] text-white">LMS Domain team</span>
            <div className="absolute right-1.5 top-1.5 flex items-end gap-[2px] rounded-[4px] bg-black/50 px-1 py-0.5">
              {[0, 0.2, 0.4].map((dl) => (
                <span key={dl} className="mo-eq block h-2 w-[2px] rounded-full bg-white" style={{ "--ed": `${dl}s` } as React.CSSProperties} />
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[14px]">
            <Image src="/assets/img/home/participant_alex.jpg" alt="" fill sizes="160px" className="object-cover object-top" />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] text-white">You</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {[Mic, Video, MonitorPlay].map((I, i) => (
          <span key={i} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white">
            <I className="h-3.5 w-3.5" />
          </span>
        ))}
        <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#DC2626] px-3 py-1.5 text-[11px] font-semibold text-white">
          <Clock className="h-3 w-3" /> 20 min
        </span>
      </div>
    </div>
  );
}

export default async function DemoPage() {
  const [clients, testimonials] = await Promise.all([getHomeClients().catch(() => null), getHomeTestimonials().catch(() => [])]);
  const logos = (clients?.logos || []).filter((l): l is typeof l & { name: string; logo: string } => Boolean(l?.logo && l.name) && !/^client\s*-?\s*\d+/i.test(l.name || ""));
  // Real testimonial from Admin; demo one only outside production
  const story = testimonials[0] || (!isProductionSite() ? DEMO_TESTIMONIALS[1] : undefined);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Book a demo", path: "/demo" },
  ];

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      <section className="relative isolate overflow-hidden bg-white pb-[clamp(64px,8vw,104px)] pt-[120px] min-[900px]:pt-[160px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-200px] h-[620px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.18),transparent)] blur-2xl" />
          <div className="absolute right-[-10%] top-[100px] h-[520px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(143,168,255,0.2),transparent)] blur-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,11,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,11,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_10%,#000_20%,transparent_75%)]" />
        </div>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-x-14 lg:gap-y-0">
            {/* Left: what you get */}
            <div className="contents">
              <div className="order-1 lg:col-start-1 lg:row-start-1">
              <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
                <ol className="inline-flex items-center gap-1.5">
                  <li>
                    <Link href="/" className="hover:text-[#0A0A0B]">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-medium text-[#0A0A0B]">
                    Book a demo
                  </li>
                </ol>
              </nav>
              <h1
                style={{ "--d": "90ms" } as React.CSSProperties}
                className="v5-rise mt-5 font-urbanist text-[clamp(36px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]"
              >
                See your academy on LMS Domain in{" "}
                <span className="bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent">20 minutes</span>
              </h1>
              <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mt-5 max-w-[520px] text-[17px] leading-[1.6] text-[#52525B]">
                A free, live walkthrough with our team. We show you LMS Domain using your own courses and the way you teach.
              </p>
              <ul style={{ "--d": "240ms" } as React.CSSProperties} className="v5-rise mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#3F3F46]">
                {["Free, no obligation", "With your own courses", "Bring your team"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#6C4BFF]" strokeWidth={2.5} /> {t}
                  </li>
                ))}
              </ul>

              </div>
              <div className="order-3 lg:col-start-1 lg:row-start-2">
              <div style={{ "--d": "320ms" } as React.CSSProperties} className="v5-rise mt-9 lg:mt-9">
                <CallVisual />
              </div>

              {/* Agenda */}
              <div className="rv-v4 mt-8 rounded-[22px] bg-[#F4F5F8] p-5 sm:p-6">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-[#18181B]">
                  <Users className="h-4 w-4" /> What we cover
                </p>
                <ol className="relative mt-4 space-y-4">
                  <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-[#D4D4D8]" />
                  {AGENDA.map((a) => (
                    <li key={a.t} className="relative flex gap-4 pl-6">
                      <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-[#F4F5F8] bg-[#0A0A0B]" />
                      <div>
                        <p className="text-[12px] font-semibold text-[#6C4BFF]">{a.t}</p>
                        <p className="text-[15px] font-semibold text-[#18181B]">{a.h}</p>
                        <p className="text-[13.5px] text-[#71717A]">{a.b}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              </div>
            </div>

            {/* Right: the form */}
            <div style={{ "--d": "200ms" } as React.CSSProperties} id="book" className="v5-rise order-2 scroll-mt-28 lg:sticky lg:top-[110px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="rounded-[28px] border border-[#ECECF1] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04),0_40px_80px_-40px_rgba(16,16,24,0.35)] sm:p-9">
                <p className="font-urbanist text-[24px] font-semibold tracking-[-0.02em]">Book your free demo</p>
                <p className="mt-1 text-[14px] text-[#71717A]">Takes less than a minute. We&apos;ll get back to you to pick a time.</p>
                <div className="mt-6">
                  <Suspense fallback={<div className="h-[480px] w-full animate-pulse rounded-2xl bg-[#F4F5F8]" />}>
                    <DemoForm variant="page" submitLabel="Book my free demo" />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DemoProof logos={logos} />
      <DemoWhatYouSee />
      {story && <DemoQuote quote={story.quote} name={story.name} role={story.role} photo={story.avatar} />}
      <DemoAfter />

      <div className="pt-[clamp(48px,6vw,80px)]" />
      <FAQ id="demo-faq" minimal eyebrow="FAQs" title="Questions about the demo" subtitle="Everything you need to know before you book." items={FAQS} />
      <div className="pb-[clamp(48px,6vw,80px)]" />
      <ScrollReveal />
    </div>
  );
}
