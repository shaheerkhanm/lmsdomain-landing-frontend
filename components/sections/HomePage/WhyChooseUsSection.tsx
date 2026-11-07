"use client";

import React from "react";
import { Section, Eyebrow } from "@/components/marketing/ui";
import { CalendarRange, Coins, UsersRound } from "lucide-react";

export function WhyChooseUsSection() {
  const reasons = [
    {
      icon: CalendarRange,
      title: "Built for batches",
      description:
        "Most course platforms are built to sell recorded videos. LMS Domain is built around schedules, batches and live teaching.",
    },
    {
      icon: Coins,
      title: "Sell in any currency",
      description:
        "Indian and international gateways on one checkout.",
    },
    {
      icon: UsersRound,
      title: "Set up with you",
      description:
        "Our team helps move your courses and learners in and trains your staff.",
    },
  ];

  return (
    <Section tone="warm" spacing="default">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <Eyebrow tone="violet">THE DIFFERENCE</Eyebrow>
        <h2 className="type-h2 text-[#161616] mt-3">
          Why do coaching institutes and academies choose LMS Domain?
        </h2>
        <p className="type-body text-[#6B6F76] mt-3">
          A platform purpose-built for the daily operations of live teaching academies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reasons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-[#EAE8E2] p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <div className="size-11 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center text-[#7B5CF5] mb-5">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-[#161616] tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default WhyChooseUsSection;
