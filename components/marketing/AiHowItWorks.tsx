import React from "react";

interface StepItem {
  stepNumber?: string;
  title: string;
  description: string;
}

interface AiHowItWorksProps {
  title?: string;
  steps?: StepItem[];
}

export function AiHowItWorks({
  title = "How Domie AI Operates Inside Your Platform",
  steps = [
    {
      stepNumber: "01",
      title: "Grounded in Your Material",
      description:
        "Domie AI indexes your uploaded lessons, syllabuses, and course notes so answers stay faithful to what you teach.",
    },
    {
      stepNumber: "02",
      title: "Available Where Needed",
      description:
        "Learners interact with the tutor inside active lessons, while administrators access alerts and search across the management console.",
    },
    {
      stepNumber: "03",
      title: "Full Administrator Control",
      description:
        "Keep complete governance over AI features with course-level toggles, clear source citations, and human-in-the-loop workflows.",
    },
  ],
}: AiHowItWorksProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-left max-w-2xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-3.5">
            <span>✦</span>
            <span>SYSTEM ARCHITECTURE</span>
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-semibold leading-[1.15] tracking-tight text-[#161616]">
            {title}
          </h2>
        </div>

        {/* 3 Step Cards in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const stepNum = step.stepNumber || String(idx + 1).padStart(2, "0");
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 border border-[#ECEDEF] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="text-[48px] font-mono font-bold text-[#C9CCD1] leading-none mb-6">
                    {stepNum}
                  </div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#161616] tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#6B6F76] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AiHowItWorks;
