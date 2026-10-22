"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { testimonialsContent } from "@/content/home/testimonials";
import type { TestimonialItem } from "@/types/content";
import { TestimonialCard } from "./StackedAcademyDeck";

interface CustomerSectionProps {
  data?: any;
  cards?: TestimonialItem[];
}

// The Wall of Love renders only when there are testimonials to show.
export function CustomerSection({ cards = [] }: CustomerSectionProps) {
  if (cards.length === 0) return null;
  return <WallOfLove cards={cards} />;
}

function WallOfLove({ cards }: { cards: TestimonialItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const wallTextRef = useRef<HTMLHeadingElement>(null);
  const deckWrapperRef = useRef<HTMLDivElement>(null);

  // 5 Card refs (Desktop >=1024px)
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  // Mobile refs (<1024px)
  const mContainerRef = useRef<HTMLDivElement>(null);
  const mWallTextRef = useRef<HTMLHeadingElement>(null);
  const mDeckWrapperRef = useRef<HTMLDivElement>(null);
  const mCard1Ref = useRef<HTMLDivElement>(null);
  const mCard2Ref = useRef<HTMLDivElement>(null);
  const mCard3Ref = useRef<HTMLDivElement>(null);
  const mCard4Ref = useRef<HTMLDivElement>(null);
  const mCard5Ref = useRef<HTMLDivElement>(null);

  // Measure and fit headline width to ~88% of viewport (never wider than innerWidth - 96px)
  useEffect(() => {
    const handleResize = () => {
      if (!wallTextRef.current) return;
      const vw = window.innerWidth;
      const targetWidth = Math.min(vw * 0.88, vw - 96);

      // Measure current width with baseline font size
      wallTextRef.current.style.fontSize = "100px";
      const measuredWidth = wallTextRef.current.offsetWidth;
      if (!measuredWidth || measuredWidth < 100) {
        const desiredFontSize = Math.min(220, Math.max(28, Math.floor((targetWidth / 780) * 100)));
        wallTextRef.current.style.fontSize = `${desiredFontSize}px`;
        return;
      }
      const desiredFontSize = Math.min(220, Math.max(28, Math.floor((targetWidth / measuredWidth) * 100)));

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

    // Card slots without a testimonial are not rendered; skip their animation steps.
    type Vars = gsap.TweenVars;
    const place = (el: HTMLDivElement | null, vars: Vars) => {
      if (el) gsap.set(el, vars);
    };
    const step = (
      timeline: gsap.core.Timeline,
      el: HTMLDivElement | null,
      vars: Vars,
      position: number
    ) => {
      if (el) timeline.to(el, vars, position);
    };

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
            ].filter(Boolean),
            { clearProps: "all" }
          );
          return;
        }

        // Initial positions:
        // Headline starts grey and slightly scaled down
        gsap.set(wallTextRef.current, { scale: 0.85, color: "#9CA3AF" });

        // Deck starts below screen
        gsap.set(deckWrapperRef.current, { y: "45vh", opacity: 0 });

        // Tilts & depth offsets:
        // Card 1: -4deg, y: 0, x: 0
        // Card 2: +3deg, y: 30px, x: 8px (under Card 1)
        // Card 3: -2deg, y: 60px, x: -6px (under Card 2)
        // Card 4: +4deg, y: 60px, x: 6px, opacity: 0 (hidden under Card 3)
        // Card 5: -3deg, y: 60px, x: -4px, opacity: 0 (hidden under Card 4)
        place(card1Ref.current, { rotateZ: -4, x: 0, y: 0, opacity: 1 });
        place(card2Ref.current, { rotateZ: 3, x: 8, y: 30, opacity: 1 });
        place(card3Ref.current, { rotateZ: -2, x: -6, y: 60, opacity: 1 });
        place(card4Ref.current, { rotateZ: 4, x: 6, y: 60, opacity: 0 });
        place(card5Ref.current, { rotateZ: -3, x: -4, y: 60, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
          },
        });

        // ----------------------------------------------------
        // Stage 1 (0 -> 0.12): Headline turns black, deck rises to held position
        // ----------------------------------------------------
        tl.to(
          wallTextRef.current,
          {
            scale: 1,
            color: "#161616",
            ease: "power1.out",
            duration: 0.12,
          },
          0
        );

        tl.to(
          deckWrapperRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            duration: 0.12,
          },
          0
        );

        // ----------------------------------------------------
        // Stage 2 (0.15 -> 0.27): Card 1 flies up; Card 2 takes top spot; Card 3 takes 2nd; Card 4 appears in 3rd
        // ----------------------------------------------------
        step(
          tl,
          card1Ref.current,
          {
            y: "-120vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.12,
          },
          0.15
        );
        step(
          tl,
          card2Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: 2,
            ease: "power1.out",
            duration: 0.12,
          },
          0.15
        );
        step(
          tl,
          card3Ref.current,
          {
            y: 30,
            x: 8,
            rotateZ: -2,
            ease: "power1.out",
            duration: 0.12,
          },
          0.15
        );
        step(
          tl,
          card4Ref.current,
          {
            opacity: 1,
            y: 60,
            x: -6,
            rotateZ: 4,
            ease: "power1.out",
            duration: 0.12,
          },
          0.15
        );

        // ----------------------------------------------------
        // Stage 3 (0.30 -> 0.42): Card 2 flies up; Card 3 takes top spot; Card 4 takes 2nd; Card 5 appears in 3rd
        // ----------------------------------------------------
        step(
          tl,
          card2Ref.current,
          {
            y: "-120vh",
            rotateZ: 8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.12,
          },
          0.30
        );
        step(
          tl,
          card3Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: -2,
            ease: "power1.out",
            duration: 0.12,
          },
          0.30
        );
        step(
          tl,
          card4Ref.current,
          {
            y: 30,
            x: 8,
            rotateZ: 4,
            ease: "power1.out",
            duration: 0.12,
          },
          0.30
        );
        step(
          tl,
          card5Ref.current,
          {
            opacity: 1,
            y: 60,
            x: -6,
            rotateZ: -3,
            ease: "power1.out",
            duration: 0.12,
          },
          0.30
        );

        // ----------------------------------------------------
        // Stage 4 (0.45 -> 0.57): Card 3 flies up; Card 4 takes top spot; Card 5 takes 2nd
        // ----------------------------------------------------
        step(
          tl,
          card3Ref.current,
          {
            y: "-120vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.12,
          },
          0.45
        );
        step(
          tl,
          card4Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: 2,
            ease: "power1.out",
            duration: 0.12,
          },
          0.45
        );
        step(
          tl,
          card5Ref.current,
          {
            y: 30,
            x: 8,
            rotateZ: -3,
            ease: "power1.out",
            duration: 0.12,
          },
          0.45
        );

        // ----------------------------------------------------
        // Stage 5 (0.60 -> 0.72): Card 4 flies up; Card 5 takes top spot and settles flat at 0deg
        // ----------------------------------------------------
        step(
          tl,
          card4Ref.current,
          {
            y: "-120vh",
            rotateZ: 10,
            opacity: 0,
            ease: "power1.in",
            duration: 0.12,
          },
          0.60
        );
        step(
          tl,
          card5Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: 0,
            ease: "power1.out",
            duration: 0.12,
          },
          0.60
        );

        // ----------------------------------------------------
        // Stage 6 (0.75 -> 0.86): Card 5 flies up and out past top
        // ----------------------------------------------------
        step(
          tl,
          card5Ref.current,
          {
            y: "-120vh",
            rotateZ: -8,
            ease: "power1.in",
            duration: 0.11,
          },
          0.75
        );
        step(
          tl,
          card5Ref.current,
          {
            opacity: 0,
            ease: "power2.in",
            duration: 0.03,
          },
          0.83
        );

        // ----------------------------------------------------
        // Stage 7 (0.86 -> 1.00): Only heading visible (14-15% hold before unpin)
        // ----------------------------------------------------
        tl.to({}, { duration: 0.14 }, 0.86);
      });

      // Mobile: under 1024px (Sticky 300vh container, deck rises and cards 1-4 fly out, card 5 stays)
      mm.add("(max-width: 1023px)", () => {
        if (isReduced) {
          gsap.set(mWallTextRef.current, { scale: 1, color: "#161616" });
          gsap.set(
            [
              mDeckWrapperRef.current,
              mCard1Ref.current,
              mCard2Ref.current,
              mCard3Ref.current,
              mCard4Ref.current,
              mCard5Ref.current,
            ].filter(Boolean),
            { clearProps: "all" }
          );
          return;
        }

        // Initial positions:
        gsap.set(mWallTextRef.current, { scale: 0.85, color: "#9CA3AF" });
        gsap.set(mDeckWrapperRef.current, { y: "40vh", opacity: 0 });

        place(mCard1Ref.current, { rotateZ: -4, x: 0, y: 0, opacity: 1 });
        place(mCard2Ref.current, { rotateZ: 3, x: 6, y: 20, opacity: 1 });
        place(mCard3Ref.current, { rotateZ: -2, x: -5, y: 40, opacity: 1 });
        place(mCard4Ref.current, { rotateZ: 4, x: 5, y: 40, opacity: 1 });
        place(mCard5Ref.current, { rotateZ: -3, x: -4, y: 40, opacity: 1 });

        const mtl = gsap.timeline({
          scrollTrigger: {
            trigger: mContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        // Stage 1 (0 -> 0.12): Title turns black, deck rises to middle of "love"
        mtl.to(
          mWallTextRef.current,
          {
            scale: 1,
            color: "#161616",
            ease: "power1.out",
            duration: 0.12,
          },
          0
        );

        mtl.to(
          mDeckWrapperRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            duration: 0.12,
          },
          0
        );

        // Stage 2 (0.14 -> 0.27): Card 1 flies up; Card 2 takes top; Card 3 takes 2nd; Card 4 appears
        step(
          mtl,
          mCard1Ref.current,
          {
            y: "-120vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.13,
          },
          0.14
        );
        step(
          mtl,
          mCard2Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: 2,
            ease: "power1.out",
            duration: 0.13,
          },
          0.14
        );
        step(
          mtl,
          mCard3Ref.current,
          {
            y: 20,
            x: 6,
            rotateZ: -2,
            ease: "power1.out",
            duration: 0.13,
          },
          0.14
        );
        step(
          mtl,
          mCard4Ref.current,
          {
            opacity: 1,
            y: 40,
            x: -5,
            rotateZ: 4,
            ease: "power1.out",
            duration: 0.13,
          },
          0.14
        );

        // Stage 3 (0.29 -> 0.42): Card 2 flies up; Card 3 takes top; Card 4 takes 2nd; Card 5 appears
        step(
          mtl,
          mCard2Ref.current,
          {
            y: "-120vh",
            rotateZ: 8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.13,
          },
          0.29
        );
        step(
          mtl,
          mCard3Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: -2,
            ease: "power1.out",
            duration: 0.13,
          },
          0.29
        );
        step(
          mtl,
          mCard4Ref.current,
          {
            y: 20,
            x: 6,
            rotateZ: 4,
            ease: "power1.out",
            duration: 0.13,
          },
          0.29
        );
        step(
          mtl,
          mCard5Ref.current,
          {
            opacity: 1,
            y: 40,
            x: -4,
            rotateZ: -3,
            ease: "power1.out",
            duration: 0.13,
          },
          0.29
        );

        // Stage 4 (0.44 -> 0.57): Card 3 flies up; Card 4 takes top; Card 5 takes 2nd
        step(
          mtl,
          mCard3Ref.current,
          {
            y: "-120vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.13,
          },
          0.44
        );
        step(
          mtl,
          mCard4Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: 2,
            ease: "power1.out",
            duration: 0.13,
          },
          0.44
        );
        step(
          mtl,
          mCard5Ref.current,
          {
            y: 20,
            x: 6,
            rotateZ: -3,
            ease: "power1.out",
            duration: 0.13,
          },
          0.44
        );

        // Stage 5 (0.59 -> 0.72): Card 4 flies up; Card 5 takes top and settles flat at 0deg
        step(
          mtl,
          mCard4Ref.current,
          {
            y: "-120vh",
            rotateZ: 10,
            opacity: 0,
            ease: "power1.in",
            duration: 0.13,
          },
          0.59
        );
        step(
          mtl,
          mCard5Ref.current,
          {
            y: 0,
            x: 0,
            rotateZ: 0,
            ease: "power1.out",
            duration: 0.13,
          },
          0.59
        );

        // Stage 6 (0.74 -> 0.85): Card 5 flies up like cards 1-4
        step(
          mtl,
          mCard5Ref.current,
          {
            y: "-120vh",
            rotateZ: -8,
            opacity: 0,
            ease: "power1.in",
            duration: 0.11,
          },
          0.74
        );

        // Stage 7 (0.85 -> 1.00): Heading stays alone on screen (15% of sticky length)
        mtl.to({}, { duration: 0.15 }, 0.85);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // The animation has 5 card slots; slots without a testimonial stay empty.
  const deck = Array.from({ length: 5 }, (_, i) => cards[i]);

  return (
    <section ref={sectionRef} id="testimonials" className="bg-[#F3F4F6] font-urbanist relative overflow-visible pt-0 pb-0 lg:pt-0 lg:pb-[57px] mb-16 lg:mb-0">
      {/* Pinned Stage Container (Desktop Only >=1024px) */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen hidden lg:flex items-center justify-center overflow-hidden"
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

        {/* Deck sits centered over "of", top edge at ~47% down window */}
        <div
          ref={deckWrapperRef}
          className="absolute left-1/2 -translate-x-1/2 z-20 will-change-transform pointer-events-none"
          style={{ top: "47%" }}
        >
          <div className="relative w-[30vw] max-w-[440px] h-[215px] pointer-events-auto">
            {/* Card 1 (Top of stack, z-50, tilt -4deg) */}
            {deck[0] && (
              <div
                ref={card1Ref}
                className="absolute inset-0 z-50 will-change-transform"
              >
                <TestimonialCard item={deck[0]} />
              </div>
            )}

            {/* Card 2 (z-40, tilt +3deg, +30px offset) */}
            {deck[1] && (
              <div
                ref={card2Ref}
                className="absolute inset-0 z-40 will-change-transform"
              >
                <TestimonialCard item={deck[1]} />
              </div>
            )}

            {/* Card 3 (z-30, tilt -2deg, +60px offset) */}
            {deck[2] && (
              <div
                ref={card3Ref}
                className="absolute inset-0 z-30 will-change-transform"
              >
                <TestimonialCard item={deck[2]} />
              </div>
            )}

            {/* Card 4 (z-20, tilt +4deg) */}
            {deck[3] && (
              <div
                ref={card4Ref}
                className="absolute inset-0 z-20 will-change-transform"
              >
                <TestimonialCard item={deck[3]} />
              </div>
            )}

            {/* Card 5 (Bottom of stack, stays settled at 0deg, z-10, tilt -3deg) */}
            {deck[4] && (
              <div
                ref={card5Ref}
                className="absolute inset-0 z-10 will-change-transform"
              >
                <TestimonialCard item={deck[4]} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky 220vh Container (<1024px) */}
      <div
        ref={mContainerRef}
        className="relative w-full h-[220vh] lg:hidden overflow-visible"
      >
        <div className="sticky top-[calc((100vh-366px)/2)] h-[366px] w-full flex flex-col items-center justify-center overflow-visible px-4">
          {/* Headline "Wall of love": fully readable, unclipped */}
          <div className="pointer-events-none select-none z-0 px-4">
            <h2
              ref={mWallTextRef}
              className="font-semibold tracking-[-0.03em] leading-[0.95] text-center will-change-transform max-w-[88vw] text-[68px] min-[375px]:text-[74px] min-[390px]:text-[80px] sm:text-[96px]"
              style={{ fontWeight: 600, color: "#9CA3AF" }}
            >
              Wall of<br />love
            </h2>
          </div>

          {/* Deck sits exactly 24px below the bottom of "love" */}
          <div
            ref={mDeckWrapperRef}
            className="mt-6 relative w-[300px] max-w-[86vw] h-[190px] z-20 will-change-transform pointer-events-auto"
          >
            {/* Card 1 */}
            {deck[0] && (
              <div
                ref={mCard1Ref}
                className="absolute inset-0 z-50 will-change-transform"
              >
                <TestimonialCard item={deck[0]} />
              </div>
            )}

            {/* Card 2 */}
            {deck[1] && (
              <div
                ref={mCard2Ref}
                className="absolute inset-0 z-40 will-change-transform"
              >
                <TestimonialCard item={deck[1]} />
              </div>
            )}

            {/* Card 3 */}
            {deck[2] && (
              <div
                ref={mCard3Ref}
                className="absolute inset-0 z-30 will-change-transform"
              >
                <TestimonialCard item={deck[2]} />
              </div>
            )}

            {/* Card 4 */}
            {deck[3] && (
              <div
                ref={mCard4Ref}
                className="absolute inset-0 z-20 will-change-transform"
              >
                <TestimonialCard item={deck[3]} />
              </div>
            )}

            {/* Card 5 */}
            {deck[4] && (
              <div
                ref={mCard5Ref}
                className="absolute inset-0 z-10 will-change-transform"
              >
                <TestimonialCard item={deck[4]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerSection;