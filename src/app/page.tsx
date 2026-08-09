import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { MenusShowcase } from "@/components/home/MenusShowcase";
import { ChickenBucket } from "@/components/home/ChickenBucket";
import { PaniniSection } from "@/components/home/PaniniSection";
import { DessertsSection } from "@/components/home/DessertsSection";
import { DrinksSection } from "@/components/home/DrinksSection";
import { KidsMenu } from "@/components/home/KidsMenu";

export const metadata: Metadata = {
  title: "Burger Factory — Haubourdin",
  description:
    "Burger Factory à Haubourdin : burgers artisanaux, chicken buckets, paninis et plus encore. Commandez par téléphone au 09 85 05 78 03.",
  openGraph: {
    title: "Burger Factory — Haubourdin",
    description:
      "Burgers premium, chicken buckets et paninis à Haubourdin. Découvrez notre carte et commandez par téléphone.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <FeaturedProducts />
      <MenusShowcase />
      <ChickenBucket />
      <PaniniSection />
      <DessertsSection />
      <DrinksSection />
      <KidsMenu />
    </main>
  );
}
