import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/dth-drilling-tools/casing-system" },
  title: "Casing System | KLR Universal",
  description: "Eccentric, Symmetric and Odex casing systems from KLR Universal for simultaneous drilling and casing installation in unstable soils.",
  openGraph: {
    title: "Casing System | KLR Universal",
    description: "Eccentric, Symmetric and Odex casing systems from KLR Universal for simultaneous drilling and casing installation in unstable soils.",
    url: "/drilling-tools/dth-drilling-tools/casing-system",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-bits.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "casing-system",
  category: "dth-drilling-tools",
  categoryLabel: "DTH Drilling Tools",
  title: "Casing System",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-bits.png",
  bandHeading: "Eccentric, Symmetric & Odex Casing System",
  bandDesc:
    "The KLR Eccentric, Symmetric, and Odex Casing System is built for drilling in unstable soils, enabling simultaneous drilling and casing installation. Ideal for foundation piling and deep boreholes, it prevents soil collapse while ensuring stability and precision, minimizing downtime and costs on challenging ground.",
  specRows: [
    { param: "Available sizes", value: "Available to customer requirement" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function CasingSystemPage() {
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
