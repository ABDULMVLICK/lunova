import { Lock, ShieldCheck } from "lucide-react";

/**
 * Petit badge "paiement sécurisé" + logos méthodes de paiement neutres
 * (pas de logos officiels Visa/Mastercard pour éviter les pb de marque —
 * on utilise des représentations typographiques propres).
 */
export function PaymentTrust() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center gap-2 text-small text-foreground">
        <ShieldCheck size={16} strokeWidth={1.75} className="text-terracotta" />
        <span className="font-medium">Paiement 100 % sécurisé</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PayBadge label="Visa" />
        <PayBadge label="Mastercard" />
        <PayBadge label="Amex" />
        <PayBadge label="Apple Pay" />
        <PayBadge label="Google Pay" />
      </div>

      <p className="flex items-start gap-2 text-small text-foreground-muted">
        <Lock size={13} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terracotta" />
        Chiffrement SSL · Conformité PCI-DSS via Stripe · Aucune donnée
        carte stockée sur nos serveurs.
      </p>
    </div>
  );
}

function PayBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex h-7 items-center rounded-md border border-border bg-blanc px-2.5 text-[11px] font-medium tracking-[0.02em] text-foreground">
      {label}
    </span>
  );
}
