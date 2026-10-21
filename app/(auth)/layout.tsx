import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-urbanist">
      <div className="mb-8">
        <Link href="/" aria-label="LMS Domain Home">
          <img
            src="/assets/img/logo/logo.svg"
            alt="LMS Domain Logo"
            className="h-8 md:h-9 w-auto object-contain"
          />
        </Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        {children}
      </div>
    </div>
  );
}
