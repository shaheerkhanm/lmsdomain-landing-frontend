"use client";

import React, { useState } from "react";
import Link from "next/link";

const LANGUAGES = [
  { code: "EN", flag: "🇬🇧", name: "English", preview: "Distributed microservices with event-driven Kafka pipelines." },
  { code: "ES", flag: "🇪🇸", name: "Spanish", preview: "Microservicios distribuidos con canalizaciones Kafka dirigidas por eventos." },
  { code: "FR", flag: "🇫🇷", name: "French", preview: "Microservices distribués avec des pipelines Kafka pilotés par les événements." },
  { code: "AR", flag: "🇦🇪", name: "Arabic", preview: "الخدمات المصغرة الموزعة مع مسارات كافكا القائمة على الأحداث." },
];

export function ResultSection({ data }: { data?: any }) {
  const [selectedLang, setSelectedLang] = useState(0);
  const [activeBitrate, setActiveBitrate] = useState("1080p60");

  const currentLang = LANGUAGES[selectedLang];

  return (
    <section id="bento-grid" className="py-20 sm:py-28 bg-[#FAF9F6] font-inter">
      <div className="main-padding max-w-6xl mx-auto space-y-12">
        {/* Section Header (PitchBot 00:08 Style) */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs mb-4">
            <span className="size-2 rounded-full bg-MainColor" />
            <span>GLOBAL PEDAGOGY & INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Omni-channel delivery, any cohort, multi-language.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Scalable architecture engineered for international academies with native DRM protection, localized subtitles, and zero revenue sharing.
          </p>
        </div>

        {/* Asymmetric Bento Grid (PitchBot 00:08-00:10 Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Card 1: Interactive Multilingual Transcripts (Span 7) */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">
                  Multilingual AI Engine
                </span>
                <span className="text-xs font-semibold text-slate-500">20+ Languages Ready</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  All major languages, localized in real time.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Translate lecture transcripts, quiz prompts, and student workbooks with verified technical terminology.
                </p>
              </div>

              {/* Interactive Language Switcher Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {LANGUAGES.map((lang, idx) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setSelectedLang(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedLang === idx
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code}</span>
                  </button>
                ))}
              </div>

              {/* Live Subtitle Translation Preview Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>ACTIVE SUBTITLE: {currentLang.name.toUpperCase()}</span>
                  <span className="text-emerald-600 font-bold">100% Sync ✓</span>
                </div>
                <p className="text-sm font-medium text-slate-800 italic">
                  &ldquo;{currentLang.preview}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Automatic WebVTT & SRT Export</span>
              <span className="text-MainColor font-bold">Instant Captions</span>
            </div>
          </div>

          {/* Card 2: Platform Scale Stat Card (Span 5) */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  Infrastructure SLA
                </span>
                <span className="text-xs font-semibold text-emerald-600">Enterprise Grade</span>
              </div>

              <div className="space-y-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-manrope block">
                  100%
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  Single-Tenant Database Isolation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every academy instance runs with dedicated schemas, zero shared student data, and custom SSL domains.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Platform Take Rate</span>
                  <span className="text-lg font-extrabold text-emerald-600">0% Cut</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">DRM Enforcement</span>
                  <span className="text-lg font-extrabold text-MainColor">Widevine L1</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Full Data Sovereignty</span>
              <span className="text-slate-800 font-bold">Zero Vendor Lock-In</span>
            </div>
          </div>

          {/* Card 3: Adaptive Bitrate Video & DRM Card (Span 6) */}
          <div className="md:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-MainColor bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">
                Low-Latency Streaming
              </span>
              <div className="flex gap-1">
                {["720p", "1080p60", "4K"].map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setActiveBitrate(res)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                      activeBitrate === res
                        ? "bg-MainColor text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Adaptive Bitrate Edge Video CDN
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Optimized HLS & DASH packaging cached at 300+ global edge locations for lag-free playback on mobile networks.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs flex items-center justify-between">
              <span className="text-purple-300">STREAM QUALITY: {activeBitrate}</span>
              <span className="text-emerald-400 font-bold">BUFFER TIME: &lt; 200ms</span>
            </div>
          </div>

          {/* Card 4: Ecosystem Integrations (Span 6) */}
          <div className="md:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                Plug-and-Play Ecosystem
              </span>
              <span className="text-xs font-semibold text-slate-500">Native Connectors</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Connect your existing video & payment stack.
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Zero custom code or webhook friction. Plug directly into your verified services.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-800">
                📹 Zoom & Meet
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-800">
                💳 Stripe & Razorpay
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-800">
                ⚡ AWS CloudFront
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultSection;
