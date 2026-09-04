import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const CATEGORIES = [
  {
    icon: "category-icon-waterwell.svg",
    eyebrow: "Geothermal Drilling Rigs",
    title: "Waterwell Drill Rigs",
    href: "/product_category/water-well",
  },
  {
    icon: "category-icon-mining.svg",
    eyebrow: "Mining Drilling Rigs",
    title: "Surface Mining & Quarrying Drill Rigs",
    href: "/product_category/surface-mining",
  },
  {
    icon: "category-icon-construction.svg",
    eyebrow: "Construction Drill Rigs",
    title: "Construction Drilling Rigs",
    href: "/product_category/construction",
  },
  {
    icon: "category-icon-exploration.svg",
    eyebrow: "Exploration Drilling Rigs",
    title: "Exploration Drill Rigs",
    href: "/product_category/exploration",
  },
  {
    icon: "category-icon-tools.png",
    eyebrow: "Drilling Tools",
    title: "Drilling Tools",
    href: "/drilling-tools/dth-drilling-tools",
  },
];

export function ProductCategories() {
  return (
    <section id="solutions" className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md text-3xl font-medium leading-tight md:text-4xl">
            Solutions for Every Drilling Challenge
          </h2>
          <p className="max-w-md text-sm text-black/60">
            Whether you&rsquo;re drilling for water, minerals and metal
            mining, exploration, geotechnical data, or foundation work,
            we&rsquo;ve got the right rig for your terrain and depth.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group flex flex-col rounded-lg border border-black/10 bg-klr-offwhite p-4 shadow-[0_0_0_0.75px_#eee] transition-shadow hover:shadow-md"
            >
              <div className="flex size-16 items-center justify-center rounded-lg bg-klr-red">
                <Image src={`${ASSET_BASE}/${cat.icon}`} alt="" width={40} height={40} />
              </div>
              <p className="mt-4 text-xs text-black/50">{cat.eyebrow}</p>
              <p className="mt-1 font-medium">{cat.title}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-klr-red opacity-0 transition-opacity group-hover:opacity-100">
                Explore More <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
