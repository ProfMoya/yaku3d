"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useI18n } from "@/lib/i18n/context";
import { ProductMedia } from "@/components/product-placeholder";
import { formatearPrecio } from "@/lib/format";
import { filtros, productos, type FiltroId } from "@/lib/products";

function esFiltro(valor: string | null): valor is FiltroId {
  return valor !== null && (filtros as string[]).includes(valor);
}

/**
 * Grilla del catálogo. El filtro vive en la URL (`/catalogo?categoria=deco`)
 * para que el link se pueda compartir y para que las tarjetas de colecciones
 * de la home entren directo a una categoría.
 *
 * Usa useSearchParams, así que la página que la monta tiene que envolverla en
 * un <Suspense>.
 */
export function FeaturedProductsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const { t, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parametro = searchParams.get("categoria");
  const filtroActivo: FiltroId = esFiltro(parametro) ? parametro : "todos";

  const visibles =
    filtroActivo === "todos"
      ? productos
      : productos.filter((p) => p.categoria === filtroActivo);

  const cambiarFiltro = (filtro: FiltroId) => {
    const destino =
      filtro === "todos" ? pathname : `${pathname}?categoria=${filtro}`;
    router.replace(destino, { scroll: false });
  };

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filtros. Se quedan fijos al scrollear en todos los tamaños.
              `top-20` deja pasar la barra de navegación, que llega a unos 80px.

              En móvil son una tira que se desplaza en horizontal: con seis
              categorías, envolviéndolas ocuparían dos o tres líneas de alto
              fijo y se comerían media pantalla. A partir de lg vuelven a la
              columna lateral. */}
          <div className="sticky top-20 z-30 self-start lg:top-28 lg:w-48 lg:flex-shrink-0">
            <div className="-mx-6 px-6 py-3 bg-[var(--yaku-bg)]/90 backdrop-blur-md border-b border-[var(--yaku-line)] lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:border-b-0 lg:border-t">
              <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
                {filtros.map((filtro) => {
                  const activo = filtroActivo === filtro;
                  return (
                    <button
                      key={filtro}
                      type="button"
                      onClick={() => cambiarFiltro(filtro)}
                      aria-pressed={activo}
                      className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors font-body lg:w-full lg:flex-shrink lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-b lg:border-[var(--yaku-line)] lg:px-2 lg:py-4 lg:text-left ${
                        activo
                          ? "border-[var(--yaku-magenta)] text-[var(--yaku-magenta)] font-medium"
                          : "border-[var(--yaku-line)] text-[var(--yaku-muted)] hover:text-[var(--yaku-text)]"
                      }`}
                    >
                      {t.catalogo.categorias[filtro]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grilla */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {visibles.map((producto, index) => (
                <Link
                  key={producto.id}
                  href={`/producto/${producto.slug}`}
                  className={`group transition-all duration-700 text-center ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-[var(--yaku-surface)] mb-4 rounded-2xl border border-transparent group-hover:border-[var(--yaku-line)] transition-colors">
                    <ProductMedia producto={producto} />
                  </div>

                  <h2 className="font-display text-lg text-[var(--yaku-text)] mb-1 group-hover:text-[var(--yaku-violet-soft)] transition-colors">
                    {producto.nombre}
                  </h2>
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
