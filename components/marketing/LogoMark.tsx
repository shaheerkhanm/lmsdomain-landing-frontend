import React from "react";
import Link from "next/link";

export function LogoMark({ className = "size-10 sm:size-12" }: { className?: string }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center transition-transform hover:scale-105"
      aria-label="LMS Domain Home"
    >
      <img
        src="/assets/img/logo/mark-square.svg"
        alt="LMS Domain Mark"
        className={`${className} rounded-xl object-contain shadow-xs`}
      />
    </Link>
  );
}

export default LogoMark;
