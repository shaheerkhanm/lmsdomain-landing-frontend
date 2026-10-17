"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeadingAnimateText({ data }: { data: any }) {
  const words: string[] = Array.isArray(data?.tags) && data.tags.length > 0
    ? data.tags
    : ["Launch", "Scale", "Monetize"];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-block relative overflow-hidden align-baseline min-w-[120px] sm:min-w-[160px] text-right font-extrabold text-MainColor">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentIndex]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default HeadingAnimateText;
