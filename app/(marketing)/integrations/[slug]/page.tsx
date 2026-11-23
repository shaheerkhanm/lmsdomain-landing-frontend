import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading, secondaryButtonClass } from "@/components/sections/HomeV5/primitives";
import { DemoButton } from "@/components/sections/HomeV5/DemoButton";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { linkedAnswerHtml } from "@/content/merge";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { INTEGRATIONS, getIntegration } from "@/content/integrations";

/* Integration page: what LMS Domain does with one tool (content/integrations.ts). */

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getIntegration(slug);
  if (!page) return { title: "Integration Not Found | LMS Domain", robots: { index: false, follow: false } };
  return pageMetadata(
    {
      metadataBase: getMetadataBase(),
      title: fullTitle(page.metaTitle),
      description: page.metaDescription,
      alternates: { canonical: `/integrations/${slug}` },
    },
    { seo: `integration-${slug}`, image: "platform" }
  );
}

export default async function IntegrationRoute({ params }: Props) {
  const { slug } = await params;
  const page = getIntegration(slug);
  if (!page) notFound();
  const related = page.related.map(getIntegration).filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript
        data={getBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Integrations", path: "/integrations" },
          { name: page.name, path: `/integrations/${slug}` },
        ])}
      />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-white pb-[clamp(48px,6vw,80px)] pt-[120px] min-[900px]:pt-[168px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.18),transparent)] blur-2xl" />
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
                <Link href="/integrations" className="hover:text-[#0A0A0B]">
                  Integrations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[#0A0A0B]">
                {page.name}
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[900px] font-urbanist text-[clamp(34px,5.2vw,62px)] font-semibold leading-[1.05] tracking-[-0.04em] [text-wrap:balance]"
          >
            {page.title}
          </h1>
          <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-5 max-w-[700px] text-[16.5px] leading-[1.6] text-[#52525B] sm:text-[18px] [text-wrap:pretty]">
            {page.subtitle}
          </p>
          <div style={{ "--d": "270ms" } as React.CSSProperties} className="v5-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton label="Book a demo" className="w-full sm:w-auto" />
            <Link href="/pricing" className={cn(secondaryButtonClass, "w-full sm:w-auto")}>
              See pricing
            </Link>
          </div>
          <dl style={{ "--d": "360ms" } as React.CSSProperties} className="v5-rise mx-auto mt-12 grid max-w-[880px] gap-3 text-left sm:grid-cols-3">
            {page.facts.map((f) => (
              <div key={f.label} className="rounded-[18px] border border-[#ECECF1] px-5 py-4">
                <dt className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-[#71717A]">{f.label}</dt>
                <dd className="mt-1 text-[15.5px] font-semibold text-[#0A0A0B]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2. What it does */}
      <section className="bg-white pb-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading eyebrow="How it works together" title={page.tableTitle} />
          <div className="rv-v4 mx-auto mt-10 max-w-[960px] overflow-hidden rounded-[24px] border border-[#ECECF1] lg:mt-14">
            <table className="w-full border-collapse text-left text-[14.5px] leading-[1.5]">
              <caption className="sr-only">{page.tableTitle}</caption>
              <tbody>
                {page.table.map((row, i) => (
                  <tr key={row.feature} className={cn("align-top", i > 0 && "border-t border-[#ECECF1]")}>
                    <th scope="row" className="w-[34%] bg-[#FAFAFB] px-4 py-4 font-semibold text-[#0A0A0B] sm:w-[28%] sm:px-5">
                      {row.feature}
                    </th>
                    <td className="px-4 py-4 text-[#27272A] sm:px-5">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 3. Steps */}
      <section className="px-2 sm:px-3">
        <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(64px,8vw,104px)] sm:rounded-[40px]">
          <Container>
            <SectionHeading eyebrow="Set up" title={`Get started with ${page.name}`} />
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {page.steps.map((s, i) => (
                <li key={s.title} style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties} className="rv-v4 flex flex-col rounded-[24px] bg-white p-7">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0A0A0B] font-urbanist text-[15px] font-semibold text-white">{i + 1}</span>
                  <h3 className="mt-6 font-urbanist text-[19px] font-semibold leading-[1.25] tracking-[-0.015em]">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-[#52525B]">{s.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </div>
      </section>

      {/* 4. Who uses it */}
      <section className="bg-white pt-[clamp(80px,10vw,136px)]">
        <Container>
          <SectionHeading eyebrow="Who uses it" title={`How academies use ${page.name}`} />
          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
            {page.useCases.map((u, i) => (
              <div key={u.title} style={{ "--rv-delay": `${i * 90}ms` } as React.CSSProperties} className="rv-v4 rounded-[24px] border border-[#ECECF1] p-7">
                <h3 className="font-urbanist text-[19px] font-semibold tracking-[-0.015em]">{u.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[#52525B]">{u.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. FAQ */}
      <div className="pt-[clamp(64px,8vw,104px)]">
        <FAQ
          id={`${slug}-faq`}
          minimal
          eyebrow="FAQs"
          title={`${page.name} and LMS Domain: questions`}
          subtitle="Common questions before connecting."
          items={page.faqs.map((q) => ({ question: q.question, answer: linkedAnswerHtml(q.answer) }))}
        />
      </div>

      {/* 6. Related */}
      {related.length > 0 && (
        <section className="bg-white pt-[clamp(56px,7vw,88px)]">
          <Container className="text-center">
            <p className="rv-v4 text-[14px] font-medium text-[#71717A]">More integrations</p>
            <div className="rv-v4 mt-5 flex flex-wrap justify-center gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/integrations/${r.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-4 py-2 text-[14px] font-semibold text-[#27272A] transition-colors hover:border-[#0A0A0B] hover:text-[#0A0A0B]"
                >
                  {r.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
              <Link
                href="/integrations"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-4 py-2 text-[14px] font-semibold text-[#27272A] transition-colors hover:border-[#0A0A0B] hover:text-[#0A0A0B]"
              >
                All integrations <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
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
