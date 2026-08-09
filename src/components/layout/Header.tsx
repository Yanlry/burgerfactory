"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { CommanderButton } from "@/components/common/CommanderButton";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/carte", label: "La carte" },
  { href: "/nous-trouver", label: "Nous trouver" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-black/85 backdrop-blur-md border-b border-white/[0.06] lg:bg-transparent lg:backdrop-blur-none lg:border-transparent lg:shadow-none",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px] md:h-20">

            {/* Logo */}
            <Link
              href="/"
              aria-label="Burger Factory — Accueil"
              className="inline-flex flex-col hover:opacity-80 transition-opacity"
            >
              <span className="font-display text-2xl md:text-3xl text-warm-white tracking-wider leading-none">
                BURGER&nbsp;<span className="text-gold">FACTORY</span>
              </span>
              <span className="h-px w-full mt-[4px] bg-gradient-to-r from-gold/70 via-gold/25 to-transparent" />
              <span className="font-body text-[0.52rem] text-warm-white/40 tracking-[0.42em] uppercase mt-[3px]">
                Restaurant
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Navigation principale"
            >
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <CommanderButton variant="primary" size="sm" label="Commander" />
              </div>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-warm-white hover:text-gold transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-gold"
                aria-label="Ouvrir le menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative font-body text-sm text-warm-white/60 hover:text-warm-white transition-colors tracking-wide group"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
      />
    </Link>
  );
}
