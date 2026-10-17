'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from './common/Icons';

export function CopyrightSection({ data }: { data: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 text-xs text-slate-500 font-inter">
      <p>© {currentYear} LMS Domain. All rights reserved. Built by Techiegram.</p>

      <div className="flex flex-wrap items-center gap-6">
        {data?.email && (
          <Link
            href={`mailto:${data.email}`}
            className="flex items-center gap-1.5 text-slate-600 hover:text-MainColor transition-colors"
          >
            <Icons.email_Icon className="size-3.5 fill-current" />
            <span>{data.email}</span>
          </Link>
        )}

        {data?.phone && (
          <Link
            href={`tel:${data.phone}`}
            className="flex items-center gap-1.5 text-slate-600 hover:text-MainColor transition-colors"
          >
            <Icons.phone_Icon className="size-3.5 fill-current" />
            <span>{data.phone}</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CopyrightSection;
