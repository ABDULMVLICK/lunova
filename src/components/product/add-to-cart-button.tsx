"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { useProductState } from "@/components/product/product-state";
import { product, formatPrice } from "@/lib/product";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
  /** Si vrai, affiche le prix dans le bouton */
  showPrice?: boolean;
  /** Texte alternatif */
  label?: string;
};

/**
 * Bouton "Ajouter au panier" qui lit le coloris sélectionné dans le
 * ProductStateProvider et pousse l'article dans le cart store.
 * Affiche une confirmation animée pendant 1,2 s après l'ajout.
 */
export function AddToCartButton({
  size = "lg",
  className,
  fullWidth = false,
  showPrice = true,
  label,
}: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { colorId, images, imageIdx } = useProductState();
  const [justAdded, setJustAdded] = React.useState(false);

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const image = images[imageIdx] ?? images[0];

  const onClick = () => {
    addItem({
      sku: product.sku,
      name: `${product.name} — Ceinture chauffante`,
      colorId: color.id,
      colorLabel: color.label,
      price: product.price,
      image: image?.src ?? "/product/lunova-ivoire.jpg",
      alt: image?.alt ?? color.label,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <Button
      size={size}
      className={cn(fullWidth && "w-full", "breathe", className)}
      onClick={onClick}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {justAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Check size={18} strokeWidth={2} />
            Ajouté au panier
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {label ?? "Ajouter au panier"}
            {showPrice && <> — {formatPrice(product.price)}</>}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
