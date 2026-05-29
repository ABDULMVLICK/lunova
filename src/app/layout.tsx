import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CartDrawer } from "@/components/cart/cart-drawer";
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
    default: "Lunova — La chaleur qui te soulage, partout, pendant 8h",
    template: "%s · Lunova",
  },
  description:
    "Tu mérites de vivre normalement pendant tes règles. Lunova diffuse une chaleur douce et constante pendant 8 heures, discrète sous tes vêtements.",
  metadataBase: new URL("https://lunova.fr"),
  openGraph: {
    title: "Lunova — La chaleur qui te soulage",
    description:
      "Chaleur douce et constante pendant 8h. Discrète sous tes vêtements.",
    type: "website",
    locale: "fr_FR",
  },
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
        <ScrollProgress />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
