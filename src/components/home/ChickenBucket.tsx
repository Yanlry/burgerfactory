"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { registerGSAP } from "@/lib/animations/gsap";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { CommanderButton } from "@/components/common/CommanderButton";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getProductById } from "@/data/products";

const wings   = getProductById(20)!;
const tenders = getProductById(21)!;

export function ChickenBucket() {
  const sectionRef  = useRef<HTMLElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const kgRef       = useRef<HTMLSpanElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState<"wings" | "tenders">("wings");

  const current = active === "wings" ? wings : tenders;

  useGSAP(() => {
    registerGSAP();

    // Reveal header
    gsap.fromTo(
      [kgRef.current, titleRef.current],
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );

    // Reveal image
    gsap.fromTo(
      imageRef.current,
      { y: 30, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: innerRef.current, start: "top 72%" },
      }
    );

    // Reveal colonnes gauche + droite
    gsap.fromTo(
      [leftRef.current, rightRef.current],
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: innerRef.current, start: "top 68%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="chicken-bucket"
      className="bg-black overflow-hidden"
      aria-label="Chicken Buckets"
    >
      {/* ── Top header ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto section-px pt-20 pb-10">
        <span className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase">
          Pour partager
        </span>
        <div className="flex items-end gap-4 mt-2">
          <h2
            ref={titleRef}
            className="font-display text-[clamp(3rem,8vw,6.5rem)] text-warm-white leading-none"
          >
            CHICKEN BUCKET
          </h2>
          <span
            ref={kgRef}
            className="font-display text-[clamp(2rem,5vw,4rem)] text-gold leading-none mb-1"
          >
            1 KG
          </span>
        </div>
      </div>

      {/* ── Sticky inner container ─────────────────────────── */}
      <div ref={innerRef} className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto section-px w-full">

          {/* Toggle Wings / Tenders */}
          <div className="flex items-center gap-0 mb-10 lg:mb-0 self-start">
            {(["wings", "tenders"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActive(type)}
                className={[
                  "font-body text-sm tracking-wide px-5 py-2 rounded-full border transition-all duration-200",
                  active === type
                    ? "bg-gold text-black border-gold font-semibold"
                    : "text-warm-white/50 border-white/10 hover:border-white/25",
                ].join(" ")}
                aria-pressed={active === type}
              >
                {type === "wings" ? "Wings" : "Tenders"}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 py-12 lg:py-20">

            {/* Left: info */}
            <div
              ref={leftRef}
              className="flex-1 flex flex-col gap-6 lg:pr-12"
            >
              <div>
                <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-warm-white leading-none mb-3">
                  {active === "wings" ? "WINGS" : "TENDERS"}
                </h3>
                <p className="font-body text-warm-white-2 text-base leading-relaxed max-w-[320px]">
                  {current.description}
                </p>
              </div>

              {/* Composition pills */}
              <div className="flex flex-wrap gap-2">
                {["1 kg", active === "wings" ? "Wings panées" : "Tenders panés", "Sauce au choix"].map((item) => (
                  <span
                    key={item}
                    className="font-body text-xs px-3 py-1.5 rounded-full border border-white/10 text-warm-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-display text-4xl md:text-5xl text-gold">
                  {formatPrice(current.price!)}
                </span>
                {current.menuPrice && (
                  <span className="font-body text-sm text-warm-white-2">
                    Version menu : {formatPrice(current.menuPrice)}
                    <span className="text-warm-white/40 ml-1">(bouteille + 4 petites frites)</span>
                  </span>
                )}
              </div>

              <CommanderButton
                productName={current.name}
                variant="primary"
                size="lg"
                label="Commander"
              />
            </div>

            {/* Center: image */}
            <div
              ref={imageRef}
              className="flex-1 flex items-center justify-center relative"
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-gold/[0.08] blur-[90px] scale-75 pointer-events-none"
              />
              <div className="relative w-[min(380px,85vw)] h-[min(380px,85vw)] lg:w-[480px] lg:h-[480px]">
                <ImageWithFallback
                  src={current.image}
                  alt={current.name}
                  fallbackLabel={current.name}
                  fill
                  sizes="(max-width: 1024px) 85vw, 480px"
                  className="object-contain animate-float-slow"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(245,166,35,0.4))" }}
                />
              </div>
            </div>

            {/* Right: menu version */}
            <div
              ref={rightRef}
              className="flex-1 lg:pl-12 flex flex-col gap-6 lg:items-end lg:text-right"
            >
              <div className="bg-anthracite-2 border border-white/[0.08] rounded-2xl p-6 max-w-[280px]">
                <span className="font-body text-[0.6rem] text-gold tracking-[0.3em] uppercase block mb-3">
                  Version Menu
                </span>
                <p className="font-body text-warm-white-2 text-sm leading-relaxed mb-4">
                  Le bucket + 1 grande bouteille + 4 petites frites
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl text-gold">
                    {formatPrice(current.menuPrice!)}
                  </span>
                  <span className="font-body text-xs text-warm-white/30 line-through">
                    {formatPrice(current.price! + 3.5 + 4 * 2)}
                  </span>
                </div>
              </div>

              <p className="font-body text-xs text-warm-white/25 max-w-[240px]">
                Idéal pour partager entre amis ou en famille.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
