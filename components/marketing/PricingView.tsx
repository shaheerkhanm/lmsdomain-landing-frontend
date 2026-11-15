"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import BillingToggle from "./BillingToggle";
import PricingCard from "./PricingCard";
import PricingEmptyState from "./PricingEmptyState";
import PricingComparisonTable from "./PricingComparisonTable";
import { FAQ } from "@/components/marketing/ui";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import PlanFinder from "./PlanFinder";
import { CountUp } from "@/components/sections/HomeV5/CountUp";
import { SectionHeading } from "@/components/sections/HomeV5/primitives";
import { BentoCard, LiveArt, PaymentsArt, BrandArt } from "@/components/sections/HomeV5/FeatureBento";
import { SetupArt } from "@/components/sections/HomeV5/SetupSteps";
import { formatPrice } from "@/config/pricing";
import type { PricingPageModel, BillingPeriodId } from "@/types/content";
import { DEFAULT_PRICING_V2 } from "@/config/pricing";
import { resolveCurrency, type PricingCurrency } from "@/lib/currency";
import { ContentSource } from "@/components/content/ContentSource";

interface PricingViewProps {
  data: PricingPageModel;
  initialCurrency?: PricingCurrency | null;
  serverCountryCurrency?: PricingCurrency | null;
  logos?: { name?: string; logo?: string }[];
}

export function PricingView({
  data,
  initialCurrency,
  serverCountryCurrency,
  logos = [],
}: PricingViewProps) {
  const validLogos = logos.filter((l): l is { name: string; logo: string } => Boolean(l.logo && l.name));
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
    // ?currency= URL param > country header > timezone > USD
    const urlCurrency = searchParams.get("currency");
    let clientTimeZone: string | null = null;
    try {
      clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {}

    const resolved = resolveCurrency({
      urlCurrency,
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

  // Hero copy: plain eyebrow (no symbols), and no India-only tax wording for other currencies
  const rawEyebrow = (data.hero.eyebrow || "Pricing").replace(/[✦*]/g, "").trim();
  const heroEyebrow =
    rawEyebrow === rawEyebrow.toUpperCase() ? rawEyebrow.charAt(0) + rawEyebrow.slice(1).toLowerCase() : rawEyebrow;
  const heroSubtitle =
    currency === "INR" ? data.hero.subtitle : (data.hero.subtitle || "").replace(/\s*GST invoices/g, " invoicing");
  const popularSlug = plansV2.find((p) => p.isPopular)?.slug;

  // Answer-first summary with the real starting price (good for search engines and AI answers)
  const selfServe = plansV2.filter((p) => !p.isCustom && typeof p.priceMonthly?.[currency] === "number");
  const fromPrice = selfServe.length ? Math.min(...selfServe.map((p) => p.priceMonthly[currency] as number)) : null;
  const trial = pricingV2.trialDays ?? 15;

  // Soft gradient on the key phrase of the (admin-editable) title
  const renderHeroTitle = (title: string) => {
    const m = title.match(/(\d+%\s*commission)/i);
    if (!m || m.index === undefined) return title;
    return (
      <>
        {title.slice(0, m.index)}
        <span className="bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent">{m[1]}</span>
        {title.slice(m.index + m[1].length)}
      </>
    );
  };

  return (
    <div className="v5 relative min-h-screen bg-white font-sans text-[#0A0A0B]">
      <noscript>
        <style>{`
          .pricing-card-price-content { visibility: visible !important; }
          .pricing-card-shimmer { display: none !important; }
          .rv-v4 { opacity: 1 !important; transform: none !important; }
        `}</style>
      </noscript>

      {/* 1. Hero: soft violet glow, grid pattern, gradient key phrase */}
      <ContentSource id="pricing-hero" source={data.sources?.hero || "code"}>
        <section className="relative isolate overflow-hidden bg-white pt-[120px] min-[900px]:pt-[168px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.20),transparent)] blur-2xl" />
            <div className="absolute left-[8%] top-[60px] h-[360px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(143,168,255,0.22),transparent)] blur-2xl" />
            <div className="absolute right-[6%] top-[120px] h-[340px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(196,181,253,0.28),transparent)] blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,11,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,11,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000_20%,transparent_75%)]" />
          </div>

          <div className="relative mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)] text-center">
            <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
              <ol className="inline-flex items-center gap-1.5">
                <li>
                  <a href="/" className="hover:text-[#0A0A0B]">Home</a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-[#0A0A0B]">{heroEyebrow}</li>
              </ol>
            </nav>
            <h1
              style={{ "--d": "90ms" } as React.CSSProperties}
              className="v5-rise mx-auto mt-5 max-w-[900px] font-urbanist text-[clamp(38px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#0A0A0B] [text-wrap:balance]"
            >
              {renderHeroTitle(data.hero.title)}
            </h1>
            <p
              style={{ "--d": "180ms" } as React.CSSProperties}
              className="v5-rise mx-auto mt-5 max-w-[620px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
            >
              {fromPrice !== null && isCurrencyResolved ? (
                <>
                  Plans start at <strong className="font-semibold text-[#0A0A0B]">{formatPrice(fromPrice, currency)} per month</strong>.{" "}
                </>
              ) : null}
              Every plan includes your own domain, live classes and 0% commission on your sales.
            </p>
            {hasPlans && (
              <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex justify-center">
                <BillingToggle
                  periods={data.billing.periods}
                  activePeriod={activePeriod}
                  onChange={handlePeriodChange}
                  yearlySavingsLabel={yearlySavingsLabel}
                />
              </div>
            )}
            <ul
              style={{ "--d": "360ms" } as React.CSSProperties}
              className="v5-rise mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-[#52525B]"
            >
              {[`${trial}-day free trial`, "No credit card needed", "Upgrade or downgrade any time"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[#6C4BFF]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ContentSource>

      {/* 2. Empty state (no plans published) */}
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

      {/* 3. Plan cards; the popular plan is filled and taller */}
      {hasPlans && (
        <section className="relative z-10 pt-12 lg:pt-14">
          <div className="mx-auto max-w-[1280px] px-[clamp(16px,3vw,32px)]">
            <h2 className="sr-only">Pricing plans</h2>
            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:py-6">
              {plansV2.map((plan, idx) => (
                <div key={plan.slug} className={plan.isPopular ? "order-first md:order-none lg:-my-6" : "h-full"}>
                  <PricingCard
                    plan={plan}
                    currency={currency}
                    period={activePeriod}
                    annualMode={pricingV2.annualMode}
                    monthsFree={pricingV2.monthsFree}
                    trialDays={trial}
                    taxLabel={taxLabel}
                    previousPlanName={idx > 0 ? plansV2[idx - 1].name : undefined}
                    onRequestDemo={(name, slug, billing, curr) => handleOpenDemoModal(name, slug, billing, curr)}
                    index={idx}
                    isResolved={isCurrencyResolved}
                  />
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-[13.5px] text-[#71717A]">
              Prices are per academy, not per learner.{" "}
              <a href="#compare" className="font-semibold text-[#0A0A0B] underline-offset-4 hover:underline">
                Compare all features
              </a>
            </p>

            {/* Trust strip: real customer logos (from admin) and real numbers */}
            <div className="mt-14 border-t border-[#F1F1F4] pt-10 text-center">
              <p className="text-[13px] font-medium text-[#71717A]">Trusted by academies and training teams around the world</p>
              {validLogos.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                  {validLogos.map((l) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={l.name}
                      src={l.logo}
                      alt={l.name}
                      className="h-8 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              <dl className="rv-v4 mx-auto mt-6 grid max-w-[880px] grid-cols-2 gap-y-6 sm:grid-cols-4">
                {[
                  ["2,000+", "Learners"],
                  ["100+", "Courses"],
                  ["300+", "Lessons"],
                  ["100+", "Live classes"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="font-urbanist text-[30px] font-semibold tracking-[-0.03em] text-[#0A0A0B]">
                      <CountUp value={v} />
                    </dd>
                    <dd className="text-[13.5px] text-[#71717A]">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* 3b. Plan finder (dark) */}
      {hasPlans && (
        <PlanFinder
          plans={plansV2}
          currency={currency}
          period={activePeriod}
          annualMode={pricingV2.annualMode}
          monthsFree={pricingV2.monthsFree}
          taxLabel={taxLabel}
          isResolved={isCurrencyResolved}
          onChoose={(p) => handleOpenDemoModal(p.name, p.slug, activePeriod, currency)}
        />
      )}

      {/* 4. Included in every plan (same card style as the homepage) */}
      {hasPlans && (
        <section className="bg-white py-[clamp(56px,7vw,96px)]">
          <div className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)]">
            <SectionHeading eyebrow="Every plan" title="Included in every plan, from Starter up" />
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
              <BentoCard
                className="lg:col-span-5"
                href="/platform/sell"
                title="0% commission on sales"
                description="Payments go straight to your Stripe or Razorpay account. We never take a cut."
              >
                <PaymentsArt />
              </BentoCard>
              <BentoCard
                className="lg:col-span-7"
                delay={90}
                href="/platform/brand"
                title="Your own domain, with SSL"
                description="Run your academy on your own web address from day one."
              >
                <BrandArt />
              </BentoCard>
              <BentoCard
                className="lg:col-span-7"
                href="/platform/teach"
                title="Live classes on Zoom"
                description="Schedule classes by batch, with reminders and recordings saved to the course."
              >
                <LiveArt />
              </BentoCard>
              <BentoCard
                className="lg:col-span-5"
                delay={90}
                href="/contact"
                title="Setup help from our team"
                description="We help you get your courses, domain and payments ready so you can launch quickly."
              >
                <SetupArt />
              </BentoCard>
            </div>
          </div>
        </section>
      )}

      {/* 5. Full comparison table */}
      {hasPlans && data.comparison && (
        <ContentSource id="pricing-comparison" source={data.sources?.comparison || "code"}>
          <div id="compare" className="scroll-mt-24 border-t border-[#F1F1F4]">
            <PricingComparisonTable
              plans={data.plans}
              comparison={data.comparison}
              period={activePeriod}
              onRequestDemo={(name, slug) => handleOpenDemoModal(name, slug || "starter", activePeriod, currency)}
              heading={data.comparisonHeading}
              popularSlug={popularSlug}
            />
          </div>
        </ContentSource>
      )}

      {/* 6. FAQ */}
      {data.faq && data.faq.items && data.faq.items.length > 0 && (
        <ContentSource id="pricing-faq" source={data.sources?.faq || "code"}>
          <FAQ
            id="faqSection"
            minimal
            eyebrow="FAQs"
            title={data.faq.title || "Frequently asked questions"}
            subtitle={data.faq.subtitle || "Answers to common questions about plans, seats and billing."}
            ctaText={data.faq.ctaText || "Book a demo"}
            contactHref="/contact"
            items={data.faq.items.map((it) => ({ question: it.question, answer: it.answer }))}
          />
        </ContentSource>
      )}

      {/* 7. Final CTA */}
      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>

      <ScrollReveal />

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
