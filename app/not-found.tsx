import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[var(--yaku-bg)]">
      <p className="font-display text-7xl text-[var(--yaku-magenta)]">404</p>
      <h1 className="font-display text-3xl text-[var(--yaku-text)]">
        No encontramos esa página
      </h1>
      <p className="text-[var(--yaku-muted)] max-w-md">
        Puede que el link esté mal escrito o que la pieza ya no esté en el
        catálogo.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-[var(--yaku-violet)] text-white px-7 py-3 text-sm font-medium hover:bg-[var(--yaku-violet-deep)] transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
