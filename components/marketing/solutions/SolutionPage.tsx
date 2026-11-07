"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Eyebrow, CTABand, ScreenshotFrame } from "@/components/marketing/ui";
import { FAQ } from "@/components/marketing/ui/FAQ";
import {
  TestsScreen,
  CoursesScreen,
  BatchScheduleScreen,
} from "@/components/marketing/mockups/screens";
import { SolutionPageData } from "@/content/solutions/types";
import {
  CalendarRange,
  Video,
  CheckSquare,
  CreditCard,
  Users,
  UserCheck,
  Building2,
  BarChart3,
  Award,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  CalendarRange,
  Video,
  CheckSquare,
  CreditCard,
  Users,
  UserCheck,
  Building2,
  BarChart3,
  Award,
  Sparkles,
};

export interface SolutionPageProps {
  data: SolutionPageData;
  clientLogo?: {
    name?: string;
    logo?: string;
    url?: string;
  };
}

function getSolutionScreen(slug: string) {
  switch (slug) {
    case "language-test-prep-academies":
      return <TestsScreen />;
    case "training-companies":
      return <CoursesScreen />;
    default:
      return <BatchScheduleScreen />;
  }
}

export function SolutionPage({ data, clientLogo }: SolutionPageProps) {
  return (
    <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
      {/* 1. Hero & Outcome H1 */}
      <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <Eyebrow tone="violet">{data.eyebrow}</Eyebrow>

          {/* Single H1 on the page */}
          <h1 className="type-h1 text-[#161616] max-w-4xl tracking-tight mt-4">
            {data.title}
          </h1>

          <p className="type-body text-[#6B6F76] mt-5 max-w-2xl leading-relaxed">
            {data.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-[#161616] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#2A2A2A] transition-colors"
            >
              Book a live demo
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center justify-center rounded-full border border-[#D5D2CA] bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-[#161616] hover:bg-[#FAF9F6] transition-colors gap-1.5"
            >
              <span>Explore all features</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* ScreenshotFrame with coded mockup */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-12 sm:mt-16 w-full max-w-5xl min-w-0 overflow-hidden"
          >
            <ScreenshotFrame
              screen={getSolutionScreen(data.slug)}
              title={`${data.eyebrow} Platform Interface`}
              alt={data.title}
              className="shadow-xl ring-1 ring-black/5"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Customer Logo Highlight (e.g. IELTS Master for language academies) */}
      {clientLogo && clientLogo.logo && (
        <section className="py-10 border-y border-[#EAE8E2] bg-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#6B6F76]">
              Trusted by leading academies:
            </span>
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-auto max-w-[180px] flex items-center justify-center">
                <Image
                  src={clientLogo.logo}
                  alt={clientLogo.name || "Academy partner"}
                  width={180}
                  height={44}
                  className="h-full w-auto object-contain max-h-10"
                />
              </div>
              {clientLogo.name && (
                <span className="text-sm font-bold text-[#161616]">
                  {clientLogo.name}
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. Core Solution Capabilities */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Eyebrow tone="emerald">BUILT FOR YOUR WORKFLOW</Eyebrow>
          <h2 className="type-h2 text-[#161616] mt-3">
            {data.sectionHeading || "Everything structured around how your team teaches"}
          </h2>
          <p className="type-body text-[#6B6F76] mt-3">
            Say goodbye to stitching multiple tools together. Run batches, live meetings, assessments and billing in one unified system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {data.features.map((feat, idx) => {
            const Icon = (feat.icon && ICON_MAP[feat.icon]) || Sparkles;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="rounded-3xl bg-white border border-[#EAE8E2] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="size-12 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center text-[#7B5CF5] mb-5 shadow-2xs">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-[#161616] mb-3 leading-snug">
                    {feat.tagline}
                  </p>
                  <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2EFE9] flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7B5CF5]">
                  <Check className="size-4" />
                  <span>Ready out of the box</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Platform Capabilities in Action (Internal Linking) */}
      {data.platformLinks && data.platformLinks.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#EAE8E2]">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Eyebrow tone="violet">PLATFORM CAPABILITIES</Eyebrow>
            <h2 className="type-h2 text-[#161616] mt-3">
              Explore key platform pillars
            </h2>
            <p className="type-body text-[#6B6F76] mt-3">
              Learn how LMS Domain powers every stage of course delivery, evaluation, and operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {data.platformLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group rounded-3xl bg-white border border-[#EAE8E2] p-6 flex flex-col justify-between shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7B5CF5]">
                    Platform Feature
                  </span>
                  <h3 className="text-lg font-bold text-[#161616] tracking-tight mt-1 mb-2 group-hover:text-[#6842ED] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-[#6B6F76] leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#161616] group-hover:text-[#6842ED] transition-colors">
                  <span>Explore pillar</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. Solution FAQs with automatic FAQPage JSON-LD */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="bg-white border-t border-[#EAE8E2]">
          <FAQ
            items={data.faqs}
            title="Frequently asked questions"
            subtitle="Everything you need to know about setting up and running your academy on LMS Domain."
            eyebrow="QUESTIONS & ANSWERS"
            className="py-16 sm:py-20"
          />
        </section>
      )}

      {/* 6. CTABand */}
      <CTABand
        title={data.ctaTitle || "See your academy running on LMS Domain."}
        subtitle={
          data.ctaSubtitle ||
          "Book a 20-minute demo. We'll show you how it works with your curriculum structure."
        }
        buttonText={data.ctaButtonText || "Book a demo"}
        tone="dark"
      />
    </div>
  );
}

export default SolutionPage;

