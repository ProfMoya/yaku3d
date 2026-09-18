import Link from "next/link";
import { getCategoriasAdmin, getProductosAdmin } from "@/lib/admin-queries";

export default async function ResumenPage() {
  const [productos, categorias] = await Promise.all([
    getProductosAdmin(),
    getCategoriasAdmin(),
  ]);

  const publicados = productos.filter((p) => p.publicado).length;
  const sinFoto = productos.filter((p) => p.medios.length === 0).length;
  const ocultas = categorias.filter((c) => !c.visible).length;

  const tarjetas = [
    {
      label: "Productos publicados",
      valor: `${publicados} de ${productos.length}`,
      href: "/admin/productos",
    },
    {
      label: "Sin foto todavía",
      valor: sinFoto,
      href: "/admin/productos",
      alerta: sinFoto > 0,
    },
    {
      label: "Categorías en la home",
      valor: `${categorias.length - ocultas} de ${categorias.length}`,
      href: "/admin/categorias",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-[var(--yaku-text)]">Resumen</h1>
      <p className="mt-2 text-[var(--yaku-muted)]">
        Estado del catálogo de Yaku3D.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tarjetas.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="rounded-3xl border border-[var(--yaku-line)] bg-[var(--yaku-surface)] p-6 transition-colors hover:border-[var(--yaku-violet)]"
          >
            <p
              className={`font-display text-4xl ${
                t.alerta
                  ? "text-[var(--yaku-magenta)]"
                  : "text-[var(--yaku-text)]"
              }`}
            >
              {t.valor}
            </p>
            <p className="mt-2 text-sm text-[var(--yaku-muted)]">{t.label}</p>
          </Link>
        ))}
      </div>

      {sinFoto > 0 && (
        <p className="mt-8 rounded-2xl border border-[var(--yaku-line)] bg-[var(--yaku-surface-2)] px-5 py-4 text-sm text-[var(--yaku-muted)]">
          Hay {sinFoto} {sinFoto === 1 ? "pieza" : "piezas"} sin foto. Mientras
          tanto, en la web se muestra una silueta según la categoría.
        </p>
      )}
    </div>
  );
}
