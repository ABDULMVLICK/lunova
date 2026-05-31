import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerChild } from "@/components/motion/stagger";
import { formatPrice, product } from "@/lib/product";

export const metadata = {
  title: "Notre histoire",
  description:
    "Pourquoi Lunova existe. Le manifesto, l'équipe, et la promesse derrière chaque ceinture.",
};

export default function NotreHistoirePage() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="section-py">
          <Container className="max-w-3xl text-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">Notre histoire</Badge>
              <h1 className="mb-6">
                On a commencé parce qu’on en avait marre.
              </h1>
              <p className="text-foreground-muted text-lg">
                Marre de planifier nos vies autour d’une douleur qu’on traite
                comme une fatalité. Marre des solutions qui datent du
                XX<sup>e</sup> siècle. Marre du silence.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* PHOTO LIFESTYLE FONDATRICE */}
        <FadeIn>
          <Container className="max-w-4xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
              <Image
                src="/lifestyle/apaisement-livre.jpg"
                alt="Femme allongée sereinement, lumière du jour"
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Container>
        </FadeIn>

        {/* L'HISTOIRE */}
        <section className="section-py">
          <Container className="max-w-3xl">
            <Stagger className="flex flex-col gap-6 text-foreground-muted text-lg" stagger={0.1}>
              <StaggerChild as="h2" className="font-display text-foreground">
                Pourquoi Lunova existe.
              </StaggerChild>

              <StaggerChild as="p">
                {/* TODO: à remplacer par ta vraie histoire fondatrice */}
                Lunova est née d’une conversation, tard un soir, entre deux
                amies épuisées de payer chaque mois un impôt invisible : la
                douleur menstruelle. <strong className="text-foreground">[Remplacer par ton vrai déclencheur — l’événement précis qui t’a fait te dire « il faut faire quelque chose »]</strong>.
              </StaggerChild>

              <StaggerChild as="p">
                On a découvert que 87 % des femmes ont des douleurs menstruelles
                régulières, mais qu’aucune marque française ne s’adressait à
                elles avec sérieux. Les produits existaient — mais cachés sur
                Amazon, sans identité, sans accompagnement.
              </StaggerChild>

              <StaggerChild as="p">
                On a mis 6 mois à sélectionner le bon modèle, à le faire tester
                par notre cercle, à corriger les défauts. On a voulu une marque
                qui parle aux femmes comme elles se parlent entre elles : sans
                jargon médical, sans tabou, sans bullshit marketing.
              </StaggerChild>

              <StaggerChild as="p">
                Aujourd’hui Lunova, c’est plus de{" "}
                {product.usersCount.toLocaleString("fr-FR")} femmes qui ont
                arrêté de subir. Et on commence à peine.
              </StaggerChild>
            </Stagger>
          </Container>
        </section>

        {/* MANIFESTO */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-4xl">
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Manifesto</Badge>
              <h2>Ce en quoi on croit, à fond.</h2>
            </FadeIn>

            <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.08}>
              {[
                {
                  num: "01",
                  title: "La douleur menstruelle n’est pas normale.",
                  body: "Elle est fréquente, oui. Normale, non. La banaliser depuis 50 ans n’en fait pas une fatalité.",
                },
                {
                  num: "02",
                  title: "Tu n’as pas à choisir entre ta carrière et ton ventre.",
                  body: "Aucune femme ne devrait poser un RTT pour avoir le droit de souffrir tranquillement.",
                },
                {
                  num: "03",
                  title: "Les médicaments ne sont pas une solution à vie.",
                  body: "Quelques jours dans l’année, c’est OK. Tous les mois pendant 30 ans, c’est ton foie qui paie.",
                },
                {
                  num: "04",
                  title: "Le marketing nous prend pour des idiotes.",
                  body: "Pas chez nous. Pas de !!!, pas de fake urgency, pas de superlatifs. On te dit ce que c’est, et ce que ce n’est pas.",
                },
                {
                  num: "05",
                  title: "Beau et utile, c’est non négociable.",
                  body: "Pas de rose bonbon. Pas d’objet « gadget santé ». Un produit qu’on est fière de poser sur sa table de nuit.",
                },
                {
                  num: "06",
                  title: "On vend une ceinture. On porte un mouvement.",
                  body: "Le jour où nos filles trouvent normal de bien vivre leurs règles, on aura gagné.",
                },
              ].map(({ num, title, body }) => (
                <StaggerChild key={num}>
                  <article className="card-lift flex h-full flex-col gap-3 rounded-xl bg-surface p-6 shadow-sm md:p-8">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta-deep">
                      {num}
                    </span>
                    <h3 className="font-display text-xl text-foreground sm:text-2xl">
                      {title}
                    </h3>
                    <p className="text-foreground-muted">{body}</p>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* L'ÉQUIPE (placeholder) */}
        <section className="section-py">
          <Container className="max-w-4xl">
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Derrière Lunova</Badge>
              <h2>Une petite équipe. Pas d’investisseurs. Pas de pression.</h2>
            </FadeIn>

            <FadeIn>
              <article className="rounded-2xl bg-peche p-8 md:p-12">
                {/* TODO: remplacer par ta vraie présentation founder */}
                <p className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                  « <strong className="text-foreground">[Ton prénom]</strong>{" "}
                  — fondatrice. <strong className="text-foreground">[Ton parcours en 1 phrase]</strong>.{" "}
                  <strong className="text-foreground">[Ce qui t’a fait créer Lunova en 1 phrase]</strong>. »
                </p>
                <p className="mt-6 text-small text-foreground-muted">
                  Tu peux nous écrire directement : <a href="mailto:hello@lunova.fr" className="text-link underline">hello@lunova.fr</a>.
                  On lit chaque message.
                </p>
              </article>
            </FadeIn>
          </Container>
        </section>

        {/* CTA */}
        <section className="section-py">
          <Container>
            <FadeIn>
              <div className="rounded-2xl bg-noir px-8 py-16 text-center text-blanc md:px-16 md:py-20">
                <h2 className="text-blanc mx-auto max-w-[22ch]">
                  Rejoins celles qui ont arrêté de subir.
                </h2>
                <div className="mt-10">
                  <Button size="lg" className="breathe" asChild>
                    <Link href="/produit">
                      Je veux Lunova — {formatPrice(product.price)}
                    </Link>
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
