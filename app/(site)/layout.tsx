import { Navigation } from "@/components/navigation";
import { FooterSection } from "@/components/sections/footer-section";
import { VideoBackground } from "@/components/video-background";

/**
 * Cáscara común de todas las páginas públicas: video de fondo, barra de
 * navegación arriba y footer abajo. Cada página solo aporta su contenido.
 *
 * El panel de /admin no pasa por aquí, y es deliberado: es una herramienta de
 * trabajo, no le hace falta un video detrás.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <VideoBackground />
      <Navigation />
      <main className="overflow-x-hidden">{children}</main>
      <FooterSection />
    </>
  );
}
