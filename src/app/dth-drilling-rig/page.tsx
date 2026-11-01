import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { HOME_URL, SITE_URL } from "@/lib/site";

const TITLE = "DTH Drilling Rig | KLR Universal";
const DESCRIPTION =
  "DTHR series down-the-hole drilling rigs, 100 to 800 m, 4.5″ to 24″ hole diameter. Rig and DTH hammer both made in-house in Hyderabad since 1984.";
const PATH = "/dth-drilling-rig";
const LAST_MODIFIED = "2026-11-01";
const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

// Every slug prefixed dthr- or dth- is a down-the-hole rig by name in the
// product data itself, not inferred from category.
const DTH_SLUGS = [
  "dthr-150",
  "dthr-300",
  "dthr-600",
  "dthr-750",
  "dthr-100",
  "dth-1500",
  "dth-1500-double-truck",
  "dth-2500",
];

const FAQ = [
  {
    q: "What is a DTH drilling rig?",
    a: "A down-the-hole rig drives a pneumatic hammer directly behind the bit, at the bottom of the hole, rather than transmitting rotation and impact down a long drill string from the surface. This keeps the strike energy concentrated at the rock face, so DTH holds a straighter line and drills harder formations faster than top-drive rotary.",
  },
  {
    q: "Which KLR rig covers which depth?",
    a: "The DTHR-150 covers 100-200 m, DTHR-300 covers 200-400 m, DTHR-600 covers 400-650 m, and the DTHR-750 reaches 650-800 m. The DTH-1500 and DTH-2500 are sized in feet (1,500 ft and 2,500 ft) for markets that spec that way.",
  },
  {
    q: "Does KLR make the DTH hammer as well as the rig?",
    a: "Yes. Hammers and bits come from the same plant, with hardening done in-house by KLR's own Heat Treatment Division, so the rig and its consumable wear parts come from one supplier.",
  },
  {
    q: "What's the difference between the DTHR and DTH-1500/2500 ranges?",
    a: "The DTHR series is specified in metres for the Indian and nearby export markets. The DTH-1500, DTH-1500 Double Truck and DTH-2500 are the same rig family specified in feet for markets that order to that standard; the double-truck configuration splits the rig and compressor across two chassis for the deepest jobs.",
  },
];

export default function DthDrillingRigPage() {
  const models = products.filter((p) => DTH_SLUGS.includes(p.slug));

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
            { "@type": "ListItem", position: 2, name: "DTH Drilling Rig", item: `${SITE_URL}${PATH}` },
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
          <span className="text-black">DTH Drilling Rig</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-xl rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                DTH Drilling Rig
              </h1>
              <p className="mt-3 text-sm text-black/70">
                Down-the-hole rigs from 100 to 800 m, 4.5&Prime; to 24&Prime;
                hole diameter. Rig and hammer both made in Hyderabad since
                1984.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              {models.length} down-the-hole rig models
            </h2>
            <p className="mt-4 max-w-3xl">
              A DTH rig fires the hammer right behind the bit instead of
              rotating a drill string from the surface, which is why it is
              the standard choice once the ground turns to hard rock. KLR's
              DTHR series runs from the DTHR-150 at 100-200 m up to the
              DTHR-750 at 650-800 m, with the DTH-1500/2500 range built to
              the same specification in feet for export markets that order
              that way.
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

            <p className="mt-6 max-w-3xl text-black/70">
              DTH hammers and bits for these rigs are built in the same
              plant:{" "}
              <Link href="/drilling-tools/dth-drilling-tools" className="text-klr-red hover:underline">
                browse the DTH tooling range
              </Link>
              .
            </p>

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
