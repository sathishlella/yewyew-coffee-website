"use client";

import { useCallback, useState } from "react";
import { CinematicPreloader } from "@/components/experience/preloader";
import { DynamicIslandNav } from "@/components/experience/dynamic-island-nav";
import { HeroCopy } from "@/components/experience/hero-copy";
import { MenuShowcase } from "@/components/experience/menu-showcase";
import { StorySection } from "@/components/experience/story-section";
import { WebGLBackground } from "@/components/experience/webgl-background";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

import FooterSection from "@/components/ui/footer";

export function CafeExperience({ instagramImages = [] }: { instagramImages?: string[] }) {
  const [loaded, setLoaded] = useState(false);
  const complete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <WebGLBackground />
      <div className="grain-overlay" />
      <CinematicPreloader onComplete={complete} />
      <main className="relative z-0">
        {loaded && <DynamicIslandNav />}
        <HeroCopy />
        <StorySection />
        <MenuShowcase />
        <section id="origin" className="px-4 py-28">
          <div className="mx-auto max-w-7xl rounded-[8px] border border-white/10 bg-black/28 p-8 backdrop-blur-xl md:p-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-matcha">
              origin signal
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
              <h2 className="max-w-3xl font-display text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.84] tracking-normal">
                from the earth, with love.
              </h2>
              <p className="text-sm leading-7 text-white/62">
                Every bean we serve carries the warmth of the sun, the richness of the soil, 
                and the careful touch of the hands that nurtured it. We believe that great coffee is a 
                true labor of love, meant to be shared with the people you cherish. From distant farms 
                to your cozy table, we bring you flavors that feel like coming home.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="w-full relative z-10 bg-black/40 backdrop-blur-sm border-y border-white/5 mt-12">
          <ImageAutoSlider images={instagramImages} />
        </section>

        <section id="reserve" className="grid min-h-[70vh] place-items-center px-4 py-28 text-center">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-sakura">
              reserve the quiet table
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,7vw,7rem)] font-black uppercase leading-[0.82] tracking-normal mix-blend-difference">
              come before the soul craves peace.
            </h2>
            <a
              href="mailto:hello@yewyew.coffee"
              className="mt-10 inline-flex rounded-full bg-porcelain px-6 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition hover:bg-chrome"
            >
              hello@yewyew.coffee
            </a>
          </div>
        </section>
        
        <FooterSection />
      </main>
    </>
  );
}
