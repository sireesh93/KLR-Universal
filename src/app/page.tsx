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
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "KLR Universal",
  url: SITE_URL,
  logo: `${SITE_URL}/sites/klruniversal-com-3601ad32/root-8a5edab2/images/logo-klr.svg`,
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

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KLR Universal",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WEBSITE_JSON_LD).replace(/</g, "\\u003c"),
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
