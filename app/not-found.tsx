import React from "react";
import { NotFoundActions, NotFoundLinks } from "@/components/marketing/NotFoundActions";
import { ErrorScene } from "@/components/marketing/ErrorScene";
import { Container } from "@/components/sections/HomeV5/primitives";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { getMetadataBase } from "@/lib/site";

export const metadata = {
  metadataBase: getMetadataBase(),
  title: "Page Not Found | LMS Domain",
  description: "The requested page could not be found.",
  robots: { index: false, follow: false },
};

const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";

export default function NotFound() {
  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B]">
      <section className="pb-[clamp(72px,9vw,120px)] pt-[120px] min-[900px]:pt-[150px]">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="v5-rise inline-flex items-center gap-2 rounded-full bg-[#F4F5F8] px-3 py-1 text-[13px] font-medium text-[#3F3F46]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6C4BFF]" /> Error 404
              </p>
              <h1 style={{ "--d": "80ms" } as React.CSSProperties} className={`v5-rise mt-6 text-[clamp(52px,6.4vw,88px)] ${BIG}`}>
                This page
                <br />
                <span className="text-[#C4C4CC]">wandered off.</span>
              </h1>
              <p style={{ "--d": "160ms" } as React.CSSProperties} className="v5-rise mt-6 max-w-[440px] text-[18px] leading-[1.55] text-[#52525B]">
                The link may be old, or the page has moved. Everything else is right where you left it.
              </p>
              <div style={{ "--d": "240ms" } as React.CSSProperties} className="v5-rise mt-8">
                <NotFoundActions />
              </div>
            </div>
            <div className="v5-rise" style={{ "--d": "200ms" } as React.CSSProperties}>
              <ErrorScene />
            </div>
          </div>

          <div className="mt-[clamp(56px,7vw,96px)]">
            <p className="rv-v4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#9A9AA6]">Popular pages</p>
            <div className="mt-4">
              <NotFoundLinks />
            </div>
          </div>
        </Container>
      </section>
      <ScrollReveal />
    </div>
  );
}
