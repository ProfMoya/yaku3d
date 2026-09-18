"use client";

import Link from "next/link";
import { ArrowLeft, Layers, MessageCircle, Ruler, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { ProductMedia } from "@/components/product-placeholder";
import { formatearPrecio } from "@/lib/format";
import type { Producto } from "@/lib/products";
import { linkConsulta, whatsappConfigurado } from "@/lib/whatsapp";

/**
 * Ficha de producto. Los datos técnicos todavía salen del diccionario y son
 * los mismos para todas las piezas: cuando el catálogo viva en Supabase (fase
 * 2) cada producto va a traer los suyos.
 */
export function ProductDetail({
  producto,
  relacionados,
}: {
  producto: Producto;
  relacionados: Producto[];
}) {
  const { t, locale } = useI18n();

  const bloques = [
    { icono: Layers, ...t.detalle.bloques.ficha },
    { icono: Ruler, ...t.detalle.bloques.medidas },
    { icono: Truck, ...t.detalle.bloques.envio },
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
            <p className="text-sm text-[var(--yaku-muted)] uppercase tracking-wider mb-3 font-body">
              {t.catalogo.categorias[producto.categoria]}
            </p>

            <h1 className="font-display text-4xl lg:text-5xl text-[var(--yaku-text)] mb-2">
              {producto.nombre}
            </h1>
            <p className="text-xl text-[var(--yaku-violet-soft)] mb-6 font-body">
              {formatearPrecio(producto.precio, locale)}
            </p>

            <p className="text-[var(--yaku-muted)] leading-relaxed mb-8 font-body">
              {t.paginas.producto.descripcionGenerica}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {bloques.map((bloque) => {
                const Icono = bloque.icono;
                return (
                  <div key={bloque.titulo}>
                    <Icono
                      className="w-8 h-8 mb-3 text-[var(--yaku-violet-soft)]"
                      strokeWidth={1}
                    />
                    <h2 className="text-sm font-medium text-[var(--yaku-text)] mb-2 font-body">
                      {bloque.titulo}
                    </h2>
                    <p className="text-xs text-[var(--yaku-muted)] leading-relaxed font-body">
                      {bloque.texto}
                    </p>
                  </div>
                );
              })}
            </div>

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
                <h3 className="font-display text-lg text-[var(--yaku-text)] mb-1">
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
