import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export function LegalLayout({
  badge,
  title,
  intro,
  children,
}: {
  badge: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <section className="section-py">
          <Container className="max-w-3xl">
            <Badge variant="outline" className="mb-4">{badge}</Badge>
            <h1 className="mb-6">{title}</h1>
            {intro && <p className="mb-12 text-foreground-muted text-lg">{intro}</p>}
            <div className="legal-prose flex flex-col gap-8">{children}</div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
