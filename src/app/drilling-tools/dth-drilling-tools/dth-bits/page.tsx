import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/dth-drilling-tools/dth-bits" },
  title: "DTH Bits | KLR Universal",
  description: "DTH button bits from KLR Universal \u2014 2-1/2\u2033 to 20\u2033, carbide-imprinted for strength and a lower cost per metre drilled.",
  openGraph: {
    title: "DTH Bits | KLR Universal",
    description: "DTH button bits from KLR Universal \u2014 2-1/2\u2033 to 20\u2033, carbide-imprinted for strength and a lower cost per metre drilled.",
    url: "/drilling-tools/dth-drilling-tools/dth-bits",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-bits.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "dth-bits",
  category: "dth-drilling-tools",
  categoryLabel: "DTH Drilling Tools",
  title: "DTH Bits",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-bits.png",
  bandHeading: "DTH Bits by KLR Universal",
  bandDesc:
    "Precision-designed to match the compressive strength, abrasiveness, and homogeneity of rock formations, KLR DTH Bits provide optimal drilling performance. Manufactured in-house with stringent quality checks, they offer exceptional reliability and long-lasting durability. The carbide imprinting technology enhances strength and longevity, ensuring minimal wear and lower cost per meter drilled.",
  specRows: [
    { param: "Available sizes", value: "2-1/2″ (63 mm) to 20″ (508 mm)" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function DthBitsPage() {
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
