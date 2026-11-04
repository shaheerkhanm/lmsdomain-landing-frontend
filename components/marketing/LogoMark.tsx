"use client";

import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";

export function LogoMark({ className = "size-10 sm:size-12" }: { className?: string }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center transition-transform hover:scale-105"
      aria-label="LMS Domain home"
    >
      <BrandLogo
        variant="mark"
        className={`${className} object-contain`}
      />
    </Link>
  );
}

export default LogoMark;
