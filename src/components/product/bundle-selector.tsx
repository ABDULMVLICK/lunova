"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useProductState } from "@/components/product/product-state";
import { product, formatPrice } from "@/lib/product";
import { cn } from "@/lib/utils";

/**
 * Sélecteur de bundle 1/2/3 ceintures avec discount progressif.
 * Le bundle "duo" est marqué "LE PLUS CHOISI".
 */
export function BundleSelector() {
  const { bundleId, setBundleId } = useProductState();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-small font-medium text-foreground">
        Choisis ta quantité
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {product.bundles.map((b) => {
          const isSelected = b.id === bundleId;
          const unitPrice = Math.round(b.price / b.quantity);
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setBundleId(b.id)}
              aria-pressed={isSelected}
              className={cn(
                "relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
                "focus-visible:outline-none",
                isSelected
                  ? "border-terracotta bg-terracotta-soft/30 shadow-sm"
                  : "border-border bg-surface hover:border-noir/60",
                b.featured && !isSelected && "border-noir/30"
              )}
            >
              {b.featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-noir px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-blanc">
                  Le plus choisi
                </span>
              )}

              <div className="flex w-full items-center justify-between">
                <span className="font-display text-lg text-foreground">
                  {b.quantity} × Lunova
                </span>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-blanc"
                  >
                    <Check size={14} strokeWidth={2.25} />
                  </motion.span>
                )}
              </div>

              <p className="text-small text-foreground-muted">
                {formatPrice(unitPrice)} / pièce
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-2xl text-foreground">
                  {formatPrice(b.price)}
                </span>
                {b.discount > 0 && (
                  <span className="text-xs text-foreground-subtle line-through">
                    {formatPrice(b.compareTotal)}
                  </span>
                )}
              </div>

              {b.discount > 0 && (
                <span className="text-small font-medium text-terracotta-deep">
                  −{b.discount}% · Tu économises {formatPrice(b.compareTotal - b.price)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
