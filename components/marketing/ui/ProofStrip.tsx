"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ClientLogoItem {
  _id?: string;
  name?: string;
  logo?: string;
  url?: string;
}

export interface ProofStripProps {
  heading?: string;
  logos?: ClientLogoItem[];
  metrics?: string[];
  metricsLine?: string;
  className?: string;
}

export const APPROVED_METRICS = [
  "2,000+ learners",
  "100+ courses",
  "100+ live classes delivered",
];

export function ProofStrip({
  heading = "Academies teaching with LMS Domain",
  logos = [],
  metrics = APPROVED_METRICS,
  metricsLine,
  className,
}: ProofStripProps) {
  // Filter out any unapproved placeholder names (e.g. Client-N, Client4)
  const validLogos = (logos || []).filter((l) => {
    if (!l || !l.logo) return false;
    const name = (l.name || "").toLowerCase();
    return !/^client\s*-?\s*\d+/i.test(name);
  });

  const displayMetricsLine =
    metricsLine || (metrics && metrics.length > 0 ? metrics.join(" · ") : APPROVED_METRICS.join(" · "));

  return (
    <div
      className={cn(
        "w-full py-10 sm:py-14 border-y border-[#EAE8E2] bg-white font-urbanist text-center",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Strip Heading */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] text-[#5925DC] mb-6">
          {heading}
        </p>

        {/* Client Logos Row */}
        {validLogos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 mb-6">
            {validLogos.map((client, idx) => {
              const imageElement = (
                <div className="relative h-9 sm:h-11 w-auto max-w-[160px] flex items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                  <Image
                    src={client.logo!}
                    alt={client.name || "Client academy"}
                    width={160}
                    height={44}
                    className="h-full w-auto object-contain max-h-11"
                  />
                </div>
              );

              if (client.url && client.url.startsWith("http")) {
                return (
                  <Link
                    key={client._id || client.name || idx}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:outline-2 focus-visible:outline-[#7B5CF5] rounded-lg"
                    aria-label={`${client.name || "Academy"} website (opens in a new window)`}
                  >
                    {imageElement}
                  </Link>
                );
              }

              return (
                <div key={client._id || client.name || idx}>
                  {imageElement}
                </div>
              );
            })}
          </div>
        )}

        {/* Approved Metric Line */}
        <p className="text-xs sm:text-sm font-medium text-[#6B6F76] tracking-tight">
          {displayMetricsLine}
        </p>
      </div>
    </div>
  );
}

export default ProofStrip;

