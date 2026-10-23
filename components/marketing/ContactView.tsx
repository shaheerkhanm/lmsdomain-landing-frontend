"use client";

import React from "react";
import PageHero from "./PageHero";
import DemoForm from "./DemoForm";
import ContactChannels from "./ContactChannels";
import MarketingFaq from "./MarketingFaq";
import type { ContactPageModel } from "@/types/content";
import { ContentSource } from "@/components/content/ContentSource";

interface ContactViewProps {
  data: ContactPageModel;
}

export function ContactView({ data }: ContactViewProps) {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      {/* 1. HERO (White): PageHero, H1, Subtitle, No buttons */}
      <ContentSource id="contact-hero" source={data.sources?.hero || "code"}>
        <PageHero
          eyebrow={data.hero.eyebrow}
          title={data.hero.title}
          subtitle={data.hero.subtitle}
        />
      </ContentSource>

      {/* 2. FORM + CHANNELS (Gray #F3F4F6): One large white Card, 2 columns */}
      <section className="bg-[#F3F4F6] py-16 lg:py-24 font-urbanist border-y border-[#ECEDEF]/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#ECEDEF] p-6 sm:p-10 lg:p-16 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left Column (40% desktop, Order 2 mobile): Channels */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <ContentSource id="contact-channels" source={data.sources?.channels || "code"}>
                  <ContactChannels channels={data.channels} title={data.channelsHeading?.title} subtitle={data.channelsHeading?.subtitle} />
                </ContentSource>
              </div>

              {/* Right Column (60% desktop, Order 1 mobile): Form first */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <ContentSource id="contact-form" source={data.sources?.form || "code"}>
                  <DemoForm
                    submitLabel={data.form.submitLabel}
                    successTitle={data.form.successTitle}
                    successMessage={data.form.successMessage}
                    privacyNote={data.form.privacyNote}
                    topics={data.topics}
                    variant="page"
                  />
                </ContentSource>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ (White, only if present in CMS/backend) */}
      {data.faq && data.faq.items && data.faq.items.length > 0 && (
        <MarketingFaq
          title={data.faq.title}
          subtitle={data.faq.subtitle}
          items={data.faq.items}
        />
      )}
    </div>
  );
}

export default ContactView;
