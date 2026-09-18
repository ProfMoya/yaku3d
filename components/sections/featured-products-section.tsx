"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useI18n } from "@/lib/i18n/context";
import { ProductMedia } from "@/components/product-placeholder";
import { formatearPrecio } from "@/lib/format";
import { filtros, productos, type FiltroId } from "@/lib/products";

export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const { t, locale } = useI18n();
  const [filtroActivo, setFiltroActivo] = useState<FiltroId>("todos");

  const visibles =
    filtroActivo === "todos"
      ? productos
      : productos.filter((p) => p.categoria === filtroActivo);

  return (
    <section
      id="catalogo"
      ref={ref}
      className="py-20 lg:py-32 bg-[var(--yaku-cream)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--yaku-black)] mb-4">
            {t.catalogo.titulo}
          </h2>
          <p className="text-[var(--yaku-muted)] text-base font-body">
            {t.catalogo.bajada}
          </p>
        </div>

        {/* Layout: filtros + grilla */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filtros */}
          <div
            className={`lg:w-48 flex-shrink-0 lg:sticky lg:top-24 lg:self-start transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex flex-row flex-wrap lg:flex-col gap-0 border-t border-[var(--yaku-line)]">
              {filtros.map((filtro) => {
                const activo = filtroActivo === filtro;
                return (
                  <div
                    key={filtro}
                    className="border-b border-[var(--yaku-line)] flex-1 lg:flex-none"
                  >
                    <button
                      type="button"
                      onClick={() => setFiltroActivo(filtro)}
                      aria-pressed={activo}
                      className={`w-full text-left py-4 px-2 text-sm transition-colors font-body ${
                        activo
                          ? "text-[var(--yaku-violet)] font-medium"
                          : "text-[var(--yaku-muted)] hover:text-[var(--yaku-black)]"
                      }`}
                    >
                      {t.catalogo.categorias[filtro]}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grilla */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {visibles.map((producto, index) => (
                <Link
                  key={producto.id}
                  href="#"
                  className={`group transition-all duration-700 text-center ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 60}ms` }}
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-[var(--yaku-cream-deep)] mb-4 rounded-2xl">
                    <ProductMedia producto={producto} />
                  </div>

                  <h3 className="font-display text-lg text-[var(--yaku-black)] mb-1">
                    {producto.nombre}
                  </h3>
                  <p className="text-[var(--yaku-muted)] text-sm font-body">
                    {formatearPrecio(producto.precio, locale)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
