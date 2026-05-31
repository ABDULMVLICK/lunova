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
  Briefcase,
  Moon,
  Footprints,
  Home as HomeIcon,
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
              <ProductVisual
                video={product.hero.video}
                image={product.hero.image}
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
                        "Tu te dis qu’à 30 ans, ça va passer.",
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
                      src="/lifestyle/apaisement-livre.jpg"
                      alt="Femme allongée sereinement sur tissu beige avec un livre, sourire détendu"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
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
                  Icon: Briefcase,
                  title: "Au bureau",
                  body: "Sous ton pull, personne ne voit rien. Tu te concentres au lieu de subir.",
                },
                {
                  Icon: Moon,
                  title: "La nuit",
                  body: "Coupure auto après 15 ou 30 minutes. Tu t’endors apaisée.",
                },
                {
                  Icon: Footprints,
                  title: "En déplacement",
                  body: "Tu marches, tu prends le métro, tu bouges. La chaleur reste constante.",
                },
                {
                  Icon: HomeIcon,
                  title: "À la maison",
                  body: "Canapé, lit, lecture. Les jours difficiles deviennent juste des jours.",
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
