"use client";

import React from "react";
import KeywordPill from "./KeywordPill";
import { heroContent } from "@/content/home/hero";

export function MainHeading({ data }: { data?: any }) {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto font-urbanist">
      <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold tracking-tight text-[#161616] leading-[1.12]">
        <span className="block">{heroContent.titlePrefix}</span>
        <span className="block mt-2 sm:mt-3">
          to <KeywordPill />
        </span>
      </h1>
    </div>
  );
}

export default MainHeading;