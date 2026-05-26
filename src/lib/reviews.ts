export type Review = {
  id: string;
  name: string;
  age?: number;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;          // ISO
  title: string;
  body: string;
  verified: boolean;
  duration?: string;     // ex: "utilisatrice depuis 4 mois"
  highlight?: boolean;   // mettre en avant
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Camille",
    age: 29,
    rating: 5,
    date: "2026-03-12",
    title: "Pour la première fois en dix ans",
    body:
      "J’ai pu travailler normalement le premier jour de mes règles. Je l’ai gardée sous mon pull toute la journée, personne n’a rien remarqué. La chaleur arrive en 30 secondes, c’est bluffant.",
    verified: true,
    duration: "utilisatrice depuis 4 mois",
    highlight: true,
  },
  {
    id: "r2",
    name: "Inès",
    age: 24,
    rating: 5,
    date: "2026-02-28",
    title: "Adieu les anti-inflammatoires",
    body:
      "Je prenais 4 à 6 ibuprofènes par cycle. Depuis Lunova, j’en prends zéro. La fonction massage par vibrations est étonnamment efficace en complément de la chaleur.",
    verified: true,
    duration: "utilisatrice depuis 6 mois",
  },
  {
    id: "r3",
    name: "Sofia",
    age: 33,
    rating: 5,
    date: "2026-02-19",
    title: "Mieux qu’une bouillotte, et nomade",
    body:
      "L’autonomie tient toute ma journée de bureau au niveau 2. La pochette de transport est un vrai plus, je l’ai toujours dans mon sac. La ceinture est douce, je ne la sens plus après 5 minutes.",
    verified: true,
    duration: "utilisatrice depuis 2 mois",
  },
  {
    id: "r4",
    name: "Léa",
    age: 26,
    rating: 4,
    date: "2026-02-04",
    title: "Très efficace, j’aurais aimé plus chaud",
    body:
      "Très satisfaite, la chaleur soulage immédiatement. Petit bémol : sur mon premier jour très douloureux, j’aurais bien aimé un niveau 4 encore plus chaud. Le niveau 3 reste très bien.",
    verified: true,
    duration: "utilisatrice depuis 3 mois",
  },
  {
    id: "r5",
    name: "Naïma",
    age: 31,
    rating: 5,
    date: "2026-01-21",
    title: "Discrète, sérieuse, bien pensée",
    body:
      "J’ai apprécié l’emballage soigné et le guide imprimé. La coupure automatique après 30 minutes me rassure quand je m’endors avec. Vraiment un produit conçu avec attention.",
    verified: true,
    duration: "utilisatrice depuis 5 mois",
  },
  {
    id: "r6",
    name: "Margot",
    age: 22,
    rating: 5,
    date: "2026-01-08",
    title: "Cadeau de ma sœur, je la recommande à toutes",
    body:
      "Ma grande sœur me l’a offerte pour mon anniversaire. J’étais sceptique, je le suis plus du tout. C’est devenu mon objet préféré pendant la semaine difficile du cycle.",
    verified: true,
    duration: "utilisatrice depuis 7 mois",
  },
];

export function ratingDistribution(items: Review[] = reviews) {
  const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of items) dist[r.rating]++;
  return dist;
}
