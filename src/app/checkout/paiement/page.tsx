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
import { PaymentTrust } from "@/components/checkout/payment-trust";
import { StripePayment } from "@/components/checkout/stripe-payment";
import { useCartStore, useCartTotal, useCartHydrated } from "@/lib/cart-store";
import { useCheckoutStore, generateOrderId } from "@/lib/checkout-store";

export default function PaiementPage() {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const total = useCartTotal();
  const shipping = useCheckoutStore((s) => s.shipping);
  const orderId = useCheckoutStore((s) => s.orderId);
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const setOrderId = useCheckoutStore((s) => s.setOrderId);

  // Redirige si conditions pas remplies.
  React.useEffect(() => {
    if (!hydrated) return;
    if (orderId) return;
    if (items.length === 0) router.replace("/panier");
    else if (!shipping) router.replace("/checkout/livraison");
  }, [hydrated, items.length, shipping, orderId, router]);

  /**
   * Appelé par Stripe quand le paiement réussit OU par le form démo
   * à la soumission.
   * 1. Stocke paiement + génère orderId
   * 2. Envoie l'email de confirmation (best-effort, n'attend pas)
   * 3. Vide le panier + navigue vers /confirmation
   */
  const finalize = React.useCallback(
    (payment: { cardName: string; cardLast4: string; expiry: string }) => {
      setPayment(payment);
      const id = generateOrderId();
      setOrderId(id);

      // Snapshot items pour l'email AVANT clearCart
      const snapshotItems = items.map((it) => ({
        name: it.name,
        colorLabel: it.colorLabel,
        quantity: it.quantity,
        price: it.price,
        image: it.image,
      }));

      // Email de confirmation — best-effort, on n'attend pas la réponse
      if (shipping) {
        fetch("/api/checkout/confirmation", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            orderId: id,
            email: shipping.email,
            firstName: shipping.firstName,
            items: snapshotItems,
            total,
            shipping,
          }),
        }).catch((e) => {
          console.warn("Email confirmation non envoyé:", e);
        });
      }

      clearCart();
      router.push("/checkout/confirmation");
    },
    [items, total, shipping, setPayment, setOrderId, clearCart, router]
  );

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
            <StripeOrDemoPayment
              amount={total}
              email={shipping?.email}
              metadata={shipping ? { firstName: shipping.firstName, city: shipping.city } : undefined}
              onSuccess={() =>
                finalize({
                  cardName: shipping
                    ? `${shipping.firstName} ${shipping.lastName}`
                    : "Stripe",
                  cardLast4: "••••",
                  expiry: "Stripe",
                })
              }
              onDemoSubmit={finalize}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-4">
              <CheckoutSummary />
              <PaymentTrust />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/**
 * Essaie de monter StripePayment. Si Stripe n'est pas configuré
 * (composant renvoie null), affiche le form démo en fallback.
 */
function StripeOrDemoPayment({
  amount,
  email,
  metadata,
  onSuccess,
  onDemoSubmit,
}: {
  amount: number;
  email?: string;
  metadata?: Record<string, string>;
  onSuccess: () => void;
  onDemoSubmit: (p: { cardName: string; cardLast4: string; expiry: string }) => void;
}) {
  const [stripeUnavailable, setStripeUnavailable] = React.useState(false);

  // On essaie d'abord Stripe via une probe à l'API
  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/checkout/payment-intent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount: 100, _probe: true }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.demo) setStripeUnavailable(true);
      })
      .catch(() => {
        if (!cancelled) setStripeUnavailable(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stripeUnavailable) {
    return <StripePayment amount={amount} email={email} metadata={metadata} onSuccess={onSuccess} />;
  }

  return <DemoPaymentForm onSubmit={onDemoSubmit} />;
}

/**
 * Formulaire démo — utilisé quand Stripe n'est pas configuré.
 * Aucun paiement réel n'est traité.
 */
function DemoPaymentForm({
  onSubmit,
}: {
  onSubmit: (p: { cardName: string; cardLast4: string; expiry: string }) => void;
}) {
  const [form, setForm] = React.useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1100));
    const last4 = form.cardNumber.replace(/\s/g, "").slice(-4) || "0000";
    onSubmit({ cardName: form.cardName, cardLast4: last4, expiry: form.expiry });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Nom sur la carte" htmlFor="cardName">
        <Input id="cardName" required autoComplete="cc-name" placeholder="Prénom Nom" value={form.cardName} onChange={update("cardName")} />
      </Field>

      <Field label="Numéro de carte" htmlFor="cardNumber">
        <Input id="cardNumber" required autoComplete="cc-number" inputMode="numeric" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={update("cardNumber")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date d’expiration" htmlFor="expiry">
          <Input id="expiry" required autoComplete="cc-exp" inputMode="numeric" placeholder="MM/AA" value={form.expiry} onChange={update("expiry")} />
        </Field>
        <Field label="Cryptogramme (CVC)" htmlFor="cvc">
          <Input id="cvc" required autoComplete="cc-csc" inputMode="numeric" placeholder="123" value={form.cvc} onChange={update("cvc")} />
        </Field>
      </div>

      <div className="rounded-lg bg-stone-50 p-4 text-small text-foreground-muted">
        <p className="flex items-start gap-2">
          <Lock size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terracotta" />
          Démo — Stripe pas encore configuré. Ajoute tes clés dans
          <code className="mx-1 rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs">.env.local</code>
          pour activer le vrai paiement.
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
  );
}
