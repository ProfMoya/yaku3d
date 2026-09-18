"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";
import { linkIdea, whatsappConfigurado } from "@/lib/whatsapp";

/**
 * Versión corta del formulario de /a-pedido para el cierre de la home: solo
 * nombre e idea. No manda nada a ningún servidor — arma el mensaje y abre
 * WhatsApp con el texto ya escrito.
 *
 * Ocupa el lugar del antiguo bloque de newsletter, que pedía un email sin
 * tener adónde guardarlo.
 */
export function ContactoRapidoSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.3 });
  const t = useT();
  const [nombre, setNombre] = useState("");
  const [idea, setIdea] = useState("");
  const [intentado, setIntentado] = useState(false);

  const completo = nombre.trim() !== "" && idea.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIntentado(true);
    if (!completo || !whatsappConfigurado) return;
    window.open(linkIdea({ nombre, idea }), "_blank", "noopener,noreferrer");
  };

  const campo =
    "w-full rounded-2xl bg-white/10 border border-white/20 px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--yaku-magenta)] transition-colors font-body";

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[var(--yaku-violet-deep)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className={`text-sm text-white/60 uppercase tracking-wider mb-4 font-body transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.contacto.volanta}
          </p>

          <h2
            className={`font-display text-4xl sm:text-5xl text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.contacto.titulo}
          </h2>

          <p
            className={`text-white/70 leading-relaxed mb-10 font-body transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.contacto.texto}
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className={`space-y-4 text-left transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div>
              <label htmlFor="contacto-nombre" className="sr-only">
                {t.contacto.nombre}
              </label>
              <input
                id="contacto-nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={t.contacto.nombrePh}
                aria-label={t.contacto.nombre}
                className={campo}
              />
            </div>

            <div>
              <label htmlFor="contacto-idea" className="sr-only">
                {t.contacto.idea}
              </label>
              <textarea
                id="contacto-idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder={t.contacto.ideaPh}
                aria-label={t.contacto.idea}
                rows={3}
                className={`${campo} resize-y`}
              />
            </div>

            {intentado && !completo && (
              <p role="alert" className="text-sm text-[var(--yaku-magenta)]">
                {t.contacto.requerido}
              </p>
            )}

            {!whatsappConfigurado && (
              <p className="rounded-2xl bg-black/20 px-5 py-3 text-sm text-white/70">
                {t.contacto.sinNumero}
              </p>
            )}

            <button
              type="submit"
              disabled={!whatsappConfigurado}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--yaku-magenta)] text-[var(--yaku-black)] px-8 py-4 text-sm font-medium hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              {t.contacto.boton}
            </button>
          </form>

          <p
            className={`text-xs text-white/50 mt-6 font-body transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t.contacto.aviso}
          </p>
        </div>
      </div>
    </section>
  );
}
