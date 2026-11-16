import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Mail } from "lucide-react";
import type { LegalPageData } from "@/types/content";
import { sanitizeHtml } from "@/lib/sanitize";
import { Container } from "@/components/sections/HomeV5/primitives";
import { LegalDocNav, LegalToc, type TocHeading } from "./LegalToc";

/** Adds ids to <h2> headings and returns them for the contents list. */
function processHtmlAndExtractHeadings(html: string): { processedHtml: string; headings: TocHeading[] } {
  const headings: TocHeading[] = [];
  let counter = 0;
  const processedHtml = html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, content) => {
    const text = content
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&apos;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (!text) return match;
    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    const id =
      idMatch?.[1] ||
      text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-") ||
      `section-${++counter}`;
    headings.push({ id, text });
    return idMatch ? match : `<h2 id="${id}"${attrs}>${content}</h2>`;
  });
  return { processedHtml, headings };
}

function formatDate(raw?: string) {
  if (!raw) return undefined;
  const dmy = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const d = dmy ? new Date(Date.UTC(+dmy[3], +dmy[2] - 1, +dmy[1])) : new Date(raw.includes("T") ? raw : `${raw}T00:00:00Z`);
  if (isNaN(d.getTime())) return raw;
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(d);
}

const BIG = "font-urbanist font-semibold tracking-[-0.05em] leading-[0.95]";

export function LegalView({ page }: { page: LegalPageData }) {
  const updated = formatDate(page.lastUpdated);
  const rawBody = page.body || page.content || "";
  const { processedHtml, headings } = processHtmlAndExtractHeadings(rawBody);
  const words = rawBody.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 230));

  const parts = page.title.trim().split(/\s+/);
  const last = parts.pop();
  const first = parts.join(" ");

  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B]">
      {/* Hero */}
      <section className="pt-[120px] min-[900px]:pt-[150px]">
        <Container>
          <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A] print:hidden">
            <ol className="inline-flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[#0A0A0B]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>Legal</li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[#0A0A0B]">
                {page.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 style={{ "--d": "80ms" } as React.CSSProperties} className={`v5-rise max-w-[860px] text-[clamp(44px,6.2vw,88px)] ${BIG} [text-wrap:balance]`}>
              {first && <>{first} </>}
              <span className="text-[#C4C4CC]">{last}.</span>
            </h1>
            <div style={{ "--d": "160ms" } as React.CSSProperties} className="v5-rise lg:pb-3">
              <LegalDocNav current={page.slug} />
            </div>
          </div>

          <div style={{ "--d": "220ms" } as React.CSSProperties} className="v5-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[#ECECF0] py-4 text-[14px] text-[#52525B]">
            {updated && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#9A9AA6]" /> Last updated {updated}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#9A9AA6]" /> {minutes} min read
            </span>
            {headings.length > 0 && <span className="text-[#9A9AA6]">{headings.length} sections</span>}
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="pb-[clamp(80px,10vw,136px)] pt-12 lg:pt-16 print:pb-4">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
            <LegalToc headings={headings} />

            <div className="min-w-0 flex-1">
              <article
                id="legal-body"
                className="v5-article legal-article max-w-[740px]"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(processedHtml) }}
              />

              <div className="mt-16 flex max-w-[740px] flex-col gap-5 rounded-[24px] bg-[#F4F5F8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 print:hidden">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.06)]">
                    <Mail className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-urbanist text-[20px] font-semibold tracking-[-0.015em]">Questions about this policy?</p>
                    <p className="mt-1 text-[14.5px] text-[#52525B]">
                      Write to{" "}
                      <a href="mailto:support@lmsdomain.com" className="font-medium text-[#0A0A0B] underline underline-offset-2">
                        support@lmsdomain.com
                      </a>
                      . A real person will reply.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#0A0A0B] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#27272A] sm:self-auto"
                >
                  Contact us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default LegalView;
