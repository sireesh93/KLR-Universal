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
import { HOME_URL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "KLR Universal",
  // The company's own LinkedIn and YouTube channels (see sameAs) are published
  // as "KLR Industries", and the Google Business Profile is "KLR Industries
  // Limited". Three names for one manufacturer leaves search and AI engines
  // unable to resolve the entity, so the alternates are declared here to bind
  // them together. legalName is deliberately absent until the client confirms
  // the registered entity name -- asserting one unverified would be worse than
  // omitting it.
  alternateName: ["KLR Industries", "KLR"],
  url: HOME_URL,
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
  foundingDate: "1984",
  founder: { "@type": "Person", name: "K. Laxma Reddy", jobTitle: "Founder" },
  slogan: "Delivering Reliable Drilling. Since 1984.",
  areaServed: { "@type": "Place", name: "60+ countries across Asia, Africa, the Middle East and Latin America" },
  knowsAbout: [
    "Water well drilling rigs",
    "Down the hole (DTH) drilling tools",
    "Rotary drilling tools",
    "Surface mining and quarrying drill rigs",
    "Core and exploration drilling rigs",
    "Construction and piling rigs",
    "Drill rods",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "ISO 9001:2015 Quality Management System",
  },
  award: "EEPC Export Excellence Award",
  sameAs: [
    "https://www.youtube.com/@klrindustries2886",
    "https://www.linkedin.com/company/klr-industries/",
  ],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KLR Universal",
  url: HOME_URL,
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
