import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { getBlogPosts } from "@/lib/api/content";
import { Container } from "@/components/sections/HomeV5/primitives";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { BlogCard, BlogCover, fmtDate, metaFor } from "@/components/sections/BlogV5/BlogParts";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Blog & Guides"),
  description:
    "Practical guides for running an online academy: starting out, choosing an LMS, teaching live batches and selling courses on your own website.",
  alternates: { canonical: "/resources/blog" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "blog", guard: "blog" });
}

const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";

export default async function BlogIndexRoute() {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((p) => metaFor(p).category)));

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      {/* Hero */}
      <section className="bg-white pt-[120px] min-[900px]:pt-[150px]">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
                <ol className="inline-flex items-center gap-1.5">
                  <li>
                    <Link href="/" className="hover:text-[#0A0A0B]">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-medium text-[#0A0A0B]">
                    Blog
                  </li>
                </ol>
              </nav>
              <h1 style={{ "--d": "80ms" } as React.CSSProperties} className={cn("v5-rise mt-6 text-[clamp(52px,9vw,128px)]", BIG)}>
                Guides for
                <br />
                <span className="text-[#8E8E98]">academies.</span>
              </h1>
            </div>
            <div style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise max-w-[400px] lg:pb-3">
              <p className="text-[17px] leading-[1.6] text-[#52525B]">
                Practical, plain-English guides on starting, running and growing an online academy.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <span key={c} className="rounded-full border border-[#E4E4E7] px-3 py-1 text-[13px] font-medium text-[#3F3F46]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured */}
      {featured && (
        <section className="bg-white pt-12 lg:pt-16">
          <Container>
            <Link
              href={`/resources/blog/${featured.slug}`}
              className="v5-rise group grid overflow-hidden rounded-[32px] bg-[#F4F5F8] transition-[translate] duration-500 hover:-translate-y-1 lg:grid-cols-[1.2fr_1fr]"
              style={{ "--d": "260ms" } as React.CSSProperties}
            >
              <BlogCover post={featured} big />
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6C4BFF]">Featured guide</p>
                <h2 className="mt-4 font-urbanist text-[clamp(28px,3.2vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#52525B]">{featured.subtitle}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0B] px-5 py-2.5 text-[14px] font-semibold text-white">
                    Read guide <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                  <span className="text-[13.5px] text-[#65656E]">
                    {fmtDate(featured.date)} · {featured.readingTime}
                  </span>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* All guides */}
      {rest.length > 0 && (
        <section className="bg-white pt-[clamp(64px,8vw,104px)]">
          <Container>
            <div className="rv-v4 flex items-end justify-between gap-4">
              <h2 className={cn("text-[clamp(36px,4.6vw,60px)]", BIG)}>More guides</h2>
              <p className="text-[14px] text-[#71717A]">{posts.length} guides</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <div key={p.slug} style={{ "--rv-delay": `${i * 100}ms` } as React.CSSProperties} className="rv-v4">
                  <BlogCard post={p} />
                </div>
              ))}
              {/* Topic suggestion card */}
              <div className="rv-v4 relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-[32px] border-2 border-dashed border-[#D4D4D8] p-8 sm:p-9">
                <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 select-none font-urbanist text-[220px] font-semibold leading-none tracking-[-0.06em] text-[#F4F5F8]">
                  ?
                </span>
                <div>
                  <p className="relative text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6C4BFF]">More on the way</p>
                  <p className="relative mt-5 font-urbanist text-[clamp(28px,2.6vw,36px)] font-semibold leading-[1.05] tracking-[-0.03em]">What should we write about next?</p>
                  <p className="relative mt-3 text-[15px] leading-[1.6] text-[#52525B]">Tell us the questions your academy has, and we&apos;ll turn them into guides.</p>
                  <div className="relative mt-7 flex flex-wrap gap-2">
                    {["Running live batches", "Pricing your courses", "Moving from another LMS"].map((t) => (
                      <span key={t} className="rounded-full bg-[#F4F5F8] px-3 py-1.5 text-[12.5px] font-medium text-[#3F3F46]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href="/contact" className="group relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0A0A0B] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#27272A]">
                  Suggest a topic <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      <div className="pt-[clamp(80px,10vw,136px)]">
        <FinalCta />
      </div>
      <ScrollReveal />
    </div>
  );
}
