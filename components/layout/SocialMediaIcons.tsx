'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from './common/Icons';

export default function SocialMediaIcons({ data }: { data: any }) {
  if (!data) return null;

  const socialLinks = [
    { href: data?.twitter, icon: Icons.x_Icon, label: 'X (formerly Twitter)' },
    { href: data?.instagram, icon: Icons.insta_Icon, label: 'Instagram' },
    { href: data?.fb, icon: Icons.fb_Icon, label: 'Facebook' },
    { href: data?.youtubelink, icon: Icons.youtube_Icon, label: 'YouTube' },
    { href: data?.linkedin, icon: Icons.linkedin_Icon, label: 'LinkedIn' },
  ];

  const validLinks = socialLinks.filter((item) => Boolean(item.href));
  if (validLinks.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {validLinks.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="size-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-MainColor hover:border-MainColor/40 transition-colors shadow-xs"
          >
            <IconComponent className="size-4 fill-current" />
          </Link>
        );
      })}
    </div>
  );
}
