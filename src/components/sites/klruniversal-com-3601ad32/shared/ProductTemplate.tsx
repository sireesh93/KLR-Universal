import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CtaButton } from "./CtaButton";

export type Product = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  seriesTag: string | null;
  heroImage: string | null;
  quickSpecs: { label: string; value: string }[];
  bandSubtitle: string | null;
  bandHeading: string | null;
  specRows: { param: string; value: string }[];
};

const WHY_US = [
  "40+ years of expertise",
  "Industry leader",
  "Trusted in 60 countries",
  "Excellent after-sales support",
];

export function ProductTemplate({ product }: { product: Product }) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-4 text-xs text-black/50 md:px-8">
        <Link href="/" className="hover:text-klr-red">
          Home
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span>Drilling Rigs</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span>{product.categoryLabel}</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-black">{product.title}</span>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-klr-offwhite p-8">
            {product.seriesTag && (
              <span className="inline-block rounded bg-klr-red/10 px-3 py-1 text-xs font-medium text-klr-red">
                {product.seriesTag}
              </span>
            )}
            <h1 className="mt-4 text-3xl font-medium md:text-4xl">{product.title}</h1>
            <div className="mt-6 divide-y divide-black/10">
              {product.quickSpecs.map((s) => (
                <div key={s.label} className="py-3">
                  <p className="text-xs text-black/50">{s.label}</p>
                  <p className="mt-1 text-lg font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-lg bg-klr-offwhite">
            {product.heroImage && (
              <Image
                src={product.heroImage}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-6"
              />
            )}
          </div>
        </div>
      </section>

      {/* Red band */}
      {(product.bandSubtitle || product.bandHeading) && (
        <section className="relative mt-8 overflow-hidden bg-klr-red py-14 text-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            {product.bandSubtitle && (
              <p className="text-sm font-semibold text-white/80">{product.bandSubtitle}</p>
            )}
            {product.bandHeading && (
              <h2 className="mt-3 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">
                {product.bandHeading}
              </h2>
            )}
          </div>
        </section>
      )}

      {/* Specs */}
      <section className="bg-klr-offwhite py-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            Product Specifications
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
            <div>
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
                  {product.specRows.map((row, i) => (
                    <tr key={i} className="border-b border-black/5 align-top">
                      <td className="px-5 py-3 font-medium">{row.param}</td>
                      <td className="whitespace-pre-line px-5 py-3 text-black/70">
                        {row.value}
                      </td>
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
