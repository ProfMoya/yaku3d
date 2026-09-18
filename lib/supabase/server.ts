import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para Server Components, Server Actions y Route Handlers.
 *
 * Usa la cookie de sesión del admin logueado y la publishable key — nunca una
 * clave secreta. Todo lo que se puede leer o escribir lo decide RLS, así que
 * un fallo de enrutado no puede convertirse en un acceso total a la base.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // set() falla si se llama desde un Server Component sin sesión que
            // refrescar. Se puede ignorar: proxy.ts ya refresca la cookie en
            // cada request a /admin.
          }
        },
      },
    },
  );
}

/**
 * Backstop dentro de los Server Actions de escritura. No reemplaza a RLS, pero
 * evita que una acción mal enrutada ejecute una escritura sin sesión.
 */
export async function requireUser(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autorizado.");
  return user;
}
