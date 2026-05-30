"use client";

import * as React from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/product";

/**
 * Charge Stripe.js paresseusement avec la clé publique.
 * Renvoie null si la clé manque → fallback vers form démo.
 */
let stripePromise: Promise<Stripe | null> | null = null;
function getStripePromise() {
  if (stripePromise) return stripePromise;
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!pk || pk.startsWith("pk_test_xxx") || pk.startsWith("pk_live_xxx")) {
    return null;
  }
  stripePromise = loadStripe(pk);
  return stripePromise;
}

type StripePaymentProps = {
  /** Montant total en centimes */
  amount: number;
  email?: string;
  metadata?: Record<string, string>;
  onSuccess: () => void;
};

/**
 * Bloc paiement Stripe Elements. Crée le PaymentIntent à l'init,
 * affiche le PaymentElement (carte + Apple Pay + Google Pay auto),
 * et appelle onSuccess() après confirmation.
 *
 * Si Stripe n'est pas configuré, renvoie null — la page parente
 * affiche alors son form démo.
 */
export function StripePayment(props: StripePaymentProps) {
  const promise = getStripePromise();
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [demo, setDemo] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/checkout/payment-intent", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            amount: props.amount,
            email: props.email,
            metadata: props.metadata,
          }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (data.demo) {
          setDemo(true);
        } else if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setLoadError(data.error ?? "Impossible de créer le paiement.");
        }
      } catch (e) {
        if (!cancelled) setLoadError("Erreur réseau.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [props.amount, props.email, props.metadata]);

  // Pas de clé publique → mode démo
  if (!promise || demo) return null;

  if (loadError) {
    return (
      <div className="rounded-lg bg-error-soft p-4 text-small text-foreground">
        {loadError}
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-surface p-4 text-small text-foreground-muted">
        <span className="loader-dot" />
        Chargement du paiement sécurisé…
      </div>
    );
  }

  return (
    <Elements
      stripe={promise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#C9726B",
            colorBackground: "#FFFFFF",
            colorText: "#1A1A1A",
            colorDanger: "#B44A41",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "10px",
          },
        },
      }}
    >
      <CheckoutForm amount={props.amount} onSuccess={props.onSuccess} />
    </Elements>
  );
}

function CheckoutForm({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setErrorMsg(null);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message ?? "Le paiement a échoué. Réessaie.");
      setSubmitting(false);
    } else {
      onSuccess();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PaymentElement
        options={{
          layout: "tabs",
          defaultValues: { billingDetails: { address: { country: "FR" } } },
        }}
      />

      <div className="flex items-start gap-2 text-small text-foreground-muted">
        <Lock size={14} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terracotta" />
        Paiement chiffré par Stripe (PCI-DSS). Aucune donnée carte
        n'atteint nos serveurs.
      </div>

      {errorMsg && (
        <p className="rounded-lg bg-error-soft p-3 text-small text-error">
          {errorMsg}
        </p>
      )}

      <Button type="submit" size="lg" className="breathe" disabled={!stripe || submitting}>
        {submitting ? "Paiement en cours…" : `Payer ${formatPrice(amount)}`}
      </Button>
    </form>
  );
}
