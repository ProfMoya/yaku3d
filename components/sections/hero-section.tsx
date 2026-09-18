"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { ScrollIndicator } from "@/components/scroll-indicator";

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
  //
  // La altura inicial suma los 80px del `-mt-20`: sin eso el hero termina 80px
  // antes del borde inferior y asoma la sección siguiente nada más abrir.
  const borderRadius = scrollProgress * 24;
  const finalHeight = 600;
  const alturaInicial = viewportHeight + 80;
  const currentHeight =
    alturaInicial - (alturaInicial - finalHeight) * scrollProgress;
  const horizontalPadding = scrollProgress * 48;

  return (
    <section className="relative bg-[var(--yaku-black)] -mt-20 overflow-hidden">
      <div
        className="w-full bg-transparent"
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
          {/* Video del taller. `poster` muestra la foto mientras el video
              carga, para que el hero no arranque en negro. muted + playsInline
              son obligatorios: sin los dos, iOS no reproduce solo. */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          >
            <video
              src="/videos/videoheader.mp4"
              poster="/images/hero-taller.jpg"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Tinte de marca + oscurecido, para que el texto blanco se lea */}
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background:
                  "radial-gradient(120% 90% at 20% 15%, var(--yaku-violet) 0%, var(--yaku-violet-deep) 45%, var(--yaku-black) 85%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <div
              className="absolute -right-24 -bottom-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
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

              {/* Arriba a la izquierda, despegado de la barra fija (que ocupa
                  hasta unos 80px) para que respire. */}
              <div className="absolute left-16 top-64 text-left">
                <h1
                  className={`font-display text-8xl text-white italic transition-all duration-700 delay-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {t.hero.tituloDesktop}
                </h1>
                <p
                  className={`mt-4 text-white/90 text-sm max-w-md transition-all duration-700 delay-400 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  {t.hero.bajada}
                </p>
              </div>
            </div>
          </div>

          {/* Se desvanece rápido: multiplicado por 4, ya no está a un cuarto
              del recorrido del hero. Se suma al fade de entrada para que no
              aparezca antes que el titular. */}
          <ScrollIndicator
            opacidad={isVisible ? 1 - scrollProgress * 4 : 0}
          />
        </div>
      </div>
    </section>
  );
}
