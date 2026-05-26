"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
};

/**
 * Apparition douce au scroll — fade + glissement vertical.
 * Respecte automatiquement prefers-reduced-motion.
 */
export function FadeIn({
  children,
  as = "div",
  delay = 0,
  y = 16,
  duration = 0.6,
  once = true,
  className,
}: FadeInProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
