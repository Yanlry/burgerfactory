import type { Product } from "@/types/product";

export type MainFilter = "tout" | "sale" | "sucre" | "tous-menus" | "menus" | "boissons";
export type SaleSubFilter =
  | "tout-sale"
  | "burgers"
  | "wraps"
  | "chicken"
  | "snacks"
  | "paninis";

export const MAIN_FILTERS: { id: MainFilter; label: string }[] = [
  { id: "tout", label: "Tout" },
  { id: "sale", label: "Salé" },
  { id: "sucre", label: "Sucré" },
  { id: "tous-menus", label: "Tous les Menus" },
  { id: "menus", label: "Menu Double Burger" },
  { id: "boissons", label: "Boissons" },
];

export const SALE_SUB_FILTERS: { id: SaleSubFilter; label: string }[] = [
  { id: "tout-sale", label: "Tout" },
  { id: "burgers", label: "Burgers" },
  { id: "wraps", label: "Wraps" },
  { id: "chicken", label: "Chicken" },
  { id: "snacks", label: "Snacks" },
  { id: "paninis", label: "Paninis" },
];

// ID sets per filter — single source of truth
const SALE_IDS = new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,20,21,22,23,24,25,26,27,28,29,30,31,32]);
const SUCRE_IDS = new Set([33,34,35,36]);
const MENU_IDS  = new Set([14,15,16,17,18,19,39]);
const BOISSON_IDS = new Set([37,38]);

const SALE_SUB_IDS: Record<SaleSubFilter, Set<number>> = {
  "tout-sale": SALE_IDS,
  "burgers":   new Set([1,2,3,4,5,6,7,8,9,10,26,27,28]),
  "wraps":     new Set([11,12,13]),
  "chicken":   new Set([20,21,22,23]),
  "snacks":    new Set([24,25]),
  "paninis":   new Set([29,30,31,32]),
};

export function filterProducts(
  products: Product[],
  main: MainFilter,
  sub: SaleSubFilter,
  search: string,
): Product[] {
  let result = products;

  if (main === "sale") {
    const allowed = sub === "tout-sale" ? SALE_IDS : SALE_SUB_IDS[sub];
    result = result.filter((p) => allowed.has(p.id));
  } else if (main === "sucre") {
    result = result.filter((p) => SUCRE_IDS.has(p.id));
  } else if (main === "tous-menus") {
    // Tous les produits proposés en formule menu (prix menu fixe)
    result = result.filter((p) => p.menuPrice != null);
  } else if (main === "menus") {
    result = result.filter((p) => MENU_IDS.has(p.id));
  } else if (main === "boissons") {
    result = result.filter((p) => BOISSON_IDS.has(p.id));
  }
  // "tout" → pas de filtre sur la catégorie principale

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }

  return result;
}
