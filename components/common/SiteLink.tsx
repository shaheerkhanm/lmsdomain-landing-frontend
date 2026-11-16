"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { usePageVisibility } from "@/lib/pages-context";

export interface SiteLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  href: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function SiteLink({
  href,
  fallback = null,
  children,
  ...props
}: SiteLinkProps) {
  const { isPathVisible } = usePageVisibility();
  if (!isPathVisible(String(href))) {
    return fallback ? <>{fallback}</> : null;
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export default SiteLink;
