"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import MobileMenu from "./MobileMenu";
import { Dialog, DialogContent } from "../ui/dialog";
import EnquiryForm from "./common/EnquiryForm";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { navigationConfig } from "@/content/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  const [showMenu, setShowMenu] = useState(false);
  const [showSubpageMenu, setShowSubpageMenu] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const navARef = useRef<HTMLElement>(null);
  const navBRef = useRef<HTMLDivElement>(null);
  const navBBtnRef = useRef<HTMLButtonElement>(null);
  const navBBtnTextRef = useRef<HTMLSpanElement>(null);

  // Close mobile menus on route change
  useEffect(() => {
    setShowMenu(false);
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

  // Homepage Morphing Navigation (State A -> State B) - ONLY on Home
  useEffect(() => {
    if (!isHome) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      if (isReduced) {
        tl.to(navARef.current, { opacity: 0, pointerEvents: "none", duration: 0.01 }, 0);
        tl.to(navBRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.01 }, 0);
      } else {
        tl.to(
          navARef.current,
          {
            opacity: 0,
            y: -6,
            duration: 0.3,
            ease: "power2.inOut",
            pointerEvents: "none",
          },
          0
        );

        tl.fromTo(
          navBRef.current,
          { opacity: 0, y: -10, pointerEvents: "none" },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", pointerEvents: "auto" },
          0.2
        );

        if (navBBtnRef.current) {
          const targetWidth = navBBtnRef.current.offsetWidth || 124;
          tl.fromTo(
            navBBtnRef.current,
            { width: 40, backgroundColor: "rgba(58,58,58,0.6)" },
            {
              width: targetWidth,
              backgroundColor: "#161616",
              duration: 0.35,
              ease: "power2.out",
              onComplete: () => {
                if (navBBtnRef.current) navBBtnRef.current.style.width = "auto";
              },
              onReverseComplete: () => {
                if (navBBtnRef.current) navBBtnRef.current.style.width = "40px";
              },
            },
            0.2
          );
        }

        if (navBBtnTextRef.current) {
          tl.fromTo(
            navBBtnTextRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.14, ease: "power1.in" },
            0.41
          );
        }

        tl.fromTo(
          ".nav-b-link-item",
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: "power2.out" },
          0.24
        );
      }

      ScrollTrigger.create({
        trigger: "#hero-cta",
        start: "top 90px",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    });

    return () => ctx.revert();
  }, [isHome]);

  if (isAuth) {
    return null;
  }

  // --------------------------------------------------------------------------
  // SUBPAGE NAVIGATION (Starts directly in State-B white pill, no morph)
  // --------------------------------------------------------------------------
  if (!isHome) {
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

  // --------------------------------------------------------------------------
  // HOMEPAGE NAVIGATION (Exact 77ca9c0 implementation)
  // --------------------------------------------------------------------------
  const homeNavLinks = [
    { label: "Features", href: "#features" },
    { label: "AI Studio", href: "#extension" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* 1. Nav A: Initial Symmetrical Hero Header (Visible at Top of Page, Ref §5.2) */}
      <header
        ref={navARef}
        className="w-full absolute top-0 inset-x-0 z-40 font-urbanist"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between lg:justify-center">
          <nav
            className="hidden lg:flex items-center gap-10 lg:gap-12"
            aria-label="Hero Symmetrical Navigation"
          >
            <Link
              href="#features"
              className="text-sm font-medium text-[#161616] hover:text-black transition-colors"
            >
              Features
            </Link>
            <Link
              href="#extension"
              className="text-sm font-medium text-[#161616] hover:text-black transition-colors"
            >
              AI Studio
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center transition-transform hover:scale-105 mx-2"
              aria-label="LMS Domain Home"
            >
              <img
                src="/assets/img/logo/mark-square.svg"
                alt="LMS Domain Mark"
                className="size-11 sm:size-12 rounded-xl object-contain shadow-xs"
              />
            </Link>

            <Link
              href="#benefits"
              className="text-sm font-medium text-[#161616] hover:text-black transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-[#161616] hover:text-black transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex lg:hidden items-center">
            <Link href="/" aria-label="LMS Domain Home" className="min-w-[44px] min-h-[44px] flex items-center justify-center">
              <img
                src="/assets/img/logo/mark-square.svg"
                alt="LMS Domain Mark"
                className="size-10 rounded-xl object-contain shadow-xs"
              />
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2.5">
            <button
              onClick={() => setShowEnquiryModal(true)}
              type="button"
              className="min-h-[44px] px-4 py-2 rounded-full bg-[#161616] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center cursor-pointer active:scale-95"
            >
              Request Demo
            </button>
            <button
              onClick={() => setShowMenu(true)}
              type="button"
              aria-label="Open navigation menu"
              className="min-w-[44px] min-h-[44px] p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition flex items-center justify-center cursor-pointer active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Nav B: Floating Centered Glass Pill Header (A04 Scroll Triggered State, Desktop Only >=1024px) */}
      <div
        ref={navBRef}
        style={{ opacity: 0, pointerEvents: "none" }}
        className="fixed top-4 inset-x-0 z-50 justify-center font-urbanist hidden lg:flex"
      >
        <div className="inline-flex items-center gap-5 sm:gap-7 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)]">
          <nav className="hidden sm:flex items-center gap-5 lg:gap-6 text-[13px] font-medium text-[#6B6F76]">
            <Link href="#features" className="nav-b-link-item hover:text-[#161616] transition-colors">
              Features
            </Link>
            <Link href="#extension" className="nav-b-link-item hover:text-[#161616] transition-colors">
              AI Studio
            </Link>
            <Link href="#benefits" className="nav-b-link-item hover:text-[#161616] transition-colors">
              Benefits
            </Link>
            <Link href="#faq" className="nav-b-link-item hover:text-[#161616] transition-colors">
              FAQ
            </Link>
            <button
              type="button"
              onClick={() => setShowEnquiryModal(true)}
              className="nav-b-link-item hover:text-[#161616] transition-colors cursor-pointer"
            >
              Contact us
            </button>
          </nav>

          <button
            ref={navBBtnRef}
            type="button"
            onClick={() => setShowEnquiryModal(true)}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#161616] hover:bg-black text-white text-xs sm:text-[13px] font-medium transition-all shadow-2xs active:scale-95 cursor-pointer shrink-0 flex items-center justify-center overflow-hidden whitespace-nowrap"
          >
            <span ref={navBBtnTextRef}>Request Demo</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Sheet open={showMenu} onOpenChange={setShowMenu}>
        <SheetContent side="right" className="w-[85%] max-w-[340px] p-0 z-50">
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <MobileMenu
            navLinks={homeNavLinks}
            onClose={() => setShowMenu(false)}
            onOpenDemo={() => {
              setShowMenu(false);
              setShowEnquiryModal(true);
            }}
          />
        </SheetContent>
      </Sheet>

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
