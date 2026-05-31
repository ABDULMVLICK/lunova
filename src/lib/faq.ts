export type FaqItem = { q: string; a: string };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

export const faq: FaqCategory[] = [
  {
    id: "utilisation",
    title: "Utilisation",
    items: [
      {
        q: "Comment j’utilise Lunova la première fois ?",
        a: "Tu charges la ceinture pendant environ 2 heures avec le câble USB fourni. Tu l’enroules autour de ta taille, tu ajustes la sangle, tu allumes le bouton central. La chaleur arrive en moins de 30 secondes.",
      },
      {
        q: "Combien de temps puis-je la porter ?",
        a: "Chaque cycle dure 15 ou 30 minutes avant la coupure de sécurité. Tu peux le relancer autant de fois que tu veux. Au niveau doux, une charge complète te tient sur plusieurs cycles consécutifs — largement de quoi traverser ta journée de travail.",
      },
      {
        q: "Est-ce que je peux la porter la nuit ?",
        a: "Oui. Une sécurité coupe automatiquement la chaleur en cas d’utilisation prolongée, pour t’éviter tout risque pendant ton sommeil. Tu peux relancer un cycle si besoin.",
      },
      {
        q: "Elle est discrète sous les vêtements ?",
        a: "Oui. Profil fin, sans bouton apparent. Elle se glisse sous un pull, une chemise ou une robe sans se voir.",
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité & santé",
    items: [
      {
        q: "Est-ce sans danger ?",
        a: "Oui. Lunova fonctionne en très basse tension (3,7 V — équivalent d’un téléphone) et sa température maximale reste sous le seuil de risque cutané. La coupure automatique après 15 ou 30 minutes évite toute surchauffe.",
      },
      {
        q: "Je suis enceinte, puis-je l’utiliser ?",
        a: "Demande l’avis de ton médecin avant. La chaleur sur le bas-ventre n’est pas recommandée en cours de grossesse sans validation médicale.",
      },
      {
        q: "Puis-je l’utiliser avec un stérilet ?",
        a: "Oui. La chaleur reste superficielle et n’agit pas sur les dispositifs intra-utérins. Aucune contre-indication connue.",
      },
      {
        q: "Et avec un pacemaker ?",
        a: "La fonction massage utilise des vibrations basse fréquence. Si tu portes un pacemaker, désactive le mode massage et garde uniquement la chaleur. Demande conseil à ton cardiologue.",
      },
    ],
  },
  {
    id: "livraison",
    title: "Livraison & retours",
    items: [
      {
        q: "Combien coûte la livraison ?",
        a: "La livraison est offerte en France métropolitaine, sans minimum d’achat. Pour la Belgique, le Luxembourg et la Suisse, voir notre page Livraison.",
      },
      {
        q: "Quand vais-je la recevoir ?",
        a: "2 à 4 jours ouvrés après ta commande, en Colissimo suivi. Tu reçois un numéro de suivi par email à l’expédition.",
      },
      {
        q: "Comment marche la garantie « premier cycle ou remboursée » ?",
        a: "Tu utilises Lunova pendant tout ton prochain cycle. Si tu n’es pas soulagée, tu nous écris à hello@lunova.fr et on te rembourse intégralement, retour à notre charge — sans question.",
      },
      {
        q: "Et si ma ceinture tombe en panne ?",
        a: "Lunova est garantie 24 mois pièces et main d’œuvre. On t’en renvoie une neuve, sans questions inutiles.",
      },
    ],
  },
  {
    id: "produit",
    title: "Le produit",
    items: [
      {
        q: "Combien de niveaux de chaleur ?",
        a: "Cinq niveaux progressifs, du doux au plus chaud. Tu choisis selon l’intensité de tes douleurs du jour.",
      },
      {
        q: "À quoi servent les modes massage ?",
        a: "Quatre modes de vibration basse fréquence détendent les muscles du bas-ventre et du dos. Tu peux les combiner avec la chaleur ou les utiliser seuls.",
      },
      {
        q: "Je peux la laver ?",
        a: "Le module chauffant ne se lave pas — un coup de chiffon humide suffit. Évite l’eau directe sur le bouton et le port de charge.",
      },
      {
        q: "Quelle taille pour quel corps ?",
        a: "Une seule taille — la sangle ajustable convient à la majorité des morphologies. Si tu as un doute, écris-nous, on t’aide.",
      },
      {
        q: "Quels coloris sont disponibles ?",
        a: "Deux coloris pensés pour rester discrets : ivoire chaud et rose nude.",
      },
    ],
  },
];

export const faqFlat = faq.flatMap((c) => c.items);
