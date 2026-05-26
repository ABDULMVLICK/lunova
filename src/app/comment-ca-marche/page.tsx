import Link from "next/link";
import {
  Thermometer,
  Heart,
  Activity,
  Brain,
  Power,
  Settings2,
  Clock3,
  ShieldCheck,
  Battery,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, product } from "@/lib/product";

export const metadata = {
  title: "Comment ça marche",
  description:
    "La science derrière Lunova : chaleur ciblée 8 h, vibrations basse fréquence, et mode d'emploi pas à pas.",
};

export default function CommentCaMarchePage() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="section-py">
          <Container className="max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">Comment ça marche</Badge>
            <h1 className="mb-6">
              La chaleur, ce remède simple validé par dix ans d&apos;études.
            </h1>
            <p className="text-foreground-muted text-lg">
              Lunova ne révolutionne rien — elle applique avec sérieux ce que la
              science sait depuis longtemps sur la chaleur ciblée et la
              dysménorrhée.
            </p>
          </Container>
        </section>

        {/* LA SCIENCE */}
        <section className="section-py bg-surface-alt">
          <Container>
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">La science</Badge>
              <h2>Pourquoi la chaleur soulage.</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Activity,
                  title: "Détente musculaire",
                  body:
                    "La chaleur ciblée détend les muscles de l’utérus, réduisant les contractions douloureuses responsables des crampes.",
                },
                {
                  Icon: Heart,
                  title: "Circulation locale",
                  body:
                    "Une chaleur ciblée sur le bas-ventre augmente le flux sanguin et favorise l’oxygénation des tissus. La douleur diminue.",
                },
                {
                  Icon: Brain,
                  title: "Inhibition de la douleur",
                  body:
                    "La chaleur active les récepteurs thermiques, qui bloquent la transmission des signaux de douleur vers le cerveau.",
                },
              ].map(({ Icon, title, body }) => (
                <article key={title} className="rounded-xl bg-surface p-8 shadow-sm">
                  <Icon className="mb-6 text-terracotta" size={28} strokeWidth={1.5} />
                  <h3 className="mb-3">{title}</h3>
                  <p className="text-foreground-muted">{body}</p>
                </article>
              ))}
            </div>

            <p className="mt-10 text-small text-foreground-muted">
              Études : Akin et al., 2001 — <em>The American Journal of Obstetrics
              and Gynecology</em>. Igwea et al., 2016 — <em>Cochrane Database</em>.
            </p>
          </Container>
        </section>

        {/* MODE D'EMPLOI */}
        <section className="section-py">
          <Container>
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Mode d&apos;emploi</Badge>
              <h2>En quatre étapes.</h2>
            </div>

            <ol className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Battery,
                  title: "1. Tu charges",
                  body:
                    "Branche le câble USB-C fourni. 2 heures pour une charge complète. Une lumière passe au terracotta quand c’est prêt.",
                },
                {
                  Icon: Settings2,
                  title: "2. Tu ajustes",
                  body:
                    "Enroule la ceinture autour de ta taille, ajuste la sangle élastique. Elle doit être contre la peau ou par-dessus un t-shirt fin.",
                },
                {
                  Icon: Power,
                  title: "3. Tu allumes",
                  body:
                    "Un appui sur le bouton central l’allume. Chaque appui suivant passe au niveau supérieur — quatre niveaux au total. Un appui long active le mode massage.",
                },
                {
                  Icon: Clock3,
                  title: "4. Tu oublies",
                  body:
                    "La chaleur arrive en moins de 30 secondes. Tu peux la porter plusieurs heures. Une coupure automatique se déclenche en cas d’usage prolongé — tu relances quand tu veux.",
                },
              ].map(({ Icon, title, body }) => (
                <li key={title} className="rounded-xl border border-border bg-surface p-8">
                  <Icon className="mb-5 text-terracotta" size={28} strokeWidth={1.5} />
                  <h3 className="mb-3">{title}</h3>
                  <p className="text-foreground-muted">{body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* SÉCURITÉ */}
        <section className="section-py bg-surface-alt">
          <Container className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="aspect-[4/5] rounded-2xl bg-surface shadow-sm" />
            <div className="flex flex-col gap-6">
              <Badge variant="outline">Sécurité</Badge>
              <h2 className="max-w-[18ch]">Pensée pour être oubliée — pas dangereuse.</h2>

              <div className="flex flex-col gap-4">
                {[
                  { Icon: Thermometer, title: "Température maîtrisée", body: "Plafonnée sous le seuil de risque cutané. Pensée pour rester douce, jamais brûlante." },
                  { Icon: ShieldCheck, title: "Coupure automatique", body: "Pour t’endormir sans inquiétude. Tu peux relancer un cycle quand tu veux." },
                  { Icon: Activity, title: "Basse tension, sans onde", body: "Moins de 50 V, vibrations basse fréquence. Aucun rayonnement, compatible avec un stérilet." },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <Icon size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta" />
                    <div>
                      <h3 className="text-h3 font-medium">{title}</h3>
                      <p className="text-foreground-muted">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="rounded-md bg-warning-soft p-4 text-small text-foreground">
                Si tu es enceinte ou si tu portes un pacemaker, demande l&apos;avis
                de ton médecin avant utilisation.
              </p>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="section-py">
          <Container>
            <div className="rounded-2xl bg-noir px-8 py-16 text-center text-blanc md:px-16">
              <h2 className="text-blanc mx-auto max-w-[20ch]">
                Tu as compris l&apos;essentiel. À toi de l&apos;essayer.
              </h2>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link href="/produit">Je veux Lunova — {formatPrice(product.price)}</Link>
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
