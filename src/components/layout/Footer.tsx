import Link from "next/link";
import { Phone, MapPin, Clock, Share2, Globe } from "lucide-react";
import { restaurantConfig, RESTAURANT_PHONE } from "@/config/restaurant";

export function Footer() {
  const { name, phoneDisplay, address, openingHours } = restaurantConfig;

  return (
    <footer id="contact" className="bg-dark border-t border-white/[0.06]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl text-warm-white tracking-wider mb-4">
              BURGER&nbsp;<span className="text-gold">FACTORY</span>
            </h2>
            <p className="font-body text-warm-white-2 text-sm leading-relaxed max-w-[220px]">
              Restaurant de burgers premium à Haubourdin. Le goût passe avant tout.
            </p>
            {/* Socials placeholder */}
            <div className="flex gap-3 mt-6">
              <SocialLink href="#" label="Instagram">
                <Share2 size={18} />
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <Globe size={18} />
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body text-xs text-gold tracking-[0.25em] uppercase mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/carte", label: "La carte" },
                { href: "/nous-trouver", label: "Nous trouver" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-warm-white-2 hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-body text-xs text-gold tracking-[0.25em] uppercase mb-5">
              Horaires
            </h3>
            <ul className="flex flex-col gap-2">
              {openingHours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 font-body text-sm">
                  <span className="text-warm-white-2">{h.day}</span>
                  <span className="text-warm-white text-right">
                    {h.lunch ? (
                      <>
                        {h.lunch}
                        <br />
                        {h.dinner}
                      </>
                    ) : (
                      h.dinner
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-xs text-gold tracking-[0.25em] uppercase mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="flex items-start gap-3 font-body text-sm text-warm-white-2 hover:text-gold transition-colors group"
                  aria-label={`Appeler le restaurant au ${phoneDisplay}`}
                >
                  <Phone
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-gold group-hover:scale-110 transition-transform"
                  />
                  <span>{phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-body text-sm text-warm-white-2 hover:text-warm-white transition-colors"
                >
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                  <span>
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}
                  </span>
                </a>
              </li>
            </ul>

            {/* Commander CTA */}
            <a
              href={`tel:${RESTAURANT_PHONE}`}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-body font-semibold text-sm rounded-full hover:bg-gold-hover transition-all duration-200 hover:scale-[1.02]"
            >
              <Phone size={16} />
              Commander par téléphone
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-6 lg:px-12 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs text-warm-white/25">
          © {new Date().getFullYear()} {name}. Tous droits réservés.
        </p>
        <p className="font-body text-xs text-warm-white/20">
          58 Rue Sadi Carnot, 59320 Haubourdin
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-warm-white/40 hover:text-gold hover:border-gold/40 transition-all duration-200"
    >
      {children}
    </a>
  );
}
