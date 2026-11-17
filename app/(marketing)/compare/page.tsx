import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container } from "@/components/sections/HomeV5/primitives";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { getComparePages } from "@/lib/api/content";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

/* /compare: the published comparisons (Admin > Website > Compare). 404 while none is published. */

export async function generateMetadata(): Promise<Metadata> {
  const { listTitle, listSubtitle } = await getComparePages();
  return pageMetadata(
    { metadataBase: getMetadataBase(), title: fullTitle(listTitle), description: listSubtitle, alternates: { canonical: "/compare" } },
    { seo: "compare", guard: "compare", image: "compare" }
  );
}

export default async function CompareIndexRoute() {
  const content = await getComparePages();
  const pages = content.pages.filter((p) => p.published);
  if (!pages.length) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
  ];

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />
      <section className="relative isolate overflow-hidden bg-white pb-[clamp(56px,7vw,96px)] pt-[120px] min-[900px]:pt-[168px]">
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
                Compare
              </li>
            </ol>
          </nav>
          <p className="v5-rise mt-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#6C4BFF]">{content.listEyebrow}</p>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-4 max-w-[860px] font-urbanist text-[clamp(36px,5.6vw,68px)] font-semibold leading-[1.03] tracking-[-0.04em] [text-wrap:balance]"
          >
            {content.listTitle}
          </h1>
          <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.6] text-[#52525B]">
            {content.listSubtitle}
          </p>
        </Container>
        <Container className="mt-14">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((p, i) => (
              <Link
                key={p.slug}
                href={`/compare/${p.slug}`}
                style={{ "--rv-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
                className="rv-v4 group relative flex min-h-[220px] flex-col rounded-[24px] border border-[#ECECF1] bg-white p-7 transition-colors duration-500 hover:bg-[#0A0A0B]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[13px] font-semibold text-[#6C4BFF] transition-colors group-hover:text-[#A99BFF]">LMS Domain vs {p.competitorName}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#E4E4E7] text-[#0A0A0B] transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h2 className="mt-auto pt-8 font-urbanist text-[21px] font-semibold leading-[1.25] tracking-[-0.015em] transition-colors group-hover:text-white">
                  {p.competitorName} alternative
                </h2>
                <p className="mt-2 line-clamp-2 text-[14.5px] leading-[1.6] text-[#52525B] transition-colors group-hover:text-[#A1A1AA]">{p.subtitle}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <FinalCta />
      <ScrollReveal />
    </div>
  );
}
