import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Eye, Info } from "lucide-react";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { getComparePages } from "@/lib/api/content";
import { COMPARE_DEFAULTS, withCompetitor } from "@/content/compare/editable";
import { linkedAnswerHtml } from "@/content/merge";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/*
 * Compare page (v5). Text from Admin > Website > Compare. Draft pages show a banner
 * and are hidden from search engines; published pages are listed on /compare.
 */

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Built at deploy time; pages added later in the admin are rendered on first visit
  const { pages } = await getComparePages();
  return Array.from(new Set([...pages.map((p) => p.slug), ...COMPARE_DEFAULTS.pages.map((p) => p.slug)])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = (await getComparePages()).pages.find((p) => p.slug === slug);
  if (!page) {
    return { title: "Comparison Not Found | LMS Domain", robots: { index: false, follow: false } };
  }
  return pageMetadata(
    {
      metadataBase: getMetadataBase(),
      title: fullTitle(page.metaTitle || `${page.competitorName} alternative`),
      description: page.metaDescription || page.subtitle,
      alternates: { canonical: `/compare/${slug}` },
      // Drafts stay out of search engines until published in the admin
      ...(page.published ? {} : { robots: { index: false, follow: false } }),
    },
    { seo: `compare-${slug}`, guard: "compare", image: "compare" }
  );
}

export default async function ComparePageRoute({ params }: ComparePageProps) {
  const { slug } = await params;
  const content = await getComparePages();
  const page = content.pages.find((p) => p.slug === slug);
  if (!page) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `${page.competitorName} alternative`, path: `/compare/${slug}` },
  ];
  const others = content.pages.filter((p) => p.published && p.slug !== slug).slice(0, 3);

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      {!page.published && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#FCD9A5] bg-[#FFF8EB] px-4 py-2 text-[13px] font-medium text-[#92400E] shadow-[0_10px_30px_-12px_rgba(16,16,24,0.35)]">
            <Eye className="h-4 w-4" /> Draft · not published yet. Switch it on in Admin › Website › Compare.
          </p>
        </div>
      )}

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-white pb-[clamp(56px,7vw,96px)] pt-[120px] min-[900px]:pt-[168px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.18),transparent)] blur-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,11,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,11,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000_20%,transparent_75%)]" />
        </div>
        <Container className="text-center">
          <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
            <ol className="inline-flex flex-wrap items-center justify-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[#0A0A0B]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/compare" className="hover:text-[#0A0A0B]">
                  Compare
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[#0A0A0B]">
                {page.competitorName} alternative
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[900px] font-urbanist text-[clamp(34px,5.2vw,62px)] font-semibold leading-[1.05] tracking-[-0.04em] [text-wrap:balance]"
          >
            {page.title}
          </h1>
          {page.subtitle && (
            <p
              style={{ "--d": "180ms" } as React.CSSProperties}
              className="v5-rise mx-auto mt-5 max-w-[680px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]"
            >
              {page.subtitle}
            </p>
          )}
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton label={content.primaryButton} className="w-full sm:w-auto" />
            <Link href="/pricing" className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
              {content.secondaryButton}
            </Link>
          </div>
        </Container>
      </section>

      {/* 1b. At a glance: our facts and the competitor's, from its own public pages */}
      {page.glance.length > 0 && (
        <section className="bg-white pb-[clamp(80px,10vw,136px)]">
          <Container>
            <SectionHeading eyebrow="At a glance" title={withCompetitor(content.glanceTitle, page.competitorName)} />
            <div className="rv-v4 mx-auto mt-10 max-w-[960px] overflow-hidden rounded-[24px] border border-[#ECECF1] lg:mt-14">
              <table className="w-full border-collapse text-left text-[14.5px] leading-[1.5]">
                <caption className="sr-only">{withCompetitor(content.glanceTitle, page.competitorName)}</caption>
                <thead className="bg-[#F4F5F8] text-[13px] font-semibold uppercase tracking-[0.04em] text-[#52525B]">
                  <tr>
                    <th scope="col" className="hidden w-[24%] px-5 py-3.5 sm:table-cell">&nbsp;</th>
                    <th scope="col" className="w-1/2 px-4 py-3.5 text-[#0A0A0B] sm:w-[38%] sm:px-5">{content.glanceUs}</th>
                    <th scope="col" className="w-1/2 px-4 py-3.5 sm:w-[38%] sm:px-5">{page.competitorName}</th>
                  </tr>
                </thead>
                <tbody>
                  {page.glance.map((row, i) => (
                    <tr key={`${row.label}-${i}`} className="border-t border-[#ECECF1] align-top">
                      <th scope="row" className="hidden px-5 py-4 font-semibold text-[#0A0A0B] sm:table-cell">{row.label}</th>
                      <td className="px-4 py-4 text-[#27272A] sm:px-5">
                        <span className="mb-1 block text-[12.5px] font-semibold text-[#71717A] sm:hidden">{row.label}</span>
                        {row.us}
                      </td>
                      <td className="px-4 py-4 text-[#52525B] sm:px-5">
                        <span className="mb-1 block text-[12.5px] font-semibold text-transparent sm:hidden" aria-hidden="true">{row.label}</span>
                        {row.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {page.competitorNoteSource && (
              <p className="rv-v4 mx-auto mt-4 max-w-[960px] text-[13px] leading-[1.55] text-[#71717A]">
                {page.competitorNote || `${page.competitorName} figures are from its public pages.`}{" "}
                <a href={page.competitorNoteSource} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0A0A0B] underline-offset-4 hover:underline">
                  Source
                </a>
                {page.competitorNoteChecked && <span> · checked {page.competitorNoteChecked}. Prices and plans change, so check before you decide.</span>}
              </p>
            )}
          </Container>
        </section>
      )}

      {/* 2. Who LMS Domain suits */}
      {page.suitsPoints.length > 0 && (
        <section className="bg-white pb-[clamp(80px,10vw,136px)]">
          <Container>
            <SectionHeading eyebrow={content.suitsEyebrow} title={page.suitsHeading} subtitle={page.suitsText || undefined} />
            <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16">
              {page.suitsPoints.map((point, i) => (
                <div
                  key={`${point}-${i}`}
                  style={{ "--rv-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
                  className="rv-v4 flex items-start gap-3 rounded-[20px] bg-[#F4F5F8] px-5 py-4 sm:px-6 sm:py-5"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-[15.5px] leading-[1.5] text-[#27272A]">{point}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. Why LMS Domain */}
      {page.strengths.length > 0 && (
        <section className="px-2 sm:px-3">
          <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
            <Container>
              <SectionHeading eyebrow={content.strengthsEyebrow} title={content.strengthsTitle} subtitle={content.strengthsSubtitle || undefined} />
              <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
                {page.strengths.map((s, i) => (
                  <div
                    key={`${s.title}-${i}`}
                    style={{ "--rv-delay": `${(i % 2) * 100}ms` } as React.CSSProperties}
                    className="rv-v4 flex min-h-[180px] flex-col rounded-[24px] bg-white p-7"
                  >
                    <span className="font-urbanist text-[15px] font-semibold tabular-nums text-[#B4B4BE]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-auto pt-6 font-urbanist text-[21px] font-semibold leading-[1.2] tracking-[-0.015em]">{s.title}</h3>
                    {s.text && <p className="mt-2 text-[15px] leading-[1.6] text-[#52525B]">{s.text}</p>}
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
      )}

      {/* 3b. Fair to say: when the competitor may suit someone better */}
      {page.chooseThem.length > 0 && (
        <section className="bg-white pt-[clamp(80px,10vw,136px)]">
          <Container>
            <SectionHeading eyebrow="Fair to say" title={withCompetitor(content.chooseThemTitle, page.competitorName)} />
            <ul className="mx-auto mt-10 grid max-w-[960px] gap-3 lg:mt-14">
              {page.chooseThem.map((point, i) => (
                <li key={`${point}-${i}`} className="rv-v4 flex items-start gap-3 rounded-[20px] border border-[#ECECF1] px-5 py-4 sm:px-6">
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#71717A]" />
                  <p className="text-[15.5px] leading-[1.5] text-[#27272A]">{point}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* 4. A checked fact about the competitor, with its source */}
      {page.glance.length === 0 && page.competitorNote && page.competitorNoteSource && (
        <section className="bg-white pt-[clamp(48px,6vw,80px)]">
          <Container>
            <div className="rv-v4 mx-auto flex max-w-[820px] items-start gap-3 rounded-[20px] border border-[#ECECF1] px-5 py-4 text-[14.5px] leading-[1.55] text-[#52525B]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#71717A]" />
              <p>
                {page.competitorNote}{" "}
                <a href={page.competitorNoteSource} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0A0A0B] underline-offset-4 hover:underline">
                  Source
                </a>
                {page.competitorNoteChecked && <span className="text-[#9A9AA6]"> · checked {page.competitorNoteChecked}</span>}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* 5. FAQ */}
      {page.faqs.length > 0 && (
        <div className="pt-[clamp(48px,6vw,80px)]">
          <FAQ
            id={`${slug}-faq`}
            minimal
            eyebrow="FAQs"
            title={content.faqTitle}
            subtitle={withCompetitor(content.faqSubtitle, page.competitorName)}
            items={page.faqs.map((q) => ({ question: q.question, answer: linkedAnswerHtml(q.answer) }))}
          />
        </div>
      )}

      {/* 6. Other comparisons (published only) */}
      {page.published && others.length > 0 && (
        <section className="bg-white pt-[clamp(56px,7vw,88px)]">
          <Container className="text-center">
            <p className="rv-v4 text-[14px] font-medium text-[#71717A]">More comparisons</p>
            <div className="rv-v4 mt-5 flex flex-wrap justify-center gap-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/compare/${o.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-4 py-2 text-[14px] font-semibold text-[#27272A] transition-colors hover:border-[#0A0A0B] hover:text-[#0A0A0B]"
                >
                  {o.competitorName} alternative <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>
      <ScrollReveal />
    </div>
  );
}
