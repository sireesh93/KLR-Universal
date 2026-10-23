import type { Metadata } from "next";
import { HOME_URL } from "@/lib/site";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/drill-rods" },
  title: "Friction Welded Drill Rods | KLR Universal",
  description:
    "Friction welded, induction hardened drill rods from KLR Universal — 2-7/8″ (73 mm) to 13-3/8″ (340 mm), made in-house with a dedicated Heat Treatment Division.",
  openGraph: {
    title: "Friction Welded Drill Rods | KLR Universal",
    description: "Friction welded, induction hardened drill rods from KLR Universal — 2-7/8″ (73 mm) to 13-3/8″ (340 mm), made in-house with a dedicated Heat Treatment Division.",
    url: "/drilling-tools/drill-rods",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png"],
  },
};

const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

const TOOL: ToolProduct = {
  slug: "drill-rods",
  category: "drill-rods",
  categoryLabel: "KLR Drill Rods",
  title: "Drill Rods by KLR Universal",
  heroImage: HERO_IMAGE,
  bandHeading: "KLR Drill Rods — Engineered for Durability and Performance",
  bandDesc:
    "KLR Drill Rods are meticulously crafted to excel in the toughest drilling conditions. Made from high-strength alloy steel, they offer unmatched durability and reliability in extreme environments. Each rod undergoes a unique heat treatment process to enhance wear protection while induction hardening is applied to the entire rod after friction welding, ensuring superior strength and extended lifespan. The friction-welded joints create robust connections for seamless operation, while precision threading prevents leaks, enhancing operational safety and reducing equipment damage. Customizable to meet specific project needs, KLR Drill Rods deliver cost-effective performance through their exceptional longevity and efficiency. Built for long-term use, they offer enhanced reliability, reduced maintenance costs, and consistent results across a wide range of drilling applications.",
  specRows: [
    { param: "Available sizes", value: "Diameter: 2-7/8″ (73 mm) to 13-3/8″ (340 mm)" },
    { param: "API Reg Threads", value: "2-3/8″ to 4-1/2″" },
    { param: "API IF Threads", value: "2-3/8″ to 3-1/2″" },
    { param: "BECO Threads", value: "3″ to 10″" },
    { param: "DIBH Threads", value: "3-1/8″ to 4-1/8″" },
    { param: "Customizable", value: "Threads, rod position and type, pipe diameters" },
  ],
};

export default function DrillRodsPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "KLR Drill Rods",
        "url": "https://klruniversal.com/drilling-tools/drill-rods",
        "inLanguage": "en",
        "isPartOf": { "@type": "WebSite", "@id": HOME_URL },
        "about": { "@type": "Thing", "name": "Friction welded, induction hardened drill rods" },
        "publisher": { "@id": "https://klruniversal.com/#organization" },
      }} />
      <Header />
      <main className="flex-1">
        <ToolProductTemplate tool={TOOL} />
      </main>
      <Footer />
    </>
  );
}
