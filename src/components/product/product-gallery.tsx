"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { HeatRipple } from "@/components/motion/heat-ripple";
import { useProductState } from "@/components/product/product-state";
import { cn } from "@/lib/utils";

/**
 * Galerie produit interactive — image principale + thumbnails.
 * Lit l'état partagé via ProductStateProvider.
 *
 * Au clic sur une thumb : l'image principale change avec un crossfade.
 * Au clic sur un coloris (dans ColorSelector) : l'image change aussi.
 */
export function ProductGallery() {
  const { images, imageIdx, setImageIdx } = useProductState();
  const current = images[imageIdx];

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale avec crossfade */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface shadow-lg ring-1 ring-border/60">
        <HeatRipple />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((img, i) => {
            const selected = i === imageIdx;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setImageIdx(i)}
                aria-label={img.alt}
                aria-pressed={selected}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-lg bg-surface shadow-sm transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
                  selected
                    ? "ring-2 ring-noir ring-offset-2 ring-offset-background"
                    : "ring-1 ring-border hover:ring-noir hover:-translate-y-0.5"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 12vw, 22vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
