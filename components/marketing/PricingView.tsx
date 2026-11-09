"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import PageHero from "@/components/marketing/PageHero";
import BillingToggle from "./BillingToggle";
import CurrencyToggle from "./CurrencyToggle";
import PricingCard from "./PricingCard";
import PricingEmptyState from "./PricingEmptyState";
import PricingComparisonTable from "./PricingComparisonTable";
import MarketingFaq from "./MarketingFaq";
import { CtaSection } from "@/components/sections/HomePage/CtaSection/CtaSection";
import type { PricingPageModel, BillingPeriodId } from "@/types/content";
import { DEFAULT_PRICING_V2 } from "@/config/pricing";
import { resolveCurrency, type PricingCurrency } from "@/lib/currency";
import { ContentSource } from "@/components/content/ContentSource";
import { ShieldCheck, Globe, Video, Headphones } from "lucide-react";

interface PricingViewProps {
  data: PricingPageModel;
  initialCurrency?: PricingCurrency | null;
  serverCountryCurrency?: PricingCurrency | null;
}

export function PricingView({
  data,
  initialCurrency,
  serverCountryCurrency,
}: PricingViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pricingV2 = data.pricingV2 || DEFAULT_PRICING_V2;
  const plansV2 = pricingV2.plans.filter((p) => p.active !== false).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  // Yearly exists only when a plan has a yearly price; otherwise ?billing=yearly is ignored
  const yearlyAvailable = data.billing.periods.some((p) => p.id === "yearly");

  // Read initial billing period from URL query (?billing=yearly)
  const initialPeriod = (searchParams.get("billing") as BillingPeriodId) || data.billing.defaultPeriod;
  const [selectedPeriod, setActivePeriod] = useState<BillingPeriodId>(
    initialPeriod === "yearly" ? "yearly" : "monthly"
  );
  const activePeriod: BillingPeriodId = yearlyAvailable ? selectedPeriod : "monthly";

  // Currency resolution:
  // If initialCurrency (from URL param or proxy/CDN country header) is known, start with it.
  // Otherwise, default to INR for safety, but mark isCurrencyResolved as false until client resolves.
  const [currency, setCurrency] = useState<PricingCurrency>(
    initialCurrency || "INR"
  );
  const [isCurrencyResolved, setIsCurrencyResolved] = useState<boolean>(
    Boolean(initialCurrency)
  );

  const [selectedPlanForDemo, setSelectedPlanForDemo] = useState<string>("");
  const [selectedBillingForDemo, setSelectedBillingForDemo] = useState<string>("monthly");
  const [selectedCurrencyForDemo, setSelectedCurrencyForDemo] = useState<string>("INR");
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);

  // Sync state when URL parameter changes (?billing=, ?plan=, ?currency=)
  useEffect(() => {
    // 1. Resolve currency strictly in priority order:
    // ?currency= URL param > localStorage > country header > timezone > USD
    const urlCurrency = searchParams.get("currency");
    let savedCurrency: string | null = null;
    try {
      savedCurrency = localStorage.getItem("preferred_currency");
    } catch {}

    let clientTimeZone: string | null = null;
    try {
      clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {}

    const resolved = resolveCurrency({
      urlCurrency,
      savedCurrency,
      serverCountryCurrency,
      clientTimeZone,
    });

    setCurrency(resolved);
    setIsCurrencyResolved(true);

    // 2. Billing resolution
    const urlBilling = searchParams.get("billing") as BillingPeriodId;
    if (urlBilling === "yearly" || urlBilling === "monthly") {
      setActivePeriod(urlBilling);
    }

    // 3. Plan query resolution
    const urlPlan = searchParams.get("plan");
    if (urlPlan) {
      const matched = plansV2.find(
        (p) =>
          p.slug?.toLowerCase() === urlPlan.toLowerCase() ||
          p.name.toLowerCase() === urlPlan.toLowerCase()
      );
      setSelectedPlanForDemo(matched ? matched.name : urlPlan);
      setSelectedBillingForDemo(urlBilling || activePeriod);
      setSelectedCurrencyForDemo(urlCurrency || resolved);
      setShowDemoModal(true);
    }
  }, [searchParams, plansV2, activePeriod, serverCountryCurrency]);

  const handlePeriodChange = (newPeriod: BillingPeriodId) => {
    setActivePeriod(newPeriod);
    const params = new URLSearchParams(searchParams.toString());
    params.set("billing", newPeriod);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCurrencyChange = (newCurrency: PricingCurrency) => {
    setCurrency(newCurrency);
    setIsCurrencyResolved(true);
    try {
      localStorage.setItem("preferred_currency", newCurrency);
    } catch {}
    const params = new URLSearchParams(searchParams.toString());
    params.set("currency", newCurrency.toLowerCase());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleOpenDemoModal = (
    planName: string,
    planSlug: string,
    billing: BillingPeriodId = activePeriod,
    curr: PricingCurrency = currency
  ) => {
    setSelectedPlanForDemo(planName);
    setSelectedBillingForDemo(billing);
    setSelectedCurrencyForDemo(curr);
    setShowDemoModal(true);
    const params = new URLSearchParams(searchParams.toString());
    if (planSlug.toLowerCase() === "enterprise") {
      params.set("plan", "enterprise");
    } else {
      params.set("plan", planSlug);
      params.set("billing", billing);
      params.set("currency", curr.toLowerCase());
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  };

  const handleCloseDemoModal = () => {
    setShowDemoModal(false);
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("plan")) {
      params.delete("plan");
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
    }
  };

  const hasPlans = plansV2.length > 0;
  const taxLabel =
    pricingV2.currencies?.[currency]?.taxLabel ||
    (currency === "INR" ? "+ GST" : "+ applicable taxes");

  // Determine dynamic yearly savings label
  const yearlySavingsLabel =
    pricingV2.annualMode === "monthsFree"
      ? `${pricingV2.monthsFree} months free`
      : undefined;

  return (
    <div className="min-h-screen bg-white font-urbanist relative">
      {/* 1. Hero */}
      <ContentSource id="pricing-hero" source={data.sources?.hero || "code"}>
        <PageHero
          pattern="dots"
          eyebrow={data.hero.eyebrow}
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          className="border-b border-[#ECEDEF]"
        >
          {/* Billing & Currency Toggles */}
          {hasPlans && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-8 font-urbanist select-none">
              <BillingToggle
                periods={data.billing.periods}
                activePeriod={activePeriod}
                onChange={handlePeriodChange}
                yearlySavingsLabel={yearlySavingsLabel}
              />
              <CurrencyToggle
                currency={currency}
                onChange={handleCurrencyChange}
              />
            </div>
          )}
        </PageHero>
      </ContentSource>

      {/* 2. Empty State (When plans collection has 0 documents) */}
      {!hasPlans && (
        <ContentSource id="pricing-empty" source={data.sources?.empty || "code"}>
          <PricingEmptyState
            eyebrow={data.emptyState?.eyebrow}
            title={data.emptyState?.title}
            subtitle={data.emptyState?.subtitle}
            primaryCta={data.emptyState?.primaryCta}
            secondaryCta={data.emptyState?.secondaryCta}
          />
        </ContentSource>
      )}

      {/* 3. Plan Cards (4 Cards Grid) */}
      {hasPlans && (
        <section className="bg-[#F3F4F6] pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 font-urbanist border-b border-[#ECEDEF]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
            {/* 4 Cards Grid */}
            <div className="lg:-mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {plansV2.map((plan, idx) => (
                <div
                  key={plan.slug}
                  className={`h-full ${plan.isPopular ? "order-first md:order-none" : ""}`}
                >
                  <PricingCard
                    plan={plan}
                    currency={currency}
                    period={activePeriod}
                    annualMode={pricingV2.annualMode}
                    monthsFree={pricingV2.monthsFree}
                    trialDays={pricingV2.trialDays}
                    taxLabel={taxLabel}
                    previousPlanName={idx > 0 ? plansV2[idx - 1].name : undefined}
                    onRequestDemo={(name, slug, billing, curr) =>
                      handleOpenDemoModal(name, slug, billing, curr)
                    }
                    index={idx}
                    isResolved={isCurrencyResolved}
                  />
                </div>
              ))}
            </div>

            {/* Reassurance Note under cards */}
            <p className="text-center text-xs sm:text-sm text-[#6B6F76] font-medium mt-8">
              No credit card needed to start your trial
            </p>

            {/* Why teams switch to LMS Domain strip */}
            <div className="mt-16 pt-12 border-t border-[#E5E7EB]">
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7B5CF5] block mb-2">
                  ✦ WHY LMS DOMAIN
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#161616] tracking-tight">
                  Why teams switch to LMS Domain
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#ECEDEF] shadow-2xs text-left">
                  <div className="size-10 rounded-xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#161616] mb-1.5">
                    0% commission on sales
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
                    Keep 100% of your course revenue across every plan. We never take a cut of your academy sales.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#ECEDEF] shadow-2xs text-left">
                  <div className="size-10 rounded-xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-4">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#161616] mb-1.5">
                    Own domain on every plan
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
                    Launch under your academy&apos;s primary domain with automatic free SSL from day one on Starter.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#ECEDEF] shadow-2xs text-left">
                  <div className="size-10 rounded-xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-4">
                    <Video className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#161616] mb-1.5">
                    Live classes included
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
                    Zoom live classes scheduled per batch, with recordings and attendance organized alongside courses.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#ECEDEF] shadow-2xs text-left">
                  <div className="size-10 rounded-xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-4">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#161616] mb-1.5">
                    Indian support team
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
                    Direct technical assistance, fast response times, and migration help from our dedicated support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Full Comparison Table */}
      {hasPlans && data.comparison && (
        <ContentSource id="pricing-comparison" source={data.sources?.comparison || "code"}>
          <PricingComparisonTable
            plans={data.plans}
            comparison={data.comparison}
            period={activePeriod}
            onRequestDemo={(name, slug) =>
              handleOpenDemoModal(name, slug || "starter", activePeriod, currency)
            }
            heading={data.comparisonHeading}
          />
        </ContentSource>
      )}

      {/* 5. FAQ (#faqSection) */}
      {data.faq && data.faq.items && data.faq.items.length > 0 && (
        <ContentSource id="pricing-faq" source={data.sources?.faq || "code"}>
          <MarketingFaq
            id="faqSection"
            eyebrow={data.faq.eyebrow}
            title={data.faq.title || "Frequently Asked Questions"}
            subtitle={
              data.faq.subtitle ||
              "Answers to common questions about plans, seats, and billing cycles."
            }
            ctaText={data.faq.ctaText}
            items={data.faq.items}
          />
        </ContentSource>
      )}

      {/* 6. Final CTA Band */}
      <ContentSource id="pricing-footer-card" source={data.sources?.band || "code"}>
        <CtaSection showTestimonials={false} content={data.band} />
      </ContentSource>

      {/* Demo Enquiry Modal with preselected plan, billing, and currency */}
      <Dialog
        open={showDemoModal}
        onOpenChange={(open) => {
          if (!open) handleCloseDemoModal();
          else setShowDemoModal(true);
        }}
      >
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm
            onClose={handleCloseDemoModal}
            initialPlan={selectedPlanForDemo}
            initialBilling={selectedBillingForDemo}
            initialCurrency={selectedCurrencyForDemo}
            initialSubject={
              selectedPlanForDemo
                ? `Demo request: ${selectedPlanForDemo} (${selectedBillingForDemo}, ${selectedCurrencyForDemo})`
                : undefined
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PricingView;
