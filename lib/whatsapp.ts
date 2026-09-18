/**
 * Links a WhatsApp con el mensaje ya escrito, para no perder el contexto de
 * la consulta cuando la persona llega al chat.
 *
 * ⚠️ FALTA EL NÚMERO REAL. Poner el de Yaku3D en `.env.local`:
 *
 *     NEXT_PUBLIC_WHATSAPP_NUMBER=549XXXXXXXXXX
 *
 * Formato: código de país + 9 + característica sin 0 + número sin 15.
 * Para Córdoba 351 5054755 sería 5493515054755.
 *
 * Mientras no esté definido, `whatsappConfigurado` da false y los botones
 * quedan deshabilitados en vez de abrir un chat a un número inventado.
 */

const NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const whatsappConfigurado = NUMERO.length > 0;

export type DatosPedido = {
  nombre: string;
  tipo: string;
  descripcion: string;
  cantidad: string;
  medidas: string;
};

/** Link simple, para el botón de "consultar" de un producto. */
export function linkConsulta(producto?: { nombre: string }) {
  const texto = producto
    ? `Hola Yaku3D, me interesa: ${producto.nombre}`
    : "Hola Yaku3D, quiero hacer una consulta.";
  return construir(texto);
}

/** Link del formulario de pedidos a medida, con todo lo que cargó la persona. */
export function linkPedido(datos: DatosPedido) {
  const lineas = [
    `Hola Yaku3D, soy ${datos.nombre || "—"} y quiero pedir algo a medida.`,
    "",
    `Tipo de pieza: ${datos.tipo || "—"}`,
    `Cantidad: ${datos.cantidad || "—"}`,
    `Medidas de referencia: ${datos.medidas || "—"}`,
    "",
    "Lo que necesito:",
    datos.descripcion || "—",
  ];
  return construir(lineas.join("\n"));
}

function construir(texto: string) {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`;
}
