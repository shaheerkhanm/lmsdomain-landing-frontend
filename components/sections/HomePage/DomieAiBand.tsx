"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageSquareText, FileEdit, BarChart3 } from "lucide-react";
import { ScreenshotFrame } from "@/components/marketing/ui";
import { DomieScreen } from "@/components/marketing/mockups/screens";

export function DomieAiBand() {
  const capabilities = [
    {
      icon: MessageSquareText,
      title: "HelpDesk AI tutor",
      desc: "Answers learner questions, grounded in your course content.",
    },
    {
      icon: FileEdit,
      title: "Course content drafts",
      desc: "Drafts course titles, descriptions and learning outcomes.",
    },
    {
      icon: BarChart3,
      title: "Prescriptive analytics",
      desc: "Highlights learners who may need help.",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-[#161616] text-white font-urbanist relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pb-12 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              <span>Pro</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              An AI teaching assistant grounded in your courses
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Designed specifically for academies to reduce repetitive support and assist course authors without inventing facts.
            </p>
            <div className="pt-2">
              <Link
                href="/platform/ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#161616] hover:bg-slate-100 text-sm font-semibold transition-all shadow-sm active:scale-95"
              >
                <span>Explore Domie AI</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 w-full min-w-0">
            <ScreenshotFrame
              screen={<DomieScreen compact />}
              title="lmsdomain.com/admin/domie-ai"
              alt="Domie AI assistant answering academy queries with zero hallucination"
              className="shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>

        {/* 3 feature lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="size-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                  <Icon className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DomieAiBand;

