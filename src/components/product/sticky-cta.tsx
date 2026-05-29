"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { product, formatPrice } from "@/lib/product";

/**
 * Barre fixe mobile-only avec CTA + prix.
 * Apparaît après que l'utilisateur ait scrollé passé 600px (= passé le hero).
 * Masquée sur desktop (md:hidden).
 */
export function StickyCta() {
  const [visible, setVisible] = React.useState(false);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      aria-hidden={!visible}
      initial={false}
      animate={{
        y: visible ? 0 : reduced ? 0 : 96,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
    >
      <div className="container-lunova flex items-center justify-between gap-4 py-3">
        <div className="flex flex-col leading-tight">
          <span className="font-display text-xl text-foreground">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-foreground-subtle line-through">
            {formatPrice(product.comparePrice)}
          </span>
        </div>
        <AddToCartButton
          size="md"
          showPrice={false}
          className="flex-1 max-w-[60%]"
        />
      </div>
    </motion.div>
  );
}
