import type { Metadata } from "next";
import { HOME_URL } from "@/lib/site";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolCategoryListing, type ToolListItem } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolCategoryListing";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/rotary-drilling-tools" },
  title: "Tricone & Drag Bits | KLR Universal",
  description:
    "Rotary drilling tools from KLR Universal — tricone bits, drag bits and rotary accessories built in-house for water well, mining and construction drilling.",
  openGraph: {
    title: "Tricone & Drag Bits | KLR Universal",
    description: "Rotary drilling tools from KLR Universal — tricone bits, drag bits and rotary accessories built in-house for water well, mining and construction drilling.",
    url: "/drilling-tools/rotary-drilling-tools",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images/hero.jpg"],
  },
};

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images";

const ITEMS: ToolListItem[] = [
  {
    slug: "tricone-bits",
    title: "Tricone Bits",
    heroImage: `${ASSET_BASE}/tricone-bits.png`,
    blurb: "Precision bearings and hard-facing for high penetration rates and a longer service life.",
    sizes: "2-1/2″ to 16″",
  },
  {
    slug: "claw-bits",
    title: "Claw Bits",
    heroImage: `${ASSET_BASE}/claw-bits.png`,
    blurb: "Heavy-duty, customizable in size and carbide pattern for tough drilling conditions.",
    sizes: "4-1/2″ to 12-1/4″",
  },
  {
    slug: "drag-bits",
    title: "Drag Bits",
    heroImage: `${ASSET_BASE}/drag-bits.png`,
    blurb: "Carbide-imprinted and heat-treated for optimised rock compatibility and durability.",
    sizes: "3-1/2″ to 12-1/4″",
  },
];

export default function RotaryDrillingToolsPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Rotary Drilling Tools",
        "url": "https://klruniversal.com/drilling-tools/rotary-drilling-tools",
        "inLanguage": "en",
        "isPartOf": { "@type": "WebSite", "@id": HOME_URL },
        "about": { "@type": "Thing", "name": "Tricone bits, drag bits and rotary accessories" },
        "publisher": { "@id": "https://klruniversal.com/#organization" },
      }} />
      <Header />
      <main className="flex-1">
        <ToolCategoryListing
          category="rotary-drilling-tools"
          categoryLabel="Rotary Drilling Tools"
          description="KLR Universal offers a wide range of rotary drilling tools designed for maximum performance and reliability across various drilling applications. Whether you're drilling for oil, gas, water wells, or other industrial projects, KLR's tools are engineered for precision and durability, ensuring minimal downtime and consistent drilling efficiency."
          items={ITEMS}
        />
      </main>
      <Footer />
    </>
  );
}
