"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import { RESTAURANT_PHONE, RESTAURANT_PHONE_DISPLAY } from "@/config/restaurant";

interface CommanderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.18 },
  },
};

const sheetVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 35 },
  },
  exit: { y: "100%", transition: { duration: 0.22 } },
};

export function CommanderModal({ isOpen, onClose, productName }: CommanderModalProps) {
  const handleCall = useCallback(() => {
    window.location.href = `tel:${RESTAURANT_PHONE}`;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const title = productName ? `Commander — ${productName}` : "Commander";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Desktop modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="commander-title"
            className="fixed inset-0 z-50 hidden items-center justify-center md:flex"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="relative w-full max-w-md mx-4 bg-anthracite border border-white/10 rounded-2xl p-8 shadow-2xl"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-warm-white/50 hover:text-warm-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              <ModalContent
                title={title}
                onCall={handleCall}
                onClose={onClose}
              />
            </motion.div>
          </motion.div>

          {/* Mobile bottom sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="commander-title-mobile"
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 bg-anthracite rounded-t-3xl border-t border-white/10">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <div className="bg-anthracite px-6 pb-10 pt-4">
              <ModalContent
                title={title}
                onCall={handleCall}
                onClose={onClose}
                isMobile
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Shared content ──────────────────────────────────────────────────────────

interface ModalContentProps {
  title: string;
  onCall: () => void;
  onClose: () => void;
  isMobile?: boolean;
}

function ModalContent({ title, onCall, onClose, isMobile }: ModalContentProps) {
  const titleId = isMobile ? "commander-title-mobile" : "commander-title";

  return (
    <div className="flex flex-col gap-6">
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center">
        <Phone size={26} className="text-gold" />
      </div>

      {/* Text */}
      <div>
        <h2
          id={titleId}
          className="font-body text-xl font-semibold text-warm-white leading-tight mb-2"
        >
          {title}
        </h2>
        <p className="text-warm-white/60 text-sm leading-relaxed">
          Les commandes sont prises directement par téléphone. Notre équipe sera ravie de vous accueillir.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onCall}
          className="group flex items-center justify-center gap-3 w-full bg-gold text-black font-body font-semibold py-4 rounded-xl text-base transition-all duration-200 hover:bg-gold-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-gold"
          aria-label={`Appeler Burger Factory au ${RESTAURANT_PHONE_DISPLAY}`}
        >
          <Phone
            size={18}
            className="transition-transform duration-200 group-hover:-rotate-12"
          />
          Appeler Burger Factory
          <span className="text-black/60 text-sm font-normal">
            {RESTAURANT_PHONE_DISPLAY}
          </span>
        </button>

        <button
          onClick={onClose}
          className="w-full py-3 text-warm-white/50 hover:text-warm-white text-sm transition-colors focus-visible:outline-2 focus-visible:outline-white/30 rounded-xl"
        >
          Continuer à regarder la carte
        </button>
      </div>
    </div>
  );
}
