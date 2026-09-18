"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";
import { ProductPlaceholder } from "@/components/product-placeholder";

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const t = useT();

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-20 lg:py-32 bg-[var(--yaku-cream)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texto */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-sm text-[var(--yaku-muted)] uppercase tracking-wider mb-4 font-body">
              {t.sobre.volanta}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--yaku-black)] mb-6">
              {t.sobre.titulo}
            </h2>
            <p className="text-[var(--yaku-muted)] leading-relaxed mb-6 font-body">
              {t.sobre.parrafo1}
            </p>
            <p className="text-[var(--yaku-muted)] leading-relaxed font-body">
              {t.sobre.parrafo2}
            </p>
          </div>

          {/* Imagen */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="aspect-[4/3] relative overflow-hidden rounded-3xl bg-[var(--yaku-cream-deep)]">
              <ProductPlaceholder />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
