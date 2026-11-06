import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { getSiteAbout, fetchSeo } from "@/lib/api/content";
import { fullTitle, getMetadataBase, applySeo, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { guardMetadata } from "@/lib/pages";
import { Linkedin, Building2, MapPin, Calendar, Users, Award, BookOpen, Video, ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("about");
  if (hiddenMeta) return hiddenMeta;

  const about = await getSiteAbout().catch(() => null);
  const title = fullTitle("About Us");
  const description =
    about?.mission ||
    "We build the platform academies run on: batches, live classes, and assessments under your own domain.";

  const base: Metadata = {
    metadataBase: getMetadataBase(),
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: { title, description, url: "/about", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };

  return applySeo(base, await fetchSeo("about").catch(() => null), { page: "about" });
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function AboutRoute() {
  const about = await getSiteAbout();
  const siteOrigin = getSiteUrl() || PRODUCTION_ORIGIN;

  const founders = (about.team || [])
    .filter((m) => m.visible !== false && m.group === "founders")
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const teamMembers = (about.team || [])
    .filter((m) => m.visible !== false && m.group === "team")
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: about.productName,
    legalName: about.companyLegalName,
    url: siteOrigin,
    foundingDate: String(about.yearFounded),
    address: {
      "@type": "PostalAddress",
      addressLocality: about.city,
      addressRegion: about.region,
      addressCountry: about.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
        {/* 1. Hero & Outcome H1 */}
        <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
            <Eyebrow tone="violet">OUR MISSION</Eyebrow>

            {/* Single H1 on page */}
            <h1 className="type-h1 text-[#161616] tracking-tight mt-4 max-w-3xl">
              {about.heroTitle}
            </h1>

            {/* Mission (two sentences) */}
            <p className="type-body text-[#6B6F76] mt-6 max-w-2xl leading-relaxed text-lg sm:text-xl">
              {about.mission}
            </p>
          </div>
        </section>

        {/* 2. Company Facts */}
        <section className="py-12 sm:py-16 border-y border-[#EAE8E2] bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl bg-[#FAF9F6] border border-[#EAE8E2] p-8 sm:p-10 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE8E2]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7B5CF5]">
                    Company details
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#161616] mt-1">
                    {about.productName} is a product of {about.companyLegalName}
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#6B6F76]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE8E2]">
                    <MapPin className="size-3.5 text-[#7B5CF5]" />
                    <span>{about.city}, {about.region}, {about.country}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE8E2]">
                    <Calendar className="size-3.5 text-[#7B5CF5]" />
                    <span>Founded in {about.yearFounded}</span>
                  </span>
                </div>
              </div>

              <p className="type-body text-[#6B6F76] mt-6 leading-relaxed">
                {about.companyBlurb}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Approved Numbers Strip */}
        <section className="py-12 bg-[#FAF9F6] border-b border-[#EAE8E2] text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7B5CF5] mb-4">
              PLATFORM SCALE
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-full bg-white border border-[#EAE8E2] text-sm sm:text-base font-bold text-[#161616] shadow-2xs">
              <span>2,000+ learners</span>
              <span className="text-[#D5D2CA]">·</span>
              <span>100+ courses</span>
              <span className="text-[#D5D2CA]">·</span>
              <span>300+ lessons</span>
              <span className="text-[#D5D2CA]">·</span>
              <span>100+ live classes</span>
            </div>
          </div>
        </section>

        {/* 4. Founders */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <Eyebrow tone="violet">LEADERSHIP</Eyebrow>
            <h2 className="type-h2 text-[#161616] mt-3">Founding Team</h2>
            <p className="type-body text-[#6B6F76] mt-2">
              Building the learning infrastructure for the next generation of academies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {founders.map((member, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-[#EAE8E2] p-8 flex flex-col items-center text-center shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
              >
                {/* Photo or Initials Avatar */}
                {member.photo ? (
                  <div className="size-24 rounded-full overflow-hidden mb-5 border-2 border-[#EAE8E2] relative">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover size-full"
                    />
                  </div>
                ) : (
                  <div className="size-24 rounded-full bg-[#F3F0FF] text-[#7B5CF5] border-2 border-[#EAE8E2] flex items-center justify-center text-2xl font-bold tracking-wider mb-5">
                    {getInitials(member.name)}
                  </div>
                )}

                <h3 className="text-xl font-bold text-[#161616]">{member.name}</h3>
                <p className="text-sm font-semibold text-[#7B5CF5] mt-1">{member.role}</p>

                {member.bio && (
                  <p className="text-sm text-[#6B6F76] mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                )}

                {member.linkedinUrl && (
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6F76] hover:text-[#0A66C2] transition-colors"
                  >
                    <Linkedin className="size-4" />
                    <span>LinkedIn</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Team (hidden if none) */}
        {teamMembers.length > 0 && (
          <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[#EAE8E2]">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Eyebrow tone="emerald">THE TEAM</Eyebrow>
              <h2 className="type-h2 text-[#161616] mt-3">Team & Engineering</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-[#EAE8E2] p-6 flex flex-col items-center text-center shadow-xs"
                >
                  {member.photo ? (
                    <div className="size-20 rounded-full overflow-hidden mb-4 border border-[#EAE8E2] relative">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="object-cover size-full"
                      />
                    </div>
                  ) : (
                    <div className="size-20 rounded-full bg-[#F3F0FF] text-[#7B5CF5] border border-[#EAE8E2] flex items-center justify-center text-xl font-bold mb-4">
                      {getInitials(member.name)}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-[#161616]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[#7B5CF5] mt-0.5">{member.role}</p>

                  {member.bio && (
                    <p className="text-xs text-[#6B6F76] mt-2 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {member.linkedinUrl && (
                    <Link
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs text-[#6B6F76] hover:text-[#0A66C2] transition-colors"
                    >
                      <Linkedin className="size-3.5" />
                      <span>LinkedIn</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. CTABand */}
        <CTABand
          title="See your academy running on LMS Domain."
          subtitle="Book a 20-minute demo. We'll show you how batches, courses, and checkouts work."
          buttonText="Book a demo"
          tone="dark"
        />
      </div>
    </>
  );
}
