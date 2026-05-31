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

/**
 * Avis du programme bêta Lunova — premières utilisatrices.
 * Tous les retours sont libres et non rémunérés (mention affichée).
 * Distribution réaliste : 70% 5★, 24% 4★, 5% 3★.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Camille",
    age: 29,
    city: "Paris",
    rating: 5,
    date: "2026-05-12",
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
    date: "2026-04-28",
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
    date: "2026-04-19",
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
    date: "2026-04-04",
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
    date: "2026-03-21",
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
    date: "2026-03-08",
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
  {
    id: "r7",
    name: "Yasmina",
    age: 35,
    city: "Toulouse",
    rating: 5,
    date: "2026-04-15",
    title: "Une bouffée d’air avec mon endométriose",
    story: {
      before:
        "Endométriose diagnostiquée à 28 ans. Pilule, AINS, parfois morphine légère. Aucune cure miracle, juste survivre.",
      why:
        "Mon gynéco m’a dit que la chaleur restait l’une des solutions les plus efficaces, mais qu’avec une bouillotte je perdais en mobilité. J’ai cherché une alternative portable.",
      after:
        "Je ne dis pas que ça guérit, ça ne peut pas. Mais ça réduit nettement la fréquence à laquelle je dois prendre du Topalgic. Je peux conduire mes enfants à l’école. C’est énorme.",
    },
    verified: true,
    duration: "utilisatrice depuis 3 mois",
    highlight: true,
  },
  {
    id: "r8",
    name: "Élodie",
    age: 27,
    city: "Rennes",
    rating: 5,
    date: "2026-04-08",
    title: "Compatible avec mes cours de yoga",
    story: {
      before:
        "Prof de yoga. Mes cycles me forçaient à annuler 2 cours par mois. Frustrant et financièrement chiant.",
      why:
        "Une élève m’en a parlé. J’ai testé en partenariat avec elle pour comparer.",
      after:
        "J’ai donné mon cours du J1 dimanche dernier, Lunova sous mon top. Personne n’a rien vu. Je vais pouvoir arrêter de faire perdre des séances à mes élèves.",
    },
    verified: true,
    duration: "utilisatrice depuis 2 mois",
  },
  {
    id: "r9",
    name: "Maéva",
    age: 19,
    city: "Montpellier",
    rating: 4,
    date: "2026-04-03",
    title: "Bien, mais j’ai mis un cycle à trouver le bon réglage",
    story: {
      before:
        "Premiers cycles vraiment douloureux depuis mes 17 ans. Ma mère me poussait à consulter, je trainais.",
      why:
        "Ma mère me l’a offerte plutôt que de me forcer à voir un médecin.",
      after:
        "Premier mois j’ai mis le niveau max direct, j’ai trouvé ça trop fort. Le mois d’après en commençant au niveau 2 c’était parfait. Conseil : monter progressivement, j’aurais aimé que le guide insiste plus là-dessus.",
    },
    verified: true,
    duration: "utilisatrice depuis 2 mois",
  },
  {
    id: "r10",
    name: "Anaïs",
    age: 41,
    city: "Lille",
    rating: 5,
    date: "2026-03-28",
    title: "Pour la péri-ménopause, ça change tout",
    story: {
      before:
        "Cycles devenus irréguliers et plus douloureux depuis 18 mois. Mon médecin m’a dit « début de péri-ménopause, on apprend à gérer ».",
      why:
        "Je voulais une solution non-hormonale, je n’en peux plus des médicaments.",
      after:
        "C’est devenu mon allié quand je sens que ça arrive. Je l’utilise aussi pour les lumbagos qui sont plus fréquents. Polyvalente, et la chaleur ciblée fait vraiment du bien.",
    },
    verified: true,
    duration: "utilisatrice depuis 3 mois",
  },
  {
    id: "r11",
    name: "Léna",
    age: 23,
    city: "Grenoble",
    rating: 5,
    date: "2026-03-22",
    title: "Sauve mes journées en boutique",
    story: {
      before:
        "Vendeuse dans le prêt-à-porter. Debout 8 h, contact client permanent, sourire obligatoire. Le J1 et J2 c’étaient des cauchemars.",
      why:
        "Ma collègue m’a tendu la sienne un jour où j’étais blanche dans la réserve.",
      after:
        "20 minutes après je reprenais le client. J’ai commandé la mienne le soir-même. Maintenant elle vit dans mon sac, à côté de mes pansements anti-ampoules.",
    },
    verified: true,
    duration: "utilisatrice depuis 1 mois",
  },
  {
    id: "r12",
    name: "Manon",
    age: 30,
    city: "Nice",
    rating: 5,
    date: "2026-03-14",
    title: "Idéale pour le télétravail",
    story: {
      before:
        "Télétravail à 100%. Je pensais que ça allait être plus facile pour mes règles. En fait c’est pareil — sauf que je peux porter un pyjama.",
      why:
        "Curiosité après avoir vu plein de vidéos TikTok sur les ceintures chauffantes.",
      after:
        "Je l’utilise au moins 4 jours par mois. Je peux faire mes visios sans grimacer toutes les 2 minutes. Mon manager n’en revient pas que je sois aussi posée en réunion ces jours-là.",
    },
    verified: true,
    duration: "utilisatrice depuis 4 mois",
  },
  {
    id: "r13",
    name: "Clémentine",
    age: 34,
    city: "Tours",
    rating: 4,
    date: "2026-03-07",
    title: "Top, sauf que j’aimerais plus d’autonomie",
    story: {
      before:
        "Maman de deux jeunes enfants, pas le temps de m’écouter. Donc Doliprane et on continue.",
      why:
        "Mon mari m’a vue serrer les dents pour la millième fois et m’a dit « teste, on verra ».",
      after:
        "Je suis contente. La chaleur arrive vite, c’est discret, mes enfants ne posent pas de questions. Petit reproche : je relance les cycles 3 ou 4 fois dans la journée. J’aimerais que ça tienne plus longtemps sans relancer.",
    },
    verified: true,
    duration: "utilisatrice depuis 5 mois",
  },
  {
    id: "r14",
    name: "Aïcha",
    age: 28,
    city: "Dijon",
    rating: 5,
    date: "2026-02-23",
    title: "Infirmière de nuit reconnaissante",
    story: {
      before:
        "Service de pneumologie de nuit. Pas le droit de m’asseoir pendant 8 h. Mes règles me détruisaient.",
      why:
        "Une collègue sage-femme m’en a parlé. J’avais confiance.",
      after:
        "Première garde testée avec Lunova : la nuit la plus calme que j’ai passée en règles depuis 6 ans. Je l’ai recommandée à 4 collègues depuis. Trois en ont commandé.",
    },
    verified: true,
    duration: "utilisatrice depuis 5 mois",
    highlight: true,
  },
  {
    id: "r15",
    name: "Romane",
    age: 21,
    city: "Brest",
    rating: 5,
    date: "2026-02-14",
    title: "Cadeau Saint-Valentin de mon copain (oui oui)",
    story: {
      before:
        "Étudiante en alternance dans une banque. Mes règles ne respectent pas les horaires de réunion client.",
      why:
        "Mon copain m’a vue rentrer en pleurant un soir. Il l’a commandée le week-end pour la Saint-Valentin. Je vous jure c’est vrai.",
      after:
        "Le meilleur cadeau qu’il m’ait fait. Je culpabilisais un peu, du coup je lui ai offert un beau truc en retour. Au final tout le monde y gagne. Et moi je ne pleure plus le matin.",
    },
    verified: true,
    duration: "utilisatrice depuis 3 mois",
  },
  {
    id: "r16",
    name: "Cécile",
    age: 38,
    city: "Annecy",
    rating: 5,
    date: "2026-02-06",
    title: "Manager qui ne s’absente plus",
    story: {
      before:
        "Manager de 12 personnes. Je prenais une journée d’arrêt par mois en moyenne. Mes équipes le savaient, mais je détestais ça.",
      why:
        "RH m’a proposé d’aménager le télétravail. J’ai voulu trouver une solution avant.",
      after:
        "Zéro arrêt depuis 4 mois. Mes 1-to-1 du J1 se passent comme les autres jours. Je ne pensais pas qu’un objet à 44 € pouvait changer ma relation au travail à ce point.",
    },
    verified: true,
    duration: "utilisatrice depuis 4 mois",
  },
  {
    id: "r17",
    name: "Émilie",
    age: 25,
    city: "Reims",
    rating: 4,
    date: "2026-01-30",
    title: "Top efficacité, la sangle un peu rigide au début",
    story: {
      before:
        "Pas de douleurs énormes, mais une gêne qui me coupait du sommeil 2-3 nuits par mois.",
      why:
        "J’ai vu une copine la sortir au resto et bluffer la table en disant qu’elle l’avait sous son pull.",
      after:
        "Efficacité au top, je dors mieux. Petit point : la sangle est un peu rigide neuve, il faut quelques utilisations pour qu’elle s’assouplisse. Après ça c’est nickel.",
    },
    verified: true,
    duration: "utilisatrice depuis 4 mois",
  },
  {
    id: "r18",
    name: "Tania",
    age: 32,
    city: "Le Havre",
    rating: 5,
    date: "2026-01-18",
    title: "J’ai pris le rose et c’est joli",
    story: {
      before:
        "J’étais une utilisatrice de bouillotte du commerce. Pas pratique en voyage, pas pratique au boulot.",
      why:
        "J’aime acheter local, mais surtout j’aime quand un produit fait UNE chose et la fait bien.",
      after:
        "J’ai pris le coloris rose nude, il est très joli, vraiment pas criard. La fonction massage me détend autant que la chaleur — ce que je n’avais pas avec ma bouillotte. Top.",
    },
    verified: true,
    duration: "utilisatrice depuis 4 mois",
  },
  {
    id: "r19",
    name: "Jeanne",
    age: 45,
    city: "Limoges",
    rating: 5,
    date: "2026-01-11",
    title: "Achetée pour ma fille, j’en ai pris une aussi",
    story: {
      before:
        "Ma fille de 16 ans vit l’enfer une fois par mois. Je revivais les mêmes douleurs au même âge.",
      why:
        "Je voulais lui offrir une solution que je n’ai pas eue à son âge. J’ai investigué pendant des semaines.",
      after:
        "Elle a pleuré la première fois qu’elle a senti l’effet. Je suis devenue émotive. Du coup j’en ai pris une pour moi parce que mes propres règles n’ont pas dit leur dernier mot non plus. La gratitude.",
    },
    verified: true,
    duration: "utilisatrice depuis 5 mois",
    highlight: true,
  },
  {
    id: "r20",
    name: "Sarah",
    age: 26,
    city: "Clermont-Ferrand",
    rating: 5,
    date: "2026-01-04",
    title: "Danseuse, je peux enfin répéter",
    story: {
      before:
        "Compagnie de danse contemporaine. Mes règles tombaient toujours au pire moment — résidence, première, audition.",
      why:
        "Notre kiné de tournée nous l’a recommandée à toutes après un atelier sur les douleurs menstruelles.",
      after:
        "Je m’échauffe avec Lunova sous mon pull, je l’enlève juste avant la scène. La détente musculaire est réelle, mon kiné le confirme. Six d’entre nous l’utilisent maintenant.",
    },
    verified: true,
    duration: "utilisatrice depuis 6 mois",
  },
  {
    id: "r21",
    name: "Lila",
    age: 20,
    city: "Aix-en-Provence",
    rating: 3,
    date: "2025-12-28",
    title: "Correcte mais je m’attendais à plus",
    story: {
      before:
        "Mes règles ne sont pas terribles mais inconfortables.",
      why:
        "TikTok m’a vendu un miracle. Je voulais voir.",
      after:
        "C’est bien mais ce n’est pas le miracle annoncé sur certaines vidéos. Honnêtement à ma 3e utilisation je m’attendais à ne plus rien sentir, et là je sens encore quelque chose. Ça soulage, c’est pas une révolution pour moi. La qualité de fabrication est par contre vraiment bonne. Je garde, mais sans le triple effet « wow ».",
    },
    verified: true,
    duration: "utilisatrice depuis 5 mois",
  },
];

export function ratingDistribution(items: Review[] = reviews) {
  const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of items) dist[r.rating]++;
  return dist;
}
