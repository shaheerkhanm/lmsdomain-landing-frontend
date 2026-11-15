"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { ErrorScene } from "@/components/marketing/ErrorScene";
import { Container } from "@/components/sections/HomeV5/primitives";

const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";

export default function MarketingError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Marketing route error boundary caught:", error);
  }, [error]);

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B]">
      <section className="pb-[clamp(72px,9vw,120px)] pt-[120px] min-[900px]:pt-[150px]">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="v5-rise inline-flex items-center gap-2 rounded-full bg-[#F4F5F8] px-3 py-1 text-[13px] font-medium text-[#3F3F46]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" /> Temporary issue
              </p>
              <h1 style={{ "--d": "80ms" } as React.CSSProperties} className={`v5-rise mt-6 text-[clamp(52px,6.4vw,88px)] ${BIG}`}>
                Something
                <br />
                <span className="text-[#C4C4CC]">didn&apos;t load.</span>
              </h1>
              <p style={{ "--d": "160ms" } as React.CSSProperties} className="v5-rise mt-6 max-w-[440px] text-[18px] leading-[1.55] text-[#52525B]">
                We couldn&apos;t load this page just now. It&apos;s usually brief, so please try again in a moment.
              </p>
              <div style={{ "--d": "240ms" } as React.CSSProperties} className="v5-rise mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0A0A0B] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#27272A]"
                >
                  <RotateCcw className="h-4 w-4" /> Try again
                </button>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#F4F5F8] px-6 py-3 text-[15px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#ECEDF1]"
                >
                  Back to home <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            <div className="v5-rise" style={{ "--d": "200ms" } as React.CSSProperties}>
              <ErrorScene code="500" path="lmsdomain.com" ringLabel="Reloading" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
