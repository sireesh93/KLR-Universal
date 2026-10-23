import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type ToolListItem = {
  slug: string;
  title: string;
  heroImage: string;
  blurb: string;
  sizes: string | null;
};

export function ToolCategoryListing({
  category,
  categoryLabel,
  description,
  items,
}: {
  category: string;
  categoryLabel: string;
  description?: string;
  items: ToolListItem[];
}) {
  return (
    <>
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-4 text-xs text-black/50 md:px-8">
        <Link href="/" className="hover:text-klr-red">
          Home
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span>Products</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-black">{categoryLabel}</span>
      </div>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h1 className="text-3xl font-medium leading-tight md:text-4xl">{categoryLabel}</h1>
          <p className="mt-3 max-w-2xl text-sm text-black/60">
            {items.length} tool{items.length === 1 ? "" : "s"} in this range.
          </p>

          {description && (
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-black/70">{description}</p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/drilling-tools/${category}/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-klr-offwhite transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full bg-white">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-6"
                  />
                </div>
                <div className="p-5">
                  <p className="font-semibold group-hover:text-klr-red">{item.title}</p>
                  <p className="mt-2 line-clamp-2 text-xs text-black/60">{item.blurb}</p>
                  {item.sizes && (
                    <p className="mt-3 text-xs text-black/60">
                      <span className="font-medium text-black">{item.sizes}</span>
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
