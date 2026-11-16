import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarCheck, Mail, MapPin, MessageCircle, Phone, Send, Video } from "lucide-react";
import DemoForm from "@/components/marketing/DemoForm";
import MarketingFaq from "@/components/marketing/MarketingFaq";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { ContentSource } from "@/components/content/ContentSource";
import { Container, SectionHeading } from "@/components/sections/HomeV5/primitives";
import type { ContactPageModel, ContactChannel } from "@/types/content";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/PartnerMarks";

const ICON: Record<ContactChannel["type"], React.ElementType> = {
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  address: MapPin,
};
const HINT: Record<ContactChannel["type"], string> = {
  email: "Best for detailed questions",
  phone: "Talk to our team",
  whatsapp: "Quick questions by chat",
  address: "Working with academies worldwide",
};

function Channel({ c, i }: { c: ContactChannel; i: number }) {
  const Icon = ICON[c.type] || Mail;
  const inner = (
    <>
      {c.type === "whatsapp" ? (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white">
          <BrandMark name="WhatsApp" size={26} />
        </span>
      ) : (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-white">
          <Icon className="h-[18px] w-[18px]" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-medium text-[#71717A]">{c.title}</p>
        <p className="truncate font-urbanist text-[18px] font-semibold tracking-[-0.01em] text-[#0A0A0B]">{c.value}</p>
        <p className="text-[12.5px] text-[#9A9AA6]">{c.description || HINT[c.type]}</p>
      </div>
      {c.href && (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#E4E4E7] bg-white text-[#0A0A0B] transition-all duration-500 group-hover:rotate-45 group-hover:border-[#0A0A0B] group-hover:bg-[#0A0A0B] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </>
  );
  const cls = "rv-v4 group flex items-center gap-4 rounded-[22px] bg-[#F4F5F8] p-4 transition-[translate,background-color] duration-500 hover:-translate-y-0.5 hover:bg-[#EFF0F4] sm:p-5";
  const style = { "--rv-delay": `${i * 80}ms` } as React.CSSProperties;
  return c.href ? (
    <a href={c.href} target={c.type === "whatsapp" ? "_blank" : undefined} rel={c.type === "whatsapp" ? "noopener noreferrer" : undefined} className={cls} style={style}>
      {inner}
    </a>
  ) : (
    <div className={cls} style={style}>
      {inner}
    </div>
  );
}

const NEXT = [
  { i: Send, t: "You send a message", b: "Tell us about your academy and what you teach." },
  { i: CalendarCheck, t: "We reply and book a time", b: "Our team gets back to you to find a time that suits you." },
  { i: Video, t: "A 20-minute demo", b: "We show you LMS Domain with your own courses and answer every question." },
];

const LINKS = [
  { t: "See pricing", b: "Plans, features and a free trial", href: "/pricing" },
  { t: "Explore the platform", b: "Everything LMS Domain can do", href: "/platform" },
  { t: "Customers", b: "Academies teaching on LMS Domain", href: "/customers" },
  { t: "Pricing FAQs", b: "Answers about plans and billing", href: "/pricing#faqSection" },
];

export function ContactV5({ data }: { data: ContactPageModel }) {
  // Never show the exact street address or city: country only.
  const channels = data.channels.map((c) => (c.type === "address" ? { ...c, title: "Headquarters", value: "India", href: undefined } : c));
  const title = data.hero.title.replace(/\.$/, "");

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      {/* 1. Hero */}
      <ContentSource id="contact-hero" source={data.sources?.hero || "code"}>
        <section className="relative isolate overflow-hidden bg-white pb-4 pt-[120px] min-[900px]:pt-[168px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.20),transparent)] blur-2xl" />
            <div className="absolute left-[8%] top-[60px] h-[360px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(143,168,255,0.22),transparent)] blur-2xl" />
            <div className="absolute right-[6%] top-[120px] h-[340px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(196,181,253,0.28),transparent)] blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,11,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,11,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000_20%,transparent_75%)]" />
          </div>
          <Container className="text-center">
            <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
              <ol className="inline-flex items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-[#0A0A0B]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-[#0A0A0B]">
                  Contact
                </li>
              </ol>
            </nav>
            <h1
              style={{ "--d": "90ms" } as React.CSSProperties}
              className="v5-rise mx-auto mt-5 max-w-[860px] font-urbanist text-[clamp(38px,6vw,70px)] font-semibold leading-[1.02] tracking-[-0.04em] [text-wrap:balance]"
            >
              {title}
            </h1>
            <p
              style={{ "--d": "180ms" } as React.CSSProperties}
              className="v5-rise mx-auto mt-5 max-w-[620px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
            >
              {data.hero.subtitle}
            </p>
            {/* real people */}
            <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-8 inline-flex items-center gap-3 rounded-full border border-[#ECECF1] bg-white py-1.5 pl-1.5 pr-4 shadow-[0_8px_24px_-14px_rgba(16,16,24,0.25)]">
              <div className="flex">
                {["/assets/img/home/participant_mia.jpg", "/assets/img/home/participant_alex.jpg", "/assets/img/home/testimonials/author-1.jpg"].map((f, i) => (
                  <Image key={f} src={f} alt="" width={64} height={64} className={cn("h-8 w-8 rounded-full object-cover object-top ring-2 ring-white", i > 0 && "-ml-2")} />
                ))}
              </div>
              <span className="text-[13.5px] font-medium text-[#3F3F46]">Real people, not a bot, read every message</span>
            </div>
          </Container>
        </section>
      </ContentSource>

      {/* 2. Form + channels */}
      <section className="bg-white pt-[clamp(48px,6vw,72px)]">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.35fr]">
            <ContentSource id="contact-channels" source={data.sources?.channels || "code"}>
              <div className="order-2 flex h-full flex-col gap-4 lg:order-none">
                <div className="rv-v4 rounded-[24px] bg-[#0A0A0B] p-6 text-white sm:p-7">
                  <p className="font-urbanist text-[24px] font-semibold tracking-[-0.02em]">{data.channelsHeading?.title || "Get in touch"}</p>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-[#A1A1AA]">
                    {data.channelsHeading?.subtitle || "Questions about LMS Domain or ready to get started? Pick the way that suits you."}
                  </p>
                </div>
                <div className="grid gap-3">
                  {channels.map((c, i) => (
                    <Channel key={c.type + c.value} c={c} i={i} />
                  ))}
                </div>
              </div>
            </ContentSource>

            <ContentSource id="contact-form" source={data.sources?.form || "code"}>
              <div style={{ "--rv-delay": "120ms" } as React.CSSProperties} className="rv-v4 order-1 h-full rounded-[28px] lg:order-none border border-[#ECECF1] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04),0_40px_80px_-40px_rgba(16,16,24,0.3)] sm:p-9">
                <Suspense fallback={<div className="h-[480px] w-full animate-pulse rounded-2xl bg-[#F4F5F8]" />}>
                  <DemoForm
                    submitLabel={data.form.submitLabel}
                    successTitle={data.form.successTitle}
                    successMessage={data.form.successMessage}
                    privacyNote={data.form.privacyNote}
                    topics={data.topics}
                    variant="page"
                  />
                </Suspense>
              </div>
            </ContentSource>
          </div>
        </Container>
      </section>

      {/* 3. What happens next */}
      <section className="px-2 pt-[clamp(80px,10vw,136px)] sm:px-3">
        <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
          <Container>
            <SectionHeading eyebrow="What happens next" title="From hello to your first demo" />
            <ol className="relative mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
              <span aria-hidden="true" className="rv-v4 v5-draw absolute left-[16%] right-[16%] top-[28px] hidden border-t-2 border-dashed border-[#C9C9D1] lg:block" />
              {NEXT.map(({ i: Icon, t, b }, idx) => (
                <li key={t} style={{ "--rv-delay": `${idx * 140}ms` } as React.CSSProperties} className="rv-v4 relative text-center">
                  <span className="v5-badge relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#0A0A0B] text-white ring-8 ring-[#F4F5F8]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-2 text-[12px] font-semibold text-[#9A9AA6]">Step {idx + 1}</p>
                  <p className="mt-2 font-urbanist text-[20px] font-semibold tracking-[-0.01em]">{t}</p>
                  <p className="mx-auto mt-1.5 max-w-[300px] text-[14.5px] leading-[1.55] text-[#6B6B76]">{b}</p>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      </section>

      {/* 4. Looking for something else? */}
      <section className="bg-white py-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading eyebrow="Quick links" title="Looking for something else?" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties}
                className="rv-v4 group flex min-h-[170px] flex-col justify-between rounded-[24px] border border-[#ECECF1] p-6 transition-colors duration-500 hover:bg-[#0A0A0B]"
              >
                <span className="grid h-9 w-9 place-items-center self-end rounded-full border border-[#E4E4E7] text-[#0A0A0B] transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-urbanist text-[20px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-white">{l.t}</p>
                  <p className="mt-1 min-h-[42px] text-[14px] text-[#71717A] transition-colors group-hover:text-[#A1A1AA]">{l.b}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {data.faq && data.faq.items && data.faq.items.length > 0 && <MarketingFaq title={data.faq.title} subtitle={data.faq.subtitle} items={data.faq.items} />}

      <ScrollReveal />
    </div>
  );
}
