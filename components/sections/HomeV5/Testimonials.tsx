import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import type { HomeTestimonial } from "@/lib/api/content";
import { Container, SectionHeading } from "./primitives";
import { TestimonialVideo } from "./TestimonialVideo";
import { TestimonialsMore } from "./TestimonialsMore";

export interface ShowcaseTestimonial extends HomeTestimonial {
  /** Large photo for the featured story (falls back to avatar). */
  photo?: string;
  /** Optional YouTube / Vimeo / MP4 link: shows a play button on the featured story. */
  videoUrl?: string;
  /** Optional results shown under the featured quote. */
  highlights?: { value: string; label: string }[];
}

/**
 * DEMO testimonials for local and staging preview ONLY.
 * They are never rendered on the production site (see HomePage.tsx).
 * Real testimonials come from Admin > Home > Testimonials (/api/home/testimonials)
 * and replace these automatically once published. The first one becomes the featured story.
 */
export const DEMO_TESTIMONIALS: ShowcaseTestimonial[] = [
  {
    id: "demo-1",
    name: "Daniel O.",
    role: "Independent trainer",
    photo: "/images/solutions/solo-educators-1.webp",
    quote:
      "I sell to learners in four countries and keep every dollar, euro and rupee. Moving to my own academy website was the best decision for my business.",
    highlights: [
      { value: "4", label: "countries sold to" },
      { value: "0%", label: "commission paid" },
      { value: "2 weeks", label: "from call to launch" },
    ],
  },
  {
    id: "demo-2",
    name: "Sarah M.",
    role: "Founder, language academy",
    avatar: "/assets/img/home/testimonials/author-1.jpg",
    quote:
      "We used to run classes on one tool, payments on another and tests in spreadsheets. Now the whole academy runs in one place, on our own website.",
  },
  {
    id: "demo-3",
    name: "Rahul K.",
    role: "Director, coaching institute",
    quote:
      "Batches, live classes and mock tests finally work the way we teach. The setup team moved all our courses and learners for us.",
  },
  {
    id: "demo-4",
    name: "Aiko T.",
    role: "Head of training, tech company",
    avatar: "/assets/img/home/participant_mia.jpg",
    quote:
      "Our cohorts, certificates and reports are all in one dashboard. Our trainers spend their time teaching instead of chasing spreadsheets.",
  },
];

function Avatar({ t, size = 44 }: { t: ShowcaseTestimonial; size?: number }) {
  if (t.avatar) {
    return (
      <Image
        src={t.avatar}
        alt=""
        width={size * 2}
        height={size * 2}
        className="shrink-0 rounded-full object-cover object-top"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = t.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-[14px] font-semibold text-white"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

export function Testimonials({
  items,
  isDemo = false,
  showAll = false,
  title = "Educators who run their academy on LMS Domain",
}: {
  items: ShowcaseTestimonial[];
  isDemo?: boolean;
  /** Customers page: every published review, 6 at a time with "Show more". Homepage keeps 6. */
  showAll?: boolean;
  title?: string;
}) {
  if (!items.length) return null;
  const [featured, ...rest] = items;
  const others = rest.slice(0, 6);
  const featuredPhoto = featured.photo || featured.avatar;

  return (
    <section id="testimonials" className="bg-white py-[clamp(80px,10vw,136px)]">
      <Container>
        <SectionHeading eyebrow="Customers" title={title} />
        {isDemo && (
          <p className="mt-4 text-center text-[12px] font-medium text-[#DC2626]">
            Demo testimonials (preview only, hidden on the live site)
          </p>
        )}

        {/* Featured story */}
        <figure className="rv-v4 mt-12 grid overflow-hidden rounded-[28px] bg-[#F4F5F8] lg:mt-16 lg:grid-cols-[0.9fr_1.1fr]">
          {featuredPhoto && (
            <div className="relative min-h-[300px] lg:min-h-[440px]">
              <Image
                src={featuredPhoto}
                alt={featured.name}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="v5-zoom object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              {featured.videoUrl && <TestimonialVideo url={featured.videoUrl} name={featured.name} />}
              <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#0A0A0B] backdrop-blur">
                {featured.videoUrl ? "Watch the story" : "Customer story"}
              </div>
            </div>
          )}
          <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
            <div>
              <Quote className="h-8 w-8 fill-[#6C4BFF] text-[#6C4BFF]" aria-hidden="true" />
              <blockquote className="mt-5 font-urbanist text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.3] tracking-[-0.015em] text-[#0A0A0B] [text-wrap:pretty]">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-[15.5px] font-semibold text-[#0A0A0B]">{featured.name}</p>
                {featured.role && <p className="text-[14px] text-[#71717A]">{featured.role}</p>}
              </figcaption>
            </div>
            {featured.highlights && featured.highlights.length > 0 && (
              <dl className="grid grid-cols-3 gap-4 border-t border-[#E4E4E7] pt-6">
                {featured.highlights.map((h) => (
                  <div key={h.label}>
                    <dd className="font-urbanist text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.03em] text-[#0A0A0B]">
                      {h.value}
                    </dd>
                    <dt className="mt-1 text-[13px] text-[#71717A]">{h.label}</dt>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </figure>

        {/* More customers */}
        {showAll && rest.length > 0 && (
          <TestimonialsMore
            items={rest.map((t) => ({ id: t.id, name: t.name, role: t.role, quote: t.quote, avatar: t.avatar }))}
          />
        )}
        {!showAll && others.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {others.map((t, i) => (
              <figure
                key={t.id}
                style={{ "--rv-delay": `${i * 110}ms` } as React.CSSProperties}
                className="rv-v4 flex flex-col justify-between gap-8 rounded-[28px] bg-[#F4F5F8] p-7">
                <blockquote className="text-[16px] leading-[1.65] text-[#27272A]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar t={t} />
                  <div>
                    <p className="text-[14.5px] font-semibold text-[#0A0A0B]">{t.name}</p>
                    {t.role && <p className="text-[13.5px] text-[#65656E]">{t.role}</p>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
