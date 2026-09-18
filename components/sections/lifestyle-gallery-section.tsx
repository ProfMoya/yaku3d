"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";
import { ProductPlaceholder } from "@/components/product-placeholder";

export function LifestyleGallerySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const t = useT();

  return (
    <section
      id="taller"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-[var(--yaku-surface)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className={`text-[var(--yaku-muted)] text-sm uppercase tracking-widest mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.taller.volanta}
          </p>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--yaku-text)] transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.taller.titulo}
          </h2>
          <p
            className={`text-[var(--yaku-muted)] text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.taller.bajada}
          </p>
        </div>

        {/* Galería */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bloque de texto */}
          <div
            className={`lg:w-1/3 bg-[var(--yaku-violet)] text-white p-12 rounded-3xl flex flex-col justify-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h3 className="font-display text-4xl lg:text-5xl mb-6">
              {t.taller.bloqueTitulo}
            </h3>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              {t.taller.bloqueTexto}
            </p>
            <Link
              href="/a-pedido"
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-[var(--yaku-violet)] transition-all duration-300 self-start text-sm"
            >
              {t.taller.bloqueCta}
            </Link>
          </div>

          {/* Piezas */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.taller.capturas.map((caption, index) => (
              <div
                key={caption}
                className={`relative overflow-hidden rounded-3xl bg-[var(--yaku-bg)] group transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${(index + 1) * 150}ms`,
                  aspectRatio: "3/4",
                }}
              >
                <ProductPlaceholder etiqueta={caption} />
              </div>
            ))}
          </div>
        </div>

        {/* Cierre */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-[var(--yaku-muted)] mb-6">{t.taller.cierre}</p>
          <span className="inline-block border border-[var(--yaku-line)] px-8 py-3 rounded-full text-[var(--yaku-text)]">
            {t.taller.hashtag}
          </span>
        </div>
      </div>
    </section>
  );
}
