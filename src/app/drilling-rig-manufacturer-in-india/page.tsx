import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { SITE_URL } from "@/lib/site";

const TITLE = "Drilling Rig Manufacturer in India | KLR Universal";
const DESCRIPTION =
  "Hydraulic drilling rigs built in Hyderabad since 1984. Water well, mining, construction, exploration and underground rigs, with tooling made in-house.";
const PATH = "/drilling-rig-manufacturer-in-india";

export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

/** Depth ranges are written out rather than derived: the quickSpecs strings are
 *  free text ("100–200 m", "Up to 30 m") and do not parse reliably. Model
 *  counts come from the product data so the table cannot drift. Hole diameter
 *  is deliberately absent until the CDR figures are confirmed. */
const RANGES = [
  {
    category: "water-well",
    label: "Water well",
    depth: "100 to 800 m",
    use: "Borewells and water supply, from shallow tube wells to deep production wells.",
  },
  {
    category: "surface-mining",
    label: "Surface mining and quarrying",
    depth: "up to 60 m",
    use: "Blast hole drilling in open-cast mines and quarries, down-the-hole and top hammer.",
  },
  {
    category: "construction",
    label: "Construction and piling",
    depth: "up to 50 m",
    use: "Foundation piling, pole holes and auger work on construction sites.",
  },
  {
    category: "exploration",
    label: "Exploration and core drilling",
    depth: "50 to 750 m",
    use: "Mineral exploration and geotechnical investigation where core recovery matters.",
  },
  {
    category: "underground-drill-rigs",
    label: "Underground",
    depth: "up to 50 m",
    use: "Production drilling in confined underground workings.",
  },
];

const FAQ = [
  {
    q: "How deep can a KLR drilling rig drill?",
    a: "Up to 800 m with the DTHR-750 for water well work, and up to 750 m with the CDR 750 for core drilling. Actual depth depends on the formation, the compressor and the drill string.",
  },
  {
    q: "Does KLR Universal supply drilling tools as well as rigs?",
    a: "Yes. Down-the-hole hammers and bits, rotary drilling tools and drill rods are manufactured in the same plant as the rigs, so the rig and its consumables come from one supplier.",
  },
  {
    q: "Does KLR Universal export drilling rigs?",
    a: "Yes. KLR equipment is in use in more than 60 countries across Asia, Africa, the Middle East and Latin America, across more than 4,500 delivered projects.",
  },
  {
    q: "How is a drilling rig priced?",
    a: "Every rig is configured to the application, so a price follows a specification. Send the target depth, hole diameter and formation to sales@klruniversal.com for a quotation.",
  },
  {
    q: "Where is KLR Universal located?",
    a: "The plant is at Survey No. 222/1, Near Nagarjuna Nagar, Colony Cherlapally Road, RR District, Hyderabad 500062, Telangana, India.",
  },
];

export default function DrillingRigManufacturerIndiaPage() {
  const counts = new Map<string, number>();
  for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: TITLE,
          url: `${SITE_URL}${PATH}`,
          description: DESCRIPTION,
          inLanguage: "en",
          isPartOf: { "@type": "WebSite", "@id": SITE_URL },
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
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Drilling Rig Manufacturer in India",
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
          <span className="text-black">Drilling Rig Manufacturer in India</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-xl rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                Drilling Rig Manufacturer in India
              </h1>
              <p className="mt-3 text-sm text-black/70">
                Hydraulic drilling rigs and rock drilling tools, manufactured in
                Hyderabad since 1984 and in service in over 60 countries.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              {products.length} rig models, and the tools that run on them
            </h2>
            <p className="mt-4 max-w-3xl">
              KLR Universal has manufactured hydraulic drilling rigs in Hyderabad
              since 1984, when Mr K. Laxma Reddy started the city&rsquo;s first
              drill tool manufacturing unit. The company builds rigs for five
              applications and makes the drilling tools that go with them in the
              same plant, backed by its own Heat Treatment Division. Equipment is
              in service in more than 60 countries, across more than 4,500
              delivered projects.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              The range
            </h2>
            <p className="mt-3 max-w-3xl text-black/70">
              Every rig is hydraulic and configured to the job: the depth you need
              to reach, the hole diameter, the formation, and how the rig has to
              be carried to site.
            </p>

            <div className="mt-8 overflow-x-auto rounded-lg border border-black/10">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-klr-red text-left text-white">
                    <th className="px-5 py-3 font-semibold">Range</th>
                    <th className="px-5 py-3 font-semibold">Models</th>
                    <th className="px-5 py-3 font-semibold">Depth</th>
                    <th className="px-5 py-3 font-semibold">Typical use</th>
                  </tr>
                </thead>
                <tbody>
                  {RANGES.map((range) => (
                    <tr key={range.category} className="border-b border-black/5 align-top">
                      <td className="px-5 py-3 font-medium">
                        <Link
                          href={`/product_category/${range.category}`}
                          className="hover:text-klr-red"
                        >
                          {range.label}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-black/70">
                        {counts.get(range.category) ?? 0}
                      </td>
                      <td className="px-5 py-3 text-black/70">{range.depth}</td>
                      <td className="px-5 py-3 text-black/70">{range.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-klr-offwhite py-16">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-medium leading-tight md:text-4xl">
                  Everything made under one roof
                </h2>
                <p className="mt-4 text-black/70">
                  KLR manufactures its own rock drilling tools alongside the rigs:{" "}
                  <Link
                    href="/drilling-tools/dth-drilling-tools"
                    className="text-klr-red hover:underline"
                  >
                    down-the-hole hammers and bits
                  </Link>
                  ,{" "}
                  <Link
                    href="/drilling-tools/rotary-drilling-tools"
                    className="text-klr-red hover:underline"
                  >
                    rotary tools
                  </Link>
                  , and{" "}
                  <Link
                    href="/drilling-tools/drill-rods"
                    className="text-klr-red hover:underline"
                  >
                    friction welded, induction hardened drill rods
                  </Link>{" "}
                  from 2-7/8&Prime; (73 mm) to 13-3/8&Prime; (340 mm). A dedicated
                  Heat Treatment Division handles the hardening in-house. For a
                  buyer this means the rig and the consumables it runs on come
                  from one supplier, and a worn tool can be replaced without
                  hunting for a compatible part.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-medium leading-tight md:text-4xl">
                  How to choose a rig
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-black/70">
                  <li>
                    <strong className="text-black">Start with depth.</strong> Water
                    well work at 100 to 200 m points to the DTHR-150; 650 to 800 m
                    to the DTHR-750.
                  </li>
                  <li>
                    <strong className="text-black">Then hole diameter.</strong> This
                    decides the hammer and bit sizes, and often the compressor.
                  </li>
                  <li>
                    <strong className="text-black">Then the formation.</strong> Hard
                    rock usually favours down-the-hole drilling; softer and
                    unconsolidated ground favours rotary.
                  </li>
                  <li>
                    <strong className="text-black">Then mounting.</strong> Truck,
                    crawler or tractor mounting depends on terrain and how often
                    the rig moves.
                  </li>
                </ul>
                <CtaButton href="/contact-and-support" className="mt-6">
                  Get a quotation
                </CtaButton>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
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
