"use client";

import { useT } from "@/lib/i18n/context";

/**
 * Encabezado de las páginas internas. Además del título, aporta el espacio
 * superior que necesitan para no quedar debajo de la barra fija (la home no lo
 * necesita porque arranca con el hero a sangre).
 */
export function PageHeader({
  seccion,
}: {
  seccion: "catalogo" | "aPedido" | "taller";
}) {
  const t = useT();
  const { titulo, bajada } = t.paginas[seccion];

  return (
    // Semitransparente para que el video de fondo se intuya detrás del
    // encabezado, sin restarle legibilidad al título.
    <header className="relative overflow-hidden bg-[var(--yaku-surface)]/70 pt-36 pb-16 lg:pt-44 lg:pb-24">
      {/* Halo de marca, para que el encabezado no sea un rectángulo plano */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--yaku-violet)" }}
      />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--yaku-text)]">
          {titulo}
        </h1>
        <p className="mt-6 max-w-2xl text-[var(--yaku-muted)] text-lg leading-relaxed">
          {bajada}
        </p>
      </div>
    </header>
  );
}
