-- Yaku3D — elimina la tabla de pedidos
--
-- Decision de producto: todo el embudo de pedidos a medida va a WhatsApp, el
-- formulario no guarda nada en la base. La tabla queda sin uso.
--
-- No se deja "por si acaso": su politica `pedidos: insert publico` permite a
-- cualquiera con la publishable key insertar filas sin limite. Sin nada que la
-- consuma, eso es solo superficie de ataque para spam.
--
-- Si mas adelante se quiere guardar una copia de cada pedido, se vuelve a
-- crear desde 0001_init.sql, que la conserva documentada en el historial.

drop table if exists pedidos;
