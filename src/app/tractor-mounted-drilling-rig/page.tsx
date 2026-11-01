import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { HOME_URL, SITE_URL } from "@/lib/site";

const TITLE = "Tractor Mounted Drilling Rig | KLR Universal";
const DESCRIPTION =
  "Tractor-mounted water well, piling and core drilling rigs on a New Holland carrier. Hydraulic rigs built in Hyderabad since 1984, in service in 60+ countries.";
const PATH = "/tractor-mounted-drilling-rig";
const LAST_MODIFIED = "2026-11-01";
const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

// Slugs confirmed against products.json specRows.Carrier -- these four
// actually carry "New Holland / as per customer request" as their listed
// carrier. Not inferred from category or guessed: every other product's
// carrier field is either a truck or blank, so it is left out rather than
// assumed to be tractor-mounted.
const TRACTOR_SLUGS = ["tbw-40", "tp-30", "cp-20", "pd-1200"];

const FAQ = [
  {
    q: "What carrier does KLR use for a tractor-mounted rig?",
    a: "A New Holland agricultural tractor as standard, or another make to customer request. The drilling unit, mast and hydraulics mount on the tractor's three-point linkage and PTO.",
  },
  {
    q: "What is a tractor-mounted rig used for?",
    a: "Water well drilling (TBW-40), construction piling (TP-30, PD-1200) and compressor support (CP-20) where the site needs a rig that can also travel on public roads behind the tractor between jobs.",
  },
  {
    q: "How does a tractor-mounted rig compare to a truck-mounted rig?",
    a: "Lower cost and easier maintenance since it runs on standard tractor parts, at the expense of the higher depth and larger hole diameters a dedicated truck-mounted rig like the DTHR series reaches.",
  },
  {
    q: "Does KLR Universal export tractor-mounted rigs?",
    a: "Yes. KLR equipment is in use in more than 60 countries across Asia, Africa, the Middle East and Latin America.",
  },
];

export default function TractorMountedDrillingRigPage() {
  const models = products.filter((p) => TRACTOR_SLUGS.includes(p.slug));

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
              name: "Tractor Mounted Drilling Rig",
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
          <span className="text-black">Tractor Mounted Drilling Rig</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-xl rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                Tractor Mounted Drilling Rig
              </h1>
              <p className="mt-3 text-sm text-black/70">
                Water well, piling and compressor-support rigs built on a New
                Holland tractor carrier. Manufactured in Hyderabad since 1984.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              {models.length} tractor-mounted models
            </h2>
            <p className="mt-4 max-w-3xl">
              A tractor-mounted rig puts the drilling unit, mast and
              hydraulics on a standard agricultural tractor rather than a
              purpose-built truck chassis. It costs less to buy and service,
              runs on parts available at any tractor dealer, and still moves
              under its own power between sites. KLR builds four such rigs:
              one for water well drilling, two for construction piling, and
              one compressor carrier.
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
