"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/fade-in";
import { CheckoutProgress } from "@/components/checkout/checkout-progress";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { useCartStore, useCartHydrated } from "@/lib/cart-store";
import { useCheckoutStore } from "@/lib/checkout-store";

export default function LivraisonPage() {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const orderId = useCheckoutStore((s) => s.orderId);
  const shipping = useCheckoutStore((s) => s.shipping);
  const setShipping = useCheckoutStore((s) => s.setShipping);

  const [form, setForm] = React.useState({
    email: shipping?.email ?? "",
    firstName: shipping?.firstName ?? "",
    lastName: shipping?.lastName ?? "",
    address: shipping?.address ?? "",
    address2: shipping?.address2 ?? "",
    postalCode: shipping?.postalCode ?? "",
    city: shipping?.city ?? "",
    country: shipping?.country ?? "France",
    phone: shipping?.phone ?? "",
  });

  // Si panier vide après hydratation, redirige — sauf si une commande vient
  // d'être confirmée (orderId set), auquel cas on laisse la navigation finir.
  React.useEffect(() => {
    if (hydrated && items.length === 0 && !orderId) router.replace("/panier");
  }, [hydrated, items.length, orderId, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShipping(form);
    router.push("/checkout/paiement");
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section className="section-py">
      <Container className="max-w-5xl">
        <CheckoutProgress current="livraison" />

        <FadeIn>
          <h1 className="mb-8 text-h2">Où on te livre ?</h1>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
          <FadeIn>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <Field label="Email" htmlFor="email" hint="On t’envoie le suivi de commande ici.">
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="prenom@exemple.fr"
                  value={form.email}
                  onChange={update("email")}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Prénom" htmlFor="firstName">
                  <Input
                    id="firstName"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={update("firstName")}
                  />
                </Field>
                <Field label="Nom" htmlFor="lastName">
                  <Input
                    id="lastName"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={update("lastName")}
                  />
                </Field>
              </div>

              <Field label="Adresse" htmlFor="address">
                <Input
                  id="address"
                  required
                  autoComplete="address-line1"
                  placeholder="Numéro et rue"
                  value={form.address}
                  onChange={update("address")}
                />
              </Field>

              <Field label="Complément d’adresse (facultatif)" htmlFor="address2">
                <Input
                  id="address2"
                  autoComplete="address-line2"
                  placeholder="Appartement, étage, code…"
                  value={form.address2}
                  onChange={update("address2")}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-[1fr_2fr]">
                <Field label="Code postal" htmlFor="postalCode">
                  <Input
                    id="postalCode"
                    required
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="[0-9]{4,5}"
                    value={form.postalCode}
                    onChange={update("postalCode")}
                  />
                </Field>
                <Field label="Ville" htmlFor="city">
                  <Input
                    id="city"
                    required
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={update("city")}
                  />
                </Field>
              </div>

              <Field label="Pays" htmlFor="country">
                <Input
                  id="country"
                  required
                  autoComplete="country-name"
                  value={form.country}
                  onChange={update("country")}
                />
              </Field>

              <Field label="Téléphone" htmlFor="phone" hint="Pour le livreur, en cas de besoin uniquement.">
                <Input
                  id="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="06 12 34 56 78"
                  value={form.phone}
                  onChange={update("phone")}
                />
              </Field>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button variant="link" type="button" asChild>
                  <Link href="/panier">← Retour au panier</Link>
                </Button>
                <Button type="submit" size="lg" className="breathe">
                  Continuer vers le paiement
                </Button>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CheckoutSummary />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
