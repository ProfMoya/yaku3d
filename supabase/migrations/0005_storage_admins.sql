-- Yaku3D — las politicas del bucket pasan a exigir es_admin()
--
-- Mismo motivo que 0004: subir, reemplazar y borrar fotos no puede depender de
-- estar meramente logueado. Va en un archivo aparte porque las sentencias
-- sobre storage.objects pueden fallar por permisos, y en el mismo script se
-- llevarian por delante a 0004.

drop policy if exists "productos-media: admin sube" on storage.objects;
create policy "productos-media: admin sube"
  on storage.objects for insert
  with check (bucket_id = 'productos-media' and es_admin());

drop policy if exists "productos-media: admin actualiza" on storage.objects;
create policy "productos-media: admin actualiza"
  on storage.objects for update
  using (bucket_id = 'productos-media' and es_admin());

drop policy if exists "productos-media: admin borra" on storage.objects;
create policy "productos-media: admin borra"
  on storage.objects for delete
  using (bucket_id = 'productos-media' and es_admin());

-- La lectura publica del bucket se deja como esta: las fotos del catalogo
-- tienen que verse sin sesion.
