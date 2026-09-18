-- Yaku3D — esquema inicial
-- Correr en el SQL Editor de Supabase.
--
-- Refleja lo que hoy vive en lib/products.ts y lib/i18n/dictionary.ts: el
-- catalogo con su ficha tecnica, las categorias con su check de visibilidad y
-- su orden, y las fotos. Los campos _en son las traducciones que el panel
-- rellena y que consume el boton ES/EN.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tablas
-- ---------------------------------------------------------------------------

create table if not exists categorias (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  nombre_en text not null default '',
  imagen_url text,
  -- El check de "mostrar en la home" y el reordenar de la grilla de colecciones
  visible boolean not null default true,
  orden int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  categoria_id uuid not null references categorias(id) on delete restrict,
  nombre text not null,
  -- En euros
  precio numeric(10,2) not null default 0,
  descripcion text not null default '',
  descripcion_en text not null default '',
  material text not null default 'pla' check (material in ('pla', 'petg', 'tpu')),
  medidas text not null default '',
  tiempo_impresion text not null default '',
  -- Ids de color; los nombres traducidos viven en el diccionario del front
  colores text[] not null default '{}',
  apto_exterior boolean not null default false,
  destacado boolean not null default false,
  publicado boolean not null default true,
  orden int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists productos_categoria_id_idx on productos(categoria_id);
create index if not exists productos_publicado_idx on productos(publicado);

create table if not exists medios (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references productos(id) on delete cascade,
  url text not null,
  alt text not null default '',
  orden int not null default 0
);

create index if not exists medios_producto_id_idx on medios(producto_id);

-- Formulario de /a-pedido. Hoy el formulario abre WhatsApp sin tocar la base;
-- esta tabla queda lista por si se decide guardar tambien una copia, para no
-- depender de que el chat no se pierda.
create table if not exists pedidos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  tipo text not null default '',
  cantidad text not null default '',
  medidas text not null default '',
  descripcion text not null default '',
  estado text not null default 'nuevo'
    check (estado in ('nuevo', 'en_revision', 'presupuestado', 'cerrado')),
  created_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists productos_set_updated_at on productos;
create trigger productos_set_updated_at
  before update on productos
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- La publishable key viaja al navegador, asi que todo lo que protege la base
-- son estas politicas. El publico solo lee lo publicado; escribir requiere
-- sesion.
-- ---------------------------------------------------------------------------

alter table categorias enable row level security;
alter table productos enable row level security;
alter table medios enable row level security;
alter table pedidos enable row level security;

drop policy if exists "categorias: lectura publica" on categorias;
create policy "categorias: lectura publica" on categorias
  for select using (true);

drop policy if exists "productos: lectura publica de publicados" on productos;
create policy "productos: lectura publica de publicados" on productos
  for select using (publicado = true);

drop policy if exists "medios: lectura publica" on medios;
create policy "medios: lectura publica" on medios
  for select using (
    exists (
      select 1 from productos p
      where p.id = medios.producto_id and p.publicado = true
    )
  );

drop policy if exists "pedidos: insert publico" on pedidos;
create policy "pedidos: insert publico" on pedidos
  for insert with check (true);

drop policy if exists "categorias: admin acceso total" on categorias;
create policy "categorias: admin acceso total" on categorias
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "productos: admin acceso total" on productos;
create policy "productos: admin acceso total" on productos
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "medios: admin acceso total" on medios;
create policy "medios: admin acceso total" on medios
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "pedidos: admin lectura" on pedidos;
create policy "pedidos: admin lectura" on pedidos
  for select using (auth.role() = 'authenticated');

drop policy if exists "pedidos: admin actualiza estado" on pedidos;
create policy "pedidos: admin actualiza estado" on pedidos
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Datos semilla — las 5 categorias y las 18 piezas del catalogo de demo,
-- tal cual estan hoy en lib/products.ts. Las fotos quedan pendientes de
-- cargar desde el panel.
-- ---------------------------------------------------------------------------

insert into categorias (slug, nombre, nombre_en, orden, visible) values
  ('organizadores', 'Organizadores', 'Organisers', 1, true),
  ('deco', 'Deco', 'Decor', 2, true),
  ('hogar', 'Hogar', 'Home', 3, true),
  ('juegos', 'Juegos', 'Games', 4, true),
  ('personalizados', 'Personalizados', 'Custom', 5, true)
on conflict (slug) do nothing;

insert into productos
  (slug, categoria_id, nombre, precio, material, medidas, tiempo_impresion,
   colores, apto_exterior, orden, descripcion, descripcion_en)
values
  ('organizador-escritorio-kuska', (select id from categorias where slug='organizadores'),
   'Organizador de escritorio Kuska', 24.90, 'pla', '240 × 120 × 90 mm', '9 h 40 min',
   '{negro,blanco,violeta}', false, 1,
   'Cinco compartimentos de distinta profundidad: en los dos del fondo caben bolígrafos de pie, y el de delante es plano, para clips y llaves. La base va lijada y lleva pies de goma para que no raye la mesa.',
   'Five compartments at different depths: the two at the back take pens upright, the shallow front one is for clips and keys. The base is sanded and comes with rubber feet so it won''t scratch your desk.'),

  ('portacables-muyu', (select id from categorias where slug='organizadores'),
   'Portacables Muyu', 5.90, 'tpu', '45 × 30 × 18 mm', '35 min',
   '{negro,gris,magenta}', false, 2,
   'Impreso en TPU, así que flexiona para entrar y luego agarra. Admite cables de hasta 6 mm. Se pega al canto de la mesa con cinta de doble cara y no se suelta al tirar del cable.',
   'Printed in TPU, so it flexes to go on and then grips. Fits cables up to 6mm. Sticks to the edge of a desk with double-sided tape and won''t come off when you tug the cable.'),

  ('bandeja-apilable-pacha', (select id from categorias where slug='organizadores'),
   'Bandeja apilable Pacha', 16.90, 'pla', '200 × 150 × 55 mm', '6 h 15 min',
   '{blanco,gris,negro}', false, 3,
   'Se apilan con un encaje en las cuatro esquinas y quedan firmes, sin bailar. Aguantan bien el peso de papeles y herramientas pequeñas. Se pueden pedir sueltas o en torres de tres.',
   'They stack via a joint at all four corners and sit firm, without wobbling. Holds paper and small tools without sagging. Available singly or in stacks of three.'),

  ('soporte-auriculares-antay', (select id from categorias where slug='organizadores'),
   'Soporte para auriculares Antay', 18.90, 'petg', '270 × 110 × 100 mm', '5 h 50 min',
   '{negro,violeta}', false, 4,
   'El brazo es ancho y redondeado para no marcar la diadema. La base tiene un hueco que puedes lastrar con monedas o arena si usas auriculares pesados.',
   'The arm is wide and rounded so it won''t crease the headband. The base has a cavity you can weigh down with coins or sand if your headphones are heavy.'),

  ('portalapices-inti', (select id from categorias where slug='organizadores'),
   'Portalápices Inti', 11.90, 'pla', '100 × 85 × 85 mm', '3 h 05 min',
   '{blanco,violeta,magenta,natural}', false, 5,
   'Pared espiralada impresa de una sola pasada, sin costura vertical. El interior va dividido en dos para separar lo que escribe de lo que corta.',
   'Spiralised wall printed in a single pass, with no vertical seam. The inside is split in two to keep what writes apart from what cuts.'),

  ('florero-espiralado-yaku', (select id from categorias where slug='deco'),
   'Florero espiralado Yaku', 29.90, 'petg', '180 × 110 × 110 mm', '7 h 30 min',
   '{blanco,violeta,natural}', true, 1,
   'Impreso en una sola pieza con pared espiralada, sin costuras visibles. Lleva un vaso interior de cristal, así que aguanta agua sin que la pieza filtre. Disponible en 12, 18 y 24 cm de alto.',
   'Printed as a single spiralised piece, with no visible seams. It comes with an inner glass liner, so it holds water without the print leaking. Available at 12, 18 and 24cm tall.'),

  ('posavasos-wayra', (select id from categorias where slug='deco'),
   'Set de posavasos Wayra', 14.90, 'petg', '95 × 95 × 8 mm', '2 h 40 min',
   '{negro,blanco,magenta,violeta}', true, 2,
   'Juego de cuatro, con una textura de ondas concéntricas que retiene la condensación en vez de dejarla correr. PETG, así que no se deforman con un café recién hecho encima.',
   'Set of four, with a concentric wave texture that traps condensation instead of letting it run. PETG, so a fresh coffee sitting on top won''t warp them.'),

  ('portarretrato-killa', (select id from categorias where slug='deco'),
   'Portarretratos Killa', 16.90, 'pla', '180 × 130 × 25 mm', '4 h 10 min',
   '{negro,blanco,natural}', false, 3,
   'Para fotos de 13 × 18 cm. El pie va atornillado y gira, así que sirve en horizontal o en vertical sin comprar dos. Sin cristal: la foto entra por una ranura lateral.',
   'Takes 13 × 18cm photos. The stand is screwed on and rotates, so one frame works landscape or portrait. No glass: the photo slides in through a side slot.'),

  ('movil-geometrico-chaska', (select id from categorias where slug='deco'),
   'Móvil geométrico Chaska', 24.90, 'pla', '400 × 300 × 300 mm', '8 h 20 min',
   '{blanco,violeta,magenta}', false, 4,
   'Doce piezas huecas colgadas de hilo de nailon, pensadas para que el conjunto pese poco y gire con la corriente de aire. Se envía desmontado, con la medida de cada tramo de hilo marcada.',
   'Twelve hollow pieces hung from fishing line, designed to stay light enough to turn with a draught. Ships flat, with the length of each line marked.'),

  ('gancho-adhesivo-rumi', (select id from categorias where slug='hogar'),
   'Gancho adhesivo Rumi', 4.90, 'petg', '60 × 40 × 35 mm', '45 min',
   '{blanco,negro,gris}', true, 1,
   'Aguanta 3 kg con la cinta 3M que viene incluida. La punta del gancho sube, para que la correa o la bolsa no se escurra sola.',
   'Holds 3kg with the included 3M tape. The hook curves up at the tip so a strap or bag can''t slip off on its own.'),

  ('soporte-movil-puma', (select id from categorias where slug='hogar'),
   'Soporte para móvil Puma', 8.90, 'pla', '110 × 80 × 75 mm', '2 h 15 min',
   '{negro,violeta,magenta}', false, 2,
   'Dos ángulos de apoyo: uno de pie para videollamadas y otro más tumbado para ver vídeo. El paso del cable está abierto, así que carga apoyado sin que el conector haga palanca.',
   'Two resting angles: one upright for video calls, one laid back for watching. The cable channel is open, so it charges while docked without the connector levering.'),

  ('dispenser-mayu', (select id from categorias where slug='hogar'),
   'Dispensador Mayu', 19.90, 'petg', '220 × 100 × 100 mm', '6 h 50 min',
   '{blanco,negro}', false, 3,
   'Para lavavajillas o gel hidroalcohólico. La boquilla se imprime aparte, con la pared más gruesa para que no se raje con el uso. Se desmonta sin herramientas para lavarlo.',
   'For washing-up liquid or hand sanitiser. The spout is printed separately with thicker walls so it won''t crack with use. Comes apart without tools for cleaning.'),

  ('tope-puerta-sacha', (select id from categorias where slug='hogar'),
   'Tope de puerta Sacha', 6.90, 'tpu', '120 × 55 × 40 mm', '1 h 10 min',
   '{negro,gris,magenta}', true, 4,
   'TPU con relleno alto: cede lo justo para agarrarse al suelo sin marcarlo. La rampa es larga y baja, así que funciona igual en baldosa que en suelo laminado.',
   'TPU with high infill: it gives just enough to grip the floor without marking it. The ramp is long and low, so it works on tile as well as laminate.'),

  ('set-dados-wasi', (select id from categorias where slug='juegos'),
   'Set de dados Wasi', 12.90, 'pla', '20 × 20 × 20 mm', '3 h 30 min',
   '{negro,violeta,magenta,blanco}', false, 1,
   'Juego de siete dados de rol (d4 a d20) con los números en relieve y pintados a mano. Impresos con relleno uniforme para que caigan equilibrados.',
   'Seven-dice roleplaying set (d4 to d20) with raised, hand-painted numbers. Printed with even infill so they roll fair.'),

  ('rompecabezas-tinku', (select id from categorias where slug='juegos'),
   'Rompecabezas Tinku', 15.90, 'pla', '90 × 90 × 90 mm', '4 h 45 min',
   '{natural,violeta,negro}', false, 2,
   'Seis piezas que encajan en un cubo y solo salen en un orden. Las tolerancias se ajustan a mano pieza por pieza: entra firme, pero sin forzar.',
   'Six pieces that lock into a cube and only come apart in one order. Tolerances are tuned by hand, piece by piece: snug, but never forced.'),

  ('fichas-chakana', (select id from categorias where slug='juegos'),
   'Fichas Chakana', 9.90, 'pla', '40 × 40 × 6 mm', '1 h 50 min',
   '{negro,blanco,violeta,magenta}', false, 3,
   'Cuarenta fichas en dos colores, con el canto biselado para levantarlas de la mesa sin uñas. Vienen en una bolsa de tela.',
   'Forty counters in two colours, with a bevelled edge so you can lift them off the table without fingernails. They come in a cloth bag.'),

  ('llavero-a-medida', (select id from categorias where slug='personalizados'),
   'Llavero a medida', 3.90, 'petg', '60 × 25 × 4 mm', '25 min',
   '{negro,blanco,violeta,magenta,gris}', true, 1,
   'Con un nombre, una fecha o un logotipo en relieve. A partir de diez unidades baja el precio por pieza, así que sale a cuenta para detalles de evento.',
   'With a name, a date or a logo in relief. The per-unit price drops from ten upwards, which makes it work for event giveaways.'),

  ('cartel-personalizado', (select id from categorias where slug='personalizados'),
   'Cartel personalizado', 22.90, 'petg', '300 × 150 × 12 mm', '7 h 00 min',
   '{negro,blanco,violeta,magenta}', true, 2,
   'Letras en relieve a dos colores, para un local o para casa. Se puede imprimir con taladros para atornillar o con la cara lisa para pegar. Mándanos el texto y te enseñamos una previsualización antes de imprimir.',
   'Two-colour raised lettering, for a shop or a home. It can be printed with holes for screws or flat-backed for adhesive. Send us the text and we''ll show you a preview before printing.')
on conflict (slug) do nothing;
