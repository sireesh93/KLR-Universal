import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/rotary-drilling-tools/drag-bits" },
  title: "Drag Bits | KLR Universal",
  description: "Drag bits from KLR Universal \u2014 3-1/2\u2033 to 12-1/4\u2033, carbide-imprinted and heat-treated for tough drilling conditions.",
  openGraph: {
    title: "Drag Bits | KLR Universal",
    description: "Drag bits from KLR Universal \u2014 3-1/2\u2033 to 12-1/4\u2033, carbide-imprinted and heat-treated for tough drilling conditions.",
    url: "/drilling-tools/rotary-drilling-tools/drag-bits",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images/drag-bits.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "drag-bits",
  category: "rotary-drilling-tools",
  categoryLabel: "Rotary Drilling Tools",
  title: "Drag Bits",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images/drag-bits.png",
  bandHeading: "Drag Bits by KLR Universal",
  bandDesc:
    "KLR Drag Bits are designed to deliver superior performance with optimised rock compatibility and durable construction. With advanced carbide imprinting and heat treatment technology, these bits minimize wear, enhance lifespan, and offer exceptional cost-effectiveness, making them perfect for tougher drilling conditions.",
  specRows: [
    { param: "Available sizes", value: "3-1/2″ (89 mm) to 12-1/4″ (311 mm)" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function DragBitsPage() {
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
