import type { Product } from "@/types/product";

/**
 * Catalogue complet Burger Factory — 39 références.
 * Source de vérité : BURGER_FACTORY_APPLICATION.md
 * Ne jamais modifier les prix, noms ou compositions sans valider avec le fichier source.
 *
 * Convention image : /products/[id-padded]-[slug].png
 */
export const products: Product[] = [
  // ─── BURGERS (IDs 1–10) ───────────────────────────────────────────────────
  {
    id: 1,
    slug: "triple-beef",
    name: "Triple Beef",
    category: "burgers",
    description: "3 steaks 80 g, cheddar, iceberg, oignons rouges, sauce",
    price: 11,
    menuPrice: 13,
    image: "/products/01-triple-beef.png",
    featured: true,
  },
  {
    id: 2,
    slug: "mega-factory",
    name: "Méga Factory",
    category: "burgers",
    description: "2 steaks 80 g, cheddar, iceberg, oignons rouges, sauce BBQ / mayo",
    price: 9.5,
    menuPrice: 11.5,
    image: "/products/02-mega-factory.png",
    featured: true,
  },
  {
    id: 3,
    slug: "giant-factory",
    name: "Giant Factory",
    category: "burgers",
    description: "Steak 150 g façon bouchère, bacon, oeuf, cheddar, iceberg, oignons rouges, sauce Giant",
    price: 8.5,
    menuPrice: 11,
    image: "/products/03-giant-factory.png",
    featured: true,
  },
  {
    id: 4,
    slug: "bacon",
    name: "Bacon",
    category: "burgers",
    description: "Steak 80 g, cheddar, salade, oignons rouges, bacon, sauce",
    price: 6.5,
    menuPrice: 8.5,
    image: "/products/04-bacon.png",
  },
  {
    id: 5,
    slug: "chevre-miel",
    name: "Chèvre Miel",
    category: "burgers",
    description: "Steak 80 g, chèvre, miel, salade, oignons rouges, sauce",
    price: 6.5,
    menuPrice: 8.5,
    image: "/products/05-chevre-miel.png",
  },
  {
    id: 6,
    slug: "raclette",
    name: "Raclette",
    category: "burgers",
    description: "Steak 80 g, raclette, salade, oignons rouges, sauce",
    price: 6.5,
    menuPrice: 8.5,
    image: "/products/06-raclette.png",
  },
  {
    id: 7,
    slug: "biggy",
    name: "Biggy",
    category: "burgers",
    // Burger à tranche de pain intermédiaire entre les deux steaks (cf. spec § 4 #7)
    description: "2 steaks 45 g, cheddar, salade, oignons, cornichons, sauce Biggy — tranche de pain intermédiaire entre les steaks",
    price: 5.5,
    menuPrice: 8.5,
    image: "/products/07-biggy.png",
    featured: true,
  },
  {
    id: 8,
    slug: "chicken",
    name: "Chicken",
    category: "burgers",
    // Les tenders se trouvent sous la salade (cf. spec § 4 #8)
    description: "2 tenders, cheddar, salade, oignons, tomates, sauce chicken",
    price: 5.5,
    menuPrice: 8.5,
    image: "/products/08-chicken.png",
    featured: true,
  },
  {
    id: 9,
    slug: "country-chicken",
    name: "Country Chicken",
    category: "burgers",
    // Contient tenders + galette de pomme de terre (cf. spec § 4 #9)
    description: "2 tenders, galette de pomme de terre, cheddar, salade, oignons, tomates, sauce chicken",
    price: 6.5,
    menuPrice: 9.5,
    image: "/products/09-country-chicken.png",
    featured: true,
  },
  {
    id: 10,
    slug: "chicken-beef",
    name: "Chicken Beef",
    category: "burgers",
    // Combinaison tender + steak bœuf (cf. spec § 4 #10)
    description: "Tenders + steak 80 g, cheddar, salade, oignons, tomates, sauce Giant",
    price: 6.5,
    menuPrice: 9.5,
    image: "/products/10-chicken-beef.png",
  },

  // ─── WRAPS (IDs 11–13) ───────────────────────────────────────────────────
  {
    id: 11,
    slug: "wrap-chicken",
    name: "Wrap Chicken",
    category: "wraps",
    description: "2 tenders, cheddar, salade, oignons, tomates, sauce chicken",
    price: 6.5,
    menuPrice: 8.5,
    image: "/products/11-wrap-chicken.png",
  },
  {
    id: 12,
    slug: "wrap-chicken-beef",
    name: "Wrap Chicken Beef",
    category: "wraps",
    description: "Tenders + steak, cheddar, salade, oignons rouges, tomates, sauce mayo/ketchup",
    price: 7.5,
    menuPrice: 9.5,
    image: "/products/12-wrap-chicken-beef.png",
  },
  {
    id: 13,
    slug: "wrap-country",
    name: "Wrap Country",
    category: "wraps",
    // Wrap plus volumineux avec galette de pomme de terre (cf. spec § 4 #13)
    description: "2 tenders, galette de pomme de terre, cheddar, salade, oignons, tomates, sauce Giant",
    price: 7,
    menuPrice: 9.5,
    image: "/products/13-wrap-country.png",
  },

  // ─── MENUS M1–M6 (IDs 14–19) ─────────────────────────────────────────────
  // Ces menus sont des produits composés autonomes — price: null, menuPrice: prix du menu.
  {
    id: 14,
    slug: "m1-cheese-burger-x2",
    name: "M1 — Cheese Burger ×2",
    category: "menus",
    description: "2 Cheese Burgers + frites + boisson",
    price: null,
    menuPrice: 8.5,
    image: "/products/14-m1-cheese-burger-x2.png",
    composedOf: [26, 26],
  },
  {
    id: 15,
    slug: "m2-cheese-burger-double-cheese",
    name: "M2 — Cheese Burger + Double Cheese",
    category: "menus",
    description: "1 Cheese Burger + 1 Double Cheese + frites + boisson",
    price: null,
    menuPrice: 9,
    image: "/products/15-m2-cheese-burger-double-cheese.png",
    composedOf: [26, 27],
  },
  {
    id: 16,
    slug: "m3-chicken-burger-cheese-burger",
    name: "M3 — Chicken Burger + Cheese Burger",
    category: "menus",
    description: "1 Chicken Burger + 1 Cheese Burger + frites + boisson",
    price: null,
    menuPrice: 9,
    image: "/products/16-m3-chicken-burger-cheese-burger.png",
    composedOf: [8, 26],
  },
  {
    id: 17,
    slug: "m4-chicken-beef-cheese",
    name: "M4 — Chicken Beef + Cheese",
    category: "menus",
    description: "1 Chicken Beef + 1 Cheese Burger + frites + boisson",
    price: null,
    menuPrice: 9.5,
    image: "/products/17-m4-chicken-beef-cheese.png",
    composedOf: [10, 26],
  },
  {
    id: 18,
    slug: "m5-country-tenders-x4",
    name: "M5 — Country + Tenders ×4",
    category: "menus",
    description: "1 Country Chicken + 4 tenders + frites + boisson",
    price: null,
    menuPrice: 12.5,
    image: "/products/18-m5-country-tenders-x4.png",
    composedOf: [9, 22],
  },
  {
    id: 19,
    slug: "m6-biggy-x2",
    name: "M6 — Biggy ×2",
    category: "menus",
    description: "2 Biggy + frites + boisson",
    price: null,
    menuPrice: 12.5,
    image: "/products/19-m6-biggy-x2.png",
    composedOf: [7, 7],
  },

  // ─── CHICKEN BUCKETS (IDs 20–21) ─────────────────────────────────────────
  {
    id: 20,
    slug: "chicken-bucket-wings",
    name: "Chicken Bucket — Wings",
    category: "chicken",
    description: "1 kg de wings. Version menu : 1 bouteille + 4 petites frites",
    price: 17,
    menuPrice: 26,
    image: "/products/20-chicken-bucket-wings.png",
  },
  {
    id: 21,
    slug: "chicken-bucket-tenders",
    name: "Chicken Bucket — Tenders",
    category: "chicken",
    description: "1 kg de tenders. Version menu : 1 bouteille + 4 petites frites",
    price: 17,
    menuPrice: 26,
    image: "/products/21-chicken-bucket-tenders.png",
  },

  // ─── CHICKEN / SNACKS (IDs 22–25) ────────────────────────────────────────
  // menuSupplement: 3 → prix menu = price + 3 (non stocké comme prix fixe)
  {
    id: 22,
    slug: "5-tenders",
    name: "5 Tenders",
    category: "chicken",
    description: "5 tenders de poulet panés",
    price: 6,
    menuSupplement: 3,
    image: "/products/22-5-tenders.png",
  },
  {
    id: 23,
    slug: "5-wings",
    name: "5 Wings",
    category: "chicken",
    description: "5 wings de poulet panées",
    price: 6,
    menuSupplement: 3,
    image: "/products/23-5-wings.png",
  },
  {
    id: 24,
    slug: "8-nuggets",
    name: "8 Nuggets",
    category: "snacks",
    description: "8 nuggets de poulet",
    price: 6,
    menuSupplement: 3,
    image: "/products/24-8-nuggets.png",
  },
  {
    id: 25,
    slug: "8-mozza-sticks",
    name: "8 Mozza Sticks",
    category: "snacks",
    description: "8 bâtonnets de mozzarella panés",
    price: 6,
    menuSupplement: 3,
    image: "/products/25-8-mozza-sticks.png",
  },

  // ─── PETITS BURGERS / FISH (IDs 26–28) ───────────────────────────────────
  {
    id: 26,
    slug: "cheese",
    name: "Cheese",
    category: "burgers",
    description: "Petit burger avec steak et cheddar",
    price: 2.9,
    menuSupplement: 3,
    image: "/products/26-cheese.png",
  },
  {
    id: 27,
    slug: "double-cheese",
    name: "Double Cheese",
    category: "burgers",
    description: "Petit burger avec 2 steaks et cheddar",
    price: 3.9,
    menuSupplement: 3,
    image: "/products/27-double-cheese.png",
  },
  {
    id: 28,
    slug: "fish",
    name: "Fish",
    category: "burgers",
    description: "Burger au poisson pané, salade et sauce",
    price: 5,
    menuSupplement: 3,
    image: "/products/28-fish.png",
  },

  // ─── PANINIS (IDs 29–32) ──────────────────────────────────────────────────
  {
    id: 29,
    slug: "panini-3-fromages",
    name: "Panini 3 Fromages",
    category: "paninis",
    description: "Cheddar, chèvre, mozzarella",
    price: 5.5,
    menuPrice: 8,
    image: "/products/29-panini-3-fromages.png",
  },
  {
    id: 30,
    slug: "panini-savoyard",
    name: "Panini Savoyard",
    category: "paninis",
    description: "Raclette, lardon, mozzarella",
    price: 5.5,
    menuPrice: 8,
    image: "/products/30-panini-savoyard.png",
  },
  {
    id: 31,
    slug: "panini-indien",
    name: "Panini Indien",
    category: "paninis",
    description: "Sauce curry, poulet, mozzarella",
    price: 5.5,
    menuPrice: 8,
    image: "/products/31-panini-indien.png",
  },
  {
    id: 32,
    slug: "panini-oriental",
    name: "Panini Oriental",
    category: "paninis",
    description: "Sauce andalouse, poulet, mozzarella",
    price: 5.5,
    menuPrice: 8,
    image: "/products/32-panini-oriental.png",
  },

  // ─── DESSERTS (IDs 33–36) ─────────────────────────────────────────────────
  {
    id: 33,
    slug: "milkshake",
    name: "Milkshake",
    category: "desserts",
    // Parfums disponibles — liste non exhaustive (cf. spec § 10 : ne pas inventer la liste complète)
    description: "Milkshake au choix : KitKat, Kinder Bueno, Oreo, fraise…",
    price: 5,
    menuPrice: null,
    image: "/products/33-milkshake.png",
  },
  {
    id: 34,
    slug: "panini-nutella",
    name: "Panini Nutella",
    category: "desserts",
    // Uniquement pâte à tartiner — pas de banane (cf. spec § 4 #34)
    description: "Panini chaud garni uniquement de pâte à tartiner chocolat-noisette",
    price: 4,
    menuPrice: null,
    image: "/products/34-panini-nutella.png",
  },
  {
    id: 35,
    slug: "tiramisu",
    name: "Tiramisu au choix",
    category: "desserts",
    description: "Tiramisu individuel, parfum au choix",
    price: 3.5,
    menuPrice: null,
    image: "/products/35-tiramisu.png",
  },
  {
    id: 36,
    slug: "tarte-au-daim",
    name: "Tarte au Daim",
    category: "desserts",
    // Part triangulaire fine — pas un cheesecake épais (cf. spec § 4 #36)
    description: "Part triangulaire fine, couches croustillantes/biscuitées, caramel et chocolat au lait avec éclats croquants",
    price: 3.5,
    menuPrice: null,
    image: "/products/36-tarte-au-daim.png",
  },

  // ─── BOISSONS (IDs 37–38) ─────────────────────────────────────────────────
  {
    id: 37,
    slug: "canette-33cl",
    name: "Canette 33 cl",
    category: "boissons",
    description: "Boisson 33 cl — Coca-Cola, Oasis, Orangina…",
    price: 1.5,
    menuPrice: null,
    image: "/products/37-canette-33cl.png",
  },
  {
    id: 38,
    slug: "bouteille-15l",
    name: "Bouteille 1,5 L",
    category: "boissons",
    description: "Grande bouteille de boisson 1,5 L",
    price: 3.5,
    menuPrice: null,
    image: "/products/38-bouteille-15l.png",
  },

  // ─── MENU ENFANT (ID 39) ──────────────────────────────────────────────────
  {
    id: 39,
    slug: "menu-enfant",
    name: "Menu Enfant",
    category: "menu-enfant",
    // Composition exacte (cf. spec § 4 #39 et § 11)
    description: "1 choix parmi Cheese Burger, Nuggets ×4 ou Mini Tacos + 1 Capri-Sun + 1 petite frite + 1 surprise",
    price: null,
    menuPrice: 6,
    image: "/products/39-menu-enfant.png",
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
