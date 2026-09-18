import type { Locale } from "@/lib/i18n/dictionary";

/**
 * Precios en pesos argentinos, sin decimales: "$32.000" en español,
 * "ARS 32,000" en inglés.
 */
export function formatearPrecio(valor: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}
