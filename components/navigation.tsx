"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { LanguageToggle } from "@/components/language-toggle";

export function Navigation() {
  const t = useT();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#catalogo", label: t.nav.catalogo },
    { href: "#porque", label: t.nav.porQue },
    { href: "#taller", label: t.nav.taller },
    { href: "#testimonios", label: t.nav.testimonios },
  ];

  // Sobre el hero (video oscuro) la barra va en blanco; al scrollear se apoya
  // sobre la crema y pasa a texto negro.
  const sobreHero = !isScrolled && !mobileMenuOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <nav
        className={`max-w-5xl mx-auto mt-6 px-4 pointer-events-auto transition-all duration-500 ${
          mobileMenuOpen ? "rounded-3xl" : "rounded-full"
        } ${
          sobreHero
            ? "bg-transparent"
            : "bg-[var(--yaku-cream)]/85 backdrop-blur-xl shadow-lg shadow-black/5"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-2">
          {/* Logo */}
          <Link
            href="#"
            className={`font-display text-2xl tracking-tight transition-colors duration-500 ${
              sobreHero ? "text-white" : "text-[var(--yaku-black)]"
            }`}
          >
            {/* Sobre el violeta del hero el magenta no se lee (1.33:1), así
                que el "3D" solo toma color cuando la barra está sobre crema. */}
            Yaku
            <span
              className={sobreHero ? "text-white/70" : "text-[var(--yaku-magenta)]"}
            >
              3D
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs transition-colors duration-500 ${
                  sobreHero
                    ? "text-white hover:text-white/70"
                    : "text-[var(--yaku-black)] hover:text-[var(--yaku-violet)]"
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
              className={`p-2 rounded-full transition-colors duration-500 ${
                sobreHero
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-[var(--yaku-cream-deep)] text-[var(--yaku-black)]"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t.nav.cerrarMenu : t.nav.abrirMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-8 border-t border-[var(--yaku-line)]">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-3xl text-[var(--yaku-black)] hover:text-[var(--yaku-violet)] transition-colors px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
