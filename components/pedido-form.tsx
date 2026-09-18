"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { linkPedido, whatsappConfigurado, type DatosPedido } from "@/lib/whatsapp";

const VACIO: DatosPedido = {
  nombre: "",
  tipo: "",
  cantidad: "",
  medidas: "",
  descripcion: "",
};

/**
 * No manda nada a ningún servidor: arma el mensaje y abre WhatsApp con el
 * texto ya escrito, así la conversación arranca con el contexto completo.
 *
 * El número sale de NEXT_PUBLIC_WHATSAPP_NUMBER (ver lib/whatsapp.ts). Hasta
 * que esté cargado, el botón queda deshabilitado con un aviso en pantalla en
 * lugar de abrir un chat a un número que no existe.
 */
export function PedidoForm() {
  const t = useT();
  const [datos, setDatos] = useState<DatosPedido>(VACIO);
  const [intentado, setIntentado] = useState(false);

  const f = t.paginas.aPedido.form;
  const completo = datos.nombre.trim() !== "" && datos.descripcion.trim() !== "";

  const actualizar =
    (campo: keyof DatosPedido) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDatos((previo) => ({ ...previo, [campo]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIntentado(true);
    if (!completo || !whatsappConfigurado) return;
    window.open(linkPedido(datos), "_blank", "noopener,noreferrer");
  };

  const campoClase =
    "w-full rounded-2xl bg-[var(--yaku-bg)] border border-[var(--yaku-line)] px-5 py-4 text-[var(--yaku-text)] placeholder:text-[var(--yaku-muted)]/60 focus:outline-none focus:border-[var(--yaku-violet)] transition-colors font-body";
  const etiquetaClase =
    "block text-sm text-[var(--yaku-text)] mb-2 font-body";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-[var(--yaku-surface)] border border-[var(--yaku-line)] p-6 lg:p-10"
      noValidate
    >
      <h2 className="font-display text-2xl lg:text-3xl text-[var(--yaku-text)] mb-8">
        {f.titulo}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label htmlFor="pedido-nombre" className={etiquetaClase}>
            {f.nombre}
          </label>
          <input
            id="pedido-nombre"
            type="text"
            value={datos.nombre}
            onChange={actualizar("nombre")}
            placeholder={f.nombrePh}
            className={campoClase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="pedido-tipo" className={etiquetaClase}>
            {f.tipo}
          </label>
          <input
            id="pedido-tipo"
            type="text"
            value={datos.tipo}
            onChange={actualizar("tipo")}
            placeholder={f.tipoPh}
            className={campoClase}
          />
        </div>

        <div>
          <label htmlFor="pedido-cantidad" className={etiquetaClase}>
            {f.cantidad}
          </label>
          <input
            id="pedido-cantidad"
            type="text"
            inputMode="numeric"
            value={datos.cantidad}
            onChange={actualizar("cantidad")}
            placeholder={f.cantidadPh}
            className={campoClase}
          />
        </div>

        <div>
          <label htmlFor="pedido-medidas" className={etiquetaClase}>
            {f.medidas}
          </label>
          <input
            id="pedido-medidas"
            type="text"
            value={datos.medidas}
            onChange={actualizar("medidas")}
            placeholder={f.medidasPh}
            className={campoClase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="pedido-descripcion" className={etiquetaClase}>
            {f.descripcion}
          </label>
          <textarea
            id="pedido-descripcion"
            value={datos.descripcion}
            onChange={actualizar("descripcion")}
            placeholder={f.descripcionPh}
            rows={5}
            className={`${campoClase} resize-y`}
          />
        </div>
      </div>

      {intentado && !completo && (
        <p role="alert" className="mt-6 text-sm text-[var(--yaku-magenta)]">
          {f.requerido}
        </p>
      )}

      {!whatsappConfigurado && (
        <p className="mt-6 rounded-2xl bg-[var(--yaku-surface-2)] border border-[var(--yaku-line)] px-5 py-4 text-sm text-[var(--yaku-muted)]">
          {f.sinNumero}
        </p>
      )}

      <button
        type="submit"
        disabled={!whatsappConfigurado}
        className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[var(--yaku-violet)] text-white px-8 py-4 text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--yaku-violet)]"
      >
        <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
        {f.enviar}
      </button>

      <p className="mt-4 text-xs text-[var(--yaku-muted)]">{f.aviso}</p>
    </form>
  );
}
