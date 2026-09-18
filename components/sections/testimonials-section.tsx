"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.3 });
  const t = useT();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonios = t.testimonios.items;

  const siguiente = () =>
    setActiveIndex((prev) => (prev === testimonios.length - 1 ? 0 : prev + 1));

  const anterior = () =>
    setActiveIndex((prev) => (prev === 0 ? testimonios.length - 1 : prev - 1));

  return (
    <section
      id="testimonios"
      ref={ref}
      className="py-20 lg:py-32 bg-[var(--yaku-cream)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-[var(--yaku-muted)] uppercase tracking-wider mb-4 font-body">
            {t.testimonios.volanta}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-[var(--yaku-black)]">
            {t.testimonios.titulo}
          </h2>
        </div>

        {/* Carrusel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative min-h-[280px] flex items-center justify-center text-center px-8 lg:px-20">
            {testimonios.map((testimonio, index) => (
              <div
                key={testimonio.autor}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
                aria-hidden={activeIndex !== index}
              >
                <blockquote className="mb-8">
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl text-[var(--yaku-black)] leading-relaxed max-w-4xl">
                    &ldquo;{testimonio.cita}&rdquo;
                  </p>
                </blockquote>
                <footer>
                  <p className="text-[var(--yaku-black)] font-medium mb-1">
                    {testimonio.autor}
                  </p>
                  <p className="text-sm text-[var(--yaku-muted)] font-body">
                    {testimonio.rol} — {testimonio.lugar}
                  </p>
                </footer>
              </div>
            ))}
          </div>

          {/* Navegación */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              type="button"
              onClick={anterior}
              className="w-12 h-12 rounded-full border border-[var(--yaku-line)] flex items-center justify-center text-[var(--yaku-black)] hover:border-[var(--yaku-violet)] hover:text-[var(--yaku-violet)] transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonios.map((testimonio, index) => (
                <button
                  key={testimonio.autor}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[var(--yaku-violet)] w-6"
                      : "bg-[var(--yaku-line)] w-2 hover:bg-[var(--yaku-muted)]"
                  }`}
                  aria-label={testimonio.autor}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={siguiente}
              className="w-12 h-12 rounded-full border border-[var(--yaku-line)] flex items-center justify-center text-[var(--yaku-black)] hover:border-[var(--yaku-violet)] hover:text-[var(--yaku-violet)] transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
