import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PasosPedido } from "@/components/pasos-pedido";
import { PedidoForm } from "@/components/pedido-form";

export const metadata: Metadata = {
  title: "Pedidos a medida — Yaku3D",
  description:
    "Diseñamos y fabricamos piezas a medida. Contanos qué necesitás y te pasamos presupuesto por WhatsApp.",
};

export default function APedidoPage() {
  return (
    <>
      <PageHeader seccion="aPedido" />

      <section className="py-16 lg:py-24 bg-[var(--yaku-bg)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <PasosPedido />
            </div>
            <div className="lg:col-span-7">
              <PedidoForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
