import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { LenisProvider } from "@/lib/providers/LenisProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Burger Factory — Haubourdin",
    template: "%s | Burger Factory",
  },
  description:
    "Burger Factory à Haubourdin : burgers artisanaux, chicken buckets, paninis et plus encore. Commandez par téléphone au 09 85 05 78 03.",
  keywords: [
    "burger factory",
    "haubourdin",
    "burgers",
    "chicken",
    "restaurant",
    "59320",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Burger Factory",
    title: "Burger Factory — Haubourdin",
    description:
      "Burgers premium, chicken buckets et paninis à Haubourdin. Découvrez notre carte et commandez par téléphone.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
