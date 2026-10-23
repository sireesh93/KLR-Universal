import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolProductTemplate, type ToolProduct } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolProductTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/dth-drilling-tools/dth-hammers" },
  title: "DTH Hammers | KLR Universal",
  description: "DTH hammers from KLR Universal \u2014 2\u2033 to 12\u2033, manufactured in-house with advanced air control technology for consistent, high-efficiency drilling.",
  openGraph: {
    title: "DTH Hammers | KLR Universal",
    description: "DTH hammers from KLR Universal \u2014 2\u2033 to 12\u2033, manufactured in-house with advanced air control technology for consistent, high-efficiency drilling.",
    url: "/drilling-tools/dth-drilling-tools/dth-hammers",
    type: "website",
    images: ["/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-hammers.png"],
  },
};

const TOOL: ToolProduct = {
  slug: "dth-hammers",
  category: "dth-drilling-tools",
  categoryLabel: "DTH Drilling Tools",
  title: "DTH Hammers",
  heroImage: "/sites/klruniversal-com-3601ad32/drilling-tools-dth-drilling-tools-bfd58456/images/dth-hammers.png",
  bandHeading: "DTH Hammers by KLR Universal",
  bandDesc:
    "KLR DTH Hammers are engineered to provide superior performance with longer rebuild intervals, reducing downtime and maximising productivity. With optimized air usage, these hammers boost efficiency while consuming less compressor power. Built for tough rock formations, they feature advanced air control technology for consistent, high-efficiency drilling.",
  specRows: [
    { param: "Available sizes", value: "2″ (51 mm) to 12″ (305 mm)" },
    { param: "Customizable", value: "Available to customer requirement" },
  ],
};

export default function DthHammersPage() {
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
