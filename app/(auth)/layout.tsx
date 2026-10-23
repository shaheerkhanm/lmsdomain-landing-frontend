import React from "react";
import Link from "next/link";
import { getAuthCopyWithSource } from "@/lib/api/content";
import { ContentSource } from "@/components/content/ContentSource";
import { AuthVisualPanel } from "@/components/marketing/AuthVisualPanel";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { copy: authCopy, source } = await getAuthCopyWithSource();

  return (
    <ContentSource id="auth-copy" source={source}>
    <div className="min-h-screen w-full bg-white font-urbanist flex flex-col lg:flex-row antialiased">
      {/* Left 45% Column */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 min-h-screen bg-white">
        {/* Header Bar */}
        <header className="w-full flex items-center justify-between">
          <Link
            href="/"
            aria-label="LMS Domain Home"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              src="/assets/img/logo/mark-square.svg"
              alt="LMS Domain"
              className="size-8 rounded-lg object-contain shadow-xs transition-transform group-hover:scale-105"
            />
            <span className="font-urbanist font-bold text-[18px] text-[#161616] tracking-tight">
              LMS Domain
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#161616] bg-white border border-[#ECEDEF] hover:bg-[#F3F4F6] transition-all cursor-pointer shadow-2xs"
          >
            <span>←</span>
            <span>Back to site</span>
          </Link>
        </header>

        {/* Vertically Centered Form Column */}
        <main className="w-full max-w-[400px] mx-auto my-auto py-10 sm:py-12">
          {children}
        </main>

        {/* Footer Notice */}
        <footer className="w-full text-left text-xs text-[#8F94A0] pt-4">
          <p>© {new Date().getFullYear()} LMS Domain. All rights reserved.</p>
        </footer>
      </div>

      {/* Right 55% Column (Desktop only >= 1024px, 16px inset and radius 32px) */}
      <aside className="hidden lg:flex lg:w-[55%] h-screen p-4 xl:p-5 sticky top-0 bg-white">
        <AuthVisualPanel sidePanel={authCopy.sidePanel} />
      </aside>
    </div>
    </ContentSource>
  );
}
