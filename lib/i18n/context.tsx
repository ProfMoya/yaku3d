"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Dictionary, type Locale } from "./dictionary";

const STORAGE_KEY = "yaku3d-locale";

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  // El idioma guardado se lee recién después del primer render: si se leyera
  // durante el render, el HTML del servidor (siempre español) no coincidiría
  // con el del cliente y React tiraría un error de hidratación.
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(STORAGE_KEY);
      if (guardado === "es" || guardado === "en") setLocaleState(guardado);
    } catch {
      // localStorage bloqueado (ventana privada, cookies deshabilitadas):
      // la página se queda en español, que es el default.
    }
  }, []);

  // Mantiene el <html lang> en sincronía para lectores de pantalla y buscadores.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((siguiente: Locale) => {
    setLocaleState(siguiente);
    try {
      window.localStorage.setItem(STORAGE_KEY, siguiente);
    } catch {
      // Sin persistencia el toggle igual funciona, solo no sobrevive al reload.
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionary[locale],
      setLocale,
      toggleLocale: () => setLocale(locale === "es" ? "en" : "es"),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n() tiene que usarse dentro de <I18nProvider>.");
  return ctx;
}

/** Atajo para los componentes que solo necesitan leer texto. */
export function useT() {
  return useI18n().t;
}
