"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { Gift, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { useConsentStore } from "@/lib/consent-store";

const STORAGE_KEY = "lunova-newsletter-popup";
const PROMO_CODE = "BIENVENUE10";
const SHOW_AFTER_MS = 25_000;     // 25 s sur le site
const COOLDOWN_DAYS = 30;         // ne pas re-spammer pendant 30 jours

type LocalState =
  | { decided: false }
  | { decided: true; subscribedAt: number }
  | { decided: true; dismissedAt: number };

function readState(): LocalState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { decided: false };
    return JSON.parse(raw);
  } catch {
    return { decided: false };
  }
}

function writeState(s: LocalState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* private mode */
  }
}

/**
 * Popup newsletter "−10 % première commande".
 * - Apparaît après 25s ou exit intent (mouse leave vers le haut).
 * - Ne réapparaît pas pendant 30 jours après dismiss/subscribe.
 * - Respecte le consentement cookies (skip si marketing refusé).
 */
export function NewsletterPopup() {
  const marketingConsent = useConsentStore((s) => s.categories.marketing);
  const consentDecided = useConsentStore((s) => s.decided);

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (!consentDecided) return;

    const state = readState();
    if (state.decided) {
      const last =
        "subscribedAt" in state ? state.subscribedAt : state.dismissedAt;
      const ageMs = Date.now() - last;
      const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
      if (ageMs < cooldownMs) return;
    }

    let dismissed = false;
    let exitTimer: number | null = null;

    const show = () => {
      if (dismissed) return;
      dismissed = true;
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const t = window.setTimeout(show, SHOW_AFTER_MS);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, [consentDecided, marketingConsent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return;
    // Démo : on stocke l'email en local. En prod → appel à Klaviyo / Resend.
    writeState({ decided: true, subscribedAt: Date.now() });
    setSubmitted(true);
  };

  const handleClose = () => {
    if (!submitted) writeState({ decided: true, dismissedAt: Date.now() });
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => (o ? null : handleClose())}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 bg-noir/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
              >
                <div className="relative overflow-hidden rounded-2xl bg-surface shadow-xl">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Fermer"
                      className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blanc/80 backdrop-blur transition-colors hover:bg-stone-100"
                    >
                      <X size={18} strokeWidth={1.75} />
                    </button>
                  </Dialog.Close>

                  {submitted ? (
                    <SuccessPanel onClose={handleClose} />
                  ) : (
                    <FormPanel
                      email={email}
                      onChange={setEmail}
                      onSubmit={handleSubmit}
                      onDismiss={handleClose}
                    />
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function FormPanel({
  email,
  onChange,
  onSubmit,
  onDismiss,
}: {
  email: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDismiss: () => void;
}) {
  return (
    <div className="px-8 pb-8 pt-12 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-soft">
        <Gift size={26} strokeWidth={1.5} className="text-terracotta" />
      </div>

      <Dialog.Title className="font-display text-3xl text-foreground">
        −10 % sur ta première Lunova.
      </Dialog.Title>

      <Dialog.Description className="mt-3 text-foreground-muted">
        On t&apos;envoie le code par email. Plus quelques conseils utiles pour
        ton prochain cycle. Pas de spam, promis.
      </Dialog.Description>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 text-left">
        <Field label="Ton email" htmlFor="popup-email">
          <Input
            id="popup-email"
            type="email"
            required
            placeholder="prenom@exemple.fr"
            value={email}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        </Field>

        <Button type="submit" size="lg" className="breathe w-full">
          Je veux mes −10 %
        </Button>

        <button
          type="button"
          onClick={onDismiss}
          className="mt-2 text-xs text-foreground-subtle underline underline-offset-2 hover:text-foreground-muted"
        >
          Non merci, je paie le plein tarif
        </button>
      </form>
    </div>
  );
}

function SuccessPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-8 pb-8 pt-12 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success-soft">
        <Check size={26} strokeWidth={2} className="text-success" />
      </div>

      <Dialog.Title className="font-display text-3xl text-foreground">
        Inscrite ! 🌙
      </Dialog.Title>

      <Dialog.Description className="mt-3 text-foreground-muted">
        Voilà ton code. Tu peux l&apos;utiliser à ta première commande.
      </Dialog.Description>

      <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-lg border border-dashed border-terracotta bg-terracotta-soft px-5 py-3">
        <span className="font-mono text-2xl tracking-[0.15em] text-terracotta-deep">
          {PROMO_CODE}
        </span>
      </div>

      <p className="mt-4 text-small text-foreground-muted">
        −10 % valable une fois, sur toute commande. Aussi envoyé sur ton email.
      </p>

      <Button onClick={onClose} className="mt-6 w-full">
        Je vais voir le produit
      </Button>
    </div>
  );
}
