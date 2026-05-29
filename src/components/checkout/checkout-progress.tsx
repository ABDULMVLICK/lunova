"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = { id: string; label: string; href: string };

const STEPS: Step[] = [
  { id: "livraison", label: "Livraison", href: "/checkout/livraison" },
  { id: "paiement", label: "Paiement", href: "/checkout/paiement" },
  { id: "confirmation", label: "Confirmation", href: "/checkout/confirmation" },
];

/**
 * Barre de progression 3 étapes — brand book exige ce composant.
 * L'étape courante est en terracotta, les passées en noir avec checkmark,
 * les futures en stone.
 */
export function CheckoutProgress({ current }: { current: Step["id"] }) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Étapes du paiement" className="mb-12">
      <ol className="flex items-center justify-center gap-3 sm:gap-6">
        {STEPS.map((step, i) => {
          const isCurrent = i === currentIdx;
          const isPast = i < currentIdx;
          const isFuture = i > currentIdx;

          return (
            <li key={step.id} className="flex items-center gap-3 sm:gap-6">
              {isPast ? (
                <Link href={step.href} className="flex items-center gap-2 group">
                  <Bubble state="past" index={i + 1} />
                  <span className="hidden text-small text-foreground group-hover:text-terracotta-deep sm:inline">
                    {step.label}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Bubble state={isCurrent ? "current" : "future"} index={i + 1} />
                  <span
                    className={cn(
                      "hidden text-small sm:inline",
                      isCurrent ? "font-medium text-foreground" : "text-foreground-subtle"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              )}

              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "h-px w-8 sm:w-16",
                    isPast || isCurrent ? "bg-terracotta" : "bg-stone-200"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Bubble({
  state,
  index,
}: {
  state: "past" | "current" | "future";
  index: number;
}) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full text-small font-medium transition-colors",
        state === "past" && "bg-noir text-blanc",
        state === "current" && "bg-terracotta text-blanc",
        state === "future" && "bg-stone-100 text-foreground-subtle"
      )}
    >
      {state === "past" ? <Check size={14} strokeWidth={2.25} /> : index}
    </span>
  );
}
