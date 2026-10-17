"use client";

import React from "react";
import Link from "next/link";

const INTEGRATIONS = [
  { name: "Zoom Video", category: "Live Classrooms", badge: "Native WebRTC" },
  { name: "Google Meet", category: "Cohort Meetings", badge: "OAuth 2.0" },
  { name: "Stripe", category: "Global Payments", badge: "135+ Currencies" },
  { name: "Razorpay", category: "Regional Checkout", badge: "UPI & NetBanking" },
  { name: "Vimeo OTT", category: "Video Ingestion", badge: "Adaptive HLS" },
  { name: "AWS CloudFront", category: "Edge Delivery", badge: "Global CDN" },
];

export function TestimonialSection({ data }: { data: any }) {
  return (
    <section id="security-integrations" className="py-24 bg-slate-50/70 border-t border-slate-200/80 font-inter">
      <div className="main-padding space-y-16">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-MainColor">
            Security & Interoperability
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 font-manrope tracking-tight leading-tight">
            Enterprise Security & Native Integrations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Built on resilient cloud architecture, LMS Domain connects seamlessly with your existing video streaming, payment processing, and authentication workflows.
          </p>
        </div>

        {/* Security Architecture 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-purple-50 text-MainColor font-bold flex items-center justify-center text-lg">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-manrope">
              Forensic Anti-Piracy Shield
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Protect high-value curriculum with hardware-enforced Widevine L1 & FairPlay encryption, dynamic student watermark burn-in, and screen capture prevention.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-purple-50 text-MainColor font-bold flex items-center justify-center text-lg">
              🔒
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-manrope">
              Strict Tenant Data Segregation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every training academy operates with isolated database scopes, ensuring student assessments, rosters, and payment logs remain strictly confidential.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-purple-50 text-MainColor font-bold flex items-center justify-center text-lg">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-slate-950 font-manrope">
              High-Concurrency Edge CDN
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Adaptive bitrate streaming cached across global edge locations ensures jitter-free video playback even during high-volume cohort lecture launches.
            </p>
          </div>
        </div>

        {/* Verified Integrations Strip */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-manrope">
                Verified Native Ecosystem Integrations
              </h4>
              <p className="text-xs text-slate-500">
                Plug in your existing tools with zero custom code or webhook friction.
              </p>
            </div>
            <Link
              href="/features"
              className="text-xs font-semibold text-MainColor hover:underline shrink-0"
            >
              Explore Integration Specs →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INTEGRATIONS.map((tool, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 text-center space-y-1 hover:border-slate-300 transition-colors"
              >
                <span className="text-xs font-bold text-slate-900 block font-manrope">
                  {tool.name}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {tool.category}
                </span>
                <span className="inline-block text-[10px] font-mono text-MainColor bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">
                  {tool.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
