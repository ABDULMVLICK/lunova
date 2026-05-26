"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Onde de chaleur — anneaux concentriques pulsants en terracotta.
 * Posé en absolute autour du visuel produit pour suggérer la chaleur.
 */
export function HeatRipple({
  className,
  rings = 3,
}: {
  className?: string;
  rings?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      {Array.from({ length: rings }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-terracotta/35"
          style={{ width: "60%", aspectRatio: "1 / 1" }}
          initial={{ scale: 0.6, opacity: reduced ? 0 : 0.0 }}
          animate={
            reduced
              ? { scale: 1, opacity: 0.15 }
              : { scale: [0.6, 1.6], opacity: [0, 0.45, 0] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 4.5,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: i * 1.4,
                }
          }
        />
      ))}
    </div>
  );
}
