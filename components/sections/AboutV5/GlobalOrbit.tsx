import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/sections/HomeV5/primitives";

/*
 * "Built for academies everywhere": currencies and gateways orbiting the platform.
 * Gateways and currencies match the Sell page (Stripe, Razorpay, Paytm, DOKU; USD, EUR, GBP, INR and more).
 */

// Real logo files for Stripe and Razorpay; brand-colour wordmarks for Paytm and DOKU
const OUTER: { l: string; a: number; mark: React.ReactNode }[] = [
  {
    l: "Stripe",
    a: 0,
    mark: <Image src="/assets/img/integration/integration-8.png" alt="Stripe" width={72} height={72} className="h-12 w-12 rounded-full" />,
  },
  {
    l: "Razorpay",
    a: 90,
    mark: <Image src="/assets/img/integration/integration-1.png" alt="Razorpay" width={72} height={72} className="h-12 w-12 rounded-full" />,
  },
  {
    l: "Paytm",
    a: 180,
    mark: (
      <span className="font-sans text-[19px] font-extrabold lowercase leading-none tracking-[-0.04em]">
        <span className="text-[#002E6E]">pay</span>
        <span className="text-[#00BAF2]">tm</span>
      </span>
    ),
  },
  {
    l: "DOKU",
    a: 270,
    mark: <span className="font-sans text-[18px] font-black leading-none tracking-[0.02em] text-[#E1251B]">DOKU</span>,
  },
];
const INNER = [
  { l: "$", a: 45 },
  { l: "€", a: 135 },
  { l: "£", a: 225 },
  { l: "₹", a: 315 },
];

const pos = (deg: number, r: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { left: `${50 + r * Math.cos(rad)}%`, top: `${50 + r * Math.sin(rad)}%` };
};

function Orbit() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="absolute inset-[4%] rounded-full border border-white/10" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-white/15" />
      <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.4),transparent)]" />

      {/* outer ring: gateways */}
      <div className="orbit-spin absolute inset-0">
        {OUTER.map((g) => (
          <span key={g.l} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(g.a, 46)}>
            <span
              title={g.l}
              className="orbit-counter flex h-[64px] min-w-[64px] items-center justify-center rounded-[20px] bg-white px-2.5 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
            >
              {g.mark}
            </span>
          </span>
        ))}
      </div>

      {/* inner ring: currencies, spinning the other way */}
      <div className="orbit-spin-rev absolute inset-0">
        {INNER.map((c) => (
          <span key={c.l} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(c.a, 28)}>
            <span className="orbit-counter-rev grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#15131F] font-urbanist text-[18px] font-semibold text-white">
              {c.l}
            </span>
          </span>
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 grid h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[26px] bg-white text-center shadow-[0_24px_60px_-20px_rgba(108,75,255,0.7)]">
        <div>
          <span className="mx-auto grid h-9 w-9 place-items-center rounded-[10px] bg-[#0A0A0B] font-urbanist text-[17px] font-bold text-white">L</span>
          <p className="mt-1.5 text-[10.5px] font-semibold text-[#18181B]">Your academy</p>
        </div>
      </div>
    </div>
  );
}

export function GlobalOrbit() {
  return (
    <section className="px-2 pt-[clamp(80px,10vw,136px)] sm:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A0A0B] py-[clamp(64px,8vw,104px)] text-white sm:rounded-[40px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_60%_70%_at_70%_50%,#000,transparent_75%)]" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="rv-v4">
              <p className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[13px] font-medium text-[#E4E4E7]">Built for everywhere</p>
              <h2 className="mt-5 font-urbanist text-[clamp(30px,3.8vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">
                Built in India, made for academies everywhere
              </h2>
              <p className="mt-4 max-w-[480px] text-[16.5px] leading-[1.6] text-[#A1A1AA]">
                Teach learners in any country, sell in their currency and get paid through the gateway that works where you are.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Sell in USD, EUR, GBP, INR and more",
                  "Stripe, Razorpay, Paytm and DOKU",
                  "Your own domain, anywhere in the world",
                  "Learners join on any device, in any time zone",
                ].map((t, i) => (
                  <li key={t} style={{ "--d": `${200 + i * 90}ms` } as React.CSSProperties} className="v5-pop flex items-center gap-3 text-[15px] text-[#D4D4D8]">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#6C4BFF]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv-v4 px-6 sm:px-10">
              <Orbit />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
