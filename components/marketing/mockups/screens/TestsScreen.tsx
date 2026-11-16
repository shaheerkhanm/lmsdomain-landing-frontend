"use client";

import React from "react";
import AppShell from "../AppShell";
import { MOCKUP_TESTS } from "@/content/mockup-data";
import { Plus, Award, CheckCircle2, FileQuestion, BarChart2, MoreHorizontal } from "lucide-react";

export function TestsScreen() {
  return (
    <AppShell activeMenuItem="Course" title="Assessments & Tests">
      <div className="h-full flex flex-col gap-3 overflow-hidden text-[11px]">
        {/* Header toolbar */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#161616]">Question Banks & Mock Exams</span>
            <div className="flex items-center gap-1 bg-[#F5F6F8] p-0.5 rounded-lg text-[10px] font-medium text-[#717684]">
              <span className="px-2 py-0.5 rounded-md bg-white text-[#161616] font-semibold shadow-2xs">
                Active Tests (5)
              </span>
              <span className="px-2 py-0.5 rounded-md hover:text-[#161616]">Drafts (2)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 rounded-lg border border-[#EAE8E2] text-[10px] font-medium text-[#525866] hover:bg-[#F5F6F8]">
              Export Scores
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#161616] text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-xs">
              <Plus className="size-3" />
              <span>Create Assessment</span>
            </button>
          </div>
        </div>

        {/* Tests & Question Banks Table */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-hidden min-h-0">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-[#F0EFEA] text-[9px] font-bold text-[#8F94A0] uppercase">
                  <th className="pb-2 font-medium">Test / Assessment Title</th>
                  <th className="pb-2 font-medium">Subject</th>
                  <th className="pb-2 font-medium text-center">Questions</th>
                  <th className="pb-2 font-medium text-center">Duration</th>
                  <th className="pb-2 font-medium text-center">Attempts</th>
                  <th className="pb-2 font-medium text-center">Avg. Score</th>
                  <th className="pb-2 font-medium text-center">Certificate</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7F7F5]">
                {MOCKUP_TESTS.map((test) => (
                  <tr key={test.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-lg bg-[#FAF5FF] border border-[#8E7CF8]/30 flex items-center justify-center text-[#6D58E8] shrink-0">
                          <FileQuestion className="size-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#161616] truncate max-w-[200px]">
                            {test.title}
                          </div>
                          <div className="text-[9px] text-[#8F94A0] mt-0.5">
                            Automated scoring · Pass mark: {test.passingScore}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 text-[#525866]">
                      <span className="px-1.5 py-0.5 rounded bg-[#F5F6F8] text-[9px] font-medium border border-[#EAE8E2]/60">
                        {test.subject}
                      </span>
                    </td>
                    <td className="py-2.5 text-center text-[#525866] font-medium">
                      {test.questionsCount}
                    </td>
                    <td className="py-2.5 text-center text-[#525866]">
                      {test.durationMinutes} mins
                    </td>
                    <td className="py-2.5 text-center font-semibold text-[#161616]">
                      {test.attempts}
                    </td>
                    <td className="py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#F3F4F6] text-[#161616] border border-[#E5E7EB]">
                        {test.avgScore}
                      </span>
                    </td>
                    <td className="py-2.5 text-center">
                      <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 py-0.5 rounded">
                        <Award className="size-2.5" />
                        On completion
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-[#8F94A0]">
                      <button className="p-1 hover:text-[#161616] rounded hover:bg-[#F5F6F8]">
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2.5 border-t border-[#F0EFEA] flex items-center justify-between text-[9px] text-[#8F94A0]">
            <span>Timed testing windows & passing score enforcement</span>
            <span className="text-[#161616] font-medium">5 active assessments</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default TestsScreen;

