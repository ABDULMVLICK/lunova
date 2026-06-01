import { LegalLayout } from "@/components/layout/legal-layout";

export const metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      badge="Légal"
      title="Mentions légales"
      intro="Conformément aux dispositions de la loi pour la confiance dans l'économie numérique (LCEN), nous mettons à disposition de nos utilisateurs les informations suivantes."
    >
      {/* TODO_LEGAL_GO_LIVE: remplacer par les vraies données d'immatriculation
          avant le lancement officiel (capital, siège, RCS+SIREN, TVA, dirigeant) */}
      <Block title="Éditeur du site">
        <p>
          <strong>Lunova SAS</strong> — Société par actions simplifiée
          en cours d&apos;immatriculation au Registre du Commerce et des
          Sociétés français.
        </p>
        <p>
          Siège social : France
          <br />
          Capital social, RCS, SIREN et TVA intracommunautaire en cours
          d&apos;attribution — ces informations seront publiées dès la
          finalisation de l&apos;immatriculation.
        </p>
        <p>
          Représentant légal : direction de Lunova SAS
          <br />
          Contact éditorial :{" "}
          <a href="mailto:hello@lunova.fr" className="text-link underline">
            hello@lunova.fr
          </a>
        </p>
      </Block>

      <Block title="Hébergement">
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>
          <br />
          340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
          <br />
          <a href="https://vercel.com" className="text-link underline">vercel.com</a>
        </p>
      </Block>

      <Block title="Propriété intellectuelle">
        <p>
          L&apos;ensemble du contenu du site (textes, images, logos, marques) est
          la propriété exclusive de Lunova SAS, sauf mention contraire. Toute
          reproduction, représentation ou diffusion, totale ou partielle, est
          interdite sans autorisation écrite préalable.
        </p>
      </Block>

      <Block title="Données personnelles">
        <p>
          Lunova collecte et traite des données personnelles dans le respect du
          Règlement Général sur la Protection des Données (RGPD). Pour exercer
          tes droits d&apos;accès, de rectification, d&apos;effacement, de
          portabilité ou d&apos;opposition, écris à privacy@lunova.fr.
        </p>
      </Block>

      <Block title="Cookies">
        <p>
          Le site utilise uniquement des cookies essentiels au fonctionnement et
          des cookies de mesure d&apos;audience anonymisés. Aucun cookie
          publicitaire ni de tracking tiers.
        </p>
      </Block>

      <Block title="Médiation">
        <p>
          En cas de litige non résolu avec notre service client, tu peux saisir
          gratuitement le médiateur de la consommation :{" "}
          <a href="https://www.cmap.fr" className="text-link underline">cmap.fr</a>.
        </p>
      </Block>

      <p className="text-small text-foreground-muted">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}.
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
