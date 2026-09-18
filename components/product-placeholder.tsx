"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/context";
import type { Producto } from "@/lib/products";

/**
 * Relleno para los productos que todavía no tienen foto: capas apiladas, que
 * es como sale una pieza de la impresora. Es preferible a una foto prestada.
 */
export function ProductPlaceholder({ etiqueta }: { etiqueta?: string }) {
  const t = useT();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--yaku-surface)]">
      <svg
        viewBox="0 0 64 56"
        className="w-16 h-14"
        fill="none"
        aria-hidden="true"
      >
        {[
          { y: 6, w: 20, o: 0.25 },
          { y: 16, w: 32, o: 0.4 },
          { y: 26, w: 44, o: 0.55 },
          { y: 36, w: 36, o: 0.75 },
          { y: 46, w: 28, o: 1 },
        ].map((capa) => (
          <rect
            key={capa.y}
            x={(64 - capa.w) / 2}
            y={capa.y}
            width={capa.w}
            height="5"
            rx="2.5"
            fill="var(--yaku-violet)"
            opacity={capa.o}
          />
        ))}
      </svg>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--yaku-muted)]">
        {etiqueta ?? t.comun.sinFoto}
      </span>
    </div>
  );
}

/**
 * Imagen de producto: usa la foto si existe, si no cae en el placeholder.
 * Se monta dentro de un contenedor con `position: relative`.
 */
export function ProductMedia({ producto }: { producto: Producto }) {
  if (!producto.imagen) return <ProductPlaceholder />;

  return (
    <Image
      src={producto.imagen}
      alt={producto.nombre}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}
