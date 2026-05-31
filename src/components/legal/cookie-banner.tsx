"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsentStore, useConsentHydrated } from "@/lib/consent-store";
import { cn } from "@/lib/utils";

/**
 * Bandeau cookies conforme aux recommandations CNIL :
 * - Bouton refus aussi visible et accessible que bouton accept
 * - "Personnaliser" pour choisir les catégories
 * - Aucun traceur déclenché tant que pas de consentement
 * - Persistance 13 mois max via localStorage
 */
export function CookieBanner() {
  const hydrated = useConsentHydrated();
  const decided = useConsentStore((s) => s.decided);
  const setAll = useConsentStore((s) => s.setAll);
  const setCategories = useConsentStore((s) => s.setCategories);
  const categories = useConsentStore((s) => s.categories);

  const [customMode, setCustomMode] = React.useState(false);

  // Pendant l'hydratation, on n'affiche rien (évite flash)
  if (!hydrated || decided) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-label="Préférences cookies"
        aria-live="polite"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl bg-surface shadow-xl ring-1 ring-border md:bottom-6"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-soft">
              <Cookie size={20} strokeWidth={1.75} className="text-terracotta" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl text-foreground">
                On respecte ton choix.
              </h2>
              <p className="mt-2 text-small text-foreground-muted">
                On utilise des cookies essentiels au panier et au paiement
                (toujours actifs). Pour la mesure d&apos;audience et les pubs,
                on a besoin de ton accord. Tu peux changer d&apos;avis à tout
                moment via{" "}
                <Link
                  href="/confidentialite"
                  className="text-link underline underline-offset-2"
                >
                  notre politique de confidentialité
                </Link>
                .
              </p>
            </div>
          </div>

          {customMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 overflow-hidden border-t border-border pt-6"
            >
              <ul className="flex flex-col gap-4">
                <CategoryToggle
                  label="Cookies essentiels"
                  description="Panier, session, paiement sécurisé. Indispensables."
                  enabled={true}
                  disabled
                  onChange={() => {}}
                />
                <CategoryToggle
                  label="Mesure d’audience anonymisée"
                  description="Pour comprendre quelles pages aident vraiment. Aucune donnée personnelle, jamais revendue."
                  enabled={categories.analytics}
                  onChange={(v) => setCategories({ analytics: v })}
                />
                <CategoryToggle
                  label="Publicité ciblée"
                  description="Pixels Meta / TikTok pour mesurer nos pubs. Tu peux refuser sans impact sur le site."
                  enabled={categories.marketing}
                  onChange={(v) => setCategories({ marketing: v })}
                />
              </ul>
            </motion.div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setAll(false)}
              className="order-2 sm:order-1"
            >
              Tout refuser
            </Button>
            <Button
              variant="link"
              size="md"
              type="button"
              onClick={() => setCustomMode((v) => !v)}
              className="order-3 sm:order-2"
            >
              {customMode ? "Masquer" : "Personnaliser"}
            </Button>
            <Button
              size="md"
              onClick={() => {
                if (customMode) {
                  // Garde les categories actuelles + mark decided
                  setCategories(categories);
                } else {
                  setAll(true);
                }
              }}
              className="order-1 sm:order-3"
            >
              {customMode ? "Valider mes choix" : "Tout accepter"}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CategoryToggle({
  label,
  description,
  enabled,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-small text-foreground-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-[var(--duration-base)]",
          enabled ? "bg-terracotta" : "bg-stone-200",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 inline-block h-5 w-5 rounded-full bg-blanc shadow-sm transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)]",
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </li>
  );
}
