import Link from "next/link";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import type { Product } from "@/types/product";

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-white/8" aria-label="Produits similaires">
      <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-warm-white leading-none mb-8">
        DANS LA MÊME CATÉGORIE
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((p) => (
          <Link
            key={p.id}
            href={`/produit/${p.slug}`}
            className="group block"
          >
            <div className="bg-anthracite-2 border border-white/5 rounded-xl overflow-hidden hover:border-gold/20 hover:shadow-[0_4px_24px_rgba(245,166,35,0.08)] transition-all duration-300">
              <div className="relative aspect-square bg-black/30">
                <ImageWithFallback
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 200px"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <div className="p-3">
                <p className="font-body font-semibold text-sm text-warm-white line-clamp-1 mb-1">
                  {p.name}
                </p>
                <PriceDisplay product={p} size="sm" showMenu={false} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
