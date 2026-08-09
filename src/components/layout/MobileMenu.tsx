"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import { RESTAURANT_PHONE, RESTAURANT_PHONE_DISPLAY } from "@/config/restaurant";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "La carte" },
  { href: "/nous-trouver", label: "Nous trouver" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-50 bg-dark flex flex-col"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)", transition: { duration: 0.55, ease: "easeInOut" } }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.4, ease: "easeInOut" } }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/5 flex-shrink-0">
            <Link
              href="/"
              onClick={onClose}
              className="font-display text-2xl text-warm-white tracking-wider"
            >
              BURGER <span className="text-gold">FACTORY</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-warm-white hover:text-gold transition-colors rounded-full"
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <nav
            className="flex-1 flex flex-col justify-center px-8 gap-1"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.18 + i * 0.07, duration: 0.4 },
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block font-display text-[clamp(2.8rem,10vw,4.5rem)] text-warm-white/70 hover:text-gold transition-colors duration-200 leading-tight py-1"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom CTA */}
          <motion.div
            className="px-8 pb-12 pt-6 border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.52, duration: 0.4 } }}
          >
            <a
              href={`tel:${RESTAURANT_PHONE}`}
              className="flex items-center gap-3 font-body text-gold text-lg hover:text-gold-hover transition-colors"
              aria-label={`Appeler le restaurant au ${RESTAURANT_PHONE_DISPLAY}`}
            >
              <Phone size={20} />
              <span>{RESTAURANT_PHONE_DISPLAY}</span>
            </a>
            <p className="font-body text-warm-white/30 text-xs mt-2">
              Commandes par téléphone uniquement
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
