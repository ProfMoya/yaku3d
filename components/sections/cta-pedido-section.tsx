"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useT } from "@/lib/i18n/context";

/** Puente de la home hacia /a-pedido. */
export function CtaPedidoSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const t = useT();

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[var(--yaku-bg)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative overflow-hidden rounded-3xl bg-[var(--yaku-violet-deep)] px-8 py-14 lg:px-16 lg:py-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute -right-20 -bottom-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
            style={{ background: "var(--yaku-magenta)" }}
          />

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                {t.home.ctaPedido.titulo}
              </h2>
              <p className="text-white/80 leading-relaxed">
                {t.home.ctaPedido.texto}
              </p>
            </div>

            <Link
              href="/a-pedido"
              className="inline-flex items-center gap-2 self-start bg-[var(--yaku-magenta)] text-[var(--yaku-black)] px-6 py-4 rounded-full text-sm font-medium hover:bg-white transition-colors flex-shrink-0"
            >
              {t.home.ctaPedido.boton}
              <span className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
