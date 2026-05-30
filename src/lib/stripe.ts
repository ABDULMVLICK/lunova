import "server-only";
import Stripe from "stripe";

/**
 * Singleton Stripe côté serveur. Lance une erreur claire si la clé est
 * absente — typiquement quand .env.local n'a pas encore été créé.
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY manquante. Ajoute-la dans .env.local (dev) ou Vercel env vars (prod)."
    );
  }
  _stripe = new Stripe(key, {
    typescript: true,
    appInfo: { name: "Lunova", version: "0.1.0" },
  });
  return _stripe;
}

/**
 * Vérifie si Stripe est configuré sans lancer d'erreur.
 * Utile côté API pour basculer entre mode démo et mode réel.
 */
export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY;
}
