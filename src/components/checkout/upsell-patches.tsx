"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Check, Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { product, formatPrice } from "@/lib/product";

const UPSELL = product.upsell;

/**
 * Upsell patchs chauffants au checkout — 9 € avec preuve sociale intégrée.
 * Toggle 1-clic. "Présenté comme complément naturel, pas comme vente forcée."
 */
export function UpsellPatches() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  const existing = items.find((it) => it.sku === UPSELL.sku);
  const added = !!existing;

  const toggle = () => {
    if (added && existing) {
      removeItem(existing.id);
    } else {
      addItem({
        sku: UPSELL.sku,
        name: UPSELL.name,
        colorId: "default",
        colorLabel: "—",
        price: UPSELL.price,
        image: UPSELL.image,
        alt: UPSELL.alt,
      });
    }
  };

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-background ring-1 ring-border sm:h-24 sm:w-24">
          <Image
            src={UPSELL.image}
            alt={UPSELL.alt}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="mb-1 inline-flex items-center gap-2 rounded-full bg-terracotta-soft px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-terracotta-deep">
            Ajout suggéré
          </p>
          <h3 className="font-display text-xl text-foreground">
            {UPSELL.name} —{" "}
            <span className="text-terracotta-deep">{formatPrice(UPSELL.price)}</span>
          </h3>
          <p className="mt-1 text-small text-foreground-muted">
            {UPSELL.description}
          </p>
          <p className="mt-2 text-small italic text-foreground-muted">
            « {UPSELL.socialProof} »
          </p>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={added}
          className={
            "shrink-0 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 font-medium text-small transition-all duration-[var(--duration-base)] " +
            (added
              ? "bg-noir text-blanc hover:bg-stone-700"
              : "border border-noir text-noir hover:bg-noir hover:text-blanc")
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                <Check size={16} strokeWidth={2.25} />
                Ajouté
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                <Plus size={16} strokeWidth={2.25} />
                Ajouter pour {formatPrice(UPSELL.price)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
