"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { CommanderModal } from "./CommanderModal";

interface CommanderButtonProps {
  productName?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function CommanderButton({
  productName,
  variant = "primary",
  size = "md",
  className = "",
  label = "Commander",
}: CommanderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-3",
  };

  const variantClasses = {
    primary:
      "bg-gold text-black hover:bg-gold-hover font-semibold shadow-[0_0_20px_rgba(245,166,35,0.25)] hover:shadow-[0_0_30px_rgba(245,166,35,0.45)]",
    outline:
      "border border-gold text-gold hover:bg-gold hover:text-black font-medium",
    ghost:
      "text-gold hover:text-gold-hover font-medium underline-offset-2 hover:underline",
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={[
          "group inline-flex items-center justify-center rounded-full font-body transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
          "active:scale-[0.97]",
          sizeClasses[size],
          variantClasses[variant],
          className,
        ].join(" ")}
        whileHover={{ scale: variant === "primary" ? 1.03 : 1 }}
        whileTap={{ scale: 0.97 }}
        aria-haspopup="dialog"
        aria-label={productName ? `Commander ${productName}` : "Commander"}
      >
        <Phone
          size={size === "lg" ? 18 : 16}
          className="transition-transform duration-200 group-hover:-rotate-12"
        />
        {label}
      </motion.button>

      <CommanderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productName={productName}
      />
    </>
  );
}
