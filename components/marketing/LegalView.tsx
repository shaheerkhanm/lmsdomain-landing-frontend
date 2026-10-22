import React from "react";
import type { LegalPageData } from "@/types/content";
import { PageHero } from "./PageHero";
import { LegalToc, TocHeading } from "./LegalToc";
import { RichText } from "./RichText";

interface LegalViewProps {
  page: LegalPageData;
}

function processHtmlAndExtractHeadings(html: string): {
  processedHtml: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  let counter = 0;

  const processedHtml = html.replace(
    /<h2([^>]*)>(.*?)<\/h2>/gi,
    (match, attrs, content) => {
      const text = content.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;

      // Extract existing id if present, otherwise slugify text
      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      const id =
        idMatch?.[1] ||
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") ||
        `section-${++counter}`;

      headings.push({ id, text });

      if (idMatch) {
        return match;
      }
      return `<h2 id="${id}"${attrs}>${content}</h2>`;
    }
  );

  return { processedHtml, headings };
}

export function LegalView({ page }: LegalViewProps) {
  const formattedDate = page.lastUpdated
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(page.lastUpdated))
    : undefined;

  const subtitle = formattedDate ? `Last updated ${formattedDate}` : undefined;

  const rawBody = page.body || page.content || "";
  const { processedHtml, headings } = processHtmlAndExtractHeadings(rawBody);

  return (
    <div className="w-full bg-white font-urbanist min-h-screen">
      {/* Legal Hero without buttons */}
      <PageHero
        eyebrow="✦ LEGAL"
        title={page.title}
        subtitle={subtitle}
        className="pb-8 lg:pb-12"
      />

      {/* Main Legal Content Container */}
      <section className="w-full bg-white pb-24 sm:pb-32 print:pb-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
            {/* Table of Contents Column */}
            <LegalToc headings={headings} />

            {/* Rich Text Body Column (720px max-width) */}
            <main className="w-full lg:max-w-[720px] shrink-0 mx-auto lg:mx-0">
              <RichText content={processedHtml} />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LegalView;
