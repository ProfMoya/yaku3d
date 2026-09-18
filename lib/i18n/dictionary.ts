/**
 * Todo el texto de la página vive acá. Los componentes no llevan strings
 * sueltos: piden `useT()` y leen de este diccionario.
 *
 * El botón ES/EN de la navegación cambia el locale y con eso cambia la página
 * entera. Cuando en la fase 2 los productos salgan de Supabase, las columnas
 * traducidas (`nombre_en`, `descripcion_en`) se consumen con esta misma forma.
 */

export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];

const es = {
  nav: {
    catalogo: "Catálogo",
    porQue: "Por qué Yaku3D",
    taller: "El taller",
    testimonios: "Testimonios",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    cambiarIdioma: "Ver la web en inglés",
  },
  hero: {
    tituloMobile: "Impresión 3D",
    tituloDesktop: "Capa por capa.",
    bajada:
      "Objetos funcionales y piezas a medida, diseñados y fabricados en nuestro taller.",
    cta: "Ver catálogo",
  },
  novedades: {
    volanta: "Recién salidas de la impresora",
    titulo: "Novedades",
    verTodo: "Ver todo el catálogo",
  },
  catalogo: {
    titulo: "Explorá el catálogo",
    bajada: "Piezas listas para entregar, o adaptadas a la medida que necesites.",
    categorias: {
      todos: "Todo",
      organizadores: "Organizadores",
      deco: "Deco",
      hogar: "Hogar",
      juegos: "Juegos",
      personalizados: "Personalizados",
    },
  },
  detalle: {
    nombre: "Florero espiralado Yaku",
    precio: 32000,
    descripcion:
      "Impreso en una sola pieza con pared espiralada, sin costuras visibles. Lleva un vaso interno de vidrio, así que se puede usar con agua.",
    bloques: {
      ficha: {
        titulo: "Ficha técnica",
        texto: "PETG, altura de capa 0.2mm, relleno reforzado en la base.",
      },
      medidas: {
        titulo: "Medidas",
        texto: "Tres tamaños: 12, 18 y 24cm de alto. También a medida.",
      },
      envio: {
        titulo: "Envíos",
        texto: "A todo el país. Retiro sin cargo por el taller.",
      },
    },
    cta: "Consultar por WhatsApp",
  },
  editorial: {
    titulo: "Del archivo al objeto: cómo nace una pieza",
    autor: "Equipo Yaku3D",
    rol: "Taller",
    fecha: "15 de enero de 2026 · 5 min de lectura",
    subtitulo: "Diseñar, imprimir, corregir, repetir",
    parrafo1:
      "Una pieza no sale bien en el primer intento. La modelamos, la imprimimos, la probamos en la mano y volvemos a ajustar: el espesor de una pared, el ángulo de un apoyo, la tolerancia de un encastre que entra pero no queda flojo.",
    parrafo2:
      "Esa vuelta es la que separa un objeto impreso de un objeto que sirve. Por eso cada modelo del catálogo pasó por varias versiones antes de llegar acá, y por eso podemos adaptarlo a lo que necesites sin empezar de cero.",
  },
  porQue: {
    titulo: "Por qué Yaku3D",
    bajada: "Del diseño a la pieza terminada, sin intermediarios",
    items: [
      {
        titulo: "El material que la pieza necesita",
        texto:
          "PLA para lo decorativo, PETG para lo que va afuera o toca agua, TPU para lo que tiene que flexionar. Elegimos según lo que la pieza va a aguantar, no según lo que tengamos a mano.",
      },
      {
        titulo: "Diseño propio",
        texto:
          "Modelamos cada pieza desde cero. No bajamos archivos de internet: si algo lleva nuestro nombre, lo dibujamos, lo probamos y lo corregimos nosotros.",
      },
      {
        titulo: "Hecho a tu medida",
        texto:
          "Traenos una foto, un plano o la pieza rota que querés reemplazar. Si no existe, lo diseñamos; si existe pero no te sirve, lo adaptamos.",
      },
    ],
  },
  colecciones: {
    volanta: "Colecciones",
    titulo: "Buscá por categoría",
    bajada: "Cinco familias de piezas, todas impresas en el mismo taller.",
    unaPieza: "1 pieza",
    piezas: "piezas",
  },
  taller: {
    volanta: "El taller",
    titulo: "Piezas en uso",
    bajada:
      "Así se ven nuestras impresiones fuera de la foto de catálogo, en las casas y escritorios de quienes las compraron.",
    bloqueTitulo: "Tu idea, impresa",
    bloqueTexto:
      "Si tenés algo en la cabeza que no encontrás en ningún lado, probablemente se pueda imprimir. Escribinos y lo charlamos.",
    bloqueCta: "Pedir presupuesto",
    cierre: "Mostranos lo que imprimiste con nosotros",
    hashtag: "#Yaku3D",
    capturas: ["En el escritorio", "En casa", "Para regalar", "Hecho a medida"],
  },
  sobre: {
    volanta: "Sobre Yaku3D",
    titulo: "Fabricación digital, escala humana",
    parrafo1:
      "Yaku3D empezó con una impresora en un escritorio y la idea de que fabricar algo no tendría que depender de un molde, una fábrica ni un pedido mínimo de mil unidades.",
    parrafo2:
      "Hoy seguimos imprimiendo de a una. Cada pedido pasa por nuestras manos: se imprime, se lija, se revisa y recién ahí sale.",
  },
  testimonios: {
    volanta: "Testimonios",
    titulo: "Lo que dicen nuestros clientes",
    items: [
      {
        cita: "Les mandé una foto de la pieza que se me había roto y me la devolvieron impresa, mejor que la original. Ya van tres veces que les pido algo.",
        autor: "Marina Duarte",
        rol: "Arquitecta",
        lugar: "Rosario",
      },
      {
        cita: "Pedí organizadores para todo el escritorio y encajan perfecto. Se nota que alguien se sentó a pensar las medidas.",
        autor: "Julián Ferreyra",
        rol: "Diseñador industrial",
        lugar: "Córdoba",
      },
      {
        cita: "Compré un florero de regalo y terminé encargando cuatro más. La terminación no parece impresa en 3D.",
        autor: "Paula Giménez",
        rol: "Ceramista",
        lugar: "La Plata",
      },
    ],
  },
  newsletter: {
    volanta: "Mantenete al tanto",
    titulo: "Sumate al newsletter",
    texto:
      "Enterate primero de los modelos nuevos, los descuentos y lo que vamos probando en el taller.",
    placeholder: "Tu correo electrónico",
    boton: "Suscribirme",
    exito: "Listo, ya estás en la lista.",
    privacidad:
      "Al suscribirte aceptás nuestra política de privacidad. Podés darte de baja cuando quieras.",
  },
  footer: {
    descripcion:
      "Impresión 3D de diseño propio. Piezas funcionales, deco y trabajos a medida, fabricados en Argentina.",
    navegacion: "Navegación",
    derechos: "2026 Yaku3D. Todos los derechos reservados.",
    legales: ["Política de privacidad", "Términos del servicio", "Cookies"],
  },
  comun: {
    sinFoto: "Foto en camino",
    consultar: "Consultar",
  },
};

const en: typeof es = {
  nav: {
    catalogo: "Catalogue",
    porQue: "Why Yaku3D",
    taller: "The workshop",
    testimonios: "Testimonials",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    cambiarIdioma: "Ver la web en español",
  },
  hero: {
    tituloMobile: "3D printing",
    tituloDesktop: "Layer by layer.",
    bajada: "Functional objects and custom parts, designed and made in our workshop.",
    cta: "See the catalogue",
  },
  novedades: {
    volanta: "Fresh off the printer",
    titulo: "New arrivals",
    verTodo: "See the full catalogue",
  },
  catalogo: {
    titulo: "Browse the catalogue",
    bajada: "Pieces ready to ship, or adapted to the size you need.",
    categorias: {
      todos: "All",
      organizadores: "Organisers",
      deco: "Decor",
      hogar: "Home",
      juegos: "Games",
      personalizados: "Custom",
    },
  },
  detalle: {
    nombre: "Yaku spiral vase",
    precio: 32000,
    descripcion:
      "Printed as a single spiralised piece, with no visible seams. It comes with an inner glass liner, so it holds water.",
    bloques: {
      ficha: {
        titulo: "Specs",
        texto: "PETG, 0.2mm layer height, reinforced infill at the base.",
      },
      medidas: {
        titulo: "Sizes",
        texto: "Three heights: 12, 18 and 24cm. Custom sizes on request.",
      },
      envio: {
        titulo: "Shipping",
        texto: "Anywhere in Argentina. Free pickup at the workshop.",
      },
    },
    cta: "Ask on WhatsApp",
  },
  editorial: {
    titulo: "From file to object: how a piece is born",
    autor: "The Yaku3D team",
    rol: "Workshop",
    fecha: "15 January 2026 · 5 min read",
    subtitulo: "Design, print, fix, repeat",
    parrafo1:
      "No piece comes out right on the first try. We model it, print it, hold it in our hands and adjust again: the thickness of a wall, the angle of a support, the tolerance of a joint that fits without going loose.",
    parrafo2:
      "That loop is what separates a printed object from an object that works. Every model in the catalogue went through several versions before landing here, which is also why we can adapt it to what you need without starting over.",
  },
  porQue: {
    titulo: "Why Yaku3D",
    bajada: "From design to finished piece, with nobody in between",
    items: [
      {
        titulo: "The right material for the job",
        texto:
          "PLA for decorative work, PETG for anything that lives outdoors or touches water, TPU for parts that need to flex. We choose by what the piece has to withstand, not by what happens to be loaded.",
      },
      {
        titulo: "Designed in house",
        texto:
          "We model every piece from scratch. We do not download files off the internet: if it carries our name, we drew it, tested it and fixed it ourselves.",
      },
      {
        titulo: "Made to your measurements",
        texto:
          "Bring us a photo, a drawing, or the broken part you want replaced. If it does not exist, we design it; if it exists but does not fit, we adapt it.",
      },
    ],
  },
  colecciones: {
    volanta: "Collections",
    titulo: "Browse by category",
    bajada: "Five families of pieces, all printed in the same workshop.",
    unaPieza: "1 piece",
    piezas: "pieces",
  },
  taller: {
    volanta: "The workshop",
    titulo: "Pieces in use",
    bajada:
      "What our prints look like outside the catalogue photo, in the homes and on the desks of the people who bought them.",
    bloqueTitulo: "Your idea, printed",
    bloqueTexto:
      "If you have something in mind that you cannot find anywhere, chances are it can be printed. Write to us and let us talk it through.",
    bloqueCta: "Request a quote",
    cierre: "Show us what you printed with us",
    hashtag: "#Yaku3D",
    capturas: ["On the desk", "At home", "As a gift", "Made to order"],
  },
  sobre: {
    volanta: "About Yaku3D",
    titulo: "Digital manufacturing, human scale",
    parrafo1:
      "Yaku3D started with one printer on a desk and the idea that making something should not depend on a mould, a factory, or a minimum order of a thousand units.",
    parrafo2:
      "We still print one at a time. Every order passes through our hands: printed, sanded, checked, and only then shipped.",
  },
  testimonios: {
    volanta: "Testimonials",
    titulo: "What our customers say",
    items: [
      {
        cita: "I sent them a photo of the part that had broken and got it back printed, better than the original. That is three things I have ordered now.",
        autor: "Marina Duarte",
        rol: "Architect",
        lugar: "Rosario",
      },
      {
        cita: "I ordered organisers for my whole desk and they fit perfectly. You can tell someone actually sat down and worked out the measurements.",
        autor: "Julián Ferreyra",
        rol: "Industrial designer",
        lugar: "Córdoba",
      },
      {
        cita: "I bought a vase as a gift and ended up ordering four more. The finish does not look 3D printed at all.",
        autor: "Paula Giménez",
        rol: "Ceramicist",
        lugar: "La Plata",
      },
    ],
  },
  newsletter: {
    volanta: "Stay in the loop",
    titulo: "Join our newsletter",
    texto:
      "Be the first to hear about new models, discounts, and whatever we are testing in the workshop.",
    placeholder: "Your email address",
    boton: "Subscribe",
    exito: "You are on the list.",
    privacidad:
      "By subscribing you accept our privacy policy. You can unsubscribe at any time.",
  },
  footer: {
    descripcion:
      "3D printing, designed in house. Functional pieces, decor and custom work, made in Argentina.",
    navegacion: "Navigation",
    derechos: "2026 Yaku3D. All rights reserved.",
    legales: ["Privacy policy", "Terms of service", "Cookies"],
  },
  comun: {
    sinFoto: "Photo coming soon",
    consultar: "Ask about it",
  },
};

export const dictionary = { es, en };

export type Dictionary = typeof es;
