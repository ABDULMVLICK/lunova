"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { product } from "@/lib/product";

/**
 * Sélecteur de coloris interactif — anneau noir animé qui suit la sélection.
 */
export function ColorSelector() {
  const [selected, setSelected] = React.useState(product.colors[0].id);
  const current = product.colors.find((c) => c.id === selected) ?? product.colors[0];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-small font-medium text-foreground">
        Coloris —{" "}
        <span className="text-foreground-muted font-normal">{current.label}</span>
      </p>
      <div className="flex gap-3">
        {product.colors.map((c) => {
          const isSelected = c.id === selected;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              aria-label={c.label}
              aria-pressed={isSelected}
              className="relative h-12 w-12 rounded-full ring-1 ring-border transition-shadow duration-[var(--duration-base)] hover:shadow-md focus-visible:outline-none"
              style={{ backgroundColor: c.hex }}
            >
              {isSelected && (
                <motion.span
                  layoutId="color-ring"
                  className="absolute -inset-1 rounded-full border-2 border-noir"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {isSelected && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check size={16} strokeWidth={2} className="text-noir" />
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
