"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { Integration } from "@/content/features/integrations";

interface IntegrationsHubProps {
  heading: string;
  subtitle: string;
  integrations: Integration[];
}

interface PlacedIntegration extends Integration {
  key: string;
  ring: 0 | 1;
  x: number; // % of the stage
  y: number;
}

const CENTER = 50;
const RING_RADIUS = [25, 42]; // % of the stage, inner and outer ring

// Split any count over two rings (a third inner) and space each ring evenly.
// The outer ring is offset by half a step, so with twice as many outer logos
// each one sits between two inner logos and its line never crosses them.
function placeOnRings(items: Integration[]): PlacedIntegration[] {
  const innerCount = Math.max(1, Math.round(items.length / 3));
  const rings = [items.slice(0, innerCount), items.slice(innerCount)];
  return rings.flatMap((ringItems, ring) =>
    ringItems.map((item, i) => {
      const step = 360 / ringItems.length;
      const angle = ((-90 + i * step + (ring === 1 ? step / 2 : 0)) * Math.PI) / 180;
      return {
        ...item,
        key: `${ring}-${i}`,
        ring: ring as 0 | 1,
        x: CENTER + RING_RADIUS[ring] * Math.cos(angle),
        y: CENTER + RING_RADIUS[ring] * Math.sin(angle),
      };
    })
  );
}

function HubMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-full bg-[#161616] text-white flex flex-col items-center justify-center gap-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] ring-8 ring-white ${
        compact ? "size-24" : "size-[118px] lg:size-[132px]"
      }`}
    >
      <img src="/assets/img/logo/mark-square.svg" alt="" className={compact ? "size-8" : "size-10"} />
      <span className="text-[10px] font-bold tracking-[0.16em]">LMS DOMAIN</span>
    </div>
  );
}

export function IntegrationsHub({ heading, subtitle, integrations }: IntegrationsHubProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const placed = placeOnRings(integrations);
  const logoBox = integrations.length > 16 ? 52 : 64;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop rings: hub, then lines draw outwards, then logos pop in; then drift and pulses
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const hub = section.querySelector(".ih-hub");
        const lines = gsap.utils.toArray<SVGLineElement>(".ih-line", section);
        const logos = gsap.utils.toArray<HTMLElement>(".ih-pop", section);
        const layers = gsap.utils.toArray<HTMLElement>(".ih-layer", section);
        let pulseCall: gsap.core.Tween | gsap.core.Timeline | null = null;
        const ambient: gsap.core.Tween[] = [];

        gsap.set(hub, { opacity: 0, scale: 0.85 });
        gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(logos, { opacity: 0, scale: 0.6 });

        const startAmbient = () => {
          // Rings drift very slowly in opposite directions; logos stay upright
          layers.forEach((layer, i) => {
            const turn = i === 0 ? 3 : -2.5;
            const duration = i === 0 ? 26 : 34;
            ambient.push(gsap.to(layer, { rotation: turn, duration, ease: "sine.inOut", yoyo: true, repeat: -1 }));
            ambient.push(
              gsap.to(layer.querySelectorAll(".ih-upright"), {
                rotation: -turn,
                duration,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              })
            );
          });

          // A small light travels along one line at a time towards the hub
          const pulseOnce = () => {
            const line = lines[Math.floor(Math.random() * lines.length)];
            const dot = line?.ownerSVGElement?.querySelector<SVGCircleElement>(".ih-pulse");
            if (!line || !dot) return;
            const from = { cx: Number(line.getAttribute("x2")), cy: Number(line.getAttribute("y2")) };
            pulseCall = gsap
              .timeline({ onComplete: () => { pulseCall = gsap.delayedCall(0.9, pulseOnce); } })
              .set(dot, { attr: from, opacity: 0 })
              .to(dot, { opacity: 1, duration: 0.25 })
              .to(dot, { attr: { cx: CENTER, cy: CENTER }, duration: 1.5, ease: "power1.in" }, "<")
              .to(dot, { opacity: 0, duration: 0.3 }, "-=0.3");
          };
          pulseCall = gsap.delayedCall(0.6, pulseOnce);
        };

        gsap
          .timeline({
            scrollTrigger: { trigger: section.querySelector(".ih-stage"), start: "top 75%", once: true },
            onComplete: startAmbient,
          })
          .to(hub, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })
          .to(lines, {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.04,
            onComplete: () => { gsap.set(lines, { clearProps: "strokeDasharray,strokeDashoffset" }); },
          }, "-=0.15")
          .to(logos, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.7)", stagger: 0.05 }, "-=0.55");

        return () => {
          pulseCall?.kill();
          ambient.forEach((t) => t.kill());
        };
      });

      // Mobile grid: same staggered entrance, no rings, lines or ambient motion
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const hub = section.querySelector(".ih-hub-mobile");
        const tiles = gsap.utils.toArray<HTMLElement>(".ih-tile", section);
        gsap.set(hub, { opacity: 0, scale: 0.85 });
        gsap.set(tiles, { opacity: 0, y: 12 });
        gsap
          .timeline({ scrollTrigger: { trigger: section.querySelector(".ih-grid"), start: "top 85%", once: true } })
          .to(hub, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" })
          .to(tiles, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.04 }, "-=0.2");
      });
    }, section);

    return () => ctx.revert();
  }, [integrations.length]);

  return (
    <section ref={sectionRef} id="integrations" className="bg-white py-[88px] lg:py-[130px] font-urbanist overflow-x-clip">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-3.5">
            <span>✦</span>
            <span>Integrations</span>
          </span>
          <h2 className="text-[30px] sm:text-[38px] lg:text-[46px] font-semibold leading-[1.12] tracking-tight text-[#161616] mb-4">
            {heading}
          </h2>
          <p className="text-[16px] lg:text-[18px] text-[#6B6F76] leading-relaxed">{subtitle}</p>
        </div>

        {/* Desktop / tablet: hub with two rings and connector lines */}
        <div className="ih-stage hidden md:block relative mx-auto w-full max-w-[760px] aspect-square">
          {[0, 1].map((ring) => {
            const ringItems = placed.filter((p) => p.ring === ring);
            return (
              <div key={ring} className="ih-layer absolute inset-0" style={{ zIndex: ring === 0 ? 2 : 1 }}>
                <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
                  {ringItems.map((p) => (
                    <line
                      key={p.key}
                      className="ih-line transition-[stroke,stroke-width] duration-300"
                      x1={CENTER}
                      y1={CENTER}
                      x2={p.x}
                      y2={p.y}
                      pathLength={1}
                      stroke={active === p.key ? "#7B5CF5" : "#D9DBE1"}
                      strokeWidth={active === p.key ? 0.26 : 0.16}
                      strokeLinecap="round"
                    />
                  ))}
                  <circle
                    className="ih-pulse"
                    r={0.6}
                    cx={CENTER}
                    cy={CENTER}
                    fill="#7B5CF5"
                    opacity={0}
                    style={{ filter: "drop-shadow(0 0 3px rgba(123,92,245,0.9))" }}
                  />
                </svg>

                <ul aria-label={ring === 0 ? "Integrations" : undefined} className="contents">
                  {ringItems.map((p) => (
                    <li
                      key={p.key}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      <div className="ih-upright">
                        <div className="ih-pop">
                          <div
                            tabIndex={0}
                            onMouseEnter={() => setActive(p.key)}
                            onMouseLeave={() => setActive((a) => (a === p.key ? null : a))}
                            onFocus={() => setActive(p.key)}
                            onBlur={() => setActive((a) => (a === p.key ? null : a))}
                            className="group relative rounded-full bg-white border border-[#ECEDEF] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.18)] flex items-center justify-center transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_-10px_rgba(123,92,245,0.45)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5CF5]"
                            style={{ width: logoBox, height: logoBox }}
                          >
                            <img
                              src={p.logo}
                              alt={p.name}
                              width={Math.min(p.logoSize, logoBox * 0.56)}
                              height={Math.min(p.logoSize, logoBox * 0.56)}
                              className="object-contain"
                              style={{ maxWidth: logoBox * 0.56, maxHeight: logoBox * 0.56 }}
                            />
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#161616] px-2.5 py-1 text-[11px] font-semibold text-white transition-opacity duration-200 ${
                                active === p.key ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              {p.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="ih-hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <HubMark />
          </div>
        </div>

        {/* Mobile: hub on top, logos in a grid */}
        <div className="ih-grid md:hidden flex flex-col items-center gap-8">
          <div className="ih-hub-mobile">
            <HubMark compact />
          </div>
          <ul aria-label="Integrations" className="grid grid-cols-3 min-[480px]:grid-cols-4 gap-x-4 gap-y-6 w-full max-w-md">
            {integrations.map((item) => (
              <li key={item.name} className="ih-tile flex flex-col items-center gap-2 text-center">
                <div className="size-16 rounded-full bg-white border border-[#ECEDEF] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.18)] flex items-center justify-center">
                  <img
                    src={item.logo}
                    alt={item.name}
                    width={Math.min(item.logoSize, 36)}
                    height={Math.min(item.logoSize, 36)}
                    className="object-contain"
                    style={{ maxWidth: 36, maxHeight: 36 }}
                  />
                </div>
                <span aria-hidden="true" className="text-[12px] font-medium text-[#3B3F46] leading-tight">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default IntegrationsHub;
