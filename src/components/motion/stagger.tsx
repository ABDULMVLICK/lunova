"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  y?: number;
  once?: boolean;
  className?: string;
};

/**
 * Conteneur qui fait apparaître ses enfants en séquence.
 * Chaque enfant direct doit être un <StaggerChild>.
 */
export function Stagger({
  children,
  as = "div",
  delay = 0,
  stagger = 0.09,
  once = true,
  className,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"];

  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduced ? 0 : delay,
        staggerChildren: reduced ? 0 : stagger,
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

type StaggerChildProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  y?: number;
  className?: string;
};

export function StaggerChild({
  children,
  as = "div",
  y = 16,
  className,
}: StaggerChildProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag className={cn(className)} variants={variants}>
      {children}
    </MotionTag>
  );
}
