"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/context";
import { LanguageToggle } from "@/components/language-toggle";

export function Navigation() {
  const t = useT();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // La altura del menú se mide del contenido y se aplica en píxeles. El truco
  // de grid-rows 0fr→1fr sería más elegante, pero aquí no resolvía: la fila
  // quedaba en 0 y el menú no se abría nunca. Con píxeles es determinista.
  const contenidoRef = useRef<HTMLDivElement>(null);
  const [alturaMenu, setAlturaMenu] = useState(0);

  useEffect(() => {
    setAlturaMenu(mobileMenuOpen ? (contenidoRef.current?.scrollHeight ?? 0) : 0);
  }, [mobileMenuOpen, t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Al navegar a otra página el menú mobile tiene que cerrarse solo.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/catalogo", label: t.nav.catalogo },
    { href: "/a-pedido", label: t.nav.aPedido },
    { href: "/taller", label: t.nav.taller },
  ];

  // Solo la home arranca con el hero oscuro a sangre; en el resto de las
  // páginas la barra siempre se apoya sobre una superficie.
  const esHome = pathname === "/";
  const sobreHero = esHome && !isScrolled && !mobileMenuOpen;

  const activo = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <nav
        className={`max-w-5xl mx-auto mt-6 px-4 pointer-events-auto transition-all duration-300 ${
          mobileMenuOpen ? "rounded-3xl" : "rounded-full"
        } ${
          sobreHero
            ? "bg-transparent"
            : "bg-[var(--yaku-surface)]/85 backdrop-blur-xl border border-[var(--yaku-line)] shadow-lg shadow-black/30"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-2">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-[var(--yaku-text)]"
          >
            Yaku
            {/* Sobre el violeta del hero el magenta no se lee (1.33:1), así que
                el "3D" solo toma color cuando la barra está sobre superficie. */}
            <span
              className={sobreHero ? "text-white/70" : "text-[var(--yaku-magenta)]"}
            >
              3D
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={activo(link.href) ? "page" : undefined}
                className={`text-xs transition-colors duration-300 ${
                  activo(link.href)
                    ? "text-[var(--yaku-magenta)]"
                    : "text-[var(--yaku-text)] hover:text-[var(--yaku-violet-soft)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageToggle oscuro={sobreHero} />
          </div>

          {/* Mobile: idioma + menú */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle oscuro={sobreHero} />
            <button
              type="button"
              className="p-2 rounded-full text-[var(--yaku-text)] hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t.nav.cerrarMenu : t.nav.abrirMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-mobile"
            >
              {/* Dos barras que giran hasta formar la X, en vez de cambiar un
                  icono por otro de golpe. */}
              <span aria-hidden="true" className="relative block w-5 h-5">
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ease-out ${
                    mobileMenuOpen ? "top-1/2 rotate-45" : "top-[34%]"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ease-out ${
                    mobileMenuOpen ? "top-1/2 -rotate-45" : "top-[62%]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Menú mobile.
            Se queda siempre montado y se abre con grid-rows de 0fr a 1fr: así
            la altura se anima sola, sin tener que medir el contenido. Cerrado
            lleva `invisible`, que además lo saca del orden de tabulación. */}
        <div
          id="menu-mobile"
          style={{ height: alturaMenu }}
          // `inert` saca los enlaces del orden de tabulación mientras está
          // cerrado: con altura 0 y overflow oculto seguirían siendo
          // alcanzables con el teclado.
          inert={!mobileMenuOpen}
          className={`md:hidden overflow-hidden transition-[height,opacity] duration-300 ease-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div ref={contenidoRef}>
            <div className="flex flex-col gap-6 py-8 border-t border-[var(--yaku-line)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={activo(link.href) ? "page" : undefined}
                  className={`font-display text-3xl transition-colors px-2 ${
                    activo(link.href)
                      ? "text-[var(--yaku-magenta)]"
                      : "text-[var(--yaku-text)] hover:text-[var(--yaku-violet-soft)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
