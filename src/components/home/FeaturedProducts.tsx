"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { registerGSAP } from "@/lib/animations/gsap";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { CommanderButton } from "@/components/common/CommanderButton";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

const featured = getFeaturedProducts();

export function FeaturedProducts() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    registerGSAP();

    const cards = gsap.utils.toArray<HTMLElement>(".fp-card");

    cards.forEach((card, i) => {
      const isEven = i % 2 === 0;
      const imageEl = card.querySelector<HTMLElement>(".fp-image");
      const textEl  = card.querySelector<HTMLElement>(".fp-text");
      const numEl   = card.querySelector<HTMLElement>(".fp-num");
      const lineEl  = card.querySelector<HTMLElement>(".fp-line");

      // Line expand
      if (lineEl) {
        gsap.fromTo(lineEl,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1, duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 82%" },
          }
        );
      }

      // Number fade-in
      if (numEl) {
        gsap.fromTo(numEl,
          { opacity: 0, y: 20 },
          {
            opacity: 0.06, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 80%" },
          }
        );
      }

      // Image reveal (from outer edge)
      if (imageEl) {
        gsap.fromTo(imageEl,
          { x: isEven ? 60 : -60, opacity: 0, scale: 0.92 },
          {
            x: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 72%" },
          }
        );
      }

      // Text reveal
      if (textEl) {
        const children = textEl.querySelectorAll<HTMLElement>(".fp-text-item");
        gsap.fromTo(children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: card, start: "top 72%" },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="produits"
      className="bg-dark overflow-hidden"
      aria-label="Nos produits phares"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto section-px pt-20 pb-6">
        <span className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase">
          Nos spécialités
        </span>
        <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] text-warm-white leading-none mt-2">
          TOP {featured.length} INCONTOURNABLES
        </h2>
      </div>

      {/* Product cards */}
      <div className="divide-y divide-white/[0.06]">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const isEven = index % 2 === 0;
  const num    = String(product.id).padStart(2, "0");

  return (
    <article className="fp-card relative max-w-7xl mx-auto section-px overflow-hidden">
      {/* Gold separator */}
      <div
        className="fp-line h-px w-full bg-gradient-to-r from-gold/40 via-gold/15 to-transparent mb-0"
        aria-hidden
      />

      <div
        className={[
          "flex flex-col py-16 md:py-20 gap-10 md:gap-0",
          isEven ? "lg:flex-row" : "lg:flex-row-reverse",
        ].join(" ")}
      >
        {/* ── Text side ──────────────────────────────────── */}
        <div
          className={[
            "fp-text flex-1 flex flex-col justify-center z-10",
            isEven ? "lg:pr-16 lg:items-end lg:text-right" : "lg:pl-16",
          ].join(" ")}
        >
          {/* Background number */}
          <span
            className="fp-num absolute font-display text-[clamp(6rem,18vw,18rem)] text-warm-white select-none pointer-events-none leading-none"
            style={{
              opacity: 0,
              top: "50%",
              [isEven ? "left" : "right"]: "0",
              transform: "translateY(-55%)",
              zIndex: 0,
            }}
            aria-hidden
          >
            {num}
          </span>

          <div className="relative z-10">
            <span className="fp-text-item font-body text-[0.65rem] text-gold tracking-[0.3em] uppercase mb-3 block">
              {product.category === "burgers" ? "Burger" :
               product.category === "wraps"   ? "Wrap"   :
               product.category === "chicken" ? "Chicken" : product.category}
            </span>

            <h3 className="fp-text-item font-display text-[clamp(2.5rem,6vw,5.5rem)] text-warm-white leading-none mb-5">
              {product.name.toUpperCase()}
            </h3>

            <p className="fp-text-item font-body text-warm-white-2 text-base leading-relaxed max-w-[360px] mb-6">
              {product.description}
            </p>

            <div className="fp-text-item mb-8">
              <PriceDisplay product={product} size="lg" />
            </div>

            <div className={[
              "fp-text-item flex items-center gap-4",
              isEven ? "lg:justify-end" : "",
            ].join(" ")}>
              <CommanderButton
                productName={product.name}
                variant="primary"
                size="md"
                label="Commander"
              />
              <Link
                href={`/produit/${product.slug}`}
                className="font-body text-sm text-warm-white/50 hover:text-warm-white transition-colors underline underline-offset-4"
              >
                Voir le détail
              </Link>
            </div>
          </div>
        </div>

        {/* ── Image side ─────────────────────────────────── */}
        <div
          className={[
            "fp-image flex-1 flex items-center relative",
            isEven ? "justify-end" : "justify-start",
          ].join(" ")}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gold/[0.07] blur-[80px] scale-75 pointer-events-none"
          />

          <div className="relative w-full max-w-[420px] aspect-square lg:max-w-[480px]">
            <ImageWithFallback
              src={product.image}
              alt={`${product.name} — ${product.description}`}
              fallbackLabel={product.name}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 480px"
              className="object-contain"
              style={{ filter: "drop-shadow(0 20px 50px rgba(245,166,35,0.3))" }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
