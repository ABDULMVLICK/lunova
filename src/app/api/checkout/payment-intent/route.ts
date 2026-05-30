import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

type PaymentIntentBody = {
  /** Montant TOTAL en centimes (ex: 7500 pour 75 €) */
  amount: number;
  /** Email du client (option) */
  email?: string;
  /** Description courte affichée dans Stripe Dashboard */
  description?: string;
  /** Metadata libre — typiquement orderId, items, etc. */
  metadata?: Record<string, string>;
};

export async function POST(req: Request) {
  // Mode démo si Stripe pas configuré → renvoie un fake client_secret
  // qui permet à la page checkout de continuer en démo.
  if (!isStripeConfigured()) {
    return NextResponse.json({
      demo: true,
      clientSecret: "demo_client_secret",
      message:
        "Stripe non configuré (STRIPE_SECRET_KEY manquante). Le checkout fonctionne en mode démo.",
    });
  }

  let body: PaymentIntentBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalide." }, { status: 400 });
  }

  const { amount, email, description, metadata } = body;
  if (!amount || amount < 50) {
    return NextResponse.json(
      { error: "Montant invalide (minimum 50 centimes)." },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      description: description ?? "Commande Lunova",
      metadata: metadata ?? {},
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      id: intent.id,
    });
  } catch (err) {
    console.error("[Stripe] PaymentIntent error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement." },
      { status: 500 }
    );
  }
}
