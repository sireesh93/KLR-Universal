import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { HOME_URL, SITE_URL } from "@/lib/site";

const TITLE = "Mining Rig | KLR Universal";
const DESCRIPTION =
  "Surface and underground mining rigs: DTH and top hammer blast-hole drills to 30 m, in-the-hole underground drills to 50 m. Built in Hyderabad since 1984.";
const PATH = "/mining-rig";
const LAST_MODIFIED = "2026-11-01";
const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

// Spans two product categories on purpose: surface-mining and
// underground-drill-rigs. Neither category page alone covers both, which is
// what a generic "mining rig" search actually wants to see.
const MINING_SLUGS = [
  "ea-20-30",
  "tha-20-30",
  "itd-10",
  "hd-100",
  "itd-46",
  "tb-4-th",
  "ea-20-30-th",
  "ith-60",
  "kwd-10",
];

const FAQ = [
  {
    q: "What's the difference between a surface and underground mining rig?",
    a: "A surface rig like KLR's EA/THA/ITD/HD range drills blast holes in open-cast mines and quarries. An underground rig like the ITH 60 or KWD 10 is built smaller to work inside confined underground headings.",
  },
  {
    q: "DTH or top hammer for blast-hole drilling?",
    a: "DTH (down-the-hole) concentrates the strike energy at the bit and holds a straighter line in hard rock, which is what KLR's EA-20|30, ITD and HD units use. The THA-20|30 is a top hammer alternative for formations where that method suits better.",
  },
  {
    q: "What depth do KLR's mining rigs reach?",
    a: "Surface units (EA-20|30, THA-20|30, HD 100) drill to 30 m per pass. The underground ITH 60 reaches up to 50 m; the KWD 10 up to 30 m.",
  },
  {
    q: "Does KLR Universal export mining rigs?",
    a: "Yes. KLR equipment is in use in more than 60 countries across Asia, Africa, the Middle East and Latin America.",
  },
];

export default function MiningRigPage() {
  const models = products.filter((p) => MINING_SLUGS.includes(p.slug));

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
            { "@type": "ListItem", position: 2, name: "Mining Rig", item: `${SITE_URL}${PATH}` },
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
          <span className="text-black">Mining Rig</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-xl rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                Mining Rig
              </h1>
              <p className="mt-3 text-sm text-black/70">
                Surface blast-hole and underground production drills.
                Manufactured in Hyderabad since 1984.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              {models.length} mining rig models, surface and underground
            </h2>
            <p className="mt-4 max-w-3xl">
              KLR builds for both ends of a mine: the EA-20|30, THA-20|30,
              ITD and HD range drill blast holes in open-cast mines and
              quarries, while the ITH 60 and KWD 10 are sized to work inside
              confined underground headings. All are hydraulic, DTH or top
              hammer, built and tooled in the same Hyderabad plant.
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
                      <td className="px-5 py-3 text-black/70">
                        {m.category === "underground-drill-rigs" ? "Underground" : "Surface"}
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
