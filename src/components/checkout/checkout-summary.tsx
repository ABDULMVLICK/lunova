"use client";

import Image from "next/image";
import { useCartStore, useCartTotal, useCartHydrated } from "@/lib/cart-store";
import { formatPrice } from "@/lib/product";

/**
 * Bloc récapitulatif affiché à droite du tunnel checkout (et au-dessus du
 * formulaire sur mobile via collapsible — TODO si besoin).
 */
export function CheckoutSummary() {
  const items = useCartStore((s) => s.items);
  const total = useCartTotal();
  const hydrated = useCartHydrated();

  if (!hydrated) return <aside className="hidden lg:block" aria-hidden />;

  return (
    <aside className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="font-display text-xl text-foreground">Ta commande</h2>

      <ul className="flex flex-col gap-3">
        {items.map((it) => (
          <li key={it.id} className="flex gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background ring-1 ring-border">
              <Image
                src={it.image}
                alt={it.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-noir px-1 text-[10px] font-medium text-blanc tabular-nums">
                {it.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-small font-medium text-foreground leading-tight">
                {it.name}
              </p>
              <p className="text-small text-foreground-muted">{it.colorLabel}</p>
            </div>
            <span className="text-small tabular-nums text-foreground">
              {formatPrice(it.price * it.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="flex flex-col gap-2 border-t border-border pt-4 text-small">
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
    </aside>
  );
}
