import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata = { title: "Conditions générales de vente" };

export default function CgvPage() {
  return (
    <LegalLayout
      badge="Légal"
      title="Conditions générales de vente"
      intro="Les présentes CGV régissent la vente des produits Lunova entre Lunova SAS (le vendeur) et toute personne majeure (l'acheteuse) effectuant un achat sur lunova.fr."
    >
      <Block title="1. Produits">
        <p>
          Les produits proposés à la vente sont décrits avec précision sur le
          site. Les photographies sont non contractuelles. Lunova se réserve le
          droit de modifier l&apos;offre à tout moment.
        </p>
      </Block>

      <Block title="2. Prix">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises (TVA française
          en vigueur). Les frais de livraison sont offerts en France
          métropolitaine. Les éventuelles taxes douanières restent à la charge
          de l&apos;acheteuse pour les livraisons hors UE.
        </p>
      </Block>

      <Block title="3. Commande">
        <p>
          La commande devient ferme et définitive après validation du paiement.
          Un email de confirmation est envoyé à l&apos;adresse fournie. Lunova
          se réserve le droit d&apos;annuler toute commande en cas de litige
          antérieur ou de soupçon de fraude.
        </p>
      </Block>

      <Block title="4. Paiement">
        <p>
          Les paiements sont sécurisés par Stripe. Carte bancaire (Visa,
          Mastercard, American Express), Apple Pay, Google Pay. Aucune donnée
          de carte n&apos;est stockée sur nos serveurs.
        </p>
      </Block>

      <Block title="5. Livraison">
        <p>
          La livraison est effectuée en Colissimo suivi sous 2 à 4 jours ouvrés
          en France métropolitaine. Pour la Belgique, le Luxembourg et la Suisse,
          compte 4 à 7 jours ouvrés. Voir notre page Livraison pour le détail.
        </p>
      </Block>

      <Block title="6. Droit de rétractation — Essai 30 nuits">
        <p>
          Conformément à l&apos;article L. 221-18 du Code de la consommation,
          tu disposes de 14 jours pour te rétracter sans avoir à justifier de
          motif. Lunova va au-delà : tu disposes de <strong>30 nuits</strong>{" "}
          pour essayer la ceinture. Si elle ne te convient pas, écris à
          hello@lunova.fr — nous te remboursons intégralement, retour à notre
          charge.
        </p>
      </Block>

      <Block title="7. Garantie">
        <p>
          La ceinture Lunova est couverte par la <strong>garantie légale de
          conformité (2 ans)</strong> et la <strong>garantie des vices cachés</strong>.
          En cas de défaut, nous remplaçons le produit sans frais.
        </p>
      </Block>

      <Block title="8. Responsabilité">
        <p>
          Lunova ne saurait être tenue responsable d&apos;une mauvaise utilisation
          du produit. Lis attentivement le guide d&apos;utilisation. En cas de
          grossesse, de pacemaker ou de pathologie cutanée, demande l&apos;avis
          de ton médecin avant utilisation.
        </p>
      </Block>

      <Block title="9. Droit applicable">
        <p>
          Les présentes CGV sont régies par le droit français. En cas de litige,
          tu peux saisir le médiateur de la consommation (voir mentions légales)
          ou les tribunaux compétents.
        </p>
      </Block>

      <p className="text-small text-foreground-muted">
        Version du {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.
      </p>
    </LegalLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3 font-medium font-sans">{title}</h2>
      <div className="flex flex-col gap-3 text-foreground-muted">{children}</div>
    </section>
  );
}
