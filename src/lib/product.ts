/**
 * Données produit Lunova — source de vérité.
 * Specs alignées sur le modèle source (Y20) revisité en marque Lunova.
 */

export const product = {
  name: "Lunova",
  tagline: "La ceinture chauffante qui te soulage, partout, pendant 8 heures.",
  price: 4900,                  // en centimes
  comparePrice: 6900,           // prix barré
  currency: "EUR",
  sku: "LUNOVA-001",
  stock: 87,                    // valeur réelle, pas de fake urgency
  rating: 4.8,                  // brand-level (cumulé)
  reviewsCount: 1247,           // brand-level (cumulé)
  usersCount: 4800,             // brand-level
  colors: [
    { id: "ivoire", label: "Ivoire", hex: "#F1ECE5" },
    { id: "rose", label: "Rose nude", hex: "#E8D5C4" },
  ],
  // ----- MÉDIAS HERO -----
  // Coloris ivoire en main : aligné brand book "féminin sans rose bonbon".
  hero: {
    image: {
      src: "/product/lunova-ivoire.jpg",
      alt: "Ceinture chauffante Lunova ivoire, posée sur fond clair",
    },
  } as {
    video?: { src: string; poster?: string; alt?: string };
    image?: { src: string; alt: string };
  },
  // Galerie PDP — ivoire en main, rose comme variante
  images: [
    { src: "/product/lunova-ivoire.jpg", alt: "Ceinture Lunova ivoire, vue de face sur fond clair" },
    { src: "/product/lunova-rose.jpg", alt: "Ceinture Lunova rose nude, vue de face sur fond clair" },
    { src: "/product/lunova-coloris.jpg", alt: "Les deux coloris Lunova : ivoire et rose nude" },
    { src: "/product/lunova-cable.png", alt: "Ceinture Lunova ivoire avec son câble de recharge USB" },
    { src: "/product/lunova-unboxing.jpg", alt: "Ceinture Lunova dans son écrin, à l’ouverture" },
  ],
  specs: {
    chaleur: {
      niveaux: 5,
      description: "5 niveaux progressifs — du doux au plus chaud, selon ton intensité",
      delai: "Chauffe en moins de 30 secondes",
    },
    massage: {
      modes: 4,
      description: "4 modes de vibration basse fréquence, combinables avec la chaleur",
    },
    batterie: {
      tension: "3,7 V — basse tension, usage quotidien sûr",
      puissance: "10 W",
      recharge: "Recharge USB — câble 1,5 m fourni",
    },
    confort: {
      poids: "157,5 g",
      dimensions: "18,5 × 8,5 × 1,5 cm",
      matiere: "ABS + textile ergonomique, doublure douce contre la peau",
      taille: "Sangle ajustable de 60 à 170 cm — convient à toutes les morphologies",
      discretion: "Profil fin — se porte sous un pull ou une chemise",
    },
    securite: {
      arret: "Coupure automatique après 15 ou 30 minutes (selon le programme)",
      tension: "Basse tension (3,7 V) — sans danger pour un usage quotidien",
    },
  },
  boite: [
    "1 ceinture chauffante Lunova",
    "1 câble de recharge USB",
    "1 pochette de transport en lin",
    "1 guide d’utilisation imprimé",
  ],
  guarantee: {
    days: 30,
    label: "Essai 30 nuits — remboursée si elle ne te convient pas",
    warrantyMonths: 24,
  },
  shipping: {
    freeFrom: 0,                // livraison toujours offerte
    delay: "2 à 4 jours ouvrés",
    carrier: "Colissimo suivi",
  },
};

export function formatPrice(cents: number, currency = product.currency) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
