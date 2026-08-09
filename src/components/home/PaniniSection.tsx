"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { registerGSAP } from "@/lib/animations/gsap";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { CommanderButton } from "@/components/common/CommanderButton";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getProductsByCategory } from "@/data/products";
import type { Product } from "@/types/product";

const paninis = getProductsByCategory("paninis");

export function PaniniSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    registerGSAP();

    gsap.fromTo(
      [labelRef.current, titleRef.current],
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );

    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".panini-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 84%" },
          delay: i * 0.1,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="paninis"
      className="bg-dark section-py overflow-hidden"
      aria-label="Paninis"
    >
      <div className="max-w-7xl mx-auto section-px">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span ref={labelRef} className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase block mb-2">
            Fait maison
          </span>
          <h2
            ref={titleRef}
            className="font-display text-[clamp(3rem,8vw,6.5rem)] text-warm-white leading-none"
          >
            PANINIS
          </h2>
        </div>

        {/* Horizontal cards — 4 paninis */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {paninis.map((panini) => (
            <PaniniCard key={panini.id} panini={panini} />
          ))}
        </div>

        {/* Dessert panini teaser */}
        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-sm text-warm-white-2 max-w-sm leading-relaxed">
            Découvrez aussi notre{" "}
            <span className="text-warm-white font-medium">Panini Nutella</span>
            {" "}en dessert — chaud, gourmand, irrésistible.
          </p>
          <a
            href="#desserts"
            className="font-body text-xs text-gold hover:text-gold-hover transition-colors tracking-wide underline underline-offset-4"
          >
            Voir les desserts
          </a>
        </div>
      </div>
    </section>
  );
}

function PaniniCard({ panini }: { panini: Product }) {
  return (
    <article
      className={[
        "panini-card",
        "bg-anthracite rounded-2xl overflow-hidden",
        "border border-white/[0.06] hover:border-amber/30",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
        "flex flex-col",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-black/30">
        <ImageWithFallback
          src={panini.image}
          alt={panini.name}
          fallbackLabel={panini.name}
          fill
          sizes="(max-width: 768px) 45vw, (max-width: 1280px) 25vw, 320px"
          className="object-contain p-3"
          style={{ filter: "drop-shadow(0 10px 25px rgba(180,83,9,0.25))" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <h3 className="font-display text-xl md:text-2xl text-warm-white leading-tight mb-1">
          {panini.name.toUpperCase().replace("PANINI ", "")}
        </h3>
        <p className="font-body text-warm-white/40 text-xs leading-relaxed mb-4 flex-1">
          {panini.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-display text-xl md:text-2xl text-amber">
              {formatPrice(panini.price!)}
            </span>
            {panini.menuPrice && (
              <p className="font-body text-[0.6rem] text-warm-white/30 mt-0.5">
                Menu&nbsp;: {formatPrice(panini.menuPrice)}
              </p>
            )}
          </div>
          <CommanderButton
            productName={panini.name}
            variant="outline"
            size="sm"
            label="Commander"
          />
        </div>
      </div>
    </article>
  );
}
