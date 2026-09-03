import type { Product } from "@/types/product";

export type MainFilter = "tout" | "sale" | "sucre" | "boissons";
export type SaleSubFilter =
  | "tout-sale"
  | "burgers"
  | "wraps"
  | "tacos"
  | "chicken"
  | "snacks"
  | "paninis"
  | "frites"
  | "tous-menus"
  | "menus"
  | "enfant";

export const MAIN_FILTERS: { id: MainFilter; label: string }[] = [
  { id: "tout", label: "Tout" },
  { id: "sale", label: "Salé" },
  { id: "sucre", label: "Sucré" },
  { id: "boissons", label: "Boissons" },
];

export const SALE_SUB_FILTERS: { id: SaleSubFilter; label: string }[] = [
  { id: "tout-sale", label: "Tout" },
  { id: "burgers", label: "Burgers" },
  { id: "wraps", label: "Wraps" },
  { id: "tacos", label: "Tacos & Bowl" },
  { id: "chicken", label: "Chicken" },
  { id: "snacks", label: "Snacks" },
  { id: "paninis", label: "Paninis" },
  { id: "frites", label: "Frites" },
  { id: "tous-menus", label: "Tous les Menus" },
  { id: "menus", label: "Menu Double Burger" },
  { id: "enfant", label: "Enfant" },
];

// ID sets per filter — single source de vérité
const SUCRE_IDS = new Set([33,34,35,36]);
const BOISSON_IDS = new Set([37,38]);
const MENU_IDS  = new Set([14,15,16,17,18,19]);
const ENFANT_IDS = new Set([39]);

const SALE_SUB_IDS: Record<Exclude<SaleSubFilter, "tout-sale" | "tous-menus">, Set<number>> = {
  "burgers":   new Set([1,2,3,4,5,6,7,8,9,10,26,27,28]),
  "wraps":     new Set([11,12,13]),
  "tacos":     new Set([40,41,45]),
  "chicken":   new Set([20,21,22,23]),
  "snacks":    new Set([24,25]),
  "paninis":   new Set([29,30,31,32]),
  "frites":    new Set([46,47]),
  "menus":     MENU_IDS,
  "enfant":    ENFANT_IDS,
};

// "Tout" sous Salé = union de toutes les sous-catégories salées (y compris menus)
const SALE_ALL_IDS = new Set(
  Object.values(SALE_SUB_IDS).flatMap((set) => [...set]),
);

export function filterProducts(
  products: Product[],
  main: MainFilter,
  sub: SaleSubFilter,
  search: string,
): Product[] {
  let result = products;

  if (main === "sale") {
    if (sub === "tout-sale") {
      result = result.filter((p) => SALE_ALL_IDS.has(p.id));
    } else if (sub === "tous-menus") {
      // Tous les produits proposés en formule menu (prix menu fixe)
      result = result.filter((p) => p.menuPrice != null);
    } else {
      result = result.filter((p) => SALE_SUB_IDS[sub].has(p.id));
    }
  } else if (main === "sucre") {
    result = result.filter((p) => SUCRE_IDS.has(p.id));
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
