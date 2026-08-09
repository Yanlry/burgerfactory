/**
 * Converts a product name to a URL-safe slug.
 * e.g. "Triple Beef" → "triple-beef"
 *      "Méga Factory" → "mega-factory"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Returns the image path for a product by its ID.
 * Images live in /public/products/ with zero-padded ID prefix.
 */
export function getProductImagePath(id: number, filename: string): string {
  return `/products/${filename}`;
}
