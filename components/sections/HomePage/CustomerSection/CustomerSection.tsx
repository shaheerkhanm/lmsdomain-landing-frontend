"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { testimonialsContent } from "@/content/home/testimonials";
import { TestimonialCard } from "./StackedAcademyDeck";

export function CustomerSection({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const wallTextRef = useRef<HTMLHeadingElement>(null);
  const deckWrapperRef = useRef<HTMLDivElement>(null);

  // 5 Card refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  // Measure and fit headline width to ~88% of viewport (never wider than innerWidth - 96px)
  useEffect(() => {
    const handleResize = () => {
      if (!wallTextRef.current) return;
      const vw = window.innerWidth;
      const targetWidth = Math.min(vw * 0.88, vw - 96);

      // Measure current width with baseline font size
      wallTextRef.current.style.fontSize = "100px";
      const measuredWidth = wallTextRef.current.offsetWidth || 1;
      const desiredFontSize = Math.max(28, Math.floor((targetWidth / measuredWidth) * 100));

      wallTextRef.current.style.fontSize = `${desiredFontSize}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (5-Card Deck & Flight Sequence)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) {
          gsap.set(wallTextRef.current, { color: "#161616", scale: 1 });
          gsap.set(
            [
              card1Ref.current,
              card2Ref.current,
              card3Ref.current,
              card4Ref.current,
              card5Ref.current,
            ],
            { clearProps: "all" }
          );
          return;
        }

        // Initial positions:
        // Headline starts grey and slightly scaled down
        gsap.set(wallTextRef.current, { scale: 0.85, color: "#9CA3AF" });

        // Deck starts below screen
        gsap.set(deckWrapperRef.current, { y: "45vh", opacity: 0 });

        // Alternating tilts: -4, +3, -2, +4, -3
        gsap.set(card1Ref.current, { rotateZ: -4, x: 0, y: 0 });
        gsap.set(card2Ref.current, { rotateZ: 3, x: 0, y: 0 });
        gsap.set(card3Ref.current, { rotateZ: -2, x: 0, y: 0 });
        gsap.set(card4Ref.current, { rotateZ: 4, x: 0, y: 0 });
        gsap.set(card5Ref.current, { rotateZ: -3, x: 0, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top 80px",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
          },
        });

        // ----------------------------------------------------
        // Stage 1 (0 -> 0.2): Headline turns black, deck rises over "of"
        // ----------------------------------------------------
        tl.to(
          wallTextRef.current,
          {
            scale: 1,
            color: "#161616",
            ease: "power1.out",
            duration: 0.2,
          },
          0
        );

        tl.to(
          deckWrapperRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            duration: 0.2,
          },
          0
        );

        // ----------------------------------------------------
        // Stage 2 (0.2 -> 0.38): Card 1 flies up and out past top
        // ----------------------------------------------------
        tl.to(
          card1Ref.current,
          {
            y: "-110vh",
            rotateZ: -10,
            opacity: 0,
            ease: "power1.in",
            duration: 0.18,
          },
          0.2
        );

        // ----------------------------------------------------
        // Stage 3 (0.38 -> 0.56): Card 2 flies up and out past top
        // ----------------------------------------------------
        tl.to(
          card2Ref.current,
          {
            y: "-110vh",
            rotateZ: 9,
            opacity: 0,
            ease: "power1.in",
            duration: 0.18,
          },
          0.38
        );

        // ----------------------------------------------------
        // Stage 4 (0.56 -> 0.74): Card 3 flies up and out past top
        // ----------------------------------------------------
        tl.to(
          card3Ref.current,
          {
            y: "-110vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.18,
          },
          0.56
        );

        // ----------------------------------------------------
        // Stage 5 (0.74 -> 0.92): Card 4 flies up and out past top; Card 5 settles at 0deg
        // ----------------------------------------------------
        tl.to(
          card4Ref.current,
          {
            y: "-110vh",
            rotateZ: 10,
            opacity: 0,
            ease: "power1.in",
            duration: 0.18,
          },
          0.74
        );

        tl.to(
          card5Ref.current,
          {
            rotateZ: 0,
            ease: "power1.out",
            duration: 0.18,
          },
          0.78
        );
      });

      // Mobile: under 1024px (Normal flow, no pin)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(wallTextRef.current, { scale: 1, color: "#161616" });
        gsap.set(
          [
            deckWrapperRef.current,
            card1Ref.current,
            card2Ref.current,
            card3Ref.current,
            card4Ref.current,
            card5Ref.current,
          ],
          {
            clearProps: "all",
          }
        );
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  const cards = testimonialsContent.cards;

  return (
    <section id="testimonials" className="bg-[#F3F4F6] font-urbanist relative overflow-visible lg:-mb-32">
      {/* Pinned Stage Container: Compact height with direct exit to FAQ (Desktop Only >=1024px) */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[420px] lg:h-[440px] hidden lg:flex items-center justify-center overflow-hidden"
      >
        {/* Headline "Wall of love" fitting ~88% of screen with font-weight 600 */}
        <div
          ref={textWrapperRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 px-6 sm:px-12"
        >
          <h2
            ref={wallTextRef}
            className="font-semibold tracking-[-0.03em] leading-none text-center whitespace-nowrap will-change-transform text-[#161616]"
            style={{ fontWeight: 600 }}
          >
            {testimonialsContent.sectionTitle}
          </h2>
        </div>

        {/* Deck sits centered over "of" */}
        <div
          ref={deckWrapperRef}
          className="absolute inset-x-0 top-[50%] -translate-y-1/2 z-10 flex items-center justify-center will-change-transform pointer-events-none"
        >
          <div className="relative w-[300px] h-[170px] flex items-center justify-center pointer-events-auto">
            {/* Card 1 (Top of stack, z-50, tilt -4deg) */}
            <div
              ref={card1Ref}
              className="absolute inset-0 z-50 will-change-transform"
            >
              <TestimonialCard item={cards[0]} />
            </div>

            {/* Card 2 (z-40, tilt +3deg) */}
            <div
              ref={card2Ref}
              className="absolute inset-0 z-40 will-change-transform"
            >
              <TestimonialCard item={cards[1]} />
            </div>

            {/* Card 3 (z-30, tilt -2deg) */}
            <div
              ref={card3Ref}
              className="absolute inset-0 z-30 will-change-transform"
            >
              <TestimonialCard item={cards[2]} />
            </div>

            {/* Card 4 (z-20, tilt +4deg) */}
            <div
              ref={card4Ref}
              className="absolute inset-0 z-20 will-change-transform"
            >
              <TestimonialCard item={cards[3]} />
            </div>

            {/* Card 5 (Bottom of stack, stays settled at 0deg, z-10, tilt -3deg) */}
            <div
              ref={card5Ref}
              className="absolute inset-0 z-10 will-change-transform"
            >
              <TestimonialCard item={cards[4]} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Flow (<1024px, no pin): Text fits screen width with all 5 cards stacked below */}
      <div className="w-full flex flex-col items-center gap-8 lg:hidden px-4 py-12">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-center text-[#161616]">
          {testimonialsContent.sectionTitle}
        </h2>
        <div className="w-full max-w-md flex flex-col items-center gap-3.5">
          {cards.map((card) => (
            <TestimonialCard key={card.id} item={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerSection;