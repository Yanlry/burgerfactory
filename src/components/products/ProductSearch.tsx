"use client";

import { Search, X } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (v: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative w-full sm:w-64">
      <Search
        size={14}
        aria-hidden
        className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white/35 pointer-events-none"
      />
      <input
        type="search"
        placeholder="Rechercher…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-anthracite-2 border border-white/8 rounded-full pl-10 pr-9 py-2.5 font-body text-sm text-warm-white placeholder:text-warm-white/30 focus:outline-none focus:border-gold/40 transition-colors"
        aria-label="Rechercher un produit"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-white/40 hover:text-warm-white transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
