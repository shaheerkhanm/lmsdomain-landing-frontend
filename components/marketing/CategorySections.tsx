import React from "react";
import { FeatureCategory, Feature } from "@/types/content";
import { CompactFeatureCard } from "./CompactFeatureCard";
import { FeatureIcon } from "./FeatureIcon";
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
}

export function CategorySections({ categories }: CategorySectionsProps) {
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
              {renderCategoryBody(category)}
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

function renderCategoryBody(category: FeatureCategory) {
  const { slug, features } = category;

  switch (slug) {
    // ------------------------------------------------------------------------
    // 1. Course Learning (7 features)
    // Lead feature: Structured Courses as FeatureRow, then 6 compact cards in 3 cols
    // ------------------------------------------------------------------------
    case "course-learning": {
      const lead = features.find((f) => f.slug === "structured-courses") || features[0];
      const remaining = features.filter((f) => f.slug !== lead.slug);

      return (
        <div className="space-y-8 lg:space-y-12">
          {/* Large White Card with FeatureRow */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-6 sm:p-10 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual (order-1 on mobile, lg:order-2 on desktop) */}
              <div className="w-full lg:col-span-6 lg:order-2 order-1">
                <div
                  aria-label="Illustration of course curriculum builder"
                  className="bg-[#F8FAFC] rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-5 sm:p-6 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#ECEDEF] text-xs">
                    <span className="font-semibold text-[#161616]">Course Curriculum Builder</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E8F8F5] text-[#0D9488] font-medium">Auto-saved</span>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] shadow-2xs">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#161616] mb-2">
                        <span>Module 1: Foundations & Architecture</span>
                        <span className="text-[#8F94A0] font-normal">3 lessons</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-[#6B6F76]">
                        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F8FAFC]">
                          <span className="w-2 h-2 rounded-full bg-[#7B5CF5]" />
                          <span className="font-medium text-[#161616]">1.1 Introduction to the Stack</span>
                          <span className="ml-auto text-[10px] text-[#8F94A0]">Video (14m)</span>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F8FAFC]">
                          <span className="w-2 h-2 rounded-full bg-[#0D9488]" />
                          <span className="font-medium text-[#161616]">1.2 Architectural Blueprint</span>
                          <span className="ml-auto text-[10px] text-[#8F94A0]">PDF Guide</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] shadow-2xs flex items-center justify-between text-xs text-[#6B6F76]">
                      <span className="font-semibold text-[#161616]">Module 2: Advanced Patterns</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B6F76]">Drip Release</span>
                    </div>
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
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Video & Audio</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">PDFs & Docs</span>
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">Interactive Quizzes</span>
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
    // 3 cards in a row with visual on top
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
                className="bg-white rounded-[28px] border border-[#ECEDEF] p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div>
                  {/* Visual Illustration on Top */}
                  <div
                    aria-label={`Illustration for ${feature.title}`}
                    className="bg-[#F8FAFC] rounded-[20px] p-4 border border-[#ECEDEF] mb-6 min-h-[140px] flex flex-col justify-center"
                  >
                    {isQuiz && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[#8F94A0] text-[11px]">
                          <span>Question 4 of 10</span>
                          <span className="text-[#0D9488] font-semibold">Automated Scoring</span>
                        </div>
                        <p className="font-semibold text-[#161616] text-[12px]">Which data structure ensures FIFO order?</p>
                        <div className="space-y-1">
                          <div className="p-1.5 rounded-md bg-[#E8F8F5] border border-[#A6E3D3] text-[#0D9488] font-medium flex items-center justify-between text-[11px]">
                            <span>Queue</span>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="p-1.5 rounded-md bg-white border border-[#ECEDEF] text-[#6B6F76] text-[11px]">
                            <span>Stack</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {isAssignment && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#161616] text-[12px]">Project Submission</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#E0E7FF] text-[#4338CA] text-[10px] font-semibold">Reviewed</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-[#ECEDEF] space-y-1 text-[11px]">
                          <p className="text-[#6B6F76]">Learner: <span className="text-[#161616] font-medium">Aisha K.</span></p>
                          <p className="text-[#6B6F76]">Instructor Feedback: <span className="text-[#161616]">"Excellent architecture and test coverage. Grade: 96/100"</span></p>
                        </div>
                      </div>
                    )}

                    {isCheckpoint && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#161616]">Video Checkpoint (04:32)</span>
                          <span className="text-[#7B5CF5] font-semibold">Paused</span>
                        </div>
                        <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden relative">
                          <div className="bg-[#7B5CF5] h-full w-[45%]" />
                          <div className="absolute top-0 left-[45%] w-2 h-2 rounded-full bg-[#161616] -mt-[1px]" />
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-[#ECEDEF] text-[11px] text-[#161616]">
                          "Answer checkpoint question to resume video playback"
                        </div>
                      </div>
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
    // 3 cards in a row with visual on top
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
                className="bg-white rounded-[28px] border border-[#ECEDEF] p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
              >
                <div>
                  {/* Visual Illustration on Top */}
                  <div
                    aria-label={`Illustration for ${feature.title}`}
                    className="bg-[#F8FAFC] rounded-[20px] p-4 border border-[#ECEDEF] mb-6 min-h-[140px] flex flex-col justify-center"
                  >
                    {isLeaderboard && (
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px] text-[#8F94A0] pb-1 border-b border-[#ECEDEF]">
                          <span>Academy Leaderboard</span>
                          <span className="text-[#7B5CF5] font-semibold">Weekly XP</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded-md bg-white border border-[#ECEDEF] text-[11px]">
                          <span className="font-semibold text-[#161616]">🥇 1. Maya Chen</span>
                          <span className="font-mono text-[#0D9488] font-semibold">2,840 pts</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded-md bg-white border border-[#ECEDEF] text-[11px]">
                          <span className="font-semibold text-[#161616]">🥈 2. David R.</span>
                          <span className="font-mono text-[#6B6F76]">2,410 pts</span>
                        </div>
                      </div>
                    )}

                    {isWatchPercent && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#161616]">Watch Completion Goal</span>
                          <span className="text-[#0D9488] font-semibold">80% Required</span>
                        </div>
                        <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden relative">
                          <div className="bg-[#0D9488] h-full w-[85%]" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#6B6F76]">
                          <span>Watched: 85%</span>
                          <span className="text-[#0D9488] font-semibold">✓ Marked Complete</span>
                        </div>
                      </div>
                    )}

                    {isHelpDrawer && (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#161616] text-[11px]">Lesson 3: Advanced APIs</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-[10px] font-semibold flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Locked
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-[#ECEDEF] text-[11px] space-y-1">
                          <p className="font-medium text-[#161616]">Help Drawer:</p>
                          <p className="text-[#6B6F76]">"Pass the Module 2 Assessment with ≥ 80% to unlock this lesson."</p>
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
    // 2x2 grid of cards
    // ------------------------------------------------------------------------
    case "live-and-cohort-learning": {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.slug}
              className="bg-white rounded-[28px] border border-[#ECEDEF] p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]"
            >
              <div>
                <div className="w-11 h-11 rounded-[14px] bg-[#F3F4F6] text-[#161616] flex items-center justify-center mb-5">
                  <FeatureIcon name={feature.icon} size={20} />
                </div>

                <h3 className="text-[20px] font-semibold text-[#161616] tracking-tight mb-2">
                  {feature.title}
                </h3>

                <p className="text-[15px] text-[#6B6F76] leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Sub-card UI accent */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#ECEDEF] text-xs">
                {feature.slug === "live-classes-with-zoom" && (
                  <div className="flex items-center justify-between text-[#6B6F76]">
                    <span className="font-semibold text-[#161616]">Zoom Live Integration</span>
                    <span className="px-2 py-0.5 rounded bg-[#F3F4F6] text-[11px]">Recordings supported</span>
                  </div>
                )}
                {feature.slug === "cohort-based-bootcamps" && (
                  <div className="flex items-center justify-between text-[#6B6F76]">
                    <span className="font-semibold text-[#161616]">Cohort Calendar</span>
                    <span className="text-[#0D9488] font-semibold">Structured batches</span>
                  </div>
                )}
                {feature.slug === "one-to-one-tutor-booking" && (
                  <div className="flex items-center justify-between text-[#6B6F76]">
                    <span className="font-semibold text-[#161616]">Instructor Availability</span>
                    <span className="text-[#7B5CF5] font-semibold">Self-service slots</span>
                  </div>
                )}
                {feature.slug === "team-training-packages" && (
                  <div className="flex items-center justify-between text-[#6B6F76]">
                    <span className="font-semibold text-[#161616]">Corporate Seats</span>
                    <span className="text-[#161616] font-semibold">Group licensing</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // ------------------------------------------------------------------------
    // 6. Course Sales and Payments (6 features)
    // Lead feature: Course Catalogue, Cart, and Wishlist as FeatureRow, then 5 compact cards
    // ------------------------------------------------------------------------
    case "course-sales-and-payments": {
      const lead =
        features.find((f) => f.slug === "course-catalogue-cart-and-wishlist") ||
        features[0];
      const remaining = features.filter((f) => f.slug !== lead.slug);

      return (
        <div className="space-y-8 lg:space-y-12">
          {/* Large Card with FeatureRow */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-6 sm:p-10 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual (order-1 on mobile, lg:order-2 on desktop) */}
              <div className="w-full lg:col-span-6 lg:order-2 order-1">
                <div
                  aria-label="Illustration of course storefront and cart checkout"
                  className="bg-[#F8FAFC] rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-5 sm:p-6 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#ECEDEF] text-xs">
                    <span className="font-semibold text-[#161616]">Academy Storefront Checkout</span>
                    <span className="text-[#0D9488] font-semibold">SSL Secured</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#ECEDEF] shadow-2xs space-y-3 text-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-[#161616]">Distributed Systems Mastery</p>
                        <p className="text-[11px] text-[#8F94A0]">Lifetime access • Certificate included</p>
                      </div>
                      <span className="font-semibold text-[#161616] text-sm">$89.00</span>
                    </div>

                    <div className="pt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[11px]">
                      <span className="text-[#6B6F76]">Coupon: WELCOME10</span>
                      <span className="text-[#0D9488] font-semibold">- $8.90</span>
                    </div>

                    <div className="pt-2 border-t border-[#ECEDEF] flex items-center justify-between font-semibold text-xs text-[#161616]">
                      <span>Total Due</span>
                      <span className="text-sm">$80.10</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#6B6F76]">
                    <span className="font-medium text-[#161616]">Gateways:</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#ECEDEF]">Stripe</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#ECEDEF]">Razorpay</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#ECEDEF]">Paytm</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#ECEDEF]">DOKU</span>
                  </div>
                </div>
              </div>

              {/* Text Left (order-2 on mobile, lg:order-1 on desktop) */}
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
    // 4 compact cards in a grid
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
    // 3 cards in a row
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
    // Lead card: Custom Domain with SSL with browser frame mockup + 3 compact cards
    // ------------------------------------------------------------------------
    case "branding-website-and-reach": {
      const lead =
        features.find((f) => f.slug === "custom-domain-with-ssl") || features[0];
      const remaining = features.filter((f) => f.slug !== lead.slug);

      return (
        <div className="space-y-8 lg:space-y-12">
          {/* Lead Card: Custom Domain with SSL Browser Frame */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#ECEDEF] p-6 sm:p-10 lg:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual Browser Mockup (order-1 on mobile, lg:order-2 on desktop) */}
              <div className="w-full lg:col-span-6 lg:order-2 order-1">
                <div
                  aria-label="Browser frame illustration showing custom domain with SSL"
                  className="bg-[#F8FAFC] rounded-[24px] sm:rounded-[28px] border border-[#ECEDEF] p-4 sm:p-6 space-y-4"
                >
                  {/* Browser Bar */}
                  <div className="bg-white rounded-xl border border-[#ECEDEF] p-2.5 flex items-center gap-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 px-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    </div>

                    <div className="flex-1 bg-[#F3F4F6] rounded-lg px-3 py-1 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#161616]">
                        <Lock className="w-3.5 h-3.5 text-[#0D9488]" />
                        <span className="font-mono font-medium">https://academy.yourdomain.com</span>
                      </div>
                      <span className="text-[10px] text-[#0D9488] font-semibold uppercase tracking-wider">SSL Valid</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#ECEDEF] space-y-2 text-xs">
                    <p className="font-semibold text-[#161616]">DNS Configuration Guide</p>
                    <p className="text-[#6B6F76] text-[11px] leading-relaxed">
                      Point a CNAME record from your subdomain (e.g. academy.yourdomain.com) to LMS Domain servers. Automated SSL certificates provisioned automatically.
                    </p>
                    <div className="pt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#8F94A0]">
                      <span>DNS setup required</span>
                      <span className="font-medium text-[#161616]">Verified ✓</span>
                    </div>
                  </div>
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
                  <span className="px-3 py-1 rounded-full bg-[#F3F4F6]">White-Label Experience</span>
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

