import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/rotary-drilling-tools/claw-bits" },
  title: "Claw Bits | KLR Universal",
  description: "Heavy-duty claw bits from KLR Universal \u2014 4-1/2\u2033 to 12-1/4\u2033, customizable in size and carbide pattern for tough drilling conditions.",
  openGraph: {
    title: "Claw Bits | KLR Universal",
    description: "Heavy-duty claw bits from KLR Universal \u2014 4-1/2\u2033 to 12-1/4\u2033, customizable in size and carbide pattern for tough drilling conditions.",
    url: "/drilling-tools/rotary-drilling-tools/claw-bits",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images/claw-bits.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "claw-bits",
  category: "rotary-drilling-tools",
  categoryLabel: "Rotary Drilling Tools",
  title: "Claw Bits",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images/claw-bits.png",
  bandHeading: "Claw Bits by KLR Universal",
  bandDesc:
    "KLR heavy-duty Claw Bits are versatile and durable, excelling in various drilling tasks. Customizable in size and carbide patterns, they maximise efficiency while ensuring seamless compatibility with all drilling connections. Built for tough conditions, they deliver reliable, precise performance, ensuring smooth and effective drilling even in challenging formations.",
  specRows: [
    { param: "Available sizes", value: "4-1/2″ (114 mm) to 12-1/4″ (311 mm)" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function ClawBitsPage() {
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
