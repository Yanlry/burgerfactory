"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Navigation, Bike } from "lucide-react";
import { restaurantConfig, RESTAURANT_PHONE } from "@/config/restaurant";

const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export function NousTrouverView() {
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    setTodayIndex(new Date().getDay());
  }, []);

  const { address, phoneDisplay, openingHours } = restaurantConfig;

  return (
    <>
      {/* ── Hero photo ────────────────────────────────────── */}
      <section className="relative h-[56vh] min-h-[320px] max-h-[600px] overflow-hidden">
        <Image
          src="/products/00-mon-commerce.png"
          alt="Devanture du Burger Factory à Haubourdin"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/90" />

        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-6 lg:px-12 pb-12">
          <motion.span
            className="font-body text-[0.62rem] text-gold tracking-[0.35em] uppercase block mb-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Restaurant · Haubourdin
          </motion.span>
          <motion.h1
            className="font-display text-[clamp(3.2rem,10vw,7.5rem)] text-warm-white leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            NOUS TROUVER
          </motion.h1>
          <motion.p
            className="font-body text-warm-white/50 text-sm mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            {address.street} · {address.postalCode} {address.city}
          </motion.p>
        </div>
      </section>

      {/* ── Infos + Carte ──────────────────────────────────── */}
      <section className="bg-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ─ Gauche : coordonnées ─ */}
            <motion.div className="flex flex-col gap-8" {...fadeUp()}>
              <div>
                <span className="font-body text-[0.62rem] text-gold tracking-[0.35em] uppercase block mb-3">
                  Coordonnées
                </span>
                <h2 className="font-display text-[clamp(2.8rem,6vw,5rem)] text-warm-white leading-none">
                  INFOS<br />PRATIQUES
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {/* Adresse */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-anthracite-2 border border-white/[0.07] hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-[0.58rem] text-gold tracking-[0.25em] uppercase mb-1.5">Adresse</p>
                    <p className="font-body text-warm-white text-sm leading-relaxed">
                      {address.street}<br />{address.postalCode} {address.city}
                    </p>
                    <span className="font-body text-[0.7rem] text-warm-white/25 mt-1.5 block group-hover:text-gold/50 transition-colors">
                      Voir sur Google Maps →
                    </span>
                  </div>
                </a>

                {/* Téléphone */}
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-anthracite-2 border border-white/[0.07] hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-[0.58rem] text-gold tracking-[0.25em] uppercase mb-1.5">Téléphone</p>
                    <p className="font-body text-warm-white text-lg tracking-wide">{phoneDisplay}</p>
                    <p className="font-body text-[0.7rem] text-warm-white/30 mt-1">
                      Commandes & renseignements
                    </p>
                  </div>
                </a>

                {/* Livraison */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-anthracite-2 border border-white/[0.07]">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <Bike size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-body text-[0.58rem] text-gold tracking-[0.25em] uppercase mb-1.5">Livraison</p>
                    <p className="font-body text-warm-white text-sm">
                      Tous les soirs{" "}
                      <span className="text-gold font-semibold">18h – 22h</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="flex items-center justify-center gap-2.5 px-6 py-4 bg-gold text-black font-body font-bold rounded-2xl text-sm hover:bg-gold-hover transition-all duration-200 hover:scale-[1.02] shadow-[0_0_30px_rgba(245,166,35,0.3)]"
                >
                  <Phone size={15} />
                  Appeler — {phoneDisplay}
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-4 border border-white/[0.12] text-warm-white/65 font-body text-sm rounded-2xl hover:border-gold/30 hover:text-warm-white transition-all duration-200"
                >
                  <Navigation size={15} />
                  Itinéraire GPS
                </a>
              </div>
            </motion.div>

            {/* ─ Droite : Google Maps ─ */}
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/[0.07] bg-anthracite-2"
              style={{ height: "clamp(340px, 50vw, 560px)" }}
              {...fadeUp(0.15)}
            >
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent("Burger Factory 58 Rue Sadi Carnot Haubourdin")}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Burger Factory sur Google Maps"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Horaires ─────────────────────────────────────── */}
      <section className="bg-anthracite">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div className="mb-12" {...fadeUp()}>
            <span className="font-body text-[0.62rem] text-gold tracking-[0.35em] uppercase block mb-3">
              Quand passer ?
            </span>
            <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] text-warm-white leading-none">
              HORAIRES
            </h2>
            <p className="font-body text-warm-white-2 text-sm mt-4 leading-relaxed">
              Midi du lundi au samedi · Soir tous les jours
            </p>
          </motion.div>

          <div className="flex flex-col gap-1">
            {openingHours.map((h, i) => {
              const isToday = todayIndex !== null && DAY_NAMES[todayIndex] === h.day;
              return (
                <motion.div
                  key={h.day}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={[
                    "flex items-center justify-between px-5 py-4 rounded-xl transition-colors",
                    isToday
                      ? "bg-gold/[0.1] border border-gold/25"
                      : "hover:bg-white/[0.03]",
                  ].join(" ")}
                >
                  {/* Jour */}
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <span
                      className={[
                        "font-body text-base",
                        isToday ? "text-gold font-semibold" : "text-warm-white",
                      ].join(" ")}
                    >
                      {h.day}
                    </span>
                    {isToday && (
                      <span className="font-body text-[0.55rem] bg-gold text-black px-2 py-0.5 rounded-full uppercase tracking-widest font-bold leading-none">
                        Aujourd'hui
                      </span>
                    )}
                  </div>

                  {/* Horaires */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-right sm:text-left">
                    {h.lunch ? (
                      <>
                        <span className="flex items-center gap-1.5 font-body text-sm text-warm-white/50">
                          <Clock size={12} className="text-warm-white/25 flex-shrink-0" />
                          {h.lunch}
                        </span>
                        <span className="hidden sm:block w-px h-3 bg-white/10" />
                        <span className="flex items-center justify-end sm:justify-start gap-1.5 font-body text-sm text-warm-white">
                          <Clock size={12} className="text-gold/60 flex-shrink-0" />
                          {h.dinner}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-body text-xs text-warm-white/20 italic">Fermé le midi</span>
                        <span className="flex items-center justify-end gap-1.5 font-body text-sm text-warm-white">
                          <Clock size={12} className="text-gold/60 flex-shrink-0" />
                          {h.dinner}
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="font-body text-[0.68rem] text-warm-white/20 mt-8 text-center">
            Horaires susceptibles de varier les jours fériés — appelez-nous pour confirmer.
          </p>
        </div>
      </section>

      {/* ── Livraison CTA ───────────────────────────────────── */}
      <section className="bg-black py-16 lg:py-24">
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-12"
          {...fadeUp()}
        >
          <div className="relative rounded-3xl overflow-hidden border border-gold/15 bg-gradient-to-br from-anthracite-2 via-black to-black p-10 lg:p-16">
            {/* Glow décoratif */}
            <div
              aria-hidden
              className="absolute top-0 right-0 w-[60%] h-full opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(245,166,35,0.08) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div>
                <span className="font-body text-[0.62rem] text-gold tracking-[0.35em] uppercase block mb-3">
                  On vient chez vous
                </span>
                <h3 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] text-warm-white leading-none">
                  LIVRAISON<br />À DOMICILE
                </h3>
                <p className="font-body text-warm-white-2 text-sm mt-5 max-w-[360px] leading-relaxed">
                  Tous les soirs de 18h à 22h, nos burgers arrivent directement chez vous.
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-5 flex-shrink-0">
                <p className="font-display text-[clamp(3.5rem,8vw,6rem)] text-gold leading-none">
                  18h – 22h
                </p>
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="flex items-center gap-3 px-8 py-4 bg-gold text-black font-body font-bold rounded-2xl text-[0.95rem] hover:bg-gold-hover transition-all shadow-[0_0_40px_rgba(245,166,35,0.35)] hover:scale-[1.02] whitespace-nowrap"
                >
                  <Phone size={17} />
                  Commander — {phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
