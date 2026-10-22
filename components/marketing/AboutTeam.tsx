import React from "react";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import SectionHeader from "./SectionHeader";
import type { AboutTeam as AboutTeamType } from "@/types/content";

interface AboutTeamProps {
  data?: AboutTeamType;
}

export function AboutTeam({ data }: AboutTeamProps) {
  if (!data || !data.members || data.members.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Leadership"
          title={data.title || "Meet Our Leadership"}
          subtitle={
            data.subtitle ||
            "Experienced leaders in instructional architecture, distributed engineering, and student success."
          }
          align="center"
        />

        {/* Member Grid: 4 columns desktop, 2 tablet, 2 mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-left">
          {data.members.map((member, idx) => (
            <div key={idx} className="group flex flex-col">
              {/* Photo: Square, radius 20px, natural color */}
              <div className="relative aspect-square w-full rounded-[20px] overflow-hidden bg-slate-100 border border-[#ECEDEF] mb-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[17px] font-semibold text-[#161616] tracking-tight">
                    {member.name}
                  </h4>
                  <p className="text-[14px] text-[#6B6F76]">
                    {member.role}
                  </p>
                </div>

                {member.linkedinUrl && (
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-[#8F94A0] hover:text-[#0A66C2] transition-colors"
                    aria-label={`${member.name} LinkedIn Profile`}
                  >
                    <Linkedin className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeam;

