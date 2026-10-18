"use client";

import React from "react";
import KeywordPill from "./KeywordPill";
import { heroContent } from "@/content/home/hero";

export function MainHeading({ data }: { data?: any }) {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto font-urbanist">
      <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#161616] leading-[1.12]">
        <span className="block">{heroContent.titlePrefix}</span>
        <span className="block mt-1 sm:mt-2">
          to <KeywordPill />
        </span>
      </h1>
    </div>
  );
}

export default MainHeading;