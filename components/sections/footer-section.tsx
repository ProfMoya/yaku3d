"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";

export function FooterSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const t = useT();

  const navegacion = [
    { href: "#catalogo", label: t.nav.catalogo },
    { href: "#porque", label: t.nav.porQue },
    { href: "#taller", label: t.nav.taller },
    { href: "#testimonios", label: t.nav.testimonios },
  ];

  return (
    <footer
      ref={ref}
      className="bg-[var(--yaku-cream)] border-t border-[var(--yaku-line)]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Marca */}
          <div
            className={`lg:col-span-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="#"
              className="font-display text-3xl text-[var(--yaku-black)] block mb-6"
            >
              Yaku<span className="text-[var(--yaku-magenta)]">3D</span>
            </Link>
            <p className="text-[var(--yaku-muted)] leading-relaxed mb-6 font-body">
              {t.footer.descripcion}
            </p>

            <div className="flex items-center gap-4">
              {["Instagram", "WhatsApp", "TikTok"].map((red) => (
                <a
                  key={red}
                  href="#"
                  className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-violet)] transition-colors font-body"
                >
                  {red}
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-8">
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-sm text-[var(--yaku-black)] font-medium mb-4">
                {t.footer.navegacion}
              </h3>
              <ul className="flex flex-wrap items-center gap-6">
                {navegacion.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--yaku-muted)] hover:text-[var(--yaku-violet)] transition-colors font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-[var(--yaku-line)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--yaku-muted)] font-body">
            {t.footer.derechos}
          </p>
          <div className="flex items-center gap-6">
            {t.footer.legales.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-xs text-[var(--yaku-muted)] hover:text-[var(--yaku-violet)] transition-colors font-body"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
