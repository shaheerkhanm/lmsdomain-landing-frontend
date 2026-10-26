"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import EnquiryForm from "./common/EnquiryForm";
import { navigationConfig } from "@/content/navigation";

export function Header() {
  const pathname = usePathname();
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/forgot-password");

  const [showSubpageMenu, setShowSubpageMenu] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  // Close mobile menus on route change
  useEffect(() => {
    setShowSubpageMenu(false);
  }, [pathname]);

  // Lock body scroll and stop Lenis while subpage mobile menu is open
  useEffect(() => {
    if (showSubpageMenu) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop?.();
    } else {
      document.body.style.overflow = "";
      (window as any).lenis?.start?.();
    }
    return () => {
      document.body.style.overflow = "";
      (window as any).lenis?.start?.();
    };
  }, [showSubpageMenu]);

  // Escape key closes subpage mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSubpageMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isAuth) {
    return null;
  }

  // --------------------------------------------------------------------------
  // SITE NAVIGATION (same on every page, homepage included)
  // --------------------------------------------------------------------------
  return (
      <>
        {/* Desktop State-B Persistent Pill Navigation (>=1024px) */}
        <header className="fixed top-4 inset-x-0 z-50 justify-center font-urbanist hidden lg:flex">
          <div className="inline-flex items-center gap-6 sm:gap-7 bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)]">
            {/* Small Brand Mark inside Subpage Pill */}
            <Link href="/" aria-label="LMS Domain Home" className="flex items-center shrink-0">
              <img
                src="/assets/img/logo/mark-square.svg"
                alt="LMS Domain Mark"
                className="size-8 rounded-lg object-contain shadow-xs hover:scale-105 transition-transform"
              />
            </Link>

            {/* Subpage Nav Links */}
            <nav className="flex items-center gap-5 lg:gap-6 text-[13px] font-medium text-[#6B6F76]">
              {navigationConfig.marketingNav.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const isAi = item.href === "/ai" || item.label.toLowerCase().includes("ai");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#161616] font-semibold"
                        : "hover:text-[#161616]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isAi && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#8E7CF8] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {isActive && (
                      <span className="size-1 rounded-full bg-[#7B5CF5] absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
                    )}
                  </Link>
                );
              })}

              <Link
                href="/login"
                className="py-1 text-[#6B6F76] hover:text-[#161616] transition-colors"
              >
                Log in
              </Link>
            </nav>

            {/* Request Demo Button */}
            <button
              type="button"
              onClick={() => setShowEnquiryModal(true)}
              className="px-5 py-2 rounded-full bg-[#161616] hover:bg-black text-white text-[13px] font-medium transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
            >
              Request Demo
            </button>
          </div>
        </header>

        {/* Mobile / Tablet Header (<1024px) */}
        <header className="w-full absolute top-0 inset-x-0 z-40 font-urbanist flex lg:hidden items-center justify-between px-4 sm:px-6 h-20">
          <Link href="/" aria-label="LMS Domain Home" className="min-w-[44px] min-h-[44px] flex items-center justify-center">
            <img
              src="/assets/img/logo/mark-square.svg"
              alt="LMS Domain Mark"
              className="size-10 rounded-xl object-contain shadow-xs"
            />
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowEnquiryModal(true)}
              type="button"
              className="min-h-[44px] px-4 py-2 rounded-full bg-[#161616] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center cursor-pointer active:scale-95"
            >
              Request Demo
            </button>
            <button
              onClick={() => setShowSubpageMenu(true)}
              type="button"
              aria-label="Open navigation menu"
              className="min-w-[44px] min-h-[44px] p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition flex items-center justify-center cursor-pointer active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Full-Screen Mobile Drawer for Subpages */}
        {showSubpageMenu && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 font-urbanist animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Link
                  href="/"
                  onClick={() => setShowSubpageMenu(false)}
                  className="flex items-center"
                >
                  <img
                    src="/assets/img/logo/mark-square.svg"
                    alt="LMS Domain"
                    className="size-10 rounded-xl"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setShowSubpageMenu(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-black rounded-lg cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col pt-4">
                {navigationConfig.marketingNav.map((item) => {
                  const isAi = item.href === "/ai" || item.label.toLowerCase().includes("ai");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowSubpageMenu(false)}
                      className="text-[26px] sm:text-[28px] font-semibold text-[#161616] py-4 border-b border-slate-100 hover:text-[#7B5CF5] transition-colors flex items-center justify-between"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span>{item.label}</span>
                        {isAi && (
                          <span
                            className="w-2 h-2 rounded-full bg-[#8E7CF8] shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text-slate-300 text-lg">→</span>
                    </Link>
                  );
                })}

                <Link
                  href="/login"
                  onClick={() => setShowSubpageMenu(false)}
                  className="text-[22px] font-medium text-slate-600 py-4 border-b border-slate-100 hover:text-black transition-colors"
                >
                  Log in
                </Link>
              </div>
            </div>

            <div className="pt-6 pb-2">
              <button
                type="button"
                onClick={() => {
                  setShowSubpageMenu(false);
                  setShowEnquiryModal(true);
                }}
                className="w-full py-4 rounded-full bg-[#161616] hover:bg-black text-white text-base font-semibold shadow-md active:scale-95 transition-all"
              >
                Request Demo
              </button>
            </div>
          </div>
        )}

        {/* Demo Enquiry Modal */}
        <Dialog open={showEnquiryModal} onOpenChange={setShowEnquiryModal}>
          <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
            <EnquiryForm onClose={() => setShowEnquiryModal(false)} />
          </DialogContent>
        </Dialog>
      </>
    );
}

export default Header;
