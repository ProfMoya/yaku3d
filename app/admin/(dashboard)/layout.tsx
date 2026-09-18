import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/nav";

export const metadata: Metadata = {
  title: "Panel — Yaku3D",
  robots: { index: false, follow: false },
};

/**
 * Segunda barrera de autenticación. `proxy.ts` ya redirige a quien no tenga
 * sesión, pero esto se comprueba igual: si el matcher del proxy cambiara por
 * error, el panel no quedaría abierto.
 */
export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--yaku-bg)] md:flex-row">
      <AdminNav email={user.email ?? ""} />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
