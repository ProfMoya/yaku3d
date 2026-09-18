"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";
import {
  categoriasMeta,
  getCategoriasVisibles,
  productos,
  type CategoriaId,
} from "@/lib/products";

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

/**
 * Una tarjeta con su propio observador: se enciende cuando entra en pantalla y
 * se apaga al salir, así el efecto acompaña al scroll en vez de dispararse una
 * sola vez. Por eso va en su propio componente — un hook por tarjeta no se
 * puede llamar dentro de un map.
 */
function TarjetaCategoria({
  categoria,
  index,
  etiqueta,
  piezas,
}: {
  categoria: CategoriaId;
  index: number;
  etiqueta: string;
  piezas: string;
}) {
  // Umbral alto y triggerOnce en false: se enciende cuando la tarjeta está
  // bien dentro del viewport, no al asomar una esquina.
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>({
    threshold: 0.55,
    triggerOnce: false,
  });

  const estilo = disposicion[index % disposicion.length];
  const meta = categoriasMeta[categoria];

  return (
    <Link
      ref={ref}
      href={`/catalogo?categoria=${categoria}`}
      className={`group relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between bg-[var(--yaku-surface)] transition-all duration-700 ease-out ${estilo.clases} ${
        isVisible
          ? "opacity-100 translate-y-0 ring-1 ring-[var(--yaku-violet-soft)]/50"
          : "opacity-70 translate-y-4 ring-0"
      }`}
    >
      {meta.imagen && (
        <Image
          src={meta.imagen}
          alt=""
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            isVisible ? "scale-105" : "scale-100"
          }`}
        />
      )}

      {/* El tinte se abre al encenderse: la foto se ve más y la tarjeta
          "prende". Al salir de pantalla vuelve a cerrarse. */}
      <div
        className="absolute inset-0 transition-opacity duration-700 mix-blend-multiply"
        style={{
          background: estilo.tinte,
          opacity: isVisible ? 0.5 : 0.8,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Resplandor de marca, solo mientras está encendida */}
      <div
        aria-hidden="true"
        className={`absolute -inset-10 rounded-full blur-3xl transition-opacity duration-700 ${
          isVisible ? "opacity-25" : "opacity-0"
        }`}
        style={{ background: "var(--yaku-violet-soft)" }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl lg:text-3xl text-white">
          {etiqueta}
        </h3>
        <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>

      <p className="relative text-sm text-white/80">{piezas}</p>
    </Link>
  );
}

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
            const cantidad = productos.filter(
              (p) => p.categoria === categoria,
            ).length;

            return (
              <TarjetaCategoria
                key={categoria}
                categoria={categoria}
                index={index}
                etiqueta={t.catalogo.categorias[categoria]}
                piezas={
                  cantidad === 1
                    ? t.colecciones.unaPieza
                    : `${cantidad} ${t.colecciones.piezas}`
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
