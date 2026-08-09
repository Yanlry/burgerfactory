"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { registerGSAP } from "@/lib/animations/gsap";
import Image from "next/image";
import { CommanderButton } from "@/components/common/CommanderButton";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getProductById } from "@/data/products";
import { Check } from "lucide-react";

const kidsMenu = getProductById(39)!;

const KIDS_INCLUDES = [
  "Cheese Burger, Nuggets ×4 ou Mini Tacos",
  "1 Capri-Sun",
  "1 petite frite",
  "1 surprise",
];

export function KidsMenu() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    registerGSAP();

    const label = sectionRef.current?.querySelector(".kids-label");
    const title = sectionRef.current?.querySelector(".kids-title");
    const image = sectionRef.current?.querySelector(".kids-image");
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(".kids-item");
    const cta   = sectionRef.current?.querySelector(".kids-cta");

    gsap.fromTo([label, title],
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );

    if (image) {
      gsap.fromTo(image,
        { x: 40, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );
    }

    if (items) {
      gsap.fromTo(items,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }

    if (cta) {
      gsap.fromTo(cta,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="menu-enfant"
      className="bg-black section-py"
      aria-label="Menu Enfant"
    >
      {/* Top separator */}
      <div className="max-w-7xl mx-auto section-px">
        <div className="h-px mb-16 bg-gradient-to-r from-transparent via-gold/25 to-transparent" aria-hidden />
      </div>

      <div className="max-w-7xl mx-auto section-px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="flex flex-col">
            <span className="kids-label font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase block mb-3">
              Pour les petits
            </span>
            <h2 className="kids-title font-display text-[clamp(3rem,8vw,6rem)] text-warm-white leading-none mb-8">
              MENU ENFANT
            </h2>

            <ul className="flex flex-col gap-3 mb-8">
              {KIDS_INCLUDES.map((item, i) => (
                <li
                  key={i}
                  className="kids-item flex items-start gap-3"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-gold" />
                  </span>
                  <span className="font-body text-warm-white-2 text-sm leading-relaxed">
                    {i === 0 ? (
                      <>
                        <span className="text-warm-white font-medium">Au choix :</span>{" "}
                        {item}
                      </>
                    ) : item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="kids-cta flex items-center gap-6">
              <span className="font-display text-4xl md:text-5xl text-gold">
                {formatPrice(kidsMenu.menuPrice!)}
              </span>
              <CommanderButton
                productName={kidsMenu.name}
                variant="primary"
                size="lg"
                label="Commander"
              />
            </div>
          </div>

          {/* Image */}
          <div className="kids-image flex items-center justify-center relative">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-gold/[0.06] blur-[80px] pointer-events-none"
            />
            <div className="relative w-[min(340px,80vw)] h-[min(340px,80vw)] lg:w-[400px] lg:h-[400px]">
              <Image
                src={kidsMenu.image}
                alt="Menu Enfant Burger Factory — Cheese Burger, Nuggets ou Mini Tacos + Capri-Sun + frite + surprise"
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-contain animate-float"
                style={{ filter: "drop-shadow(0 20px 50px rgba(245,166,35,0.3))" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
