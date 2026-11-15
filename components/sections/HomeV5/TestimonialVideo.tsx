"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function toEmbed(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

/** Play button over the featured testimonial photo; opens the client's video story. */
export function TestimonialVideo({ url, name }: { url: string; name: string }) {
  const [open, setOpen] = useState(false);
  const embed = toEmbed(url);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group absolute inset-0 grid cursor-pointer place-items-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        aria-label={`Play ${name}'s story`}
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-[#0A0A0B] shadow-xl backdrop-blur transition-transform group-hover:scale-105">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl overflow-hidden rounded-2xl border-0 bg-black p-0">
          <DialogTitle className="sr-only">{name}&apos;s story</DialogTitle>
          <div className="aspect-video w-full">
            {open &&
              (embed ? (
                <iframe
                  src={embed}
                  title={`${name}'s story`}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={url} className="h-full w-full" controls autoPlay playsInline />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
