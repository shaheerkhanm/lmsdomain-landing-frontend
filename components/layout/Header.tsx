"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import MobileMenu from "./MobileMenu";
import { Dialog, DialogContent } from "../ui/dialog";
import EnquiryForm from "./common/EnquiryForm";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const navARef = useRef<HTMLElement>(null);
  const navBRef = useRef<HTMLDivElement>(null);
  const navBBtnRef = useRef<HTMLButtonElement>(null);
  const navBBtnTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Create paused transformation timeline
      const tl = gsap.timeline({ paused: true });

      if (isReduced) {
        tl.to(navARef.current, { opacity: 0, pointerEvents: "none", duration: 0.01 }, 0);
        tl.to(navBRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.01 }, 0);
      } else {
        // A03: Nav A fades out over 0.3s
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

        // A04: Starts ~0.2s after A03 begins
        // 1. Pill container background & border fade in over 0.25s
        tl.fromTo(
          navBRef.current,
          { opacity: 0, y: -10, pointerEvents: "none" },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", pointerEvents: "auto" },
          0.2
        );

        // 2. Button morphs: starts 40px wide gray (#3A3A3A at 60%), expands to full width & darkens to #161616 over 0.35s
        if (navBBtnRef.current) {
          tl.fromTo(
            navBBtnRef.current,
            { width: 40, backgroundColor: "rgba(58,58,58,0.6)" },
            { width: "auto", backgroundColor: "#161616", duration: 0.35, ease: "power2.out" },
            0.2
          );
        }

        // Button label fades in during the last 40% of the button morph (~0.14s)
        if (navBBtnTextRef.current) {
          tl.fromTo(
            navBBtnTextRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.14, ease: "power1.in" },
            0.41
          );
        }

        // 3. Links fade in left -> right with a 40ms stagger
        tl.fromTo(
          ".nav-b-link-item",
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: "power2.out" },
          0.24
        );
      }

      // ScrollTrigger on hero CTA: start: "top 90px"
      ScrollTrigger.create({
        trigger: "#hero-cta",
        start: "top 90px",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between md:justify-center">
          {/* Desktop Centered Symmetrical Navigation (Features, AI Studio, [Square Mark 48px], Benefits, FAQ) */}
          <nav
            className="hidden md:flex items-center gap-10 lg:gap-12"
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

            {/* Centered 48px square mark icon per spec §5.2 / §6.3 */}
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

          {/* Mobile Top Brand Icon */}
          <div className="flex md:hidden items-center">
            <Link href="/" aria-label="LMS Domain Home">
              <img
                src="/assets/img/logo/mark-square.svg"
                alt="LMS Domain Mark"
                className="size-10 rounded-xl object-contain shadow-xs"
              />
            </Link>
          </div>

          {/* Mobile Top Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setShowEnquiryModal(true)}
              type="button"
              className="px-3.5 py-1.5 rounded-full bg-[#161616] text-white text-xs font-semibold shadow-xs"
            >
              Request Demo
            </button>
            <button
              onClick={() => setShowMenu(true)}
              type="button"
              aria-label="Open navigation menu"
              className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Nav B: Floating Centered Glass Pill Header (A04 Scroll Triggered State) */}
      <div
        ref={navBRef}
        style={{ opacity: 0, pointerEvents: "none" }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center font-urbanist"
      >
        <div className="inline-flex items-center gap-5 sm:gap-7 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)]">
          {/* Nav B Links (No logo per spec §5.2) */}
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

          {/* Morphing Black Pill CTA Button */}
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
            navLinks={navLinks}
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
