import Link from "next/link";
import { Lock } from "lucide-react";
import { Container } from "@/components/ui/container";

/**
 * Layout dépouillé pour le tunnel checkout — pas de navigation, juste le logo,
 * un indicateur "Paiement sécurisé", et un footer minimal.
 */
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-border bg-background">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl tracking-[-0.02em] text-foreground"
          >
            Lunova
          </Link>
          <span className="inline-flex items-center gap-2 text-small text-foreground-muted">
            <Lock size={14} strokeWidth={1.75} className="text-terracotta" />
            Paiement sécurisé
          </span>
        </Container>
      </header>

      <main className="min-h-[70vh]">{children}</main>

      <footer className="border-t border-border bg-background">
        <Container className="flex flex-col items-center gap-2 py-8 text-center text-small text-foreground-subtle sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Lunova.</p>
          <p className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/cgv" className="hover:text-foreground">CGV</Link>
            <Link href="/mentions-legales" className="hover:text-foreground">Mentions légales</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </p>
        </Container>
      </footer>
    </>
  );
}
