"use client";

import React from "react";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  GraduationCap,
  Flame,
  Calendar,
  BookText,
  PenTool,
  BookMarked,
  Users,
  CreditCard,
  ShieldCheck,
  UserCheck,
  Search,
  Bell,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCKUP_IDENTITY } from "@/content/mockup-data";

export interface AppShellProps {
  activeMenuItem?: string;
  compact?: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const MENU_GROUPS: MenuGroup[] = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: LayoutDashboard },
      {
        name: "Domie AI",
        icon: Sparkles,
        badge: "AI",
        badgeColor: "bg-[#8E7CF8]/15 text-[#6D58E8] border border-[#8E7CF8]/30",
      },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { name: "Category", icon: Layers },
      { name: "Course", icon: GraduationCap },
      { name: "Bootcamp", icon: Flame },
      { name: "Tutor Booking", icon: Calendar },
      { name: "Ebook", icon: BookText },
      { name: "Blogs", icon: PenTool },
      { name: "Knowledge Base", icon: BookMarked },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      { name: "Student enrollment", icon: Users },
      { name: "Payment Report", icon: CreditCard },
    ],
  },
  {
    title: "USERS",
    items: [
      { name: "Admin", icon: ShieldCheck },
      { name: "Instructor", icon: UserCheck },
    ],
  },
];

export function AppShell({
  activeMenuItem = "Dashboard",
  compact = false,
  title,
  children,
  className,
}: AppShellProps) {
  return (
    <div
      role="img"
      aria-label="Northstar Academy sample dashboard in LMS Domain"
      className={cn(
        "w-full h-full flex bg-[#F5F6F8] font-urbanist text-[#161616] text-[13px] select-none overflow-hidden",
        className
      )}
    >
      <div aria-hidden="true" className="w-full h-full flex min-h-0 min-w-0">
        {/* Left Sidebar (Hidden if compact or on small viewports) */}
        {!compact && (
          <aside className="w-[200px] shrink-0 bg-white border-r border-[#EAE8E2] flex flex-col justify-between py-3 px-2.5 overflow-hidden">
            <div className="space-y-4">
              {/* Academy Logo & Name */}
              <div className="flex items-center gap-2.5 px-2 py-1">
                <div className="size-7 rounded-lg bg-[#161616] text-white font-bold text-xs flex items-center justify-center shrink-0 tracking-tight shadow-xs">
                  {MOCKUP_IDENTITY.shortName}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold text-[#161616] truncate leading-tight">
                    {MOCKUP_IDENTITY.academyName}
                  </div>
                  <div className="text-[10px] text-[#8F94A0] truncate">
                    Academy Portal
                  </div>
                </div>
              </div>

              {/* Navigation Sections */}
              <nav className="space-y-3">
                {MENU_GROUPS.map((group) => (
                  <div key={group.title} className="space-y-1">
                    <div className="px-2 text-[9px] font-bold tracking-wider text-[#A0A4AE] uppercase">
                      {group.title}
                    </div>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeMenuItem === item.name;
                        return (
                          <div
                            key={item.name}
                            className={cn(
                              "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors",
                              isActive
                                ? "bg-[#161616] text-white shadow-2xs"
                                : "text-[#525866] hover:bg-[#F3F4F6]"
                            )}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Icon
                                className={cn(
                                  "size-3.5 shrink-0",
                                  isActive ? "text-white" : "text-[#717684]"
                                )}
                              />
                              <span className="truncate">{item.name}</span>
                            </div>
                            {item.badge && (
                              <span
                                className={cn(
                                  "text-[9px] font-bold px-1.5 py-0.2 rounded-md leading-none",
                                  isActive ? "bg-white/20 text-white" : item.badgeColor
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom Admin User Pill */}
            <div className="pt-2 border-t border-[#F0EFEA] px-2 flex items-center gap-2">
              <div className="size-6 rounded-full bg-linear-to-tr from-[#161616] to-[#444] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                A
              </div>
              <div className="min-w-0 flex-1 text-[11px] font-medium text-[#525866] truncate">
                Admin Settings
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#F5F6F8]">
          {/* Top Bar */}
          <header className="h-12 shrink-0 bg-white border-b border-[#EAE8E2] px-4 flex items-center justify-between gap-3">
            {/* Left: Search Bar & Page Title */}
            <div className="flex items-center gap-3 flex-1 min-w-0 max-w-md">
              <div className="relative w-full max-w-[240px]">
                <Search className="size-3.5 text-[#8F94A0] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search courses, students, lessons..."
                  className="w-full h-7 pl-8 pr-3 text-[11px] rounded-lg bg-[#F5F6F8] border border-[#EAE8E2] text-[#161616] placeholder:text-[#8F94A0] focus:outline-hidden"
                />
              </div>
              {title && (
                <div className="text-[12px] font-semibold text-[#161616] truncate hidden md:block">
                  {title}
                </div>
              )}
            </div>

            {/* Right: Actions & User Chip */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Ask Domie pill */}
              <div className="px-2.5 py-1 rounded-full bg-linear-to-r from-[#8E7CF8]/15 to-[#6D58E8]/10 border border-[#8E7CF8]/30 flex items-center gap-1.5 text-[11px] font-semibold text-[#5B47D9] shadow-2xs">
                <Sparkles className="size-3 text-[#6D58E8]" />
                <span>Ask Domie</span>
              </div>

              {/* View Site */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-[#525866] hover:bg-[#F5F6F8] border border-[#EAE8E2]">
                <span>View site</span>
                <ExternalLink className="size-2.5 text-[#8F94A0]" />
              </div>

              {/* Notification Bell */}
              <div className="relative p-1.5 rounded-md hover:bg-[#F5F6F8] text-[#525866]">
                <Bell className="size-3.5" />
                <span className="absolute top-1 right-1 size-1.5 rounded-full bg-[#E11D48]" />
              </div>

              {/* Account Chip */}
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-[#EAE8E2]">
                <div className="size-6 rounded-full bg-[#161616] text-white text-[10px] font-semibold flex items-center justify-center">
                  NA
                </div>
                <span className="text-[11px] font-medium text-[#161616] hidden lg:inline-block max-w-[140px] truncate">
                  {MOCKUP_IDENTITY.roleLabel}
                </span>
              </div>
            </div>
          </header>

          {/* Screen Body */}
          <main className="flex-1 p-3.5 overflow-hidden flex flex-col min-h-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppShell;

