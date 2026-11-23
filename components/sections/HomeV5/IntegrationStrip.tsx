import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark, isBrand } from "@/components/brand/PartnerMarks";
import type { DirectoryItem } from "@/content/integrations";
import { Container } from "./primitives";

/* Homepage: a slow row of the integrations' logos, linking to /integrations.
   Only live integrations with an official logo; one logo per brand. Pauses on hover
   and stands still for visitors who prefer reduced motion (globals.css .logo-marquee). */
export function IntegrationStrip({ items, eyebrow, title, linkLabel }: { items: DirectoryItem[]; eyebrow: string; title: string; linkLabel: string }) {
  const seen = new Set<string>();
  const logos = items.filter((x) => x.live && isBrand(x.logo) && !seen.has(x.logo) && !!seen.add(x.logo));
  if (logos.length < 6) return null;
  const row = (hidden: boolean) =>
    logos.map((x) => (
      <li key={`${hidden ? "b" : "a"}-${x.logo}`} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-2.5 pr-10">
        {isBrand(x.logo) && <BrandMark name={x.logo} size={32} />}
        <span className="whitespace-nowrap text-[15px] font-semibold text-[#3F3F46]">{x.logo}</span>
      </li>
    ));
  return (
    <section aria-labelledby="integrations-strip-title" className="bg-white py-[clamp(56px,7vw,96px)]">
      <Container className="text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6C4BFF]">{eyebrow}</p>
        <h2 id="integrations-strip-title" className="mx-auto mt-3 max-w-[720px] font-urbanist text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">
          {title}
        </h2>
      </Container>
      <div data-active className="logo-marquee mt-10 overflow-hidden">
        <ul className="logo-marquee-track" style={{ "--marquee-duration": `${Math.max(30, logos.length * 3.5)}s` } as React.CSSProperties}>
          {row(false)}
          {row(true)}
        </ul>
      </div>
      <div className="mt-9 text-center">
        <Link href="/integrations" className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] px-5 py-2.5 text-[14.5px] font-semibold text-[#0A0A0B] transition-colors hover:border-[#0A0A0B]">
          {linkLabel} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
