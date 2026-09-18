-- Yaku3D — lista explicita de administradores
--
-- POR QUE
--
-- Las politicas de 0001 daban acceso total a `auth.role() = 'authenticated'`,
-- o sea a cualquiera con sesion iniciada. Como la publishable key viaja al
-- navegador y el registro publico viene habilitado por defecto, cualquiera
-- podia registrarse contra el proyecto y quedar con permisos de administrador
-- sobre todo el catalogo.
--
-- Estar logueado deja de ser suficiente: hay que estar en esta tabla.
-- Es la segunda capa; la primera es desactivar el registro publico en
-- Authentication → Sign In / Providers → Email → "Allow new users to sign up".
-- Con las dos, registrarse no sirve de nada aunque el registro se reabriera
-- por error.

create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  created_at timestamptz not null default now()
);

-- RLS activo y sin una sola politica: la tabla queda inaccesible desde la API.
-- La unica que la lee es es_admin(), que corre como security definer.
alter table admins enable row level security;

create or replace function es_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Se reemplazan las politicas de administrador de 0001
-- ---------------------------------------------------------------------------

drop policy if exists "categorias: admin acceso total" on categorias;
create policy "categorias: admin acceso total" on categorias
  for all using (es_admin()) with check (es_admin());

drop policy if exists "productos: admin acceso total" on productos;
create policy "productos: admin acceso total" on productos
  for all using (es_admin()) with check (es_admin());

drop policy if exists "medios: admin acceso total" on medios;
create policy "medios: admin acceso total" on medios
  for all using (es_admin()) with check (es_admin());

-- Las de lectura publica no se tocan: el catalogo publicado se sigue viendo
-- sin sesion, que es el punto.

-- ---------------------------------------------------------------------------
-- Alta del unico administrador
--
-- Crear primero el usuario en Authentication → Users → Add user, y despues
-- cambiar el email de aqui abajo por el que se uso. Sin esto, el panel abre
-- pero no deja guardar nada, porque la sesion no esta en la lista.
-- ---------------------------------------------------------------------------

insert into admins (user_id, email)
select id, email from auth.users
where email = 'CAMBIAR-POR-TU-EMAIL@ejemplo.com'
on conflict (user_id) do nothing;
