import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getProducto, getRelacionados, productos } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

/** Todas las fichas se generan en el build: el catálogo es estático. */
export function generateStaticParams() {
  return productos.map((producto) => ({ slug: producto.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProducto(slug);

  if (!producto) return { title: "Yaku3D" };

  return {
    title: `${producto.nombre} — Yaku3D`,
    description: `${producto.nombre}, impreso en 3D en el taller de Yaku3D.`,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = getProducto(slug);

  if (!producto) notFound();

  return (
    <ProductDetail producto={producto} relacionados={getRelacionados(producto)} />
  );
}
