/**
 * Formats a numeric price to French locale string.
 * e.g. 6.5 → "6,50 €"   11 → "11,00 €"
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Returns display label for supplement (e.g. "+3,00 €")
 */
export function formatSupplement(supplement: number): string {
  return `+${formatPrice(supplement)}`;
}
