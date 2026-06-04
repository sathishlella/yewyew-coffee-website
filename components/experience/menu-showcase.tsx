"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Bean, Sparkle } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { menuItems, MenuItem } from "@/lib/cafe-data";
import { ImageCursorTrail } from "@/components/experience/image-cursor-trail";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MenuShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [trailVisible, setTrailVisible] = useState(false);

  useEffect(() => {
    let ctx = gsap.matchMedia();

    ctx.add("(min-width: 768px)", () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, rotateX: 18, rotateZ: index % 2 === 0 ? -2.5 : 2.5 },
          {
            y: 0, rotateX: 0, rotateZ: index % 2 === 0 ? 1.3 : -1.3,
            ease: "none",
            scrollTrigger: {
              trigger: card, start: "top 95%", end: "top 20%", scrub: 0.75
            }
          }
        );
      });

      gsap.to(".menu-rail", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1
        }
      });
    });

    ctx.add("(max-width: 767px)", () => {
      // Disabled GSAP card rotations on mobile to support native horizontal swipe carousel
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative min-h-0 md:min-h-[180vh] px-0 py-28 md:px-4 md:py-40"
    >
      <ImageCursorTrail activeItem={activeItem} visible={trailVisible} />
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative md:sticky md:top-28 h-fit px-4 md:px-0 mb-8 md:mb-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-matcha">
            menu as memory
          </p>
          <h2 className="mt-5 max-w-lg font-display text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.82] tracking-normal md:mix-blend-difference">
            small rituals, large feelings.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/62">
            Every cup holds a quiet story. It's the warmth of an old friend's laughter, 
            a gentle morning sunbeam, and the comfort of feeling perfectly at home. 
            Let these carefully crafted flavors guide you back to your simplest, happiest moments.
          </p>
        </div>

        <div className="menu-rail flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 px-4 md:block md:space-y-4 md:pb-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="group relative overflow-hidden rounded-[20px] border border-white/20 bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_28px_120px_rgba(0,0,0,0.32)] backdrop-blur-2xl shrink-0 w-[85vw] snap-center flex flex-col md:block md:w-auto md:rounded-[8px] md:p-8"
              onMouseEnter={() => {
                setActiveItem(item);
                setTrailVisible(true);
              }}
              onMouseLeave={() => setTrailVisible(false)}
            >
              <div
                className="absolute right-0 top-0 h-44 w-44 opacity-30 blur-3xl transition group-hover:opacity-60 hidden md:block"
                style={{ backgroundColor: item.accent }}
              />

              {/* Mobile-only Top Media */}
              <div className="h-56 w-full shrink-0 md:hidden bg-black/20">
                {item.video ? (
                  <video 
                    src={item.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover" 
                  />
                )}
              </div>

              {/* Content Wrapper */}
              <div className="relative z-10 grid gap-4 md:gap-7 lg:grid-cols-[1fr_auto] lg:items-end p-4 md:p-0 flex-1">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-black/35">
                      {index === 3 ? <Bean className="size-4" /> : <Sparkle className="size-4" />}
                    </span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                      {item.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-4 md:mt-7 max-w-2xl text-balance font-display text-[clamp(2.4rem,5.4vw,6rem)] font-black uppercase leading-[0.82] tracking-normal">
                    {item.name}
                  </h3>
                  <p className="mt-3 md:mt-5 max-w-2xl text-sm md:text-base leading-7 md:leading-8 text-white/68">
                    {item.memory}
                  </p>
                  <blockquote className="mt-3 md:mt-5 max-w-xl border-l border-white/18 pl-4 font-mono text-[11px] uppercase leading-6 tracking-[0.18em] text-white/54">
                    {item.quote}
                  </blockquote>
                </div>
                <div className="flex items-end justify-between gap-8 lg:block lg:text-right mt-auto">

                  <div className="mt-4 md:mt-8 flex flex-wrap gap-2 lg:justify-end">
                    {item.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-white/10 bg-black/28 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://food.grab.com/my/en/restaurant/yew-yew-bangunan-ka-yin-delivery/1-C2UBRZLXE76WA2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-8 inline-flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/8 transition group-hover:bg-porcelain group-hover:text-black shrink-0"
                    aria-label={`Order ${item.name} on GrabFood`}
                  >
                    <ArrowUpRight className="size-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
