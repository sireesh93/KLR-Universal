import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ToolCategoryTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/ToolCategoryTemplate";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/rotary-drilling-tools" },
  title: "Rotary Drilling Tools by KLR Universal",
};

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/drilling-tools-rotary-drilling-tools-92dc5dcc/images";

const FEATURES = [
  {
    title: "Tricone Bits",
    desc: "KLR Rotary Tricone Bits are built for maximum efficiency, delivering high penetration rates and reducing overall drilling costs. Featuring precision bearings that reduce wear under load and materials designed to withstand high temperatures, these bits ensure a longer lifespan. Enhanced shirttail protection prevents debris buildup, while improved cuttings evacuation keeps efficiency at its peak in diverse conditions. Reliable, cost-effective, and durable, KLR Tricone Bits ensure reduced drilling costs.",
    img: `${ASSET_BASE}/tricone-bits.png`,
    sizes: "Available sizes: 2-1/2″ (63 mm) to 12-1/4″ (311 mm), 16″ (406 mm) Customizable according to requirement",
  },
  {
    title: "Claw Bits",
    desc: "KLR heavy-duty Claw Bits are versatile and durable, excelling in various drilling tasks. Customizable in size and carbide patterns, they maximise efficiency while ensuring seamless compatibility with all drilling connections. Built for tough conditions, they deliver reliable, precise performance, ensuring smooth and effective drilling even in challenging formations.",
    img: `${ASSET_BASE}/claw-bits.png`,
    sizes: "Available sizes: 4-1/2″ (114 mm) to 12-1/4″ (311 mm) Customizable according to requirement",
  },
  {
    title: "Drag Bits",
    desc: "KLR Drag Bits are designed to deliver superior performance with optimised rock compatibility and durable construction. With advanced carbide imprinting and heat treatment technology, these bits minimize wear, enhance lifespan, and offer exceptional cost-effectiveness, making them perfect for tougher drilling conditions.",
    img: `${ASSET_BASE}/drag-bits.png`,
    sizes: "Available sizes: 3-1/2″ (89 mm) to 12-1/4″ (311 mm) Customizable according to requirement",
  },
];

export default function RotaryDrillingToolsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolCategoryTemplate
          title="Rotary Drilling Tools by KLR Universal"
          heroImage={`${ASSET_BASE}/hero.jpg`}
          bandHeading="KLR Rotary Drilling Tools"
          bandDesc="KLR Universal offers a wide range of rotary drilling tools designed for maximum performance and reliability across various drilling applications. Whether you're drilling for oil, gas, water wells, or other industrial projects, KLR's tools are engineered for precision and durability, ensuring minimal downtime and consistent drilling efficiency."
          features={FEATURES}
        />
      </main>
      <Footer />
    </>
  );
}
