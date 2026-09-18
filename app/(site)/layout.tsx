import { Navigation } from "@/components/navigation";
import { FooterSection } from "@/components/sections/footer-section";

/**
 * Cáscara común de todas las páginas públicas: barra de navegación arriba y
 * footer abajo. Cada página solo aporta su contenido.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">{children}</main>
      <FooterSection />
    </>
  );
}
