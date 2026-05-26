import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section-py">
          <Container className="max-w-4xl">
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h1 className="mb-6">On lit chaque message.</h1>
            <p className="mb-12 text-foreground-muted text-lg">
              Une question, un retour, un doute. Notre équipe répond sous 24 h
              ouvrées, du lundi au vendredi.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <Channel
                Icon={Mail}
                title="Par email"
                value="hello@lunova.fr"
                href="mailto:hello@lunova.fr"
                sub="La voie la plus rapide"
              />
              <Channel
                Icon={Phone}
                title="Par téléphone"
                value="01 23 45 67 89"
                href="tel:+33123456789"
                sub="Lun.–Ven. · 9 h → 18 h"
              />
              <Channel
                Icon={MessageCircle}
                title="Sur Instagram"
                value="@lunova.fr"
                href="https://instagram.com/lunova.fr"
                sub="En DM, on répond aussi"
              />
            </div>

            <div className="mt-16 rounded-2xl bg-surface p-10 shadow-sm">
              <h2 className="text-h2 mb-6">Avant de nous écrire</h2>
              <p className="mb-6 text-foreground-muted">
                Beaucoup de questions trouvent leur réponse dans notre FAQ —
                utilisation, sécurité, livraison, garantie.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" asChild>
                  <Link href="/faq">Consulter la FAQ</Link>
                </Button>
                <Button variant="link" asChild>
                  <Link href="/livraison">Livraison & retours</Link>
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

function Channel({
  Icon,
  title,
  value,
  href,
  sub,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  value: string;
  href: string;
  sub: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-shadow duration-[var(--duration-base)] hover:shadow-md"
    >
      <Icon size={24} strokeWidth={1.5} className="text-terracotta" />
      <h3 className="text-h3 font-medium">{title}</h3>
      <p className="text-foreground group-hover:text-terracotta-deep transition-colors">
        {value}
      </p>
      <p className="text-small text-foreground-muted">{sub}</p>
    </a>
  );
}
