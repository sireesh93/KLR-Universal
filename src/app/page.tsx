import { AboutSection } from "@/components/about-section"
import { CtaBanner } from "@/components/cta-banner"
import { FeaturesSection } from "@/components/features-section"
import { Hero } from "@/components/hero"
import { MenuSection } from "@/components/menu-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StatsStrip } from "@/components/stats-strip"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <AboutSection />
        <MenuSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
