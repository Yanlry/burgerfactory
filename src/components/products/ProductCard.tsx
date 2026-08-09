"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { CommanderButton } from "@/components/common/CommanderButton";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isMenu =
    product.category === "menus" || product.category === "menu-enfant";

  return (
    <Link href={`/produit/${product.slug}`} className="group block" tabIndex={0}>
      <article className="h-full flex flex-col bg-anthracite-2 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold/25 hover:shadow-[0_8px_40px_rgba(245,166,35,0.12)]">

        {/* Image */}
        <div className="relative aspect-square bg-black/40 overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06]"
          />

          {/* Badge formule */}
          {isMenu && (
            <div
              aria-label="Formule"
              className="absolute top-2.5 left-2.5 bg-gold text-black text-[0.6rem] font-body font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
            >
              Formule
            </div>
          )}

          {/* Badge featured */}
          {product.featured && !isMenu && (
            <div
              aria-label="Signature"
              className="absolute top-2.5 left-2.5 bg-white/10 text-warm-white text-[0.6rem] font-body font-medium px-2.5 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm border border-white/10"
            >
              Signature
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="font-display text-lg text-warm-white leading-none mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="font-body text-xs text-warm-white/45 leading-relaxed line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>

          <div className="flex items-end justify-between gap-2 mt-auto">
            <PriceDisplay product={product} size="sm" showMenu={false} />

            {/* Stop propagation → ne navigue pas vers la fiche */}
            <div onClick={(e) => e.stopPropagation()}>
              <CommanderButton
                size="sm"
                variant="ghost"
                productName={product.name}
                label="Commander"
              />
            </div>
          </div>
        </div>

      </article>
    </Link>
  );
}
