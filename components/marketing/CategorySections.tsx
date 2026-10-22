import React from "react";
import Image from "next/image";
import { FeatureCategory, Feature } from "@/types/content";
import { CompactFeatureCard } from "./CompactFeatureCard";
import { FeatureIcon } from "./FeatureIcon";
import { FeatureVideoLoop } from "./FeatureVideoLoop";
import {
  InteractiveWatchPercentage,
  InteractiveVideoCheckpoint,
} from "./InteractiveIllustrations";
import {
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Calendar,
  Users,
  Clock,
  Building,
  CreditCard,
  Tag,
  Globe,
  Sliders,
  Sparkles,
} from "lucide-react";

interface CategorySectionsProps {
  categories: FeatureCategory[];
  media?: Record<string, any>;
}

export function CategorySections({ categories, media }: CategorySectionsProps) {
  // Exclude AI-Powered Tools from the sequence (Category 4 is spotlighted separately)
  const sequenceCategories = categories.filter((c) => c.slug !== "ai-powered-tools");

  return (
    <div className="font-urbanist">
      {sequenceCategories.map((category) => {
        const isWhite =
          category.slug === "course-learning" ||
          category.slug === "learner-engagement" ||
          category.slug === "course-sales-and-payments" ||
          category.slug === "administration-and-communication";

        const bgClass = isWhite ? "bg-white" : "bg-[#F3F4F6]";

        return (
          <section
            key={category.slug}
            id={category.slug}
            className={`${bgClass} py-[80px] lg:py-[120px] transition-colors`}
          >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              {/* Category Section Header */}
              <div className="text-left max-w-2xl mb-12 lg:mb-16">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5]">
                    <span>✦</span>
                    <span>{category.eyebrow}</span>
                  </span>
                  {category.isPremium && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                      Premium
                    </span>
                  )}
                </div>

                <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.15] tracking-tight text-[#161616] mb-4">
                  {getCategoryHeading(category.slug, category.title)}
                </h2>

                <p className="text-[16px] lg:text-[18px] text-[#6B6F76] leading-relaxed">
                  {category.intro}
                </p>
              </div>

              {/* Category-Specific Varied Composition */}
              {renderCategoryBody(category, media)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function getCategoryHeading(slug: string, fallback: string): string {
  switch (slug) {
    case "course-learning":
      return "Deliver Structured, Verifiable Course Curriculums";
    case "assessment-and-evaluation":
      return "Evaluate Mastery with Quizzes and Assignments";
    case "learner-engagement":
      return "Keep Learners Motivated from Start to Finish";
    case "live-and-cohort-learning":
      return "Connect Instructors and Learners in Real Time";
    case "course-sales-and-payments":
      return "Monetize Courses with Flexible Global Checkout";
    case "content-publishing-and-digital-products":
      return "Publish Books, Articles, and Knowledge Bases";
    case "administration-and-communication":
      return "Operate Your Academy with Controlled Roles";
    case "branding-website-and-reach":
      return "White-Label Your Academy on Your Own Domain";
    default:
      return fallback;
  }
}

function renderCategoryBody(category: FeatureCategory, media?: Record<string, any>) {
  const { slug, features } = category;

  switch (slug) {
    // ------------------------------------------------------------------------
    // 1. Course Learning (7 features)
    // Lead: Structured Courses with Dual-Photo Composition + 6 compact cards
    // ------------------------------------------------------------------------
    case "course-learning": {
      const lead = features.find((f) => f.slug === "structured-courses") || features[0];
      const remaining = features.filter((f) => f.slug !== lead.slug);

      return (
        <div className="space-y-8 lg:space-y-12">
          {/* Large White Card with Dual Photos + Syllabus preview */}
          <div
            data-feature-slug={lead.slug}
            className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-6 sm:p-10 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Dual-Photo & UI Composition (order-1 on mobile, lg:order-2 on desktop) */}
              <div className="w-full lg:col-span-6 lg:order-2 order-1">
                <div
                  aria-label="Illustration and photography of instructor recording and learner studying"
                  className="bg-[#F8FAFC] rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-4 sm:p-6 relative min-h-[340px] sm:min-h-[380px] flex items-center justify-center overflow-hidden"
                >
                  {/* Photo 1: Instructor recording (Top Right, rounded-[20px] frame) */}
                  <div className="absolute right-2 sm:right-4 top-4 w-[240px] sm:w-[280px] h-[150px] sm:h-[175px] rounded-[20px] overflow-hidden bg-slate-900 border border-slate-800 shadow-xl z-10 group">
                    <Image
                      src={media?.["course-learning-instructor"]?.src || "/assets/img/home/features/instructor_lesson.jpg"}
                      alt={media?.["course-learning-instructor"]?.alt || "Instructor recording video course lesson at studio desk"}
                      fill
                      sizes="(max-width: 640px) 240px, 280px"
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Recording Lesson 02
                    </div>
                  </div>

                  {/* Photo 2: Learner on laptop (Bottom Left, rounded-[20px] frame) */}
                  <div className="absolute left-2 sm:left-4 bottom-4 w-[220px] sm:w-[260px] h-[140px] sm:h-[165px] rounded-[20px] overflow-hidden bg-slate-100 border border-[#ECEDEF] shadow-2xl z-20 group">
                    <Image
                      src={media?.["course-learning-student"]?.src || "/assets/img/home/features/learner_laptop.jpg"}
                      alt={media?.["course-learning-student"]?.alt || "Student engaged in structured online lesson on laptop"}
                      fill
                      sizes="(max-width: 640px) 220px, 260px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Corner Floating Chip */}
                  <div className="absolute right-4 bottom-6 z-30">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[#161616] border border-[#ECEDEF] shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Scheduled Content Release
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Left (order-2 on mobile, lg:order-1 on desktop) */}
              <div className="w-full lg:col-span-6 lg:order-1 order-2 space-y-4">
                <div className="w-11 h-11 rounded-[14px] bg-[#F3F4F6] flex items-center justify-center text-[#161616]">
                  <FeatureIcon name={lead.icon || "BookOpen"} size={22} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] leading-snug">
                  {lead.title}
                </h3>
                <p className="text-[16px] sm:text-[17px] text-[#6B6F76] leading-relaxed">
                  {lead.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-[#161616]">
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Video & Text</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">PDFs & Docs</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Drip Scheduling</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining 6 features as 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {remaining.map((feature) => (
              <CompactFeatureCard key={feature.slug} feature={feature} />
            ))}
          </div>
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 2. Assessment and Evaluation (3 features)
    // 3 cards in a row with real photo + interactive checkpoint simulation
    // ------------------------------------------------------------------------
    case "assessment-and-evaluation": {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const isQuiz = feature.slug === "graded-quizzes";
            const isAssignment = feature.slug === "assignments-and-instructor-reviews";
            const isCheckpoint = feature.slug === "in-video-checkpoint-quizzes";

            return (
              <div
                key={feature.slug}
                data-feature-slug={feature.slug}
                className="bg-white rounded-[28px] border border-[#ECEDEF] p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div>
                  {/* Visual: Photography & Interactive Simulators */}
                  <div className="mb-6">
                    {isQuiz && (
                      <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-slate-100 border border-[#ECEDEF] shadow-md group">
                        <Image
                          src={media?.["assessment-learner-quiz"]?.src || "/assets/img/home/features/learner_quiz.jpg"}
                          alt={media?.["assessment-learner-quiz"]?.alt || "Learner taking interactive graded quiz on computer"}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5 border border-white/10 shadow-sm">
                          <span>✓</span>
                          Graded quiz
                        </div>
                      </div>
                    )}

                    {isAssignment && (
                      <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-slate-100 border border-[#ECEDEF] shadow-md group">
                        <Image
                          src={media?.["instructor-grading-review"]?.src || "/images/features/instructor-grading-review.webp"}
                          alt={media?.["instructor-grading-review"]?.alt || "Instructor grading assignment and drafting feedback"}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
                          Assignment review
                        </div>
                      </div>
                    )}

                    {isCheckpoint && (
                      <InteractiveVideoCheckpoint />
                    )}
                  </div>

                  {/* Header & Copy */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${
                        feature.isPremium ? "bg-[#EEE9FF] text-[#7B5CF5]" : "bg-[#F3F4F6] text-[#161616]"
                      }`}
                    >
                      <FeatureIcon name={feature.icon} size={18} />
                    </div>
                    {feature.isPremium && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                        Premium
                      </span>
                    )}
                  </div>

                  <h3 className="text-[19px] font-semibold text-[#161616] tracking-tight mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-[15px] text-[#6B6F76] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 3. Learner Engagement (3 features, Premium)
    // 3 cards in a row with Interactive Watch Percentage slider
    // ------------------------------------------------------------------------
    case "learner-engagement": {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const isLeaderboard = feature.slug === "leaderboards-and-points";
            const isWatchPercent = feature.slug === "watch-percentage-completion";
            const isHelpDrawer = feature.slug === "lesson-lock-help-drawer";

            return (
              <div
                key={feature.slug}
                data-feature-slug={feature.slug}
                className="bg-white rounded-[28px] border border-[#ECEDEF] p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div>
                  {/* Visual Illustration & Interactive Slider */}
                  <div className="mb-6">
                    {isLeaderboard && (
                      <div
                        aria-label="Illustration of academy leaderboard rankings"
                        className="bg-[#F8FAFC] rounded-[20px] p-4 border border-[#ECEDEF] space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] text-[#8F94A0] pb-1 border-b border-[#ECEDEF]">
                          <span>Academy Leaderboard</span>
                          <span className="text-[#7B5CF5] font-semibold">Weekly XP</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#ECEDEF] text-[11px] shadow-2xs">
                          <span className="font-semibold text-[#161616]">🥇 1. Maya Chen</span>
                          <span className="font-mono text-[#0D9488] font-bold">2,840 pts</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#ECEDEF] text-[11px] shadow-2xs">
                          <span className="font-semibold text-[#161616]">🥈 2. David R.</span>
                          <span className="font-mono text-[#6B6F76] font-semibold">2,410 pts</span>
                        </div>
                      </div>
                    )}

                    {isWatchPercent && (
                      <InteractiveWatchPercentage />
                    )}

                    {isHelpDrawer && (
                      <div
                        aria-label="Illustration of contextual lesson lock help panel"
                        className="bg-[#F8FAFC] rounded-[20px] p-4 border border-[#ECEDEF] space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#161616] text-[11px]">Lesson 3: Advanced APIs</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[10px] font-semibold flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Locked
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-[#ECEDEF] text-[11px] space-y-1 shadow-2xs">
                          <p className="font-semibold text-[#161616]">Contextual Unlock Guide:</p>
                          <p className="text-[#6B6F76]">"Pass the Module 2 Assessment with ≥ 80% score to unlock this lesson."</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Header & Copy */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center">
                      <FeatureIcon name={feature.icon} size={18} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                      Premium
                    </span>
                  </div>

                  <h3 className="text-[19px] font-semibold text-[#161616] tracking-tight mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-[15px] text-[#6B6F76] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 5. Live and Cohort Learning (4 features)
    // 2x2 grid with Video Loop for Live Classes + Real Photos for Cohorts & 1:1
    // ------------------------------------------------------------------------
    case "live-and-cohort-learning": {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.slug}
              data-feature-slug={feature.slug}
              className="bg-white rounded-[28px] border border-[#ECEDEF] p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
            >
              <div>
                {/* Visual slot per feature */}
                <div className="mb-6">
                  {feature.slug === "live-classes-with-zoom" && (
                    <FeatureVideoLoop
                      src={media?.["live-class-loop"]?.src || "/videos/features/live_class_loop.mp4"}
                      poster={media?.["live-class-loop"]?.poster || "/videos/features/live_class_poster.webp"}
                      label="Live class"
                      alt={media?.["live-class-loop"]?.alt || "Real classroom and online learning session demonstration"}
                    />
                  )}

                  {feature.slug === "cohort-based-bootcamps" && (
                    <div className="relative aspect-video rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-md group">
                      <Image
                        src={media?.["cohort-workshop"]?.src || "/images/features/cohort-workshop.webp"}
                        alt={media?.["cohort-workshop"]?.alt || "Cohort bootcamp workshop collaboration in conference room"}
                        fill
                        sizes="(max-width: 768px) 100vw, 520px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                        Cohort live class
                      </div>
                    </div>
                  )}

                  {feature.slug === "one-to-one-tutor-booking" && (
                    <div className="relative aspect-video rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-md group">
                      <Image
                        src={media?.["one-to-one-tutor"]?.src || "/images/features/one-to-one-tutor.webp"}
                        alt={media?.["one-to-one-tutor"]?.alt || "One-to-one tutoring session with student and instructor"}
                        fill
                        sizes="(max-width: 768px) 100vw, 520px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7B5CF5]" />
                        One-to-one tutoring
                      </div>
                    </div>
                  )}

                  {feature.slug === "team-training-packages" && (
                    <div className="relative aspect-video rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-md group">
                      <Image
                        src={media?.["team-training-office"]?.src || "/images/features/team-training-office.webp"}
                        alt={media?.["team-training-office"]?.alt || "Corporate team training session in conference room"}
                        fill
                        sizes="(max-width: 768px) 100vw, 520px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                        Team training
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-11 h-11 rounded-[14px] bg-[#F3F4F6] text-[#161616] flex items-center justify-center mb-4">
                  <FeatureIcon name={feature.icon} size={20} />
                </div>

                <h3 className="text-[20px] font-semibold text-[#161616] tracking-tight mb-2">
                  {feature.title}
                </h3>

                <p className="text-[15px] text-[#6B6F76] leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              {/* Note for Zoom */}
              {feature.slug === "live-classes-with-zoom" && (
                <div className="pt-3 border-t border-[#F3F4F6] text-xs text-[#8F94A0]">
                  * Zoom integration supports live meetings and cloud recordings where configured.
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 6. Course Sales and Payments (6 features)
    // Lead feature: Course Catalogue with Real Photo + 5 compact cards
    // ------------------------------------------------------------------------
    case "course-sales-and-payments": {
      const lead =
        features.find((f) => f.slug === "course-catalogue-cart-and-wishlist") ||
        features[0];
      const remaining = features.filter((f) => f.slug !== lead.slug);

      return (
        <div className="space-y-8 lg:space-y-12">
          {/* Large Card with Photo and Cart Checkout Summary */}
          <div
            data-feature-slug={lead.slug}
            className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-6 sm:p-10 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Photo & Cart UI (order-1 on mobile, lg:order-2 on desktop) */}
              <div className="w-full lg:col-span-6 lg:order-2 order-1 space-y-4">
                {/* Real Photo with Corner Chip */}
                <div className="relative h-[200px] sm:h-[230px] rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-md group">
                  <Image
                    src={media?.["course-checkout-browsing"]?.src || "/images/features/course-checkout-browsing.webp"}
                    alt={media?.["course-checkout-browsing"]?.alt || "Learner discovering online courses on tablet and completing checkout"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Catalogue and cart
                  </div>
                </div>

                {/* Checkout Summary UI */}
                <div
                  aria-label="Illustration of course storefront and cart checkout"
                  className="bg-[#F8FAFC] rounded-[20px] p-4 sm:p-5 border border-[#ECEDEF] space-y-2.5 text-xs"
                >
                  <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] shadow-2xs space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-[#161616]">Full-Stack Web Engineering</p>
                        <p className="text-[11px] text-[#8F94A0]">Lifetime access • Certificate included</p>
                      </div>
                      <span className="font-semibold text-[#161616]">$89.00</span>
                    </div>

                    <div className="pt-1.5 border-t border-[#F3F4F6] flex items-center justify-between text-[11px]">
                      <span className="text-[#6B6F76]">Coupon: WELCOME10</span>
                      <span className="text-[#0D9488] font-semibold">- $8.90</span>
                    </div>

                    <div className="pt-1.5 border-t border-[#ECEDEF] flex items-center justify-between font-semibold text-[#161616]">
                      <span>Total Due</span>
                      <span>$80.10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Left */}
              <div className="w-full lg:col-span-6 lg:order-1 order-2 space-y-4">
                <div className="w-11 h-11 rounded-[14px] bg-[#F3F4F6] flex items-center justify-center text-[#161616]">
                  <FeatureIcon name={lead.icon || "ShoppingCart"} size={22} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] leading-snug">
                  {lead.title}
                </h3>
                <p className="text-[16px] sm:text-[17px] text-[#6B6F76] leading-relaxed">
                  {lead.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-[#161616]">
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Course Discovery</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Wishlist Saving</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">One-Click Cart</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining 5 features as compact grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {remaining.map((feature) => {
              if (feature.slug === "multiple-payment-gateways") {
                return (
                  <div
                    key={feature.slug}
                    data-feature-slug={feature.slug}
                    className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-[14px] bg-[#F3F4F6] text-[#161616] flex items-center justify-center mb-5">
                        <FeatureIcon name={feature.icon} size={20} />
                      </div>

                      <h4 className="text-[18px] font-semibold text-[#161616] tracking-tight mb-2 leading-snug">
                        {feature.title}
                      </h4>

                      <p className="text-[15px] text-[#6B6F76] leading-relaxed mb-4">
                        {feature.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {["Stripe", "Razorpay", "Paytm", "DOKU"].map((gw) => (
                          <span
                            key={gw}
                            className="px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#161616] text-xs font-medium"
                          >
                            {gw}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-[#8F94A0] italic">
                        * Subject to applicable configuration and availability.
                      </p>
                    </div>
                  </div>
                );
              }

              return <CompactFeatureCard key={feature.slug} feature={feature} />;
            })}
          </div>
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 7. Content Publishing and Digital Products (4 features)
    // ------------------------------------------------------------------------
    case "content-publishing-and-digital-products": {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature) => (
            <CompactFeatureCard key={feature.slug} feature={feature} />
          ))}
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 8. Administration and Communication (3 features)
    // ------------------------------------------------------------------------
    case "administration-and-communication": {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <CompactFeatureCard key={feature.slug} feature={feature} />
          ))}
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 9. Branding, Website, and Reach (4 features)
    // Lead card: Custom Domain with Real Workstation Photo + SSL Browser Frame
    // ------------------------------------------------------------------------
    case "branding-website-and-reach": {
      const lead =
        features.find((f) => f.slug === "custom-domain-with-ssl") || features[0];
      const remaining = features.filter((f) => f.slug !== lead.slug);

      return (
        <div className="space-y-8 lg:space-y-12">
          {/* Lead Card */}
          <div
            data-feature-slug={lead.slug}
            className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-6 sm:p-10 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Photo & Browser Mockup */}
              <div className="w-full lg:col-span-6 lg:order-2 order-1 space-y-4">
                <div className="relative h-[180px] sm:h-[210px] rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-md group">
                  <Image
                    src={media?.["branding-institute-desk"]?.src || "/images/features/branding-institute-desk.webp"}
                    alt={media?.["branding-institute-desk"]?.alt || "Workstation laptop displaying custom academy domain"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    Custom domain with SSL
                  </div>
                </div>

                {/* Browser Frame */}
                <div
                  aria-label="Browser frame illustration showing custom domain with SSL"
                  className="bg-[#F8FAFC] rounded-[20px] p-4 border border-[#ECEDEF] space-y-3"
                >
                  <div className="bg-white rounded-xl border border-[#ECEDEF] p-2 flex items-center gap-2 shadow-2xs">
                    <div className="flex items-center gap-1 px-1">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    </div>

                    <div className="flex-1 min-w-0 bg-[#F3F4F6] rounded-lg px-2.5 py-1 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-[#161616] min-w-0">
                        <Lock className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                        <span className="font-mono font-medium text-[11px] truncate">https://academy.yourdomain.com</span>
                      </div>
                      <span className="text-[9px] text-[#0D9488] font-bold uppercase tracking-wider shrink-0">SSL Valid</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#6B6F76] leading-relaxed">
                    Point a CNAME record from your domain to LMS Domain. Automated SSL certificates provisioned automatically.
                  </p>
                </div>
              </div>

              {/* Text Left */}
              <div className="w-full lg:col-span-6 lg:order-1 order-2 space-y-4">
                <div className="w-11 h-11 rounded-[14px] bg-[#F3F4F6] flex items-center justify-center text-[#161616]">
                  <FeatureIcon name={lead.icon || "Lock"} size={22} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#161616] leading-snug">
                  {lead.title}
                </h3>
                <p className="text-[16px] sm:text-[17px] text-[#6B6F76] leading-relaxed">
                  {lead.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-[#161616]">
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Custom CNAME</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Automated SSL</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">White-Label Branding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining 3 features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {remaining.map((feature) => (
              <CompactFeatureCard key={feature.slug} feature={feature} />
            ))}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

export default CategorySections;
