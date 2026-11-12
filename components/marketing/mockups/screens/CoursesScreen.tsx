"use client";

import React from "react";
import AppShell from "../AppShell";
import { MOCKUP_COURSE_COMPLETIONS } from "@/content/mockup-data";
import { Plus, Filter, Search, MoreHorizontal, BookOpen, Clock, Users } from "lucide-react";

const THUMBNAIL_COLORS = [
  "from-amber-400 to-orange-500",
  "from-blue-500 to-indigo-600",
  "from-emerald-400 to-teal-600",
  "from-purple-400 to-pink-500",
  "from-rose-400 to-red-500",
  "from-cyan-400 to-blue-500",
];

export function CoursesScreen() {
  return (
    <AppShell activeMenuItem="Course" title="Course Management">
      <div className="h-full flex flex-col gap-3 overflow-hidden text-[11px]">
        {/* Top Header & Actions */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#161616]">Courses</span>
            <div className="flex items-center gap-1 bg-[#F5F6F8] p-0.5 rounded-lg text-[10px] font-medium text-[#717684]">
              <span className="px-2 py-0.5 rounded-md bg-white text-[#161616] font-semibold shadow-2xs">
                All (6)
              </span>
              <span className="px-2 py-0.5 rounded-md hover:text-[#161616]">Live Batches (3)</span>
              <span className="px-2 py-0.5 rounded-md hover:text-[#161616]">Self-Paced (3)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 rounded-lg border border-[#EAE8E2] text-[10px] font-medium text-[#525866] flex items-center gap-1.5 hover:bg-[#F5F6F8]">
              <Filter className="size-3 text-[#8F94A0]" />
              <span>Filter</span>
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#161616] text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-xs">
              <Plus className="size-3" />
              <span>Create Course</span>
            </button>
          </div>
        </div>

        {/* Courses Table Card */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-hidden min-h-0">
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="border-b border-[#F0EFEA] text-[9px] font-bold text-[#8F94A0] uppercase">
                  <th className="pb-2 font-medium">Course Details</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium text-center">Lessons</th>
                  <th className="pb-2 font-medium text-center">Active Learners</th>
                  <th className="pb-2 font-medium text-right">Price</th>
                  <th className="pb-2 font-medium text-center">Status</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7F7F5]">
                {MOCKUP_COURSE_COMPLETIONS.map((course, idx) => {
                  const gradient = THUMBNAIL_COLORS[idx % THUMBNAIL_COLORS.length];
                  return (
                    <tr key={course.id} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2.5">
                          {/* Coloured Block Thumbnail */}
                          <div
                            className={`size-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 shadow-2xs font-bold text-[9px]`}
                          >
                            <BookOpen className="size-3.5 opacity-90" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-[#161616] truncate max-w-[200px]">
                              {course.name}
                            </div>
                            <div className="text-[9px] text-[#8F94A0] flex items-center gap-1 mt-0.5">
                              <span>Drip enabled</span>
                              <span>·</span>
                              <span>Certificates on finish</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-[#525866]">
                        <span className="px-1.5 py-0.5 rounded bg-[#F5F6F8] text-[9px] font-medium border border-[#EAE8E2]/60">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-2.5 text-center text-[#525866] font-medium">
                        {course.lessons}
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="font-semibold text-[#161616]">
                          {course.students}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-[#161616]">
                        {course.price}
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                          Active
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-[#8F94A0]">
                        <button className="p-1 hover:text-[#161616] rounded hover:bg-[#F5F6F8]">
                          <MoreHorizontal className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2.5 border-t border-[#F0EFEA] flex items-center justify-between text-[9px] text-[#8F94A0]">
            <span>Showing 6 of 6 courses · Your Academy</span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[#161616]">1</span>
              <span>of 1 page</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default CoursesScreen;

