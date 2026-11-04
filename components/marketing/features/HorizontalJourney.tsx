"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface JourneyStep {
  step: string;
  name: string;
  action: string;
  categorySlug: string;
  description: string;
  features: { title: string; slug: string }[];
  photoSrc?: string;
  photoAlt?: string;
}

const JOURNEY_PANELS: JourneyStep[] = [
  {
    step: "01",
    name: "Create",
    action: "Author Content",
    categorySlug: "course-learning",
    description:
      "Organize lessons into modular curriculums with video watermarking, document lessons, and scheduled drip release.",
    features: [
      { title: "Structured Courses", slug: "structured-courses" },
      { title: "Video Watermarking", slug: "video-watermarking" },
      { title: "Scheduled Content Release", slug: "scheduled-content-release" },
      { title: "Course Certificates", slug: "course-certificates" },
    ],
    photoSrc: "/images/features/audience-institutes.webp",
    photoAlt: "Course author organizing structured academy lessons",
  },
  {
    step: "02",
    name: "Teach",
    action: "Teach Live",
    categorySlug: "live-and-cohort-learning",
    description:
      "Broadcast interactive live bootcamps, schedule Zoom classes, and provide 1-on-1 personalized instructor booking.",
    features: [
      { title: "Live Classes with Zoom", slug: "live-classes-with-zoom" },
      { title: "Cohort-Based Bootcamps", slug: "cohort-based-bootcamps" },
      { title: "One-to-One Tutor Booking", slug: "one-to-one-tutor-booking" },
      { title: "Team Training Packages", slug: "team-training-packages" },
    ],
    photoSrc: "/images/features/live-class-screen.webp",
    photoAlt: "Interactive live class session on laptop screen",
  },
  {
    step: "03",
    name: "Assess",
    action: "Assess Mastery",
    categorySlug: "assessment-and-evaluation",
    description:
      "Verify student competence with auto-graded quizzes, in-video checkpoint popups, and manual assignment reviews.",
    features: [
      { title: "Graded Quizzes", slug: "graded-quizzes" },
      { title: "In-Video Checkpoint Quizzes", slug: "in-video-checkpoint-quizzes" },
      { title: "Assignments and Instructor Reviews", slug: "assignments-and-instructor-reviews" },
    ],
    photoSrc: "/images/features/cohort-workshop.webp",
    photoAlt: "Learners completing hands-on course checkpoint assessment",
  },
  {
    step: "04",
    name: "Engage",
    action: "Engage Learners",
    categorySlug: "learner-engagement",
    description:
      "Keep course completion rates high through points, leaderboards, community discussion forums, and awards.",
    features: [
      { title: "Leaderboards and Points", slug: "leaderboards-and-points" },
      { title: "Achievements and Points", slug: "achievements-and-points" },
      { title: "Course Discussion Forums", slug: "course-discussion-forums" },
      { title: "Watch-Percentage Completion", slug: "watch-percentage-completion" },
    ],
    photoSrc: "/images/features/audience-coaches.webp",
    photoAlt: "Students actively engaged in academy community forum",
  },
  {
    step: "05",
    name: "Sell",
    action: "Sell Globally",
    categorySlug: "course-sales-and-payments",
    description:
      "Accept credit cards, digital wallets, and bank transfers worldwide with coupons, carts, and split payouts.",
    features: [
      { title: "Course Catalogue, Cart, and Wishlist", slug: "course-catalogue-cart-and-wishlist" },
      { title: "Multiple Payment Gateways", slug: "multiple-payment-gateways" },
      { title: "Coupons and Discounts", slug: "coupons-and-discounts" },
      { title: "Instructor Payouts and Revenue Reports", slug: "instructor-payouts-and-revenue-reports" },
    ],
    photoSrc: "/images/features/course-checkout-browsing.webp",
    photoAlt: "Checkout screen processing course enrollment",
  },
  {
    step: "06",
    name: "Grow",
    action: "Grow Brand",
    categorySlug: "branding-website-and-reach",
    description:
      "Stand out with your custom root domain, SSL encryption, tailored brand palette, newsletters, and SEO control.",
    features: [
      { title: "Custom Domain with SSL", slug: "custom-domain-with-ssl" },
      { title: "Homepage Builder", slug: "homepage-builder" },
      { title: "Per-School Branding", slug: "per-school-branding" },
      { title: "SEO Management", slug: "seo-management" },
    ],
    photoSrc: "/images/features/audience-corporate.webp",
    photoAlt: "Branded corporate academy dashboard",
  },
];

export function HorizontalJourney({ content }: { content?: any }) {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop ≥1024px: Pinned horizontal track scroll
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
      });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
        pin: true,
        animation: tween,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      });

      return () => {
        st.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="features-journey"
      className="bg-white py-16 sm:py-20 lg:py-24 font-urbanist relative overflow-hidden border-b border-[#F0F1F3]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-10 lg:mb-14">
        {/* Progress Line on Desktop */}
        <div className="hidden lg:block w-full h-1 bg-[#F3F4F6] rounded-full overflow-hidden mb-8">
          <div
            ref={progressBarRef}
            className="h-full bg-[#7B5CF5] transition-all duration-150 ease-out rounded-full"
            style={{ width: prefersReduced ? "100%" : "0%" }}
          />
        </div>

        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3F4F6] text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em] mb-4">
            <span>✦</span>
            <span>{content?.eyebrow ? content.eyebrow.replace(/^✦\s*/, "") : "ACADEMY LIFECYCLE"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#161616] tracking-tight leading-[1.15] mb-3">
            {content?.title || "Your Academy, Start to Finish"}
          </h2>

          <p className="text-base sm:text-lg text-[#6B6F76] leading-relaxed">
            {content?.subtitle ||
              "Follow the complete operational lifecycle from first course draft to global brand scale."}
          </p>
        </div>
      </div>

      {/* Desktop Horizontal Track (≥1024px) */}
      <div className="hidden lg:block pl-6 sm:pl-12 lg:pl-20">
        <div
          ref={trackRef}
          className="flex items-stretch gap-8 will-change-transform pb-8"
          style={{ width: "max-content" }}
        >
          {JOURNEY_PANELS.map((panel) => (
            <div
              key={panel.step}
              className="w-[520px] rounded-[32px] bg-[#F9FAFB] border border-[#E5E7EB] p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow shrink-0 relative group"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-5xl font-black text-transparent select-none"
                    style={{ WebkitTextStroke: "1.5px #C9CCD1" }}
                  >
                    {panel.step}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-bold text-[#7B5CF5] shadow-2xs">
                    {panel.name}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#161616] tracking-tight mb-2">
                  {panel.action}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#6B6F76] leading-relaxed mb-6">
                  {panel.description}
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {panel.features.map((f) => (
                    <Link
                      key={f.slug}
                      href={`#${f.slug}`}
                      data-marquee="true"
                      aria-hidden="true"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#EEE9FF] border border-[#E5E7EB] hover:border-[#7B5CF5]/40 text-xs font-semibold text-[#161616] transition-colors shadow-2xs group/chip cursor-pointer"
                    >
                      <CheckCircle2 className="size-3 text-[#7B5CF5]" />
                      <span data-marquee="true" className="truncate max-w-[180px]">{f.title}</span>
                      <ArrowRight className="size-3 text-[#8F94A0] group-hover/chip:translate-x-0.5 group-hover/chip:text-[#7B5CF5] transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Photo Frame */}
              {panel.photoSrc && (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-[#E5E7EB] shadow-xs mt-auto">
                  <Image
                    src={panel.photoSrc}
                    alt={panel.photoAlt || panel.name}
                    fill
                    sizes="520px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[10px] font-semibold text-white">
                    Step {panel.step} · {panel.name}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Connected Timeline (<1024px) */}
      <div className="lg:hidden max-w-[600px] mx-auto px-4 sm:px-6 relative">
        {/* Connected Vertical Timeline Line */}
        <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-[#E5E7EB]" />

        <div className="space-y-8">
          {JOURNEY_PANELS.map((panel) => (
            <div
              key={panel.step}
              className="relative pl-12 sm:pl-14 space-y-4 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-5 sm:p-6"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-3.5 top-6 size-7 rounded-full bg-white border-2 border-[#7B5CF5] flex items-center justify-center font-bold text-xs text-[#7B5CF5] shadow-sm">
                {panel.step}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B5CF5]">
                  Step {panel.step} · {panel.name}
                </span>
                <h3 className="text-xl font-bold text-[#161616] tracking-tight mt-1 mb-2">
                  {panel.action}
                </h3>
                <p className="text-xs text-[#6B6F76] leading-relaxed mb-4">
                  {panel.description}
                </p>

                {/* Mobile Feature Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {panel.features.map((f) => (
                    <Link
                      key={f.slug}
                      href={`#${f.slug}`}
                      data-marquee="true"
                      aria-hidden="true"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-medium text-[#161616]"
                    >
                      <span data-marquee="true">{f.title}</span>
                      <ArrowRight className="size-3 text-[#7B5CF5]" />
                    </Link>
                  ))}
                </div>
              </div>

              {panel.photoSrc && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-[#E5E7EB]">
                  <Image
                    src={panel.photoSrc}
                    alt={panel.photoAlt || panel.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HorizontalJourney;
