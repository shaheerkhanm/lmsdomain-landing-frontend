"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/marketing/ui";

const SOLUTIONS = [
  {
    title: "Coaching institutes",
    href: "/solutions/coaching-institutes",
    image: "/images/features/audience-institutes.webp",
  },
  {
    title: "Language & test-prep academies",
    href: "/solutions/language-test-prep-academies",
    image: "/images/features/cohort-workshop.webp",
  },
  {
    title: "Training companies",
    href: "/solutions/training-companies",
    image: "/images/features/team-training-office.webp",
  },
  {
    title: "Solo educators",
    href: "/solutions/solo-educators",
    image: "/images/features/audience-coaches.webp",
  },
];

export function HomeSolutionsSection() {
  return (
    <section className="py-[clamp(72px,9vw,128px)] pt-0 font-sans" id="solutions">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="rv-v4">
          <Eyebrow tone="gradient">Solutions</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            Made for the way you teach
          </h2>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-10">
          {SOLUTIONS.map((sol) => (
            <Link
              key={sol.href}
              href={sol.href}
              className="rv-v4 group relative rounded-[18px] overflow-hidden aspect-[3/4] text-white no-underline isolate flex flex-col justify-end p-4 shadow-sm"
            >
              {/* Photo Background */}
              <Image
                src={sol.image}
                alt={sol.title}
                fill
                sizes="(max-width: 980px) 50vw, 25vw"
                loading="lazy"
                className="object-cover -z-20 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Title & Glass Arrow Tile */}
              <div className="flex justify-between items-end gap-2.5 w-full">
                <b className="text-[15px] sm:text-[17px] font-semibold tracking-[-0.02em] leading-[1.2]">
                  {sol.title}
                </b>
                <span className="w-[30px] h-[30px] rounded-[9px] bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
                    <path d="M5 11 11 5M6 5h5v5" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeSolutionsSection;
