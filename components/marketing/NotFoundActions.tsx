"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CreditCard, LayoutGrid, Users } from "lucide-react";
import { usePageVisibility } from "@/lib/pages-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm, { DEMO_DIALOG_CLASS } from "@/components/layout/common/EnquiryForm";

/** Primary buttons for the 404 and error pages. */
export function NotFoundActions() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-[#0A0A0B] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#27272A]"
        >
          Back to home <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex cursor-pointer items-center rounded-full bg-[#F4F5F8] px-6 py-3 text-[15px] font-semibold text-[#0A0A0B] transition-colors hover:bg-[#ECEDF1]"
        >
          Book a demo
        </button>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className={DEMO_DIALOG_CLASS}>
          <EnquiryForm onClose={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

const POPULAR = [
  { href: "/platform", label: "Platform", line: "Everything LMS Domain does", icon: LayoutGrid },
  { href: "/pricing", label: "Pricing", line: "Plans and a free trial", icon: CreditCard },
  { href: "/customers", label: "Customers", line: "Academies that teach with us", icon: Users },
  { href: "/resources/blog", label: "Guides", line: "Running an online academy", icon: BookOpen },
];

/** "Popular pages" cards, filtered by which pages are live. */
export function NotFoundLinks() {
  const { isPathVisible } = usePageVisibility();
  const links = POPULAR.filter((l) => isPathVisible(l.href));
  if (!links.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {links.map(({ href, label, line, icon: Icon }, i) => (
        <Link
          key={href}
          href={href}
          style={{ "--rv-delay": `${i * 80}ms` } as React.CSSProperties}
          className="rv-v4 group flex items-center gap-4 rounded-[20px] bg-[#F4F5F8] p-5 transition-colors hover:bg-[#ECEDF1]"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-white text-[#0A0A0B] shadow-[0_1px_2px_rgba(16,16,24,0.06)] transition-colors group-hover:bg-[#0A0A0B] group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-urbanist text-[17px] font-semibold tracking-[-0.01em] text-[#0A0A0B]">{label}</span>
            <span className="block text-[13px] leading-[1.4] text-[#71717A]">{line}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#9A9AA6] transition-transform group-hover:rotate-45 group-hover:text-[#0A0A0B]" />
        </Link>
      ))}
    </div>
  );
}

export default NotFoundActions;
