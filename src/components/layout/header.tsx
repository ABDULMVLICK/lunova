import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/cart/cart-button";
import { Logo } from "@/components/brand/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AnnouncementBar } from "@/components/layout/announcement-bar";

const NAV = [
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MobileMenu items={NAV} />
          <Link href="/" aria-label="Lunova — accueil">
            <Logo />
          </Link>
        </div>

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

        <div className="flex items-center gap-2">
          <CartButton />
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/produit">Je me soulage</Link>
          </Button>
        </div>
      </Container>
      </header>
    </>
  );
}
