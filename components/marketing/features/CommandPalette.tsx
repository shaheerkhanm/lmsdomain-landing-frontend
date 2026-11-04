"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { FEATURE_CATEGORIES } from "@/content/features/catalog";
import { Search, Command, X, ArrowRight, Sparkles, Check } from "lucide-react";
import * as LucideIcons from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Flatten all 38 features with category metadata
  const allFeatures = useMemo(() => {
    return FEATURE_CATEGORIES.flatMap((cat) =>
      cat.features.map((feat) => ({
        ...feat,
        categorySlug: cat.slug,
        categoryTitle: cat.title,
      }))
    );
  }, []);

  // Filter features
  const filteredFeatures = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allFeatures.filter((f) => {
      const matchesQuery =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.categoryTitle.toLowerCase().includes(q);
      const matchesPremium = !premiumOnly || f.isPremium;
      return matchesQuery && matchesPremium;
    });
  }, [allFeatures, query, premiumOnly]);

  // Group filtered results by category
  const groupedResults = useMemo(() => {
    const map = new Map<string, typeof filteredFeatures>();
    filteredFeatures.forEach((f) => {
      if (!map.has(f.categoryTitle)) {
        map.set(f.categoryTitle, []);
      }
      map.get(f.categoryTitle)!.push(f);
    });
    return Array.from(map.entries());
  }, [filteredFeatures]);

  // Keyboard shortcut: ⌘K or Ctrl+K anywhere on page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // Arrow navigation inside results list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredFeatures.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredFeatures.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredFeatures.length) % filteredFeatures.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetFeature = filteredFeatures[selectedIndex];
      if (targetFeature) {
        selectFeature(targetFeature.slug);
      }
    }
  };

  const selectFeature = (slug: string) => {
    setIsOpen(false);

    // Scroll to feature card and pulse border
    setTimeout(() => {
      const card = document.getElementById(slug);
      if (card) {
        const top = card.getBoundingClientRect().top + window.scrollY - 120;
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(top, { offset: 0, duration: 1 });
        } else {
          window.scrollTo({ top, behavior: "smooth" });
        }

        // Pulse border highlight for 1.2s
        card.classList.add("ring-4", "ring-[#7B5CF5]", "transition-all", "duration-500");
        setTimeout(() => {
          card.classList.remove("ring-4", "ring-[#7B5CF5]");
        }, 1200);
      }
    }, 150);
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <LucideIcons.CheckCircle2 className="size-4 text-[#7B5CF5]" />;
    const IconComponent = (LucideIcons as Record<string, any>)[iconName] || LucideIcons.CheckCircle2;
    return <IconComponent className="size-4 text-[#7B5CF5] shrink-0" />;
  };

  return (
    <>
      {/* Search Trigger Bar (Gray strip) */}
      <section className="bg-[#F3F4F6] py-8 font-urbanist border-b border-[#E5E7EB]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#7B5CF5] shadow-2xs">
              <Command className="size-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#161616]">
                Instant Feature Finder
              </p>
              <p className="text-xs text-[#6B6F76]">
                Jump straight to any of the 38 features with live keyboard navigation.
              </p>
            </div>
          </div>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white hover:bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#7B5CF5]/40 text-xs font-semibold text-[#6B6F76] flex items-center justify-between sm:justify-start gap-4 transition-all shadow-2xs cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-[#8F94A0] group-hover:text-[#161616]">
              <Search className="size-3.5" />
              <span>Search features...</span>
            </div>
            <kbd className="px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[10px] font-mono text-[#6B6F76] border border-[#E5E7EB] shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>
      </section>

      {/* Global ⌘K Command Palette Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Features Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/50 backdrop-blur-xs font-urbanist animate-in fade-in duration-200"
        >
          {/* Modal Backdrop click */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} aria-hidden="true" />

          {/* Dialog Container */}
          <div className="relative w-full max-w-[620px] rounded-2xl bg-white border border-[#E5E7EB] shadow-2xl overflow-hidden flex flex-col max-h-[75vh] z-10 animate-in zoom-in-95 duration-200">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#F0F1F3] gap-3 bg-[#FAFAFA]">
              <Search className="size-4 text-[#7B5CF5] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search by feature name, keyword, or domain..."
                className="w-full bg-transparent text-sm font-medium text-[#161616] placeholder-[#8F94A0] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-[#8F94A0] hover:text-[#161616] cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#E5E7EB] text-[10px] font-mono text-[#6B6F76]">
                ESC
              </kbd>
            </div>

            {/* Filter Chips Bar */}
            <div className="px-4 py-2 border-b border-[#F0F1F3] flex items-center justify-between text-xs bg-white">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#8F94A0]">Filter:</span>
                <button
                  type="button"
                  onClick={() => setPremiumOnly((prev) => !prev)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    premiumOnly
                      ? "bg-[#7B5CF5] text-white"
                      : "bg-[#F3F4F6] text-[#6B6F76] hover:bg-[#E5E7EB]"
                  }`}
                >
                  <span>✦ Premium Only</span>
                  {premiumOnly && <Check className="size-3" />}
                </button>
              </div>

              <span className="text-[10px] text-[#8F94A0]">
                {filteredFeatures.length} Results
              </span>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-4 max-h-[420px]">
              {filteredFeatures.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#8F94A0] space-y-1">
                  <p className="font-semibold text-[#161616]">No matching features found</p>
                  <p>Try searching for courses, quizzes, watermarking, live, or certificates.</p>
                </div>
              ) : (
                groupedResults.map(([catTitle, feats]) => (
                  <div key={catTitle} className="space-y-1">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8F94A0]">
                      {catTitle}
                    </div>

                    <div className="space-y-1">
                      {feats.map((f) => {
                        const globalIdx = filteredFeatures.indexOf(f);
                        const isSelected = selectedIndex === globalIdx;
                        return (
                          <div
                            key={f.slug}
                            role="button"
                            tabIndex={0}
                            data-marquee="true"
                            onClick={() => selectFeature(f.slug)}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#7B5CF5] text-white"
                                : "hover:bg-[#F3F4F6] text-[#161616]"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <div
                                className={`size-7 rounded-lg flex items-center justify-center ${
                                  isSelected ? "bg-white/20 text-white" : "bg-[#F3F4F6]"
                                }`}
                              >
                                {renderIcon(f.icon)}
                              </div>
                              <div className="min-w-0">
                                <p
                                  data-marquee="true"
                                  className={`text-xs font-semibold truncate ${
                                    isSelected ? "text-white" : "text-[#161616]"
                                  }`}
                                >
                                  {f.title}
                                </p>
                                <p
                                  className={`text-[11px] truncate ${
                                    isSelected ? "text-white/80" : "text-[#6B6F76]"
                                  }`}
                                >
                                  {f.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {f.isPremium && (
                                <span
                                  data-marquee="true"
                                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                    isSelected
                                      ? "bg-white/20 text-white"
                                      : "bg-[#7B5CF5]/10 text-[#7B5CF5]"
                                  }`}
                                >
                                  Premium
                                </span>
                              )}
                              <ArrowRight
                                className={`size-3.5 ${
                                  isSelected ? "text-white" : "text-[#8F94A0]"
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer Key Hints */}
            <div className="px-4 py-2.5 bg-[#FAFAFA] border-t border-[#F0F1F3] flex items-center justify-between text-[11px] text-[#8F94A0]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="font-medium text-[#7B5CF5]">LMS Domain ⌘K Finder</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommandPalette;
