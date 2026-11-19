import React from "react";
import { cn } from "@/lib/utils";

/**
 * "Northwind Academy": a made-up sample academy used in product mockups (not a customer).
 * Mark = compass star on a deep teal tile, so it reads like a real app icon.
 */
export const DEMO_ACADEMY = { name: "Northwind Academy", short: "Northwind", color: "#0F766E" };

export function NorthwindMark({ size = 28, className }: { size?: number; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={cn("shrink-0", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`nw-bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#0B5D57" />
        </linearGradient>
        <linearGradient id={`nw-n-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#nw-bg-${id})`} />
      <circle cx="24" cy="24" r="13.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="1.5" />
      {/* compass star: north point in gold, others white */}
      <path d="M24 7.5 L27.2 20.8 L24 24 L20.8 20.8 Z" fill={`url(#nw-n-${id})`} />
      <path d="M24 40.5 L20.8 27.2 L24 24 L27.2 27.2 Z" fill="#FFFFFF" fillOpacity="0.9" />
      <path d="M7.5 24 L20.8 20.8 L24 24 L20.8 27.2 Z" fill="#FFFFFF" fillOpacity="0.75" />
      <path d="M40.5 24 L27.2 27.2 L24 24 L27.2 20.8 Z" fill="#FFFFFF" fillOpacity="0.75" />
      <circle cx="24" cy="24" r="2.2" fill="#0B5D57" stroke="#FFFFFF" strokeWidth="1.2" />
    </svg>
  );
}

export function NorthwindLogo({ size = 28, className, tone = "dark" }: { size?: number; className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <NorthwindMark size={size} />
      <span className="leading-none">
        <span className={cn("block font-urbanist font-bold tracking-[-0.01em]", tone === "dark" ? "text-[#0B3B37]" : "text-white")} style={{ fontSize: size * 0.5 }}>
          Northwind
        </span>
        <span className={cn("mt-[2px] block font-semibold uppercase tracking-[0.18em]", tone === "dark" ? "text-[#0F766E]" : "text-white/70")} style={{ fontSize: size * 0.27 }}>
          Academy
        </span>
      </span>
    </span>
  );
}

/* More made-up sample academies for the app showcase (not customers). Each mark is an app-icon tile. */
function Tile({ size, from, to, children, className }: { size: number; from: string; to: string; children: React.ReactNode; className?: string }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={cn("shrink-0", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`t-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#t-${id})`} />
      {children}
    </svg>
  );
}

/* Brightpath Coaching: sun rising over a path */
export function BrightpathMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Tile size={size} from="#3B82F6" to="#1E3A8A" className={className}>
      <circle cx="24" cy="25" r="8" fill="#FCD34D" />
      <path d="M6 31 H42 V42 H6 Z" fill="#1E3A8A" />
      <path d="M21 42 L23 31 H25 L27 42 Z" fill="#FFFFFF" fillOpacity="0.85" />
      <path d="M6 31 H42" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.5" />
    </Tile>
  );
}

/* Lingo Loft: two speech bubbles */
export function LingoLoftMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Tile size={size} from="#A78BFA" to="#5B21B6" className={className}>
      <path d="M10 13 h18 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-10 l-5 4 v-4 h-3 a4 4 0 0 1 -4 -4 v-8 a4 4 0 0 1 4 -4 z" fill="#FFFFFF" />
      <path d="M26 22 h12 a3 3 0 0 1 3 3 v7 a3 3 0 0 1 -3 3 h-1 v3.5 l-4.5 -3.5 h-6.5 a3 3 0 0 1 -3 -3 v-7 a3 3 0 0 1 3 -3 z" fill="#FDE68A" />
      <circle cx="15" cy="21" r="1.6" fill="#5B21B6" />
      <circle cx="20" cy="21" r="1.6" fill="#5B21B6" />
      <circle cx="25" cy="21" r="1.6" fill="#5B21B6" />
    </Tile>
  );
}

/* Greenleaf Music: a leaf with a note stem */
export function GreenleafMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Tile size={size} from="#22C55E" to="#14532D" className={className}>
      <path d="M14 34 C14 20 24 12 36 12 C36 25 28 34 14 34 Z" fill="#FFFFFF" fillOpacity="0.95" />
      <path d="M15 33 C21 27 26 22 33 15" stroke="#15803D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="13" cy="37" r="3.2" fill="#FDE68A" />
    </Tile>
  );
}

/* Ember Yoga School: flame over a horizon */
export function EmberMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Tile size={size} from="#FB923C" to="#B91C1C" className={className}>
      <path d="M24 9 C28 15 33 18 33 26 C33 31.5 29 35 24 35 C19 35 15 31.5 15 26 C15 21 18 19 19.5 15 C21 18 22 19.5 23.5 20 C23.5 16 23 12.5 24 9 Z" fill="#FFF7ED" />
      <path d="M24 22 C26 25 28 26.5 28 29 C28 31.5 26.2 33 24 33 C21.8 33 20 31.5 20 29 C20 26.5 22.5 25 24 22 Z" fill="#F97316" />
      <path d="M10 39 H38" stroke="#FFF7ED" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
    </Tile>
  );
}
