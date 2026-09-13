import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";

export const metadata: Metadata = {
  alternates: { canonical: "/drilling-tools/drill-rods" },
  title: "Drill Rods by KLR Universal",
  description:
    "Friction welded, induction hardened drill rods from KLR Universal — 2-7/8″ (73 mm) to 13-3/8″ (340 mm), made in-house with a dedicated Heat Treatment Division.",
};

const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

const WHY_US = [
  "40+ years of expertise",
  "Industry leader",
  "Trusted in 60 countries",
  "Excellent after-sales support",
];

const SPEC_ROWS = [
  { param: "Available sizes", value: "Diameter: 2-7/8″ (73 mm) to 13-3/8″ (340 mm)" },
  { param: "API Reg Threads", value: "2-3/8″ to 4-1/2″" },
  { param: "API IF Threads", value: "2-3/8″ to 3-1/2″" },
  { param: "BECO Threads", value: "3″ to 10″" },
  { param: "DIBH Threads", value: "3-1/8″ to 4-1/8″" },
  { param: "Customizable", value: "Threads, rod position and type, pipe diameters" },
];

export default function DrillRodsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-4 text-xs text-black/50 md:px-8">
          <Link href="/" className="hover:text-klr-red">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span>Products</span>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span>Drilling Tools</span>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="text-black">Drill Rods</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-md rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                Drill Rods by KLR Universal
              </h1>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              KLR Drill Rods — Engineered for Durability and Performance
            </h2>
            <p className="mt-4 max-w-3xl text-white">
              KLR Drill Rods are meticulously crafted to excel in the toughest
              drilling conditions. Made from high-strength alloy steel, they
              offer unmatched durability and reliability in extreme
              environments. Each rod undergoes a unique heat treatment
              process to enhance wear protection while induction hardening is
              applied to the entire rod after friction welding, ensuring
              superior strength and extended lifespan. The friction-welded
              joints create robust connections for seamless operation, while
              precision threading prevents leaks, enhancing operational
              safety and reducing equipment damage. Customizable to meet
              specific project needs, KLR Drill Rods deliver cost-effective
              performance through their exceptional longevity and
              efficiency. Built for long-term use, they offer enhanced
              reliability, reduced maintenance costs, and consistent results
              across a wide range of drilling applications.
            </p>
          </div>
        </section>

        <section className="bg-klr-offwhite py-16">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Product Specifications
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
              <div className="rounded-lg bg-white p-5">
                <h3 className="font-semibold">Why KLR Universal</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-black/70">
                  {WHY_US.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <CtaButton href="/contact-and-support" className="mt-4">
                  Contact & Support
                </CtaButton>
              </div>

              <div className="overflow-x-auto rounded-lg bg-white">
                <table className="w-full min-w-[500px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-klr-red text-left text-white">
                      <th className="px-5 py-3 font-semibold">Parameter</th>
                      <th className="px-5 py-3 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SPEC_ROWS.map((row) => (
                      <tr key={row.param} className="border-b border-black/5 align-top">
                        <td className="px-5 py-3 font-medium">{row.param}</td>
                        <td className="px-5 py-3 text-black/70">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
