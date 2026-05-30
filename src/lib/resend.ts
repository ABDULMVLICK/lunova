import "server-only";
import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY manquante. Ajoute-la dans .env.local (dev) ou Vercel env vars (prod)."
    );
  }
  _resend = new Resend(key);
  return _resend;
}

export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

/** Email "from" — utilise le domaine vérifié sur Resend. */
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Lunova <hello@lunova.fr>";
