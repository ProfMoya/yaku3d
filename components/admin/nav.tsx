"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cerrarSesion } from "@/app/actions/auth";

const enlaces = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/categorias", label: "Categorías" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  // "/admin" solo se marca activo en la coincidencia exacta; si no, quedaría
  // encendido en todas las pantallas por ser prefijo de todas.
  const activo = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex w-full flex-col justify-between border-b border-[var(--yaku-line)] bg-[var(--yaku-surface)] p-6 md:h-screen md:w-64 md:border-b-0 md:border-r md:sticky md:top-0">
      <div>
        <Link href="/admin" className="font-display text-xl text-[var(--yaku-text)]">
          Yaku<span className="text-[var(--yaku-magenta)]">3D</span>
          <span className="ml-2 text-xs font-body text-[var(--yaku-muted)]">
            admin
          </span>
        </Link>

        <nav className="mt-8 flex flex-col gap-1">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              aria-current={activo(enlace.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                activo(enlace.href)
                  ? "bg-[var(--yaku-violet)] text-white"
                  : "text-[var(--yaku-muted)] hover:bg-[var(--yaku-surface-2)] hover:text-[var(--yaku-text)]"
              }`}
            >
              {enlace.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8 border-t border-[var(--yaku-line)] pt-4 text-sm">
        <p className="truncate text-[var(--yaku-muted)]" title={email}>
          {email}
        </p>
        <form action={cerrarSesion}>
          <button
            type="submit"
            className="mt-2 text-[var(--yaku-magenta)] hover:underline"
          >
            Cerrar sesión
          </button>
        </form>
        <Link
          href="/"
          className="mt-2 block text-[var(--yaku-muted)] hover:text-[var(--yaku-violet-soft)] transition-colors"
        >
          Ver la web
        </Link>
      </div>
    </aside>
  );
}
