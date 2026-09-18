"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";

/**
 * Una foto por argumento, en el mismo orden que `t.porQue.items`: el material,
 * el diseño y el trabajo a medida.
 */
const fotos = [
  "/images/porque-material.jpg",
  "/images/porque-diseno.jpg",
  "/images/porque-medida.jpg",
];

export function ProductFeaturesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const t = useT();

  return (
    <section
      id="porque"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--yaku-text)] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.porQue.titulo}
          </h2>
          <p
            className={`text-[var(--yaku-muted)] text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.porQue.bajada}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-32">
          {t.porQue.items.map((item, index) => (
            <div
              key={item.titulo}
              className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Texto: izquierda en los pares, derecha en los impares */}
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <h3 className="font-display text-3xl md:text-4xl mb-6 text-[var(--yaku-text)]">
                  {item.titulo}
                </h3>
                <p className="text-[var(--yaku-muted)] text-lg leading-relaxed">
                  {item.texto}
                </p>
              </div>

              {/* Imagen */}
              <div
                className={`aspect-[3/2] relative overflow-hidden rounded-3xl bg-[var(--yaku-surface)] ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <Image
                  src={fotos[index]}
                  alt={item.titulo}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
