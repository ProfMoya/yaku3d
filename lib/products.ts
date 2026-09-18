/**
 * Catálogo de DEMO.
 *
 * Los datos son verosímiles pero inventados: sirven para entregar la web con
 * el catálogo lleno y después se borran o editan desde el panel (fase 2).
 * Los precios están en euros.
 *
 * Ninguna pieza tiene foto propia todavía, así que `imagen` queda en `null` y
 * la tarjeta cae en <ProductPlaceholder />, que dibuja una silueta de capas
 * según la categoría. Los bancos de imágenes no tienen fotos de piezas
 * impresas que coincidan con estos productos, y una foto de un objeto común
 * mentiría sobre qué es la pieza.
 *
 * Para cambiar una foto: dejarla en `public/images/` y poner la ruta aquí.
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

/**
 * Metadatos de cada categoría para la grilla de colecciones de la home.
 *
 * `visible` y `orden` son justamente los dos campos que el panel va a manejar
 * en la fase 2: el check de "mostrar en la home" y el reordenar. Dejarlos ya
 * en los datos evita tener que tocar el componente después.
 *
 * `imagen` es hoy una foto fija por categoría. Cuando el catálogo viva en
 * Supabase saldrá de la pieza que se marque como portada de su categoría.
 */
export type CategoriaMeta = {
  imagen: string | null;
  visible: boolean;
  orden: number;
};

export const categoriasMeta: Record<CategoriaId, CategoriaMeta> = {
  organizadores: {
    imagen: "/images/categoria-organizadores.jpg",
    visible: true,
    orden: 1,
  },
  deco: { imagen: "/images/categoria-deco.jpg", visible: true, orden: 2 },
  hogar: { imagen: "/images/categoria-hogar.jpg", visible: true, orden: 3 },
  juegos: { imagen: "/images/categoria-juegos.jpg", visible: true, orden: 4 },
  personalizados: {
    imagen: "/images/categoria-personalizados.jpg",
    visible: true,
    orden: 5,
  },
};

/** Las categorías que van en la home, filtradas y ya ordenadas. */
export function getCategoriasVisibles(): CategoriaId[] {
  return categorias
    .filter((c) => categoriasMeta[c].visible)
    .sort((a, b) => categoriasMeta[a].orden - categoriasMeta[b].orden);
}

/** Los nombres de material no se traducen; los de color sí (ver diccionario). */
export type MaterialId = "pla" | "petg" | "tpu";

export type ColorId =
  | "negro"
  | "blanco"
  | "gris"
  | "violeta"
  | "magenta"
  | "natural";

export type Producto = {
  id: number;
  /** Identifica la ficha en /producto/[slug]. Único. */
  slug: string;
  /** Los nombres propios no se traducen. */
  nombre: string;
  /** En euros. */
  precio: number;
  categoria: CategoriaId;
  imagen: string | null;
  material: MaterialId;
  /** Formato neutro "alto × ancho × profundidad mm". */
  medidas: string;
  tiempoImpresion: string;
  colores: ColorId[];
  aptoExterior: boolean;
  descripcion: { es: string; en: string };
};

export const productos: Producto[] = [
  // — Organizadores ————————————————————————————————————————————————
  {
    id: 1,
    slug: "organizador-escritorio-kuska",
    nombre: "Organizador de escritorio Kuska",
    precio: 24.9,
    categoria: "organizadores",
    imagen: null,
    material: "pla",
    medidas: "240 × 120 × 90 mm",
    tiempoImpresion: "9 h 40 min",
    colores: ["negro", "blanco", "violeta"],
    aptoExterior: false,
    descripcion: {
      es: "Cinco compartimentos de distinta profundidad: en los dos del fondo caben bolígrafos de pie, y el de delante es plano, para clips y llaves. La base va lijada y lleva pies de goma para que no raye la mesa.",
      en: "Five compartments at different depths: the two at the back take pens upright, the shallow front one is for clips and keys. The base is sanded and comes with rubber feet so it won't scratch your desk.",
    },
  },
  {
    id: 2,
    slug: "portacables-muyu",
    nombre: "Portacables Muyu",
    precio: 5.9,
    categoria: "organizadores",
    imagen: null,
    material: "tpu",
    medidas: "45 × 30 × 18 mm",
    tiempoImpresion: "35 min",
    colores: ["negro", "gris", "magenta"],
    aptoExterior: false,
    descripcion: {
      es: "Impreso en TPU, así que flexiona para entrar y luego agarra. Admite cables de hasta 6 mm. Se pega al canto de la mesa con cinta de doble cara y no se suelta al tirar del cable.",
      en: "Printed in TPU, so it flexes to go on and then grips. Fits cables up to 6mm. Sticks to the edge of a desk with double-sided tape and won't come off when you tug the cable.",
    },
  },
  {
    id: 3,
    slug: "bandeja-apilable-pacha",
    nombre: "Bandeja apilable Pacha",
    precio: 16.9,
    categoria: "organizadores",
    imagen: null,
    material: "pla",
    medidas: "200 × 150 × 55 mm",
    tiempoImpresion: "6 h 15 min",
    colores: ["blanco", "gris", "negro"],
    aptoExterior: false,
    descripcion: {
      es: "Se apilan con un encaje en las cuatro esquinas y quedan firmes, sin bailar. Aguantan bien el peso de papeles y herramientas pequeñas. Se pueden pedir sueltas o en torres de tres.",
      en: "They stack via a joint at all four corners and sit firm, without wobbling. Holds paper and small tools without sagging. Available singly or in stacks of three.",
    },
  },
  {
    id: 4,
    slug: "soporte-auriculares-antay",
    nombre: "Soporte para auriculares Antay",
    precio: 18.9,
    categoria: "organizadores",
    imagen: null,
    material: "petg",
    medidas: "270 × 110 × 100 mm",
    tiempoImpresion: "5 h 50 min",
    colores: ["negro", "violeta"],
    aptoExterior: false,
    descripcion: {
      es: "El brazo es ancho y redondeado para no marcar la diadema. La base tiene un hueco que puedes lastrar con monedas o arena si usas auriculares pesados.",
      en: "The arm is wide and rounded so it won't crease the headband. The base has a cavity you can weigh down with coins or sand if your headphones are heavy.",
    },
  },
  {
    id: 5,
    slug: "portalapices-inti",
    nombre: "Portalápices Inti",
    precio: 11.9,
    categoria: "organizadores",
    imagen: null,
    material: "pla",
    medidas: "100 × 85 × 85 mm",
    tiempoImpresion: "3 h 05 min",
    colores: ["blanco", "violeta", "magenta", "natural"],
    aptoExterior: false,
    descripcion: {
      es: "Pared espiralada impresa de una sola pasada, sin costura vertical. El interior va dividido en dos para separar lo que escribe de lo que corta.",
      en: "Spiralised wall printed in a single pass, with no vertical seam. The inside is split in two to keep what writes apart from what cuts.",
    },
  },

  // — Deco ——————————————————————————————————————————————————————
  {
    id: 6,
    slug: "florero-espiralado-yaku",
    nombre: "Florero espiralado Yaku",
    precio: 29.9,
    categoria: "deco",
    imagen: null,
    material: "petg",
    medidas: "180 × 110 × 110 mm",
    tiempoImpresion: "7 h 30 min",
    colores: ["blanco", "violeta", "natural"],
    aptoExterior: true,
    descripcion: {
      es: "Impreso en una sola pieza con pared espiralada, sin costuras visibles. Lleva un vaso interior de cristal, así que aguanta agua sin que la pieza filtre. Disponible en 12, 18 y 24 cm de alto.",
      en: "Printed as a single spiralised piece, with no visible seams. It comes with an inner glass liner, so it holds water without the print leaking. Available at 12, 18 and 24cm tall.",
    },
  },
  {
    id: 7,
    slug: "posavasos-wayra",
    nombre: "Set de posavasos Wayra",
    precio: 14.9,
    categoria: "deco",
    imagen: null,
    material: "petg",
    medidas: "95 × 95 × 8 mm",
    tiempoImpresion: "2 h 40 min",
    colores: ["negro", "blanco", "magenta", "violeta"],
    aptoExterior: true,
    descripcion: {
      es: "Juego de cuatro, con una textura de ondas concéntricas que retiene la condensación en vez de dejarla correr. PETG, así que no se deforman con un café recién hecho encima.",
      en: "Set of four, with a concentric wave texture that traps condensation instead of letting it run. PETG, so a fresh coffee sitting on top won't warp them.",
    },
  },
  {
    id: 8,
    slug: "portarretrato-killa",
    nombre: "Portarretratos Killa",
    precio: 16.9,
    categoria: "deco",
    imagen: null,
    material: "pla",
    medidas: "180 × 130 × 25 mm",
    tiempoImpresion: "4 h 10 min",
    colores: ["negro", "blanco", "natural"],
    aptoExterior: false,
    descripcion: {
      es: "Para fotos de 13 × 18 cm. El pie va atornillado y gira, así que sirve en horizontal o en vertical sin comprar dos. Sin cristal: la foto entra por una ranura lateral.",
      en: "Takes 13 × 18cm photos. The stand is screwed on and rotates, so one frame works landscape or portrait. No glass: the photo slides in through a side slot.",
    },
  },
  {
    id: 9,
    slug: "movil-geometrico-chaska",
    nombre: "Móvil geométrico Chaska",
    precio: 24.9,
    categoria: "deco",
    imagen: null,
    material: "pla",
    medidas: "400 × 300 × 300 mm",
    tiempoImpresion: "8 h 20 min",
    colores: ["blanco", "violeta", "magenta"],
    aptoExterior: false,
    descripcion: {
      es: "Doce piezas huecas colgadas de hilo de nailon, pensadas para que el conjunto pese poco y gire con la corriente de aire. Se envía desmontado, con la medida de cada tramo de hilo marcada.",
      en: "Twelve hollow pieces hung from fishing line, designed to stay light enough to turn with a draught. Ships flat, with the length of each line marked.",
    },
  },

  // — Hogar —————————————————————————————————————————————————————
  {
    id: 10,
    slug: "gancho-adhesivo-rumi",
    nombre: "Gancho adhesivo Rumi",
    precio: 4.9,
    categoria: "hogar",
    imagen: null,
    material: "petg",
    medidas: "60 × 40 × 35 mm",
    tiempoImpresion: "45 min",
    colores: ["blanco", "negro", "gris"],
    aptoExterior: true,
    descripcion: {
      es: "Aguanta 3 kg con la cinta 3M que viene incluida. La punta del gancho sube, para que la correa o la bolsa no se escurra sola.",
      en: "Holds 3kg with the included 3M tape. The hook curves up at the tip so a strap or bag can't slip off on its own.",
    },
  },
  {
    id: 11,
    slug: "soporte-movil-puma",
    nombre: "Soporte para móvil Puma",
    precio: 8.9,
    categoria: "hogar",
    imagen: null,
    material: "pla",
    medidas: "110 × 80 × 75 mm",
    tiempoImpresion: "2 h 15 min",
    colores: ["negro", "violeta", "magenta"],
    aptoExterior: false,
    descripcion: {
      es: "Dos ángulos de apoyo: uno de pie para videollamadas y otro más tumbado para ver vídeo. El paso del cable está abierto, así que carga apoyado sin que el conector haga palanca.",
      en: "Two resting angles: one upright for video calls, one laid back for watching. The cable channel is open, so it charges while docked without the connector levering.",
    },
  },
  {
    id: 12,
    slug: "dispenser-mayu",
    nombre: "Dispensador Mayu",
    precio: 19.9,
    categoria: "hogar",
    imagen: null,
    material: "petg",
    medidas: "220 × 100 × 100 mm",
    tiempoImpresion: "6 h 50 min",
    colores: ["blanco", "negro"],
    aptoExterior: false,
    descripcion: {
      es: "Para lavavajillas o gel hidroalcohólico. La boquilla se imprime aparte, con la pared más gruesa para que no se raje con el uso. Se desmonta sin herramientas para lavarlo.",
      en: "For washing-up liquid or hand sanitiser. The spout is printed separately with thicker walls so it won't crack with use. Comes apart without tools for cleaning.",
    },
  },
  {
    id: 13,
    slug: "tope-puerta-sacha",
    nombre: "Tope de puerta Sacha",
    precio: 6.9,
    categoria: "hogar",
    imagen: null,
    material: "tpu",
    medidas: "120 × 55 × 40 mm",
    tiempoImpresion: "1 h 10 min",
    colores: ["negro", "gris", "magenta"],
    aptoExterior: true,
    descripcion: {
      es: "TPU con relleno alto: cede lo justo para agarrarse al suelo sin marcarlo. La rampa es larga y baja, así que funciona igual en baldosa que en suelo laminado.",
      en: "TPU with high infill: it gives just enough to grip the floor without marking it. The ramp is long and low, so it works on tile as well as laminate.",
    },
  },

  // — Juegos ————————————————————————————————————————————————————
  {
    id: 14,
    slug: "set-dados-wasi",
    nombre: "Set de dados Wasi",
    precio: 12.9,
    categoria: "juegos",
    imagen: null,
    material: "pla",
    medidas: "20 × 20 × 20 mm",
    tiempoImpresion: "3 h 30 min",
    colores: ["negro", "violeta", "magenta", "blanco"],
    aptoExterior: false,
    descripcion: {
      es: "Juego de siete dados de rol (d4 a d20) con los números en relieve y pintados a mano. Impresos con relleno uniforme para que caigan equilibrados.",
      en: "Seven-dice roleplaying set (d4 to d20) with raised, hand-painted numbers. Printed with even infill so they roll fair.",
    },
  },
  {
    id: 15,
    slug: "rompecabezas-tinku",
    nombre: "Rompecabezas Tinku",
    precio: 15.9,
    categoria: "juegos",
    imagen: null,
    material: "pla",
    medidas: "90 × 90 × 90 mm",
    tiempoImpresion: "4 h 45 min",
    colores: ["natural", "violeta", "negro"],
    aptoExterior: false,
    descripcion: {
      es: "Seis piezas que encajan en un cubo y solo salen en un orden. Las tolerancias se ajustan a mano pieza por pieza: entra firme, pero sin forzar.",
      en: "Six pieces that form a cube and only come apart in one order. Tolerances are tuned by hand, piece by piece: snug, but never forced.",
    },
  },
  {
    id: 16,
    slug: "fichas-chakana",
    nombre: "Fichas Chakana",
    precio: 9.9,
    categoria: "juegos",
    imagen: null,
    material: "pla",
    medidas: "40 × 40 × 6 mm",
    tiempoImpresion: "1 h 50 min",
    colores: ["negro", "blanco", "violeta", "magenta"],
    aptoExterior: false,
    descripcion: {
      es: "Cuarenta fichas en dos colores, con el canto biselado para levantarlas de la mesa sin uñas. Vienen en una bolsa de tela.",
      en: "Forty counters in two colours, with a bevelled edge so you can lift them off the table without fingernails. They come in a cloth bag.",
    },
  },

  // — Personalizados ————————————————————————————————————————————
  {
    id: 17,
    slug: "llavero-a-medida",
    nombre: "Llavero a medida",
    precio: 3.9,
    categoria: "personalizados",
    imagen: null,
    material: "petg",
    medidas: "60 × 25 × 4 mm",
    tiempoImpresion: "25 min",
    colores: ["negro", "blanco", "violeta", "magenta", "gris"],
    aptoExterior: true,
    descripcion: {
      es: "Con un nombre, una fecha o un logotipo en relieve. A partir de diez unidades baja el precio por pieza, así que sale a cuenta para detalles de evento.",
      en: "With a name, a date or a logo in relief. The per-unit price drops from ten upwards, which makes it work for event giveaways.",
    },
  },
  {
    id: 18,
    slug: "cartel-personalizado",
    nombre: "Cartel personalizado",
    precio: 22.9,
    categoria: "personalizados",
    imagen: null,
    material: "petg",
    medidas: "300 × 150 × 12 mm",
    tiempoImpresion: "7 h 00 min",
    colores: ["negro", "blanco", "violeta", "magenta"],
    aptoExterior: true,
    descripcion: {
      es: "Letras en relieve a dos colores, para un local o para casa. Se puede imprimir con taladros para atornillar o con la cara lisa para pegar. Mándanos el texto y te enseñamos una previsualización antes de imprimir.",
      en: "Two-colour raised lettering, for a shop or a home. It can be printed with holes for screws or flat-backed for adhesive. Send us the text and we'll show you a preview before printing.",
    },
  },
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
