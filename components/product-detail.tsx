"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { ProductMedia } from "@/components/product-placeholder";
import { formatearPrecio } from "@/lib/format";
import type { Producto } from "@/lib/products";
import { linkConsulta, whatsappConfigurado } from "@/lib/whatsapp";

/**
 * Ficha de producto. Los datos técnicos salen de `lib/products.ts` y las
 * etiquetas del diccionario, así que la tabla se traduce entera con el
 * toggle ES/EN.
 */
export function ProductDetail({
  producto,
  relacionados,
}: {
  producto: Producto;
  relacionados: Producto[];
}) {
  const { t, locale } = useI18n();
  const f = t.ficha;

  const especificaciones = [
    { etiqueta: f.material, valor: f.materiales[producto.material] },
    { etiqueta: f.medidas, valor: producto.medidas },
    { etiqueta: f.tiempo, valor: producto.tiempoImpresion },
    {
      etiqueta: f.colores,
      valor: producto.colores
        .map((color) => f.nombresColores[color])
        .join(" · "),
    },
    {
      etiqueta: f.exterior,
      valor: producto.aptoExterior ? f.exteriorSi : f.exteriorNo,
    },
  ];

  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[var(--yaku-bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-violet-soft)] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.paginas.producto.volver}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Imagen */}
          <div className="aspect-square relative overflow-hidden bg-[var(--yaku-surface)] rounded-3xl">
            <ProductMedia producto={producto} />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <Link
              href={`/catalogo?categoria=${producto.categoria}`}
              className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-violet-soft)] uppercase tracking-wider mb-3 font-body transition-colors"
            >
              {t.catalogo.categorias[producto.categoria]}
            </Link>

            <h1 className="font-display text-4xl lg:text-5xl text-[var(--yaku-text)] mb-2">
              {producto.nombre}
            </h1>
            <p className="text-xl text-[var(--yaku-violet-soft)] mb-6 font-body">
              {formatearPrecio(producto.precio, locale)}
            </p>

            <p className="text-[var(--yaku-muted)] leading-relaxed mb-10 font-body">
              {producto.descripcion[locale]}
            </p>

            {/* Ficha técnica */}
            <h2 className="text-sm font-medium text-[var(--yaku-text)] uppercase tracking-wider mb-4 font-body">
              {f.titulo}
            </h2>
            <dl className="border-t border-[var(--yaku-line)] mb-10">
              {especificaciones.map((fila) => (
                <div
                  key={fila.etiqueta}
                  className="flex justify-between gap-6 py-3 border-b border-[var(--yaku-line)] text-sm"
                >
                  <dt className="text-[var(--yaku-muted)] font-body flex-shrink-0">
                    {fila.etiqueta}
                  </dt>
                  <dd className="text-[var(--yaku-text)] font-body text-right">
                    {fila.valor}
                  </dd>
                </div>
              ))}
            </dl>

            {whatsappConfigurado ? (
              <a
                href={linkConsulta(producto)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full bg-[var(--yaku-violet)] text-white py-4 rounded-full text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                {t.detalle.cta}
              </a>
            ) : (
              <Link
                href="/a-pedido"
                className="inline-flex items-center justify-center gap-3 w-full bg-[var(--yaku-violet)] text-white py-4 rounded-full text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                {t.comun.consultar}
              </Link>
            )}
          </div>
        </div>

        {/* Relacionados */}
        <div className="mt-24">
          <h2 className="font-display text-2xl lg:text-3xl text-[var(--yaku-text)] mb-8">
            {t.paginas.producto.relacionados}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relacionados.map((otro) => (
              <Link
                key={otro.id}
                href={`/producto/${otro.slug}`}
                className="group text-center"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-[var(--yaku-surface)] mb-4 rounded-2xl">
                  <ProductMedia producto={otro} />
                </div>
                <h3 className="font-display text-lg text-[var(--yaku-text)] mb-1 group-hover:text-[var(--yaku-violet-soft)] transition-colors">
                  {otro.nombre}
                </h3>
                <p className="text-[var(--yaku-muted)] text-sm font-body">
                  {formatearPrecio(otro.precio, locale)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
