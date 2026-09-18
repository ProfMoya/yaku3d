"use client";

import { useState } from "react";
import { eliminarProducto } from "@/app/actions/productos";

/**
 * Borrar es irreversible, así que pide confirmación escribiendo el nombre.
 * Un `confirm()` se acepta sin leer; tener que copiar el nombre obliga a mirar
 * qué se está borrando.
 */
export function EliminarProductoButton({
  id,
  nombre,
}: {
  id: string;
  nombre: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const [texto, setTexto] = useState("");

  const coincide = texto.trim() === nombre;

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="text-sm text-[var(--yaku-magenta)] hover:underline"
      >
        Borrar esta pieza
      </button>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--yaku-magenta)] p-6">
      <p className="text-sm text-[var(--yaku-text)]">
        Esto borra <strong>{nombre}</strong> y sus fotos, y no se puede deshacer.
        Escribí el nombre para confirmar.
      </p>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={nombre}
        aria-label={`Escribí "${nombre}" para confirmar`}
        className="mt-4 w-full max-w-sm rounded-2xl bg-[var(--yaku-bg)] border border-[var(--yaku-line)] px-4 py-3 text-[var(--yaku-text)] placeholder:text-[var(--yaku-muted)]/50 focus:outline-none focus:border-[var(--yaku-magenta)]"
      />

      <div className="mt-4 flex items-center gap-4">
        <form action={eliminarProducto}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            disabled={!coincide}
            className="rounded-full bg-[var(--yaku-magenta)] text-[var(--yaku-black)] px-6 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Borrar definitivamente
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            setAbierto(false);
            setTexto("");
          }}
          className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-text)] transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
