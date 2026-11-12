import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps {
  as?: "section" | "div" | "article";
  tone?: "white" | "warm" | "subtle" | "dark";
  spacing?: "default" | "tight" | "loose" | "none";
  id?: string;
  className?: string;
  containerClassName?: string;
  container?: boolean;
  children: React.ReactNode;
}

const TONE_CLASSES = {
  white: "bg-white text-[#151517]",
  warm: "bg-[#FAFAFA] text-[#151517]",
  subtle: "bg-[#F7F6F2] text-[#151517]",
  dark: "bg-[#0E0E11] text-white",
} as const;

const SPACING_CLASSES = {
  default: "py-16 sm:py-20 lg:py-24",
  tight: "py-10 sm:py-14 lg:py-16",
  loose: "py-20 sm:py-28 lg:py-32",
  none: "py-0",
} as const;

export function Section({
  as: Component = "section",
  tone = "white",
  spacing = "default",
  id,
  className,
  containerClassName,
  container = true,
  children,
  ...props
}: SectionProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      id={id}
      className={cn(
        "relative w-full overflow-hidden font-sans",
        TONE_CLASSES[tone],
        SPACING_CLASSES[spacing],
        className
      )}
      {...props}
    >
      {container ? (
        <div className={cn("max-w-[1080px] mx-auto px-4 sm:px-6 w-full", containerClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}

export default Section;

