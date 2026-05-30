"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import {
  useCartStore,
  useCartTotal,
  useCartHydrated,
} from "@/lib/cart-store";
import { formatPrice } from "@/lib/product";

export default function PanierPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartTotal();
  const hydrated = useCartHydrated();

  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <>
      <Header />
      <main>
        <section className="section-py">
          <Container className="max-w-5xl">
            <Badge variant="outline" className="mb-4">Panier</Badge>
            <h1 className="mb-12">Ton panier{hydrated && itemCount > 0 ? ` — ${itemCount} article${itemCount > 1 ? "s" : ""}` : ""}.</h1>

            {!hydrated ? (
              <div className="min-h-[40vh]" />
            ) : items.length === 0 ? (
              <FadeIn className="mx-auto max-w-md text-center">
                <ShoppingBag size={48} strokeWidth={1.25} className="mx-auto mb-6 text-stone-300" />
                <h2 className="mb-4">Ton panier est vide.</h2>
                <p className="mb-8 text-foreground-muted">
                  Choisis ton coloris, on s’occupe du reste.
                </p>
                <Button size="lg" asChild>
                  <Link href="/produit">Voir le produit</Link>
                </Button>
              </FadeIn>
            ) : (
              <div className="grid gap-10 md:grid-cols-[1fr_360px] md:gap-12">
                {/* Items */}
                <FadeIn>
                  <ul className="flex flex-col gap-4">
                    {items.map((it) => (
                      <li
                        key={it.id}
                        className="flex gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm sm:gap-6 sm:p-6"
                      >
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-background ring-1 ring-border sm:h-28 sm:w-28">
                          <Image
                            src={it.image}
                            alt={it.alt}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-medium text-foreground leading-tight">
                                {it.name}
                              </p>
                              <p className="mt-1 text-small text-foreground-muted">
                                {it.colorLabel}
                              </p>
                            </div>
                            <button
                              type="button"
                              aria-label="Retirer du panier"
                              onClick={() => removeItem(it.id)}
                              className="shrink-0 text-foreground-subtle transition-colors hover:text-terracotta-deep"
                            >
                              <Trash2 size={18} strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="inline-flex items-center rounded-full border border-border">
                              <button
                                type="button"
                                aria-label="Diminuer"
                                onClick={() => updateQuantity(it.id, it.quantity - 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-l-full transition-colors hover:bg-stone-100"
                              >
                                <Minus size={14} strokeWidth={1.75} />
                              </button>
                              <span className="min-w-[3ch] px-3 text-center text-small tabular-nums">
                                {it.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Augmenter"
                                onClick={() => updateQuantity(it.id, it.quantity + 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-r-full transition-colors hover:bg-stone-100"
                              >
                                <Plus size={14} strokeWidth={1.75} />
                              </button>
                            </div>
                            <span className="font-display text-2xl tabular-nums text-foreground">
                              {formatPrice(it.price * it.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </FadeIn>

                {/* Récap */}
                <FadeIn delay={0.1}>
                  <aside className="sticky top-24 flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
                    <h2 className="text-h3 font-medium font-sans">Récapitulatif</h2>

                    <dl className="flex flex-col gap-2 text-small">
                      <div className="flex justify-between">
                        <dt className="text-foreground-muted">Sous-total</dt>
                        <dd className="tabular-nums">{formatPrice(total)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-foreground-muted">Livraison</dt>
                        <dd className="text-success">Offerte</dd>
                      </div>
                    </dl>

                    <div className="flex items-baseline justify-between border-t border-border pt-4">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="font-display text-2xl tabular-nums text-foreground">
                        {formatPrice(total)}
                      </span>
                    </div>

                    <Button size="lg" className="breathe" asChild>
                      <Link href="/checkout/livraison">Procéder au paiement</Link>
                    </Button>

                    <ul className="mt-2 flex flex-col gap-2 text-small text-foreground-muted">
                      <li className="flex items-center gap-2">
                        <Truck size={14} strokeWidth={1.5} className="text-terracotta" />
                        Livraison Colissimo en 2 à 4 jours
                      </li>
                      <li className="flex items-center gap-2">
                        <RotateCcw size={14} strokeWidth={1.5} className="text-terracotta" />
                        Premier cycle ou remboursée, sans question
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck size={14} strokeWidth={1.5} className="text-terracotta" />
                        Garantie 2 ans pièces & main d’œuvre
                      </li>
                    </ul>
                  </aside>
                </FadeIn>
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
