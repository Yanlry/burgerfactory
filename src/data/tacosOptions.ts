/**
 * Panneaux informatifs "composez votre tacos/bowl" — sauces, viandes, extras.
 * Ne sont pas des produits vendables individuellement (pas de prix/CTA propre) :
 * affichés en accompagnement des produits Tacos/Bowl sur l'accueil.
 */
export interface TacosBoard {
  key: string;
  title: string;
  image: string;
  note: string;
}

export const tacosBoards: TacosBoard[] = [
  {
    key: "sauces",
    title: "Sauces",
    image: "/products/42-sauces-board.png",
    note: "15 sauces au choix",
  },
  {
    key: "viandes",
    title: "Viandes",
    image: "/products/43-viandes-board.png",
    note: "10 viandes au choix",
  },
  {
    key: "extras",
    title: "Extras",
    image: "/products/44-viandes-board.png",
    note: "+0,80 € par extra",
  },
];
