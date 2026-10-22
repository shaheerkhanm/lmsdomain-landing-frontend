import React from "react";
import Link from "next/link";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";
import type { ContactChannel } from "@/types/content";

interface ContactChannelsProps {
  title?: string;
  subtitle?: string;
  channels: ContactChannel[];
  className?: string;
}

export function ContactChannels({
  title = "Get in touch",
  subtitle = "Have questions about LMS Domain or need help getting started? We're here to help.",
  channels,
  className = "",
}: ContactChannelsProps) {
  const getChannelIcon = (type: ContactChannel["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="size-5" />;
      case "phone":
        return <Phone className="size-5" />;
      case "whatsapp":
        return <MessageSquare className="size-5" />;
      case "address":
        return <MapPin className="size-5" />;
      default:
        return <Mail className="size-5" />;
    }
  };

  return (
    <div className={`flex flex-col justify-between h-full font-urbanist ${className}`}>
      <div className="space-y-4">
        <h2 className="text-[28px] sm:text-3xl lg:text-4xl font-semibold text-[#161616] tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed">
          {subtitle}
        </p>

        {/* Contact Channel Rows */}
        {channels.length > 0 && (
          <div className="pt-6 sm:pt-8 space-y-6">
            {channels.map((channel, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {/* 40px #F3F4F6 Rounded Square */}
                <div className="size-10 rounded-xl bg-[#F3F4F6] border border-[#ECEDEF] flex items-center justify-center shrink-0 text-[#161616]">
                  {getChannelIcon(channel.type)}
                </div>

                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6B6F76]">
                    {channel.title}
                  </span>

                  {channel.href ? (
                    <Link
                      href={channel.href}
                      className="text-[16px] font-semibold text-[#161616] hover:text-[#7B5CF5] transition-colors"
                    >
                      {channel.value}
                    </Link>
                  ) : (
                    <span className="text-[16px] font-semibold text-[#161616]">
                      {channel.value}
                    </span>
                  )}

                  {channel.description && (
                    <span className="text-[12px] text-[#8F94A0] mt-0.5">
                      {channel.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactChannels;
