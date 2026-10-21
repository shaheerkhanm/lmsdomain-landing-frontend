import React from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Trophy, Timer } from "lucide-react";

interface RelatedToolItem {
  title: string;
  description: string;
  badge: string;
  href: string;
  icon?: string;
}

interface AiRelatedToolsProps {
  title?: string;
  subtitle?: string;
  items?: RelatedToolItem[];
}

export function AiRelatedTools({
  title = "Related Premium Capabilities",
  subtitle = "Interactive engagement and verification tools that complement Domie AI.",
  items = [
    {
      title: "In-Video Checkpoint Quizzes",
      description:
        "Insert questions at specific points in a video. Playback pauses until learners answer the checkpoint question and continue.",
      badge: "Premium",
      href: "/features#assessment-and-evaluation",
      icon: "PlayCircle",
    },
    {
      title: "Leaderboards and Points",
      description:
        "Show rankings based on learner progress and points to encourage participation and healthy competition.",
      badge: "Premium",
      href: "/features#learner-engagement",
      icon: "Trophy",
    },
    {
      title: "Watch-Percentage Completion",
      description:
        "Mark a video lesson as complete after the learner watches the configured percentage of its duration.",
      badge: "Premium",
      href: "/features#learner-engagement",
      icon: "Timer",
    },
  ],
}: AiRelatedToolsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#F3F4F6] py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-left max-w-2xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-3.5">
            <span>✦</span>
            <span>COMPLEMENTARY ADD-ONS</span>
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-semibold leading-[1.15] tracking-tight text-[#161616] mb-3">
            {title}
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#6B6F76] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 3 Small Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.href}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#ECEDEF] p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="size-10 rounded-2xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center shrink-0">
                    {idx === 0 && <PlayCircle className="w-5 h-5" />}
                    {idx === 1 && <Trophy className="w-5 h-5" />}
                    {idx === 2 && <Timer className="w-5 h-5" />}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-[19px] sm:text-[21px] font-bold text-[#161616] tracking-tight mb-2.5 group-hover:text-[#7B5CF5] transition-colors">
                  {tool.title}
                </h3>

                <p className="text-[14px] text-[#6B6F76] leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between text-xs font-semibold text-[#161616]">
                <span>Explore in catalog</span>
                <ArrowRight className="w-4 h-4 text-[#8F94A0] group-hover:text-[#7B5CF5] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AiRelatedTools;
