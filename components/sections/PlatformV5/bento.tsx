import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Shared building blocks for the platform detail feature cards (Wiza / finerrr style):
 * grey card, a small product UI on top, then a short title and one line.
 */

export const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_12px_32px_-14px_rgba(16,16,24,0.18)]";
export const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
export const fadeRight = "[mask-image:linear-gradient(90deg,#000_70%,transparent)]";

export function Panel({ className, style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-[14px] border border-[#EDEDF1] bg-white", shadow, className)} style={style}>
      {children}
    </div>
  );
}

export function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <Panel className={cn("shrink-0 px-3 py-2", className)}>
      <p className="text-[10.5px] leading-none text-[#9A9AA6]">{label}</p>
      <p className="mt-1 text-[13px] font-medium leading-none text-[#18181B]">{value}</p>
    </Panel>
  );
}

export function Face({ src, size = 28, className }: { src: string; size?: number; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={size * 2}
      height={size * 2}
      className={cn("shrink-0 rounded-full object-cover object-top", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function Card({
  title,
  body,
  plan,
  className,
  delay = 0,
  dark = false,
  children,
}: {
  title: string;
  body: string;
  plan?: string;
  className?: string;
  delay?: number;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ "--rv-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(
        "rv-v4 group relative flex flex-col overflow-hidden rounded-[28px]",
        dark
          ? "bg-white/[0.04] ring-1 ring-inset ring-white/10 transition-[background-color,box-shadow,translate] duration-500 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-white/20"
          : "bg-[#F4F5F8]",
        className
      )}
    >
      <div aria-hidden="true" className="relative h-[270px] overflow-hidden">
        {children}
      </div>
      <div className="mt-auto px-7 pb-7 pt-2">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className={cn("font-urbanist text-[21px] font-semibold leading-[1.2] tracking-[-0.015em]", dark ? "text-white" : "text-[#0A0A0B]")}>{title}</h3>
          {plan && (
            <span className="rounded-full border border-[#E4E4E7] bg-white px-2.5 py-0.5 text-[11.5px] font-semibold text-[#52525B]">
              {/^custom/i.test(plan) ? plan : `${plan} and up`}
            </span>
          )}
        </div>
        <p className={cn("mt-2 max-w-[46ch] text-[14.5px] leading-[1.55]", dark ? "text-[#A1A1AA]" : "text-[#6B6B76]")}>{body}</p>
      </div>
    </div>
  );
}

