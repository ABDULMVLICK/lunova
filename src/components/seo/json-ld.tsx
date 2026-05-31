import { product } from "@/lib/product";
import { reviews } from "@/lib/reviews";

/**
 * Helper qui sérialise un objet en JSON-LD et l'inline dans la page.
 * Google le lit pour les rich snippets (étoiles, prix, dispo dans les SERP).
 */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Sérialisation avec échappement minimal — pas d'utilisateur input ici.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunova-site.vercel.app";

// ----- ORGANIZATION (layout root, présent sur toutes les pages) -----
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lunova",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "La solution choisie par les femmes qui refusent de dépendre des antidouleurs. Ceinture chauffante intelligente pour les règles douloureuses.",
    email: "hello@lunova.fr",
    sameAs: [
      // À compléter avec tes vrais réseaux quand ils existeront
      // "https://instagram.com/lunova.fr",
      // "https://tiktok.com/@lunova.fr",
    ],
  };
  return <JsonLd data={data} />;
}

// ----- WEBSITE (recherche dans les SERP) -----
export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lunova",
    url: SITE_URL,
    inLanguage: "fr-FR",
  };
  return <JsonLd data={data} />;
}

// ----- PRODUCT + AGGREGATE RATING + OFFER (PDP) -----
export function ProductJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — Ceinture chauffante intelligente`,
    description:
      "Chaleur ciblée 5 niveaux, 4 modes de massage, discrète sous tes vêtements. Cycles de 15 ou 30 min relançables. Premier cycle ou remboursée.",
    image: [
      `${SITE_URL}/product/lunova-rose.jpg`,
      `${SITE_URL}/product/lunova-ivoire.jpg`,
      `${SITE_URL}/product/lunova-lifestyle-rose.jpg`,
    ],
    brand: { "@type": "Brand", name: "Lunova" },
    sku: product.sku,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/produit`,
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "EUR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "FR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" },
        },
      },
    },
  };
  return <JsonLd data={data} />;
}

// ----- REVIEWS (page /avis — top 5 + AggregateRating) -----
export function ReviewsJsonLd() {
  const top = reviews.slice(0, 5);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — Ceinture chauffante intelligente`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: top.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      name: r.title,
      reviewBody: `${r.story.before} ${r.story.after}`,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
  return <JsonLd data={data} />;
}

// ----- BREADCRUMB générique -----
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
  return <JsonLd data={data} />;
}
