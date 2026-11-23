'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import SocialMediaIcons from "../SocialMediaIcons";
import { Icons } from "./Icons";
import { isPlaceholderPhone } from "@/lib/utils";
import { sanitizeHtml } from "@/lib/sanitize";
import { footerContent } from "@/content/home/footer";
import { usePageVisibility } from "@/lib/pages-context";
import BrandLogo from "@/components/brand/BrandLogo";
import { mentionsNotLive } from "@/lib/claims";
import { DEFAULT_FOOTER_COLUMNS, type FooterColumn } from "@/content/navigation";


export function FooterSection({
  addressData,
  contentData,
  publishedLegalSlugs,
  columns: columnsIn,
  compareLinks = [],
}: {
  addressData: any;
  contentData: any;
  publishedLegalSlugs?: string[];
  /** Footer link columns from Admin > Settings > Site navigation (built-in columns when missing) */
  columns?: FooterColumn[];
  /** Published compare pages, shown as a row of links above the bottom bar */
  compareLinks?: { name: string; href: string }[];
}) {
  const pathname = usePathname();
  const { isPathVisible } = usePageVisibility();

  if (pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/forgot-password")) {
    return null;
  }

  const sanitizedContent = sanitizeHtml(contentData?.content);
  const isPlaceholder = !sanitizedContent || mentionsNotLive(sanitizedContent) || /lorem\s*ipsum/i.test(sanitizedContent);

  const columns = (columnsIn && columnsIn.length ? columnsIn : DEFAULT_FOOTER_COLUMNS).map((section) => {
    let links = section.links.filter((link) => isPathVisible(link.href));
    if (section.title === "Legal & Compliance" && publishedLegalSlugs && publishedLegalSlugs.length > 0) {
      links = links.filter((link) => {
        const slug = link.href.replace(/^\//, "");
        return publishedLegalSlugs.includes(slug);
      });
    }
    // Admin > Contact details > Help center URL (shown only when filled in)
    const helpCenterUrl: string = addressData?.helpCenterUrl || "";
    if (section.title === "Resources" && /^https:\/\/\S+$/i.test(helpCenterUrl)) {
      links = [{ title: "Help Center", href: helpCenterUrl }, ...links];
    }
    return { ...section, links };
  }).filter((section) => section.links.length > 0);

  const effectiveDescription =
    sanitizedContent && !isPlaceholder
      ? sanitizedContent
      : footerContent.description || "The all-in-one learning platform to teach, sell and grow your online academy.";

  const year = new Date().getFullYear();
  const email: string | undefined = addressData?.email;
  const phone: string | undefined = addressData?.phone && !isPlaceholderPhone(addressData.phone) ? addressData.phone : undefined;

  return (
    <footer className="bg-white px-2 pb-2 font-sans sm:px-3 sm:pb-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A0A0B] text-white sm:rounded-[40px]">
        {/* Soft violet glow and dot pattern, same family as the page heroes */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-160px] top-[-220px] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.28),transparent)] blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_60%_at_80%_0%,#000,transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,40px)] pt-[clamp(56px,7vw,88px)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand, description, contact, social */}
            <div className="lg:col-span-4">
              <Link href="/" aria-label="LMS Domain home" className="inline-block">
                <BrandLogo variant="wordmark" tone="dark" height={30} />
              </Link>
              {sanitizedContent && !isPlaceholder ? (
                <div
                  className="mt-5 max-w-[340px] text-[15px] leading-[1.6] text-[#A1A1AA]"
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
              ) : (
                <p className="mt-5 max-w-[340px] text-[15px] leading-[1.6] text-[#A1A1AA]">{effectiveDescription}</p>
              )}

              {(email || phone) && (
                <div className="mt-7 space-y-2.5">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="group flex w-fit items-center gap-3 text-[14.5px] text-[#E4E4E7] transition-colors hover:text-white"
                    >
                      <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#A99BFF] transition-colors group-hover:border-white/30">
                        <Icons.email_Icon className="size-3.5 fill-current" />
                      </span>
                      {email}
                    </a>
                  )}
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="group flex w-fit items-center gap-3 text-[14.5px] text-[#E4E4E7] transition-colors hover:text-white"
                    >
                      <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#A99BFF] transition-colors group-hover:border-white/30">
                        <Icons.phone_Icon className="size-3.5 fill-current" />
                      </span>
                      {phone}
                    </a>
                  )}
                </div>
              )}

              <div className="mt-7">
                <SocialMediaIcons data={addressData} tone="dark" />
              </div>
            </div>

            {/* Link columns */}
            {columns.length > 0 && (
              <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:pl-8">
                {columns.map((section) => (
                  <div key={section.title}>
                    <p className="text-[13px] font-semibold text-white">{section.title}</p>
                    <ul className="mt-5 space-y-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[14px] leading-[1.4] text-[#A1A1AA] transition-colors hover:text-white"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* The published compare pages */}
          <div className="mt-14 space-y-3 text-[13.5px]">
            {compareLinks.length > 0 && (
              <nav aria-label="Compare" className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link href="/compare" className="font-semibold text-white underline-offset-4 hover:underline">
                  Compare LMS Domain
                </Link>
                {compareLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="text-[#A1A1AA] transition-colors hover:text-white">
                    vs {l.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          {/* Bottom bar */}
          <div className={`mt-8 flex flex-col gap-4 border-t border-white/10 py-7 text-[13px] text-[#71717A] sm:flex-row sm:items-center sm:justify-between`}>
            <p>© {year} LMS Domain. All rights reserved. Built by Techiegram.</p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                const lenis = (window as unknown as { lenis?: { scrollTo: (y: number) => void } }).lenis;
                if (lenis) lenis.scrollTo(0);
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group inline-flex w-fit items-center gap-2 text-[#A1A1AA] transition-colors hover:text-white"
            >
              Back to top
              <span className="grid size-7 place-items-center rounded-full border border-white/10 transition-colors group-hover:border-white/30">
                <ArrowUp className="size-3.5" />
              </span>
            </a>
          </div>
        </div>

        {/* Large faded wordmark */}
        <p
          aria-hidden="true"
          className="pointer-events-none -mb-[0.22em] select-none text-center font-urbanist text-[clamp(72px,18.5vw,270px)] font-semibold leading-none tracking-[-0.05em] bg-gradient-to-b from-white/[0.16] to-white/0 to-[85%] bg-clip-text text-transparent"
        >
          lmsdomain
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
