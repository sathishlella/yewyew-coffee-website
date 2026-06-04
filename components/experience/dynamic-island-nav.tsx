"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Menu, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const navItems = ["ritual", "menu", "origin"];

export function DynamicIslandNav() {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 520], ["min(92vw, 760px)", "min(92vw, 560px)"]);
  const y = useTransform(scrollY, [0, 520], [24, 14]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => { if (mq.matches) setMobileOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <motion.header
        className="fixed left-1/2 top-0 z-[1000]"
        style={{ width, y, x: "-50%" }}
      >
        <nav className="flex h-14 items-center justify-between rounded-full border border-white/12 bg-black/28 px-3 shadow-island backdrop-blur-md">
          <a href="#home" className="group flex items-center gap-2 pl-2">
            <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/8">
              <Coffee className="size-4 text-porcelain" />
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-white/78 sm:block">
              yewyew
            </span>
          </a>
          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/54 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          {/* Desktop reserve button */}
          <a
            href="#reserve"
            className="group hidden h-10 items-center gap-2 rounded-full bg-porcelain px-4 text-xs font-semibold uppercase tracking-[0.12em] text-obsidian transition hover:bg-chrome md:inline-flex"
          >
            <Sparkles className="size-3.5 transition group-hover:rotate-12" />
            <span>reserve</span>
          </a>
          {/* Mobile hamburger button */}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full bg-porcelain text-obsidian transition hover:bg-chrome md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 bg-black/92 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={closeMobile}
                className="font-display text-3xl font-black uppercase tracking-wide text-porcelain transition hover:text-chrome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#reserve"
              onClick={closeMobile}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-porcelain px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-obsidian transition hover:bg-chrome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: navItems.length * 0.06, duration: 0.35 }}
            >
              <Sparkles className="size-3.5" />
              reserve
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
