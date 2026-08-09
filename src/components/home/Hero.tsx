"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { registerGSAP } from "@/lib/animations/gsap";
import { Phone, Clock } from "lucide-react";
import { RESTAURANT_PHONE, restaurantConfig } from "@/config/restaurant";
import { AnimatePresence, motion } from "framer-motion";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

// ─── Fan desktop ────────────────────────────────────────────────────────────
const FAN = [
  {
    src: "/products/04-bacon.png",
    alt: "Bacon",
    x: 0, y: 65, size: 280, rotation: -11,
    shadow: "drop-shadow(0 22px 52px rgba(0,0,0,0.9))",
    productId: 4,
    tooltipAlign: "left" as const,
  },
  {
    src: "/products/03-giant-factory.png",
    alt: "Giant Factory",
    x: 100, y: 38, size: 295, rotation: -5,
    shadow: "drop-shadow(0 24px 54px rgba(0,0,0,0.85))",
    productId: 3,
    tooltipAlign: "center" as const,
  },
  {
    src: "/products/02-mega-factory.png",
    alt: "Méga Factory",
    x: 195, y: 16, size: 310, rotation: -1,
    shadow: "drop-shadow(0 26px 56px rgba(0,0,0,0.8))",
    productId: 2,
    tooltipAlign: "center" as const,
  },
  {
    src: "/products/01-triple-beef.png",
    alt: "Triple Beef",
    x: 280, y: 0, size: 325, rotation: 5,
    shadow: "drop-shadow(0 26px 58px rgba(245,166,35,0.28)) drop-shadow(0 18px 48px rgba(0,0,0,0.82))",
    productId: 1,
    tooltipAlign: "right" as const,
  },
];
const FAN_W = 610;
const FAN_H  = 360;

// ─── Fan mobile (3 burgers compacts, positions px calibrées 375px) ───────────
const MOBILE_FAN = [
  {
    src: "/products/04-bacon.png",
    alt: "Bacon",
    size: 155,
    left: 0,
    top: 30,
    rotate: -12,
    shadow: "drop-shadow(0 16px 32px rgba(0,0,0,0.9))",
    zIndex: 1,
  },
  {
    src: "/products/03-giant-factory.png",
    alt: "Giant Factory",
    size: 165,
    left: 68,
    top: 6,
    rotate: -3,
    shadow: "drop-shadow(0 18px 36px rgba(0,0,0,0.85))",
    zIndex: 2,
  },
  {
    src: "/products/01-triple-beef.png",
    alt: "Triple Beef",
    size: 172,
    left: 140,
    top: 16,
    rotate: 9,
    shadow: "drop-shadow(0 18px 36px rgba(245,166,35,0.25)) drop-shadow(0 14px 30px rgba(0,0,0,0.8))",
    zIndex: 3,
  },
];

// ─── Composant principal ─────────────────────────────────────────────────────
export function Hero() {
  return (
    <>
      <HeroMobile />
      <HeroDesktop />
    </>
  );
}

// ─── TEMP TEST — supprime les 3 lignes ci-dessous quand les tests sont finis ──
const FORCE_OPEN = true; // passe à false pour tester l'état fermé
const FORCE_NEXT = "Ferme à 00:00";
const FORCE_SCHEDULE = "12:00–14:00 · 18:00–22:00";
// ─────────────────────────────────────────────────────────────────────────────

// ─── Statut ouvert/fermé ─────────────────────────────────────────────────────
function getOpenStatus(): { open: boolean; statusText: string; nextInfo: string; todaySchedule: string } {
  if (FORCE_OPEN !== null) return {
    open: FORCE_OPEN,
    statusText: FORCE_OPEN ? "OUVERT" : "FERMÉ",
    nextInfo: FORCE_NEXT,
    todaySchedule: FORCE_SCHEDULE,
  };
  const now = new Date();
  const DAY = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const h   = now.getHours();
  const cur = h < 5 ? 25 * 60 : h * 60 + now.getMinutes();

  const toMin = (t: string) => {
    const [hh, mm] = t.split(":").map(Number);
    return hh === 0 ? 24 * 60 : hh * 60 + mm;
  };
  const fmt = (e: string) => (e === "00:00" ? "minuit" : e);

  const dayIdx = now.getDay();
  const day = restaurantConfig.openingHours.find(d => d.day === DAY[dayIdx]);

  const todaySchedule = day
    ? day.lunch ? `${day.lunch} · ${day.dinner}` : day.dinner
    : "—";

  if (!day) return { open: false, statusText: "FERMÉ", nextInfo: "Fermé aujourd'hui", todaySchedule };

  if (day.lunch) {
    const [s, e] = day.lunch.split("–");
    if (cur < toMin(s)) return { open: false, statusText: "FERMÉ",  nextInfo: `Ouvre aujourd'hui à ${s}`, todaySchedule };
    if (cur < toMin(e)) return { open: true,  statusText: "OUVERT", nextInfo: `Ferme à ${fmt(e)}`, todaySchedule };
  }

  const [ds, de] = day.dinner.split("–");
  if (cur < toMin(ds)) return { open: false, statusText: "FERMÉ",  nextInfo: `Ouvre ce soir à ${ds}`, todaySchedule };
  if (cur < toMin(de)) return { open: true,  statusText: "OUVERT", nextInfo: `Ferme à ${fmt(de)}`, todaySchedule };

  for (let i = 1; i <= 7; i++) {
    const next = restaurantConfig.openingHours.find(d => d.day === DAY[(dayIdx + i) % 7]);
    if (!next) continue;
    const label = i === 1 ? "demain" : DAY[(dayIdx + i) % 7].toLowerCase();
    const opens = next.lunch ? next.lunch.split("–")[0] : next.dinner.split("–")[0];
    return { open: false, statusText: "FERMÉ", nextInfo: `Ouvre ${label} à ${opens}`, todaySchedule };
  }

  return { open: false, statusText: "FERMÉ", nextInfo: "Fermé pour ce soir", todaySchedule };
}

// ════════════════════════════════════════════════════════════════════════════
// VERSION MOBILE — lg:hidden
// ════════════════════════════════════════════════════════════════════════════
function HeroMobile() {
  const [status, setStatus] = useState<{ open: boolean; statusText: string; nextInfo: string; todaySchedule: string } | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    const initId  = window.setTimeout(tick, 0);
    const intervalId = window.setInterval(tick, 60_000);
    return () => { clearTimeout(initId); clearInterval(intervalId); };
  }, []);

  return (
    <section
      className="lg:hidden relative min-h-[100svh] flex flex-col bg-black overflow-hidden pt-[72px]"
      aria-label="Burger Factory — Haubourdin"
    >
      {/* Ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[50vw] rounded-full bg-gold/[0.06] blur-[70px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* ── Fan de burgers ────────────────────────────────────────────── */}
      <div className="relative flex justify-center pt-6 pb-2">
        <div
          aria-hidden
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[25vw] rounded-full bg-gold/[0.12] blur-[48px] pointer-events-none"
        />
        <div className="relative" style={{ width: 312, height: 195 }}>
          {MOBILE_FAN.map((b, i) => (
            <motion.div
              key={b.src}
              className="absolute"
              style={{ left: b.left, top: b.top, width: b.size, height: b.size, zIndex: b.zIndex, rotate: b.rotate }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            >
              <Image src={b.src} alt={b.alt} fill sizes="175px" className="object-contain" style={{ filter: b.shadow }} priority />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Titre + indicateur ouvert/fermé ─────────────────────────── */}
      <div className="px-6 mt-8 flex flex-col items-center text-center">
        <motion.span
          className="font-body text-[0.58rem] text-gold tracking-[0.32em] uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" as const }}
        >
          Restaurant · Haubourdin
        </motion.span>
        <h1
          aria-label="Burger Factory"
          className="flex items-end justify-center w-full"
          style={{ fontSize: "clamp(2.8rem, 15vw, 5.4rem)", marginBottom: "0,1em", position: "relative", top: "0.3em" }}
        >
          {"BURGER FACTORY".split("").map((char, i) => {
            if (char === " ") return (
              <span key={i} style={{ display: "inline-block", width: "0.26em" }} />
            );
            const total = 14;
            const center = (total - 1) / 2;
            const dist = Math.abs(i - center) / center;
            const sizeFactor = 0.60 + (1 - dist) * 0.60;
            const targetOpacity = 0.40 + (1 - dist) * 0.60;
            const isCenter = dist < 0.35;
            return (
              <motion.span
                key={i}
                className="font-display text-warm-white leading-none inline-block"
                style={{
                  fontSize: `${sizeFactor}em`,
                  textShadow: isCenter
                    ? "0 0 28px rgba(245,166,35,0.4), 0 4px 16px rgba(0,0,0,0.85)"
                    : "0 2px 8px rgba(0,0,0,0.7)",
                }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: targetOpacity, y: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 240,
                  damping: 22,
                  delay: 0.15 + i * 0.042,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </h1>
      </div>

      {/* ── Statut ouvert / fermé ───────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-1">
        <AnimatePresence>
          {status && (
            <motion.div
              key={String(status.open)}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex flex-col items-center gap-4"
            >
              {/* Dot pulsant */}
              <div className="relative flex items-center justify-center">
                {status.open && (
                  <span className="absolute w-8 h-8 rounded-full bg-emerald-400/25 animate-ping" />
                )}
                <span className={[
                  "w-4 h-4 rounded-full",
                  status.open
                    ? "bg-emerald-400 shadow-[0_0_18px_6px_rgba(52,211,153,0.55)]"
                    : "bg-red-500/70 shadow-[0_0_12px_4px_rgba(239,68,68,0.3)]",
                ].join(" ")} />
              </div>

              {/* Grand texte statut */}
              <p className={[
                "font-display leading-none tracking-[0.12em]",
                status.open ? "text-emerald-400" : "text-warm-white/25",
              ].join(" ")}
                style={{ fontSize: "clamp(3.2rem, 14vw, 5rem)" }}
              >
                {status.statusText}
              </p>

              {/* Prochaine info */}
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-gold/50 flex-shrink-0" />
                <p className="font-body text-sm text-warm-white/55">
                  {status.nextInfo}
                </p>
              </div>

              {/* Horaire du jour */}
              <div className="flex items-center gap-3 mt-1">
                <div className="h-px flex-1 bg-white/[0.07]" />
                <p className="font-body text-[0.62rem] text-warm-white/20 tracking-widest uppercase whitespace-nowrap">
                  {status.todaySchedule}
                </p>
                <div className="h-px flex-1 bg-white/[0.07]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Livraison + CTAs ────────────────────────────────────────── */}
      <motion.div
        className="px-6 pb-10 flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.6, ease: "easeOut" }}
      >
        <div className="h-px bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" />

        <div>
          <p className="font-body text-[0.6rem] text-gold tracking-[0.28em] uppercase font-semibold mb-1">
            Livraison disponible
          </p>
          <p className="font-display text-[3.2rem] text-warm-white leading-none">
            18h – 22h
          </p>
        </div>

        <a
          href={`tel:${RESTAURANT_PHONE}`}
          className="flex items-center justify-center gap-3 w-full bg-gold text-black font-body font-bold py-4 rounded-2xl text-[0.95rem] active:scale-[0.97] transition-transform shadow-[0_0_28px_rgba(245,166,35,0.4)]"
          aria-label="Appeler Burger Factory au 09 85 05 78 03"
        >
          <Phone size={17} />
          Appeler — 09 85 05 78 03
        </a>

        <Link
          href="/carte"
          className="flex items-center justify-center w-full py-3.5 rounded-2xl bg-white/[0.07] border border-white/[0.08] text-gold font-body font-semibold text-base active:scale-[0.97] transition-all hover:bg-white/[0.12] hover:border-gold/25"
        >
          Voir la carte
        </Link>
      </motion.div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// VERSION DESKTOP — hidden + lg:flex
// ════════════════════════════════════════════════════════════════════════════
function HeroDesktop() {
  const sectionRef  = useRef<HTMLElement>(null);
  const fanRef      = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const title1Ref   = useRef<HTMLDivElement>(null);
  const title2Ref   = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const burgerRefs  = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Parallaxe souris
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      tx = ((e.clientX - r.left - r.width / 2) / r.width) * 6;
      ty = ((e.clientY - r.top - r.height / 2) / r.height) * -4;
    };

    const tick = () => {
      cx = lerp(cx, tx, 0.06);
      cy = lerp(cy, ty, 0.06);
      burgerRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = 1 - i / (FAN.length - 1);
        gsap.set(el, { x: cx * depth * 20, y: cy * depth * 14 });
      });
      if (glowRef.current) gsap.set(glowRef.current, { x: cx * 6, y: cy * -4 });
      rafId = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useGSAP(() => {
    registerGSAP();

    const chars1 = title1Ref.current?.querySelectorAll("[data-char]");
    const chars2 = title2Ref.current?.querySelectorAll("[data-char]");

    gsap.set([labelRef.current, subtitleRef.current, ctasRef.current, scrollRef.current], { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
    if (chars1) gsap.set(chars1, { yPercent: 110 });
    if (chars2) gsap.set(chars2, { yPercent: 110 });
    burgerRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: 0, x: 70, rotation: FAN[i]?.rotation ?? 0 });
    });

    const tl = gsap.timeline({ delay: 0.1 });

    burgerRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(el, { opacity: 1, x: 0, duration: 0.85, ease: "expo.out" }, i === 0 ? 0 : "-=0.6");
    });

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.15);
    if (chars1) tl.to(chars1, { yPercent: 0, stagger: 0.04, duration: 0.9, ease: "power4.out" }, 0.25);
    if (chars2) tl.to(chars2, { yPercent: 0, stagger: 0.04, duration: 0.9, ease: "power4.out" }, 0.5);
    tl.to(lineRef.current,     { scaleX: 1, duration: 0.9, ease: "expo.out" },       0.6)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.7)
      .to(ctasRef.current,     { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.8)
      .to(scrollRef.current,   { opacity: 1, y: 0, duration: 0.4 },                     0.95);

    gsap.to(fanRef.current, {
      y: -80, ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", end: "bottom top", scrub: 1.5,
      },
    });

    // fromTo explicite — le "from" est connu (opacity:1) même si gsap.set a d'abord mis à 0
    gsap.fromTo(
      [labelRef.current, subtitleRef.current, ctasRef.current, lineRef.current],
      { opacity: 1, y: 0 },
      {
        opacity: 0, y: -25, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "55% top", end: "bottom top", scrub: 1,
        },
      }
    );

    gsap.fromTo(
      scrollRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top", end: "35% top", scrub: 1,
        },
      }
    );
  }, { scope: sectionRef });

  void ScrollTrigger;

  return (
    <section
      ref={sectionRef}
      className="hidden lg:flex flex-col relative min-h-[100svh] overflow-hidden bg-black"
      aria-label="Bienvenue chez Burger Factory"
    >
      {/* Ambient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-gold/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-amber/[0.06] blur-[120px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative flex-1 max-w-7xl mx-auto w-full section-px pt-28 md:pt-32 pb-16 flex items-center">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0">

          {/* Texte */}
          <div className="flex-1 flex flex-col justify-center z-10 lg:max-w-[52%]">
            <span ref={labelRef} className="font-body text-[0.65rem] text-gold tracking-[0.35em] uppercase mb-5">
              Restaurant · Haubourdin
            </span>

            <div className="leading-none overflow-hidden" aria-hidden>
              <div ref={title1Ref} className="flex flex-wrap">
                {"BURGER".split("").map((char, i) => (
                  <span key={i} data-char className="font-display text-[clamp(4.5rem,11vw,10.5rem)] text-warm-white inline-block">
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div className="leading-none overflow-hidden mb-5" aria-hidden>
              <div ref={title2Ref} className="flex flex-wrap">
                {"FACTORY".split("").map((char, i) => (
                  <span key={i} data-char className="font-display text-[clamp(4.5rem,11vw,10.5rem)] text-gold inline-block">
                    {char}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="sr-only">Burger Factory — Restaurant à Haubourdin</h1>

            <div ref={lineRef} className="h-px mb-7 bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" aria-hidden />

            <div ref={subtitleRef} className="flex items-center gap-5 mb-10">
              <div>
                <div className="font-body text-xs text-gold tracking-[0.25em] uppercase font-semibold mb-1">Livraison</div>
                <div className="font-display text-[clamp(1.6rem,3.2vw,2.1rem)] text-warm-white leading-none">18h – 22h</div>
              </div>
              <div className="w-px h-10 bg-white/10 flex-shrink-0" />
              <a href={`tel:${RESTAURANT_PHONE}`} className="group" aria-label="Appeler Burger Factory au 09 85 05 78 03">
                <div className="font-body text-xs text-gold tracking-[0.25em] uppercase font-semibold mb-1">Commander</div>
                <div className="font-body text-[clamp(0.95rem,1.8vw,1.1rem)] font-semibold text-gold group-hover:text-gold-hover transition-colors duration-150">
                  09 85 05 78 03
                </div>
              </a>
            </div>

            <div ref={ctasRef} className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/carte"
                className="inline-flex items-center justify-center px-8 py-[14px] font-body font-semibold text-black bg-gold rounded-full hover:bg-gold-hover transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_24px_rgba(245,166,35,0.35)] hover:shadow-[0_0_40px_rgba(245,166,35,0.55)]"
              >
                Voir la carte
              </Link>
              <a
                href={`tel:${RESTAURANT_PHONE}`}
                className="inline-flex items-center gap-2 px-8 py-[14px] font-body font-medium text-warm-white rounded-full border border-warm-white/20 hover:border-gold/50 hover:text-gold transition-all duration-200"
              >
                <Phone size={15} />
                Nous appeler
              </a>
            </div>
          </div>

          {/* Fan */}
          <div className="flex-1 flex items-center justify-center lg:justify-end relative order-first lg:order-last">
            <div ref={glowRef} aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] rounded-full bg-gold/[0.07] blur-[90px]" />
            </div>

            <div ref={fanRef} className="relative" style={{ width: FAN_W, height: FAN_H }}>
              {FAN.map((burger, i) => {
                const product = getProductById(burger.productId);
                const isHovered = hoveredIndex === i;
                return (
                  <div
                    key={burger.src}
                    ref={(el) => { burgerRefs.current[i] = el; }}
                    className="absolute cursor-pointer"
                    style={{
                      left: burger.x, top: burger.y,
                      width: burger.size, height: burger.size,
                      zIndex: isHovered ? 20 : i + 1,
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="w-full h-full transition-transform duration-300 ease-out will-change-transform"
                      style={{ transform: isHovered ? "translateY(-18px)" : "translateY(0px)" }}
                    >
                      <Image
                        src={burger.src}
                        alt={burger.alt}
                        fill
                        sizes="265px"
                        className="object-contain"
                        style={{ filter: burger.shadow }}
                      />
                    </div>

                    <AnimatePresence>
                      {isHovered && product && (
                        <BurgerTooltip key={`tip-${i}`} product={product} align={burger.tooltipAlign} />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] text-warm-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/70 to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}

// ─── Bulle info burger (desktop uniquement) ──────────────────────────────────
interface BurgerTooltipProps {
  product: Product;
  align: "left" | "center" | "right";
}

function BurgerTooltip({ product, align }: BurgerTooltipProps) {
  const alignClass =
    align === "left"  ? "left-0" :
    align === "right" ? "right-0" :
                        "left-1/2 -translate-x-1/2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={[
        "absolute bottom-full mb-4 w-52 pointer-events-none z-30",
        alignClass,
      ].join(" ")}
    >
      <div className="relative bg-anthracite/95 backdrop-blur-sm border border-gold/30 rounded-xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
        <span className="font-body text-[0.58rem] text-gold tracking-[0.28em] uppercase">Burger</span>
        <h4 className="font-display text-[1.35rem] text-warm-white leading-none mt-0.5 mb-3">
          {product.name.toUpperCase()}
        </h4>
        <div className="h-px bg-white/8 mb-3" />
        <p className="font-body text-[0.71rem] text-warm-white/55 leading-relaxed mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-white/6">
          {product.price !== null && (
            <span className="font-display text-xl text-gold leading-none">{formatPrice(product.price)}</span>
          )}
          {product.menuPrice != null && product.price !== null && (
            <span className="font-body text-[0.62rem] text-warm-white/30">Menu&nbsp;{formatPrice(product.menuPrice)}</span>
          )}
        </div>
        <div aria-hidden className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-anthracite/95 border-b border-r border-gold/30 rotate-45" />
      </div>
    </motion.div>
  );
}
