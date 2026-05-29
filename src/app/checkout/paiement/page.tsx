"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/fade-in";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { useCartStore, useCartHydrated } from "@/lib/cart-store";
import { useCheckoutStore, generateOrderId } from "@/lib/checkout-store";

export default function PaiementPage() {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const shipping = useCheckoutStore((s) => s.shipping);
  const orderId = useCheckoutStore((s) => s.orderId);
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const setOrderId = useCheckoutStore((s) => s.setOrderId);

  const [form, setForm] = React.useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  // Redirige si conditions pas remplies. Skip si une commande vient d'être
  // confirmée (orderId set + cart vidé) — la navigation vers /confirmation
  // est en cours.
  React.useEffect(() => {
    if (!hydrated) return;
    if (orderId) return;
    if (items.length === 0) router.replace("/panier");
    else if (!shipping) router.replace("/checkout/livraison");
  }, [hydrated, items.length, shipping, orderId, router]);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "cardNumber") v = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (k === "expiry") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setForm({ ...form, [k]: v });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Démo : on simule un appel de paiement (à remplacer par Stripe Elements)
    await new Promise((r) => setTimeout(r, 1100));

    const last4 = form.cardNumber.replace(/\s/g, "").slice(-4) || "0000";
    setPayment({ cardName: form.cardName, cardLast4: last4, expiry: form.expiry });

    const orderId = generateOrderId();
    setOrderId(orderId);
    clearCart();

    router.push("/checkout/confirmation");
  };

  return (
    <section className="section-py">
      <Container className="max-w-5xl">
        <CheckoutProgress current="paiement" />

        <FadeIn>
          <h1 className="mb-2 text-h2">Comment tu paies ?</h1>
          <p className="mb-8 text-foreground-muted">
            Paiement chiffré · aucune donnée stockée sur nos serveurs.
          </p>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
          <FadeIn>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <Field label="Nom sur la carte" htmlFor="cardName">
                <Input
                  id="cardName"
                  required
                  autoComplete="cc-name"
                  placeholder="Prénom Nom"
                  value={form.cardName}
                  onChange={update("cardName")}
                />
              </Field>

              <Field label="Numéro de carte" htmlFor="cardNumber">
                <Input
                  id="cardNumber"
                  required
                  autoComplete="cc-number"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={update("cardNumber")}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Date d’expiration" htmlFor="expiry">
                  <Input
                    id="expiry"
                    required
                    autoComplete="cc-exp"
                    inputMode="numeric"
                    placeholder="MM/AA"
                    value={form.expiry}
                    onChange={update("expiry")}
                  />
                </Field>
                <Field label="Cryptogramme (CVC)" htmlFor="cvc">
                  <Input
                    id="cvc"
                    required
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    placeholder="123"
                    value={form.cvc}
                    onChange={update("cvc")}
                  />
                </Field>
              </div>

              <div className="rounded-lg bg-stone-50 p-4 text-small text-foreground-muted">
                <p className="flex items-start gap-2">
                  <Lock size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terracotta" />
                  Démo : aucun paiement réel n’est traité. En production, ce
                  formulaire passe par Stripe Elements (PCI-DSS).
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button variant="link" type="button" asChild>
                  <Link href="/checkout/livraison">← Retour à la livraison</Link>
                </Button>
                <Button type="submit" size="lg" className="breathe" disabled={submitting}>
                  {submitting ? "Paiement en cours…" : "Confirmer la commande"}
                </Button>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CheckoutSummary />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
