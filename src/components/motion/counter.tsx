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
 *
 * IMPORTANT — robustesse :
 * - La valeur INITIALE est `to` (pas 0) → si l'animation ne se déclenche
 *   jamais (hors viewport, JS désactivé, prefers-reduced-motion), le bon
 *   chiffre s'affiche quand même.
 * - L'animation rejoue depuis `from` au premier passage in-view.
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
  const value = useMotionValue(to);  // ← default à `to`, pas `from`
  const display = useTransform(value, (latest) => format(latest));
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (reduced || hasAnimated.current) return;
    if (!inView) return;
    hasAnimated.current = true;
    value.set(from);
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, to, from, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
