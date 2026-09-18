"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/context";

/**
 * Encabezado de las páginas internas. Además del título, aporta el espacio
 * superior que necesitan para no quedar debajo de la barra fija (la home no lo
 * necesita porque arranca con el hero a sangre).
 *
 * Con `imagen` la cabecera se convierte en una banda ilustrada; sin ella
 * mantiene la superficie semitransparente que deja intuir el video de fondo.
 */
export function PageHeader({
  seccion,
  imagen,
}: {
  seccion: "catalogo" | "aPedido" | "taller";
  imagen?: string;
}) {
  const t = useT();
  const { titulo, bajada } = t.paginas[seccion];

  return (
    <header
      className={`relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24 ${
        imagen ? "" : "bg-[var(--yaku-surface)]/70"
      }`}
    >
      {imagen ? (
        <>
          <Image
            src={imagen}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Tinte de marca y oscurecido: el título va en crema y tiene que
              leerse sobre cualquier zona de la foto. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(120deg, var(--yaku-violet-deep) 0%, var(--yaku-black) 85%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[var(--yaku-bg)] via-[var(--yaku-bg)]/40 to-[var(--yaku-bg)]/60"
          />
        </>
      ) : (
        // Halo de marca, para que el encabezado no sea un rectángulo plano
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-25"
          style={{ background: "var(--yaku-violet)" }}
        />
      )}

      {/* Centrado en móvil, alineado a la izquierda a partir de lg */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center lg:text-left">
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--yaku-text)]">
          {titulo}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto lg:mx-0 text-[var(--yaku-muted)] text-lg leading-relaxed">
          {bajada}
        </p>
      </div>
    </header>
  );
}
