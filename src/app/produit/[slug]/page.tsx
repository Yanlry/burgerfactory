import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  products,
  getProductBySlug,
  getSimilarProducts,
} from "@/data/products";
import { CATEGORY_LABELS } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { CommanderButton } from "@/components/common/CommanderButton";
import { SimilarProducts } from "@/components/products/SimilarProducts";
import { ProductNavigation } from "@/components/products/ProductNavigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Produit introuvable | Burger Factory" };
  }

  const priceStr =
    product.price !== null
      ? `à partir de ${formatPrice(product.price)}`
      : product.menuPrice != null
        ? `Formule à ${formatPrice(product.menuPrice)}`
        : "";

  return {
    title: `${product.name} | Burger Factory`,
    description: `${product.description}${priceStr ? ` — ${priceStr}` : ""}. Commandez par téléphone au 09 85 05 78 03 — Burger Factory, Haubourdin.`,
    openGraph: {
      title: `${product.name} | Burger Factory`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const similar = getSimilarProducts(product, 4);

  // Navigation précédent / suivant par ordre d'ID
  const sorted = [...products].sort((a, b) => a.id - b.id);
  const idx = sorted.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  const isMenu =
    product.category === "menus" || product.category === "menu-enfant";

  return (
    <main className="min-h-screen bg-black pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto section-px">

        {/* Fil d'Ariane */}
        <nav
          className="flex items-center gap-2 mb-10 text-xs text-warm-white/35 font-body"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-warm-white transition-colors">
            Accueil
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/carte"
            className="hover:text-warm-white transition-colors"
          >
            La Carte
          </Link>
          <span aria-hidden>/</span>
          <span className="text-warm-white/60">{product.name}</span>
        </nav>

        {/* Grille hero produit */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Image */}
          <div className="relative aspect-square bg-anthracite-2 rounded-2xl overflow-hidden border border-white/5">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />

            {isMenu && (
              <div className="absolute top-4 left-4 bg-gold text-black text-xs font-body font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Formule
              </div>
            )}

            {product.featured && !isMenu && (
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm text-warm-white text-xs font-body font-medium px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                Signature
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="flex flex-col">

            {/* Catégorie */}
            <span className="font-body text-[0.65rem] text-gold/70 tracking-[0.3em] uppercase mb-4">
              {CATEGORY_LABELS[product.category]}
            </span>

            {/* Nom */}
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-warm-white leading-none mb-6">
              {product.name.toUpperCase()}
            </h1>

            {/* Séparateur */}
            <div className="h-px bg-gradient-to-r from-gold/40 via-gold/15 to-transparent mb-6" />

            {/* Description */}
            <p className="font-body text-warm-white/60 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Prix */}
            <div className="mb-8">
              <PriceDisplay product={product} size="lg" showMenu />
            </div>

            {/* CTA Commander */}
            <CommanderButton
              variant="primary"
              size="lg"
              productName={product.name}
              label="Commander"
              className="w-full sm:w-auto sm:self-start"
            />

            {/* Note menus */}
            {isMenu && (
              <p className="mt-4 font-body text-xs text-warm-white/25 leading-relaxed">
                Formule incluant frites et boisson. Prix et disponibilité
                confirmés lors de votre appel.
              </p>
            )}

            {/* Retour carte */}
            <Link
              href="/carte"
              className="mt-8 inline-flex items-center gap-2 font-body text-sm text-warm-white/35 hover:text-warm-white transition-colors self-start"
            >
              <ArrowLeft size={14} aria-hidden />
              Retour à la carte
            </Link>
          </div>
        </div>

        {/* Produits similaires */}
        {similar.length > 0 && <SimilarProducts products={similar} />}

        {/* Navigation précédent / suivant */}
        <ProductNavigation prev={prev} next={next} />

      </div>
    </main>
  );
}
