"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import MobileMenu from "./MobileMenu";
import { Dialog, DialogContent } from "../ui/dialog";
import EnquiryForm from "./common/EnquiryForm";
import { usePathname } from "next/navigation";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "AI Studio", href: "#extension" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* 1. Initial Symmetrical Hero Header (Visible at Top of Page) */}
      <header
        className={`w-full absolute top-0 inset-x-0 z-40 transition-opacity duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 w-1/3" aria-label="Hero Left Navigation">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#extension"
              className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors"
            >
              AI Studio
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <div className="flex items-center justify-center md:w-1/3">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
              aria-label="LMS Domain Home"
            >
              <img
                src="/assets/img/logo/logo.svg"
                alt="LMS Domain Logo"
                className="h-7 sm:h-8 w-auto object-contain shrink-0"
              />
            </Link>
          </div>

          {/* Right Navigation Links & Action */}
          <div className="hidden md:flex items-center justify-end gap-8 w-1/3">
            <Link
              href="#benefits"
              className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Top Controls */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => setShowEnquiryModal(true)}
              type="button"
              className="px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-semibold shadow-xs"
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

      {/* 2. Floating Centered Glass Pill Header (Mota 00:04 Scrolled State) */}
      <div
        className={`fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ${
          isScrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="pointer-events-auto inline-flex items-center gap-5 sm:gap-7 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border border-slate-200/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)]">
          {/* Scrolled Logo Icon */}
          <Link href="/" className="flex items-center shrink-0 pr-1 border-r border-slate-200">
            <img
              src="/assets/img/logo/logo.svg"
              alt="LMS Domain"
              className="h-5 sm:h-6 w-auto object-contain"
            />
          </Link>

          {/* Scrolled Nav Links */}
          <nav className="hidden sm:flex items-center gap-5 lg:gap-6 text-[13px] font-medium text-slate-600">
            <Link href="#features" className="hover:text-slate-950 transition-colors">
              Features
            </Link>
            <Link href="#extension" className="hover:text-slate-950 transition-colors">
              AI Studio
            </Link>
            <Link href="#benefits" className="hover:text-slate-950 transition-colors">
              Benefits
            </Link>
            <Link href="#faq" className="hover:text-slate-950 transition-colors">
              FAQ
            </Link>
            <button
              type="button"
              onClick={() => setShowEnquiryModal(true)}
              className="hover:text-slate-950 transition-colors cursor-pointer"
            >
              Contact us
            </button>
          </nav>

          {/* Scrolled Black Pill CTA */}
          <button
            type="button"
            onClick={() => setShowEnquiryModal(true)}
            className="px-4 sm:px-5 py-2 rounded-full bg-slate-950 hover:bg-black text-white text-xs sm:text-[13px] font-medium transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
          >
            Request Demo
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
