import Link from "next/link";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
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
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerChild } from "@/components/motion/stagger";
import { AnimatedStars } from "@/components/motion/animated-stars";
import { Counter } from "@/components/motion/counter";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { BundleSelector } from "@/components/product/bundle-selector";
import { ColorSelector } from "@/components/product/color-selector";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductStateProvider } from "@/components/product/product-state";
import { ShippingTimer } from "@/components/product/shipping-timer";
import { StickyCta } from "@/components/product/sticky-cta";
import { filterExistingImages } from "@/lib/media";
import { product, formatPrice } from "@/lib/product";
import { faqFlat } from "@/lib/faq";

export const metadata = {
  title: "Lunova — Ceinture chauffante 8 h pour douleurs menstruelles",
  description:
    "Chaleur ciblée, 5 niveaux de température, 4 modes de massage. 157 g, discrète sous tes vêtements. Livraison offerte, premier cycle ou remboursée.",
};

export default async function ProduitPage() {
  // Ne montre que les images qui existent vraiment dans /public/product/
  const availableImages = await filterExistingImages(product.images);

  // Mapping coloris → index de l'image principale à afficher.
  // Calcul automatique : pour chaque coloris, on trouve la 1re image dont le
  // fichier contient le slug du coloris (lunova-ivoire.* → ivoire, …).
  const colorToImageIdx: Record<string, number> = {};
  for (const c of product.colors) {
    const idx = availableImages.findIndex((img) =>
      img.src.toLowerCase().includes(`-${c.id}.`)
    );
    if (idx >= 0) colorToImageIdx[c.id] = idx;
  }

  return (
    <ProductStateProvider
      images={availableImages}
      colorToImageIdx={colorToImageIdx}
      defaultColorId={product.colors[0].id}
      defaultBundleId="duo"
    >
      <Header />

      <main>
        {/* GALERIE + INFOS PRODUIT */}
        <section className="section-py">
          <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
              {/* Galerie interactive */}
              <FadeIn>
                <ProductGallery />
              </FadeIn>

            {/* Infos */}
            <Stagger className="flex flex-col gap-6" stagger={0.08}>
              <StaggerChild>
                <Badge>
                  Stock — <Counter to={product.stock} className="tabular-nums" /> pièces disponibles
                </Badge>
              </StaggerChild>

              <StaggerChild as="h1" className="text-h2 md:text-h1">
                Lunova — Ceinture chauffante intelligente
              </StaggerChild>

              <StaggerChild className="flex items-center gap-3">
                <AnimatedStars rating={5} size={18} />
                <span className="text-small text-foreground-muted">
                  {product.rating} / 5 ·{" "}
                  <Link href="/avis" className="text-link underline underline-offset-2">
                    <Counter to={product.reviewsCount} className="tabular-nums" /> avis vérifiés
                  </Link>
                </span>
              </StaggerChild>

              <StaggerChild as="p" className="text-foreground-muted text-lg">
                Chaleur ciblée et constante plusieurs heures, 4 modes de
                massage, discrète sous tes vêtements. Conçue pour
                t’accompagner toute la journée du premier au dernier jour de
                tes règles.
              </StaggerChild>

              <StaggerChild className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-foreground">
                  {formatPrice(product.price)}
                </span>
                <span className="text-foreground-subtle line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <Badge variant="default" className="ml-2">
                  -<Counter to={Math.round((1 - product.price / product.comparePrice) * 100)} />%
                </Badge>
              </StaggerChild>

              <StaggerChild>
                <ul className="flex flex-col gap-2">
                  {[
                    "5 niveaux de chaleur — du doux au plus intense",
                    "4 modes de massage par vibrations basse fréquence",
                    "157 g, sangle de 60 à 170 cm — convient à toutes",
                    "Recharge USB · câble 1,5 m fourni",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-small">
                      <CheckCircle2 size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-terracotta" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </StaggerChild>

              {/* SÉLECTEUR DE COLORIS */}
              <StaggerChild>
                <ColorSelector />
              </StaggerChild>

              {/* SÉLECTEUR DE BUNDLE */}
              <StaggerChild className="pt-2">
                <BundleSelector />
              </StaggerChild>

              <StaggerChild className="flex flex-col gap-3 pt-2">
                <AddToCartButton fullWidth />
                <ShippingTimer />
              </StaggerChild>

              <StaggerChild className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-5 text-small">
                <Bullet Icon={Truck} title="Livraison offerte" sub="France métropolitaine" />
                <Bullet Icon={RotateCcw} title="Premier cycle ou remboursée" sub="Pas soulagée ? On rembourse." />
                <Bullet Icon={ShieldCheck} title="Garantie 2 ans" sub="Pièces & main d’œuvre" />
                <Bullet Icon={Sparkles} title="Conçue avec attention" sub="Tissu doux côté peau" />
              </StaggerChild>
            </Stagger>
          </Container>
        </section>

        {/* DESCRIPTION LONGUE */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-3xl">
            <FadeIn>
              <Badge variant="outline" className="mb-4">La promesse</Badge>
              <h2 className="mb-8">Conçue pour que tu n’y penses plus.</h2>
            </FadeIn>
            <Stagger className="flex flex-col gap-6 text-foreground-muted text-lg" stagger={0.12}>
              <StaggerChild as="p">
                Lunova est née d’une idée simple : tu mérites de vivre
                normalement pendant tes règles. Pas de bouillotte qui glisse, pas
                d’ibuprofène qui fatigue, pas de canapé subi.
              </StaggerChild>
              <StaggerChild as="p">
                Sa résistance chauffante monte en température en moins de
                30 secondes et maintient une chaleur stable et douce sur tout
                ton cycle d’utilisation. Cinq niveaux pour s’adapter à ton
                intensité, quatre modes de vibration basse fréquence pour
                détendre les muscles du bas-ventre.
              </StaggerChild>
              <StaggerChild as="p">
                Sa sangle élastique s’ajuste pour convenir à la majorité des
                morphologies. Le profil est volontairement fin — elle
                disparaît sous un pull, une chemise ou une robe. Personne ne
                voit rien.
              </StaggerChild>
              <StaggerChild as="p">
                Une sécurité coupe la chaleur en cas d’utilisation prolongée
                pour t’éviter tout risque pendant ton sommeil. La batterie se
                recharge simplement par USB, avec le câble fourni dans la
                boîte.
              </StaggerChild>
            </Stagger>
          </Container>
        </section>

        {/* SPÉCIFICATIONS TECHNIQUES */}
        <section className="section-py">
          <Container className="max-w-4xl">
            <FadeIn>
              <Badge variant="outline" className="mb-4">Spécifications</Badge>
              <h2 className="mb-12">Les détails techniques.</h2>
            </FadeIn>

            <Stagger className="grid gap-8 md:grid-cols-2" stagger={0.08}>
              <SpecGroup title="Chaleur">
                <Spec label="Niveaux" value="5 — du doux au plus intense" />
                <Spec label="Montée" value="Moins de 30 secondes" />
                <Spec label="Coupure auto" value="15 ou 30 min, selon le programme" />
              </SpecGroup>

              <SpecGroup title="Massage">
                <Spec label="Modes" value="4 vibrations basse fréquence" />
                <Spec label="Combinable" value="Avec la chaleur ou seul" />
              </SpecGroup>

              <SpecGroup title="Recharge">
                <Spec label="Type" value="USB — câble 1,5 m fourni" />
                <Spec label="Tension" value="3,7 V (basse tension)" />
                <Spec label="Puissance" value="10 W" />
              </SpecGroup>

              <SpecGroup title="Confort & taille">
                <Spec label="Poids" value="157,5 g" />
                <Spec label="Dimensions" value="18,5 × 8,5 × 1,5 cm" />
                <Spec label="Matière" value="ABS + textile ergonomique" />
                <Spec label="Sangle" value="Ajustable de 60 à 170 cm" />
                <Spec label="Coloris" value="Ivoire · Rose nude" />
              </SpecGroup>

              <SpecGroup title="Sécurité">
                <Spec label="Tension" value="3,7 V — usage quotidien sûr" />
                <Spec label="Coupure" value="Automatique après 15 ou 30 min" />
              </SpecGroup>

              <SpecGroup title="Dans la boîte">
                <ul className="flex flex-col gap-2 text-foreground-muted">
                  {product.boite.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 size={16} strokeWidth={1.75} className="mt-1 shrink-0 text-terracotta" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </SpecGroup>
            </Stagger>
          </Container>
        </section>

        {/* FAQ */}
        <section className="section-py bg-surface-alt">
          <Container className="max-w-3xl">
            <FadeIn className="mb-10 text-center">
              <Badge variant="outline" className="mb-4">Questions fréquentes</Badge>
              <h2>Tu as un doute ?</h2>
            </FadeIn>

            <FadeIn>
              <Accordion type="single" collapsible className="rounded-xl bg-surface px-6 shadow-sm">
                {faqFlat.slice(0, 8).map((item, i) => (
                  <AccordionItem key={i} value={`q-${i}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-8 text-center">
              <Button variant="link" asChild>
                <Link href="/faq">Voir toutes les questions</Link>
              </Button>
            </FadeIn>
          </Container>
        </section>

        {/* CTA STICKY-LIKE FINAL */}
        <section className="section-py">
          <Container>
            <FadeIn>
              <div className="rounded-2xl bg-noir px-8 py-16 text-center text-blanc md:px-16 md:py-20">
                <h2 className="text-blanc mx-auto max-w-[22ch]">
                  Prête à ne plus subir le premier jour ?
                </h2>
                <div className="mt-10">
                  <AddToCartButton />
                </div>
                <p className="mt-6 text-small text-blanc/60">
                  Livraison offerte · Premier cycle ou remboursée · Garantie 2 ans
                </p>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>

      <StickyCta />
      <Footer />
    </ProductStateProvider>
  );
}

function Bullet({
  Icon,
  title,
  sub,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-terracotta" />
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-foreground-muted">{sub}</p>
      </div>
    </div>
  );
}

function SpecGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-h3 font-medium">{title}</h3>
      <dl className="flex flex-col gap-3">{children}</dl>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2 last:border-0">
      <dt className="text-small text-foreground-muted">{label}</dt>
      <dd className="text-small font-medium text-foreground text-right">{value}</dd>
    </div>
  );
}
