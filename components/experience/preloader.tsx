"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CinematicPreloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const started = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - started;
      // Slower easing for the "brewing" feel
      const eased = 1 - Math.pow(1 - Math.min(elapsed / 2600, 1), 3);
      const next = Math.max(0, Math.min(100, Math.floor(eased * 100)));
      setCount(next);
      
      if (next >= 100) {
        window.clearInterval(timer);
        // Small pause at 100% before diving in
        window.setTimeout(() => setDone(true), 300);
        // Dive animation takes 1.2s, let's call onComplete at 1.1s so it overlaps nicely
        window.setTimeout(onComplete, 1400);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  const plungeTransition = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none"
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      >
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <mask id="dive-mask">
              {/* White makes the mask visible (the black background) */}
              <rect width="100%" height="100%" fill="white" />
              {/* Black makes a transparent hole */}
              <motion.circle
                cx="50%"
                cy="50%"
                initial={{ r: 0 }}
                animate={{ r: done ? 3000 : 0 }}
                transition={plungeTransition}
                fill="black"
              />
            </mask>
            <linearGradient id="espresso-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a2610" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5a2b" stopOpacity="1" />
              <stop offset="100%" stopColor="#c48a4d" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* The main solid background that will be wiped away */}
          <rect
            width="100%"
            height="100%"
            fill="#060606"
            mask="url(#dive-mask)"
          />

          {/* Cup Rim (Top-down view) */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="80"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            fill="none"
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Rising Coffee Level */}
          {!done && (
            <motion.circle
              cx="50%"
              cy="50%"
              r={(count / 100) * 78}
              fill="#1f100a" // Deep espresso brown
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Espresso stream falling from the top */}
          {!done && count > 0 && count < 100 && (
            <motion.rect
              x="calc(50% - 1.5px)"
              y="0"
              width="3"
              height="50%"
              fill="url(#espresso-gradient)"
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
            />
          )}

          {/* Crema Ripples */}
          {!done && count > 5 && count < 98 && (
            <motion.circle
              cx="50%"
              cy="50%"
              stroke="#c48a4d"
              strokeWidth="1.5"
              fill="none"
              initial={{ r: 2, opacity: 0.8 }}
              animate={{ r: 24, opacity: 0 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </svg>

        {/* Text UI */}
        <motion.div
          className="absolute bottom-20 flex flex-col items-center gap-3 text-porcelain"
          animate={{ opacity: done ? 0 : 1, y: done ? 20 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-white/40">
            {count < 100 ? "brewing the experience" : "ready"}
          </p>
          <div className="font-display text-3xl font-bold tracking-widest text-white/80">
            {String(count).padStart(3, "0")}%
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
