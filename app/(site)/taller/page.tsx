import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AboutSection } from "@/components/sections/about-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { LifestyleGallerySection } from "@/components/sections/lifestyle-gallery-section";

export const metadata: Metadata = {
  title: "El taller — Yaku3D",
  description:
    "Quiénes somos y cómo trabajamos: del archivo al objeto, impreso y revisado a mano.",
};

export default function TallerPage() {
  return (
    <>
      <PageHeader seccion="taller" />
      <AboutSection />
      <EditorialSection />
      <LifestyleGallerySection />
    </>
  );
}
