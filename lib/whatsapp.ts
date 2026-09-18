/**
 * Links a WhatsApp con el mensaje ya escrito, para no perder el contexto de
 * la consulta cuando la persona llega al chat.
 *
 * El número sale de `.env.local`:
 *
 *     NEXT_PUBLIC_WHATSAPP_NUMBER=34673310344
 *
 * Formato internacional sin + ni espacios (España: 34 + móvil de 9 dígitos).
 *
 * Ojo al desplegar: `.env.local` está en .gitignore, así que la variable hay
 * que volver a cargarla en el panel del hosting (Vercel, Netlify, etc.). Si
 * falta, `whatsappConfigurado` da false y los botones quedan deshabilitados en
 * vez de abrir un chat a un número que no existe.
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
