"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { product, formatPrice } from "@/lib/product";

/**
 * Calculateur d'économies — rend l'achat rationnel en plus d'émotionnel.
 * 2 sliders : boîtes d'antidouleurs par cycle + prix par boîte.
 * Affiche le coût annuel vs Lunova 44 €, et l'économie sur 5 ans.
 */
export function SavingsCalculator() {
  const [boxesPerCycle, setBoxesPerCycle] = React.useState(2);
  const [pricePerBox, setPricePerBox] = React.useState(6);

  // 12 cycles par an (moyenne)
  const annualCost = boxesPerCycle * pricePerBox * 12;
  const lunovaPrice = product.price / 100; // 44 €
  const firstYearSaving = annualCost - lunovaPrice;
  const fiveYearSaving = annualCost * 5 - lunovaPrice;

  return (
    <section className="section-py bg-surface-alt">
      <div className="container-lunova">
        <div className="mb-10 max-w-2xl">
          <Badge variant="outline" className="mb-4">Le calcul honnête</Badge>
          <h2>Combien tu dépenses vraiment en antidouleurs ?</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:items-start md:gap-12">
          {/* Inputs */}
          <div className="flex flex-col gap-8 rounded-2xl bg-surface p-8 shadow-sm md:p-10">
            <div className="flex items-center gap-3">
              <Calculator size={22} strokeWidth={1.5} className="text-terracotta" />
              <h3 className="font-display text-2xl text-foreground">Ta réalité actuelle</h3>
            </div>

            <SliderField
              label="Boîtes d’antidouleurs par cycle"
              hint="Une boîte = 20 à 24 comprimés"
              min={1}
              max={5}
              step={1}
              value={boxesPerCycle}
              onChange={setBoxesPerCycle}
              format={(v) => `${v} boîte${v > 1 ? "s" : ""}`}
            />

            <SliderField
              label="Prix moyen d’une boîte"
              hint="Ibuprofène 400 mg en pharmacie ≈ 6 €"
              min={4}
              max={10}
              step={1}
              value={pricePerBox}
              onChange={setPricePerBox}
              format={(v) => `${v} €`}
            />

            <p className="rounded-md bg-stone-50 p-3 text-small text-foreground-muted">
              Base : 12 cycles par an. Le calcul ne compte pas le temps perdu,
              les RTT posées, ni les sorties annulées.
            </p>
          </div>

          {/* Résultat */}
          <motion.div
            layout
            className="flex flex-col gap-6 rounded-2xl bg-noir p-8 text-blanc shadow-lg md:p-10"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={22} strokeWidth={1.5} className="text-terracotta" />
              <h3 className="font-display text-2xl text-blanc">Ce que ça représente</h3>
            </div>

            <div>
              <p className="text-small text-blanc/60">Tu dépenses chaque année</p>
              <motion.p
                key={annualCost}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-display text-5xl text-terracotta sm:text-6xl"
              >
                {annualCost} €
              </motion.p>
              <p className="mt-1 text-small text-blanc/50">
                en antidouleurs uniquement
              </p>
            </div>

            <div className="h-px bg-blanc/15" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-small text-blanc/60">Lunova, une fois</p>
                <p className="font-display text-3xl text-blanc">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div>
                <p className="text-small text-blanc/60">Tu économises dès la 1<sup>re</sup> année</p>
                <motion.p
                  key={firstYearSaving}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-3xl text-terracotta"
                >
                  {firstYearSaving > 0 ? `${firstYearSaving} €` : "—"}
                </motion.p>
              </div>
            </div>

            {fiveYearSaving > 0 && (
              <motion.p
                key={fiveYearSaving}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-md bg-blanc/5 p-4 text-small text-blanc/80"
              >
                Sur <strong className="text-blanc">5 ans</strong>, c’est{" "}
                <strong className="text-terracotta">{fiveYearSaving} €</strong>{" "}
                que tu peux garder pour autre chose.
              </motion.p>
            )}

            <Button size="lg" className="breathe mt-2 w-full" asChild>
              <Link href="/produit">Je veux Lunova — {formatPrice(product.price)}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-small font-medium text-foreground">{label}</label>
        <span className="font-display text-2xl tabular-nums text-terracotta-deep">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lunova-slider"
        style={
          {
            "--pct": `${pct}%`,
          } as React.CSSProperties
        }
        aria-label={label}
      />
      {hint && <p className="text-small text-foreground-muted">{hint}</p>}
    </div>
  );
}
