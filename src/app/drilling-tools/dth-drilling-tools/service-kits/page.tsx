import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/dth-drilling-tools/service-kits" },
  title: "DTH Service Kits | KLR Universal",
  description: "Service kits from KLR Universal for DTH hammer maintenance \u2014 high-quality components to minimise downtime and extend tool life.",
  openGraph: {
    title: "DTH Service Kits | KLR Universal",
    description: "Service kits from KLR Universal for DTH hammer maintenance \u2014 high-quality components to minimise downtime and extend tool life.",
    url: "/drilling-tools/dth-drilling-tools/service-kits",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-hammers.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "service-kits",
  category: "dth-drilling-tools",
  categoryLabel: "DTH Drilling Tools",
  title: "Service Kits",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-hammers.png",
  bandHeading: "Service Kits by KLR Universal",
  bandDesc:
    "Extend the life of your DTH equipment with KLR Service Kits. These kits are designed to maximize the performance and reliability of your tools, ensuring minimal downtime. With high-quality components, KLR Service Kits deliver unmatched durability and ensure continuous, efficient drilling.",
  specRows: [
    { param: "Available sizes", value: "Matched to your hammer size" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function ServiceKitsPage() {
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
