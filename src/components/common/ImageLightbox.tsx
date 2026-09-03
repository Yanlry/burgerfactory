"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface ImageLightboxProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  /** Miniature cliquable — sert de déclencheur */
  children: ReactNode;
  className?: string;
}

/** Miniature cliquable qui s'agrandit en plein écran pour une lecture confortable. */
export function ImageLightbox({ src, alt, fallbackLabel, children, className }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={["cursor-zoom-in text-left w-full", className].filter(Boolean).join(" ")}
        aria-label={`Agrandir — ${alt}`}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full h-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring" as const, stiffness: 350, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={src}
                alt={alt}
                fallbackLabel={fallbackLabel}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 text-warm-white bg-black/60 hover:bg-black/80 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Fermer"
            >
              <X size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
