export type Review = {
  id: string;
  name: string;
  age?: number;
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;          // ISO
  title: string;
  /** Format narratif en 3 parties — crédibilité maximale */
  story: {
    before: string;   // Ce qu'elle vivait avant
    why: string;      // Pourquoi elle a essayé Lunova
    after: string;    // Ce qui a changé concrètement
  };
  verified: boolean;
  duration?: string;     // ex: "utilisatrice depuis 4 mois"
  highlight?: boolean;   // mettre en avant
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Camille",
    age: 29,
    city: "Paris",
    rating: 5,
    date: "2026-03-12",
    title: "Pour la première fois en dix ans",
    story: {
      before:
        "Depuis mes 14 ans, le premier jour c’était trois Spasfon, une bouillotte tiède et le canapé. Je posais des RTT en avance pour « anticiper ».",
      why:
        "J’ai vu Lunova sur Insta. J’ai aimé qu’elles disent que ça remplace pas un médecin. J’ai testé, sans rien attendre.",
      after:
        "J’ai pu travailler normalement le premier jour de mes règles. Sous le pull, personne n’a rien remarqué. La chaleur arrive en 30 secondes, c’est bluffant.",
    },
    verified: true,
    duration: "utilisatrice depuis 4 mois",
    highlight: true,
  },
  {
    id: "r2",
    name: "Inès",
    age: 24,
    city: "Lyon",
    rating: 5,
    date: "2026-02-28",
    title: "Adieu les anti-inflammatoires",
    story: {
      before:
        "Je prenais 4 à 6 ibuprofènes par cycle. Mon gastro-entérologue m’avait dit d’arrêter. Je ne pouvais pas — la douleur me clouait au lit.",
      why:
        "J’avais peur que ce soit gadget. La garantie « premier cycle remboursée » m’a fait franchir le pas.",
      after:
        "Je prends zéro comprimé depuis. La fonction massage par vibrations est étonnamment efficace en complément de la chaleur. Mon estomac me remercie.",
    },
    verified: true,
    duration: "utilisatrice depuis 6 mois",
  },
  {
    id: "r3",
    name: "Sofia",
    age: 33,
    city: "Bordeaux",
    rating: 5,
    date: "2026-02-19",
    title: "Mieux qu’une bouillotte, et nomade",
    story: {
      before:
        "Je travaille dans l’événementiel — debout 10 h. La bouillotte impossible. Donc Doliprane à la chaîne, et journée gâchée.",
      why:
        "Ma sœur m’a offert Lunova pour mon anniversaire. C’était mieux qu’un cadeau, c’était une solution.",
      after:
        "L’autonomie tient toute ma journée debout au niveau 2. La pochette est toujours dans mon sac. Je ne la sens plus après 5 minutes — c’est devenu un réflexe.",
    },
    verified: true,
    duration: "utilisatrice depuis 2 mois",
  },
  {
    id: "r4",
    name: "Léa",
    age: 26,
    city: "Nantes",
    rating: 4,
    date: "2026-02-04",
    title: "Très efficace, j’aurais aimé plus chaud",
    story: {
      before:
        "Endométriose suspectée mais pas diagnostiquée encore. Premier jour = arrêt maladie ou télétravail au lit.",
      why:
        "Je voulais quelque chose de non-médicamenteux en complément de mes consultations.",
      after:
        "Très satisfaite, la chaleur soulage immédiatement. Petit bémol : sur mon premier jour très douloureux, j’aurais bien aimé un niveau 6. Le niveau 5 reste très bien.",
    },
    verified: true,
    duration: "utilisatrice depuis 3 mois",
  },
  {
    id: "r5",
    name: "Naïma",
    age: 31,
    city: "Marseille",
    rating: 5,
    date: "2026-01-21",
    title: "Discrète, sérieuse, bien pensée",
    story: {
      before:
        "Ma routine du J1 : pull oversize, coussin chauffant à la maison. Et donc, jamais dehors ces jours-là.",
      why:
        "C’est l’emballage et le ton du site qui m’ont convaincue. Pas de pression à l’achat.",
      after:
        "J’ai apprécié l’emballage soigné et le guide imprimé. La coupure automatique après 30 minutes me rassure quand je m’endors avec. Vraiment un produit conçu avec attention.",
    },
    verified: true,
    duration: "utilisatrice depuis 5 mois",
  },
  {
    id: "r6",
    name: "Margot",
    age: 22,
    city: "Strasbourg",
    rating: 5,
    date: "2026-01-08",
    title: "Cadeau de ma sœur, je la recommande à toutes",
    story: {
      before:
        "Étudiante en médecine, examens parfois en plein cycle. Catastrophique pour la concentration.",
      why:
        "Ma grande sœur me l’a offerte pour mon anniversaire. J’étais sceptique.",
      after:
        "Je le suis plus du tout. C’est devenu mon objet préféré pendant la semaine difficile du cycle. Je l’emporte en BU. Mes amies m’en empruntent — je vais devoir en commander une 2ème.",
    },
    verified: true,
    duration: "utilisatrice depuis 7 mois",
  },
];

export function ratingDistribution(items: Review[] = reviews) {
  const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of items) dist[r.rating]++;
  return dist;
}
