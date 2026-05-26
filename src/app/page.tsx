import Link from "next/link";
import { Clock3, Heart, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="section-py">
          <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="flex flex-col gap-6">
              <Badge>Nouveau · 4 800 femmes l&apos;utilisent</Badge>

              <h1 className="max-w-[14ch]">
                Fini les crampes qui ruinent ta journée.
              </h1>

              <p className="max-w-prose text-foreground-muted text-lg">
                Tu connais ce moment où la douleur arrive au pire moment. Au
                bureau, en réunion, dans le métro. Lunova t&apos;accompagne
                discrètement, partout, pendant 8 heures.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" asChild>
                  <Link href="/produit">Je veux me soulager</Link>
                </Button>
                <Button variant="link" asChild>
                  <Link href="/comment-ca-marche">Comment ça marche</Link>
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Stars rating={5} />
                <span className="text-small text-foreground-muted">
                  4,8 / 5 · 1 247 avis vérifiés
                </span>
              </div>
            </div>

            {/* Placeholder image produit — fond ivoire, ombre douce */}
            <div className="aspect-square w-full rounded-2xl bg-surface shadow-lg ring-1 ring-border/60 flex items-center justify-center">
              <span className="font-display text-7xl text-stone-200">L</span>
            </div>
          </Container>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="section-py bg-surface-alt">
          <Container>
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">
                Comment ça marche
              </Badge>
              <h2>Chaleur ciblée en 30 secondes</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock3,
                  title: "30 secondes",
                  body:
                    "Tu actives Lunova d'un geste. La chaleur monte en moins d'une minute.",
                },
                {
                  Icon: Heart,
                  title: "8 heures",
                  body:
                    "Une chaleur douce et constante, conçue pour s'adapter à ton corps toute la journée.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Discrète",
                  body:
                    "Sous tes vêtements, personne ne voit rien. Tu vis normalement.",
                },
              ].map(({ Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-xl bg-surface p-8 shadow-sm transition-shadow duration-[var(--duration-base)] ease-[var(--ease-out)] hover:shadow-md"
                >
                  <Icon
                    className="mb-6 text-terracotta"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-3">{title}</h3>
                  <p className="text-foreground-muted">{body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* TÉMOIGNAGE */}
        <section className="section-py">
          <Container>
            <figure className="mx-auto max-w-3xl text-center">
              <Stars rating={5} size={20} className="mx-auto mb-6" />
              <blockquote className="font-display text-h2 leading-[var(--lh-heading)] tracking-[-0.02em] text-foreground">
                « Pour la première fois en dix ans, j&apos;ai pu travailler
                normalement le premier jour de mes règles. »
              </blockquote>
              <figcaption className="mt-6 text-small text-foreground-muted">
                Camille, 29 ans — utilisatrice depuis 4 mois
              </figcaption>
            </figure>
          </Container>
        </section>

        {/* CTA FINAL */}
        <section className="section-py">
          <Container>
            <div className="rounded-2xl bg-noir px-8 py-16 text-center text-blanc md:px-16 md:py-20">
              <h2 className="text-blanc mx-auto max-w-[20ch]">
                Tu mérites de vivre normalement pendant tes règles.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-blanc/70">
                Rejoins les 4 800 femmes qui ne renoncent plus à leur journée.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/produit">Je veux me soulager</Link>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-blanc/40 text-blanc hover:bg-blanc hover:text-noir"
                  asChild
                >
                  <Link href="/avis">Voir les avis</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
