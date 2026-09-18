"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type EstadoLogin = { error?: string };

export async function iniciarSesion(
  _estadoPrevio: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const destino = String(formData.get("next") ?? "/admin");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // Un solo mensaje para los dos casos: decir "ese email no existe" le
  // confirmaría a un atacante qué cuentas hay.
  if (error) return { error: "Email o contraseña incorrectos." };

  // Solo se acepta un destino interno del panel: si `next` viniera manipulado
  // con una URL externa, sería una redirección abierta.
  redirect(destino.startsWith("/admin") ? destino : "/admin");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
