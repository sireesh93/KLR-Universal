import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "./ProductTemplate";

export function ProductCategoryListing({
  categoryLabel,
  products,
}: {
  categoryLabel: string;
  products: Product[];
}) {
  return (
    <>
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-4 text-xs text-black/50 md:px-8">
        <Link href="/" className="hover:text-klr-red">
          Home
        </Link>
        <ChevronRight className="size-3" />
        <span>Drilling Rigs</span>
        <ChevronRight className="size-3" />
        <span className="text-black">{categoryLabel}</span>
      </div>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h1 className="text-3xl font-medium leading-tight md:text-4xl">{categoryLabel}</h1>
          <p className="mt-3 max-w-2xl text-sm text-black/60">
            {products.length} model{products.length === 1 ? "" : "s"} in this range.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/drilling-rigs/${p.category}/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-klr-offwhite transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full bg-white">
                  {p.heroImage && (
                    <Image
                      src={p.heroImage}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-6"
                    />
                  )}
                </div>
                <div className="p-5">
                  {p.seriesTag && (
                    <span className="inline-block rounded bg-klr-red/10 px-2 py-0.5 text-xs font-medium text-klr-red">
                      {p.seriesTag}
                    </span>
                  )}
                  <p className="mt-2 font-semibold group-hover:text-klr-red">{p.title}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-black/60">
                    {p.quickSpecs.map((s) => (
                      <span key={s.label}>
                        {s.label}: <span className="font-medium text-black">{s.value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
