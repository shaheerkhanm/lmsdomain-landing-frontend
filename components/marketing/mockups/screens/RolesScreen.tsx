"use client";

import React from "react";
import AppShell from "../AppShell";
import { ShieldCheck, UserCheck, Plus, Check, X, Lock } from "lucide-react";
import { MOCKUP_IDENTITY } from "@/content/mockup-data";

interface TeamMember {
  name: string;
  email: string;
  role: "Admin" | "Instructor";
  assignedBatches: string;
  status: "Active";
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Shaheer Khan",
    email: "shaheer@northstaracademy.in",
    role: "Admin",
    assignedBatches: "All Batches",
    status: "Active",
  },
  {
    name: "Dr. K. Sharma",
    email: "k.sharma@northstaracademy.in",
    role: "Instructor",
    assignedBatches: "NEET Biology (Batch B)",
    status: "Active",
  },
  {
    name: "Prof. Ananya R.",
    email: "ananya.r@northstaracademy.in",
    role: "Instructor",
    assignedBatches: "IELTS Speaking 1:1",
    status: "Active",
  },
  {
    name: "Vikram Sen",
    email: "vikram@northstaracademy.in",
    role: "Instructor",
    assignedBatches: "Python for Beginners",
    status: "Active",
  },
  {
    name: "Meera Nair",
    email: "meera.n@northstaracademy.in",
    role: "Instructor",
    assignedBatches: "Spoken English (Batch A)",
    status: "Active",
  },
];

const INSTRUCTOR_PERMISSIONS = [
  {
    label: "Manage own courses",
    description: "Upload video lessons, PDFs, and edit lesson sequences for assigned courses.",
    enabled: true,
  },
  {
    label: "Take live classes",
    description: "Host scheduled Zoom classes and record student attendance.",
    enabled: true,
  },
  {
    label: "View own batch reports",
    description: "Inspect quiz scores, assignment submissions, and progress for assigned batches.",
    enabled: true,
  },
  {
    label: "View payments & revenue",
    description: "Access academy financial statements, gateway settlements, and payouts.",
    enabled: false,
  },
];

export function RolesScreen() {
  return (
    <AppShell activeMenuItem="Admin" title="Team Roles & Permissions (RBAC)">
      <div className="h-full flex flex-col gap-3 overflow-hidden text-[11px]">
        {/* Header toolbar */}
        <div className="bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#161616]">Staff & Role Permissions</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] font-medium border border-[#A7F3D0]">
              Role-Based Access Control
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg bg-[#161616] text-white text-[10px] font-semibold flex items-center gap-1.5 shadow-xs">
              <Plus className="size-3" />
              <span>Invite Staff</span>
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Team Members (Left) + Permissions Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
          {/* Team Members List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#F0EFEA] shrink-0">
              <h4 className="text-[12px] font-bold text-[#161616]">
                Academy Team ({TEAM_MEMBERS.length})
              </h4>
              <span className="text-[9px] text-[#717684]">
                Roles: Admin, Instructor
              </span>
            </div>

            <div className="flex-1 overflow-hidden min-h-0">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="border-b border-[#F0EFEA] text-[9px] font-bold text-[#8F94A0] uppercase">
                    <th className="pb-1.5 font-medium">Name & Email</th>
                    <th className="pb-1.5 font-medium">Role</th>
                    <th className="pb-1.5 font-medium">Assigned Scope</th>
                    <th className="pb-1.5 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F7F5]">
                  {TEAM_MEMBERS.map((member, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-2">
                        <div className="font-semibold text-[#161616]">{member.name}</div>
                        <div className="text-[9px] text-[#8F94A0]">{member.email}</div>
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-bold border ${
                            member.role === "Admin"
                              ? "bg-[#161616] text-white border-[#161616]"
                              : "bg-[#F3F4F6] text-[#161616] border-[#E5E7EB]"
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="py-2 text-[#525866] truncate max-w-[140px]">
                        {member.assignedBatches}
                      </td>
                      <td className="py-2 text-right">
                        <span className="text-[8px] font-semibold text-[#059669] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-[#F0EFEA] flex items-center justify-between text-[9px] text-[#8F94A0] shrink-0">
              <span>{MOCKUP_IDENTITY.timeZoneText}</span>
              <span className="text-[#161616] font-medium">Strict least-privilege access</span>
            </div>
          </div>

          {/* Instructor Role Permissions (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#EAE8E2] p-3 shadow-2xs flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#F0EFEA] shrink-0">
              <div className="flex items-center gap-1.5">
                <Lock className="size-3.5 text-[#161616]" />
                <h4 className="text-[12px] font-bold text-[#161616]">
                  Role: Instructor
                </h4>
              </div>
              <span className="text-[9px] bg-[#FAF5FF] text-[#6D58E8] font-semibold px-2 py-0.5 rounded border border-[#8E7CF8]/30">
                Staff Profile
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-hidden min-h-0 pt-1">
              {INSTRUCTOR_PERMISSIONS.map((perm, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl border border-[#F0EFEA] bg-[#FAFAF9] flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 pr-1">
                    <div className="font-semibold text-[#161616] text-[10px]">
                      {perm.label}
                    </div>
                    <div className="text-[9px] text-[#717684] line-clamp-1 mt-0.5">
                      {perm.description}
                    </div>
                  </div>

                  {/* Toggle switch visual */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    <div
                      className={`w-8 h-4.5 rounded-full p-0.5 flex items-center transition-colors ${
                        perm.enabled
                          ? "bg-[#161616] justify-end"
                          : "bg-[#D5D5D0] justify-start"
                      }`}
                    >
                      <div className="size-3.5 rounded-full bg-white shadow-xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#F0EFEA] text-[9px] text-[#717684] shrink-0">
              Instructors only see their own courses & batches. Revenue data remains Admin-only.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default RolesScreen;

