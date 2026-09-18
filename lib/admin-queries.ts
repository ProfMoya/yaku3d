import { createClient } from "@/lib/supabase/server";
import type { CategoriaRow, ProductoRow } from "@/lib/db-types";

/**
 * Consultas del panel. Corren con la sesión del admin, así que ven también lo
 * despublicado — RLS abre el acceso total solo a `authenticated`.
 */

export type ProductoAdmin = ProductoRow & {
  categorias: Pick<CategoriaRow, "slug" | "nombre"> | null;
  medios: { id: string }[];
};

export async function getProductosAdmin(): Promise<ProductoAdmin[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*, categorias(slug, nombre), medios(id)")
    .order("orden", { ascending: true });

  if (error) throw new Error(`No se pudieron leer los productos: ${error.message}`);
  return (data ?? []) as ProductoAdmin[];
}

export async function getProductoAdmin(id: string): Promise<ProductoRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`No se pudo leer la pieza: ${error.message}`);
  return (data as ProductoRow) ?? null;
}

export async function getCategoriasAdmin(): Promise<CategoriaRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("orden", { ascending: true });

  if (error) throw new Error(`No se pudieron leer las categorías: ${error.message}`);
  return (data ?? []) as CategoriaRow[];
}
