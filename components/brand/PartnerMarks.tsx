import Image from "next/image";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/brand/BrandLogo";

/*
 * Official logos for the services LMS Domain works with, plus our own marks.
 * Files live in /public/brands (each brand's official mark and colours).
 * Use these instead of coloured letter badges.
 */

export type BrandName = "Zoom" | "Google Meet" | "Microsoft Teams" | "Stripe" | "Razorpay" | "Paytm" | "DOKU" | "Zapier" | "WhatsApp";

const BRANDS: Record<BrandName, { src: string; tile?: boolean; inset?: number }> = {
  Zoom: { src: "/brands/zoom.svg" },
  "Google Meet": { src: "/brands/google-meet.svg", tile: true, inset: 0.18 },
  "Microsoft Teams": { src: "/brands/microsoft-teams.svg", tile: true, inset: 0.16 },
  Stripe: { src: "/brands/stripe.svg" },
  Zapier: { src: "/brands/zapier.svg" },
  DOKU: { src: "/brands/doku.svg" },
  WhatsApp: { src: "/brands/whatsapp.svg" },
  // Marks without their own background sit on a white tile
  Razorpay: { src: "/brands/razorpay.svg", tile: true, inset: 0.22 },
  Paytm: { src: "/brands/paytm.svg", tile: true, inset: 0.1 },
};

export const isBrand = (name: string): name is BrandName => name in BRANDS;

/** A brand's official mark, `size` px square. */
export function BrandMark({ name, size = 24, className, round = false }: { name: BrandName; size?: number; className?: string; round?: boolean }) {
  const b = BRANDS[name];
  const pad = !b.tile ? 0 : size < 18 ? 1 : Math.round(size * (b.inset ?? 0.15));
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden",
        b.tile && "bg-white ring-1 ring-inset ring-[#ECECF1]",
        round ? "rounded-full" : b.tile && "rounded-[22%]",
        className
      )}
      style={{ width: size, height: size, padding: pad }}
    >
      <Image src={b.src} alt={name} width={size} height={size} className="h-full w-full object-contain" />
    </span>
  );
}

/** The LMS Domain circle mark (the one set in Admin > Site identity). */
export function LmsDomainMark({ size = 24, className }: { size?: number; className?: string }) {
  return <BrandLogo variant="mark" height={size} className={cn("rounded-full", className)} />;
}

/** Domie, the AI assistant: the orb, cropped to a round avatar. */
export function DomieMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0 overflow-hidden rounded-full bg-[#0B0820]", className)} style={{ width: size, height: size }}>
      <Image src="/images/domie/domie-orb-poster.webp" alt="Domie" fill sizes={`${size * 2}px`} className="scale-[1.7] object-cover" />
    </span>
  );
}
