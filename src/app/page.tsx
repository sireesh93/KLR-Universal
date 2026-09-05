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

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KLR Universal",
  url: "https://klr-universal.vercel.app",
  logo: "https://klr-universal.vercel.app/sites/klruniversal-com-3601ad32/root-8a5edab2/images/logo-klr.svg",
  description:
    "KLR Universal – trusted drilling rig & rock drilling tools manufacturer in India, delivering reliable solutions for water well, mining & construction.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Survey No. 222/1 Near Nagarjuna Nagar, Colony Cherlapally Road",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500062",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9030327878",
    email: "sales@klruniversal.com",
    contactType: "sales",
  },
  sameAs: [
    "https://www.youtube.com/@klrindustries2886",
    "https://www.linkedin.com/company/klr-industries/",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
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
