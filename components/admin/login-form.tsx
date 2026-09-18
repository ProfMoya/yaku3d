"use client";

import { useActionState } from "react";
import { iniciarSesion, type EstadoLogin } from "@/app/actions/auth";

const ESTADO_INICIAL: EstadoLogin = {};

export function LoginForm({ destino }: { destino: string }) {
  const [estado, formAction, pendiente] = useActionState<EstadoLogin, FormData>(
    iniciarSesion,
    ESTADO_INICIAL,
  );

  const campo =
    "w-full rounded-2xl bg-[var(--yaku-bg)] border border-[var(--yaku-line)] px-5 py-4 text-[var(--yaku-text)] placeholder:text-[var(--yaku-muted)]/60 focus:outline-none focus:border-[var(--yaku-violet)] transition-colors";

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={destino} />

      <div>
        <label
          htmlFor="email"
          className="block text-sm text-[var(--yaku-text)] mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={campo}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm text-[var(--yaku-text)] mb-2"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={campo}
        />
      </div>

      {estado.error && (
        <p role="alert" className="text-sm text-[var(--yaku-magenta)]">
          {estado.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pendiente}
        className="w-full rounded-full bg-[var(--yaku-violet)] text-white py-4 text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pendiente ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
