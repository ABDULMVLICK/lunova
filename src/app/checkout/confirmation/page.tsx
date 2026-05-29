"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Mail, Package, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerChild } from "@/components/motion/stagger";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { useCheckoutStore } from "@/lib/checkout-store";

export default function ConfirmationPage() {
  const router = useRouter();
  const orderId = useCheckoutStore((s) => s.orderId);
  const shipping = useCheckoutStore((s) => s.shipping);
  const payment = useCheckoutStore((s) => s.payment);
  const reset = useCheckoutStore((s) => s.reset);

  // Pas de commande, on renvoie sur la home
  React.useEffect(() => {
    if (!orderId) router.replace("/");
  }, [orderId, router]);

  if (!orderId || !shipping) return null;

  return (
    <section className="section-py">
      <Container className="max-w-3xl text-center">
        <CheckoutProgress current="confirmation" />

        <FadeIn>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-soft">
            <CheckCircle2 size={32} strokeWidth={1.75} className="text-success" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mb-4">
            Merci{shipping.firstName ? `, ${shipping.firstName}` : ""}.
          </h1>
          <p className="mb-2 text-foreground-muted text-lg">
            Ta commande est confirmée.
          </p>
          <p className="mb-12 font-mono text-small text-foreground-muted">
            Numéro de commande : <span className="text-foreground">{orderId}</span>
          </p>
        </FadeIn>

        <Stagger className="mb-12 grid gap-4 text-left sm:grid-cols-3">
          {[
            {
              Icon: Mail,
              title: "Confirmation envoyée",
              body: `Tu reçois un email à ${shipping.email} dans les minutes qui viennent.`,
            },
            {
              Icon: Package,
              title: "Préparation 24 h",
              body: "On emballe ta Lunova avec attention dès le prochain jour ouvré.",
            },
            {
              Icon: Truck,
              title: "Livraison 2 à 4 jours",
              body: "Colissimo suivi. Tu reçois le tracking dès l’expédition.",
            },
          ].map(({ Icon, title, body }) => (
            <StaggerChild key={title}>
              <article className="rounded-xl border border-border bg-surface p-5 shadow-sm">
                <Icon size={22} strokeWidth={1.5} className="mb-3 text-terracotta" />
                <p className="mb-1 font-medium text-foreground">{title}</p>
                <p className="text-small text-foreground-muted">{body}</p>
              </article>
            </StaggerChild>
          ))}
        </Stagger>

        <FadeIn delay={0.2}>
          <div className="mb-8 rounded-xl bg-peche p-6 text-left text-small text-foreground">
            <p className="mb-2 font-medium">Adresse de livraison</p>
            <address className="not-italic text-foreground-muted">
              {shipping.firstName} {shipping.lastName}
              <br />
              {shipping.address}
              {shipping.address2 ? <><br />{shipping.address2}</> : null}
              <br />
              {shipping.postalCode} {shipping.city}
              <br />
              {shipping.country}
            </address>
            {payment && (
              <p className="mt-4 text-foreground-muted">
                Carte se terminant par •••• {payment.cardLast4}
              </p>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Button
            size="lg"
            onClick={() => {
              reset();
              router.push("/");
            }}
            asChild
          >
            <Link href="/">Retour à l’accueil</Link>
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
