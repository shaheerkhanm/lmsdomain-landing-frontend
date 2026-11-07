import React from "react";
import { cn } from "@/lib/utils";

interface MockupCaptionProps {
  className?: string;
}

export function MockupCaption({ className }: MockupCaptionProps) {
  return (
    <p
      className={cn(
        "text-[11px] sm:text-xs text-[#8F94A0] text-center mt-3 font-medium tracking-tight select-none",
        className
      )}
    >
      Product screen with sample data.
    </p>
  );
}

export default MockupCaption;

