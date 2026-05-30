import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="section-py">
          <Container className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Badge variant="outline">Erreur 404</Badge>

            <h1 className="font-display text-foreground">
              On a cherché.<br />
              Elle n’est nulle part.
            </h1>

            <p className="max-w-md text-foreground-muted text-lg">
              Cette page a peut-être bougé, ou tu as suivi un lien fatigué.
              Pas grave. On te ramène où il y a quelque chose à voir.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/">Retour à l’accueil</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/produit">Voir la ceinture</Link>
              </Button>
            </div>

            <p className="mt-8 text-small text-foreground-subtle">
              Tu cherchais autre chose ? Écris-nous à{" "}
              <Link href="mailto:hello@lunova.fr" className="text-link underline underline-offset-2">
                hello@lunova.fr
              </Link>
              .
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
