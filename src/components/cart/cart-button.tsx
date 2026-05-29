"use client";

import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore, useCartCount, useCartHydrated } from "@/lib/cart-store";

/**
 * Bouton panier du header — icône + badge count.
 * Le badge ne s'affiche qu'après hydratation (évite flash SSR).
 */
export function CartButton() {
  const open = useCartStore((s) => s.open);
  const count = useCartCount();
  const hydrated = useCartHydrated();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Panier${count > 0 ? ` (${count} articles)` : ""}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-stone-100 focus-visible:outline-none"
    >
      <ShoppingBag size={20} strokeWidth={1.5} />
      <AnimatePresence>
        {hydrated && count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-medium text-blanc tabular-nums"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
