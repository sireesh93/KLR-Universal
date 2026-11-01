import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { HOME_URL, SITE_URL } from "@/lib/site";

const TITLE = "Piling Rig | KLR Universal";
const DESCRIPTION =
  "Rotary and auger piling rigs for foundation and pole-hole drilling, up to 47.2″ bore diameter. Built in Hyderabad since 1984, exported to 60+ countries.";
const PATH = "/piling-rig";
const LAST_MODIFIED = "2026-11-01";
const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

// KLR's construction-category range: rotary/auger piling plus the dedicated
// pole-hole rig. Pulled by slug, not by category, so this stays exact if the
// category ever grows to include something that isn't a piling rig.
const PILING_SLUGS = ["tp-30", "cp-20", "pd-1200", "kpr"];

const FAQ = [
  {
    q: "What is a piling rig used for?",
    a: "It bores a vertical hole for a foundation pile or a utility pole, using a rotary or auger head to cut through soil and soft rock rather than a down-the-hole hammer.",
  },
  {
    q: "What bore diameter does KLR's piling range cover?",
    a: "The TP30, CP20 and PD 1200 drill up to 24″, depth up to 50 m. The KPR is built specifically for pole holes and goes wider, 24″ to 47.2″, at a shallower 15 m.",
  },
  {
    q: "Rotary/auger or DTH for a pile bore?",
    a: "Rotary and auger suit the soil and soft-to-moderate ground most foundation and pole work sits in. Where the bore runs into hard rock, a DTH-equipped rig is the better tool — see KLR's down-the-hole range.",
  },
  {
    q: "Does KLR Universal export piling rigs?",
    a: "Yes. KLR equipment is in use in more than 60 countries across Asia, Africa, the Middle East and Latin America.",
  },
];

export default function PilingRigPage() {
  const models = products.filter((p) => PILING_SLUGS.includes(p.slug));

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
            { "@type": "ListItem", position: 2, name: "Piling Rig", item: `${SITE_URL}${PATH}` },
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
          <span className="text-black">Piling Rig</span>
        </div>

        <section className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          >
            <div className="relative z-10 m-6 max-w-xl rounded-lg bg-white p-6">
              <h1 className="text-2xl font-medium leading-tight md:text-3xl">
                Piling Rig
              </h1>
              <p className="mt-3 text-sm text-black/70">
                Rotary and auger rigs for foundation and pole-hole drilling,
                up to 47.2&Prime; bore diameter. Manufactured in Hyderabad
                since 1984.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              {models.length} piling rig models
            </h2>
            <p className="mt-4 max-w-3xl">
              A piling rig bores the hole a foundation pile or a utility pole
              sits in, cutting with a rotary or auger head rather than a
              percussive hammer. KLR's TP30 and CP20 cover general
              foundation work up to 50 m and 24&Prime;; the PD 1200 matches
              that range; the KPR is purpose-built for pole holes, going
              wider at a shallower depth.
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
              Ground too hard for rotary/auger? See the{" "}
              <Link href="/dth-drilling-rig" className="text-klr-red hover:underline">
                DTH drilling rig range
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
