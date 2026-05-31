"use client";

import * as React from "react";
import Link from "next/link";
import {
  Heart,
  Link2,
  Percent,
  Mail,
  Sparkles,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Field } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerChild } from "@/components/motion/stagger";

export default function AmbassadricesPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: "",
    email: "",
    socials: "",
    motivation: "",
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Démo : à brancher sur Resend ou un webhook en prod.
    setSubmitted(true);
  };

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="section-py">
          <Container className="max-w-3xl text-center">
            <FadeIn>
              <Badge variant="outline" className="mb-4">Programme ambassadrices</Badge>
              <h1 className="mb-6">
                Tu en parles déjà autour de toi. Autant en vivre.
              </h1>
              <p className="text-foreground-muted text-lg">
                Notre programme ambassadrices, c&apos;est un lien unique à
                partager — et 10 % de commission sur chaque vente. Pas
                d&apos;objectif, pas de pression. Juste un lien.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="section-py bg-surface-alt">
          <Container>
            <FadeIn className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Comment ça marche</Badge>
              <h2>Trois étapes, zéro complication.</h2>
            </FadeIn>

            <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.1}>
              {[
                {
                  Icon: Mail,
                  step: "01",
                  title: "Tu candidates",
                  body: "Tu remplis le formulaire ci-dessous. On revient vers toi sous 48 h ouvrées.",
                },
                {
                  Icon: Link2,
                  step: "02",
                  title: "Tu reçois ton lien",
                  body: "Un lien unique vers Lunova, avec ton code dédié pour tracker tes ventes.",
                },
                {
                  Icon: Percent,
                  step: "03",
                  title: "Tu gagnes 10 %",
                  body: "Sur chaque commande passée via ton lien. Versé en fin de mois sur ton compte.",
                },
              ].map(({ Icon, step, title, body }) => (
                <StaggerChild key={step}>
                  <article className="card-lift flex h-full flex-col gap-4 rounded-xl bg-surface p-8 shadow-sm">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-terracotta-deep">
                      {step}
                    </span>
                    <Icon className="text-terracotta" size={28} strokeWidth={1.5} />
                    <h3 className="text-h3">{title}</h3>
                    <p className="text-small text-foreground-muted">{body}</p>
                  </article>
                </StaggerChild>
              ))}
            </Stagger>
          </Container>
        </section>

        {/* CONDITIONS */}
        <section className="section-py">
          <Container className="max-w-3xl">
            <FadeIn>
              <Badge variant="outline" className="mb-4">Les règles du jeu</Badge>
              <h2 className="mb-6">Honnêtes, sans surprises.</h2>

              <ul className="flex flex-col gap-4 text-foreground-muted text-lg">
                {[
                  {
                    Icon: Percent,
                    title: "10 % de commission",
                    body: "Sur le montant HT de chaque commande validée et non remboursée.",
                  },
                  {
                    Icon: Calendar,
                    title: "Versement mensuel",
                    body: "Le 5 du mois suivant, virement bancaire ou PayPal, ton choix.",
                  },
                  {
                    Icon: Sparkles,
                    title: "Pas d'objectif",
                    body: "Tu n'as rien à atteindre. Tu partages quand tu veux, comme tu veux.",
                  },
                  {
                    Icon: Heart,
                    title: "Une ceinture offerte au premier 100 €",
                    body: "Quand tu dépasses 100 € de commission, on t'envoie ta propre Lunova en cadeau.",
                  },
                ].map(({ Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta-soft">
                      <Icon size={16} strokeWidth={1.75} className="text-terracotta-deep" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{title}</p>
                      <p className="text-small text-foreground-muted">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </Container>
        </section>

        {/* FORM */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-2xl">
            {submitted ? (
              <FadeIn>
                <div className="rounded-2xl bg-surface p-10 text-center shadow-sm md:p-12">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-success-soft">
                    <CheckCircle2 size={26} strokeWidth={1.75} className="text-success" />
                  </div>
                  <h2 className="mb-4">Candidature reçue.</h2>
                  <p className="mb-8 text-foreground-muted">
                    On lit chaque message, à la main. Tu reçois une réponse
                    sous 48 h ouvrées par email. À très vite, {form.firstName} 🌙
                  </p>
                  <Button asChild>
                    <Link href="/">Retour à l&apos;accueil</Link>
                  </Button>
                </div>
              </FadeIn>
            ) : (
              <FadeIn>
                <Badge variant="outline" className="mb-4">Candidature</Badge>
                <h2 className="mb-3">Dis-nous qui tu es.</h2>
                <p className="mb-8 text-foreground-muted">
                  Pas besoin d&apos;être influenceuse. Si tu en parles
                  sincèrement autour de toi, on est intéressées.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <Field label="Prénom" htmlFor="firstName">
                    <Input id="firstName" required value={form.firstName} onChange={update("firstName")} />
                  </Field>

                  <Field label="Email" htmlFor="email" hint="On te répond ici.">
                    <Input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="prenom@exemple.fr"
                      value={form.email}
                      onChange={update("email")}
                    />
                  </Field>

                  <Field
                    label="Tes réseaux ou ta plateforme (facultatif)"
                    htmlFor="socials"
                    hint="Insta, TikTok, blog, podcast, lien Linktree…"
                  >
                    <Input
                      id="socials"
                      placeholder="@toi · ou rien si tu préfères en bouche-à-oreille"
                      value={form.socials}
                      onChange={update("socials")}
                    />
                  </Field>

                  <Field label="Pourquoi Lunova te parle ?" htmlFor="motivation">
                    <textarea
                      id="motivation"
                      required
                      rows={4}
                      value={form.motivation}
                      onChange={update("motivation")}
                      className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-body text-foreground placeholder:text-foreground-subtle transition-colors focus:border-terracotta focus:outline-none focus:[box-shadow:var(--shadow-focus)]"
                      placeholder="3 phrases suffisent."
                    />
                  </Field>

                  <Button type="submit" size="lg" className="breathe">
                    Je candidate
                  </Button>

                  <p className="text-center text-small text-foreground-muted">
                    Tes infos restent chez nous. Voir notre{" "}
                    <Link href="/confidentialite" className="text-link underline">
                      politique de confidentialité
                    </Link>
                    .
                  </p>
                </form>
              </FadeIn>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
