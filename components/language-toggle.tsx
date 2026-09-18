"use client";

import { useI18n } from "@/lib/i18n/context";

/**
 * Cambia el idioma de toda la página. Muestra el idioma al que se va a pasar,
 * no el actual: estando en español dice "EN".
 */
export function LanguageToggle({ oscuro = false }: { oscuro?: boolean }) {
  const { locale, toggleLocale, t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.nav.cambiarIdioma}
      className={`rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest transition-colors ${
        oscuro
          ? "border-white/30 text-white hover:border-white hover:bg-white/10"
          : "border-[var(--yaku-line)] text-[var(--yaku-black)] hover:border-[var(--yaku-violet)] hover:text-[var(--yaku-violet)]"
      }`}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
