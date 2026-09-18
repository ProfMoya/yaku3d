/**
 * Convierte un nombre en slug para la URL: "Portalápices Inti" -> "portalapices-inti".
 * Se usa al crear un producto, y el panel deja editarlo a mano después.
 */
export function generarSlug(texto: string) {
  return texto
    .normalize("NFD")
    // Quita los diacríticos ya separados por la normalización
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
