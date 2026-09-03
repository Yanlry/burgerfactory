export type ProductCategory =
  | "burgers"
  | "wraps"
  | "menus"
  | "chicken"
  | "snacks"
  | "paninis"
  | "desserts"
  | "boissons"
  | "menu-enfant"
  | "tacos"
  | "frites";

/** Une taille disponible pour un produit à formats multiples (tacos, bowl, frites) */
export interface ProductSize {
  label: string;
  price: number;
  /** Nombre de viandes incluses pour ce format (tacos/bowl) */
  meatCount?: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  /** Prix seul — null pour les menus composés (M1–M6, menu enfant) */
  price: number | null;
  /** Prix menu fixe — pour produits avec formule au prix défini */
  menuPrice?: number | null;
  /** Supplément menu (+3 €) — pour snacks/petits burgers (IDs 22–28) */
  menuSupplement?: number | null;
  image: string;
  featured?: boolean;
  /** IDs des produits composant un menu M1–M6 */
  composedOf?: number[];
  /** Formats disponibles avec prix dédié (tacos S–XXL, bowl M/L, frites petite/grande) */
  sizes?: ProductSize[];
}

export interface MenuProduct extends Product {
  category: "menus" | "menu-enfant";
  price: null;
  menuPrice: number;
  /** IDs des produits composant ce menu */
  composedOf?: number[];
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  burgers: "Burgers",
  wraps: "Wraps",
  menus: "Menus",
  chicken: "Chicken",
  snacks: "Snacks",
  paninis: "Paninis",
  desserts: "Desserts",
  boissons: "Boissons",
  "menu-enfant": "Menu Enfant",
  tacos: "Tacos",
  frites: "Frites",
};

export const CATEGORY_ORDER: ProductCategory[] = [
  "burgers",
  "wraps",
  "tacos",
  "menus",
  "chicken",
  "snacks",
  "paninis",
  "frites",
  "desserts",
  "boissons",
  "menu-enfant",
];
