"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import PageHero from "@/components/marketing/PageHero";
import BillingToggle from "./BillingToggle";
import PricingCard from "./PricingCard";
import PricingEmptyState from "./PricingEmptyState";
import PricingComparisonTable from "./PricingComparisonTable";
import PricingAddOns from "./PricingAddOns";
import PricingEnterprise from "./PricingEnterprise";
import MarketingFaq from "./MarketingFaq";
import { CtaSection } from "@/components/sections/HomePage/CtaSection/CtaSection";
import type { PricingPageModel, BillingPeriodId, Plan } from "@/types/content";

interface PricingViewProps {
  data: PricingPageModel;
}

export function PricingView({ data }: PricingViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial billing period from URL query (?billing=yearly)
  const initialPeriod = (searchParams.get("billing") as BillingPeriodId) || data.billing.defaultPeriod;
  const [activePeriod, setActivePeriod] = useState<BillingPeriodId>(
    initialPeriod === "yearly" ? "yearly" : "monthly"
  );

  const [selectedPlanForDemo, setSelectedPlanForDemo] = useState<string>("");
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);

  // Sync state when URL parameter changes
  useEffect(() => {
    const urlBilling = searchParams.get("billing") as BillingPeriodId;
    if (urlBilling === "yearly" || urlBilling === "monthly") {
      setActivePeriod(urlBilling);
    }
  }, [searchParams]);

  const handlePeriodChange = (newPeriod: BillingPeriodId) => {
    setActivePeriod(newPeriod);
    const params = new URLSearchParams(searchParams.toString());
    params.set("billing", newPeriod);
    // Replace URL query smoothly without full page refresh
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const handleOpenDemoModal = (planName?: string) => {
    setSelectedPlanForDemo(planName || "General Pricing Enquiry");
    setShowDemoModal(true);
  };

  const hasPlans = data.plans && data.plans.length > 0;

  // On mobile, popular plan is displayed first
  const sortedPlansForDisplay = (): Plan[] => {
    if (!hasPlans) return [];
    return [...data.plans].sort((a, b) => {
      return (a.displayOrder || 0) - (b.displayOrder || 0);
    });
  };

  const displayPlans = sortedPlansForDisplay();

  return (
    <div className="min-h-screen bg-white font-urbanist relative">
      {/* 1. Hero (White, PageHero with pattern="dots" & normal-flow sample strip) */}
      <PageHero
        pattern="dots"
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        className="border-b border-[#ECEDEF]"
        topStrip={
          data.isSample ? (
            <div className="bg-[#F3CF74] text-[#161616] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs border border-amber-300 flex items-center gap-1.5">
              <span className="text-amber-800">✦</span>
              <span>Sample pricing for design preview. Not real plans.</span>
            </div>
          ) : undefined
        }
      >
        {/* 2. Billing Toggle (Signature detail, shown when plans exist) */}
        {hasPlans && (
          <BillingToggle
            periods={data.billing.periods}
            activePeriod={activePeriod}
            onChange={handlePeriodChange}
            yearlySavingsLabel={data.billing.yearlySavingsLabel}
          />
        )}
      </PageHero>

      {/* 3. Empty State (When plans collection has 0 documents) */}
      {!hasPlans && (
        <PricingEmptyState
          title={data.emptyState?.title}
          subtitle={data.emptyState?.subtitle}
          primaryCta={data.emptyState?.primaryCta}
          secondaryCta={data.emptyState?.secondaryCta}
        />
      )}

      {/* 4. Plan Cards (Gray #F3F4F6 section, cards overlap top by 80px on desktop) */}
      {hasPlans && (
        <section className="bg-[#F3F4F6] pt-16 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 font-urbanist border-b border-[#ECEDEF]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            {/* Desktop / Tablet Grid: 3 or 4 cards in row, cards overlap top by 80px */}
            <div className="lg:-mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {/* Order popular plan first on small screens via flex/order */}
              {displayPlans.map((plan, idx) => (
                <div
                  key={plan.id}
                  className={`h-full flex flex-col ${
                    plan.isPopular ? "order-first md:order-none" : ""
                  }`}
                >
                  <PricingCard
                    plan={plan}
                    period={activePeriod}
                    currency={data.currency}
                    onRequestDemo={handleOpenDemoModal}
                    index={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Comparison Table (White, only if present) */}
      {hasPlans && data.comparison && (
        <PricingComparisonTable
          plans={data.plans}
          comparison={data.comparison}
          period={activePeriod}
          onRequestDemo={handleOpenDemoModal}
        />
      )}

      {/* 6. Add-Ons (Gray #F3F4F6, only if present) */}
      {hasPlans && data.addOns && (
        <PricingAddOns
          title={data.addOns.title}
          items={data.addOns.items}
        />
      )}

      {/* 7. Enterprise Band (White, only if present) */}
      {hasPlans && data.enterprise && (
        <PricingEnterprise data={data.enterprise} />
      )}

      {/* 8. FAQ (Gray / White, fed by pricing FAQ items from CMS) */}
      {data.faq && data.faq.items && data.faq.items.length > 0 && (
        <MarketingFaq
          title={data.faq.title || "Frequently Asked Questions"}
          subtitle={data.faq.subtitle || "Answers to common questions about plans, seats, and billing cycles."}
          items={data.faq.items}
        />
      )}

      {/* 9. Final CTA Band (Landing CTA with testimonials hidden) */}
      <CtaSection showTestimonials={false} />

      {/* Demo Enquiry Modal with preselected plan */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm
            onClose={() => setShowDemoModal(false)}
            initialSubject={selectedPlanForDemo ? `Plan Enquiry: ${selectedPlanForDemo}` : undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PricingView;

