"use client";

/**
 * Video de fondo fijo, detrás de todas las páginas públicas.
 *
 * Va con un velo oscuro encima bastante opaco a propósito: el video tiene que
 * leerse como una textura en movimiento, no como una imagen que compite con el
 * texto. Con el velo, el fondo efectivo se queda cerca de --yaku-bg, así que
 * los contrastes medidos para la paleta siguen valiendo.
 *
 * `-z-10` lo mete por debajo del contenido; el fondo de <body> queda como
 * respaldo si el video no carga.
 *
 * Decisión del cliente: se reproduce siempre, también para quien tenga
 * activado "reducir movimiento" en su sistema. Lo habitual sería pausarlo en
 * ese caso — un fondo animado a pantalla completa es justo lo que esa
 * preferencia intenta evitar — pero se prioriza que la marca se vea igual para
 * todo el mundo. Para revertirlo: leer `prefers-reduced-motion` y pausar.
 */
export function VideoBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <video
        src="/videos/backgraund.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Velo oscuro sobre el video. Se probó aclararlo (velo al 40% y un
          filtro de brillo), pero el resultado no convenció: vuelve al 85%, que
          deja el video como una textura tenue y no como una imagen que compite
          con el contenido. Es el número a mover si se quiere más o menos. */}
      <div className="absolute inset-0 bg-[var(--yaku-bg)]/85" />
    </div>
  );
}
