import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { NewArrivalsSection } from "@/components/sections/marquee-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { ProductDetailSection } from "@/components/sections/scrollytelling-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { ProductFeaturesSection } from "@/components/sections/product-features-section";
import { BentoSection } from "@/components/sections/bento-section";
import { LifestyleGallerySection } from "@/components/sections/lifestyle-gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />

      {/* 1. Hero con video de marca y CTA */}
      <HeroSection />

      {/* 2. Novedades */}
      <NewArrivalsSection />

      {/* 3. Catálogo con filtros por categoría */}
      <FeaturedProductsSection />

      {/* 4. Ficha de producto destacado */}
      <ProductDetailSection />

      {/* 5. Nota editorial: cómo nace una pieza */}
      <EditorialSection />

      {/* 6. Por qué Yaku3D */}
      <ProductFeaturesSection />

      {/* 7. Colecciones en grilla bento */}
      <BentoSection />

      {/* 8. El taller: piezas en uso */}
      <LifestyleGallerySection />

      {/* 9. Sobre Yaku3D */}
      <AboutSection />

      {/* 10. Testimonios */}
      <TestimonialsSection />

      {/* 11. Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
