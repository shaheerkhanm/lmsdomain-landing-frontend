"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

export function RouteChangeWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).ScrollTrigger = ScrollTrigger;
    }

    // Immediate scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }

    // Refresh ScrollTrigger instances
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

export default RouteChangeWatcher;
