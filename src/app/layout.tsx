import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CookieBanner } from "@/components/legal/cookie-banner";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lunova — La ceinture chauffante qui te soulage, sans antidouleurs",
    template: "%s · Lunova",
  },
  description:
    "Chaleur ciblée 5 niveaux, 4 modes de massage, discrète sous tes vêtements. Premier cycle ou remboursée. Livraison offerte en 2 à 4 jours.",
  metadataBase: new URL("https://lunova.fr"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lunova — Pour les femmes qui refusent de dépendre des antidouleurs",
    description:
      "Chaleur ciblée 5 niveaux, 4 modes de massage. Discrète. Premier cycle ou remboursée.",
    type: "website",
    locale: "fr_FR",
    siteName: "Lunova",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunova — La ceinture chauffante qui te soulage",
    description: "Premier cycle ou remboursée. Livraison offerte.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F9F5F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <ScrollProgress />
        {children}
        <CartDrawer />
        <CookieBanner />
      </body>
    </html>
  );
}
