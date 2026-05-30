"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCartStore,
  useCartTotal,
  useCartHydrated,
  type CartItem,
} from "@/lib/cart-store";
import { formatPrice } from "@/lib/product";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const total = useCartTotal();
  const hydrated = useCartHydrated();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 bg-noir/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-xl outline-none"
              >
                <header className="flex items-center justify-between border-b border-border px-6 py-5">
                  <Dialog.Title className="font-display text-2xl text-foreground">
                    Ton panier
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Fermer"
                      className="rounded-full p-1 transition-colors hover:bg-stone-100 focus-visible:outline-none"
                    >
                      <X size={20} strokeWidth={1.75} />
                    </button>
                  </Dialog.Close>
                </header>

                {!hydrated ? (
                  <div className="flex-1" />
                ) : items.length === 0 ? (
                  <EmptyState onClose={close} />
                ) : (
                  <>
                    <ul className="flex-1 overflow-y-auto px-6 py-4">
                      {items.map((it) => (
                        <CartLine key={it.id} item={it} />
                      ))}
                    </ul>

                    <footer className="border-t border-border bg-surface px-6 py-6">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-small text-foreground-muted">
                          Sous-total
                        </span>
                        <span className="font-display text-2xl text-foreground">
                          {formatPrice(total)}
                        </span>
                      </div>
                      <p className="mb-5 text-small text-foreground-muted">
                        Livraison offerte · Premier cycle ou remboursée
                      </p>
                      <Button size="lg" className="w-full" asChild>
                        <Link href="/checkout/livraison" onClick={close}>
                          Procéder au paiement
                        </Link>
                      </Button>
                      <Button variant="link" className="mt-3 w-full" asChild>
                        <Link href="/panier" onClick={close}>
                          Voir le panier complet
                        </Link>
                      </Button>
                    </footer>
                  </>
                )}
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function CartLine({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li className="flex gap-4 border-b border-border py-4 last:border-0">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface ring-1 ring-border">
        <Image src={item.image} alt={item.alt} fill sizes="80px" className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <p className="font-medium text-foreground leading-tight">{item.name}</p>
        <p className="text-small text-foreground-muted">{item.colorLabel}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              type="button"
              aria-label="Diminuer"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-l-full transition-colors hover:bg-stone-100"
            >
              <Minus size={14} strokeWidth={1.75} />
            </button>
            <span className="min-w-[2ch] px-2 text-center text-small tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Augmenter"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-r-full transition-colors hover:bg-stone-100"
            >
              <Plus size={14} strokeWidth={1.75} />
            </button>
          </div>
          <span className="font-medium tabular-nums text-foreground">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label="Retirer du panier"
        onClick={() => removeItem(item.id)}
        className="self-start text-foreground-subtle transition-colors hover:text-terracotta-deep"
      >
        <Trash2 size={16} strokeWidth={1.5} />
      </button>
    </li>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <ShoppingBag size={36} strokeWidth={1.25} className="mb-5 text-stone-300" />
      <p className="mb-2 font-display text-2xl text-foreground">
        Ton panier est vide.
      </p>
      <p className="mb-6 text-foreground-muted">
        Choisis ton coloris, on s’occupe du reste.
      </p>
      <Button asChild>
        <Link href="/produit" onClick={onClose}>
          Voir le produit
        </Link>
      </Button>
    </div>
  );
}
