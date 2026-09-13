import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-32 pb-24 md:pt-40">
        <h1 className="text-display text-4xl md:text-5xl text-warm-white mb-3">
          {title}
        </h1>
        {updated && (
          <p className="font-body text-xs text-warm-white/40 mb-12">
            Dernière mise à jour : {updated}
          </p>
        )}
        <div className="legal-prose flex flex-col gap-8">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-body text-sm text-gold tracking-[0.2em] uppercase mb-3">
        {title}
      </h2>
      <div className="font-body text-sm text-warm-white-2 leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}
