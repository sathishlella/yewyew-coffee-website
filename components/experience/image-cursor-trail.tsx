"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { MenuItem } from "@/lib/cafe-data";

export function ImageCursorTrail({
  activeItem,
  visible
}: {
  activeItem: MenuItem | null;
  visible: boolean;
}) {
  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  // Track pointer independently
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-72 w-56 overflow-hidden rounded-[8px] border border-white/14 bg-black/50 shadow-[0_30px_110px_rgba(0,0,0,0.55)] backdrop-blur md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "24px",
        translateY: "24px"
      }}
      animate={{
        opacity: visible && activeItem ? 1 : 0,
        scale: visible && activeItem ? 1 : 0.86,
        rotate: visible ? -3 : 0
      }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
    >
      {activeItem && (
        <>
          {activeItem.video ? (
            <video
              src={activeItem.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${activeItem.image}')` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/12 to-transparent" />
          <div className="absolute bottom-0 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
              {activeItem.eyebrow}
            </p>
            <p className="mt-1 text-lg font-semibold">{activeItem.name}</p>
          </div>
        </>
      )}
    </motion.div>
  );
}
