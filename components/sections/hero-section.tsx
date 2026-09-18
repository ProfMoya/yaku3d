"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n/context";

export function HeroSection() {
  const t = useT();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Se mide en un efecto y no durante el render: en el servidor no existe
  // `window`, y calcularlo ahí rompía la hidratación.
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const medir = () => setViewportHeight(window.innerHeight);
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 600; // Distancia de scroll para la transición completa
      const progress = Math.min(window.scrollY / maxScroll, 1);
      // Easing para que la transición no sea lineal
      const easeProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setScrollProgress(easeProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Valores interpolados: el bloque arranca a pantalla completa y al scrollear
  // se despega de los bordes y se redondea.
  const borderRadius = scrollProgress * 24;
  const finalHeight = 600;
  const currentHeight =
    viewportHeight - (viewportHeight - finalHeight) * scrollProgress;
  const horizontalPadding = scrollProgress * 48;

  return (
    <section className="relative bg-[var(--yaku-black)] -mt-20 overflow-hidden">
      <div
        className="w-full bg-[var(--yaku-bg)]"
        style={{
          paddingLeft: `${horizontalPadding}px`,
          paddingRight: `${horizontalPadding}px`,
          paddingTop: `${scrollProgress * 48}px`,
          paddingBottom: `${scrollProgress * 48}px`,
        }}
      >
        <div
          className="relative w-full overflow-hidden bg-[var(--yaku-black)]"
          style={{
            height: `${currentHeight}px`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          {/* Fondo de marca. Acá va el video del taller cuando esté filmado:
              reemplazar este div por un <video src="/videos/…" autoPlay loop
              muted playsInline className="absolute inset-0 w-full h-full
              object-cover" />. */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(120% 90% at 20% 15%, var(--yaku-violet) 0%, var(--yaku-violet-deep) 38%, var(--yaku-black) 78%)",
            }}
          >
            {/* Capas: la textura de una pieza recién impresa. */}
            <div
              className="absolute inset-0 opacity-[0.07] mix-blend-screen"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0 9px, rgba(255,255,255,0.5) 9px 10px)",
              }}
            />
            <div
              className="absolute -right-24 -bottom-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
              style={{ background: "var(--yaku-magenta)" }}
            />
          </div>

          {/* Contenido */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16">
            {/* Mobile */}
            <div className="lg:hidden flex flex-col items-center text-center space-y-6 w-full">
              <h1
                className={`font-display text-5xl sm:text-6xl text-white italic transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {t.hero.tituloMobile}
              </h1>

              <p
                className={`text-white/90 text-base transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {t.hero.bajada}
              </p>

              <Link
                href="/catalogo"
                className={`flex items-center justify-center gap-2 bg-[var(--yaku-magenta)] text-[var(--yaku-black)] px-6 py-4 rounded-full text-sm font-medium hover:bg-[var(--yaku-violet)] hover:text-white transition-all duration-700 delay-500 w-full ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {t.hero.cta}
                <span className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <div
                className={`absolute left-16 bottom-16 transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 bg-[var(--yaku-magenta)] text-[var(--yaku-black)] px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--yaku-violet)] hover:text-white transition-colors"
                >
                  {t.hero.cta}
                  <span className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

              <div className="absolute right-16 bottom-16 text-right">
                <h1
                  className={`font-display text-8xl text-white italic transition-all duration-700 delay-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {t.hero.tituloDesktop}
                </h1>
                <p
                  className={`mt-4 text-white/90 text-sm max-w-md ml-auto transition-all duration-700 delay-400 text-left ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {t.hero.bajada}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
