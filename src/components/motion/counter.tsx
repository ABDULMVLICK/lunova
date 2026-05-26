"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "motion/react";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
};

/**
 * Nombre qui s'anime de `from` à `to` quand il entre dans le viewport.
 * Idéal pour les chiffres de social proof (4 800 femmes, 4,8 / 5).
 */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  format = (n) => Math.round(n).toLocaleString("fr-FR"),
  className,
}: CounterProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(reduced ? to : from);
  const display = useTransform(value, (latest) => format(latest));

  React.useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, to, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
