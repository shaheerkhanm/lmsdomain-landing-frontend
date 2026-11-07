"use client";

import React from "react";
import AppShell from "../AppShell";
import { Sparkles, Send, Bot, CheckCircle2, AlertTriangle, ArrowRight, CornerDownRight } from "lucide-react";
import { MOCKUP_IDENTITY } from "@/content/mockup-data";

export interface DomieScreenProps {
  compact?: boolean;
}

export function DomieScreen({ compact = false }: DomieScreenProps) {
  return (
    <AppShell activeMenuItem="Domie AI" compact={compact} title="Ask Domie AI Assistant">
      <div className="h-full flex flex-col gap-3 overflow-hidden text-[11px]">
        {/* Main AI Chat & Summary Container */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EFEA] shrink-0">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg bg-gradient-to-tr from-[#8E7CF8] to-[#6D58E8] text-white flex items-center justify-center">
                <Sparkles className="size-3.5" />
              </div>
              <div>
                <span className="font-bold text-[12px] text-[#161616]">
                  Domie AI Copilot
                </span>
                <span className="text-[9px] text-[#717684] ml-2">
                  Grounded in your academy&apos;s courses, batches & attendance
                </span>
              </div>
            </div>
            <span className="text-[9px] font-semibold text-[#6D58E8] bg-[#8E7CF8]/15 px-2 py-0.5 rounded-full border border-[#8E7CF8]/30">
              Zero Hallucination Mode
            </span>
          </div>

          {/* Conversation Body */}
          <div className="flex-1 overflow-hidden min-h-0 py-2.5 space-y-3">
            {/* User Question */}
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-[#161616] text-white rounded-2xl rounded-tr-xs px-3 py-2 text-[11px] shadow-2xs">
                Which batches have the lowest completion rates this week, and who needs follow-up?
              </div>
            </div>

            {/* Domie Answer Card */}
            <div className="flex items-start gap-2.5">
              <div className="size-6 rounded-lg bg-[#8E7CF8]/20 border border-[#8E7CF8]/40 text-[#6D58E8] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="size-3" />
              </div>

              <div className="flex-1 bg-[#FAF9F6] border border-[#EAE8E2] rounded-2xl rounded-tl-xs p-3 space-y-2.5 shadow-2xs">
                <div className="text-[11px] text-[#161616] font-medium leading-relaxed">
                  Based on live batch attendance and LMS progress data for this week (Asia/Kolkata), here is your batch activity status:
                </div>

                {/* Grounded Summary Table */}
                <div className="bg-white rounded-xl border border-[#EAE8E2] overflow-hidden">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-[#F5F6F8] border-b border-[#EAE8E2] text-[9px] font-bold text-[#8F94A0] uppercase">
                        <th className="p-2">Batch / Course</th>
                        <th className="p-2 text-center">Enrolled</th>
                        <th className="p-2 text-center">Pacing</th>
                        <th className="p-2">Flag / Observation</th>
                        <th className="p-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EFEA]">
                      <tr>
                        <td className="p-2 font-semibold text-[#161616]">
                          NEET Biology (Batch B)
                        </td>
                        <td className="p-2 text-center text-[#525866]">288</td>
                        <td className="p-2 text-center text-[#D97706] font-bold">61%</td>
                        <td className="p-2 text-[#717684]">
                          3 learners inactive &gt; 7 days
                        </td>
                        <td className="p-2 text-right">
                          <button className="px-2 py-0.5 rounded bg-[#161616] text-white text-[8px] font-bold">
                            Send Nudge
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-[#161616]">
                          Python for Beginners
                        </td>
                        <td className="p-2 text-center text-[#525866]">356</td>
                        <td className="p-2 text-center text-[#161616] font-bold">68%</td>
                        <td className="p-2 text-[#717684]">
                          5 assignment reviews waiting
                        </td>
                        <td className="p-2 text-right">
                          <button className="px-2 py-0.5 rounded border border-[#EAE8E2] text-[#161616] text-[8px] font-bold">
                            Review Submissions
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold text-[#161616]">
                          Spoken English (Batch A)
                        </td>
                        <td className="p-2 text-center text-[#525866]">274</td>
                        <td className="p-2 text-center text-[#059669] font-bold">77%</td>
                        <td className="p-2 text-[#059669] flex items-center gap-1 font-medium">
                          <CheckCircle2 className="size-2.5" />
                          High attendance (91%)
                        </td>
                        <td className="p-2 text-right">
                          <span className="text-[8px] text-[#8F94A0]">On Schedule</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-2 pt-1 text-[9px] text-[#717684]">
                  <span>Sources: Batch Rosters, Zoom Logs, LMS Progress Records</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="pt-2 border-t border-[#F0EFEA] flex items-center gap-2 shrink-0">
            <div className="flex-1 relative">
              <input
                type="text"
                readOnly
                placeholder="Ask Domie to analyze batch performance, draft course outcomes..."
                className="w-full h-8 pl-3 pr-8 text-[11px] rounded-lg bg-[#FAF9F6] border border-[#EAE8E2] text-[#161616] placeholder:text-[#8F94A0] focus:outline-hidden"
              />
              <Sparkles className="size-3 text-[#8E7CF8] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button className="size-8 rounded-lg bg-[#161616] text-white flex items-center justify-center shrink-0">
              <Send className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default DomieScreen;

