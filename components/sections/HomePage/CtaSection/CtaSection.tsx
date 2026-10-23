"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import type { CtaTestimonial } from "@/types/content";

interface TestimonialSlot {
  id: string;
  type: "pill" | "card";
  positionClass: string;
  delayClass: string;
}

// Layout only. Content comes from the `testimonials` prop, filled slot by slot.
const TESTIMONIAL_SLOTS: TestimonialSlot[] = [
  // 1. Top Center (Pill, sitting right above top of sphere)
  {
    id: "panel-top",
    type: "pill",
    positionClass: "top-3 sm:top-5 lg:top-7 left-1/2 -translate-x-1/2 z-30 max-w-xs sm:max-w-md",
    delayClass: "animate-float-1",
  },
  // 2. Upper Left (Pill)
  {
    id: "panel-top-left",
    type: "pill",
    positionClass: "top-16 sm:top-20 lg:top-22 left-3 sm:left-8 lg:left-14 z-10 max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] hidden sm:flex",
    delayClass: "animate-float-2",
  },
  // 3. Upper Right (Pill)
  {
    id: "panel-top-right",
    type: "pill",
    positionClass: "top-16 sm:top-20 lg:top-22 right-3 sm:right-8 lg:right-14 z-10 max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] hidden sm:flex",
    delayClass: "animate-float-3",
  },
  // 4. Middle Left (Full Card)
  {
    id: "panel-mid-left",
    type: "card",
    positionClass: "top-36 sm:top-40 lg:top-44 left-1 sm:left-4 lg:left-8 z-10 max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] hidden md:block",
    delayClass: "animate-float-1",
  },
  // 5. Middle Right (Full Card)
  {
    id: "panel-mid-right",
    type: "card",
    positionClass: "top-36 sm:top-40 lg:top-44 right-1 sm:right-4 lg:right-8 z-10 max-w-[240px] sm:max-w-[280px] lg:max-w-[310px] hidden md:block",
    delayClass: "animate-float-2",
  },
  // 6. Lower Left (Subtle background pill)
  {
    id: "panel-bot-left",
    type: "pill",
    positionClass: "bottom-3 lg:bottom-5 left-4 sm:left-10 lg:left-16 z-0 opacity-60 max-w-[240px] lg:max-w-[290px] hidden lg:flex",
    delayClass: "animate-float-3",
  },
  // 7. Lower Right (Subtle background pill)
  {
    id: "panel-bot-right",
    type: "pill",
    positionClass: "bottom-3 lg:bottom-5 right-4 sm:right-10 lg:right-16 z-0 opacity-60 max-w-[240px] lg:max-w-[290px] hidden lg:flex",
    delayClass: "animate-float-1",
  },
];

export interface CtaBandContent {
  title: string; // a new line starts the second line
  subtitle?: string;
  buttonText: string;
  placeholder: string;
  sendingText: string;
  successMessage: string;
}

const DEFAULT_BAND: CtaBandContent = {
  title: "Join forward-thinking\nAI leaders",
  subtitle: "",
  buttonText: "Notify",
  placeholder: "Your email address",
  sendingText: "Sending...",
  successMessage: "✓ You are on the priority access list. We will notify you shortly.",
};

export interface CtaSectionProps {
  data?: any;
  showTestimonials?: boolean;
  testimonials?: CtaTestimonial[];
  content?: CtaBandContent;
}

export function CtaSection({
  data,
  content = DEFAULT_BAND,
  showTestimonials = true,
  testimonials = [],
}: CtaSectionProps = {}) {
  const panels = showTestimonials
    ? TESTIMONIAL_SLOTS.slice(0, testimonials.length).map((slot, i) => ({
        ...slot,
        ...testimonials[i],
        key: slot.id,
      }))
    : [];
  const mobileItem = showTestimonials ? testimonials[3] ?? testimonials[0] : undefined;

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMessage("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      const body = {
        email: trimmed,
        name: "Reference Notification Subscriber",
        subject: "Platform Notification Request",
        organizationName: "Direct Web Subscriber",
        page: typeof window !== "undefined" ? window.location.pathname : "",
        type: 2,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json().catch(() => null);

      if (res.ok && response) {
        setIsSubmitted(true);
        toast.success("Thank you! You have been added to our notification list.", {
          richColors: true,
          duration: 4000,
        });
        setEmail("");
      } else {
        toast.error("Unable to submit. Please try again.", { richColors: true });
      }
    } catch (error) {
      toast.error("Submission failed. Please check your network connection.", { richColors: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta-enquiry" className="py-14 sm:py-20 lg:py-24 bg-[#E5E5E7] font-inter">
      {/* Outer Clean White Frame Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="rounded-[36px] sm:rounded-[44px] bg-white p-3 sm:p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
          {/* Inner Canvas with Soft Vertical Atmospheric Gradient */}
          <div
            className="rounded-[30px] sm:rounded-[36px] relative overflow-hidden pt-10 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-8 flex flex-col items-center justify-between min-h-[640px] sm:min-h-[740px] lg:min-h-[800px]"
            style={{
              background: "linear-gradient(180deg, #A6C9D4 0%, #BAD4D9 18%, #C6D2CB 38%, #EAE5CE 62%, #F7E6C2 82%, #FDE6C0 100%)",
            }}
          >
            {/* Upper Interactive Stage: Floating Blue Sphere & Testimonials */}
            <div className="relative w-full max-w-5xl h-[330px] sm:h-[400px] lg:h-[450px] flex items-center justify-center">
              {/* Floating Semi-Transparent Testimonial Panels Distributed Around Sphere */}
              {panels.map((panel) => (
                <div
                  key={panel.key}
                  className={`absolute ${panel.positionClass} ${panel.delayClass} transition-transform duration-700 ease-out`}
                >
                  {panel.type === "pill" ? (
                    <div className="bg-white/45 backdrop-blur-md rounded-2xl border border-white/55 px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs text-slate-800 shadow-2xs flex items-center gap-2.5 select-none hover:bg-white/60 transition-colors">
                      <PanelAvatar src={panel.avatar} alt="User" />
                      <p className="leading-snug line-clamp-2">{panel.text}</p>
                    </div>
                  ) : (
                    <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-white/65 p-3.5 sm:p-4 text-[11px] sm:text-xs text-slate-800 shadow-2xs space-y-2 select-none hover:bg-white/65 transition-colors">
                      <p className="leading-relaxed line-clamp-3">{panel.text}</p>
                      <div className="flex items-center gap-2 pt-1 border-t border-white/30">
                        <PanelAvatar src={panel.avatar} alt={panel.author || "User"} />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate text-[11px] sm:text-xs">
                            {panel.author}
                          </span>
                          <span className="text-[10px] text-slate-600 block truncate">
                            {panel.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile-Optimized Testimonial Pill for Small Screens */}
              {mobileItem && (
                <div className="md:hidden absolute bottom-1 left-1/2 -translate-x-1/2 w-full max-w-xs z-10 px-2">
                  <div className="bg-white/55 backdrop-blur-md rounded-2xl border border-white/60 p-3 text-[11px] text-slate-800 shadow-2xs flex items-center gap-2.5">
                    <PanelAvatar src={mobileItem.avatar} alt="User" className="size-7" />
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">{mobileItem.author}</span>
                      <p className="text-[10px] text-slate-600 leading-tight">
                        {[mobileItem.role, mobileItem.highlight].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Central Translucent Glossy Blue 3D Sphere (Exact Reference Focal Point) */}
              <div className="relative z-20 flex items-center justify-center animate-sphere-float pointer-events-none select-none">
                <img
                  src="/assets/img/reference/floating_blue_sphere.png"
                  alt="Glossy Blue 3D Sphere"
                  className="w-48 sm:w-64 lg:w-[320px] h-auto drop-shadow-[0_25px_45px_rgba(2,132,199,0.35)] object-contain"
                />
              </div>
            </div>

            {/* Lower Stage: 2-Line Headline & Unified Email Pill Form */}
            <div className="relative z-30 w-full max-w-2xl mx-auto text-center space-y-5 sm:space-y-6 mt-3 sm:mt-6">
              {/* Exact 2-Line Headline from Reference Video */}
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight leading-[1.08] font-manrope">
                {content.title.split("\n").map((line, i) => (
                  <span key={i} className={i === 0 ? undefined : "block mt-1 sm:mt-2"}>
                    {line}
                  </span>
                ))}
              </h2>
              {content.subtitle && (
                <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto">{content.subtitle}</p>
              )}

              {/* Unified Email Form Pill: Light Cream Container with Inset Black Button */}
              <div className="w-full max-w-sm sm:max-w-md mx-auto pt-2">
                <form
                  onSubmit={handleSubmit}
                  className="relative flex items-center bg-[#FAF3E8]/90 backdrop-blur-xs rounded-full p-1.5 pl-4 sm:pl-5 border border-[#F0DFCA] shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-slate-400 focus-within:bg-[#FFF8EE] transition-all"
                >
                  <input
                    type="email"
                    placeholder={content.placeholder}
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-500/80 text-xs sm:text-sm focus:outline-none pr-2 sm:pr-3"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#15171A] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {isSubmitting ? content.sendingText : content.buttonText}
                  </button>
                </form>

                {errorMessage && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-2 text-center animate-in fade-in">
                    {errorMessage}
                  </p>
                )}

                {isSubmitted && (
                  <p className="text-xs text-emerald-800 font-semibold mt-2.5 text-center animate-in fade-in">
                    {content.successMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelAvatar({
  src,
  alt,
  className = "size-6 sm:size-7",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return <div className={`${className} rounded-full bg-white/70 shrink-0 ring-1 ring-white/60`} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} rounded-full object-cover shrink-0 ring-1 ring-white/60`}
    />
  );
}

export default CtaSection;
