-- Yaku3D — bucket de fotos
--
-- Va aparte de 0001 a proposito: el SQL Editor de Supabase corre todo el
-- script en una transaccion, y en muchos proyectos `storage.objects` pertenece
-- a `supabase_storage_admin`, no a `postgres`. Si estas sentencias fallan por
-- permisos ("must be owner of table objects"), estando en el mismo archivo se
-- llevarian por delante las tablas y los datos de 0001.
--
-- Si da error de permisos, no pasa nada: el bucket y sus politicas se pueden
-- crear desde el dashboard, en Storage → New bucket (nombre
-- "productos-media", marcado como Public) y Storage → Policies.

insert into storage.buckets (id, name, public)
values ('productos-media', 'productos-media', true)
on conflict (id) do nothing;

drop policy if exists "productos-media: lectura publica" on storage.objects;
create policy "productos-media: lectura publica"
  on storage.objects for select
  using (bucket_id = 'productos-media');

drop policy if exists "productos-media: admin sube" on storage.objects;
create policy "productos-media: admin sube"
  on storage.objects for insert
  with check (bucket_id = 'productos-media' and auth.role() = 'authenticated');

drop policy if exists "productos-media: admin actualiza" on storage.objects;
create policy "productos-media: admin actualiza"
  on storage.objects for update
  using (bucket_id = 'productos-media' and auth.role() = 'authenticated');

drop policy if exists "productos-media: admin borra" on storage.objects;
create policy "productos-media: admin borra"
  on storage.objects for delete
  using (bucket_id = 'productos-media' and auth.role() = 'authenticated');
