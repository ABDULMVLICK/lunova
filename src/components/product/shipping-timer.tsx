"use client";

import * as React from "react";
import { Truck } from "lucide-react";

/**
 * Timer expédition RÉEL (pas un faux countdown).
 * Cutoff : 14h00 du lundi au vendredi.
 * - Avant cutoff : "Expédiée aujourd'hui dans Xh Ymin"
 * - Après cutoff (ou weekend) : "Expédiée demain / lundi"
 */
export function ShippingTimer() {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // SSR-safe : on n'affiche rien tant qu'on n'a pas l'heure côté client
  if (!now) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3 text-small text-foreground-muted">
        <Truck size={16} strokeWidth={1.5} className="text-terracotta" />
        Expédition rapide — livraison Colissimo
      </div>
    );
  }

  const day = now.getDay(); // 0 = dim, 6 = sam
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const isWeekend = day === 0 || day === 6;
  const beforeCutoff = !isWeekend && hours < 14;

  let title: string;
  let detail: string;

  if (beforeCutoff) {
    const remainingMin = (14 - hours) * 60 - minutes;
    const h = Math.floor(remainingMin / 60);
    const m = remainingMin % 60;
    title = "Commande maintenant — expédiée aujourd’hui";
    detail = `Plus que ${h > 0 ? `${h} h ${m.toString().padStart(2, "0")}` : `${m} min`} avant le cut-off`;
  } else {
    // Prochain jour ouvré
    let label = "demain";
    if (day === 5 && hours >= 14) label = "lundi";       // vendredi après cutoff
    else if (day === 6) label = "lundi";                  // samedi
    else if (day === 0) label = "lundi";                  // dimanche
    title = `Expédiée ${label}`;
    detail = "Préparée avec attention dès le prochain jour ouvré";
  }

  return (
    <div className="flex items-start gap-3 rounded-lg bg-success-soft/60 px-4 py-3">
      <span className="relative mt-0.5 flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
      </span>
      <div className="flex flex-col">
        <p className="text-small font-medium text-foreground">{title}</p>
        <p className="text-small text-foreground-muted">
          {detail} · Reçue avant tes prochaines règles.
        </p>
      </div>
    </div>
  );
}
