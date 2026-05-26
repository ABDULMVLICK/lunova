"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Barre de progression fine en haut de page, terracotta.
 * (Brand book : "Barre de progression fine en terracotta en haut de page.")
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-terracotta"
    />
  );
}
