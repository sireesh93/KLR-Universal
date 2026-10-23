import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/rotary-drilling-tools/tricone-bits" },
  title: "Tricone Bits | KLR Universal",
  description: "Tricone drilling bits from KLR Universal \u2014 2-1/2\u2033 to 16\u2033, precision-bearinged for high penetration rates and a longer service life.",
  openGraph: {
    title: "Tricone Bits | KLR Universal",
    description: "Tricone drilling bits from KLR Universal \u2014 2-1/2\u2033 to 16\u2033, precision-bearinged for high penetration rates and a longer service life.",
    url: "/drilling-tools/rotary-drilling-tools/tricone-bits",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images/tricone-bits.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "tricone-bits",
  category: "rotary-drilling-tools",
  categoryLabel: "Rotary Drilling Tools",
  title: "Tricone Bits",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images/tricone-bits.png",
  bandHeading: "Tricone Bits by KLR Universal",
  bandDesc:
    "KLR Rotary Tricone Bits are built for maximum efficiency, delivering high penetration rates and reducing overall drilling costs. Featuring precision bearings that reduce wear under load and materials designed to withstand high temperatures, these bits ensure a longer lifespan. Enhanced shirttail protection prevents debris buildup, while improved cuttings evacuation keeps efficiency at its peak in diverse conditions.",
  specRows: [
    { param: "Available sizes", value: "2-1/2″ (63 mm) to 12-1/4″ (311 mm), 16″ (406 mm)" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function TriconeBitsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolProductTemplate tool={TOOL} />
      </main>
      <Footer />
    </>
  );
}
