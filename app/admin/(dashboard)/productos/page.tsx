import Link from "next/link";
import { getProductosAdmin } from "@/lib/admin-queries";
import { alternarPublicado } from "@/app/actions/productos";

function precioEur(valor: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(valor);
}

export default async function ProductosPage() {
  const productos = await getProductosAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-[var(--yaku-text)]">
            Productos
          </h1>
          <p className="mt-2 text-[var(--yaku-muted)]">
            {productos.length} {productos.length === 1 ? "pieza" : "piezas"} en
            el catálogo.
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-[var(--yaku-violet)] text-white px-6 py-3 text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors"
        >
          Nueva pieza
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--yaku-line)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--yaku-surface-2)] text-[var(--yaku-muted)]">
            <tr>
              <th className="px-5 py-4 font-medium">Pieza</th>
              <th className="px-5 py-4 font-medium">Categoría</th>
              <th className="px-5 py-4 font-medium">Precio</th>
              <th className="px-5 py-4 font-medium">Fotos</th>
              <th className="px-5 py-4 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--yaku-surface)]">
            {productos.map((p) => (
              <tr
                key={p.id}
                className="border-t border-[var(--yaku-line)] align-middle"
              >
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/productos/${p.id}`}
                    className="text-[var(--yaku-text)] hover:text-[var(--yaku-violet-soft)] transition-colors"
                  >
                    {p.nombre}
                  </Link>
                </td>
                <td className="px-5 py-4 text-[var(--yaku-muted)]">
                  {p.categorias?.nombre ?? "—"}
                </td>
                <td className="px-5 py-4 text-[var(--yaku-text)]">
                  {precioEur(p.precio)}
                </td>
                <td className="px-5 py-4">
                  {p.medios.length > 0 ? (
                    <span className="text-[var(--yaku-muted)]">
                      {p.medios.length}
                    </span>
                  ) : (
                    <span className="text-[var(--yaku-magenta)]">sin foto</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {/* Publicar y despublicar sin entrar a la ficha */}
                  <form action={alternarPublicado}>
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="hidden"
                      name="publicado"
                      value={String(p.publicado)}
                    />
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1 text-xs transition-colors ${
                        p.publicado
                          ? "bg-[var(--yaku-violet)]/20 text-[var(--yaku-violet-soft)] hover:bg-[var(--yaku-violet)]/30"
                          : "bg-[var(--yaku-surface-2)] text-[var(--yaku-muted)] hover:text-[var(--yaku-text)]"
                      }`}
                      title={
                        p.publicado
                          ? "Se ve en la web. Pulsá para ocultarla."
                          : "Oculta. Pulsá para publicarla."
                      }
                    >
                      {p.publicado ? "Publicada" : "Oculta"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {productos.length === 0 && (
          <p className="bg-[var(--yaku-surface)] px-5 py-10 text-center text-[var(--yaku-muted)]">
            Todavía no hay piezas.
          </p>
        )}
      </div>
    </div>
  );
}
