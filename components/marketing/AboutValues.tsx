"use client";

import React from "react";
import { motion } from "motion/react";
import SectionHeader from "./SectionHeader";
import type { AboutValues as AboutValuesType } from "@/types/content";

interface AboutValuesProps {
  data?: AboutValuesType;
}

export function AboutValues({ data }: AboutValuesProps) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Core Values"
          title={data.title || "Guiding Principles That Drive Us"}
          subtitle={
            data.subtitle ||
            "The fundamental commitments behind every product decision, curriculum architecture, and learner interaction."
          }
          align="center"
        />

        {/* 3-Column Grid of Cards (radius 28px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
          {data.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
              className="relative rounded-[28px] bg-white border border-[#ECEDEF] p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Faint 16px grid pattern at 4% opacity (§Prompt 03) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative z-10">
                {/* 48px Pastel Diamond Dot (or CMS Icon) */}
                {item.icon ? (
                  <div className="size-12 rounded-2xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-6 shadow-xs">
                    <img src={item.icon} alt="" className="size-6 object-contain" />
                  </div>
                ) : (
                  <div className="size-12 rounded-2xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-6 shadow-xs">
                    <div className="size-4 rotate-45 rounded-xs bg-[#7B5CF5]" />
                  </div>
                )}

                <h3 className="text-[20px] font-semibold text-[#161616] tracking-tight mb-2.5">
                  {item.title}
                </h3>

                <p className="text-[15px] text-[#6B6F76] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutValues;

