import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "./primitives";

const AUDIENCES = [
  {
    title: "Coaching institutes",
    body: "Morning and evening batches, timed mock tests and fee receipts.",
    href: "/solutions/coaching-institutes",
    image: "/images/solutions/coaching-institutes-1.webp",
  },
  {
    title: "Language & test prep",
    body: "Speaking practice, band-score tracking and live doubt sessions.",
    href: "/solutions/language-test-prep-academies",
    image: "/images/solutions/language-test-prep-1.webp",
  },
  {
    title: "Solo educators",
    body: "Sell your expertise on your own site, without the tech headaches.",
    href: "/solutions/solo-educators",
    image: "/images/solutions/solo-educators-1.webp",
  },
  {
    title: "Training companies",
    body: "Cohort programs, certificates and invoicing for corporate clients.",
    href: "/solutions/training-companies",
    image: "/images/solutions/training-companies-1.webp",
  },
];

export function AudienceCards() {
  return (
    <section id="solutions" className="bg-white py-[clamp(72px,9vw,120px)]">
      <Container>
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for every kind of educator"
          subtitle="Any subject, any format: live batches, self-paced courses or a mix of both."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {AUDIENCES.map((a, i) => (
            <Link
              key={a.title}
              href={a.href}
              style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties}
              className="rv-v4 group flex flex-col overflow-hidden rounded-[24px] bg-[#F4F5F8] p-2 transition-colors hover:bg-[#EFF0F4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4BFF]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 items-start justify-between gap-3 px-3 pb-4 pt-4 sm:px-4">
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#0A0A0B]">{a.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[#52525B]">{a.body}</p>
                </div>
                <ArrowUpRight
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#A1A1AA] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0A0A0B]"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
