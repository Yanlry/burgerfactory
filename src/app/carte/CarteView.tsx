"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductGrid } from "@/components/products/ProductGrid";
import {
  filterProducts,
  MAIN_FILTERS,
  SALE_SUB_FILTERS,
  type MainFilter,
  type SaleSubFilter,
} from "@/lib/filters";

const MAIN_IDS = new Set(MAIN_FILTERS.map((f) => f.id));
const SUB_IDS = new Set(SALE_SUB_FILTERS.map((f) => f.id));

export function CarteView() {
  const searchParams = useSearchParams();

  const initialMain = searchParams.get("main");
  const initialSub = searchParams.get("sub");

  const [main, setMain] = useState<MainFilter>(
    initialMain && MAIN_IDS.has(initialMain as MainFilter)
      ? (initialMain as MainFilter)
      : "tout",
  );
  const [sub, setSub] = useState<SaleSubFilter>(
    initialSub && SUB_IDS.has(initialSub as SaleSubFilter)
      ? (initialSub as SaleSubFilter)
      : "tout-sale",
  );
  const [search, setSearch] = useState("");

  const handleMain = (f: MainFilter) => {
    setMain(f);
    setSub("tout-sale"); // reset sous-filtre à chaque changement de catégorie principale
  };

  const filtered = useMemo(
    () => filterProducts(products, main, sub, search),
    [main, sub, search],
  );

  return (
    <div>
      {/* Barre de filtres + recherche */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <ProductFilters
            main={main}
            sub={sub}
            onMain={handleMain}
            onSub={setSub}
          />
        </div>
        <ProductSearch value={search} onChange={setSearch} />
      </div>

      {/* Compteur */}
      <p className="font-body text-xs text-warm-white/25 mb-6" aria-live="polite" aria-atomic="true">
        {filtered.length}{" "}
        {filtered.length === 1 ? "produit" : "produits"}
      </p>

      <ProductGrid products={filtered} />
    </div>
  );
}
