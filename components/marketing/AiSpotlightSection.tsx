import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Feature } from "@/types/content";
import { ArrowRight, Bot, Sparkles, LineChart, Command, Search } from "lucide-react";

interface AiSpotlightSectionProps {
  features: Feature[];
  media?: Record<string, any>;
}

export function AiSpotlightSection({ features, media }: AiSpotlightSectionProps) {
  const tutor = features.find((f) => f.slug === "helpdesk-ai-tutor");
  const generator = features.find((f) => f.slug === "domie-ai-content-generator");
  const analytics = features.find((f) => f.slug === "ai-prescriptive-analytics");
  const commandBar = features.find((f) => f.slug === "ai-command-bar");

  return (
    <section
      id="ai-powered-tools"
      className="bg-[#F3F4F6] py-[88px] lg:py-[130px] font-urbanist"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-left max-w-2xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-3.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5]">
              <span>✦</span>
              <span>DOMIE AI</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
              Premium
            </span>
          </div>

          <h2 className="text-[30px] sm:text-[38px] lg:text-[46px] font-semibold leading-[1.12] tracking-tight text-[#161616] mb-4">
            AI-Powered Tools That Work Inside Your Academy
          </h2>

          <p className="text-[16px] lg:text-[18px] text-[#6B6F76] leading-relaxed mb-4">
            Built directly into the learning workflow to tutor students, assist course creators, and surface actionable insights for academy admins.
          </p>

          <Link
            href="/ai"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#161616] hover:text-[#7B5CF5] transition-colors group cursor-pointer"
          >
            <span>Explore Domie AI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2x2 Grid of Large AI Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: HelpDesk AI Tutor (with real learner photo + chat mockup) */}
          <div
            data-feature-slug="helpdesk-ai-tutor"
            className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-7 sm:p-9 flex flex-col justify-between lg:grid lg:grid-rows-subgrid lg:row-span-2 lg:gap-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F3F4F6] text-[#161616]">
                  For learners
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                  Premium
                </span>
              </div>

              <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#161616] tracking-tight mb-2">
                {tutor?.title || "HelpDesk AI Tutor"}
              </h3>

              <p className="text-[15px] text-[#6B6F76] leading-relaxed mb-6">
                {tutor?.description ||
                  "Help learners ask questions about their course materials and receive answers grounded in the content of their own courses. Save conversations and maintain separate chat histories for each course."}
              </p>
            </div>

            {/* Visual Area: Real photo in 20px-radius frame + UI chat mockup */}
            <div className="space-y-4">
              {/* Photo with overlapping corner chip */}
              <div className="relative h-[160px] sm:h-[180px] rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-md group">
                <Image
                  src={tutor?.image || media?.["learner-studying-ai"]?.src || "/images/features/learner-studying-ai.webp"}
                  alt={tutor?.imageAlt || media?.["learner-studying-ai"]?.alt || "Student asking HelpDesk AI questions while studying on laptop"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-xs font-semibold text-white flex items-center gap-2 border border-white/15 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#7B5CF5] animate-pulse" />
                  <span>HelpDesk AI Tutor</span>
                </div>
              </div>

              {/* Chat Illustration */}
              <div
                aria-label="Illustration of the AI tutor"
                className="bg-[#F8FAFC] rounded-[24px] p-4 sm:p-5 border border-[#ECEDEF] space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#ECEDEF] text-xs text-[#6B6F76]">
                  <span className="font-medium text-[#161616]">Course: Modern Architecture</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E8F8F5] text-[#0D9488] font-semibold">Active Chat</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] shadow-2xs">
                  <p className="text-xs font-semibold text-[#161616] mb-1">Learner question</p>
                  <p className="text-xs text-[#6B6F76]">
                    "What is the difference between a quiz and an assignment in this module?"
                  </p>
                </div>

                <div className="bg-[#F3F4F6] p-3 rounded-xl border border-transparent">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] mb-1">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Domie AI response</span>
                  </div>
                  <p className="text-xs text-[#161616] leading-relaxed">
                    "Quizzes are auto-graded for immediate comprehension checks, whereas assignments require learner file submissions and instructor review."
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-[#8F94A0]">
                    <span className="px-1.5 py-0.5 rounded bg-white border border-[#ECEDEF]">Grounded in Module 2 Syllabus</span>
                    <span>• Chat saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Domie AI Content Generator */}
          <div
            data-feature-slug="domie-ai-content-generator"
            className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-7 sm:p-9 flex flex-col justify-between lg:grid lg:grid-rows-subgrid lg:row-span-2 lg:gap-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F3F4F6] text-[#161616]">
                  For course creators
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                  Premium
                </span>
              </div>

              <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#161616] tracking-tight mb-2">
                {generator?.title || "Domie AI Content Generator"}
              </h3>

              <p className="text-[15px] text-[#6B6F76] leading-relaxed mb-6">
                {generator?.description ||
                  "Help course creators draft course titles, descriptions, and learning outcomes with AI assistance."}
              </p>
            </div>

            {/* Visual Area: photo in the same frame as the tutor card + draft illustration */}
            <div className="space-y-4">
              <div className="relative h-[160px] sm:h-[180px] rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-md group">
                <Image
                  src={generator?.image || media?.["ai-content-generator"]?.src || "/images/features/ai-content-generator.webp"}
                  alt={generator?.imageAlt || media?.["ai-content-generator"]?.alt || "Course creators planning course content together on a laptop"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-xs font-semibold text-white flex items-center gap-2 border border-white/15 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#7B5CF5] animate-pulse" />
                  <span>Domie AI Content Generator</span>
                </div>
              </div>

            <div
              aria-label="Illustration of the AI content generator"
              className="bg-[#F8FAFC] rounded-[24px] p-4 sm:p-5 border border-[#ECEDEF] space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-[#6B6F76]">
                <span className="font-semibold text-[#161616]">Draft Assistant</span>
                <span className="inline-flex items-center gap-1 text-[#7B5CF5] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Suggested
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] shadow-2xs space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8F94A0] tracking-wider">Suggested Title</span>
                  <p className="text-xs font-semibold text-[#161616]">Full-Stack Web Engineering with TypeScript</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8F94A0] tracking-wider">Learning Outcomes</span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#161616]">✓ Production API design</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#161616]">✓ Database migrations</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2 text-xs text-[#6B6F76]">
                <span className="font-semibold text-[#161616]">Draft Ready</span>
                <span className="font-semibold text-[#161616]">Insert into Course →</span>
              </div>
            </div>
            </div>
          </div>

          {/* Card 3: AI Prescriptive Analytics */}
          <div
            data-feature-slug="ai-prescriptive-analytics"
            className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-7 sm:p-9 flex flex-col justify-between lg:grid lg:grid-rows-subgrid lg:row-span-2 lg:gap-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F3F4F6] text-[#161616]">
                  For administrators
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                  Premium
                </span>
              </div>

              <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#161616] tracking-tight mb-2">
                {analytics?.title || "AI Prescriptive Analytics"}
              </h3>

              <p className="text-[15px] text-[#6B6F76] leading-relaxed mb-6">
                {analytics?.description ||
                  "Provide administrators with concise insights and alerts about areas requiring attention, such as declining enrolments, expiring coupons, and low course engagement."}
              </p>
            </div>

            {/* Illustrative Visual */}
            <div
              aria-label="Illustration of prescriptive analytics alerts"
              className="bg-[#F8FAFC] rounded-[24px] p-4 sm:p-5 border border-[#ECEDEF] space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs pb-1 border-b border-[#ECEDEF]">
                <span className="font-semibold text-[#161616]">Attention Alerts</span>
                <span className="text-[#8F94A0]">Priority items</span>
              </div>

              <div className="space-y-2">
                <div className="bg-white p-2.5 rounded-xl border border-[#ECEDEF] flex items-start gap-2.5 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#161616]">Declining Enrolments</p>
                    <p className="text-[11px] text-[#6B6F76]">Enrolments are down on one course this month</p>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-[#ECEDEF] flex items-start gap-2.5 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#161616]">Expiring Promotional Coupon</p>
                    <p className="text-[11px] text-[#6B6F76]">Code 'EARLYBIRD' expires soon with remaining uses</p>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-[#ECEDEF] flex items-start gap-2.5 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#161616]">Course Engagement Check</p>
                    <p className="text-[11px] text-[#6B6F76]">Lesson 3 checkpoint quiz has lower completion rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: AI Command Bar */}
          <div
            data-feature-slug="ai-command-bar"
            className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-7 sm:p-9 flex flex-col justify-between lg:grid lg:grid-rows-subgrid lg:row-span-2 lg:gap-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F3F4F6] text-[#161616]">
                  For administrators
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                  Premium
                </span>
              </div>

              <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#161616] tracking-tight mb-2">
                {commandBar?.title || "AI Command Bar"}
              </h3>

              <p className="text-[15px] text-[#6B6F76] leading-relaxed mb-6">
                {commandBar?.description ||
                  "Provide a unified search interface across administrative pages, with AI-assisted answers to questions about the platform."}
              </p>
            </div>

            {/* Illustrative Visual */}
            <div
              aria-label="Illustration of the AI command bar search"
              className="bg-[#F8FAFC] rounded-[24px] p-4 sm:p-5 border border-[#ECEDEF] space-y-3"
            >
              <div className="bg-white px-3 py-2 rounded-xl border border-[#ECEDEF] flex items-center gap-2 shadow-2xs">
                <Search className="w-3.5 h-3.5 text-[#8F94A0]" />
                <span className="text-xs text-[#161616] font-medium">How do I configure custom certificates?</span>
                <span className="ml-auto px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[10px] font-mono text-[#8F94A0]">ESC</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#7B5CF5]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Platform Assistant Answer</span>
                </div>
                <p className="text-[11px] text-[#6B6F76]">
                  "Navigate to Courses &gt; Settings &gt; Certificate Templates, upload your background image, and place name merge tags."
                </p>
                <div className="pt-1 border-t border-[#F3F4F6] flex items-center justify-between text-[11px]">
                  <span className="text-[#8F94A0]">Shortcut</span>
                  <span className="font-semibold text-[#161616]">Jump to Certificate Settings →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSpotlightSection;
