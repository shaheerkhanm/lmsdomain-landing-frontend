"use client";

import React from "react";
import Link from "next/link";

interface MobileMenuProps {
  navLinks: Array<{ label: string; href: string }>;
  onClose: () => void;
  onOpenDemo: () => void;
}

export function MobileMenu({ navLinks, onClose, onOpenDemo }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full p-6 bg-white font-inter">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <Link href="/" onClick={onClose} className="flex items-center">
          <img
            src="/assets/img/logo/logo.svg"
            className="h-8 w-auto object-contain"
            alt="LMS Domain Logo"
          />
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col py-6 space-y-1" aria-label="Mobile Navigation">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="px-3 py-3 text-base font-semibold text-slate-800 hover:text-MainColor hover:bg-slate-50 rounded-lg transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Action Buttons */}
      <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
        <button
          onClick={onOpenDemo}
          type="button"
          className="w-full py-3 px-4 text-center font-semibold text-white bg-MainColor hover:bg-[#5A3DE6] rounded-xl shadow-sm transition active:scale-[0.98]"
        >
          Request a Demo
        </button>

        <Link
          href="https://cms.lmsdomain.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full py-3 px-4 text-center font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-xl transition hover:bg-slate-50"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default MobileMenu;