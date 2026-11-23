import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading } from "@/components/sections/HomeV5/primitives";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { BrandMark, isBrand } from "@/components/brand/PartnerMarks";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { getIntegrationPages } from "@/lib/api/content";
import { directoryGroups, PLAN_LABEL } from "@/content/integrations-editable";
import type { DirectoryItem } from "@/content/integrations";
import { cn } from "@/lib/utils";

/* /integrations: featured integrations with their own page, then the full directory
   grouped by category (Admin > Website > Integrations). */

export async function generateMetadata(): Promise<Metadata> {
  const c = await getIntegrationPages();
  return pageMetadata(
    { metadataBase: getMetadataBase(), title: fullTitle(c.hubMetaTitle), description: c.hubMetaDescription, alternates: { canonical: "/integrations" } },
    { seo: "integrations", image: "platform" }
  );
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Logo({ name, logo, size = 40 }: { name: string; logo: string; size?: number }) {
  if (isBrand(logo)) return <BrandMark name={logo} size={size} />;
  const initials = name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-[22%] bg-[#F1F1F5] font-urbanist font-semibold text-[#3F3F46] ring-1 ring-inset ring-[#E4E4E7]"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials}
    </span>
  );
}

function DirectoryCard({ item }: { item: DirectoryItem }) {
  const body = (
    <>
      <div className="flex items-start gap-3.5">
        <Logo name={item.name} logo={item.logo} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 font-urbanist text-[17px] font-semibold leading-tight tracking-[-0.01em] text-[#0A0A0B]">
            {item.name}
            {item.page && <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#71717A] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
          </p>
          <p className="mt-1.5 text-[14px] leading-[1.55] text-[#52525B]">{item.text}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5 text-[12px] font-medium">
        <span className="rounded-full bg-[#F4F4F7] px-2.5 py-1 text-[#52525B]">{item.connect === "own" ? "Your own account" : "Built in"}</span>
        {item.plan && PLAN_LABEL[item.plan] && <span className="rounded-full bg-[#F1EDFF] px-2.5 py-1 text-[#5B3FE6]">{PLAN_LABEL[item.plan]}</span>}
      </div>
    </>
  );
  const cls = "rv-v4 flex h-full flex-col justify-between rounded-[20px] border border-[#ECECF1] bg-white p-5";
  return item.page ? (
    <Link href={`/integrations/${item.page}`} className={cn(cls, "group transition-colors hover:border-[#0A0A0B]")}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default async function IntegrationsIndexRoute() {
  const c = await getIntegrationPages();
  const groups = directoryGroups(c.directory);
  const logoFor = (slug: string) => c.directory.find((x) => x.page === slug)?.logo || "";
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript
        data={getBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Integrations", path: "/integrations" },
        ])}
      />
      <section className="relative isolate overflow-hidden bg-white pb-[clamp(40px,5vw,64px)] pt-[120px] min-[900px]:pt-[168px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.18),transparent)] blur-2xl" />
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
                Integrations
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[860px] font-urbanist text-[clamp(36px,5.6vw,68px)] font-semibold leading-[1.03] tracking-[-0.04em] [text-wrap:balance]"
          >
            {c.hubTitle}
          </h1>
          <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-5 max-w-[640px] text-[17px] leading-[1.6] text-[#52525B]">
            {c.hubSubtitle}
          </p>
          {/* Jump to a category */}
          <nav aria-label="Integration categories" style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mx-auto mt-9 flex max-w-[880px] flex-wrap justify-center gap-2">
            {groups.map((g) => (
              <a
                key={g.category}
                href={`#${anchor(g.category)}`}
                className="rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-[#3F3F46] transition-colors hover:border-[#0A0A0B] hover:text-[#0A0A0B]"
              >
                {g.category} <span className="tabular-nums text-[#A1A1AA]">{g.items.length}</span>
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Featured: integrations with their own page */}
      {c.pages.length > 0 && (
        <section className="bg-white pb-[clamp(56px,7vw,96px)]">
          <Container>
            <SectionHeading eyebrow={c.featuredEyebrow} title={c.featuredTitle} />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
              {c.pages.map((i, n) => (
                <Link
                  key={i.slug}
                  href={`/integrations/${i.slug}`}
                  style={{ "--rv-delay": `${(n % 3) * 90}ms` } as React.CSSProperties}
                  className="rv-v4 group flex min-h-[190px] flex-col rounded-[24px] border border-[#ECECF1] bg-white p-7 transition-colors duration-500 hover:bg-[#0A0A0B]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <Logo name={i.name} logo={logoFor(i.slug)} size={36} />
                      <span className="font-urbanist text-[21px] font-semibold tracking-[-0.015em] transition-colors group-hover:text-white">{i.name}</span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#E4E4E7] text-[#0A0A0B] transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-auto pt-8 text-[14.5px] leading-[1.6] text-[#52525B] transition-colors group-hover:text-[#A1A1AA]">{i.summary}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Directory */}
      <section className="px-2 sm:px-3">
        <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(56px,7vw,96px)] sm:rounded-[40px]">
          <Container>
            <SectionHeading eyebrow={c.directoryEyebrow} title={c.directoryTitle} subtitle={c.directorySubtitle} />
            <p className="mt-4 text-center text-[13.5px] text-[#71717A]">
              <span className="tabular-nums">{total}</span> integrations
            </p>
            <div className="mt-12 space-y-14 lg:mt-16">
              {groups.map((g) => (
                <div key={g.category} id={anchor(g.category)} className="scroll-mt-28">
                  <h2 className="font-urbanist text-[22px] font-semibold tracking-[-0.02em]">{g.category}</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((item) => (
                      <DirectoryCard key={`${g.category}-${item.name}`} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>

      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>
      <ScrollReveal />
    </div>
  );
}
