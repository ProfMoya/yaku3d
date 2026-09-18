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
  nombre: string;
  precio: number;
  categoria: CategoriaId;
  imagen: string | null;
};

export const productos: Producto[] = [
  { id: 1, nombre: "Organizador de escritorio Kuska", precio: 28000, categoria: "organizadores", imagen: null },
  { id: 2, nombre: "Portacables Muyu", precio: 6500, categoria: "organizadores", imagen: null },
  { id: 3, nombre: "Bandeja apilable Pacha", precio: 19000, categoria: "organizadores", imagen: null },
  { id: 4, nombre: "Soporte para auriculares Antay", precio: 15000, categoria: "organizadores", imagen: null },
  { id: 5, nombre: "Portalápices Inti", precio: 11000, categoria: "organizadores", imagen: null },

  { id: 6, nombre: "Florero espiralado Yaku", precio: 32000, categoria: "deco", imagen: null },
  { id: 7, nombre: "Set de posavasos Wayra", precio: 14000, categoria: "deco", imagen: null },
  { id: 8, nombre: "Portarretrato Killa", precio: 17500, categoria: "deco", imagen: null },
  { id: 9, nombre: "Móvil geométrico Chaska", precio: 24000, categoria: "deco", imagen: null },

  { id: 10, nombre: "Gancho adhesivo Rumi", precio: 4500, categoria: "hogar", imagen: null },
  { id: 11, nombre: "Soporte para celular Puma", precio: 9000, categoria: "hogar", imagen: null },
  { id: 12, nombre: "Dispenser Mayu", precio: 21000, categoria: "hogar", imagen: null },
  { id: 13, nombre: "Traba puerta Sacha", precio: 5500, categoria: "hogar", imagen: null },

  { id: 14, nombre: "Set de dados Wasi", precio: 12000, categoria: "juegos", imagen: null },
  { id: 15, nombre: "Rompecabezas Tinku", precio: 16000, categoria: "juegos", imagen: null },
  { id: 16, nombre: "Fichas Chakana", precio: 8500, categoria: "juegos", imagen: null },

  { id: 17, nombre: "Llavero a medida", precio: 3500, categoria: "personalizados", imagen: null },
  { id: 18, nombre: "Cartel personalizado", precio: 26000, categoria: "personalizados", imagen: null },
];

/** Las tres piezas que encabezan la home. */
export const novedades: Producto[] = [
  productos[5],
  productos[0],
  productos[13],
];

/** Sugeridos debajo de la ficha de producto destacada. */
export const relacionados: Producto[] = [
  productos[6],
  productos[8],
  productos[4],
];
