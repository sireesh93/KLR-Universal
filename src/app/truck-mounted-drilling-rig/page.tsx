import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { HOME_URL, SITE_URL } from "@/lib/site";

const TITLE = "Truck Mounted Drilling Rig | KLR Universal";
const DESCRIPTION =
  "Truck-mounted DTH water well and piling rigs on Ashok Leyland 4x2 to 8x4 carriers, drilling to 800 m. Manufactured in Hyderabad since 1984, exported to 60+ countries.";
const PATH = "/truck-mounted-drilling-rig";
const LAST_MODIFIED = "2026-11-01";
const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

// Confirmed against products.json specRows.Carrier: every slug below lists a
// truck chassis (4x2 through 10x4 / double-truck). Models whose carrier field
// is blank in the data are left out rather than assumed.
const TRUCK_SLUGS = [
  "dthr-150",
  "dthr-300",
  "dthr-600",
  "dthr-750",
  "dth-1500-double-truck",
  "kpr",
  "kpr-water-well",
];

const FAQ = [
  {
    q: "What truck chassis does KLR mount a drilling rig on?",
    a: "Ashok Leyland as standard, from 4×2 for the smaller DTHR-150 up to 8×4 for the DTHR-750, or another make to customer request. The DTH-1500 double-truck configuration carries the rig and compressor on separate chassis for the heaviest jobs.",
  },
  {
    q: "How deep does a truck-mounted rig drill?",
    a: "Up to 800 m with the DTHR-750 for water well work, depending on formation, compressor and drill string. The smaller DTHR-150 is built for shallower, faster-moving work.",
  },
  {
    q: "Why mount a drilling rig on a truck rather than a tractor?",
    a: "A truck carrier reaches greater depths and larger hole diameters, travels faster between distant sites, and can carry a bigger onboard compressor. A tractor-mounted rig costs less and suits closer, lower-depth work.",
  },
  {
    q: "Does KLR Universal export truck-mounted rigs?",
    a: "Yes. KLR equipment is in use in more than 60 countries across Asia, Africa, the Middle East and Latin America, across more than 4,500 delivered projects.",
  },
];

export default function TruckMountedDrillingRigPage() {
  const models = products.filter((p) => TRUCK_SLUGS.includes(p.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: TITLE,
          url: `${SITE_URL}${PATH}`,
          description: DESCRIPTION,
          dateModified: LAST_MODIFIED,
          inLanguage: "en",
          isPartOf: { "@type": "WebSite", "@id": HOME_URL },
          about: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: HOME_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Truck Mounted Drilling Rig",
              item: `${SITE_URL}${PATH}`,
            },
          ],
        }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-4 text-xs text-black/50 md:px-8">
          <Link href="/" className="hover:text-klr-red">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="text-black">Truck Mounted Drilling Rig</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-xl rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                Truck Mounted Drilling Rig
              </h1>
              <p className="mt-3 text-sm text-black/70">
                DTH water well and piling rigs on Ashok Leyland 4×2 to 8×4
                carriers, drilling to 800 m. Manufactured in Hyderabad since
                1984.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              {models.length} truck-mounted models
            </h2>
            <p className="mt-4 max-w-3xl">
              A truck-mounted rig carries the drilling unit, mast and
              compressor on a dedicated chassis, built to reach greater
              depths and move faster between sites than a tractor-mounted
              unit. KLR's DTHR series covers 4×2 through 8×4 Ashok Leyland
              carriers; the DTH-1500 double-truck configuration splits the
              rig and compressor across two chassis for the heaviest jobs.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              The models
            </h2>

            <div className="mt-8 overflow-x-auto rounded-lg border border-black/10">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-klr-red text-left text-white">
                    <th className="px-5 py-3 font-semibold">Model</th>
                    <th className="px-5 py-3 font-semibold">Application</th>
                    <th className="px-5 py-3 font-semibold">Quick specs</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((m) => (
                    <tr key={m.slug} className="border-b border-black/5 align-top">
                      <td className="px-5 py-3 font-medium">
                        <Link
                          href={`/drilling-rigs/${m.category}/${m.slug}`}
                          className="hover:text-klr-red"
                        >
                          {m.title}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-black/70">{m.categoryLabel}</td>
                      <td className="px-5 py-3 text-black/70">
                        {(m.quickSpecs ?? [])
                          .map((s) => `${s.label}: ${s.value}`)
                          .join(" · ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CtaButton href="/contact-and-support" className="mt-8">
              Get a quotation
            </CtaButton>
          </div>
        </section>

        <section className="bg-klr-offwhite py-16">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Common questions
            </h2>
            <div className="mt-8 max-w-3xl divide-y divide-black/10">
              {FAQ.map((item) => (
                <div key={item.q} className="py-5">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-2 text-black/70">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
