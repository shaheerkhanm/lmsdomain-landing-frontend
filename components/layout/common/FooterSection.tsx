'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMediaIcons from "../SocialMediaIcons";
import CopyrightSection from "../CopyrightSection";
import { sanitizeHtml } from "@/lib/sanitize";
import { footerContent } from "@/content/home/footer";

const DEFAULT_FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { title: "Features & LMS Core", href: "/features" },
      { title: "Domie AI", href: "/ai" },
      { title: "Plans & Pricing", href: "/pricing" },
      { title: "Product FAQs", href: "/pricing#faqSection" },
      { title: "Request Live Demo", href: "/#cta-enquiry" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Home", href: "/" },
      { title: "About Our Story", href: "/about" },
      { title: "Core Architecture", href: "/features" },
    ],
  },
  {
    title: "Legal & Compliance",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Refund & Cancellation", href: "/refund-policy" },
      { title: "Data Processing (DPA)", href: "/dpa" },
    ],
  },
];

export function FooterSection({
  addressData,
  contentData,
  publishedLegalSlugs,
}: {
  addressData: any;
  contentData: any;
  publishedLegalSlugs?: string[];
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/login") || pathname?.startsWith("/signup")) {
    return null;
  }

  const sanitizedContent = sanitizeHtml(contentData?.content);
  const isLorem = /lorem\s*ipsum/i.test(sanitizedContent || "");

  const columns = DEFAULT_FOOTER_COLUMNS.map((section) => {
    if (section.title === "Legal & Compliance") {
      const legalLinks = section.links.filter((link) => {
        const slug = link.href.replace(/^\//, "");
        return publishedLegalSlugs ? publishedLegalSlugs.includes(slug) : true;
      });
      return { ...section, links: legalLinks };
    }
    return section;
  }).filter((section) => section.links.length > 0);

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-800 font-inter pt-16 pb-12">
      <div className="main-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <img
                src="/assets/img/logo/logo.svg"
                alt="LMS Domain Logo"
                width={208}
                height={36}
                className="h-8 md:h-9 w-auto max-w-[210px] object-contain"
              />
            </Link>

            {sanitizedContent && !isLorem ? (
              <div
                className="text-sm text-slate-600 leading-relaxed max-w-sm"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                {footerContent.description}
              </p>
            )}

            <div className="pt-2">
              <SocialMediaIcons data={addressData} />
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {columns.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 hover:text-MainColor transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright & Meta Links */}
        <CopyrightSection data={addressData} />
      </div>
    </footer>
  );
}

export default FooterSection;
