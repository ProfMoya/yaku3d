"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";
import { categorias, productos } from "@/lib/products";

/**
 * Grilla de colecciones. La plantilla dejaba este componente devolviendo
 * `null`, así que la sección 7 de la home no renderizaba nada.
 *
 * Cada tarjeta tiene su lugar fijo en la grilla y su color, para que el bloque
 * tenga ritmo en vez de ser cinco rectángulos iguales.
 */
const disposicion = [
  {
    clases: "md:col-span-2 md:row-span-2",
    fondo: "bg-[var(--yaku-violet)]",
    texto: "text-white",
    suave: "text-white/70",
  },
  {
    clases: "md:col-span-2",
    fondo: "bg-[var(--yaku-surface)]",
    texto: "text-[var(--yaku-text)]",
    suave: "text-[var(--yaku-muted)]",
  },
  {
    clases: "md:col-span-1",
    fondo: "bg-[var(--yaku-surface-2)]",
    texto: "text-[var(--yaku-text)]",
    suave: "text-[var(--yaku-muted)]",
  },
  {
    clases: "md:col-span-1",
    fondo: "bg-[var(--yaku-magenta)]",
    texto: "text-[var(--yaku-black)]",
    suave: "text-black/60",
  },
  {
    clases: "md:col-span-4",
    fondo: "bg-[var(--yaku-violet-deep)]",
    texto: "text-white",
    suave: "text-white/70",
  },
];

export function BentoSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const t = useT();

  return (
    <section
      id="colecciones"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-[var(--yaku-bg)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p
            className={`text-[var(--yaku-muted)] text-sm uppercase tracking-widest mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.colecciones.volanta}
          </p>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-4 text-[var(--yaku-text)] transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.colecciones.titulo}
          </h2>
          <p
            className={`text-[var(--yaku-muted)] text-lg max-w-2xl transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.colecciones.bajada}
          </p>
        </div>

        {/* Grilla */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
          {categorias.map((categoria, index) => {
            const estilo = disposicion[index];
            const cantidad = productos.filter(
              (p) => p.categoria === categoria,
            ).length;

            return (
              <Link
                key={categoria}
                href={`/catalogo?categoria=${categoria}`}
                className={`group relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-all duration-1000 ${estilo.clases} ${estilo.fondo} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${(index + 1) * 120}ms` }}
              >
                {/* Capas de fondo */}
                <div
                  className="absolute inset-0 opacity-10 transition-transform duration-700 group-hover:translate-y-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent 0 11px, currentColor 11px 12px)",
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <h3 className={`font-display text-2xl lg:text-3xl ${estilo.texto}`}>
                    {t.catalogo.categorias[categoria]}
                  </h3>
                  <ArrowUpRight
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${estilo.texto}`}
                  />
                </div>

                <p className={`relative text-sm ${estilo.suave}`}>
                  {cantidad === 1
                    ? t.colecciones.unaPieza
                    : `${cantidad} ${t.colecciones.piezas}`}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
