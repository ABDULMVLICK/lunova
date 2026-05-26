import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl tracking-[-0.02em] text-foreground"
        >
          Lunova
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-foreground/80 transition-colors duration-[var(--duration-fast)] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button size="sm" asChild>
          <Link href="/produit">Je me soulage</Link>
        </Button>
      </Container>
    </header>
  );
}
