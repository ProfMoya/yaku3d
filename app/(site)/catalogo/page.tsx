import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";

export const metadata: Metadata = {
  title: "Catálogo — Yaku3D",
  description:
    "Todas nuestras piezas impresas en 3D: organizadores, deco, hogar, juegos y trabajos personalizados.",
};

export default function CatalogoPage() {
  return (
    <>
      <PageHeader seccion="catalogo" imagen="/images/headercatalogo.jpg" />
      {/* La grilla lee el filtro de la URL con useSearchParams, que necesita
          una frontera de Suspense para que la página siga siendo estática. */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <FeaturedProductsSection />
      </Suspense>
    </>
  );
}
