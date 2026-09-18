"use client";

import React, { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";

export function NewsletterSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.3 });
  const t = useT();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Todavía no hay backend: el formulario solo confirma en pantalla. La alta
  // real se conecta en la fase 2, junto con el panel.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[var(--yaku-black)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p
            className={`text-sm text-white/50 uppercase tracking-wider mb-4 font-body transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.newsletter.volanta}
          </p>

          <h2
            className={`font-display text-4xl sm:text-5xl text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t.newsletter.titulo}
          </h2>

          <p
            className={`text-white/60 leading-relaxed mb-10 font-body transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.newsletter.texto}
          </p>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[var(--yaku-magenta)] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[var(--yaku-magenta)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-white/70 text-sm font-body">
                  {t.newsletter.exito}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  aria-label={t.newsletter.placeholder}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--yaku-violet)] transition-colors font-body"
                  required
                />
                <button
                  type="submit"
                  className="bg-[var(--yaku-magenta)] text-[var(--yaku-black)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--yaku-violet)] hover:text-white transition-colors"
                >
                  {t.newsletter.boton}
                </button>
              </form>
            )}
          </div>

          <p
            className={`text-xs text-white/40 mt-6 font-body transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t.newsletter.privacidad}
          </p>
        </div>
      </div>
    </section>
  );
}
