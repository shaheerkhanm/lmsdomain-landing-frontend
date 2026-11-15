import React from "react";
import Link from "next/link";
import { Container, secondaryButtonClass } from "./primitives";
import { DemoButton } from "./DemoButton";

export function FinalCta() {
  return (
    <section id="cta" className="bg-white pb-[clamp(72px,9vw,120px)]">
      <Container>
        <div className="rv-v4 relative overflow-hidden rounded-[28px] bg-[#F4F5F8] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#D0D0D7_1.2px,transparent_1.2px)] bg-[size:18px_18px] [mask-image:radial-gradient(ellipse_62%_72%_at_50%_50%,rgba(0,0,0,0.15)_25%,#000_85%)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-[680px] font-urbanist text-[clamp(30px,4.2vw,48px)] font-semibold leading-[1.08] tracking-[-0.025em] text-[#0A0A0B] [text-wrap:balance]">
              See your academy running on LMS Domain
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.6] text-[#52525B] sm:text-[17px]">
              Book a 20-minute demo. We&apos;ll walk you through it using your own courses.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DemoButton label="Book a demo" className="w-full sm:w-auto" />
              <Link href="/pricing" className={`${secondaryButtonClass} w-full sm:w-auto`}>
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
