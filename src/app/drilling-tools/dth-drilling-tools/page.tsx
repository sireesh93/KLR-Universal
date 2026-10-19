import type { Metadata } from "next";
import { HOME_URL } from "@/lib/site";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolCategoryTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolCategoryTemplate";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/dth-drilling-tools" },
  title: "DTH Drilling Tools | KLR Universal",
  description:
    "Down The Hole drilling tools from KLR Universal — DTH hammers, button bits and accessories manufactured in-house for water well and mining applications.",
  openGraph: {
    title: "DTH Drilling Tools | KLR Universal",
    description: "Down The Hole drilling tools from KLR Universal — DTH hammers, button bits and accessories manufactured in-house for water well and mining applications.",
    url: "/drilling-tools/dth-drilling-tools",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/hero.jpg"],
  },
};

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images";

const FEATURES = [
  {
    title: "DTH Hammers",
    desc: "KLR DTH Hammers are engineered to provide superior performance with longer rebuild intervals, reducing downtime and maximise productivity. With optimized air usage, these hammers boost efficiency while consuming less compressor power. Built for tough rock formations, they feature advanced air control technology for consistent, high-efficiency drilling.",
    img: `${ASSET_BASE}/dth-hammers.png`,
    sizes: "Available sizes: 2″ (51mm) to 12″ (305mm) Customizable according to requirement",
  },
  {
    title: "DTH Bits",
    desc: "Precision-designed to match the compressive strength, abrasiveness, and homogeneity of rock formations, KLR DTH Bits provide optimal drilling performance. Manufactured in-house with stringent quality checks, they offer exceptional reliability and long-lasting durability. The carbide imprinting technology enhances strength and longevity, ensuring minimal wear and lower cost per meter drilled.",
    img: `${ASSET_BASE}/dth-bits.png`,
    sizes: "Available sizes: 2-1/2″ (63mm) to 20″ (508mm) Customizable according to requirement",
  },
  {
    title: "Cluster Hammers",
    desc: "Designed for high-efficiency and smooth operations, KLR Cluster Hammers use premium alloy steel with high-performance tungsten carbide buttons. These hammers minimize wear and downtime, preventing blockages and back hammering for precise, consistent drilling.",
    img: `${ASSET_BASE}/cluster-hammers.png`,
    sizes: "Available sizes: 11-7/8″ (300mm) to 47-1/4″ (1200mm) Customizable according to requirement",
  },
  {
    title: "Service Kits",
    desc: "Extend the life of your DTH equipment with KLR Service Kits. These kits are designed to maximize the performance and reliability of your tools, ensuring minimal downtime. With high-quality components, KLR Service Kits deliver unmatched durability and ensure continuous, efficient drilling.",
    img: `${ASSET_BASE}/dth-hammers.png`,
    sizes: null,
  },
];

export default function DthDrillingToolsPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Down The Hole (DTH) Drilling Tools",
        "url": "https://klruniversal.com/drilling-tools/dth-drilling-tools",
        "inLanguage": "en",
        "isPartOf": { "@type": "WebSite", "@id": HOME_URL },
        "about": { "@type": "Thing", "name": "DTH hammers, button bits and accessories" },
        "publisher": { "@id": "https://klruniversal.com/#organization" },
      }} />
      <Header />
      <main className="flex-1">
        <ToolCategoryTemplate
          title="DTH Tools by KLR Universal"
          heroImage={`${ASSET_BASE}/hero.jpg`}
          bandHeading="KLR DTH Hammers, DTH Bits, Cluster Hammers, and Service Kits"
          bandDesc="Designed for high-efficiency and durability in even the toughest drilling environments, KLR Universal's DTH tools deliver consistent, reliable performance across various applications. From high-performance DTH hammers and precision-engineered bits to cluster hammers and all-in-one service kits, KLR Universal ensures seamless, uninterrupted operations while minimizing downtime."
          features={FEATURES}
        />
      </main>
      <Footer />
    </>
  );
}
