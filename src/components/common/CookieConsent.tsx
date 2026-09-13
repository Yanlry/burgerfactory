"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "bf-cookie-consent";

export type CookieConsentValue = "accepted" | "rejected";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CookieConsentValue | null {
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

function getServerSnapshot(): CookieConsentValue | null {
  return null;
}

function setCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(CONSENT_KEY, value);
  listeners.forEach((listener) => listener());
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="max-w-3xl mx-auto bg-anthracite border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
            <Cookie size={18} className="text-gold" />
          </div>
          <p
            id="cookie-consent-title"
            className="font-body text-sm text-warm-white-2 leading-relaxed"
          >
            Nous utilisons des cookies pour améliorer votre expérience sur notre site.
            Vous pouvez accepter ou refuser leur utilisation.{" "}
            <Link
              href="/cookies"
              className="text-gold underline underline-offset-2 hover:text-gold-hover transition-colors"
            >
              En savoir plus
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setCookieConsent("rejected")}
            className="px-5 py-2.5 text-sm font-body text-warm-white-2 hover:text-warm-white transition-colors rounded-full border border-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-gold"
          >
            Refuser
          </button>
          <button
            onClick={() => setCookieConsent("accepted")}
            className="px-5 py-2.5 text-sm font-body font-semibold text-black bg-gold hover:bg-gold-hover transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-gold"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
