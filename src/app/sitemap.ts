import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunova-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pages publiques — priorisées par importance commerciale
  return [
    { url: `${SITE_URL}/`,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/produit`,             lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${SITE_URL}/comment-ca-marche`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/avis`,                lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/vs-bouillotte`,       lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/notre-histoire`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`,                 lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE_URL}/ambassadrices`,       lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/livraison`,           lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`,             lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${SITE_URL}/cgv`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${SITE_URL}/mentions-legales`,    lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`,     lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];
}
