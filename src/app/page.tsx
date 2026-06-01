import Link from "next/link";
import Image from "next/image";
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
import { AnimatedStars } from "@/components/motion/animated-stars";
import { ProductVisual } from "@/components/product/product-visual";
import { SavingsCalculator } from "@/components/home/savings-calculator";
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
                <Badge>Pour les femmes qui refusent de dépendre des antidouleurs</Badge>
              </StaggerChild>
              <StaggerChild as="h1" className="max-w-[16ch]">
                Tes règles ne devraient pas dicter ta journée.
              </StaggerChild>
              <StaggerChild as="p" className="max-w-prose text-foreground-muted text-lg">
                Une chaleur douce et discrète, pendant des heures. Tu l’actives
                sous ton pull, et tu continues ta vie — sans rien demander à
                personne.
              </StaggerChild>
              <StaggerChild as="p" className="font-display text-small italic text-terracotta-deep/80">
                Vis ta journée. Sans te justifier.
              </StaggerChild>
              <StaggerChild className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" className="breathe" asChild>
                  <Link href="/produit">
                    Découvrir Lunova — {formatPrice(product.price)}
                  </Link>
                </Button>
                <Button variant="link" asChild>
                  <Link href="/comment-ca-marche">Comment ça marche</Link>
                </Button>
              </StaggerChild>
              <StaggerChild className="pt-4">
                <Link
                  href="/avis"
                  className="group inline-flex items-center gap-3 rounded-full -mx-2 px-2 py-1 transition-colors hover:bg-terracotta-soft/40"
                >
                  <AnimatedStars rating={5} delay={0.3} />
                  <span className="text-small text-foreground-muted transition-colors group-hover:text-foreground">
                    {product.rating} / 5 ·{" "}
                    <Counter
                      to={product.reviewsCount}
                      className="tabular-nums"
                    />{" "}
                    retours bêta
                    <span className="ml-1 inline-block text-link opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </span>
                </Link>
              </StaggerChild>

              <StaggerChild>
                <blockquote className="border-l-2 border-terracotta/50 pl-4 text-small italic text-foreground-muted">
                  <p className="leading-snug">
                    « Pour la première fois en dix ans, j’ai pu finir ma
                    journée de boulot sans avaler un cachet. »
                  </p>
                  <footer className="mt-1 not-italic text-foreground-subtle">
                    — Camille, 29 ans · 4 mois d’utilisation
                  </footer>
                </blockquote>
              </StaggerChild>
            </Stagger>

            {/* Visuel produit avec ondes de chaleur */}
            <FadeIn delay={0.2} y={24} className="relative">
              <ProductVisual
                video={product.hero.video}
                image={product.hero.image}
                aspect="landscape"
                priority
              />
            </FadeIn>
          </Container>
        </section>

        {/* BANDEAU RÉASSURANCE */}
        <FadeIn className="border-y border-border bg-surface" duration={0.5}>
          <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
            {[
              { Icon: Truck, label: "Livraison offerte", sub: "2 à 4 jours" },
              { Icon: RotateCcw, label: "Premier cycle ou remboursée", sub: "Pas soulagée ? On rembourse, sans question" },
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

        {/* ON NE TE CROIT PAS — cœur émotionnel, fil rouge brief */}
        <section className="section-py bg-surface">
          <Container className="max-w-3xl">
            <FadeIn>
              <Badge variant="outline" className="mb-6">Le vrai problème</Badge>
              <h2 className="mb-10 max-w-[20ch]">
                Le pire, ce n’est pas la douleur. C’est qu’on te croit pas.
              </h2>
            </FadeIn>

            <Stagger
              className="flex flex-col gap-6 text-lg leading-relaxed text-foreground-muted"
              stagger={0.12}
            >
              <StaggerChild as="p">
                La manager qui soupire quand tu poses un jour. Le « t’as qu’à
                prendre un doliprane ». L’impression de devoir prouver que tu as
                vraiment mal, alors que tu serres les dents en réunion depuis ce
                matin.
              </StaggerChild>
              <StaggerChild as="p">
                Tu n’exagères pas. Une femme sur deux a des règles douloureuses,
                et la plupart ont déjà senti qu’on minimisait ce qu’elles
                vivent.
              </StaggerChild>
              <StaggerChild as="p" className="text-foreground">
                Lunova ne te demande pas de te justifier. Tu l’actives sous tes
                vêtements, la chaleur fait son travail, et toi tu vis ta
                journée. Normalement.
              </StaggerChild>
            </Stagger>

            <FadeIn delay={0.4} className="mt-10 border-t border-border pt-6">
              <p className="font-display text-base italic text-terracotta-deep/80">
                Vis ta journée. Sans te justifier.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* LE MIROIR — AVANT / APRÈS ÉMOTIONNEL */}
        <section className="section-py">
          <Container>
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Si tu te reconnais</Badge>
              <h2>Tu te lèves le J1 et tu sais déjà comment ça va finir.</h2>
            </FadeIn>

            <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.12}>
              <StaggerChild>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-noir text-blanc">
                  <div className="relative aspect-[5/3] w-full overflow-hidden">
                    <Image
                      src="/lifestyle/avant-bouillotte.jpg"
                      alt="Femme assise sur un canapé, bouillotte rose pressée contre le ventre"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-8 md:p-10">
                    <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-blanc/50">
                      <span className="h-px w-6 bg-blanc/30" /> Avant Lunova
                    </div>
                    <h3 className="font-display text-2xl text-blanc sm:text-3xl">
                      Tu fais comme tu peux.
                    </h3>
                    <ul className="flex flex-col gap-3 text-blanc/75">
                      {[
                        "Tu prévois 2 boîtes d’ibuprofène pour le mois",
                        "Tu poses un jour de RTT « pour être tranquille »",
                        "Tu sors la bouillotte au boulot — et tu la caches",
                        "Tu annules ce dîner. Encore.",
                        "Tu t’excuses d’avoir mal.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <X size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-stone-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerChild>

              <StaggerChild>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-peche text-foreground">
                  <div className="relative aspect-[5/3] w-full overflow-hidden">
                    <Image
                      src="/product/lunova-pull-avec.jpg"
                      alt="Femme en pull beige ajusté — Lunova portée dessous reste invisible"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-[center_30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-peche via-peche/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-8 md:p-10">
                    <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta-deep">
                      <span className="h-px w-6 bg-terracotta-deep/40" /> Avec Lunova
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl">
                      Tu vis ta journée. Sans y penser.
                    </h3>
                    <ul className="flex flex-col gap-3 text-foreground/80">
                      {[
                        "Tu actives Lunova sous ton pull en 3 secondes",
                        "Tu vas au bureau. Tu travailles. Tu oublies.",
                        "Tu sors dîner. Tu marches. Tu dors.",
                        "Plus d’ibuprofène — plus d’estomac qui brûle.",
                        "Tu reprends le contrôle, mois après mois.",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terracotta-deep" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerChild>
            </Stagger>
          </Container>
        </section>

        {/* DISCRÉTION — argument n°1, glissement "caché par gêne → privé par liberté" */}
        <section className="section-py">
          <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <FadeIn className="order-2 md:order-1">
              <Badge variant="outline" className="mb-4">Discrétion</Badge>
              <h2 className="mb-6 max-w-[22ch]">
                Mince, ajustée, invisible. Ton soulagement ne regarde que toi.
              </h2>
              <p className="text-lg leading-relaxed text-foreground-muted">
                Au bureau, en réunion, en soirée. Elle se glisse sous un pull et
                personne ne devine rien. Pas parce qu’il faut le cacher — mais
                parce que c’est ton corps, ton confort, ton choix.
              </p>
              <ul className="mt-8 flex flex-col gap-3 text-small text-foreground-muted">
                {[
                  { Icon: Feather, label: "Profil fin — invisible sous un pull" },
                  { Icon: Heart, label: "157,5 g — tu oublies que tu la portes" },
                  { Icon: ShieldCheck, label: "Sangle ajustable, toutes morphologies" },
                ].map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon size={18} strokeWidth={1.5} className="shrink-0 text-terracotta" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.15} y={24} className="order-1 md:order-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60">
                <Image
                  src="/product/lunova-pull-discretion.jpg"
                  alt="Démonstration de la discrétion Lunova : à gauche la ceinture visible sous le pull soulevé, à droite la même femme en pull baissé — rien ne se voit"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* CONFORT & AUTONOMIE — brief section ③ */}
        <section className="section-py bg-surface">
          <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <FadeIn y={24}>
              <div className="relative aspect-[7/6] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60">
                <Image
                  src="/product/lunova-confort-autonomie.jpg"
                  alt="Lunova en situation : portée sous le pull, vue de dos, avec mentions de grande autonomie et adaptation à toutes les morphologies"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Badge variant="outline" className="mb-4">Confort &amp; autonomie</Badge>
              <h2 className="mb-6 max-w-[20ch]">
                Pensée pour durer. Pensée pour toi.
              </h2>
              <p className="text-lg leading-relaxed text-foreground-muted">
                Une charge couvre ta journée — bureau, transports, soirée. La
                sangle s’ajuste de 60 à 170 cm et épouse toutes les
                morphologies, sans pression ni compromis.
              </p>
              <ul className="mt-8 flex flex-col gap-3 text-small text-foreground-muted">
                {[
                  { Icon: Battery, label: "Grande autonomie — une charge pour ta journée" },
                  { Icon: ShieldCheck, label: "Sangle 60–170 cm, toutes morphologies" },
                  { Icon: Feather, label: "157,5 g — sans pression, tu l’oublies" },
                ].map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon size={18} strokeWidth={1.5} className="shrink-0 text-terracotta" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
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
                  body: "Un seul bouton, cinq niveaux de chaleur. La diffusion commence en moins d’une minute.",
                },
                {
                  Icon: Heart,
                  title: "2. Tu vis",
                  body: "Cycles de 15 ou 30 minutes relançables. Tu travailles, tu marches, tu dors. Tu oublies.",
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
                  title: "5 niveaux de chaleur",
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

        {/* CHOIX DES COLORIS — premium, libellés poétiques (brief #4) */}
        <section className="section-py bg-surface">
          <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <FadeIn y={24}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-alt shadow-lg ring-1 ring-border/60">
                <Image
                  src="/product/lunova-coloris.jpg"
                  alt="Les deux coloris Lunova : ivoire et rose nude, présentés sur soie"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <Stagger className="flex flex-col gap-6" stagger={0.12}>
              <StaggerChild>
                <Badge variant="outline" className="mb-2">Les coloris</Badge>
                <h2 className="max-w-[18ch]">
                  Ivoire ou rose nude. À toi de choisir.
                </h2>
              </StaggerChild>

              <StaggerChild>
                <Link
                  href="/produit?color=ivoire"
                  className="card-lift group flex items-center gap-5 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-terracotta/50"
                >
                  <span
                    className="h-14 w-14 shrink-0 rounded-full ring-1 ring-border"
                    style={{ background: product.colors[0].hex }}
                    aria-hidden
                  />
                  <span className="flex flex-col">
                    <span className="font-display text-xl text-foreground">Ivoire</span>
                    <span className="text-small italic text-foreground-muted">
                      Élégance &amp; pureté
                    </span>
                  </span>
                  <span className="ml-auto text-small text-link opacity-0 transition-opacity group-hover:opacity-100">
                    Choisir →
                  </span>
                </Link>
              </StaggerChild>

              <StaggerChild>
                <Link
                  href="/produit?color=rose"
                  className="card-lift group flex items-center gap-5 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-terracotta/50"
                >
                  <span
                    className="h-14 w-14 shrink-0 rounded-full ring-1 ring-border"
                    style={{ background: product.colors[1].hex }}
                    aria-hidden
                  />
                  <span className="flex flex-col">
                    <span className="font-display text-xl text-foreground">Rose nude</span>
                    <span className="text-small italic text-foreground-muted">
                      Douceur &amp; harmonie
                    </span>
                  </span>
                  <span className="ml-auto text-small text-link opacity-0 transition-opacity group-hover:opacity-100">
                    Choisir →
                  </span>
                </Link>
              </StaggerChild>
            </Stagger>
          </Container>
        </section>

        {/* IDÉAL POUR — 4 usages */}
        <section className="section-py">
          <Container>
            <FadeIn className="mb-12 grid items-end gap-6 md:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4">Idéale partout</Badge>
                <h2>Là où la bouillotte te lâche, Lunova reste.</h2>
              </div>
              <Link
                href="/produit"
                className="hidden text-small text-link underline underline-offset-4 md:inline"
              >
                Voir le produit →
              </Link>
            </FadeIn>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {[
                {
                  image: "/product/lunova-situation-bureau.jpg",
                  alt: "Femme buvant un café devant son laptop avec Lunova autour de la taille",
                  title: "Au bureau",
                  body: "Sous ton pull, personne ne voit rien. Tu te concentres au lieu de subir.",
                },
                {
                  image: "/product/lunova-situation-canape.jpg",
                  alt: "Femme allongée détendue sur son canapé, Lunova activée sur le ventre",
                  title: "À la maison",
                  body: "Canapé, lit, lecture. Les jours difficiles deviennent juste des jours.",
                },
                {
                  image: "/product/lunova-situation-voiture.jpg",
                  alt: "Femme au volant de sa voiture, Lunova discrètement portée sous le tee-shirt",
                  title: "En déplacement",
                  body: "Tu marches, tu prends le métro, tu conduis. La chaleur reste constante.",
                },
                {
                  image: "/product/lunova-situation-sortie.jpg",
                  alt: "Femme élégante en trench beige sortant en ville, Lunova invisible sous la tenue",
                  title: "En sortie",
                  body: "Dîner, soirée, déjeuner. Tu y vas sans renoncer — et personne ne devine rien.",
                },
              ].map(({ image, alt, title, body }) => (
                <StaggerChild key={title}>
                  <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-sm">
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <h3 className="text-h3">{title}</h3>
                      <p className="text-small text-foreground-muted">{body}</p>
                    </div>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* CALCULATEUR D'ÉCONOMIES */}
        <SavingsCalculator />

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
                      ["Cycles de chaleur relançables à volonté", true, false, false],
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
              <h2 className="max-w-[28ch]">
                {product.rating.toString().replace(".", ",")} sur 5 —{" "}
                <Counter to={product.reviewsCount} className="tabular-nums" /> retours
                du programme bêta.
              </h2>
              <p className="text-small text-foreground-muted">
                Note moyenne cumulée · ci-dessous, {reviews.length} témoignages détaillés et non rémunérés.
              </p>
            </FadeIn>

            <Stagger className="grid gap-6 md:grid-cols-3">
              {topReviews.map((r) => (
                <StaggerChild key={r.id}>
                  <article className="card-lift flex h-full flex-col gap-4 rounded-xl bg-surface p-8 shadow-sm">
                    <AnimatedStars rating={r.rating} />
                    <h3 className="text-h3 font-medium leading-tight">{r.title}</h3>
                    <p className="text-foreground-muted line-clamp-5">{r.story.after}</p>
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

        {/* CE QU'ON NE TE PROMET PAS — anti-marketing honnête */}
        <section className="section-py">
          <Container className="max-w-3xl">
            <FadeIn className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">L’honnêteté avant tout</Badge>
              <h2>Ce qu’on ne te promet pas.</h2>
              <p className="mt-6 text-foreground-muted text-lg">
                Le marketing du bien-être adore les superlatifs. Nous, on
                préfère te dire ce que Lunova <em>n’est pas</em>.
              </p>
            </FadeIn>

            <Stagger className="flex flex-col gap-4" stagger={0.1}>
              {[
                {
                  no: "Un soulagement instantané.",
                  yes: "La chaleur arrive en 30 secondes. Le soulagement, en quelques minutes — et ça change déjà ta journée.",
                },
                {
                  no: "Le remplacement d’un médecin.",
                  yes: "Si tes douleurs sont chroniques ou intenses, parles-en à ton ou ta gynéco. Lunova accompagne, elle ne diagnostique pas.",
                },
                {
                  no: "Une cure miracle.",
                  yes: "Lunova soulage les symptômes par la chaleur ciblée. Elle ne traite pas la cause biologique de tes règles.",
                },
                {
                  no: "La fin des règles.",
                  yes: "On ne fait pas de magie. On te donne juste de quoi mieux les vivre — discrètement, partout, longtemps.",
                },
              ].map(({ no, yes }) => (
                <StaggerChild key={no}>
                  <article className="card-lift rounded-xl border border-border bg-surface p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex shrink-0 items-start gap-2 sm:w-1/3">
                        <X size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-stone-400" />
                        <p className="font-medium text-foreground line-through decoration-stone-300 decoration-1">
                          {no}
                        </p>
                      </div>
                      <p className="text-foreground-muted sm:flex-1">{yes}</p>
                    </div>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>

            <FadeIn delay={0.2} className="mt-12 rounded-xl bg-terracotta-soft p-8 text-center">
              <p className="font-display text-h3 leading-tight text-foreground sm:text-h2">
                Ce qu’on te promet : de la chaleur ciblée, douce et discrète,
                pendant des heures. C’est déjà énorme.
              </p>
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
              <div className="rounded-2xl bg-terracotta-soft px-8 py-16 text-center md:px-16 md:py-20">
                <p className="font-display text-small italic text-terracotta-deep/80 mb-4">
                  Vis ta journée. Sans te justifier.
                </p>
                <h2 className="mx-auto max-w-[20ch]">
                  Tu mérites de vivre normalement pendant tes règles.
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-foreground-muted">
                  Rejoins les{" "}
                  <Counter to={product.usersCount} className="tabular-nums" />{" "}
                  femmes qui ne renoncent plus à leur journée.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" className="breathe" asChild>
                    <Link href="/produit">Je veux me soulager — {formatPrice(product.price)}</Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/avis">Voir les avis</Link>
                  </Button>
                </div>
                <p className="mt-8 text-small text-foreground-muted">
                  Livraison offerte · Premier cycle ou remboursée · Garantie 2 ans
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
