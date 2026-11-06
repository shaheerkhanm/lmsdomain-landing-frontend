"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, ArrowRight, X, Menu } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import EnquiryForm from "./common/EnquiryForm";
import { navigationConfig, type NavItem, type NavDropdownItem } from "@/content/navigation";
import { usePageVisibility } from "@/lib/pages-context";
import BrandLogo from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

export function Header({ siteNav }: { siteNav?: NavItem[] }) {
  const { isPathVisible } = usePageVisibility();
  const pathname = usePathname();
  const isAuth =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/forgot-password");

  // Use CMS siteNav if provided with dropdown hierarchy; if legacy flat nav is returned, use navigationConfig
  const isLegacyFlatCmsNav =
    siteNav &&
    siteNav.length > 0 &&
    !siteNav.some((item) => item.children && item.children.length > 0);

  const baseNav =
    siteNav && siteNav.length > 0 && !isLegacyFlatCmsNav
      ? siteNav
      : navigationConfig.marketingNav;

  // Filter dropdown children through page visibility
  const visibleNav = baseNav
    .map((item) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child) => isPathVisible(child.href));
        return { ...item, children: filteredChildren };
      }
      return item;
    })
    .filter((item) => {
      if (item.children) {
        return item.children.length > 0;
      }
      return item.href ? isPathVisible(item.href) : true;
    });

  const showLogin = isPathVisible("/login");

  // State
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setShowMobileMenu(false);
  }, [pathname]);

  // Lock body scroll and stop Lenis while mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
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
  }, [showMobileMenu]);

  // Escape key closes open dropdown or mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openDropdown) {
          setOpenDropdown(null);
          activeTriggerRef.current?.focus();
        } else if (showMobileMenu) {
          setShowMobileMenu(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, showMobileMenu]);

  // Click outside listener for desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isAuth) {
    return null;
  }

  const toggleDropdown = (label: string, e: React.MouseEvent<HTMLButtonElement>) => {
    activeTriggerRef.current = e.currentTarget;
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const isItemActive = (item: NavItem): boolean => {
    if (item.href) {
      return pathname === item.href || (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
    }
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.href || (child.href !== "/" && pathname?.startsWith(`${child.href}/`))
      );
    }
    return false;
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP NAVIGATION (>= 900px)
          State-B floating pill with accessible dropdown menus
          ========================================================================= */}
      <header
        ref={navRef}
        className="fixed top-4 inset-x-0 z-50 justify-center font-urbanist hidden min-[900px]:flex pointer-events-none"
      >
        <div className="pointer-events-auto inline-flex items-center gap-5 lg:gap-7 bg-white/95 backdrop-blur-md px-5 sm:px-6 py-2.5 rounded-full border border-[#EAE8E2] shadow-[0_10px_30px_-5px_rgba(22,22,22,0.08)]">
          {/* Brand Logo */}
          <Link href="/" aria-label="LMS Domain home" className="flex items-center shrink-0">
            <span className="hidden min-[1120px]:inline-flex items-center">
              <BrandLogo variant="wordmark" tone="light" height={26} />
            </span>
            <span className="inline-flex min-[1120px]:hidden items-center">
              <BrandLogo variant="mark" height={26} />
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center gap-1 sm:gap-2 text-[13px] font-medium text-[#6B6F76]">
            {visibleNav.map((item) => {
              const active = isItemActive(item);
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isOpen = openDropdown === item.label;

              if (hasDropdown) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={(e) => toggleDropdown(item.label, e)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      className={cn(
                        "px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#7B5CF5]",
                        active || isOpen
                          ? "text-[#161616] font-semibold bg-[#F4F4F1]/60"
                          : "hover:text-[#161616] hover:bg-[#F9F9F7]"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-3.5 opacity-60 transition-transform duration-200",
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div
                        role="menu"
                        aria-label={item.label}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className={cn(
                          "absolute top-full left-0 mt-3 bg-white rounded-2xl border border-[#EAE8E2] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150",
                          item.label === "Platform"
                            ? "w-[340px] sm:w-[380px] grid grid-cols-1 gap-1"
                            : "w-[280px] sm:w-[320px] flex flex-col gap-1"
                        )}
                      >
                        {item.children!.map((child) => {
                          const childActive =
                            pathname === child.href ||
                            (child.href !== "/" && pathname?.startsWith(`${child.href}/`));
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                "p-2.5 rounded-xl transition-all flex flex-col text-left group focus-visible:outline-2 focus-visible:outline-[#7B5CF5]",
                                childActive
                                  ? "bg-[#EEE9FF]/50 text-[#7B5CF5]"
                                  : "hover:bg-[#FAF9F6] text-[#161616]"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold tracking-tight group-hover:text-[#7B5CF5] transition-colors">
                                  {child.label}
                                </span>
                                {child.badge && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EEE9FF] text-[#7B5CF5] border border-[#DDD6FE]">
                                    {child.badge}
                                  </span>
                                )}
                              </div>
                              {child.description && (
                                <span className="text-xs text-[#6B6F76] mt-0.5 line-clamp-1 leading-normal font-normal">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Direct Link
              return (
                <Link
                  key={item.label}
                  href={item.href || "/"}
                  className={cn(
                    "px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#7B5CF5]",
                    active
                      ? "text-[#161616] font-semibold bg-[#F4F4F1]/60"
                      : "hover:text-[#161616] hover:bg-[#F9F9F7]"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-[#EEE9FF] text-[#7B5CF5] font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#DDD6FE]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {showLogin && (
              <Link
                href="/login"
                className="px-3 py-1.5 text-[#6B6F76] hover:text-[#161616] transition-colors focus-visible:outline-2 focus-visible:outline-[#7B5CF5] rounded-full"
              >
                Log in
              </Link>
            )}
          </nav>

          {/* Book a Demo CTA */}
          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="px-5 py-2 rounded-full bg-[#161616] hover:bg-black text-white text-[13px] font-semibold transition-all shadow-xs active:scale-95 cursor-pointer shrink-0"
          >
            Book a demo
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE / TABLET TOP BAR (< 900px)
          Fixed top header with logo, CTA button and hamburger toggle
          ========================================================================= */}
      <header className="w-full absolute top-0 inset-x-0 z-40 font-urbanist flex min-[900px]:hidden items-center justify-between px-4 sm:px-6 h-20">
        <Link href="/" aria-label="LMS Domain home" className="min-w-[44px] min-h-[44px] flex items-center shrink-0">
          <span className="inline-flex items-center">
            <BrandLogo variant="wordmark" tone="light" height={24} />
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="min-h-[40px] px-4 py-2 rounded-full bg-[#161616] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center cursor-pointer active:scale-95"
          >
            Book a demo
          </button>

          <button
            type="button"
            onClick={() => setShowMobileMenu(true)}
            aria-label="Open navigation menu"
            className="min-w-[44px] min-h-[44px] p-2 text-[#161616] hover:bg-[#F3F4F6] rounded-xl transition flex items-center justify-center cursor-pointer active:scale-95"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE FULL-SCREEN DRAWER (< 900px)
          Collapsible dropdown sections + standalone routes
          ========================================================================= */}
      {showMobileMenu && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 font-urbanist animate-in fade-in duration-200 overflow-y-auto"
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#EAE8E2]">
              <Link
                href="/"
                aria-label="LMS Domain home"
                onClick={() => setShowMobileMenu(false)}
                className="min-w-[44px] min-h-[44px] flex items-center shrink-0"
              >
                <BrandLogo variant="wordmark" tone="light" height={24} />
              </Link>
              <button
                type="button"
                onClick={() => setShowMobileMenu(false)}
                aria-label="Close menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#6B6F76] hover:text-[#161616] rounded-lg cursor-pointer"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Mobile Nav Links & Accordions */}
            <div className="flex flex-col pt-3">
              {visibleNav.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = mobileExpandedSection === item.label;

                if (hasChildren) {
                  return (
                    <div key={item.label} className="border-b border-[#F0EFEA]">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedSection((prev) => (prev === item.label ? null : item.label))
                        }
                        className="w-full text-xl sm:text-2xl font-semibold text-[#161616] py-3.5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "size-5 text-[#8F94A0] transition-transform duration-200",
                            isExpanded ? "rotate-180 text-[#161616]" : ""
                          )}
                        />
                      </button>

                      {isExpanded && (
                        <div className="pl-3 pb-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setShowMobileMenu(false)}
                              className="py-2 px-3 rounded-lg flex items-center justify-between text-sm sm:text-base font-medium text-[#6B6F76] hover:text-[#161616] hover:bg-[#FAF9F6] transition-colors"
                            >
                              <span>{child.label}</span>
                              <ArrowRight className="size-3.5 opacity-40" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Direct standalone item
                return (
                  <Link
                    key={item.label}
                    href={item.href || "/"}
                    onClick={() => setShowMobileMenu(false)}
                    className="text-xl sm:text-2xl font-semibold text-[#161616] py-3.5 border-b border-[#F0EFEA] hover:text-[#7B5CF5] transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-4 text-[#8F94A0]" />
                  </Link>
                );
              })}

              {showLogin && (
                <Link
                  href="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="text-lg font-medium text-[#6B6F76] py-3.5 border-b border-[#F0EFEA] hover:text-[#161616] transition-colors"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>

          {/* Drawer Footer CTA */}
          <div className="pt-6 pb-2">
            <button
              type="button"
              onClick={() => {
                setShowMobileMenu(false);
                setShowDemoModal(true);
              }}
              className="w-full py-4 rounded-full bg-[#161616] hover:bg-black text-white text-base font-semibold shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Book a demo</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Demo Enquiry Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
