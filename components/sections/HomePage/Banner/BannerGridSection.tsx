"use client";

import React from "react";
import Link from "next/link";
import { Icons } from "@/components/layout/common/Icons";
import { sanitizeHtml } from "@/lib/sanitize";

export function BannerGridSection({ data, graphData }: { data: any; graphData: any }) {
  const sanitizedGraphContent = sanitizeHtml(graphData?.content);

  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-5 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.08)] font-inter">
      {/* Precision Chrome Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-center gap-1 px-3 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 font-mono text-[11px] text-slate-500">
          <span>lmsdomain.com/dashboard/portal</span>
        </div>
        <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          • System Operational
        </span>
      </div>

      {/* Main Grid Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left Analytics Card */}
        <div className="md:col-span-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Multi-Batch Metrics
            </span>
            <div className="rounded-lg bg-white p-3 border border-slate-200/60 shadow-xs">
              <img
                src={data?.image || "/assets/img/banner/grid-1-img.jpg"}
                alt={data?.altImage || "Analytics preview"}
                className="w-full h-auto max-h-[180px] object-contain rounded-md"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
            <span>Automated Attendance</span>
            <span className="font-semibold text-emerald-600">99.8% Synced</span>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="md:col-span-5 rounded-xl border border-slate-200/80 bg-linear-to-b from-purple-50/40 to-slate-50/60 p-4 flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-xs font-medium text-slate-600 pb-2">
            <span>Live Interactive Session</span>
            <span className="flex items-center gap-1 text-MainColor font-semibold">
              <span className="size-1.5 rounded-full bg-MainColor animate-ping" />
              L1 DRM Active
            </span>
          </div>

          <div className="py-2 flex justify-center w-full">
            <img
              src={data?.image1 || "/assets/img/banner/banner-main-img.png"}
              alt={data?.altImage1 || "LMS Platform preview"}
              className="max-h-[220px] w-auto object-contain drop-shadow-md rounded-lg"
            />
          </div>

          {/* Toast Chip */}
          <div className="w-full mt-2 flex items-center gap-2 p-2 bg-white/95 backdrop-blur-xs rounded-lg border border-slate-200/80 shadow-xs text-xs">
            <div className="size-6 rounded-md bg-MainColor text-white flex items-center justify-center shrink-0">
              <Icons.tick_button className="size-3.5 fill-current" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-slate-900 truncate">New Course Deployed</span>
              <span className="text-[10px] text-slate-500">240 students enrolled</span>
            </div>
          </div>
        </div>

        {/* Right Metric & Quick Action Card */}
        <div className="md:col-span-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Global Delivery
            </span>
            <div className="rounded-lg bg-white p-3 border border-slate-200/60 shadow-xs">
              <img
                src={data?.image3 || "/assets/img/banner/grid-2-img.jpg"}
                alt={data?.altImage3 || "Global distribution preview"}
                className="w-full h-auto max-h-[140px] object-contain rounded-md"
              />
            </div>

            {graphData?.title && (
              <div className="pt-2">
                <span className="text-2xl font-bold text-slate-950 font-manrope block">
                  {graphData.title}
                </span>
                {sanitizedGraphContent && (
                  <div
                    className="text-xs text-slate-600 mt-0.5 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sanitizedGraphContent }}
                  />
                )}
              </div>
            )}
          </div>

          <Link
            href="/features"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <Icons.globe_icon className="size-3.5 text-white" />
            <span>{graphData?.buttonText || "Explore Core APIs"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BannerGridSection;
