import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container, secondaryButtonClass } from "./primitives";
import { DemoButton } from "./DemoButton";
import { HeroProductShot } from "./HeroProductShot";
import { CountUp } from "./CountUp";

export interface HeroLogo {
  name?: string;
  logo?: string;
  url?: string;
}

// Real figures, matching the live site (lmsdomain.com).
const STATS = [
  { value: "2,000+", label: "learners" },
  { value: "100+", label: "courses" },
  { value: "300+", label: "lessons" },
  { value: "100+", label: "live classes delivered" },
];

const POINTS = ["Your own domain on every plan", "0% commission on sales", "Set up with our team"];

export function HeroV5({ title, logos = [] }: { title: string; logos?: HeroLogo[] }) {
  const validLogos = logos.filter((l) => l.logo && l.name && !/^client\s*-?\s*\d+/i.test(l.name));

  return (
    <section id="hero" className="relative overflow-x-clip bg-white pt-[112px] sm:pt-[136px]">
      {/* Soft neutral backdrop: faint grid fading out, no colour noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[720px] bg-[linear-gradient(to_right,#F1F1F3_1px,transparent_1px),linear-gradient(to_bottom,#F1F1F3_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_75%)]"
      />

      <Container className="relative text-center">
        <div className="v5-rise mx-auto inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-3 py-1 text-[13px] text-[#52525B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6C4BFF]" aria-hidden="true" />
          <span className="sm:hidden">For academies and course creators</span>
          <span className="hidden sm:inline">All-in-one platform for academies and course creators</span>
        </div>

        <h1 style={{ "--d": "90ms" } as React.CSSProperties} className="v5-rise mx-auto mt-6 max-w-[900px] font-urbanist text-[clamp(38px,6.4vw,68px)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0A0A0B] [text-wrap:balance]">
          {title}
        </h1>

        <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-5 max-w-[620px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18.5px] [text-wrap:pretty]">
          Sell courses on your own website, teach live classes, run tests and get paid in any currency. One platform
          for your whole academy.
        </p>

        <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <DemoButton label="Book a demo" className="w-full sm:w-auto" />
          <Link href="/pricing" className={`${secondaryButtonClass} w-full sm:w-auto`}>
            See pricing
          </Link>
        </div>

        <ul style={{ "--d": "360ms" } as React.CSSProperties} className="v5-rise mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13.5px] text-[#52525B]">
          {POINTS.map((p) => (
            <li key={p} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#0A0A0B]" strokeWidth={2.5} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="v5-shot relative mt-14 sm:mt-16">
        <HeroProductShot />
      </Container>

      {/* Proof: real customer logos + real numbers */}
      <Container className="relative py-16 sm:py-20">
        {validLogos.length > 0 && (
          <div className="mb-12 text-center">
            <p className="text-[13px] font-medium text-[#71717A]">Academies teaching with LMS Domain</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {validLogos.map((l) => {
                const img = (
                  <Image
                    src={l.logo!}
                    alt={l.name!}
                    width={160}
                    height={36}
                    className="h-8 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                );
                return l.url ? (
                  <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer">
                    {img}
                  </a>
                ) : (
                  <span key={l.name}>{img}</span>
                );
              })}
            </div>
          </div>
        )}

        <dl className="rv-v4 grid grid-cols-2 overflow-hidden rounded-[20px] border border-[#E4E4E7] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-7 text-center ${i % 2 === 1 ? "border-l border-[#E4E4E7]" : ""} ${
                i >= 2 ? "border-t border-[#E4E4E7] lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-urbanist text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-0.03em] text-[#0A0A0B]">
                <CountUp value={s.value} />
              </dd>
              <dd className="mt-1 text-[14px] text-[#71717A]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
