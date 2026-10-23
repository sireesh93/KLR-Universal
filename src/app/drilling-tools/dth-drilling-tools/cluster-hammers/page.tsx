import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/dth-drilling-tools/cluster-hammers" },
  title: "Cluster Hammers | KLR Universal",
  description: "Cluster hammers from KLR Universal \u2014 11-7/8\u2033 to 47-1/4\u2033, built in premium alloy steel with tungsten carbide buttons for large-diameter drilling.",
  openGraph: {
    title: "Cluster Hammers | KLR Universal",
    description: "Cluster hammers from KLR Universal \u2014 11-7/8\u2033 to 47-1/4\u2033, built in premium alloy steel with tungsten carbide buttons for large-diameter drilling.",
    url: "/drilling-tools/dth-drilling-tools/cluster-hammers",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/cluster-hammers.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "cluster-hammers",
  category: "dth-drilling-tools",
  categoryLabel: "DTH Drilling Tools",
  title: "Cluster Hammers",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/cluster-hammers.png",
  bandHeading: "Cluster Hammers by KLR Universal",
  bandDesc:
    "Designed for high-efficiency and smooth operations, KLR Cluster Hammers use premium alloy steel with high-performance tungsten carbide buttons. These hammers minimize wear and downtime, preventing blockages and back hammering for precise, consistent drilling.",
  specRows: [
    { param: "Available sizes", value: "11-7/8″ (300 mm) to 47-1/4″ (1200 mm)" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function ClusterHammersPage() {
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
