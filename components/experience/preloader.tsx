"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CinematicPreloader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Keep the black screen for just a short, dramatic pause (e.g., 800ms)
    // then trigger the iris-wipe transition.
    const timer = setTimeout(() => {
      setDone(true);
      // Wait for the wipe animation to finish before unmounting (1.2s)
      setTimeout(onComplete, 1200);
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Cinematic iris-wipe transition
  const plungeTransition = { duration: 1.2, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none"
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <svg className="absolute inset-0 h-full w-full">
          <defs>
            <mask id="dive-mask">
              {/* White makes the mask visible (the solid black background) */}
              <rect width="100%" height="100%" fill="white" />
              {/* Black creates a transparent hole */}
              <motion.circle
                cx="50%"
                cy="50%"
                initial={{ r: 0 }}
                animate={{ r: done ? 3000 : 0 }}
                transition={plungeTransition}
                fill="black"
              />
            </mask>
          </defs>

          {/* The solid background that gets wiped away */}
          <rect
            width="100%"
            height="100%"
            fill="#060606" // Deepest cinematic black
            mask="url(#dive-mask)"
          />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
}
