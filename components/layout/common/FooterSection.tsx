"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMediaIcons from "../SocialMediaIcons";
import BrandLogo from "@/components/brand/BrandLogo";
import { usePageVisibility } from "@/lib/pages-context";
import { siteConfig } from "@/content/site";
import { Mail } from "lucide-react";

interface FooterColumn {
  title: string;
  links: { title: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { title: "Teach & Batches", href: "/platform/teach" },
      { title: "Assess & Certify", href: "/platform/assess" },
      { title: "Manage & Operations", href: "/platform/manage" },
      { title: "Sell & Checkout", href: "/platform/sell" },
      { title: "Brand & Custom Domain", href: "/platform/brand" },
      { title: "Domie AI", href: "/platform/ai" },
      { title: "Security & Hosting", href: "/platform/security" },
      { title: "All Features", href: "/platform" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { title: "Coaching Institutes", href: "/solutions/coaching-institutes" },
      { title: "Language & Test-Prep", href: "/solutions/language-test-prep-academies" },
      { title: "Training Companies", href: "/solutions/training-companies" },
      { title: "Solo Educators & Tutors", href: "/solutions/solo-educators" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Plans & Pricing", href: "/pricing" },
      { title: "Product Roadmap", href: "/roadmap" },
      { title: "Blog & Guides", href: "/resources/blog" },
      { title: "Edmingle Alternative", href: "/compare/edmingle-alternative" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Customers", href: "/customers" },
      { title: "Contact Us", href: "/contact" },
      { title: "Enterprise LMS", href: "/custom-lms" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export function FooterSection({
  addressData,
  contentData,
  publishedLegalSlugs,
}: {
  addressData?: any;
  contentData?: any;
  publishedLegalSlugs?: string[];
}) {
  const pathname = usePathname();
  const { isPathVisible } = usePageVisibility();
  const currentYear = siteConfig.copyrightYear;

  if (
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/forgot-password")
  ) {
    return null;
  }

  // Filter links through page visibility context
  const columns = FOOTER_COLUMNS.map((col) => {
    let links = col.links.filter((link) => isPathVisible(link.href));
    if (col.title === "Legal" && publishedLegalSlugs && publishedLegalSlugs.length > 0) {
      links = links.filter((link) => {
        const slug = link.href.replace(/^\//, "");
        return publishedLegalSlugs.includes(slug);
      });
    }
    return { ...col, links };
  }).filter((col) => col.links.length > 0);

  const contactEmail = addressData?.email || siteConfig.supportEmail;

  return (
    <footer className="bg-[#FAFAFA] border-t border-[rgba(15,15,20,0.08)] text-[#151517] font-urbanist pt-16 pb-12">
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Top Grid: Brand Column + 5 Nav Link Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Brand & Social Column (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" aria-label="LMS Domain home" className="inline-block">
              <BrandLogo variant="wordmark" tone="light" height={28} />
            </Link>

            <p className="text-[14px] text-[#535361] leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            {siteConfig.tagline && (
              <p className="text-[12px] font-medium text-[#6C4BFF] tracking-wide uppercase">
                ✦ {siteConfig.tagline}
              </p>
            )}

            {/* Social Profile Icons Row */}
            <div className="pt-2">
              <SocialMediaIcons data={addressData} />
            </div>
          </div>

          {/* Nav Link Columns (8 cols on lg, 2x2/5-col layout) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
            {columns.map((col) => (
              <div key={col.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#151517]">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-[#535361] hover:text-[#151517] transition-colors leading-normal"
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

        {/* Bottom Bar: Copyright, Contact Email, Legal Quicklinks */}
        <div className="pt-8 border-t border-[rgba(15,15,20,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6F76]">
          <p>© {currentYear} LMS Domain. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 text-[#535361] hover:text-[#151517] transition-colors"
              >
                <Mail className="size-3.5 text-[#7B5CFF]" />
                <span>{contactEmail}</span>
              </a>
            )}

            <Link
              href="/privacy-policy"
              className="text-[#535361] hover:text-[#151517] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[#535361] hover:text-[#151517] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/refund-policy"
              className="text-[#535361] hover:text-[#151517] transition-colors"
            >
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
