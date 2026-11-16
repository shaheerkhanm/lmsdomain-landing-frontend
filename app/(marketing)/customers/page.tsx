import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Moments } from "@/components/sections/CustomersV5/Moments";
import { WhyChoose } from "@/components/sections/CustomersV5/WhyChoose";
import { NumbersBento } from "@/components/sections/CustomersV5/NumbersBento";
import { CUSTOMERS_DEFAULTS } from "@/content/customers";
import { getHomeClients, getHomeTestimonials, getCustomersPage } from "@/lib/api/content";
import { getMetadataBase, isProductionSite } from "@/lib/site";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { Testimonials, DEMO_TESTIMONIALS } from "@/components/sections/HomeV5/Testimonials";
import { AcademyShowcase, type ShowcaseAcademy } from "@/components/sections/CustomersV5/AcademyShowcase";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Customers: Academies Using LMS Domain | LMS Domain",
  description:
    "See the coaching institutes, language schools, training companies and independent educators who teach, sell and run live classes on LMS Domain.",
  alternates: { canonical: "/customers" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "customers", guard: "customers" });
}


// The four academy types match the four demos (and photos), in this order
const ACADEMY_KEYS: ShowcaseAcademy["key"][] = ["coaching", "language", "training", "solo"];
const ACADEMY_PHOTOS = [
  "/assets/img/home/participant_alex.jpg",
  "/assets/img/home/participant_mia.jpg",
  "/assets/img/home/testimonials/author-5.jpg",
  "/assets/img/home/testimonials/author-1.jpg",
];
const DEFAULT_LINKS = CUSTOMERS_DEFAULTS.academies.items.map((a) => a.link);

export default async function CustomersRoute() {
  const [clientsData, testimonials, page] = await Promise.all([
    getHomeClients().catch(() => null),
    getHomeTestimonials().catch(() => []),
    getCustomersPage(),
  ]);
  const { hero, numbers, academies, why, stories: headings, cta } = page;
  const showcase: ShowcaseAcademy[] = academies.items.slice(0, ACADEMY_KEYS.length).map((a, i) => ({
    key: ACADEMY_KEYS[i],
    name: a.name,
    href: a.link || DEFAULT_LINKS[i],
    body: a.text,
    points: a.points,
    stat: { v: a.statValue, l: a.statLabel },
    person: { name: a.personName, role: a.personRole, photo: ACADEMY_PHOTOS[i] },
  }));
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
            {hero.titleBefore}{" "}
            <span className="bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent">{hero.titleHighlight}</span>{" "}
            {hero.titleAfter}
          </h1>
          <p
            style={{ "--d": "180ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[660px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
          >
            {hero.subtitle}
          </p>
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton label={hero.primaryButton} className="w-full sm:w-auto" />
            <Link href="/pricing" className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
              {hero.secondaryButton}
            </Link>
          </div>
        </Container>

        {/* Everyday moments on LMS Domain */}
        <div style={{ "--d": "420ms" } as React.CSSProperties} className="v5-rise mt-14 sm:mt-16">
          <Moments />
        </div>

        {/* Real numbers, each with a graphic */}
        <Container className="relative mt-12 sm:mt-14">
          <NumbersBento items={numbers.items} />
        </Container>

        {/* Real customer logos (from admin) */}
        {logos.length > 0 && (
          <Container className="py-14 text-center sm:py-16">
            <p className="rv-v4 text-[13px] font-medium text-[#71717A]">{headings.logosHeading}</p>
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
            <SectionHeading eyebrow={academies.eyebrow} title={academies.title} subtitle={academies.subtitle} />
            <div className="rv-v4 mt-12 lg:mt-16">
              <AcademyShowcase academies={showcase} />
            </div>
          </Container>
        </div>
      </section>

      {/* 2b. Why academies choose LMS Domain */}
      <WhyChoose eyebrow={why.eyebrow} title={why.title} items={why.items} />

      {/* 3. Stories (admin testimonials; demo only outside production) */}
      <Testimonials items={stories} isDemo={useDemo} showAll title={headings.testimonialsTitle} />

      {/* 4. Talk to us about customer stories */}
      <section className={cn("bg-white", stories.length ? "" : "pt-[clamp(80px,10vw,136px)]")}>
        <Container>
          <div className="rv-v4 relative isolate overflow-hidden rounded-[28px] bg-[#0A0A0B] px-6 py-12 text-white sm:px-12 sm:py-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_80%_at_85%_50%,#000,transparent_70%)]" />
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[13px] font-medium text-[#E4E4E7]">
                  <MessageCircle className="h-3.5 w-3.5" /> {cta.eyebrow}
                </p>
                <h2 className="mt-5 font-urbanist text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">
                  {cta.title}
                </h2>
                <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.6] text-[#A1A1AA]">
                  {cta.text}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <DemoButton label={cta.primaryButton} variant="light" className="w-full sm:w-auto" />
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-[14.5px] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                >
                  {cta.secondaryButton}
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
