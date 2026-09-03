"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { registerGSAP } from "@/lib/animations/gsap";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { ImageLightbox } from "@/components/common/ImageLightbox";
import { CommanderButton } from "@/components/common/CommanderButton";
import { ZoomIn } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getProductById } from "@/data/products";
import { tacosBoards } from "@/data/tacosOptions";
import type { Product } from "@/types/product";

const tacos = getProductById(40)!;
const tacosGratine = getProductById(41)!;
const bowl = getProductById(45)!;

export function TacosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

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

    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".tacos-card");
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

    const boards = sectionRef.current?.querySelectorAll<HTMLElement>(".tacos-board");
    boards?.forEach((board, i) => {
      gsap.fromTo(board,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: board, start: "top 88%" },
          delay: i * 0.08,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="tacos"
      className="bg-dark section-py overflow-hidden"
      aria-label="Tacos et Bowl"
    >
      <div className="max-w-7xl mx-auto section-px">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span ref={labelRef} className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase block mb-2">
            Composez votre repas
          </span>
          <h2
            ref={titleRef}
            className="font-display text-[clamp(3rem,8vw,6.5rem)] text-warm-white leading-none"
          >
            TACOS &amp; BOWL
          </h2>
          <p className="font-body text-warm-white-2 text-sm mt-3 max-w-md">
            Garnis de frites et de sauce fromagère — viande(s) et sauce au choix.
          </p>
        </div>

        {/* Cards — Tacos, Tacos Gratiné, Bowl */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <TacosCard product={tacos} />
          <TacosCard product={tacosGratine} />
          <TacosCard product={bowl} />
        </div>

        {/* Panneaux sauces / viandes / extras */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tacosBoards.map((board) => (
            <ImageLightbox
              key={board.key}
              src={board.image}
              alt={board.title}
              fallbackLabel={board.title}
              className="tacos-board bg-anthracite rounded-2xl overflow-hidden border border-white/[0.06] hover:border-gold/25 transition-colors duration-200"
            >
              <div className="relative w-full aspect-[3/2] bg-black/30">
                <ImageWithFallback
                  src={board.image}
                  alt={board.title}
                  fallbackLabel={board.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-warm-white/80">
                  <ZoomIn size={14} />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-display text-lg text-warm-white leading-none">
                  {board.title.toUpperCase()}
                </h3>
                <span className="font-body text-xs text-warm-white/40">
                  {board.note}
                </span>
              </div>
            </ImageLightbox>
          ))}
        </div>
      </div>
    </section>
  );
}

function TacosCard({ product }: { product: Product }) {
  return (
    <Link href="/carte?main=sale&sub=tacos" className="block">
    <article
      className={[
        "tacos-card",
        "bg-anthracite rounded-2xl overflow-hidden",
        "border border-white/[0.06] hover:border-amber/30",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
        "flex flex-col",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-black/30">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          fallbackLabel={product.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 30vw, 380px"
          className="object-contain p-4"
          style={{ filter: "drop-shadow(0 10px 25px rgba(180,83,9,0.25))" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <h3 className="font-display text-xl md:text-2xl text-warm-white leading-tight mb-1">
          {product.name.toUpperCase()}
        </h3>
        <p className="font-body text-warm-white/40 text-xs leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Tailles */}
        {product.sizes && (
          <>
            <span className="font-display text-xl md:text-2xl text-amber block mb-2">
              À partir de {formatPrice(Math.min(...product.sizes.map((s) => s.price)))}
            </span>
            <ul className="flex flex-col gap-1.5 mb-4">
              {product.sizes.map((size) => (
                <li
                  key={size.label}
                  className="flex items-center justify-between font-body text-xs text-warm-white-2 border-b border-white/[0.05] pb-1.5 last:border-0"
                >
                  <span>
                    <span className="text-warm-white font-medium">{size.label}</span>
                    {size.meatCount && (
                      <span className="text-warm-white/35 ml-2">
                        {size.meatCount} viande{size.meatCount > 1 ? "s" : ""}
                      </span>
                    )}
                  </span>
                  <span className="text-amber font-medium">{formatPrice(size.price)}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-auto flex items-center justify-between gap-2">
          {!product.sizes && (
            <span className="font-display text-xl md:text-2xl text-amber">
              {formatPrice(product.price!)}
            </span>
          )}
          <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
            <CommanderButton
              productName={product.name}
              variant="outline"
              size="sm"
              label="Commander"
            />
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
}
