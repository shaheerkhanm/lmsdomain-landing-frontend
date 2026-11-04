"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useSpring, useReducedMotion } from "motion/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { usePageVisibility } from "@/lib/pages-context";
import { ArrowRight, Sparkles } from "lucide-react";

interface FinalCtaCardProps {
  content?: {
    heading?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    ctaText?: string;
    secondaryCtaText?: string;
  };
}

export function FinalCtaCard({ content }: FinalCtaCardProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { isPathVisible } = usePageVisibility();
  const prefersReduced = useReducedMotion();

  const title =
    content?.heading ||
    content?.title ||
    "Everything You Need to Run Your Academy on One Platform";

  const subtitle =
    content?.subtitle ||
    content?.description ||
    "Join hundreds of growing academies, coaches, and institutes building their branded future with LMS Domain.";

  const primaryText = content?.buttonText || content?.ctaText || "Book a Demo";
  const secondaryText = content?.secondaryCtaText || "See pricing";

  // Magnetic button hover effect (up to 6px)
  const buttonRef = useRef<HTMLButtonElement>(null);
  const springX = useSpring(0, { stiffness: 250, damping: 20 });
  const springY = useSpring(0, { stiffness: 250, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReduced || window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    springX.set(Math.max(-6, Math.min(6, x * 0.2)));
    springY.set(Math.max(-6, Math.min(6, y * 0.2)));
  };

  const handlePointerLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  return (
    <>
      <section className="bg-white py-16 sm:py-20 lg:py-24 font-urbanist relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Dark #161616 Rounded Card (Radius 40px) */}
          <div className="relative rounded-[32px] sm:rounded-[40px] bg-[#161616] border border-white/10 text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl text-center flex flex-col items-center">
            {/* Faint White Dot Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(#FFFFFF 1.2px, transparent 1.2px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden="true"
            />

            {/* Slow Accent Beam Sweeping Across (6s Loop, off for reduced motion) */}
            {!prefersReduced && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7B5CF5" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8E7CF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A6E3D3" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line
                  x1="-20%"
                  y1="50%"
                  x2="120%"
                  y2="50%"
                  stroke="url(#beamGradient)"
                  strokeWidth="2"
                  className="animate-beam-sweep"
                />
              </svg>
            )}

            {/* Soft Ambient Radial Glow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7B5CF5]/18 rounded-full blur-[130px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Content Container */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#A78BFA] text-xs font-semibold uppercase tracking-[0.08em] border border-white/15">
                <Sparkles className="size-3.5 text-[#A78BFA]" />
                <span>READY TO LAUNCH?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-white tracking-tight leading-[1.12]">
                {title}
              </h2>

              <p className="text-base sm:text-lg text-[#C9CCD1] leading-relaxed max-w-xl mx-auto">
                {subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
                <motion.button
                  ref={buttonRef}
                  style={{ x: springX, y: springY }}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={handlePointerLeave}
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-sm font-semibold transition-all shadow-xl active:scale-95 cursor-pointer will-change-transform"
                >
                  {primaryText}
                </motion.button>

                {isPathVisible("/pricing") && (
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white transition-colors group cursor-pointer py-2"
                  >
                    <span>{secondaryText}</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="sm:max-w-[480px] p-0 bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
          <EnquiryForm />
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes beamSweep {
          0% {
            transform: translateX(-100%) rotate(-5deg);
          }
          50% {
            transform: translateX(100%) rotate(5deg);
          }
          100% {
            transform: translateX(-100%) rotate(-5deg);
          }
        }
        .animate-beam-sweep {
          animation: beamSweep 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

export default FinalCtaCard;
