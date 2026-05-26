import Link from "next/link";
import {
  Clock3,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Battery,
  Thermometer,
  Vibrate,
  Feather,
  CheckCircle2,
  X,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerChild } from "@/components/motion/stagger";
import { Counter } from "@/components/motion/counter";
import { HeatRipple } from "@/components/motion/heat-ripple";
import { AnimatedStars } from "@/components/motion/animated-stars";
import { product, formatPrice } from "@/lib/product";
import { reviews } from "@/lib/reviews";
import { faqFlat } from "@/lib/faq";

export default function Home() {
  const topReviews = reviews.slice(0, 3);
  const topFaq = faqFlat.slice(0, 6);

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="section-py">
          <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <Stagger className="flex flex-col gap-6" stagger={0.1}>
              <StaggerChild>
                <Badge>
                  Nouveau ·{" "}
                  <Counter to={product.usersCount} className="mx-1 tabular-nums" />{" "}
                  femmes l’utilisent
                </Badge>
              </StaggerChild>
              <StaggerChild as="h1" className="max-w-[14ch]">
                Fini les crampes qui ruinent ta journée.
              </StaggerChild>
              <StaggerChild as="p" className="max-w-prose text-foreground-muted text-lg">
                Tu connais ce moment où la douleur arrive au pire moment. Au
                bureau, en réunion, dans le métro. Lunova diffuse une chaleur
                douce pendant des heures, discrètement sous tes vêtements.
              </StaggerChild>
              <StaggerChild className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" className="breathe" asChild>
                  <Link href="/produit">
                    Je veux me soulager — {formatPrice(product.price)}
                  </Link>
                </Button>
                <Button variant="link" asChild>
                  <Link href="/comment-ca-marche">Comment ça marche</Link>
                </Button>
              </StaggerChild>
              <StaggerChild className="flex items-center gap-3 pt-4">
                <AnimatedStars rating={5} delay={0.3} />
                <span className="text-small text-foreground-muted">
                  {product.rating} / 5 ·{" "}
                  <Counter
                    to={product.reviewsCount}
                    className="tabular-nums"
                  />{" "}
                  avis vérifiés
                </span>
              </StaggerChild>
            </Stagger>

            {/* Visuel produit avec ondes de chaleur */}
            <FadeIn delay={0.2} y={24} className="relative">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface shadow-lg ring-1 ring-border/60">
                <HeatRipple />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-8xl text-stone-200">L</span>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* BANDEAU RÉASSURANCE */}
        <FadeIn className="border-y border-border bg-surface" duration={0.5}>
          <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
            {[
              { Icon: Truck, label: "Livraison offerte", sub: "2 à 4 jours" },
              { Icon: RotateCcw, label: "Essai 30 nuits", sub: "Remboursée si elle ne convient pas" },
              { Icon: ShieldCheck, label: "Garantie 2 ans", sub: "Pièces & main d’œuvre" },
              { Icon: Sparkles, label: "Conçue avec attention", sub: "Tissu doux côté peau" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon size={22} strokeWidth={1.5} className="text-terracotta" />
                <p className="text-small font-medium text-foreground">{label}</p>
                <p className="text-small text-foreground-muted">{sub}</p>
              </div>
            ))}
          </Container>
        </FadeIn>

        {/* POUR QUI C'EST FAIT */}
        <section className="section-py">
          <Container className="grid gap-12 md:grid-cols-2 md:items-center">
            <FadeIn>
              <div className="aspect-[4/5] rounded-2xl bg-peche shadow-sm" />
            </FadeIn>
            <Stagger className="flex flex-col gap-6">
              <StaggerChild><Badge variant="outline">Pour qui</Badge></StaggerChild>
              <StaggerChild as="h2" className="max-w-[18ch]">
                Conçue pour les femmes qui ne veulent plus subir.
              </StaggerChild>
              <StaggerChild as="p" className="text-foreground-muted text-lg">
                Si tu reconnais l’un de ces moments, Lunova est faite pour toi.
              </StaggerChild>
              <StaggerChild>
                <ul className="flex flex-col gap-3">
                  {[
                    "Tu prends des anti-inflammatoires à chaque cycle",
                    "Tu poses des congés ou tu télétravailles à cause de la douleur",
                    "Tu sors avec une bouillotte cachée dans ton sac",
                    "Tu sais que les premiers jours seront difficiles, chaque mois",
                    "Tu veux quelque chose de discret au bureau",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terracotta" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </StaggerChild>
            </Stagger>
          </Container>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="section-py bg-surface-alt">
          <Container>
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Comment ça marche</Badge>
              <h2>Chaleur ciblée en 30 secondes.</h2>
            </FadeIn>

            <Stagger className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock3,
                  title: "1. Tu allumes",
                  body: "Un seul bouton, quatre niveaux de chaleur. La diffusion commence en moins d’une minute.",
                },
                {
                  Icon: Heart,
                  title: "2. Tu vis",
                  body: "La chaleur reste constante plusieurs heures. Tu travailles, tu marches, tu dors. Tu oublies.",
                },
                {
                  Icon: Battery,
                  title: "3. Tu recharges",
                  body: "USB simple, câble fourni dans la boîte. Une seule fois suffit pour ta journée.",
                },
              ].map(({ Icon, title, body }) => (
                <StaggerChild key={title}>
                  <article className="card-lift rounded-xl bg-surface p-8 shadow-sm">
                    <Icon className="mb-6 text-terracotta" size={28} strokeWidth={1.5} />
                    <h3 className="mb-3">{title}</h3>
                    <p className="text-foreground-muted">{body}</p>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>

            <FadeIn delay={0.1} className="mt-10">
              <Button variant="link" asChild>
                <Link href="/comment-ca-marche">Voir le mode d’emploi détaillé</Link>
              </Button>
            </FadeIn>
          </Container>
        </section>

        {/* SPÉCIFICATIONS PRODUIT */}
        <section className="section-py">
          <Container>
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Les détails</Badge>
              <h2>Tout ce que tu as besoin de savoir.</h2>
            </FadeIn>

            <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  Icon: Thermometer,
                  title: "4 niveaux de chaleur",
                  body: "Du doux au plus chaud, selon ton intensité de douleur du jour.",
                },
                {
                  Icon: Vibrate,
                  title: "4 modes de massage",
                  body: "Vibrations basse fréquence, combinables avec la chaleur ou seules.",
                },
                {
                  Icon: Battery,
                  title: "Recharge USB simple",
                  body: "Une charge suffit pour ta journée. Câble fourni dans la boîte.",
                },
                {
                  Icon: Feather,
                  title: "Discrète, ajustable",
                  body: "Profil fin, sangle ajustable, taille unique pour la majorité des morphologies.",
                },
              ].map(({ Icon, title, body }) => (
                <StaggerChild key={title}>
                  <article className="card-lift h-full rounded-xl border border-border bg-surface p-6">
                    <Icon className="mb-5 text-terracotta" size={26} strokeWidth={1.5} />
                    <h3 className="mb-2 text-h3">{title}</h3>
                    <p className="text-small text-foreground-muted">{body}</p>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* COMPARAISON */}
        <section className="section-py bg-surface-alt">
          <Container>
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Pourquoi Lunova</Badge>
              <h2>Mieux qu’une bouillotte. Plus sain qu’un cachet.</h2>
            </FadeIn>

            <FadeIn>
              <div className="overflow-hidden rounded-xl bg-surface shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-5 font-sans text-small font-medium text-foreground-muted">Critère</th>
                      <th className="px-6 py-5 font-display text-lg text-terracotta">Lunova</th>
                      <th className="px-6 py-5 font-sans text-small font-medium text-foreground-muted">Bouillotte</th>
                      <th className="px-6 py-5 font-sans text-small font-medium text-foreground-muted">Anti-inflammatoire</th>
                    </tr>
                  </thead>
                  <tbody className="text-small">
                    {[
                      ["Discrète, mobile", true, false, true],
                      ["Chaleur constante plusieurs heures", true, false, false],
                      ["Sans effets secondaires", true, true, false],
                      ["Mains libres", true, false, true],
                      ["Réutilisable à vie", true, true, false],
                      ["Soulagement immédiat", true, true, false],
                    ].map(([crit, l, b, a]) => (
                      <tr key={crit as string} className="border-b border-border last:border-0 transition-colors hover:bg-terracotta-soft/40">
                        <td className="px-6 py-4 font-medium text-foreground">{crit}</td>
                        <Cell ok={l as boolean} />
                        <Cell ok={b as boolean} />
                        <Cell ok={a as boolean} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="section-py">
          <Container>
            <FadeIn className="mb-12 flex flex-col items-center gap-4 text-center">
              <AnimatedStars rating={5} size={22} />
              <h2 className="max-w-[26ch]">
                {product.rating.toString().replace(".", ",")} sur 5 —{" "}
                <Counter to={product.reviewsCount} className="tabular-nums" /> femmes
                ont déjà témoigné.
              </h2>
            </FadeIn>

            <Stagger className="grid gap-6 md:grid-cols-3">
              {topReviews.map((r) => (
                <StaggerChild key={r.id}>
                  <article className="card-lift flex h-full flex-col gap-4 rounded-xl bg-surface p-8 shadow-sm">
                    <AnimatedStars rating={r.rating} />
                    <h3 className="text-h3 font-medium leading-tight">{r.title}</h3>
                    <p className="text-foreground-muted">{r.body}</p>
                    <p className="mt-auto text-small text-foreground-subtle">
                      {r.name}{r.age ? `, ${r.age} ans` : ""}{r.duration ? ` — ${r.duration}` : ""}
                    </p>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>

            <FadeIn delay={0.1} className="mt-10 text-center">
              <Button variant="secondary" asChild>
                <Link href="/avis">Lire les {product.reviewsCount.toLocaleString("fr-FR")} avis</Link>
              </Button>
            </FadeIn>
          </Container>
        </section>

        {/* FAQ COURTE */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-3xl">
            <FadeIn className="mb-10 text-center">
              <Badge variant="outline" className="mb-4">Les questions qu’on nous pose</Badge>
              <h2>Tout ce qu’il te faut savoir.</h2>
            </FadeIn>

            <FadeIn>
              <Accordion type="single" collapsible className="rounded-xl bg-surface px-6 shadow-sm">
                {topFaq.map((item, i) => (
                  <AccordionItem key={i} value={`q-${i}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-8 text-center">
              <Button variant="link" asChild>
                <Link href="/faq">Voir toutes les questions</Link>
              </Button>
            </FadeIn>
          </Container>
        </section>

        {/* CTA FINAL */}
        <section className="section-py">
          <Container>
            <FadeIn>
              <div className="rounded-2xl bg-noir px-8 py-16 text-center text-blanc md:px-16 md:py-20">
                <h2 className="text-blanc mx-auto max-w-[20ch]">
                  Tu mérites de vivre normalement pendant tes règles.
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-blanc/70">
                  Rejoins les{" "}
                  <Counter to={product.usersCount} className="tabular-nums text-blanc" />{" "}
                  femmes qui ne renoncent plus à leur journée.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" className="breathe" asChild>
                    <Link href="/produit">Je veux me soulager — {formatPrice(product.price)}</Link>
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
                <p className="mt-8 text-small text-blanc/60">
                  Livraison offerte · Essai 30 nuits · Garantie 2 ans
                </p>
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
