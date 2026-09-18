import { HeroSection } from "@/components/sections/hero-section";
import { NewArrivalsSection } from "@/components/sections/marquee-section";
import { BentoSection } from "@/components/sections/bento-section";
import { ProductFeaturesSection } from "@/components/sections/product-features-section";
import { CtaPedidoSection } from "@/components/sections/cta-pedido-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactoRapidoSection } from "@/components/sections/contacto-rapido-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewArrivalsSection />
      <BentoSection />
      <ProductFeaturesSection />
      <CtaPedidoSection />
      <TestimonialsSection />
      <ContactoRapidoSection />
    </>
  );
}
