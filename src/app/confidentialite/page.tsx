import Link from "next/link";
import { LegalLayout } from "@/components/layout/legal-layout";
import { ResetConsentButton } from "@/components/legal/reset-consent-button";

export const metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Lunova traite tes données personnelles, dans le respect du RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      badge="Confidentialité"
      title="Politique de confidentialité"
      intro="On ne collecte que ce qui sert vraiment. Voici quoi, pourquoi, et comment exercer tes droits."
    >
      {/* TODO_LEGAL_GO_LIVE: remplacer l'adresse par celle du siège social
          une fois l'immatriculation finalisée. */}
      <Block title="1. Qui est responsable du traitement ?">
        <p>
          <strong>Lunova SAS</strong> (société en cours d&apos;immatriculation,
          siège social en France) est responsable du traitement de tes
          données personnelles au sens du Règlement Général sur la
          Protection des Données (RGPD).
        </p>
        <p>
          Pour toute question relative à tes données ou exercer tes droits,
          écris-nous à{" "}
          <a href="mailto:privacy@lunova.fr" className="text-link underline">
            privacy@lunova.fr
          </a>
          .
        </p>
      </Block>

      <Block title="2. Quelles données collectons-nous ?">
        <p>Selon ton parcours sur le site, nous pouvons collecter :</p>
        <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc">
          <li>
            <strong>Identité & contact</strong> — prénom, nom, email, téléphone,
            adresse postale (commande, livraison, support).
          </li>
          <li>
            <strong>Paiement</strong> — données carte traitées exclusivement par
            Stripe, nous n&apos;y avons jamais accès.
          </li>
          <li>
            <strong>Historique de commande</strong> — articles, montants, dates.
          </li>
          <li>
            <strong>Communications</strong> — emails que tu nous envoies, avis
            laissés.
          </li>
          <li>
            <strong>Données techniques</strong> — uniquement si tu acceptes les
            cookies analytics : pages visitées, durée, type d&apos;appareil
            (anonymisé).
          </li>
        </ul>
      </Block>

      <Block title="3. Pourquoi ces données ?">
        <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc">
          <li>
            <strong>Exécuter ta commande</strong> (base légale : contrat) —
            traitement, livraison, SAV.
          </li>
          <li>
            <strong>Communiquer avec toi</strong> (base légale : intérêt
            légitime) — confirmation, suivi, support.
          </li>
          <li>
            <strong>Respecter nos obligations</strong> (base légale : légale) —
            comptabilité, fiscalité, garanties consommateur.
          </li>
          <li>
            <strong>Améliorer le site</strong> (base légale : consentement) —
            uniquement si tu acceptes les cookies analytics.
          </li>
          <li>
            <strong>Newsletter</strong> (base légale : consentement) —
            uniquement si tu t&apos;inscris.
          </li>
        </ul>
      </Block>

      <Block title="4. Combien de temps ?">
        <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc">
          <li>Données de commande : 5 ans (obligations comptables).</li>
          <li>Données de prospection (newsletter) : 3 ans après ton dernier contact.</li>
          <li>Cookies : 13 mois maximum.</li>
          <li>Avis : tant qu&apos;ils sont publiés.</li>
        </ul>
      </Block>

      <Block title="5. À qui transmettons-nous tes données ?">
        <p>Uniquement aux sous-traitants strictement nécessaires :</p>
        <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc">
          <li><strong>Vercel Inc.</strong> (États-Unis) — hébergement du site, certifié Data Privacy Framework EU-US.</li>
          <li><strong>Stripe Payments Europe Ltd</strong> (Irlande) — traitement des paiements.</li>
          <li><strong>Resend Inc.</strong> (États-Unis) — envoi des emails transactionnels.</li>
          <li><strong>Colissimo / La Poste</strong> — livraison.</li>
        </ul>
        <p>
          Nous ne vendons jamais tes données. Aucun transfert hors UE sans
          garanties appropriées (clauses contractuelles types).
        </p>
      </Block>

      <Block title="6. Tes droits">
        <p>Conformément au RGPD, tu disposes des droits suivants :</p>
        <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc">
          <li><strong>Accès</strong> — obtenir une copie de tes données.</li>
          <li><strong>Rectification</strong> — corriger une donnée inexacte.</li>
          <li><strong>Effacement</strong> — demander la suppression de tes données.</li>
          <li><strong>Limitation</strong> — geler un traitement contesté.</li>
          <li><strong>Portabilité</strong> — récupérer tes données dans un format lisible.</li>
          <li><strong>Opposition</strong> — refuser un traitement basé sur l&apos;intérêt légitime.</li>
          <li><strong>Retrait du consentement</strong> — à tout moment, sans justification.</li>
        </ul>
        <p>
          Exercice : un email à{" "}
          <a href="mailto:privacy@lunova.fr" className="text-link underline">
            privacy@lunova.fr
          </a>
          . Nous répondons sous 30 jours.
        </p>
        <p>
          En cas de désaccord, tu peux saisir la{" "}
          <a href="https://www.cnil.fr" className="text-link underline">
            CNIL
          </a>
          .
        </p>
      </Block>

      <Block title="7. Cookies">
        <p>Nous utilisons 3 catégories de cookies :</p>
        <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc">
          <li>
            <strong>Essentiels</strong> — panier, session, paiement.
            Indispensables, pas de consentement requis.
          </li>
          <li>
            <strong>Analytics</strong> — mesure d&apos;audience anonymisée
            (uniquement si tu acceptes).
          </li>
          <li>
            <strong>Marketing</strong> — pixels Meta / TikTok pour mesurer nos
            campagnes (uniquement si tu acceptes).
          </li>
        </ul>
        <p>
          Tu peux modifier ton choix à tout moment :{" "}
          <ResetConsentButton>
            rouvrir le bandeau de préférences cookies
          </ResetConsentButton>
          .
        </p>
      </Block>

      <Block title="8. Sécurité">
        <p>
          Connexion HTTPS chiffrée, accès aux bases de données restreint,
          mots de passe hashés, pas de stockage des données carte (Stripe
          PCI-DSS niveau 1).
        </p>
      </Block>

      <Block title="9. Modifications">
        <p>
          Cette politique peut évoluer. La version applicable est celle en
          ligne au moment de ta visite. Toute modification substantielle te
          sera notifiée par email si tu es abonnée.
        </p>
      </Block>

      <p className="text-small text-foreground-muted">
        Version du{" "}
        {new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        — voir aussi nos{" "}
        <Link href="/cgv" className="text-link underline">
          CGV
        </Link>{" "}
        et{" "}
        <Link href="/mentions-legales" className="text-link underline">
          mentions légales
        </Link>
        .
      </p>
    </LegalLayout>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h3 font-medium font-sans">{title}</h2>
      <div className="flex flex-col gap-3 text-foreground-muted">{children}</div>
    </section>
  );
}
