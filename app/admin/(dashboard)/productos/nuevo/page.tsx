import Link from "next/link";
import { getCategoriasAdmin } from "@/lib/admin-queries";
import { ProductoForm } from "@/components/admin/producto-form";

export default async function NuevoProductoPage() {
  const categorias = await getCategoriasAdmin();

  return (
    <div>
      <Link
        href="/admin/productos"
        className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-text)] transition-colors"
      >
        ← Productos
      </Link>
      <h1 className="mt-4 mb-8 font-display text-3xl text-[var(--yaku-text)]">
        Nueva pieza
      </h1>

      <ProductoForm categorias={categorias} />
    </div>
  );
}
