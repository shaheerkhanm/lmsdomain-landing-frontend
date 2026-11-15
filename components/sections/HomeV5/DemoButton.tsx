"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm, { DEMO_DIALOG_CLASS } from "@/components/layout/common/EnquiryForm";

/** Opens the existing demo enquiry form in a modal. */
export function DemoButton({
  label = "Book a demo",
  variant = "dark",
  className,
}: {
  label?: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-[14.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4BFF]",
          variant === "dark"
            ? "bg-[#0A0A0B] text-white hover:bg-[#27272A]"
            : "bg-white text-[#0A0A0B] hover:bg-[#F4F4F5]",
          className
        )}
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={DEMO_DIALOG_CLASS}>
          <EnquiryForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
