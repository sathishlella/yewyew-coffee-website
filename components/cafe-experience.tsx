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
            <h2 className="mt-6 font-display text-[clamp(2.8rem,7vw,7rem)] font-black uppercase leading-[0.82] tracking-normal md:mix-blend-difference">
              come before the soul craves peace.
            </h2>
            <a
              href="https://wa.me/60123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-porcelain px-7 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-black transition hover:bg-chrome"
            >
              <span>MESSAGE US ON WHATSAPP</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </section>
        
        <FooterSection />
      </main>
    </>
  );
}
