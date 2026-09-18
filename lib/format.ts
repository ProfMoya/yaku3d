import type { Locale } from "@/lib/i18n/dictionary";

/**
 * Precios en euros: "29,90 €" en español, "€29.90" en inglés.
 * Se usa en-GB y no en-US para que el símbolo y el separador sean los
 * europeos.
 */
export function formatearPrecio(valor: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}
