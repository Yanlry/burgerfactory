"use client";

import {
  MAIN_FILTERS,
  SALE_SUB_FILTERS,
  type MainFilter,
  type SaleSubFilter,
} from "@/lib/filters";

interface ProductFiltersProps {
  main: MainFilter;
  sub: SaleSubFilter;
  onMain: (f: MainFilter) => void;
  onSub: (f: SaleSubFilter) => void;
}

export function ProductFilters({
  main,
  sub,
  onMain,
  onSub,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Main filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
        {MAIN_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => onMain(f.id)}
            aria-pressed={main === f.id}
            className={[
              "px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-gold",
              main === f.id
                ? "bg-gold text-black shadow-[0_0_16px_rgba(245,166,35,0.35)]"
                : "bg-anthracite-2 text-warm-white/60 border border-white/8 hover:border-gold/30 hover:text-warm-white",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Sub-filters — visible uniquement sous "Salé" */}
      {main === "sale" && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Sous-catégories salé"
        >
          {SALE_SUB_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => onSub(f.id)}
              aria-pressed={sub === f.id}
              className={[
                "px-3 py-1 rounded-full font-body text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-gold",
                sub === f.id
                  ? "bg-white/12 text-warm-white border border-white/20"
                  : "bg-transparent text-warm-white/40 border border-white/8 hover:border-white/20 hover:text-warm-white/70",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
