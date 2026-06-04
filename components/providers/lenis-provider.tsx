"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1
    });

    // Sync Lenis scroll position with GSAP ScrollTrigger on every scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for the Lenis RAF loop so they share the same frame
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker gives time in seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerCallback);

    // Prevent GSAP ticker lag smoothing from interfering with Lenis
    gsap.ticker.lagSmoothing(0);

    // Handle anchor link clicks — smooth scroll via Lenis instead of native jump
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const section = document.querySelector(hash);
      if (!section) return;

      event.preventDefault();
      lenis.scrollTo(section as HTMLElement, { offset: 0, duration: 1.2 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return children;
}
