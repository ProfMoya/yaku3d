"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useI18n } from "@/lib/i18n/context";
import { ProductMedia, ProductPlaceholder } from "@/components/product-placeholder";
import { formatearPrecio } from "@/lib/format";
import { relacionados } from "@/lib/products";
import { Layers, Ruler, Truck } from "lucide-react";

export function ProductDetailSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const { t, locale } = useI18n();

  const bloques = [
    { icono: Layers, ...t.detalle.bloques.ficha },
    { icono: Ruler, ...t.detalle.bloques.medidas },
    { icono: Truck, ...t.detalle.bloques.envio },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[var(--yaku-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Imagen */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="aspect-square relative overflow-hidden bg-[var(--yaku-cream-deep)] rounded-3xl">
              <ProductPlaceholder />
            </div>
          </div>

          {/* Info */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="font-display text-4xl lg:text-5xl text-[var(--yaku-black)] mb-2">
              {t.detalle.nombre}
            </h2>
            <p className="text-xl text-[var(--yaku-violet)] mb-6 font-body">
              {formatearPrecio(t.detalle.precio, locale)}
            </p>

            <p className="text-[var(--yaku-muted)] leading-relaxed mb-8 font-body">
              {t.detalle.descripcion}
            </p>

            {/* Bloques informativos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {bloques.map((bloque) => {
                const Icono = bloque.icono;
                return (
                  <div key={bloque.titulo} className="px-4">
                    <Icono
                      className="w-8 h-8 mb-3 text-[var(--yaku-violet)]"
                      strokeWidth={1}
                    />
                    <h3 className="text-sm font-medium text-[var(--yaku-black)] mb-2 font-body">
                      {bloque.titulo}
                    </h3>
                    <p className="text-xs text-[var(--yaku-muted)] leading-relaxed font-body">
                      {bloque.texto}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="w-full bg-[var(--yaku-violet)] text-white py-4 rounded-full text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors"
            >
              {t.detalle.cta}
            </button>
          </div>
        </div>

        {/* Relacionados */}
        <div
          className={`mt-24 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relacionados.map((producto) => (
              <Link key={producto.id} href="#catalogo" className="group text-center">
                <div className="aspect-[4/5] relative overflow-hidden bg-[var(--yaku-cream-deep)] mb-4 rounded-2xl">
                  <ProductMedia producto={producto} />
                </div>
                <h4 className="font-display text-lg text-[var(--yaku-black)] mb-1">
                  {producto.nombre}
                </h4>
                <p className="text-[var(--yaku-muted)] text-sm font-body">
                  {formatearPrecio(producto.precio, locale)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
