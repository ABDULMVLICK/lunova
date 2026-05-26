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
  images: [
    { src: "/product/lunova-1.jpg", alt: "Lunova vue de face, fond ivoire" },
    { src: "/product/lunova-2.jpg", alt: "Lunova vue de profil, détail bouton de commande" },
    { src: "/product/lunova-3.jpg", alt: "Lunova porté sous un pull, discret" },
    { src: "/product/lunova-4.jpg", alt: "Détail tissu doux et fermeture" },
  ],
  specs: {
    chaleur: {
      niveaux: 4,
      description: "4 niveaux progressifs — du doux au plus chaud, selon ton intensité",
      delai: "Chauffe en moins de 30 secondes",
    },
    massage: {
      modes: 4,
      description: "4 modes de vibration basse fréquence, combinables avec la chaleur",
    },
    batterie: {
      autonomie: "Plusieurs heures par charge selon le mode utilisé",
      recharge: "Recharge USB — câble fourni",
    },
    confort: {
      matiere: "ABS + TPR thermoplastique, doublure douce contre la peau",
      taille: "Sangle ajustable, taille unique pour la majorité des morphologies",
      discretion: "Profil fin — se porte sous un pull ou une chemise",
    },
    securite: {
      arret: "Coupure de sécurité automatique pendant l’utilisation prolongée",
      tension: "Basse tension (< 50 V) — sans danger pour un usage quotidien",
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
} as const;

export function formatPrice(cents: number, currency = product.currency) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
