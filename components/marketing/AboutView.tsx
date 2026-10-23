"use client";

import React from "react";
import PageHero from "./PageHero";
import AboutHeroImage from "./AboutHeroImage";
import ManifestSection from "@/components/sections/HomePage/ManifestSection";
import AboutStory from "./AboutStory";
import AboutValues from "./AboutValues";
import AboutTimeline from "./AboutTimeline";
import AboutTeam from "./AboutTeam";
import AboutStats from "./AboutStats";
import AboutCareers from "./AboutCareers";
import { CtaSection } from "@/components/sections/HomePage/CtaSection/CtaSection";
import type { AboutPageModel } from "@/types/content";
import { ContentSource } from "@/components/content/ContentSource";

interface AboutViewProps {
  data: AboutPageModel;
}

export function AboutView({ data }: AboutViewProps) {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      {/* 1. Hero (White, PageHero) */}
      <ContentSource id="about-hero" source={data.sources?.hero || "code"}>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        topStrip={
          data.isSample ? (
            <div className="bg-[#F3CF74] text-[#161616] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs border border-amber-300 flex items-center gap-1.5">
              <span className="text-amber-800">✦</span>
              <span>Sample about content for design preview. Not real information.</span>
            </div>
          ) : undefined
        }
      />
      </ContentSource>

      {/* Hero Image Card (radius 40px, desktop GSAP scrub from 0.94 to 1) */}
      {data.hero.image && (
        <AboutHeroImage src={data.hero.image} alt={data.hero.title} />
      )}

      {/* 2. Mission Statement (Signature Moment, White, Reused ManifestSection) */}
      {data.mission && data.mission.statement && (
        <ManifestSection
          id="about-mission"
          statement={data.mission.statement}
          bgClassName="bg-white"
          eyebrow="Mission Statement"
        />
      )}

      {/* 3. Story (Gray #F3F4F6, Large Card radius 40px) */}
      {data.story && (
        <AboutStory
          title={data.story.title}
          body={data.story.body}
          image={data.story.image}
        />
      )}

      {/* 4. Values (White, 3-column grid of cards, only if present in CMS) */}
      {data.values && data.values.items && data.values.items.length > 0 && (
        <AboutValues data={data.values} />
      )}

      {/* 5. Timeline (Gray, only if present in CMS) */}
      {data.timeline && data.timeline.items && data.timeline.items.length > 0 && (
        <AboutTimeline data={data.timeline} />
      )}

      {/* 6. Team / Leadership (White, only if present in CMS) */}
      {data.team && data.team.members && data.team.members.length > 0 && (
        <AboutTeam data={data.team} />
      )}

      {/* 7. Stats (Gray, only if present in CMS) */}
      {data.stats && data.stats.items && data.stats.items.length > 0 && (
        <AboutStats data={data.stats} />
      )}

      {/* 8. Careers (White, only if present in CMS) */}
      {data.careers && <AboutCareers data={data.careers} />}

      {/* 9. Final CTA Band (Landing CTA with floating testimonials hidden) */}
      <ContentSource id="about-mission-card" source={data.sources?.band || "code"}>
        <CtaSection showTestimonials={false} content={data.band} />
      </ContentSource>
    </div>
  );
}

export default AboutView;

