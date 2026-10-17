'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from './common/Icons';

function getSafeSocialUrl(href: string, key: string): string {
  if (!href) return '#';
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  const clean = href.replace(/^@/, '');
  switch (key) {
    case 'twitter':
      return `https://x.com/${clean}`;
    case 'instagram':
      return `https://instagram.com/${clean}`;
    case 'fb':
      return `https://facebook.com/${clean}`;
    case 'youtubelink':
      return `https://youtube.com/@${clean}`;
    case 'linkedin':
      return `https://linkedin.com/company/${clean}`;
    default:
      return `https://${clean}`;
  }
}

export default function SocialMediaIcons({ data }: { data: any }) {
  if (!data) return null;

  const socialLinks = [
    { key: 'twitter', href: data?.twitter, icon: Icons.x_Icon, label: 'X (formerly Twitter)' },
    { key: 'instagram', href: data?.instagram, icon: Icons.insta_Icon, label: 'Instagram' },
    { key: 'fb', href: data?.fb, icon: Icons.fb_Icon, label: 'Facebook' },
    { key: 'youtubelink', href: data?.youtubelink, icon: Icons.youtube_Icon, label: 'YouTube' },
    { key: 'linkedin', href: data?.linkedin, icon: Icons.linkedin_Icon, label: 'LinkedIn' },
  ];

  const validLinks = socialLinks.filter((item) => Boolean(item.href));
  if (validLinks.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      {validLinks.map((item, index) => {
        const IconComponent = item.icon;
        const safeUrl = getSafeSocialUrl(item.href, item.key);
        return (
          <a
            key={index}
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="size-9 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-MainColor hover:border-MainColor/40 transition-colors shadow-xs"
          >
            <IconComponent className="size-4 fill-current" />
          </a>
        );
      })}
    </div>
  );
}
