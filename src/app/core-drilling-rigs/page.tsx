import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { HOME_URL, SITE_URL } from "@/lib/site";

const TITLE = "Core Drilling Rigs | KLR Universal";
const DESCRIPTION =
  "CDR series core drilling rigs for mineral exploration and geotechnical investigation, NQ/HQ wireline coring to 750 m. Built in Hyderabad since 1984.";
const PATH = "/core-drilling-rigs";
const LAST_MODIFIED = "2026-11-01";
const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

// Every CDR/core/TMC/TC slug is explicitly a core drill rig by product name.
const CORE_SLUGS = [
  "core-drill-rig-150",
  "core-drill-rig-500",
  "core-drill-rig-750",
  "tmc",
  "tc-40",
  "cdr-50",
  "cdr-300",
  "cdr-1000",
  "cdr-2000",
];

const FAQ = [
  {
    q: "What is a core drilling rig used for?",
    a: "It cuts an intact cylinder of rock or soil out of the ground instead of grinding it to chips, so geologists can log the formation directly. KLR's CDR range covers mineral exploration and geotechnical site investigation.",
  },
  {
    q: "What depths does the CDR range cover?",
    a: "The CDR 150 reaches 100-200 m, the CDR 500 reaches 200-500 m, and the CDR 750 reaches up to 750 m. The CDR-50/300/1000/2000 range is specified in feet (164 to 6,561 ft) for markets that order to that standard.",
  },
  {
    q: "Does KLR's core rig support NQ/HQ wireline coring?",
    a: "Yes, the TMC 40 is built specifically for NQ/HQ wireline work, where the inner tube is retrieved through the rod string without pulling the full string out of the hole.",
  },
  {
    q: "Does KLR export core drilling rigs?",
    a: "Yes. KLR equipment is in use in more than 60 countries across Asia, Africa, the Middle East and Latin America.",
  },
];

export default function CoreDrillingRigsPage() {
  const models = products.filter((p) => CORE_SLUGS.includes(p.slug));

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
            { "@type": "ListItem", position: 2, name: "Core Drilling Rigs", item: `${SITE_URL}${PATH}` },
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
          <span className="text-black">Core Drilling Rigs</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-xl rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                Core Drilling Rigs
              </h1>
              <p className="mt-3 text-sm text-black/70">
                CDR series rigs for mineral exploration and geotechnical
                investigation, NQ/HQ wireline coring to 750 m.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              {models.length} core drill rig models
            </h2>
            <p className="mt-4 max-w-3xl">
              A core rig recovers an intact sample instead of cuttings, which
              is what exploration and geotechnical work needs for accurate
              logging. KLR's CDR range runs from the CDR 150 at 100-200 m up
              to the CDR 750 at 750 m, with the TMC 40 built for NQ/HQ
              wireline work and the CDR-50 through CDR-2000 range specified
              in feet for export markets that order that way.
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

            <CtaButton href="/contact-and-support" className="mt-6">
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
