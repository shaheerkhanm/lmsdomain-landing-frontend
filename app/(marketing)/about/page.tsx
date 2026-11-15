import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteAbout, fetchSeo } from "@/lib/api/content";
import { fullTitle, getMetadataBase, applySeo } from "@/lib/site";
import { guardMetadata } from "@/lib/pages";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";
import { Linkedin, MapPin, CalendarDays, Building2 } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { NumbersBento } from "@/components/sections/CustomersV5/NumbersBento";
import { AboutCollage, WhyWeBuilt, PRINCIPLES } from "@/components/sections/AboutV5/AboutParts";
import { FounderCards, FounderLetter } from "@/components/sections/AboutV5/FounderLetter";
import { GlobalOrbit } from "@/components/sections/AboutV5/GlobalOrbit";

const DEFAULT_ABOUT_TITLE = "About LMS Domain: The LMS Built for Academies | LMS Domain";
const DEFAULT_ABOUT_DESCRIPTION =
  "LMS Domain is built by Techiegram to help academies, coaching institutes, training companies and educators run their own branded academy, with 0% commission.";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("about");
  if (hiddenMeta) return hiddenMeta;

  const seo = await fetchSeo("about").catch(() => null);
  const title = (seo?.metatitle && !seo.metatitle.toLowerCase().includes("about us") && seo.metatitle.length >= 40)
    ? fullTitle(seo.metatitle)
    : DEFAULT_ABOUT_TITLE;
  const description = (seo?.metadescription && seo.metadescription.length >= 100)
    ? seo.metadescription
    : DEFAULT_ABOUT_DESCRIPTION;

  const base: Metadata = {
    metadataBase: getMetadataBase(),
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: { title, description, url: "/about", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };

  return applySeo(base, seo, { page: "about" });
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Person({ m, big = false }: { m: { name: string; role: string; photo?: string; bio?: string; linkedinUrl?: string }; big?: boolean }) {
  return (
    <div className="rv-v4 group flex flex-col overflow-hidden rounded-[28px] bg-[#F4F5F8] transition-[translate] duration-500 hover:-translate-y-1">
      <div className={cn("relative overflow-hidden", m.photo ? (big ? "h-[320px]" : "h-[240px]") : big ? "h-[200px]" : "h-[160px]")}>
        {m.photo ? (
          <Image src={m.photo} alt={m.name} fill sizes="(min-width: 640px) 500px, 100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:16px_16px]">
            <span className={cn("grid place-items-center rounded-full bg-[#0A0A0B] font-urbanist font-semibold text-white", big ? "h-28 w-28 text-[36px]" : "h-20 w-20 text-[26px]")}>
              {getInitials(m.name)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 items-start justify-between gap-3 p-6">
        <div>
          <h3 className="font-urbanist text-[21px] font-semibold tracking-[-0.015em]">{m.name}</h3>
          <p className="mt-0.5 text-[14px] text-[#6C4BFF]">{m.role}</p>
          {m.bio && <p className="mt-2.5 text-[14.5px] leading-[1.55] text-[#52525B]">{m.bio}</p>}
        </div>
        {m.linkedinUrl && (
          <a
            href={m.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name} on LinkedIn`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#52525B] transition-colors hover:bg-[#0A66C2] hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default async function AboutRoute() {
  const about = await getSiteAbout();

  const founders = (about.team || [])
    .filter((m) => m.visible !== false && m.group === "founders")
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const teamMembers = (about.team || [])
    .filter((m) => m.visible !== false && m.group === "team")
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
  ];
  const title = about.heroTitle.replace(/\.$/, "");
  const accent = "academies run on";
  const ai = title.toLowerCase().indexOf(accent);

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-white pb-10 pt-[120px] min-[900px]:pt-[168px]">
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
                About us
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[900px] font-urbanist text-[clamp(38px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.04em] [text-wrap:balance]"
          >
            {ai >= 0 ? (
              <>
                {title.slice(0, ai)}
                <span className="bg-gradient-to-r from-[#6C4BFF] via-[#8B5CF6] to-[#3B5BFF] bg-clip-text text-transparent">{title.slice(ai, ai + accent.length)}</span>
                {title.slice(ai + accent.length)}
              </>
            ) : (
              title
            )}
          </h1>
          <p
            style={{ "--d": "180ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[700px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
          >
            {about.mission}
          </p>
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-8 flex flex-wrap items-center justify-center gap-2 text-[13px] text-[#3F3F46]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1.5">
              <Building2 className="h-3.5 w-3.5" /> A product of {about.companyLegalName}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1.5">
              <MapPin className="h-3.5 w-3.5" /> Headquartered in {about.country}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1.5">
              <CalendarDays className="h-3.5 w-3.5" /> Founded in {about.yearFounded}
            </span>
          </div>
        </Container>
        <Container className="v5-shot relative mt-14 sm:mt-16">
          <AboutCollage country={about.country} year={about.yearFounded} />
        </Container>
      </section>

      {/* 2. Why we built it */}
      <section className="bg-white pt-[clamp(72px,9vw,120px)]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div className="rv-v4">
              <p className="inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A]">Our story</p>
              <h2 className="mt-5 font-urbanist text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">
                Academies teach people, not playlists
              </h2>
              <p className="mt-5 text-[16.5px] leading-[1.65] text-[#52525B]">
                Most course platforms are built to sell recorded videos on someone else&apos;s marketplace. But academies teach in batches, run live
                classes, give tests and chase fees, every week.
              </p>
              <p className="mt-4 text-[16.5px] leading-[1.65] text-[#52525B]">
                So we built LMS Domain around how academies really work, and gave every academy its own website, its own brand and every rupee,
                dollar and euro of its sales.
              </p>
            </div>
            <WhyWeBuilt />
          </div>
        </Container>
      </section>

      {/* 3. What we believe (dark) */}
      <section className="px-2 pt-[clamp(80px,10vw,136px)] sm:px-3">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A0A0B] py-[clamp(64px,8vw,104px)] text-white sm:rounded-[40px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000,transparent_75%)]" />
          <Container>
            <SectionHeading tone="dark" eyebrow="What we believe" title="Four ideas behind everything we build" />
            <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-2 lg:mt-16">
              {PRINCIPLES.map((p, i) => (
                <div
                  key={p.n}
                  style={{ "--rv-delay": `${i * 100}ms` } as React.CSSProperties}
                  className="rv-v4 group bg-[#0A0A0B] p-7 transition-colors duration-500 hover:bg-[#121214] sm:p-9"
                >
                  <span className="font-urbanist text-[44px] font-semibold leading-none tracking-[-0.04em] text-white/15 transition-colors duration-500 group-hover:text-[#8B6CFF]">
                    {p.n}
                  </span>
                  <h3 className="mt-6 font-urbanist text-[22px] font-semibold tracking-[-0.015em]">{p.t}</h3>
                  <p className="mt-2 max-w-[440px] text-[15px] leading-[1.6] text-[#A1A1AA]">{p.b}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* 4. Numbers */}
      <section className="bg-white pt-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading eyebrow="So far" title="LMS Domain in numbers" />
          <div className="mt-12 lg:mt-16">
            <NumbersBento />
          </div>
        </Container>
      </section>

      {/* 4b. Built for academies everywhere */}
      <GlobalOrbit />

      {/* 5. Founders and team (from Admin > About) */}
      {founders.length > 0 && (
        <section className="bg-white pt-[clamp(80px,10vw,136px)]">
          <Container>
            <SectionHeading eyebrow="The founders" title="Meet the people building LMS Domain" subtitle="Two founders with one goal: give every academy a platform that is truly its own." />
            <div className="mt-12 lg:mt-16">
              <FounderCards founders={founders} company={about.companyLegalName} />
            </div>
            <div className="mt-16 lg:mt-20">
              <FounderLetter founders={founders} />
            </div>
            {teamMembers.length > 0 && (
              <>
                <p className="rv-v4 mt-16 text-center font-urbanist text-[22px] font-semibold tracking-[-0.015em]">The team</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {teamMembers.map((m) => (
                    <Person key={m.name} m={m} />
                  ))}
                </div>
              </>
            )}
          </Container>
        </section>
      )}

      {/* 6. Company */}
      <section className="bg-white pt-[clamp(80px,10vw,136px)]">
        <Container>
          <div className="rv-v4 grid overflow-hidden rounded-[28px] bg-[#F4F5F8] lg:grid-cols-[1.2fr_1fr]">
            <div className="p-8 sm:p-12">
              <p className="inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A]">The company</p>
              <h2 className="mt-5 font-urbanist text-[clamp(26px,3vw,36px)] font-semibold leading-[1.1] tracking-[-0.025em]">
                {about.productName} is a product of {about.companyLegalName}
              </h2>
              <p className="mt-4 text-[16px] leading-[1.65] text-[#52525B]">{about.companyBlurb}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DemoButton label="Book a demo" className="w-full sm:w-auto" />
                <Link href="/contact" className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
                  Contact us
                </Link>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-[#E4E4E7] lg:grid-cols-1 lg:grid-rows-4">
              {[
                ["Company", about.companyLegalName],
                ["Headquarters", about.country],
                ["Founded", String(about.yearFounded)],
                ["Customers", "Academies around the world"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col justify-center bg-[#F4F5F8] px-8 py-6">
                  <dt className="text-[12.5px] text-[#71717A]">{k}</dt>
                  <dd className="mt-1 font-urbanist text-[18px] font-semibold tracking-[-0.01em]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <div className="pb-[clamp(72px,9vw,120px)]" />
      <ScrollReveal />
    </div>
  );
}
