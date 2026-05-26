"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Étoiles terracotta qui se remplissent une par une au reveal.
 */
export function AnimatedStars({
  rating = 5,
  total = 5,
  size = 16,
  delay = 0,
  className,
}: {
  rating?: number;
  total?: number;
  size?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${rating} étoiles sur ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reduced ? 0 : 0.35,
            delay: reduced ? 0 : delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-flex"
        >
          <Star
            size={size}
            strokeWidth={1.5}
            className={
              i < rating ? "fill-terracotta text-terracotta" : "text-stone-300"
            }
          />
        </motion.span>
      ))}
    </div>
  );
}
