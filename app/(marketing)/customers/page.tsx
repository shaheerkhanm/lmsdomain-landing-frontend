import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Moments } from "@/components/sections/CustomersV5/Moments";
import { WhyChoose } from "@/components/sections/CustomersV5/WhyChoose";
import { NumbersBento } from "@/components/sections/CustomersV5/NumbersBento";
import { customersPageData } from "@/content/customers";
import { getHomeClients, getHomeTestimonials } from "@/lib/api/content";
import { getMetadataBase, isProductionSite } from "@/lib/site";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { Testimonials, DEMO_TESTIMONIALS } from "@/components/sections/HomeV5/Testimonials";
import { AcademyShowcase, type ShowcaseAcademy } from "@/components/sections/CustomersV5/AcademyShowcase";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Customers: Academies Using LMS Domain | LMS Domain",
  description:
    "See the coaching institutes, language schools, training companies and independent educators who teach, sell and run live classes on LMS Domain.",
  alternates: { canonical: "/customers" },
};


// Each type of academy: outcomes, a sample person and stat (sample data), demo from its Solutions page
const ACADEMIES: ShowcaseAcademy[] = [
  {
    key: "coaching",
    name: "Coaching institutes",
    href: "/solutions/coaching-institutes",
    body: "Run morning, evening and weekend batches with live classes, mock tests and fees in one place.",
    points: ["Batch timetables and drip release", "Attendance logged from Zoom", "Mock tests with instant ranks", "Online fees and reminders"],
    stat: { v: "23/24", l: "joined today" },
    person: { name: "Daniel Reyes", role: "Maths teacher, coaching institute", photo: "/assets/img/home/participant_alex.jpg" },
  },
  {
    key: "language",
    name: "Language academies",
    href: "/solutions/language-test-prep-academies",
    body: "Prepare learners for any language or exam with practice tests and private feedback on their writing.",
    points: ["Timed practice tests", "Essay reviews with private feedback", "Scores in every learner's profile", "Fees in many currencies"],
    stat: { v: "7/9", l: "latest essay" },
    person: { name: "Mia Collins", role: "English teacher, language academy", photo: "/assets/img/home/participant_mia.jpg" },
  },
  {
    key: "training",
    name: "Training companies",
    href: "/solutions/training-companies",
    body: "Deliver private programmes for each client, certify the people who finish and report on progress.",
    points: ["A private batch per client", "Project reviews by trainers", "Branded certificates", "Completion reports in a click"],
    stat: { v: "28", l: "certified" },
    person: { name: "Sarah Lee", role: "Head of training delivery", photo: "/assets/img/home/testimonials/author-5.jpg" },
  },
  {
    key: "solo",
    name: "Solo educators",
    href: "/solutions/solo-educators",
    body: "Sell courses, workshops, 1:1 sessions and ebooks on your own website, and keep every sale.",
    points: ["Your own branded academy", "Paid 1:1 bookings", "Live workshops on Zoom", "0% commission on sales"],
    stat: { v: "$1,486", l: "this week" },
    person: { name: "Priya Sharma", role: "Independent data tutor", photo: "/assets/img/home/testimonials/author-1.jpg" },
  },
];

export default async function CustomersRoute() {
  const [clientsData, testimonials] = await Promise.all([
    getHomeClients().catch(() => null),
    getHomeTestimonials().catch(() => []),
  ]);
  const logos = (clientsData?.logos || []).filter((l) => l?.logo && l.name && !/^client\s*-?\s*\d+/i.test(l.name));
  // Real testimonials from admin win. Demo ones only outside production, never on the live site.
  const useDemo = testimonials.length === 0 && !isProductionSite();
  const stories = useDemo ? DEMO_TESTIMONIALS : testimonials;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Customers", path: "/customers" },
  ];

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-white pt-[120px] min-[900px]:pt-[168px]">
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
                Customers
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[900px] font-urbanist text-[clamp(36px,5.6vw,68px)] font-semibold leading-[1.03] tracking-[-0.04em] [text-wrap:balance]"
          >
            Academies that{" "}
            <span className="bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent">teach and grow</span> with LMS
            Domain
          </h1>
          <p
            style={{ "--d": "180ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[660px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
          >
            {customersPageData.subtitle}
          </p>
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton label="Book a demo" className="w-full sm:w-auto" />
            <Link href="/pricing" className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
              See pricing
            </Link>
          </div>
        </Container>

        {/* Everyday moments on LMS Domain */}
        <div style={{ "--d": "420ms" } as React.CSSProperties} className="v5-rise mt-14 sm:mt-16">
          <Moments />
        </div>

        {/* Real numbers, each with a graphic */}
        <Container className="relative mt-12 sm:mt-14">
          <NumbersBento />
        </Container>

        {/* Real customer logos (from admin) */}
        {logos.length > 0 && (
          <Container className="py-14 text-center sm:py-16">
            <p className="rv-v4 text-[13px] font-medium text-[#71717A]">Academies teaching with LMS Domain</p>
            <div className="rv-v4 mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {logos.map((l) => {
                const card = (
                  <span className="group flex h-[96px] items-center justify-center rounded-[20px] bg-[#F4F5F8] px-6 transition-colors duration-300 hover:bg-[#EFF0F4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={l.logo}
                      alt={l.name}
                      className="max-h-10 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </span>
                );
                return l.url ? (
                  <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer">
                    {card}
                  </a>
                ) : (
                  <span key={l.name}>{card}</span>
                );
              })}
            </div>
          </Container>
        )}
      </section>

      {/* 2. Every kind of academy */}
      <section className={cn("px-2 sm:px-3", logos.length ? "" : "pt-[clamp(72px,9vw,120px)]")}>
        <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
          <Container>
            <SectionHeading
              eyebrow="Who uses it"
              title="Built for every kind of academy"
              subtitle="Different ways of teaching, one platform. Pick a type of academy and watch it run."
            />
            <div className="rv-v4 mt-12 lg:mt-16">
              <AcademyShowcase academies={ACADEMIES} />
            </div>
          </Container>
        </div>
      </section>

      {/* 2b. Why academies choose LMS Domain */}
      <WhyChoose />

      {/* 3. Stories (admin testimonials; demo only outside production) */}
      <Testimonials items={stories} isDemo={useDemo} showAll title="What academies say about LMS Domain" />

      {/* 4. Talk to us about customer stories */}
      <section className={cn("bg-white", stories.length ? "" : "pt-[clamp(80px,10vw,136px)]")}>
        <Container>
          <div className="rv-v4 relative isolate overflow-hidden rounded-[28px] bg-[#0A0A0B] px-6 py-12 text-white sm:px-12 sm:py-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_80%_at_85%_50%,#000,transparent_70%)]" />
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[13px] font-medium text-[#E4E4E7]">
                  <MessageCircle className="h-3.5 w-3.5" /> Customer stories
                </p>
                <h2 className="mt-5 font-urbanist text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">
                  Want to hear how an academy like yours runs on LMS Domain?
                </h2>
                <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.6] text-[#A1A1AA]">
                  Detailed case studies are on the way. In the meantime, book a call and our team will walk you through real setups for
                  academies like yours.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <DemoButton label="Book a demo" variant="light" className="w-full sm:w-auto" />
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-[14.5px] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="pb-[clamp(72px,9vw,120px)]" />

      <ScrollReveal />
    </div>
  );
}
