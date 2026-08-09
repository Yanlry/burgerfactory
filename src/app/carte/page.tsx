import type { Metadata } from "next";
import { CarteView } from "./CarteView";

export const metadata: Metadata = {
  title: "La Carte | Burger Factory",
  description:
    "Découvrez notre carte complète : burgers, wraps, chicken, paninis, desserts et boissons. Commandez par téléphone au 09 85 05 78 03 — Burger Factory, Haubourdin.",
  openGraph: {
    title: "La Carte | Burger Factory",
    description:
      "Burgers, wraps, chicken, paninis, desserts — commandez par téléphone.",
    url: "https://burgerfactory-haubourdin.fr/carte",
  },
};

export default function CartePage() {
  return (
    <main className="min-h-screen bg-black pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto section-px">

        {/* En-tête */}
        <header className="mb-12">
          <span className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase">
            Notre sélection
          </span>
          <h1 className="font-display text-[clamp(3.5rem,9vw,8rem)] text-warm-white leading-none mt-1">
            LA CARTE
          </h1>
          <div className="h-px bg-gradient-to-r from-gold/60 via-gold/20 to-transparent mt-4" />
        </header>

        <CarteView />
      </div>
    </main>
  );
}
