/**
 * Catálogo PROVISORIO.
 *
 * Los nombres, precios y categorías son de relleno hasta que entre el catálogo
 * real desde el panel de administrador (fase 2). Ningún producto tiene foto
 * todavía: `imagen` queda en `null` y las tarjetas caen en
 * <ProductPlaceholder />, así la página no muestra imágenes que no son suyas.
 *
 * Para cargar una foto: dejarla en `public/images/` y poner la ruta en `imagen`.
 */

export type CategoriaId =
  | "organizadores"
  | "deco"
  | "hogar"
  | "juegos"
  | "personalizados";

/** Los filtros del catálogo son las categorías más un "todos" al principio. */
export type FiltroId = "todos" | CategoriaId;

export const filtros: FiltroId[] = [
  "todos",
  "organizadores",
  "deco",
  "hogar",
  "juegos",
  "personalizados",
];

export const categorias: CategoriaId[] = [
  "organizadores",
  "deco",
  "hogar",
  "juegos",
  "personalizados",
];

export type Producto = {
  id: number;
  /** Identifica la ficha en /producto/[slug]. Único. */
  slug: string;
  nombre: string;
  precio: number;
  categoria: CategoriaId;
  imagen: string | null;
};

export const productos: Producto[] = [
  { id: 1, slug: "organizador-escritorio-kuska", nombre: "Organizador de escritorio Kuska", precio: 28000, categoria: "organizadores", imagen: null },
  { id: 2, slug: "portacables-muyu", nombre: "Portacables Muyu", precio: 6500, categoria: "organizadores", imagen: null },
  { id: 3, slug: "bandeja-apilable-pacha", nombre: "Bandeja apilable Pacha", precio: 19000, categoria: "organizadores", imagen: null },
  { id: 4, slug: "soporte-auriculares-antay", nombre: "Soporte para auriculares Antay", precio: 15000, categoria: "organizadores", imagen: null },
  { id: 5, slug: "portalapices-inti", nombre: "Portalápices Inti", precio: 11000, categoria: "organizadores", imagen: null },

  { id: 6, slug: "florero-espiralado-yaku", nombre: "Florero espiralado Yaku", precio: 32000, categoria: "deco", imagen: null },
  { id: 7, slug: "posavasos-wayra", nombre: "Set de posavasos Wayra", precio: 14000, categoria: "deco", imagen: null },
  { id: 8, slug: "portarretrato-killa", nombre: "Portarretrato Killa", precio: 17500, categoria: "deco", imagen: null },
  { id: 9, slug: "movil-geometrico-chaska", nombre: "Móvil geométrico Chaska", precio: 24000, categoria: "deco", imagen: null },

  { id: 10, slug: "gancho-adhesivo-rumi", nombre: "Gancho adhesivo Rumi", precio: 4500, categoria: "hogar", imagen: null },
  { id: 11, slug: "soporte-celular-puma", nombre: "Soporte para celular Puma", precio: 9000, categoria: "hogar", imagen: null },
  { id: 12, slug: "dispenser-mayu", nombre: "Dispenser Mayu", precio: 21000, categoria: "hogar", imagen: null },
  { id: 13, slug: "traba-puerta-sacha", nombre: "Traba puerta Sacha", precio: 5500, categoria: "hogar", imagen: null },

  { id: 14, slug: "set-dados-wasi", nombre: "Set de dados Wasi", precio: 12000, categoria: "juegos", imagen: null },
  { id: 15, slug: "rompecabezas-tinku", nombre: "Rompecabezas Tinku", precio: 16000, categoria: "juegos", imagen: null },
  { id: 16, slug: "fichas-chakana", nombre: "Fichas Chakana", precio: 8500, categoria: "juegos", imagen: null },

  { id: 17, slug: "llavero-a-medida", nombre: "Llavero a medida", precio: 3500, categoria: "personalizados", imagen: null },
  { id: 18, slug: "cartel-personalizado", nombre: "Cartel personalizado", precio: 26000, categoria: "personalizados", imagen: null },
];

export function getProducto(slug: string) {
  return productos.find((p) => p.slug === slug);
}

/** Otras piezas de la misma categoría, para el pie de la ficha. */
export function getRelacionados(producto: Producto, cantidad = 3) {
  const mismaCategoria = productos.filter(
    (p) => p.categoria === producto.categoria && p.id !== producto.id,
  );
  const resto = productos.filter(
    (p) => p.categoria !== producto.categoria && p.id !== producto.id,
  );
  return [...mismaCategoria, ...resto].slice(0, cantidad);
}

/** Las tres piezas que encabezan la home. */
export const novedades: Producto[] = [
  productos[5],
  productos[0],
  productos[13],
];
