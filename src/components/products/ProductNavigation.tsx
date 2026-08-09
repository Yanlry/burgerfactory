import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductNavigationProps {
  prev: Product | null;
  next: Product | null;
}

export function ProductNavigation({ prev, next }: ProductNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="flex items-center justify-between mt-16 pt-8 border-t border-white/8"
      aria-label="Navigation entre produits"
    >
      {prev ? (
        <Link
          href={`/produit/${prev.slug}`}
          className="group flex items-center gap-3 text-warm-white/50 hover:text-warm-white transition-colors"
        >
          <ArrowLeft
            size={18}
            aria-hidden
            className="flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
          />
          <div>
            <p className="font-body text-[0.65rem] text-warm-white/30 uppercase tracking-[0.2em] mb-0.5">
              Précédent
            </p>
            <p className="font-body font-medium text-sm">{prev.name}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/produit/${next.slug}`}
          className="group flex items-center gap-3 text-right text-warm-white/50 hover:text-warm-white transition-colors"
        >
          <div>
            <p className="font-body text-[0.65rem] text-warm-white/30 uppercase tracking-[0.2em] mb-0.5">
              Suivant
            </p>
            <p className="font-body font-medium text-sm">{next.name}</p>
          </div>
          <ArrowRight
            size={18}
            aria-hidden
            className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
