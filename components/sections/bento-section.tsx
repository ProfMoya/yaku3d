"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";
import { categoriasMeta, getCategoriasVisibles, productos } from "@/lib/products";

/**
 * Grilla de colecciones. La plantilla dejaba este componente devolviendo
 * `null`, así que la sección no renderizaba nada.
 *
 * Cada posición de la grilla tiene su tamaño y su tinte, para que el bloque
 * tenga ritmo en vez de ser cinco rectángulos iguales. Se indexa con módulo
 * para que siga funcionando si el panel oculta o agrega categorías.
 */
const disposicion = [
  { clases: "md:col-span-2 md:row-span-2", tinte: "var(--yaku-violet)" },
  { clases: "md:col-span-2", tinte: "var(--yaku-violet-deep)" },
  { clases: "md:col-span-1", tinte: "var(--yaku-black)" },
  { clases: "md:col-span-1", tinte: "var(--yaku-magenta)" },
  { clases: "md:col-span-4", tinte: "var(--yaku-violet-deep)" },
];

export function BentoSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();
  const t = useT();
  const visibles = getCategoriasVisibles();

  return (
    <section
      id="colecciones"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-transparent"
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
          {visibles.map((categoria, index) => {
            const estilo = disposicion[index % disposicion.length];
            const meta = categoriasMeta[categoria];
            const cantidad = productos.filter(
              (p) => p.categoria === categoria,
            ).length;

            return (
              <Link
                key={categoria}
                href={`/catalogo?categoria=${categoria}`}
                className={`group relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between bg-[var(--yaku-surface)] transition-all duration-1000 ${estilo.clases} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${(index + 1) * 120}ms` }}
              >
                {meta.imagen && (
                  <Image
                    src={meta.imagen}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* Tinte de marca sobre la foto, para que el texto blanco se
                    lea y para que las cinco tarjetas se vean de la misma
                    familia aunque las fotos sean distintas. */}
                <div
                  className="absolute inset-0 opacity-75 transition-opacity duration-500 group-hover:opacity-60 mix-blend-multiply"
                  style={{ background: estilo.tinte }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                <div className="relative flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl lg:text-3xl text-white">
                    {t.catalogo.categorias[categoria]}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <p className="relative text-sm text-white/80">
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
