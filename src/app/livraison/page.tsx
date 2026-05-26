import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, MapPin } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Livraison & retours" };

export default function LivraisonPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section-py">
          <Container className="max-w-3xl">
            <Badge variant="outline" className="mb-4">Livraison & retours</Badge>
            <h1 className="mb-6">On s&apos;occupe du reste.</h1>
            <p className="mb-12 text-foreground-muted text-lg">
              Tu commandes aujourd&apos;hui, tu reçois Lunova en quelques jours.
              Si elle ne te convient pas, on la reprend.
            </p>

            <div className="mb-12 grid gap-4 md:grid-cols-2">
              <Card
                Icon={Truck}
                title="France métropolitaine"
                lines={[
                  "Livraison offerte, sans minimum",
                  "Colissimo suivi — 2 à 4 jours ouvrés",
                  "Expédition sous 24 h",
                ]}
              />
              <Card
                Icon={MapPin}
                title="Belgique, Luxembourg, Suisse"
                lines={[
                  "9,90 € — 4 à 7 jours ouvrés",
                  "Suivi en ligne fourni",
                  "Taxes douanières incluses",
                ]}
              />
              <Card
                Icon={RotateCcw}
                title="Essai 30 nuits"
                lines={[
                  "Tu essaies 30 jours, sans engagement",
                  "Retour offert si elle ne va pas",
                  "Remboursement sous 5 jours ouvrés",
                ]}
              />
              <Card
                Icon={ShieldCheck}
                title="Garantie 2 ans"
                lines={[
                  "Pièces & main d'œuvre",
                  "Remplacement sans questions inutiles",
                  "Couvre les défauts d'usine",
                ]}
              />
            </div>

            <div className="rounded-xl bg-surface p-8 shadow-sm">
              <h2 className="text-h2 mb-4">Comment retourner ta Lunova ?</h2>
              <ol className="flex flex-col gap-3 text-foreground-muted">
                <li>
                  <strong className="text-foreground">1.</strong> Écris-nous à{" "}
                  <Link href="mailto:hello@lunova.fr" className="text-link underline">
                    hello@lunova.fr
                  </Link>{" "}
                  avec ton numéro de commande.
                </li>
                <li>
                  <strong className="text-foreground">2.</strong> On t&apos;envoie une
                  étiquette de retour pré-payée par email.
                </li>
                <li>
                  <strong className="text-foreground">3.</strong> Tu colles l&apos;étiquette
                  sur le carton d&apos;origine et tu déposes au point relais le plus
                  proche.
                </li>
                <li>
                  <strong className="text-foreground">4.</strong> On te rembourse sous
                  5 jours ouvrés après réception, sur ton moyen de paiement
                  initial.
                </li>
              </ol>
            </div>

            <div className="mt-12 text-center">
              <Button asChild>
                <Link href="/produit">Commander ma Lunova</Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Card({
  Icon,
  title,
  lines,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  lines: string[];
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-6">
      <Icon size={26} strokeWidth={1.5} className="mb-4 text-terracotta" />
      <h3 className="mb-3 text-h3 font-medium">{title}</h3>
      <ul className="flex flex-col gap-1.5 text-small text-foreground-muted">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </article>
  );
}
