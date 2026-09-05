import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ContactForm } from "@/components/sites/klruniversal-com-3601ad32/shared/ContactForm";
import { LegacyTimeline } from "@/components/sites/klruniversal-com-3601ad32/about-us-57424c1f/LegacyTimeline";

export const metadata: Metadata = {
  title: "About Us | KLR Universal",
  description:
    "From humble beginnings as Hyderabad's first drill tools manufacturer to a globally recognised name in drilling technologies — the KLR Universal story.",
};

const ASSET_BASE = "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images";
const HOME_ASSET_BASE = "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const TIMELINE = [
  { year: "1984", text: "Founded by Mr. K. Laxma Reddy – Hyderabad's first drill tool manufacturer" },
  { year: "1996", text: "Began full-scale rig manufacturing operations" },
  { year: "1999", text: "Export breakthrough – first rig supplied to Uganda" },
  { year: "2004", text: "Manufactured and supplied our first core drilling rig" },
  { year: "2006", text: "Won Export Excellence Award from EEPC, reaching 56+ countries" },
  { year: "2014", text: "Developed and delivered the first pole drilling rig" },
  { year: "2025", text: "Advancing into Blast Holes and Underground Jumbos" },
];

const SOLUTIONS = [
  { icon: "solution-icon-waterwell.svg", title: "Water Well Drilling" },
  { icon: "solution-icon-mining.svg", title: "Mining & Blast Hole Drilling" },
  { icon: "solution-icon-construction.svg", title: "Construction & Foundation" },
  { icon: "solution-icon-piling.svg", title: "Piling & Exploration" },
  { icon: "category-icon-tools.png", title: "Drilling Tools", fromHome: true },
];

const TOOLS = [
  { icon: "tool-icon-dth.svg", title: "DTH Tools (Down the hole)" },
  { icon: "tool-icon-rotary.svg", title: "Rotary Drilling Tools (Tricones)" },
  { icon: "tool-icon-rotary.svg", title: "Drill Rods" },
];

const PILLARS = [
  {
    icon: "pillar-icon-product-dev.svg",
    title: "Product Development",
    text: "Engineering excellence that adapts to evolving needs",
  },
  {
    icon: "pillar-icon-capacity.svg",
    title: "Capacity Expansion",
    text: "In-house scale and flexibility for global delivery",
  },
  {
    icon: "pillar-icon-process.svg",
    title: "Process Improvement",
    text: "Lean, agile systems backed by R&D",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-klr-header py-10">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-8">
            <div>
              <h1 className="text-3xl font-medium leading-tight md:text-4xl">
                Delivering Reliable Drilling. Since 1984.
              </h1>
              <p className="mt-3 text-black/70">
                Innovative, reliable, and cost-efficient drilling solutions
              </p>
            </div>
            <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-klr-offwhite md:h-[260px]">
              <Image
                src={`${ASSET_BASE}/hero-banner-collage.png`}
                alt="KLR Universal drilling rigs collage"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* Determined to Deliver */}
        <section className="relative overflow-hidden bg-klr-red py-16 text-white">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-4 md:grid-cols-2 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Determined to Deliver. Built to Endure.
            </h2>
            <div>
              <p className="text-white">
                We specialise in end-to-end manufacturing of advanced
                drilling rigs and rock drilling tools (RDTs) that perform in
                the most demanding environments. All components are made
                in-house at our world-class facilities, including a
                cutting-edge Heat Treatment Division that ensures enhanced
                durability and long service life.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "ISO 9001:2015 Certified",
                  "Customised Configurations & Power Options",
                  "Backed by Dedicated After-Sales Support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="size-4 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4 Decades of Legacy */}
        <section className="bg-klr-offwhite py-16">
          <div className="mx-auto max-w-[1400px] px-4 text-center md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              4 Decades Of Legacy
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-black/70">
              From humble beginnings as Hyderabad&rsquo;s first drill tools
              manufacturer to becoming a globally recognised name in drilling
              technologies, our journey is defined by engineering excellence,
              customer trust, and bold innovation.
            </p>

            <LegacyTimeline items={TIMELINE} />

            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 text-left sm:grid-cols-2 md:hidden">
              {TIMELINE.map((t) => (
                <div key={t.year} className="rounded-lg border border-black/10 bg-white p-5">
                  <p className="text-xl font-semibold text-klr-red">{t.year}</p>
                  <p className="mt-1 text-sm text-black/70">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Designed for Precision */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1400px] px-4 text-center md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Designed for Precision. Built for Every Terrain.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-black/60">
              We offer a complete range of high-performance drilling
              equipment for a variety of applications.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {SOLUTIONS.map((s) => (
                <div
                  key={s.title}
                  className="flex flex-col items-center gap-3 rounded-lg border border-black/10 bg-klr-offwhite p-5"
                >
                  <div className="flex size-14 items-center justify-center rounded-lg bg-klr-red">
                    <Image
                      src={`${s.fromHome ? HOME_ASSET_BASE : ASSET_BASE}/${s.icon}`}
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <p className="text-sm font-medium">{s.title}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-16 text-xl font-medium">
              Alongside Our Rigs, We Supply Industry-Trusted Drilling Tools.
            </h3>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {TOOLS.map((t) => (
                <div
                  key={t.title}
                  className="flex flex-col items-center gap-3 rounded-lg border border-black/10 bg-klr-offwhite p-5"
                >
                  <div className="flex size-14 items-center justify-center rounded-lg bg-klr-red">
                    <Image src={`${ASSET_BASE}/${t.icon}`} alt="" width={32} height={32} />
                  </div>
                  <p className="text-sm font-medium">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Precision is Just the Beginning */}
        <section className="bg-klr-red py-16 text-white">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="text-3xl font-medium leading-tight md:text-4xl">
                Precision is Just the Beginning.
              </h2>
              <p className="mt-4 text-white">
                Our success is built on a three-pillar approach: This
                unwavering commitment ensures better performance, lower
                downtime, and greater ROI for our customers.
              </p>
              <p className="mt-4 text-sm text-white/70">
                Awarded multiple times by EEPC and Economic Development
                bodies for innovation, quality, and customer satisfaction.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="flex items-center gap-4 rounded-lg bg-white p-5 text-black"
                >
                  <Image src={`${ASSET_BASE}/${p.icon}`} alt="" width={36} height={36} />
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-black/60">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Reach */}
        <section className="bg-klr-offwhite py-16">
          <div className="mx-auto max-w-[1400px] px-4 text-center md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Global Reach. Local Support.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-black/70">
              Today, we serve clients in 60+ countries with a powerful
              combination of export capability and after-sales service. Our
              wide dealer and service network spans Africa, the Middle East,
              and beyond, ensuring you&rsquo;re never far from expert support.
            </p>

            <div className="relative mx-auto mt-10 aspect-[1000/647] w-full max-w-3xl">
              <Image
                src={`${ASSET_BASE}/world-map.svg`}
                alt="Global presence map"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
