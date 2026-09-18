"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { guardarProducto, type EstadoProducto } from "@/app/actions/productos";
import { generarSlug } from "@/lib/slug";
import type { CategoriaRow, ProductoRow } from "@/lib/db-types";

const COLORES = [
  { id: "negro", label: "Negro" },
  { id: "blanco", label: "Blanco" },
  { id: "gris", label: "Gris" },
  { id: "violeta", label: "Violeta" },
  { id: "magenta", label: "Magenta" },
  { id: "natural", label: "Natural" },
];

const MATERIALES = [
  { id: "pla", label: "PLA" },
  { id: "petg", label: "PETG" },
  { id: "tpu", label: "TPU (flexible)" },
];

const ESTADO_INICIAL: EstadoProducto = {};

const campo =
  "w-full rounded-2xl bg-[var(--yaku-bg)] border border-[var(--yaku-line)] px-4 py-3 text-[var(--yaku-text)] placeholder:text-[var(--yaku-muted)]/60 focus:outline-none focus:border-[var(--yaku-violet)] transition-colors";
const etiqueta = "block text-sm text-[var(--yaku-text)] mb-2";
const ayuda = "mt-1 text-xs text-[var(--yaku-muted)]";

export function ProductoForm({
  producto,
  categorias,
}: {
  producto?: ProductoRow;
  categorias: CategoriaRow[];
}) {
  const [estado, formAction, pendiente] = useActionState<EstadoProducto, FormData>(
    guardarProducto,
    ESTADO_INICIAL,
  );

  // El slug se propone desde el nombre mientras no se toque a mano. En una
  // pieza que ya existe no se toca solo: cambiarlo rompería su URL.
  const [nombre, setNombre] = useState(producto?.nombre ?? "");
  const [slug, setSlug] = useState(producto?.slug ?? "");
  const [slugEditado, setSlugEditado] = useState(Boolean(producto));

  const slugMostrado = slugEditado ? slug : generarSlug(nombre);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {producto && <input type="hidden" name="id" value={producto.id} />}

      {/* Identidad */}
      <section className="rounded-3xl border border-[var(--yaku-line)] bg-[var(--yaku-surface)] p-6 space-y-5">
        <div>
          <label htmlFor="nombre" className={etiqueta}>
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className={campo}
          />
        </div>

        <div>
          <label htmlFor="slug" className={etiqueta}>
            URL
          </label>
          <input
            id="slug"
            name="slug"
            value={slugMostrado}
            onChange={(e) => {
              setSlugEditado(true);
              setSlug(e.target.value);
            }}
            className={campo}
          />
          <p className={ayuda}>
            yaku3d.com/producto/<strong>{slugMostrado || "…"}</strong>
            {producto && " · cambiarla rompe el enlace anterior"}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="categoria_id" className={etiqueta}>
              Categoría
            </label>
            <select
              id="categoria_id"
              name="categoria_id"
              defaultValue={producto?.categoria_id ?? ""}
              required
              className={campo}
            >
              <option value="" disabled>
                Elegir…
              </option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="precio" className={etiqueta}>
              Precio (€)
            </label>
            <input
              id="precio"
              name="precio"
              type="text"
              inputMode="decimal"
              defaultValue={producto?.precio ?? ""}
              placeholder="29,90"
              className={campo}
            />
          </div>
        </div>
      </section>

      {/* Ficha técnica */}
      <section className="rounded-3xl border border-[var(--yaku-line)] bg-[var(--yaku-surface)] p-6 space-y-5">
        <h2 className="font-display text-xl text-[var(--yaku-text)]">
          Ficha técnica
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="material" className={etiqueta}>
              Material
            </label>
            <select
              id="material"
              name="material"
              defaultValue={producto?.material ?? "pla"}
              className={campo}
            >
              {MATERIALES.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="medidas" className={etiqueta}>
              Medidas
            </label>
            <input
              id="medidas"
              name="medidas"
              defaultValue={producto?.medidas ?? ""}
              placeholder="180 × 110 × 110 mm"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="tiempo_impresion" className={etiqueta}>
              Tiempo de impresión
            </label>
            <input
              id="tiempo_impresion"
              name="tiempo_impresion"
              defaultValue={producto?.tiempo_impresion ?? ""}
              placeholder="7 h 30 min"
              className={campo}
            />
          </div>
        </div>

        <fieldset>
          <legend className={etiqueta}>Colores disponibles</legend>
          <div className="flex flex-wrap gap-2">
            {COLORES.map((c) => (
              <label
                key={c.id}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--yaku-line)] px-4 py-2 text-sm text-[var(--yaku-text)] cursor-pointer hover:border-[var(--yaku-violet)] transition-colors has-[:checked]:border-[var(--yaku-violet)] has-[:checked]:bg-[var(--yaku-violet)]/15"
              >
                <input
                  type="checkbox"
                  name="colores"
                  value={c.id}
                  defaultChecked={producto?.colores?.includes(c.id)}
                  className="accent-[var(--yaku-violet)]"
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="inline-flex items-center gap-3 text-sm text-[var(--yaku-text)] cursor-pointer">
          <input
            type="checkbox"
            name="apto_exterior"
            defaultChecked={producto?.apto_exterior ?? false}
            className="accent-[var(--yaku-violet)] w-4 h-4"
          />
          Resiste la intemperie
        </label>
      </section>

      {/* Descripciones */}
      <section className="rounded-3xl border border-[var(--yaku-line)] bg-[var(--yaku-surface)] p-6 space-y-5">
        <h2 className="font-display text-xl text-[var(--yaku-text)]">
          Descripción
        </h2>

        <div>
          <label htmlFor="descripcion" className={etiqueta}>
            En español
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={4}
            defaultValue={producto?.descripcion ?? ""}
            className={`${campo} resize-y`}
          />
        </div>

        <div>
          <label htmlFor="descripcion_en" className={etiqueta}>
            En inglés
          </label>
          <textarea
            id="descripcion_en"
            name="descripcion_en"
            rows={4}
            defaultValue={producto?.descripcion_en ?? ""}
            className={`${campo} resize-y`}
          />
          <p className={ayuda}>
            Es lo que ve quien pulsa el botón EN. Si se deja vacío, esa ficha
            aparece sin descripción en inglés.
          </p>
        </div>
      </section>

      {/* Publicación */}
      <section className="rounded-3xl border border-[var(--yaku-line)] bg-[var(--yaku-surface)] p-6 space-y-5">
        <h2 className="font-display text-xl text-[var(--yaku-text)]">
          Publicación
        </h2>

        <div className="flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-3 text-sm text-[var(--yaku-text)] cursor-pointer">
            <input
              type="checkbox"
              name="publicado"
              defaultChecked={producto?.publicado ?? true}
              className="accent-[var(--yaku-violet)] w-4 h-4"
            />
            Visible en la web
          </label>

          <label className="inline-flex items-center gap-3 text-sm text-[var(--yaku-text)] cursor-pointer">
            <input
              type="checkbox"
              name="destacado"
              defaultChecked={producto?.destacado ?? false}
              className="accent-[var(--yaku-violet)] w-4 h-4"
            />
            Destacado en la portada
          </label>

          <div className="flex items-center gap-3">
            <label htmlFor="orden" className="text-sm text-[var(--yaku-text)]">
              Orden
            </label>
            <input
              id="orden"
              name="orden"
              type="number"
              defaultValue={producto?.orden ?? 0}
              className="w-24 rounded-2xl bg-[var(--yaku-bg)] border border-[var(--yaku-line)] px-3 py-2 text-[var(--yaku-text)] focus:outline-none focus:border-[var(--yaku-violet)]"
            />
          </div>
        </div>
      </section>

      {estado.error && (
        <p
          role="alert"
          className="rounded-2xl border border-[var(--yaku-magenta)] px-5 py-4 text-sm text-[var(--yaku-magenta)]"
        >
          {estado.error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pendiente}
          className="rounded-full bg-[var(--yaku-violet)] text-white px-8 py-3 text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors disabled:opacity-50"
        >
          {pendiente ? "Guardando…" : "Guardar"}
        </button>
        <Link
          href="/admin/productos"
          className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-text)] transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
