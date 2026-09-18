"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/context";
import type { CategoriaId, Producto } from "@/lib/products";

/**
 * Siluetas por categoría, dibujadas con capas apiladas — que es como sale una
 * pieza de la impresora. Cada perfil es el ancho relativo de cada capa, de
 * arriba hacia abajo.
 *
 * Con esto el catálogo sin fotos no se ve como una grilla de tiles iguales, y
 * no hace falta pedirle prestada una foto a nadie.
 */
const siluetas: Record<
  CategoriaId | "generico",
  { perfil: number[]; acento: string }
> = {
  // Bandeja: base ancha y chata.
  organizadores: {
    perfil: [0.35, 0.45, 0.8, 0.85, 0.85, 0.85, 0.8],
    acento: "var(--yaku-violet)",
  },
  // Florero: cuello angosto, cuerpo ancho.
  deco: {
    perfil: [0.3, 0.24, 0.34, 0.6, 0.76, 0.7, 0.46],
    acento: "var(--yaku-magenta)",
  },
  // Dispenser: pico fino y cuerpo recto.
  hogar: {
    perfil: [0.18, 0.2, 0.32, 0.62, 0.66, 0.66, 0.6],
    acento: "var(--yaku-violet-soft)",
  },
  // Dado: cubo parejo.
  juegos: {
    perfil: [0.55, 0.72, 0.76, 0.76, 0.76, 0.72, 0.55],
    acento: "var(--yaku-magenta)",
  },
  // Llavero: argolla arriba, placa abajo.
  personalizados: {
    perfil: [0.22, 0.5, 0.62, 0.62, 0.62, 0.56, 0.4],
    acento: "var(--yaku-violet)",
  },
  generico: {
    perfil: [0.3, 0.5, 0.68, 0.68, 0.56, 0.44, 0.34],
    acento: "var(--yaku-violet)",
  },
};

export function ProductPlaceholder({
  etiqueta,
  categoria,
}: {
  etiqueta?: string;
  categoria?: CategoriaId;
}) {
  const t = useT();
  const { perfil, acento } = siluetas[categoria ?? "generico"];

  const ancho = 72;
  const altoCapa = 7;
  const separacion = 2;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--yaku-surface)]">
      <svg
        viewBox={`0 0 ${ancho} ${perfil.length * (altoCapa + separacion)}`}
        className="w-20 h-20"
        fill="none"
        aria-hidden="true"
      >
        {perfil.map((relativo, index) => {
          const anchoCapa = ancho * relativo;
          return (
            <rect
              key={index}
              x={(ancho - anchoCapa) / 2}
              y={index * (altoCapa + separacion)}
              width={anchoCapa}
              height={altoCapa}
              rx={altoCapa / 2}
              fill={acento}
              // Las capas de abajo más opacas: da sensación de apoyo.
              opacity={0.3 + (index / (perfil.length - 1)) * 0.7}
            />
          );
        })}
      </svg>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--yaku-muted)]">
        {etiqueta ?? t.comun.sinFoto}
      </span>
    </div>
  );
}

/**
 * Imagen de producto: usa la foto si existe, si no cae en la silueta de su
 * categoría. Se monta dentro de un contenedor con `position: relative`.
 */
export function ProductMedia({ producto }: { producto: Producto }) {
  if (!producto.imagen) {
    return <ProductPlaceholder categoria={producto.categoria} />;
  }

  return (
    <Image
      src={producto.imagen}
      alt={producto.nombre}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}
