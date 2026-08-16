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

const menus = getProductsByCategory("menus");

const MENU_INCLUDES = "Frites + Boisson";

export function MenusShowcase() {
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

    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".menu-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
          delay: i * 0.07,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="menus"
      className="bg-anthracite section-py overflow-hidden"
      aria-label="Nos menus"
    >
      <div className="max-w-7xl mx-auto section-px">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span ref={labelRef} className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase block mb-2">
            Formules du jour
          </span>
          <h2
            ref={titleRef}
            className="font-display text-[clamp(3rem,8vw,6.5rem)] text-warm-white leading-none"
          >
            LES MENUS DOUBLES
          </h2>
          <p className="font-body text-warm-white-2 text-sm mt-4 max-w-md leading-relaxed">
            Chaque menu comprend frites et boisson. Parfait pour partager ou s&apos;accorder une vraie pause.
          </p>
        </div>

        {/* Desktop : grille 2 → 3 colonnes */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} />
          ))}
        </div>

        {/* Mobile : carousel horizontal (touch natif, pas de data-lenis-prevent) */}
        <div className="flex md:hidden gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {menus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} mobile />
          ))}
        </div>
      </div>

      {/* Scroll hint mobile */}
      <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
        <span className="font-body text-[0.6rem] text-warm-white/25 tracking-widest uppercase">
          Glissez pour voir plus
        </span>
      </div>
    </section>
  );
}

function MenuCard({ menu, mobile }: { menu: Product; mobile?: boolean }) {
  const hasMenuPrice = menu.menuPrice != null;

  return (
    <article
      className={[
        "menu-card",
        mobile ? "snap-start flex-shrink-0 w-[280px]" : "w-full",
        "bg-anthracite-2 rounded-2xl overflow-hidden",
        "border border-white/[0.06] hover:border-gold/25",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        "flex flex-col",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-black/40">
        <ImageWithFallback
          src={menu.image}
          alt={menu.name}
          fallbackLabel={menu.name}
          fill
          sizes="340px"
          className="object-contain p-4"
          style={{ filter: "drop-shadow(0 8px 20px rgba(245,166,35,0.2))" }}
        />
        {/* Menu number badge */}
        <div className="absolute top-3 left-3 bg-gold/15 border border-gold/30 rounded-full px-3 py-1">
          <span className="font-body text-[0.65rem] text-gold font-semibold tracking-widest uppercase">
            M{menu.id - 13}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-2xl text-warm-white leading-tight mb-2">
          {menu.name.toUpperCase().replace("M1 — ", "").replace("M2 — ", "").replace("M3 — ", "").replace("M4 — ", "").replace("M5 — ", "").replace("M6 — ", "")}
        </h3>

        <p className="font-body text-warm-white-2 text-xs leading-relaxed mb-3 flex-1">
          {menu.description}
        </p>

        {/* Inclus */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="font-body text-[0.6rem] text-warm-white/30 tracking-widest uppercase">
            Inclus
          </span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>
        <p className="font-body text-xs text-warm-white/50 mb-4 text-center">{MENU_INCLUDES}</p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          {hasMenuPrice && (
            <span className="font-display text-2xl text-gold">
              {formatPrice(menu.menuPrice!)}
            </span>
          )}
          <CommanderButton
            productName={menu.name}
            variant="outline"
            size="sm"
            label="Commander"
          />
        </div>
      </div>
    </article>
  );
}
