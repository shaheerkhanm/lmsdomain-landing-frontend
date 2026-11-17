"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type Review = { id: string; name: string; role?: string; quote: string; avatar?: string };

/** Review cards that grow with "Show more" when an academy has many published reviews. */
export function TestimonialsMore({ items, initial = 6, step = 6 }: { items: Review[]; initial?: number; step?: number }) {
  const [count, setCount] = useState(initial);
  const shown = items.slice(0, count);
  const left = items.length - shown.length;

  return (
    <>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {shown.map((t, i) => (
          <figure
            key={t.id}
            style={{ animationDelay: `${(i % step) * 60}ms` }}
            className={`flex flex-col justify-between gap-8 rounded-[28px] bg-[#F4F5F8] p-7 ${i >= initial ? "mo-swap" : ""}`}
          >
            <blockquote className="text-[16px] leading-[1.65] text-[#27272A]">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              {t.avatar ? (
                <Image src={t.avatar} alt={t.name} width={88} height={88} className="h-11 w-11 shrink-0 rounded-full object-cover object-top" />
              ) : (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-[13px] font-semibold text-white">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
              <div>
                <p className="text-[14.5px] font-semibold text-[#0A0A0B]">{t.name}</p>
                {t.role && <p className="text-[13.5px] text-[#65656E]">{t.role}</p>}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {left > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + step)}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-5 text-[14px] font-semibold text-[#0A0A0B] transition-colors hover:border-[#0A0A0B]"
          >
            Show more reviews ({left})
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
