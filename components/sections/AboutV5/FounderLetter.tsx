import React from "react";
import Image from "next/image";
import { Linkedin, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Founder = { name: string; role: string; photo?: string; bio?: string; linkedinUrl?: string };

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return (p.length === 1 ? p[0].slice(0, 2) : p[0][0] + p[p.length - 1][0]).toUpperCase();
}

// Default words for each founder card. Admin > About > team "bio" replaces these when filled in.
const DEFAULT_LINES = [
  "Great teaching deserves great tools. We are building the platform we wish every academy already had.",
  "An academy's website should belong to the academy: its brand, its learners and every sale it makes.",
];

/** One card per founder. Works without photos (large monogram); a photo from Admin replaces it. */
export function FounderCards({ founders, company }: { founders: Founder[]; company: string }) {
  return (
    <div className={cn("mx-auto grid gap-4", founders.length > 1 ? "max-w-[1000px] md:grid-cols-2" : "max-w-[500px]")}>
      {founders.map((f, i) => (
        <article
          key={f.name}
          style={{ "--rv-delay": `${i * 120}ms` } as React.CSSProperties}
          className="rv-v4 group relative flex flex-col overflow-hidden rounded-[28px] bg-[#F4F5F8] transition-[translate] duration-500 hover:-translate-y-1"
        >
          {/* Portrait area */}
          <div className="relative h-[260px] overflow-hidden bg-[#0A0A0B]">
            {f.photo ? (
              <Image src={f.photo} alt={f.name} fill sizes="500px" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
            ) : (
              <>
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute h-[340px] w-[340px] rounded-full blur-3xl",
                    i % 2 ? "-right-24 -top-24 bg-[#3B5BFF]/40" : "-left-24 -top-24 bg-[#6C4BFF]/45"
                  )}
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-10 right-4 select-none font-urbanist text-[200px] font-semibold leading-none tracking-[-0.06em] text-white/[0.06]"
                >
                  {initials(f.name)}
                </span>
                <span className="absolute left-7 top-7 grid h-20 w-20 place-items-center rounded-[22px] bg-white font-urbanist text-[28px] font-semibold tracking-[-0.03em] text-[#0A0A0B] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-rotate-3">
                  {initials(f.name)}
                </span>
              </>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-7 pb-6 pt-16">
              <p className="font-urbanist text-[26px] font-semibold tracking-[-0.02em] text-white">{f.name}</p>
              <p className="text-[13.5px] text-white/70">
                {f.role}, {company}
              </p>
            </div>
          </div>

          {/* Words */}
          <div className="flex flex-1 flex-col justify-between gap-6 p-7">
            <p className="font-urbanist text-[19px] font-medium leading-[1.45] tracking-[-0.01em] text-[#18181B] [text-wrap:pretty]">
              &ldquo;{f.bio?.trim() || DEFAULT_LINES[i % DEFAULT_LINES.length]}&rdquo;
            </p>
            {f.linkedinUrl && (
              <a
                href={f.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[#18181B] transition-colors hover:bg-[#0A66C2] hover:text-white"
              >
                <Linkedin className="h-3.5 w-3.5" /> Connect on LinkedIn
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/** The founders' note, signed by both. */
export function FounderLetter({ founders }: { founders: Founder[] }) {
  const firstNames = founders.map((f) => f.name.split(/\s+/)[0]);
  const signed = firstNames.length > 1 ? `${firstNames.slice(0, -1).join(", ")} & ${firstNames[firstNames.length - 1]}` : firstNames[0];

  return (
    <div className="rv-v4 relative mx-auto max-w-[920px]">
      <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-3 rotate-[1.5deg] rounded-[28px] bg-[#ECECF1]" />
      <div aria-hidden="true" className="absolute inset-x-3 -bottom-1.5 top-1.5 -rotate-[1deg] rounded-[28px] bg-[#F4F5F8]" />

      <div className="relative overflow-hidden rounded-[28px] border border-[#ECECF1] bg-white p-8 shadow-[0_1px_2px_rgba(16,16,24,0.04),0_40px_80px_-40px_rgba(16,16,24,0.35)] sm:p-12 lg:p-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0,transparent_35px,#F4F4F6_35px,#F4F4F6_36px)] opacity-60 [mask-image:linear-gradient(180deg,transparent,#000_30%,#000_70%,transparent)]" />
        <div className="relative">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6C4BFF]">A note from the founders</p>
          <Quote className="mt-5 h-9 w-9 fill-[#0A0A0B] text-[#0A0A0B]" aria-hidden="true" />
          <p className="mt-5 font-urbanist text-[clamp(24px,2.8vw,34px)] font-medium leading-[1.3] tracking-[-0.02em] text-[#0A0A0B] [text-wrap:balance]">
            Every great academy starts with a teacher who cares. Our job is to take care of everything else.
          </p>
          <div className="mt-7 space-y-4 text-[16.5px] leading-[1.75] text-[#52525B]">
            <p>
              We kept meeting brilliant teachers who were running their academies on spreadsheets, payment links and chat groups, and
              handing a share of every sale to platforms that put their own name first.
            </p>
            <p>
              So we set out to build something better: one place to teach, test and get paid, on the academy&apos;s own website, under its
              own name. No middlemen, no commission, no compromise on how you teach.
            </p>
            <p>
              Today we build every part of LMS Domain ourselves, we listen closely to the academies that use it, and we help each new academy
              get started. When you grow, we grow. That is the promise we work to every day.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-[#F1F1F4] pt-8">
            <div>
              <p className="font-urbanist text-[30px] font-medium italic leading-none tracking-[-0.02em] text-[#0A0A0B]">{signed}</p>
              <p className="mt-2 text-[13px] text-[#71717A]">Founders, LMS Domain</p>
            </div>
            <div className="flex">
              {founders.map((f, i) =>
                f.photo ? (
                  <Image key={f.name} src={f.photo} alt="" width={96} height={96} className={cn("h-12 w-12 rounded-full object-cover object-top ring-4 ring-white", i > 0 && "-ml-3")} />
                ) : (
                  <span key={f.name} className={cn("grid h-12 w-12 place-items-center rounded-full bg-[#0A0A0B] text-[14px] font-semibold text-white ring-4 ring-white", i > 0 && "-ml-3")}>
                    {initials(f.name)}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
