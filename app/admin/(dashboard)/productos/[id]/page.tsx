import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoriasAdmin, getProductoAdmin } from "@/lib/admin-queries";
import { ProductoForm } from "@/components/admin/producto-form";
import { EliminarProductoButton } from "@/components/admin/eliminar-producto-button";

type Props = { params: Promise<{ id: string }> };

export default async function EditarProductoPage({ params }: Props) {
  const { id } = await params;
  const [producto, categorias] = await Promise.all([
    getProductoAdmin(id),
    getCategoriasAdmin(),
  ]);

  if (!producto) notFound();

  return (
    <div>
      <Link
        href="/admin/productos"
        className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-text)] transition-colors"
      >
        ← Productos
      </Link>

      <div className="mt-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-[var(--yaku-text)]">
          {producto.nombre}
        </h1>
        <Link
          href={`/producto/${producto.slug}`}
          target="_blank"
          className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-violet-soft)] transition-colors"
        >
          Ver en la web ↗
        </Link>
      </div>

      <ProductoForm producto={producto} categorias={categorias} />

      <div className="mt-12 max-w-3xl border-t border-[var(--yaku-line)] pt-6">
        <EliminarProductoButton id={producto.id} nombre={producto.nombre} />
      </div>
    </div>
  );
}
