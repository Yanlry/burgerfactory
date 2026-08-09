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

const desserts = getProductsByCategory("desserts");

const milkshake = desserts.find((d) => d.id === 33)!;
const others    = desserts.filter((d) => d.id !== 33);

export function DessertsSection() {
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

    // Milkshake hero reveal
    const hero = sectionRef.current?.querySelector<HTMLElement>(".milkshake-hero");
    if (hero) {
      gsap.fromTo(hero,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: hero, start: "top 78%" },
        }
      );
    }

    // Other desserts
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".dessert-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 84%" },
          delay: i * 0.1,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="desserts"
      className="bg-anthracite section-py overflow-hidden"
      aria-label="Desserts"
    >
      <div className="max-w-7xl mx-auto section-px">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span ref={labelRef} className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase block mb-2">
            Pour finir en beauté
          </span>
          <h2
            ref={titleRef}
            className="font-display text-[clamp(3rem,8vw,6.5rem)] text-warm-white leading-none"
          >
            DESSERTS
          </h2>
        </div>

        {/* Milkshake hero card */}
        <div className="milkshake-hero grid grid-cols-1 lg:grid-cols-2 gap-0 mb-6 rounded-2xl overflow-hidden border border-white/[0.06] bg-anthracite-2">
          {/* Image */}
          <div className="relative aspect-square lg:aspect-auto min-h-[300px] bg-black/40">
            <ImageWithFallback
              src={milkshake.image}
              alt={milkshake.name}
              fallbackLabel={milkshake.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
              style={{ filter: "drop-shadow(0 20px 50px rgba(180,83,9,0.35))" }}
            />
          </div>
          {/* Text */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="font-body text-[0.65rem] text-caramel tracking-[0.3em] uppercase block mb-4">
              Le classique
            </span>
            <h3 className="font-display text-[clamp(3rem,6vw,5rem)] text-warm-white leading-none mb-4">
              MILKSHAKE
            </h3>
            <p className="font-body text-warm-white-2 text-base leading-relaxed mb-8 max-w-[320px]">
              {milkshake.description}
            </p>
            <div className="flex items-center gap-6">
              <span className="font-display text-4xl text-caramel">
                {formatPrice(milkshake.price!)}
              </span>
              <CommanderButton
                productName={milkshake.name}
                variant="primary"
                size="md"
                label="Commander"
              />
            </div>
          </div>
        </div>

        {/* Other desserts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((dessert) => (
            <DessertCard key={dessert.id} dessert={dessert} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DessertCard({ dessert }: { dessert: Product }) {
  return (
    <article
      className={[
        "dessert-card",
        "bg-anthracite-2 rounded-2xl overflow-hidden",
        "border border-white/[0.06] hover:border-caramel/30",
        "transition-all duration-300 hover:-translate-y-1",
        "flex flex-col",
      ].join(" ")}
    >
      <div className="relative w-full aspect-square bg-black/30">
        <ImageWithFallback
          src={dessert.image}
          alt={dessert.name}
          fallbackLabel={dessert.name}
          fill
          sizes="(max-width: 640px) 90vw, 33vw"
          className="object-contain p-4"
          style={{ filter: "drop-shadow(0 10px 30px rgba(146,64,14,0.3))" }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-2xl text-warm-white leading-tight mb-1">
          {dessert.name.toUpperCase()}
        </h3>
        <p className="font-body text-warm-white/40 text-xs leading-relaxed mb-4 flex-1">
          {dessert.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-caramel">
            {formatPrice(dessert.price!)}
          </span>
          <CommanderButton
            productName={dessert.name}
            variant="ghost"
            size="sm"
            label="Commander"
          />
        </div>
      </div>
    </article>
  );
}
