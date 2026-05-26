import Link from "next/link";
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
import { faq } from "@/lib/faq";

export const metadata = {
  title: "Questions fréquentes",
  description:
    "Toutes les réponses sur Lunova : utilisation, sécurité, livraison, garantie, produit.",
};

export default function FaqPage() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="section-py">
          <Container className="max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h1 className="mb-6">Toutes les réponses, sans détour.</h1>
            <p className="text-foreground-muted text-lg">
              Si tu ne trouves pas ta réponse, écris-nous à{" "}
              <Link href="mailto:hello@lunova.fr" className="text-link underline underline-offset-2">
                hello@lunova.fr
              </Link>{" "}
              — on répond sous 24 h ouvrées.
            </p>
          </Container>
        </section>

        {/* CATÉGORIES */}
        <section className="pb-24">
          <Container className="max-w-3xl">
            <div className="flex flex-col gap-12">
              {faq.map((cat) => (
                <div key={cat.id}>
                  <h2 id={cat.id} className="text-h2 mb-6 scroll-mt-24">
                    {cat.title}
                  </h2>
                  <Accordion
                    type="single"
                    collapsible
                    className="rounded-xl bg-surface px-6 shadow-sm"
                  >
                    {cat.items.map((item, i) => (
                      <AccordionItem key={i} value={`${cat.id}-${i}`}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl bg-peche p-10 text-center">
              <h2 className="text-h2 mb-4">Une autre question ?</h2>
              <p className="mb-6 text-foreground-muted">
                On lit chaque message. Tu peux aussi nous appeler du lundi au
                vendredi, 9 h — 18 h.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">Nous écrire</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/produit">Voir le produit</Link>
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
