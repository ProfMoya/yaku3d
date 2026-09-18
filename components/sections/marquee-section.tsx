"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useI18n } from "@/lib/i18n/context";
import { ProductMedia } from "@/components/product-placeholder";
import { formatearPrecio } from "@/lib/format";
import { novedades } from "@/lib/products";

export function NewArrivalsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const { t, locale } = useI18n();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--yaku-text)]">
              {t.novedades.titulo}
            </h2>
            <p className="text-[var(--yaku-muted)] text-sm uppercase tracking-wider mt-2 font-body">
              {t.novedades.volanta}
            </p>
          </div>

          <Link
            href="/catalogo"
            className={`text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-violet)] transition-all duration-700 font-body underline underline-offset-4 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t.novedades.verTodo}
          </Link>
        </div>

        {/* Products Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {novedades.map((producto, index) => (
            <Link
              key={producto.id}
              href={`/producto/${producto.slug}`}
              className={`group transition-all duration-700 text-center ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-[var(--yaku-surface)] mb-4 rounded-2xl">
                <ProductMedia producto={producto} />
              </div>
              <h3 className="font-display text-lg text-[var(--yaku-text)] mb-1">
                {producto.nombre}
              </h3>
              <p className="text-[var(--yaku-muted)] text-sm font-body">
                {formatearPrecio(producto.precio, locale)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
