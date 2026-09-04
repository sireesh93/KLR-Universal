import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Hero } from "@/components/sites/klruniversal-com-3601ad32/root-8a5edab2/Hero";
import { WhyUs } from "@/components/sites/klruniversal-com-3601ad32/root-8a5edab2/WhyUs";
import { ProductCategories } from "@/components/sites/klruniversal-com-3601ad32/root-8a5edab2/ProductCategories";
import { Flagship } from "@/components/sites/klruniversal-com-3601ad32/root-8a5edab2/Flagship";
import { VideoSection } from "@/components/sites/klruniversal-com-3601ad32/root-8a5edab2/VideoSection";
import { Highlights } from "@/components/sites/klruniversal-com-3601ad32/root-8a5edab2/Highlights";
import { BlogResources } from "@/components/sites/klruniversal-com-3601ad32/root-8a5edab2/BlogResources";
import { ContactForm } from "@/components/sites/klruniversal-com-3601ad32/shared/ContactForm";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyUs />
        <ProductCategories />
        <Flagship />
        <VideoSection />
        <Highlights />
        <BlogResources />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
