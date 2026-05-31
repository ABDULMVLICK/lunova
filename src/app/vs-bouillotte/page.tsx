import Link from "next/link";
import {
  Thermometer,
  Clock3,
  Footprints,
  Battery,
  Droplet,
  Heart,
  CheckCircle2,
  X,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerChild } from "@/components/motion/stagger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatPrice, product } from "@/lib/product";

export const metadata = {
  title: "Ceinture chauffante vs bouillotte — la vraie différence",
  description:
    "Pourquoi une ceinture chauffante électrique soulage mieux que la bouillotte traditionnelle. Comparaison honnête, chaleur, mobilité, sécurité.",
  alternates: { canonical: "/vs-bouillotte" },
};

export default function VsBouillottePage() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="section-py">
          <Container className="max-w-3xl text-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">Comparaison honnête</Badge>
              <h1 className="mb-6">
                Bouillotte vs ceinture chauffante — la vraie différence.
              </h1>
              <p className="text-foreground-muted text-lg">
                La bouillotte a sauvé des générations de femmes. Mais en 2026,
                elle a 200 ans. Voici ce que tu gagnes en passant à une
                solution moderne — et ce que tu perds aussi.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* TABLEAU COMPARATIF */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-4xl">
            <FadeIn className="mb-12">
              <h2 className="mb-3">Tout sur la table.</h2>
              <p className="text-foreground-muted">
                Aucune des deux n&apos;est parfaite. Voici les vraies différences,
                sans habillage.
              </p>
            </FadeIn>

            <FadeIn>
              <div className="overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-stone-50">
                      <th className="px-6 py-5 font-sans text-small font-medium text-foreground-muted">Critère</th>
                      <th className="px-6 py-5 font-display text-lg text-terracotta">Lunova</th>
                      <th className="px-6 py-5 font-sans text-small font-medium text-foreground-muted">Bouillotte</th>
                    </tr>
                  </thead>
                  <tbody className="text-small">
                    {(
                      [
                        ["Chaleur en moins de 30 secondes", true, false],
                        ["Cycles relançables à volonté", true, false],
                        ["Mobilité totale — mains libres", true, false],
                        ["Discrète sous les vêtements", true, false],
                        ["Massage par vibrations intégré", true, false],
                        ["Sans risque de brûlure (coupure auto)", true, false],
                        ["Pas de remplissage d'eau bouillante", true, false],
                        ["Réutilisable des années", true, true],
                        ["Sans électronique à recharger", false, true],
                        ["Prix d'achat initial bas", false, true],
                      ] as const
                    ).map(([crit, l, b]) => (
                      <tr key={crit} className="border-b border-border last:border-0 transition-colors hover:bg-terracotta-soft/30">
                        <td className="px-6 py-4 font-medium text-foreground">{crit}</td>
                        <Cell ok={l} />
                        <Cell ok={b} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* 4 RAISONS */}
        <section className="section-py">
          <Container>
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Les vrais gains</Badge>
              <h2>Pourquoi on est passées à la ceinture.</h2>
            </FadeIn>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {[
                {
                  Icon: Thermometer,
                  title: "Chaleur en 30 s",
                  body: "La bouillotte met 5 min à monter et perd sa chaleur en 30 min. Lunova chauffe en 30 secondes et tient des cycles entiers.",
                },
                {
                  Icon: Footprints,
                  title: "Mains libres",
                  body: "Tu marches, tu travailles, tu prends le métro. Avec la bouillotte, soit tu la tiens, soit elle tombe.",
                },
                {
                  Icon: Droplet,
                  title: "Zéro brûlure",
                  body: "Plus d'eau bouillante à transvaser. La coupure automatique évite toute surchauffe cutanée.",
                },
                {
                  Icon: Heart,
                  title: "Massage intégré",
                  body: "Quatre modes de vibrations basse fréquence détendent les muscles. La bouillotte ne fait que chauffer.",
                },
              ].map(({ Icon, title, body }) => (
                <StaggerChild key={title}>
                  <article className="card-lift h-full rounded-xl bg-surface p-6 shadow-sm">
                    <Icon className="mb-5 text-terracotta" size={26} strokeWidth={1.5} />
                    <h3 className="mb-2 text-h3">{title}</h3>
                    <p className="text-small text-foreground-muted">{body}</p>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* HONNÊTETÉ */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-3xl">
            <FadeIn>
              <Badge variant="outline" className="mb-4">Quand la bouillotte gagne</Badge>
              <h2 className="mb-8">Cas où on te dit de garder la bouillotte.</h2>

              <ul className="flex flex-col gap-4 text-foreground-muted text-lg">
                {[
                  "Tu as zéro budget — la bouillotte à 8 € fait son job basique.",
                  "Tu l'utilises pour autre chose que les règles (pieds froids, lombaire) et tu veux UN seul objet.",
                  "Tu n'aimes pas l'idée d'avoir un truc à recharger.",
                  "Tu vis dans un endroit où le réseau électrique n'est pas fiable.",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-foreground-muted" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-xl bg-terracotta-soft/50 p-6 text-foreground">
                <p className="font-display text-xl leading-relaxed">
                  Pour tout le reste — sortir, travailler, dormir, voyager —
                  Lunova le fait mieux. C&apos;est aussi simple que ça.
                </p>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* SCIENCE */}
        <section className="section-py">
          <Container className="max-w-3xl">
            <FadeIn>
              <Badge variant="outline" className="mb-4">La science</Badge>
              <h2 className="mb-6">Chaleur ciblée — pas un effet placebo.</h2>
              <div className="flex flex-col gap-4 text-foreground-muted text-lg">
                <p>
                  La chaleur à 38-40 °C appliquée sur le bas-ventre détend les
                  fibres musculaires de l&apos;utérus et augmente le flux
                  sanguin local. Résultat : les contractions douloureuses
                  s&apos;atténuent en quelques minutes.
                </p>
                <p>
                  Une étude de l&apos;
                  <em>American Journal of Obstetrics and Gynecology</em> (Akin
                  et al., 2001) a montré que la chaleur ciblée à 39 °C pendant
                  4 heures était <strong className="text-foreground">aussi efficace que
                  400 mg d&apos;ibuprofène</strong> sur les douleurs menstruelles —
                  sans effet secondaire.
                </p>
                <p>
                  La bouillotte le fait. La ceinture aussi — mais elle le fait
                  plus longtemps, sans surveillance, et avec mobilité.
                </p>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* FAQ COURTE SEO */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-3xl">
            <FadeIn className="mb-10 text-center">
              <h2>Les questions qu&apos;on se pose en passant.</h2>
            </FadeIn>

            <FadeIn>
              <Accordion type="single" collapsible className="rounded-xl bg-surface px-6 shadow-sm">
                {[
                  {
                    q: "Est-ce qu'une ceinture chauffante remplace vraiment la bouillotte ?",
                    a: "Oui, pour tout usage mobile. La ceinture chauffe en 30 secondes, maintient la chaleur sur cycles relançables, et libère les mains. La bouillotte garde un intérêt pour un usage statique au lit ou sur le canapé, et coûte moins cher à l'achat.",
                  },
                  {
                    q: "C'est vraiment plus efficace ou c'est du marketing ?",
                    a: "L'efficacité de la chaleur sur les douleurs menstruelles est documentée depuis 2001. Les deux fonctionnent. La ceinture est mieux conçue pour un usage prolongé et mobile, c'est sa vraie valeur ajoutée — pas une chaleur magique.",
                  },
                  {
                    q: "Combien de temps tient la chaleur d'une ceinture chauffante ?",
                    a: "Lunova fonctionne par cycles de 15 ou 30 minutes relançables. Une bouillotte standard tient environ 30 minutes aussi, mais ne peut pas être 'relancée' — il faut la rebouillir.",
                  },
                  {
                    q: "Risque de brûlure avec une ceinture électrique ?",
                    a: "Beaucoup moins qu'avec une bouillotte mal préparée. La ceinture a une température plafonnée et une coupure automatique. L'eau bouillante d'une bouillotte qui fuit est une cause fréquente de brûlure domestique.",
                  },
                  {
                    q: "Pourquoi prendre Lunova plutôt qu'une ceinture chauffante générique ?",
                    a: "Lunova ajoute 4 modes de massage par vibrations, deux coloris pensés pour rester discrets, un service client français, une garantie premier cycle ou remboursée, et un manifesto qui vise plus loin qu'un produit. Le reste, c'est du chauffage électrique standard — efficace, mais sans marque.",
                  },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`q-${i}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </Container>
        </section>

        {/* CTA */}
        <section className="section-py">
          <Container>
            <FadeIn>
              <div className="rounded-2xl bg-noir px-8 py-16 text-center text-blanc md:px-16 md:py-20">
                <h2 className="text-blanc mx-auto max-w-[22ch]">
                  Prête à mettre ta bouillotte au placard ?
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-blanc/70">
                  Premier cycle ou remboursée. Si Lunova ne te change pas la
                  vie, on te rembourse intégralement.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" className="breathe" asChild>
                    <Link href="/produit">Je veux Lunova — {formatPrice(product.price)}</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Cell({ ok }: { ok: boolean }) {
  return (
    <td className="px-6 py-4">
      {ok ? (
        <CheckCircle2 size={20} strokeWidth={1.75} className="text-terracotta" aria-label="Oui" />
      ) : (
        <X size={20} strokeWidth={1.75} className="text-stone-300" aria-label="Non" />
      )}
    </td>
  );
}
