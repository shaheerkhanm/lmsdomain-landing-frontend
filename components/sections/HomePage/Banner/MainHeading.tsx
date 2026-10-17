"use client";

import React, { useState, useEffect } from "react";

const WORDS = [
  { word: "teach", bg: "bg-[#E0D7FE]", text: "text-[#5B21B6]" },
  { word: "scale", bg: "bg-[#FDE68A]", text: "text-[#92400E]" },
  { word: "protect", bg: "bg-[#BAE6FD]", text: "text-[#0369A1]" },
  { word: "certify", bg: "bg-[#FED7AA]", text: "text-[#C2410C]" },
];

export function MainHeading({ data }: { data?: any }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const current = WORDS[index];

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto font-inter">
      <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold tracking-tight text-slate-900 leading-[1.12]">
        <span>Meet all-in-one platform</span>
        <span className="block mt-2 sm:mt-3">
          to{" "}
          <span
            key={current.word}
            className={`inline-flex items-center px-4 sm:px-6 py-0.5 sm:py-1 rounded-full text-3xl sm:text-5xl lg:text-[60px] font-medium transition-all duration-300 ease-out animate-in fade-in zoom-in-95 ${current.bg} ${current.text} align-middle shadow-2xs mx-1 sm:mx-2`}
          >
            {current.word}
          </span>{" "}
          <span className="text-slate-900">at global scale</span>
        </span>
      </h1>
    </div>
  );
}

export default MainHeading;