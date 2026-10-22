import React from "react";

interface AboutStoryProps {
  title?: string;
  body?: string;
  image?: string;
}

export function AboutStory({
  title = "Our Story",
  body,
  image = "/assets/img/our-story-img.jpg",
}: AboutStoryProps) {
  if (!body && !title) return null;

  // Split multi-paragraph body text if formatted with double newlines
  const paragraphs = body
    ? body.split(/\n\n+/).filter((p) => p.trim().length > 0)
    : [];

  return (
    <section className="bg-[#F3F4F6] py-16 sm:py-24 font-urbanist border-y border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Large Card: radius 40px, padding 64px (desktop) / 24px (mobile) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#ECEDEF] p-6 sm:p-10 lg:p-16 shadow-2xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            {/* Left Column: H2 + Rich Text Body (max 560px) */}
            <div className="flex-1 max-w-[560px] text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-4">
                <span>✦</span>
                <span>Our Origin</span>
              </div>

              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#161616] tracking-tight leading-[1.15] mb-6">
                {title}
              </h2>

              <div className="text-[16px] sm:text-[17px] text-[#6B6F76] leading-relaxed space-y-4">
                {paragraphs.length > 0 ? (
                  paragraphs.map((p, idx) => <p key={idx}>{p.trim()}</p>)
                ) : (
                  <p>{body}</p>
                )}
              </div>
            </div>

            {/* Right Column: Story Image (radius 20px) */}
            {image && (
              <div className="shrink-0 w-full lg:w-[460px] xl:w-[480px]">
                <div className="rounded-[20px] overflow-hidden border border-[#ECEDEF] shadow-sm aspect-[4/3] bg-slate-100">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;

