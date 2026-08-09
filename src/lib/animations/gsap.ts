import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Registers GSAP plugins. Must be called once, client-side only.
 * Import and call this inside a useEffect or a 'use client' module.
 */
export function registerGSAP(): void {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

/**
 * Default ease tokens for Burger Factory animations.
 */
export const ease = {
  out: "power3.out",
  inOut: "power3.inOut",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.5)",
} as const;

/**
 * Default durations (seconds).
 */
export const dur = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  xslow: 1.6,
} as const;

/**
 * ScrollTrigger defaults for reveal animations.
 */
export const stDefaults = {
  start: "top 85%",
  end: "top 20%",
  toggleActions: "play none none none",
} as const;

export { gsap, ScrollTrigger };
