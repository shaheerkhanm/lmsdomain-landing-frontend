import React from "react";

const PLATFORM_SPECIFICATIONS = [
  {
    title: "Widevine L1 & FairPlay",
    tagline: "Studio-Grade Hardware DRM",
    description: "Prevents screen-capture tools and unauthorized stream rips with hardware-level video decryption.",
    badge: "Anti-Piracy Standard",
  },
  {
    title: "Zero-Leakage Isolation",
    tagline: "Multi-Tenant Architecture",
    description: "Each academy operates in an isolated tenant schema with encrypted student data and individual SSL certificates.",
    badge: "Enterprise Security",
  },
  {
    title: "Distributed Edge Delivery",
    tagline: "Global CDN Video Streaming",
    description: "Optimized adaptive bitrate streaming with edge-cached assets for smooth playback on mobile and desktop.",
    badge: "Low-Latency Edge",
  },
  {
    title: "Sovereign Custom Domain",
    tagline: "Custom Domain Onboarding",
    description: "Operate entirely under your own domain name with customized email SMTP, receipts, and brand colors.",
    badge: "Full Brand Control",
  },
];

export function ResultCounterSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-inter">
      {PLATFORM_SPECIFICATIONS.map((spec, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="size-2 rounded-full bg-MainColor" />
            <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
              {spec.badge}
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-manrope tracking-tight leading-snug">
              {spec.title}
            </h3>
            <p className="text-xs font-bold text-MainColor uppercase tracking-wider">
              {spec.tagline}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {spec.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultCounterSection;
