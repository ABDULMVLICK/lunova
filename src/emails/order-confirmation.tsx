import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Item = {
  name: string;
  colorLabel: string;
  quantity: number;
  price: number;
  image: string;
};

type Address = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
};

type OrderConfirmationProps = {
  orderId: string;
  firstName: string;
  items: Item[];
  total: number;
  shipping: Address;
  siteUrl: string;
};

const PALETTE = {
  ivory: "#F9F5F2",
  black: "#1A1A1A",
  terra: "#C9726B",
  peach: "#E8D5C4",
  muted: "#635c54",
  border: "#d9cec3",
};

const FONT_DISPLAY = '"Playfair Display", Georgia, serif';
const FONT_SANS = "Inter, system-ui, sans-serif";

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);

export function OrderConfirmationEmail({
  orderId,
  firstName,
  items,
  total,
  shipping,
  siteUrl,
}: OrderConfirmationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Ta commande Lunova est confirmée — n° {orderId}</Preview>
      <Body style={{ backgroundColor: PALETTE.ivory, fontFamily: FONT_SANS, margin: 0, padding: "32px 16px" }}>
        <Container style={{ backgroundColor: "#FFFFFF", borderRadius: 16, maxWidth: 560, margin: "0 auto", overflow: "hidden" }}>
          {/* Header */}
          <Section style={{ padding: "32px 32px 0", textAlign: "center" }}>
            <Text style={{ fontFamily: FONT_DISPLAY, fontSize: 28, letterSpacing: "-0.02em", margin: 0, color: PALETTE.black }}>
              Lunova
            </Text>
          </Section>

          {/* Title */}
          <Section style={{ padding: "32px 32px 0", textAlign: "center" }}>
            <Heading
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 32,
                lineHeight: 1.2,
                margin: "0 0 12px",
                color: PALETTE.black,
              }}
            >
              Merci{firstName ? `, ${firstName}` : ""}.
            </Heading>
            <Text style={{ fontSize: 16, color: PALETTE.muted, margin: 0 }}>
              Ta commande est confirmée et préparée avec attention.
            </Text>
          </Section>

          {/* Order ID */}
          <Section style={{ padding: "24px 32px 0", textAlign: "center" }}>
            <Text style={{ fontSize: 13, color: PALETTE.muted, margin: 0 }}>
              Numéro de commande
            </Text>
            <Text
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 14,
                color: PALETTE.black,
                margin: "4px 0 0",
              }}
            >
              {orderId}
            </Text>
          </Section>

          {/* Items */}
          <Section style={{ padding: "32px" }}>
            {items.map((it, i) => (
              <table
                key={i}
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{ borderBottom: `1px solid ${PALETTE.border}`, marginBottom: 12 }}
              >
                <tr>
                  <td style={{ width: 64, paddingBottom: 12 }}>
                    <Img
                      src={`${siteUrl}${it.image}`}
                      alt={it.name}
                      width={56}
                      height={56}
                      style={{ borderRadius: 8, objectFit: "cover", display: "block" }}
                    />
                  </td>
                  <td style={{ paddingLeft: 12, paddingBottom: 12, verticalAlign: "top" }}>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: PALETTE.black, margin: 0 }}>
                      {it.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: PALETTE.muted, margin: "2px 0 0" }}>
                      {it.colorLabel} · ×{it.quantity}
                    </Text>
                  </td>
                  <td style={{ textAlign: "right", verticalAlign: "top", paddingBottom: 12 }}>
                    <Text style={{ fontSize: 14, color: PALETTE.black, margin: 0 }}>
                      {formatPrice(it.price * it.quantity)}
                    </Text>
                  </td>
                </tr>
              </table>
            ))}

            <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: 16 }}>
              <tr>
                <td>
                  <Text style={{ fontSize: 13, color: PALETTE.muted, margin: 0 }}>
                    Livraison
                  </Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text style={{ fontSize: 13, color: "#5d8a6b", margin: 0 }}>Offerte</Text>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: PALETTE.black, margin: 0 }}>
                    Total
                  </Text>
                </td>
                <td style={{ textAlign: "right", paddingTop: 12 }}>
                  <Text
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 24,
                      color: PALETTE.black,
                      margin: 0,
                    }}
                  >
                    {formatPrice(total)}
                  </Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Shipping address */}
          <Section style={{ padding: "0 32px 32px" }}>
            <div
              style={{
                backgroundColor: PALETTE.peach,
                borderRadius: 12,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 500, color: PALETTE.black, margin: 0 }}>
                Adresse de livraison
              </Text>
              <Text style={{ fontSize: 13, color: PALETTE.muted, margin: "8px 0 0", lineHeight: 1.6 }}>
                {shipping.firstName} {shipping.lastName}
                <br />
                {shipping.address}
                {shipping.address2 ? (
                  <>
                    <br />
                    {shipping.address2}
                  </>
                ) : null}
                <br />
                {shipping.postalCode} {shipping.city}
                <br />
                {shipping.country}
              </Text>
            </div>
          </Section>

          <Hr style={{ borderColor: PALETTE.border, margin: 0 }} />

          {/* What's next */}
          <Section style={{ padding: "32px" }}>
            <Text
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 18,
                color: PALETTE.black,
                margin: "0 0 16px",
              }}
            >
              Et maintenant ?
            </Text>
            <Text style={{ fontSize: 14, color: PALETTE.muted, lineHeight: 1.7, margin: 0 }}>
              On prépare ta Lunova avec attention dans les prochaines 24 h
              ouvrées. Tu reçois un email avec ton numéro de suivi dès
              l’expédition. Livraison Colissimo en 2 à 4 jours.
            </Text>
          </Section>

          <Hr style={{ borderColor: PALETTE.border, margin: 0 }} />

          {/* Footer */}
          <Section style={{ padding: "24px 32px", textAlign: "center" }}>
            <Text style={{ fontSize: 12, color: PALETTE.muted, margin: 0 }}>
              Une question ?{" "}
              <Link href="mailto:hello@lunova.fr" style={{ color: PALETTE.terra }}>
                hello@lunova.fr
              </Link>
              {" · "}
              <Link href={siteUrl} style={{ color: PALETTE.terra }}>
                lunova.fr
              </Link>
            </Text>
            <Text style={{ fontSize: 11, color: "#8a8076", margin: "8px 0 0" }}>
              Premier cycle ou remboursée · Garantie 2 ans
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;
