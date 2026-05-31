import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import { reviews, ratingDistribution } from "@/lib/reviews";
import { product, formatPrice } from "@/lib/product";

export const metadata = {
  title: "Avis vérifiés",
  description:
    "Lis les avis vérifiés des femmes qui utilisent Lunova. Note moyenne 4,8 / 5 sur 1 247 retours d'expérience.",
};

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function NarrativeStory({ story }: { story: Review["story"] }) {
  return (
    <div className="flex flex-col gap-3 text-foreground-muted">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
          Avant ·
        </span>{" "}
        <span>{story.before}</span>
      </div>
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
          Pourquoi Lunova ·
        </span>{" "}
        <span>{story.why}</span>
      </div>
      <div className="rounded-lg bg-terracotta-soft/40 p-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-terracotta-deep">
          Ce qui a changé ·
        </span>{" "}
        <span className="text-foreground">{story.after}</span>
      </div>
    </div>
  );
}

export default function AvisPage() {
  const dist = ratingDistribution();
  const total = reviews.length;

  return (
    <>
      <Header />

      <main>
        <section className="section-py">
          <Container>
            <div className="mb-12 grid gap-12 md:grid-cols-3 md:gap-16">
              {/* Synthèse */}
              <div className="md:col-span-1">
                <Badge variant="outline" className="mb-4">Avis vérifiés</Badge>
                <h1 className="text-h2 md:text-h1 mb-4">{product.rating} / 5</h1>
                <Stars rating={5} size={22} className="mb-3" />
                <p className="text-foreground-muted">
                  {product.reviewsCount.toLocaleString("fr-FR")} avis vérifiés —
                  collectés auprès de clientes ayant acheté Lunova.
                </p>

                <div className="mt-6 flex items-center gap-2 text-small text-foreground-muted">
                  <ShieldCheck size={16} strokeWidth={1.75} className="text-terracotta" />
                  Avis modérés par un tiers indépendant
                </div>
              </div>

              {/* Distribution */}
              <div className="md:col-span-2">
                <h2 className="text-h3 font-medium mb-6">Répartition des notes</h2>
                <ul className="flex flex-col gap-3">
                  {([5, 4, 3, 2, 1] as const).map((n) => {
                    const count = dist[n];
                    const pct = total > 0 ? (count / total) * 100 : 0;
                    return (
                      <li key={n} className="flex items-center gap-4">
                        <span className="w-16 text-small text-foreground-muted">
                          {n} étoile{n > 1 ? "s" : ""}
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full bg-terracotta transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-small text-foreground-muted">
                          {count}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Liste */}
            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="flex flex-col gap-4 rounded-xl bg-surface p-8 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Stars rating={r.rating} />
                    {r.verified && (
                      <span className="flex items-center gap-1 text-small text-foreground-subtle">
                        <ShieldCheck size={14} strokeWidth={1.75} />
                        Vérifié
                      </span>
                    )}
                  </div>
                  <h3 className="text-h3 font-medium leading-tight">{r.title}</h3>
                  <NarrativeStory story={r.story} />
                  <div className="mt-auto flex items-center justify-between text-small text-foreground-subtle">
                    <span>
                      {r.name}
                      {r.age ? `, ${r.age} ans` : ""}
                      {r.city ? ` · ${r.city}` : ""}
                      {r.duration ? ` — ${r.duration}` : ""}
                    </span>
                    <time dateTime={r.date}>{dateFmt.format(new Date(r.date))}</time>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-10 text-center text-small text-foreground-muted">
              Affichage des {reviews.length} derniers avis publics — sur un total
              de {product.reviewsCount.toLocaleString("fr-FR")}.
            </p>

            <div className="mx-auto mt-6 max-w-2xl rounded-lg bg-stone-50 p-4 text-center text-small text-foreground-muted">
              Avis collectés auprès des premières utilisatrices du{" "}
              <strong className="text-foreground">programme bêta Lunova</strong>.
              Tous les retours sont <strong className="text-foreground">libres et non rémunérés</strong>.
              Modération assurée par un tiers indépendant.
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <Container>
            <div className="rounded-2xl bg-noir px-8 py-16 text-center text-blanc md:px-16">
              <h2 className="text-blanc mx-auto max-w-[22ch]">
                Tu veux faire partie des prochains témoignages ?
              </h2>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link href="/produit">Essayer Lunova — {formatPrice(product.price)}</Link>
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
