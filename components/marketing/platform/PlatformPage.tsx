"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Section,
  Eyebrow,
  ScreenshotFrame,
  CTABand,
} from "@/components/marketing/ui";
import {
  CoursesScreen,
  BatchScheduleScreen,
  TestsScreen,
  PaymentsScreen,
  BrandedSiteScreen,
  DashboardScreen,
  DomieScreen,
} from "@/components/marketing/mockups/screens";
import { PlatformPageData } from "@/content/platform/types";
import {
  BookOpen,
  CalendarClock,
  Video,
  Users,
  UserCheck,
  CheckSquare,
  FileCheck,
  PlayCircle,
  Award,
  CalendarRange,
  User,
  ClipboardCheck,
  ShieldAlert,
  Bell,
  ShoppingCart,
  Tag,
  CreditCard,
  Globe,
  Receipt,
  BarChart3,
  Globe2,
  LayoutTemplate,
  Palette,
  Search,
  BookOpenCheck,
  MessageSquare,
  PenTool,
  LineChart,
  Command,
  Lock,
  Server,
  FileText,
  Sparkles,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  CalendarClock,
  Video,
  Users,
  UserCheck,
  CheckSquare,
  FileCheck,
  PlayCircle,
  Award,
  CalendarRange,
  User,
  ClipboardCheck,
  ShieldAlert,
  Bell,
  ShoppingCart,
  Tag,
  CreditCard,
  Globe,
  Receipt,
  BarChart3,
  Globe2,
  LayoutTemplate,
  Palette,
  Search,
  BookOpenCheck,
  MessageSquare,
  PenTool,
  LineChart,
  Command,
  Lock,
  Server,
  FileText,
  Sparkles,
  Smartphone,
};

export interface PlatformPageProps {
  data: PlatformPageData;
}

function getPlatformScreen(slug: string) {
  switch (slug) {
    case "teach":
      return <CoursesScreen />;
    case "assess":
      return <TestsScreen />;
    case "manage":
      return <BatchScheduleScreen />;
    case "sell":
      return <PaymentsScreen />;
    case "brand":
      return <BrandedSiteScreen />;
    case "security":
      return <DashboardScreen />;
    case "ai":
      return <DomieScreen />;
    default:
      return <DashboardScreen />;
  }
}

export function PlatformPage({ data }: PlatformPageProps) {
  return (
    <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
      {/* 1. Hero & Outcome H1 */}
      <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Eyebrow tone="violet">{data.eyebrow}</Eyebrow>
            {data.badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/10 text-[#7B5CF5] border border-violet-500/20 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="size-3.5" />
                {data.badge}
              </span>
            )}
          </div>

          {/* Single H1 on page */}
          <h1 className="type-h1 text-[#161616] max-w-4xl tracking-tight">
            {data.title}
          </h1>

          <p className="type-body text-[#6B6F76] mt-4 max-w-2xl leading-relaxed">
            {data.subtitle}
          </p>

          {/* 2. One ScreenshotFrame with <=300ms whileInView fade */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-10 sm:mt-12 w-full max-w-5xl"
          >
            <ScreenshotFrame
              screen={getPlatformScreen(data.slug)}
              title={data.frameTitle}
              alt={data.frameAlt}
              className="shadow-xl ring-1 ring-black/5"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. Features Grid (3 to 5 features, each a title + one-line benefit) */}
      <Section tone="white" spacing="default">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Eyebrow tone="violet">KEY CAPABILITIES</Eyebrow>
          <h2 className="type-h2 text-[#161616] mt-3">
            Built for everyday academy workflows
          </h2>
          <p className="type-body text-[#6B6F76] mt-3">
            Designed to give teachers and administrators complete control without complexity.
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto",
            data.features.length >= 3 && "lg:grid-cols-3",
            data.features.length === 4 && "lg:grid-cols-2"
          )}
        >
          {data.features.map((feat, idx) => {
            const Icon = (feat.icon && ICON_MAP[feat.icon]) || Sparkles;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#FAF9F6] border border-[#EAE8E2] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <div className="size-11 rounded-2xl bg-white border border-[#EAE8E2] flex items-center justify-center text-[#7B5CF5] mb-5 shadow-2xs">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#161616] tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4. "Used for" Block Linking to Solution Pages */}
      {data.usedFor && data.usedFor.length > 0 && (
        <Section tone="warm" spacing="default">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <Eyebrow tone="emerald">SOLUTIONS IN ACTION</Eyebrow>
              <h2 className="type-h2 text-[#161616] mt-3">
                Used by growing academies
              </h2>
              <p className="type-body text-[#6B6F76] mt-3">
                See how different education businesses apply these capabilities.
              </p>
            </div>

            <div
              className={cn(
                "grid grid-cols-1 gap-6",
                data.usedFor.length > 1 ? "sm:grid-cols-2" : "max-w-xl mx-auto"
              )}
            >
              {data.usedFor.map((sol, idx) => (
                <Link
                  key={idx}
                  href={sol.href}
                  className="group rounded-3xl bg-white border border-[#EAE8E2] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7B5CF5]">
                      Solution
                    </span>
                    <h3 className="text-xl font-bold text-[#161616] tracking-tight mt-1 mb-2 group-hover:text-[#6842ED] transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed">
                      {sol.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[#161616] group-hover:text-[#6842ED] transition-colors">
                    <span>Explore solution</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 5. CTABand */}
      <CTABand
        title={data.ctaTitle || "See your academy running on LMS Domain."}
        subtitle={
          data.ctaSubtitle ||
          "Book a 20-minute demo. We'll show it with your own course structure."
        }
        buttonText={data.ctaButtonText || "Book a demo"}
        tone="dark"
      />
    </div>
  );
}

export default PlatformPage;

