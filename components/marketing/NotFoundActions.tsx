"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePageVisibility } from "@/lib/pages-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

export function NotFoundActions() {
  const [showModal, setShowModal] = useState(false);
  const { isPathVisible } = usePageVisibility();
  const contactVisible = isPathVisible("/contact");

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
        >
          Home
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-[#161616] border border-[#ECEDEF] text-sm font-semibold hover:bg-[#F3F4F6] transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          Pricing
        </Link>
        <Link
          href="/platform"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-[#161616] border border-[#ECEDEF] text-sm font-semibold hover:bg-[#F3F4F6] transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          Platform
        </Link>
        {contactVisible ? (
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-[#161616] border border-[#ECEDEF] text-sm font-semibold hover:bg-[#F3F4F6] transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            Contact
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-[#161616] border border-[#ECEDEF] text-sm font-semibold hover:bg-[#F3F4F6] transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            Contact
          </button>
        )}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
          <EnquiryForm onClose={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NotFoundActions;
