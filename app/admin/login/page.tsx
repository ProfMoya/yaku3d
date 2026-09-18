import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Entrar — Yaku3D",
  // El panel no tiene por qué aparecer en buscadores.
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const destino = next?.startsWith("/admin") ? next : "/admin";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[var(--yaku-bg)]">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="font-display text-3xl text-[var(--yaku-text)]">
            Yaku<span className="text-[var(--yaku-magenta)]">3D</span>
          </Link>
          <p className="mt-2 text-sm text-[var(--yaku-muted)]">
            Panel de administración
          </p>
        </div>

        <div className="rounded-3xl bg-[var(--yaku-surface)] border border-[var(--yaku-line)] p-8">
          <LoginForm destino={destino} />
        </div>

        <p className="mt-8 text-center text-xs text-[var(--yaku-muted)]">
          <Link href="/" className="hover:text-[var(--yaku-violet-soft)] transition-colors">
            Volver a la web
          </Link>
        </p>
      </div>
    </main>
  );
}
