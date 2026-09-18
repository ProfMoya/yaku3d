"use client";

import { useT } from "@/lib/i18n/context";

/** Los tres pasos del pedido a medida, al lado del formulario. */
export function PasosPedido() {
  const t = useT();

  return (
    <ol className="space-y-10">
      {t.paginas.aPedido.pasos.map((paso, index) => (
        <li key={paso.titulo} className="flex gap-5">
          <span
            aria-hidden="true"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--yaku-violet)] text-white flex items-center justify-center font-display text-lg"
          >
            {index + 1}
          </span>
          <div>
            <h2 className="font-display text-xl text-[var(--yaku-text)] mb-2">
              {paso.titulo}
            </h2>
            <p className="text-[var(--yaku-muted)] leading-relaxed">
              {paso.texto}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
