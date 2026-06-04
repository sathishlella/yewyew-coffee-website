"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroCopy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.25]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative grid min-h-screen place-items-center px-4 pt-28"
    >
      <motion.div
        className="perspective-1200 isolate relative mx-auto max-w-[1500px] text-center"
        style={{ y, opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-5 font-mono text-[10px] uppercase tracking-[0.48em] text-white/55"
        >
          a quiet pause in the noise / kuala lumpur
        </motion.p>
        <motion.h1
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="text-balance font-display text-[clamp(3.4rem,12vw,11rem)] font-black uppercase leading-[0.73] tracking-normal md:mix-blend-difference"
          style={{ rotateX, transformStyle: "preserve-3d" }}
        >
          y ew y ew
          <span className="block text-[0.46em] leading-[0.9] tracking-[0.34em]">coffee</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-5 text-center"
        >
          <p className="text-balance text-sm leading-7 text-white/68 sm:text-base">
            A room for people who remember that coffee is not just caffeine. It is a pause,
            a small ceremony, a way to let the day speak more gently.
          </p>
          <motion.a
            href="#menu"
            animate={{ 
              boxShadow: ["0 0 0 0px rgba(255,255,255,0)", "0 0 0 8px rgba(255,255,255,0.06)", "0 0 0 0px rgba(255,255,255,0)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="group flex items-center gap-3 rounded-full border border-white/14 bg-white/8 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur transition hover:bg-white hover:text-black"
          >
            <span>enter the menu</span>
            <motion.span 
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
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
