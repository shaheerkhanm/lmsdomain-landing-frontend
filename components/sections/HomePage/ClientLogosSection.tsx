import React from "react";
import type { HomeClients, HomeClientLogo } from "@/types/content";
import MarqueeInView from "./MarqueeInView";

// ============================================================================
// "Trusted by" band: heading from Home > Cms > "client logos (new site)", logos
// from Home > Client logos. Under 4 logos: a static centred row; 4-7: one
// marquee row; 8 or more: two rows moving opposite ways. Reduced motion: a
// static grid. Hidden by the page when there are no logos.
// ============================================================================

const MIN_PER_HALF = 10; // logos per half track, so a row is always wider than the screen

function Logo({ logo, copy }: { logo: HomeClientLogo; copy?: boolean }) {
  const img = (
    // Plain img: client logos are SVG/PNG/WebP of any width at a fixed height
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.logo}
      alt={copy ? "" : logo.name}
      height={40}
      className="h-8 sm:h-10 w-auto max-w-[150px] sm:max-w-[170px] object-contain grayscale opacity-60 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
      loading="lazy"
      decoding="async"
    />
  );
  const box = "group flex h-16 items-center justify-center px-6 sm:px-9 shrink-0";
  if (logo.url) {
    return (
      <a
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${box} rounded-xl focus-visible:outline-2 focus-visible:outline-[#7B5CF5]`}
        aria-label={copy ? undefined : `${logo.name} (opens in a new tab)`}
        aria-hidden={copy || undefined}
        tabIndex={copy ? -1 : undefined}
        title={logo.name}
      >
        {img}
      </a>
    );
  }
  return (
    <div className={box} aria-hidden={copy || undefined} title={logo.name}>
      {img}
    </div>
  );
}

function MarqueeRow({ logos, direction }: { logos: HomeClientLogo[]; direction: "left" | "right" }) {
  const repeat = Math.max(1, Math.ceil(MIN_PER_HALF / logos.length));
  const half = Array.from({ length: repeat }, () => logos).flat();
  // ~3.5 s per logo keeps the speed the same whatever the count
  const duration = `${Math.round(half.length * 3.5)}s`;
  return (
    <div className="logo-marquee overflow-hidden">
      <div className="logo-marquee-track" data-direction={direction} style={{ ["--marquee-duration" as string]: duration }}>
        {half.map((logo, i) => (
          <Logo key={`a-${i}`} logo={logo} copy={i >= logos.length} />
        ))}
        {half.map((logo, i) => (
          <Logo key={`b-${i}`} logo={logo} copy />
        ))}
      </div>
    </div>
  );
}

export function ClientLogosSection({ data }: { data: HomeClients }) {
  const { logos } = data;
  const twoRows = logos.length >= 8;
  const rows = twoRows ? [logos.filter((_, i) => i % 2 === 0), logos.filter((_, i) => i % 2 === 1)] : [logos];

  return (
    <section id="clients" aria-labelledby={data.title ? "clients-title" : undefined} className="bg-[#F3F4F6] font-urbanist pb-16 lg:pt-8 lg:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-slate-100 py-10 sm:py-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
          {(data.eyebrow || data.title || data.subtitle) && (
            <div className="text-center max-w-2xl mx-auto px-6 mb-8 sm:mb-10">
              {data.eyebrow && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] mb-3">
                  <span aria-hidden="true">✦</span>
                  <span className="uppercase tracking-widest text-[11px]">{data.eyebrow.replace(/^✦\s*/, "")}</span>
                </div>
              )}
              {data.title && (
                <h2 id="clients-title" className="text-[26px] sm:text-4xl font-semibold text-[#161616] tracking-tight leading-tight">
                  {data.title}
                </h2>
              )}
              {data.subtitle && <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">{data.subtitle}</p>}
            </div>
          )}

          {logos.length < 4 ? (
            <ul className="flex flex-wrap items-center justify-center gap-y-2 px-6" aria-label="Clients">
              {logos.map((logo) => (
                <li key={logo.id}>
                  <Logo logo={logo} />
                </li>
              ))}
            </ul>
          ) : (
            <>
              {/* Moving rows; the static grid replaces them when reduced motion is on */}
              <MarqueeInView className="flex flex-col gap-3 sm:gap-4 motion-reduce:hidden">
                {rows.map((row, i) => (
                  <MarqueeRow key={i} logos={row} direction={i % 2 === 0 ? "left" : "right"} />
                ))}
              </MarqueeInView>
              <ul className="hidden motion-reduce:flex flex-wrap items-center justify-center gap-y-2 px-6" aria-label="Clients">
                {logos.map((logo) => (
                  <li key={logo.id}>
                    <Logo logo={logo} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClientLogosSection;
