"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, requireUser } from "@/lib/supabase/server";
import { generarSlug } from "@/lib/slug";
import type { ColorId } from "@/lib/products";

export type EstadoProducto = { error?: string };

const MATERIALES = ["pla", "petg", "tpu"];
const COLORES: ColorId[] = [
  "negro",
  "blanco",
  "gris",
  "violeta",
  "magenta",
  "natural",
];

/** Refresca las pantallas del panel y las públicas que muestran el catálogo. */
function revalidarTodo(slug?: string) {
  revalidatePath("/admin/productos");
  revalidatePath("/admin");
  revalidatePath("/catalogo");
  revalidatePath("/");
  if (slug) revalidatePath(`/producto/${slug}`);
}

export async function guardarProducto(
  _estadoPrevio: EstadoProducto,
  formData: FormData,
): Promise<EstadoProducto> {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = String(formData.get("id") ?? "").trim();
  const nombre = String(formData.get("nombre") ?? "").trim();
  const categoria_id = String(formData.get("categoria_id") ?? "").trim();

  if (!nombre) return { error: "El nombre no puede quedar vacío." };
  if (!categoria_id) return { error: "Elegí una categoría." };

  // Si no se escribió slug, se deriva del nombre.
  const slugCrudo = String(formData.get("slug") ?? "").trim();
  const slug = generarSlug(slugCrudo || nombre);
  if (!slug) return { error: "El nombre no sirve para generar una URL." };

  const precioCrudo = String(formData.get("precio") ?? "0").replace(",", ".");
  const precio = Number(precioCrudo);
  if (!Number.isFinite(precio) || precio < 0) {
    return { error: "El precio tiene que ser un número igual o mayor que cero." };
  }

  const material = String(formData.get("material") ?? "pla");
  if (!MATERIALES.includes(material)) {
    return { error: "Material no válido." };
  }

  // getAll porque son checkboxes: vienen tantos valores como marcados haya.
  const colores = formData
    .getAll("colores")
    .map(String)
    .filter((c): c is ColorId => (COLORES as string[]).includes(c));

  const fila = {
    slug,
    nombre,
    categoria_id,
    precio,
    material,
    medidas: String(formData.get("medidas") ?? "").trim(),
    tiempo_impresion: String(formData.get("tiempo_impresion") ?? "").trim(),
    colores,
    apto_exterior: formData.get("apto_exterior") === "on",
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    descripcion_en: String(formData.get("descripcion_en") ?? "").trim(),
    destacado: formData.get("destacado") === "on",
    publicado: formData.get("publicado") === "on",
    orden: Number(formData.get("orden") ?? 0) || 0,
  };

  const { error } = id
    ? await supabase.from("productos").update(fila).eq("id", id)
    : await supabase.from("productos").insert(fila);

  if (error) {
    // 23505 es violación de unicidad: el único índice único es el del slug.
    if (error.code === "23505") {
      return { error: `Ya hay otra pieza con la URL "${slug}". Cambiá el nombre o el slug.` };
    }
    return { error: `No se pudo guardar: ${error.message}` };
  }

  revalidarTodo(slug);
  redirect("/admin/productos");
}

export async function eliminarProducto(formData: FormData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { error } = await supabase.from("productos").delete().eq("id", id);
  if (error) throw new Error(`No se pudo borrar: ${error.message}`);

  revalidarTodo();
  redirect("/admin/productos");
}

/** Publicar o despublicar desde el listado, sin entrar a la ficha. */
export async function alternarPublicado(formData: FormData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = String(formData.get("id") ?? "");
  const publicado = formData.get("publicado") === "true";
  if (!id) return;

  const { error } = await supabase
    .from("productos")
    .update({ publicado: !publicado })
    .eq("id", id);

  if (error) throw new Error(`No se pudo cambiar el estado: ${error.message}`);
  revalidarTodo();
}
