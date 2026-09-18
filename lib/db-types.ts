/**
 * Tipos de las filas de Supabase, escritos a mano.
 *
 * Se pueden regenerar con `supabase gen types typescript`, pero eso pide el
 * CLI y un access token. Como el esquema es chico y estable, mantenerlos aquí
 * es más simple — eso sí, si cambia 0001_init.sql hay que tocarlos también.
 */

export type MaterialDb = "pla" | "petg" | "tpu";

export type CategoriaRow = {
  id: string;
  slug: string;
  nombre: string;
  nombre_en: string;
  imagen_url: string | null;
  /** El check de "mostrar en la home". */
  visible: boolean;
  orden: number;
  created_at: string;
};

export type ProductoRow = {
  id: string;
  slug: string;
  categoria_id: string;
  nombre: string;
  /** En euros. */
  precio: number;
  descripcion: string;
  descripcion_en: string;
  material: MaterialDb;
  medidas: string;
  tiempo_impresion: string;
  colores: string[];
  apto_exterior: boolean;
  destacado: boolean;
  publicado: boolean;
  orden: number;
  created_at: string;
  updated_at: string;
};

export type MedioRow = {
  id: string;
  producto_id: string;
  url: string;
  alt: string;
  orden: number;
};
