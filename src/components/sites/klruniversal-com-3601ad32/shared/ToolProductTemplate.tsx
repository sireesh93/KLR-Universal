import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HOME_URL, SITE_URL } from "@/lib/site";
import { CtaButton } from "./CtaButton";

export type ToolProduct = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  heroImage: string;
  bandHeading: string;
  bandDesc: string;
  specRows: { param: string; value: string }[];
};

const WHY_US = [
  "40+ years of expertise",
  "Industry leader",
  "Trusted in 60 countries",
  "Excellent after-sales support",
];

// Individual-tool page: same hero/spec-table shape the Drill Rods page
// already used (background-image hero with a floating title card, spec
// table against a "Why KLR Universal" panel) -- templated here so DTH,
// Rotary and Drill Rods tools share one component instead of three
// hand-copied pages drifting apart.
export function ToolProductTemplate({ tool }: { tool: ToolProduct }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: HOME_URL },
      { "@type": "ListItem", position: 2, name: "Drilling Tools", item: `${SITE_URL}/drilling-tools/${tool.category}` },
      { "@type": "ListItem", position: 3, name: tool.categoryLabel, item: `${SITE_URL}/drilling-tools/${tool.category}` },
      { "@type": "ListItem", position: 4, name: tool.title, item: `${SITE_URL}/drilling-tools/${tool.category}/${tool.slug}` },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tool.title,
    category: tool.categoryLabel,
    description: tool.bandHeading,
    image: `${SITE_URL}${tool.heroImage}`,
    brand: { "@type": "Brand", name: "KLR Universal" },
    manufacturer: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "KLR Universal" },
    additionalProperty: tool.specRows.map((r) => ({
      "@type": "PropertyValue",
      name: r.param,
      value: r.value,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-4 text-xs text-black/50 md:px-8">
        <Link href="/" className="hover:text-klr-red">
          Home
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span>Products</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <Link href={`/drilling-tools/${tool.category}`} className="hover:text-klr-red">
          {tool.categoryLabel}
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-black">{tool.title}</span>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div
          className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-klr-offwhite bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${tool.heroImage})` }}
        >
          <div className="relative z-10 m-6 max-w-md rounded-lg bg-white p-6">
            <h1 className="text-2xl font-medium leading-tight md:text-3xl">{tool.title}</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-klr-red py-14 text-white">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">{tool.bandHeading}</h2>
          <p className="mt-4 max-w-3xl text-white">{tool.bandDesc}</p>
        </div>
      </section>

      <section className="bg-klr-offwhite py-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">Product Specifications</h2>

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
                  {tool.specRows.map((row) => (
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
    </>
  );
}

