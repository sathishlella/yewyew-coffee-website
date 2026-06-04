"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroCopy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.25]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end px-4 pb-32 pt-28 md:grid md:place-items-center md:pb-0"
    >
      <motion.div
        className="perspective-1200 isolate relative mx-auto w-full max-w-[1500px] text-center"
        style={{ y, opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-mono text-[9px] uppercase tracking-[0.5em] text-white/50 md:mb-5 md:text-[10px] md:tracking-[0.48em] md:text-white/55"
        >
          a quiet pause in the noise / kuala lumpur
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-display text-[clamp(2.8rem,14vw,11rem)] font-black uppercase leading-[0.75] tracking-normal md:mix-blend-difference"
          style={{ rotateX, transformStyle: "preserve-3d" }}
        >
          y ew y ew
          <span className="block text-[0.46em] leading-[0.9] tracking-[0.34em]">coffee</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-8 text-center md:mt-8 md:gap-5"
        >
          <p className="max-w-[280px] text-balance text-[10px] leading-[2.2] tracking-[0.08em] text-white/40 md:max-w-none md:text-sm md:leading-7 md:tracking-normal md:text-white/68">
            A room for people who remember that coffee is not just caffeine. It is a pause,
            a small ceremony, a way to let the day speak more gently.
          </p>
          <a
            href="#menu"
            className="rounded-full border border-white/5 bg-white/5 px-7 py-4 font-mono text-[8px] uppercase tracking-[0.35em] text-white/60 backdrop-blur-md transition hover:bg-white hover:text-black md:border-white/14 md:bg-white/8 md:px-5 md:py-3 md:text-[10px] md:tracking-[0.24em] md:text-white/80"
          >
            enter the menu
          </a>
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute bottom-8 left-1/2 h-20 w-px -translate-x-1/2 overflow-hidden bg-white/10">
        <motion.div
          className="h-10 w-px bg-white"
          animate={{ y: [-40, 90] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
