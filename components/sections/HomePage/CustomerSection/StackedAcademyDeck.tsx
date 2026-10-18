"use client";

import React from "react";
import { testimonialsContent } from "@/content/home/testimonials";
import { TestimonialItem } from "@/types/content";

export function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="w-[300px] h-[170px] rounded-[16px] bg-white border border-[#ECEDEF] p-4 flex flex-col justify-between shadow-[0_16px_36px_-10px_rgba(0,0,0,0.08)] select-none">
      {/* Top row: Avatar 32px, Name 13px bold, Role 11px grey, Social icon top right */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.name}
              className="size-8 rounded-full object-cover"
            />
          ) : (
            <div className="size-8 rounded-full bg-[#E5E7EB] shrink-0" />
          )}
          <div className="min-w-0">
            <h4 className="text-[13px] font-bold text-[#161616] leading-tight truncate">
              {item.name}
            </h4>
            <p className="text-[11px] text-[#9CA3AF] leading-tight truncate mt-0.5">
              {item.role}
            </p>
          </div>
        </div>

        {/* Social icon top-right */}
        <div className="text-[#9CA3AF] shrink-0 pt-0.5">
          {item.social === "linkedin" ? (
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.4 9.74v-8.37H5.06v8.37h2.8z" />
            </svg>
          ) : (
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          )}
        </div>
      </div>

      {/* Quote / Skeleton lines */}
      {item.placeholder ? (
        <div className="space-y-2 py-1">
          <div className="h-2 bg-[#F3F4F6] rounded-full w-full" />
          <div className="h-2 bg-[#F3F4F6] rounded-full w-5/6" />
          <div className="h-2 bg-[#F3F4F6] rounded-full w-4/6" />
        </div>
      ) : (
        <p className="text-[12px] text-[#374151] leading-relaxed line-clamp-3">
          {item.quote}
        </p>
      )}

      {/* Bottom: Date only if entry has one */}
      <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] min-h-[16px]">
        <span>{item.date || ""}</span>
      </div>
    </div>
  );
}

export function StackedAcademyDeck() {
  return (
    <div className="relative w-full max-w-md flex flex-col items-center gap-3.5">
      {testimonialsContent.cards.map((card) => (
        <TestimonialCard key={card.id} item={card} />
      ))}
    </div>
  );
}

export default StackedAcademyDeck;
