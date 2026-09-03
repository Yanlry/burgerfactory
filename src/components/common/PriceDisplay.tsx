import type { Product } from "@/types/product";
import { formatPrice, formatSupplement } from "@/lib/utils/formatPrice";

interface PriceDisplayProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  showMenu?: boolean;
  className?: string;
}

export function PriceDisplay({
  product,
  size = "md",
  showMenu = true,
  className = "",
}: PriceDisplayProps) {
  const priceSize = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  }[size];

  const labelSize = {
    sm: "text-xs",
    md: "text-xs md:text-sm",
    lg: "text-sm",
  }[size];

  if (product.sizes && product.sizes.length > 0) {
    const minPrice = Math.min(...product.sizes.map((s) => s.price));

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <span className={`font-display text-gold tracking-wide ${priceSize}`}>
          À partir de {formatPrice(minPrice)}
        </span>

        {showMenu && (
          <ul className="flex flex-col gap-1">
            {product.sizes.map((s) => (
              <li
                key={s.label}
                className={`flex items-center justify-between gap-4 font-body text-warm-white-2 ${labelSize}`}
              >
                <span>
                  <span className="text-warm-white font-medium">{s.label}</span>
                  {s.meatCount && (
                    <span className="text-warm-white/40 ml-2">
                      {s.meatCount} viande{s.meatCount > 1 ? "s" : ""}
                    </span>
                  )}
                </span>
                <span className="text-warm-white">{formatPrice(s.price)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {product.price !== null && (
        <span className={`font-display text-gold tracking-wide ${priceSize}`}>
          {formatPrice(product.price)}
        </span>
      )}

      {product.price === null && product.menuPrice != null && (
        <span className={`font-display text-gold tracking-wide ${priceSize}`}>
          {formatPrice(product.menuPrice)}
        </span>
      )}

      {showMenu && (
        <>
          {product.menuPrice != null && product.price !== null && (
            <span className={`font-body text-warm-white-2 ${labelSize}`}>
              En menu&nbsp;:{" "}
              <span className="text-warm-white">{formatPrice(product.menuPrice)}</span>
            </span>
          )}

          {product.menuSupplement != null && (
            <span className={`font-body text-warm-white-2 ${labelSize}`}>
              En menu&nbsp;:{" "}
              <span className="text-warm-white">{formatSupplement(product.menuSupplement)}</span>
            </span>
          )}
        </>
      )}
    </div>
  );
}
