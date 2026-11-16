import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Globe, MousePointerClick, Quote, Rocket, Wrench } from "lucide-react";
import { Container, SectionHeading } from "@/components/sections/HomeV5/primitives";
import { CountUp } from "@/components/sections/HomeV5/CountUp";
import { Mini } from "@/components/sections/SolutionsV5/MiniCard";
import { coachingInstitutesData } from "@/content/solutions/coaching-institutes";
import { languageTestPrepData } from "@/content/solutions/language-test-prep";
import { soloEducatorsData } from "@/content/solutions/solo-educators";
import { trainingCompaniesData } from "@/content/solutions/training-companies";
import { cn } from "@/lib/utils";
import type { DemoContent } from "@/content/demo";

/* Sections under the demo form: proof, what you'll see, a customer's words, what happens after. */

// Numbers: the Customers page numbers (Admin > Website > Customers > Numbers)
export function DemoProof({
  logos,
  heading,
  stats,
}: {
  logos: { name: string; logo: string }[];
  heading: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="bg-white">
      <Container>
        <div className="rv-v4 grid items-center gap-8 rounded-[28px] border border-[#ECECF1] px-6 py-8 sm:px-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <p className="max-w-[220px] font-urbanist text-[20px] font-semibold leading-[1.2] tracking-[-0.015em]">
            {heading}
          </p>
          <div>
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map(({ value: v, label: l }, i) => (
                <div key={`${l}-${i}`}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-urbanist text-[34px] font-semibold leading-none tracking-[-0.04em]">
                    <CountUp value={v} />
                  </dd>
                  <dd className="mt-1.5 text-[13.5px] text-[#71717A]">{l}</dd>
                </div>
              ))}
            </dl>
            {logos.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[#F1F1F4] pt-6">
                {logos.slice(0, 6).map((l) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={l.name} src={l.logo} alt={l.name} loading="lazy" className="h-7 w-auto object-contain opacity-60 grayscale" />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// One real product card from each kind of academy (data from the Solutions pages)
// Cards by position; text from Admin > Website > Demo
const SEE_CARDS = [
  coachingInstitutesData.v5!.week[1].card,
  coachingInstitutesData.v5!.week[2].card,
  languageTestPrepData.v5!.week[2].card,
  trainingCompaniesData.v5!.week[3].card,
  soloEducatorsData.v5!.week[0].card,
  coachingInstitutesData.v5!.week[3].card,
];

export function DemoWhatYouSee({ eyebrow, title, subtitle, items }: { eyebrow: string; title: string; subtitle: string; items: { title: string; text: string }[] }) {
  return (
    <section className="px-2 pt-[clamp(80px,10vw,136px)] sm:px-3">
      <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
        <Container>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {items.map((s, i) => (
              <div
                key={`${s.title}-${i}`}
                style={{ "--rv-delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
                className="rv-v4 group flex flex-col overflow-hidden rounded-[28px] bg-white p-3 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(16,16,24,0.3)]"
              >
                <div aria-hidden="true" className="relative h-[220px] overflow-hidden rounded-[20px] bg-[#F4F5F8] p-4">
                  <div className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                    <Mini card={SEE_CARDS[i % SEE_CARDS.length]} />
                  </div>
                </div>
                <div className="px-3 pb-3 pt-5">
                  <p className="font-urbanist text-[19px] font-semibold tracking-[-0.01em]">{s.title}</p>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-[#6B6B76]">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

export function DemoQuote({ quote, name, role, photo }: { quote: string; name: string; role?: string; photo?: string }) {
  return (
    <section className="bg-white pt-[clamp(80px,10vw,136px)]">
      <Container>
        <figure className="rv-v4 relative isolate mx-auto max-w-[980px] overflow-hidden rounded-[32px] bg-[#0A0A0B] px-7 py-12 text-white sm:px-14 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[360px] w-[360px] rounded-full bg-[#6C4BFF]/30 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_80%_at_0%_100%,#000,transparent_70%)]" />
          <Quote className="h-9 w-9 fill-[#8B6CFF] text-[#8B6CFF]" aria-hidden="true" />
          <blockquote className="mt-6 font-urbanist text-[clamp(22px,2.6vw,32px)] font-medium leading-[1.35] tracking-[-0.015em] [text-wrap:pretty]">
            {quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            {photo ? (
              <Image src={photo} alt={name} width={96} height={96} className="h-12 w-12 rounded-full object-cover object-top" />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[14px] font-semibold text-[#0A0A0B]">
                {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
            )}
            <div>
              <p className="text-[15px] font-semibold">{name}</p>
              {role && <p className="text-[13.5px] text-[#A1A1AA]">{role}</p>}
            </div>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

// Icons by position; text from Admin > Website > Demo
const AFTER_ICONS = [MousePointerClick, Wrench, Globe, Rocket];

export function DemoAfter({ data }: { data: DemoContent["after"] }) {
  return (
    <section className="bg-white pt-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          <span aria-hidden="true" className="rv-v4 v5-draw absolute left-[12%] right-[12%] top-[28px] hidden border-t-2 border-dashed border-[#D4D4D8] lg:block" />
          {data.steps.map(({ title: t, text: b }, idx) => {
            const Icon = AFTER_ICONS[idx % AFTER_ICONS.length];
            return (
            <li key={`${t}-${idx}`} style={{ "--rv-delay": `${idx * 120}ms` } as React.CSSProperties} className="rv-v4 relative">
              <span className="v5-badge relative z-10 grid h-14 w-14 place-items-center rounded-full bg-[#0A0A0B] text-white ring-8 ring-white">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-[12px] font-semibold text-[#9A9AA6]">Step {idx + 1}</p>
              <p className="mt-1 font-urbanist text-[19px] font-semibold tracking-[-0.01em]">{t}</p>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-[#6B6B76]">{b}</p>
            </li>
            );
          })}
        </ol>
        <div className="rv-v4 mt-12 flex flex-col items-center justify-between gap-4 rounded-[24px] bg-[#F4F5F8] px-6 py-6 sm:flex-row sm:px-8">
          <p className="flex items-center gap-2 text-[15px] font-medium text-[#27272A]">
            <Check className="h-4 w-4 text-[#16A34A]" strokeWidth={3} /> {data.readyText}
          </p>
          <div className="flex gap-3">
            <a href="#book" className={cn("inline-flex h-11 items-center gap-2 rounded-full bg-[#0A0A0B] px-5 text-[14px] font-semibold text-white hover:bg-[#27272A]")}>
              {data.primaryButton} <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/pricing" className="inline-flex h-11 items-center rounded-full border border-[#E4E4E7] bg-white px-5 text-[14px] font-semibold text-[#0A0A0B] hover:border-[#0A0A0B]">
              {data.secondaryButton}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
