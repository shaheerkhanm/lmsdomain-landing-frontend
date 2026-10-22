import React from "react";
import { sanitizeHtml } from "@/lib/sanitize";

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className = "" }: RichTextProps) {
  const sanitized = sanitizeHtml(content);

  return (
    <div
      className={`font-urbanist text-[#4B5563] text-[17px] leading-[1.7] space-y-5
        [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:text-[#161616] [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-28
        [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:text-[#161616] [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-28
        [&_h4]:text-[18px] [&_h4]:font-semibold [&_h4]:text-[#161616] [&_h4]:tracking-tight [&_h4]:mt-6 [&_h4]:mb-2
        [&_p]:text-[17px] [&_p]:leading-[1.7] [&_p]:text-[#4B5563] [&_p]:mb-4
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:text-[17px] [&_ul]:leading-[1.7] [&_ul]:text-[#4B5563]
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2 [&_ol]:text-[17px] [&_ol]:leading-[1.7] [&_ol]:text-[#4B5563]
        [&_li]:text-[#4B5563]
        [&_a]:text-[#161616] [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-[#7B5CF5] [&_a]:transition-colors
        [&_strong]:text-[#161616] [&_strong]:font-semibold
        [&_blockquote]:pl-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[#ECEDEF] [&_blockquote]:italic [&_blockquote]:text-[#6B6F76]
        print:[&_*]:text-black print:[&_a]:no-underline
        ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

export default RichText;

