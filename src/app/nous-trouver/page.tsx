import type { Metadata } from "next";
import { NousTrouverView } from "./NousTrouverView";

export const metadata: Metadata = {
  title: "Nous Trouver | Burger Factory",
  description:
    "Retrouvez Burger Factory au 58 Rue Sadi Carnot, 59320 Haubourdin. Horaires d'ouverture, numéro de téléphone et livraison à domicile 18h–22h.",
  openGraph: {
    title: "Nous Trouver | Burger Factory — Haubourdin",
    description:
      "58 Rue Sadi Carnot, 59320 Haubourdin · Livraison 18h–22h · 09 85 05 78 03",
  },
};

export default function NousTrouverPage() {
  return (
    <main className="min-h-screen bg-black">
      <NousTrouverView />
    </main>
  );
}
