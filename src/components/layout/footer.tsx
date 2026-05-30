import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";

/**
 * Footer minimaliste — 4 liens max, logo centré (brand book).
 */
const LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/contact", label: "Contact" },
  { href: "/livraison", label: "Livraison & retours" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col items-center gap-6 py-12 text-center">
        <Link href="/" aria-label="Lunova — accueil">
          <Logo size="lg" />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-small text-foreground-subtle">
          © {new Date().getFullYear()} Lunova. Conçu avec attention.
        </p>
      </Container>
    </footer>
  );
}
