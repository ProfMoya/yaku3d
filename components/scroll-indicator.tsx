"use client";

/**
 * Pista de scroll para el hero: una línea fina y un chevron que baja despacio.
 *
 * `opacidad` la controla quien lo monta — en el hero se va a cero en cuanto
 * empieza el scroll, porque una vez que la persona ya bajó, seguir insistiendo
 * es ruido.
 *
 * Es decorativo: va con aria-hidden y sin capturar el puntero, para no
 * estorbar al botón que tiene al lado.
 */
export function ScrollIndicator({ opacidad = 1 }: { opacidad?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
      style={{ opacity: Math.max(0, Math.min(1, opacidad)) }}
    >
      <span className="block h-10 w-px bg-gradient-to-b from-transparent to-white/60" />
      <svg
        viewBox="0 0 16 10"
        className="w-4 h-2.5 animate-scroll-hint"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 1l7 7 7-7" className="text-white/80" />
      </svg>
    </div>
  );
}
