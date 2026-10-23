import type { Metadata } from "next";
import { HOME_URL } from "@/lib/site";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolCategoryListing, type ToolListItem } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolCategoryListing";
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

const ITEMS: ToolListItem[] = [
  {
    slug: "dth-hammers",
    title: "DTH Hammers",
    heroImage: `${ASSET_BASE}/dth-hammers.png`,
    blurb: "Longer rebuild intervals and optimized air usage for consistent, high-efficiency drilling in tough rock.",
    sizes: "2″ to 12″",
  },
  {
    slug: "dth-bits",
    title: "DTH Bits",
    heroImage: `${ASSET_BASE}/dth-bits.png`,
    blurb: "Carbide-imprinted button bits matched to rock compressive strength, abrasiveness and homogeneity.",
    sizes: "2-1/2″ to 20″",
  },
  {
    slug: "cluster-hammers",
    title: "Cluster Hammers",
    heroImage: `${ASSET_BASE}/cluster-hammers.png`,
    blurb: "Premium alloy steel with tungsten carbide buttons for large-diameter, high-efficiency drilling.",
    sizes: "11-7/8″ to 47-1/4″",
  },
  {
    slug: "service-kits",
    title: "Service Kits",
    heroImage: `${ASSET_BASE}/dth-hammers.png`,
    blurb: "High-quality components to extend DTH hammer life and minimize downtime.",
    sizes: "Matched to your hammer size",
  },
  {
    slug: "casing-system",
    title: "Casing System",
    heroImage: `${ASSET_BASE}/dth-bits.png`,
    blurb: "Eccentric, Symmetric and Odex systems for simultaneous drilling and casing in unstable soils.",
    sizes: "Available to customer requirement",
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
        <ToolCategoryListing
          category="dth-drilling-tools"
          categoryLabel="DTH Drilling Tools"
          description="Designed for high-efficiency and durability in even the toughest drilling environments, KLR Universal's DTH tools deliver consistent, reliable performance across various applications. From high-performance DTH hammers and precision-engineered bits to cluster hammers, service kits and casing systems, KLR Universal ensures seamless, uninterrupted operations while minimizing downtime."
          items={ITEMS}
        />
      </main>
      <Footer />
    </>
  );
}
