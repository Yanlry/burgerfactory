"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { registerGSAP } from "@/lib/animations/gsap";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { CommanderButton } from "@/components/common/CommanderButton";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getProductsByCategory } from "@/data/products";

const drinks = getProductsByCategory("boissons");

export function DrinksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    registerGSAP();

    const title = sectionRef.current?.querySelector(".drinks-title");
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".drink-card");

    if (title) {
      gsap.fromTo(title,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }

    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
          delay: i * 0.15,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="boissons"
      className="bg-dark section-py"
      aria-label="Boissons"
    >
      <div className="max-w-7xl mx-auto section-px">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="drinks-title">
            <span className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase block mb-2">
              Rafraîchissements
            </span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-warm-white leading-none">
              BOISSONS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {drinks.map((drink) => (
            <article
              key={drink.id}
              className={[
                "drink-card",
                "bg-anthracite rounded-2xl overflow-hidden",
                "border border-white/[0.06] hover:border-gold/20",
                "transition-all duration-300 hover:-translate-y-1",
                "flex gap-6 items-center p-5 md:p-8",
              ].join(" ")}
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <ImageWithFallback
                  src={drink.image}
                  alt={drink.name}
                  fallbackLabel={drink.name}
                  fill
                  sizes="128px"
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 8px 20px rgba(245,166,35,0.15))" }}
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-display text-2xl md:text-3xl text-warm-white leading-tight mb-1">
                  {drink.name.toUpperCase()}
                </h3>
                <p className="font-body text-warm-white/40 text-xs mb-4 leading-relaxed">
                  {drink.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-gold">
                    {formatPrice(drink.price!)}
                  </span>
                  <CommanderButton
                    productName={drink.name}
                    variant="ghost"
                    size="sm"
                    label="Commander"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
