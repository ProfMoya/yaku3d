"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";

export function EditorialSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const t = useT();
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // El fondo crece de 0.7 a 1 mientras la sección sube desde el borde
      // inferior de la pantalla hasta la mitad.
      const startScroll = windowHeight;
      const endScroll = windowHeight / 2;

      if (rect.top <= startScroll && rect.top >= endScroll) {
        const progress = (startScroll - rect.top) / (startScroll - endScroll);
        setScale(0.7 + progress * 0.3);
      } else if (rect.top < endScroll) {
        setScale(1);
      } else {
        setScale(0.7);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="nota"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      className="relative bg-transparent"
    >
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Fondo de marca con el mismo zoom que tenía la foto */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${scale})`,
            background:
              "radial-gradient(100% 80% at 80% 20%, var(--yaku-violet-deep) 0%, var(--yaku-black) 70%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 9px, rgba(255,255,255,0.6) 9px 10px)",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Contenido */}
        <div className="relative h-full flex flex-col justify-end px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="max-w-[1400px] mx-auto w-full text-center lg:text-left">
            <div
              className={`mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl text-white mb-6 max-w-3xl">
                {t.editorial.titulo}
              </h2>

              <div className="flex flex-col items-center justify-center gap-4 mb-8 lg:flex-row lg:justify-between lg:flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--yaku-magenta)] flex items-center justify-center font-display text-sm text-[var(--yaku-black)]">
                    Y3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {t.editorial.autor}
                    </p>
                    <p className="text-xs text-white/70 font-body">
                      {t.editorial.rol}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/70 font-body">
                  {t.editorial.fecha}
                </p>
              </div>
            </div>

            <div className="max-w-3xl">
              <h3
                className={`font-display text-white mb-6 transition-all duration-700 delay-300 text-2xl lg:text-3xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {t.editorial.subtitulo}
              </h3>

              <p
                className={`text-white/90 leading-relaxed mb-6 font-body transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {t.editorial.parrafo1}
              </p>

              <p
                className={`text-white/90 leading-relaxed font-body transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {t.editorial.parrafo2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
